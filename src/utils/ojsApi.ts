/**
 * OJS API Integration
 * Connects to Open Journal Systems for submissions and file uploads
 */

interface OJSConfig {
  baseUrl: string;
  apiKey: string;
  journalPath: string;
}

interface SubmissionData {
  title: string;
  abstract: string;
  keywords: string[];
  authors: {
    givenName: string;
    familyName: string;
    email: string;
    affiliation?: string;
    country?: string;
  }[];
  sectionId?: number;
  locale?: string;
}

interface UploadedFile {
  fileId: number;
  fileName: string;
  fileSize: number;
}

// Get OJS configuration from environment variables
const getOJSConfig = (): OJSConfig => {
  return {
    baseUrl: process.env.NEXT_PUBLIC_OJS_URL || '',
    apiKey: process.env.OJS_API_KEY || '',
    journalPath: process.env.NEXT_PUBLIC_OJS_JOURNAL_PATH || '',
  };
};

// Base API request function
const ojsRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const config = getOJSConfig();

  if (!config.baseUrl) {
    throw new Error('OJS URL not configured');
  }

  const url = `${config.baseUrl}/api/v1/${endpoint}`;

  const headers: HeadersInit = {
    'Authorization': `Bearer ${config.apiKey}`,
    ...options.headers,
  };

  // Don't set Content-Type for FormData (browser sets it with boundary)
  if (!(options.body instanceof FormData)) {
    (headers as Record<string, string>)['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};

// Create a new submission in OJS
export const createSubmission = async (
  data: SubmissionData
): Promise<{ submissionId: number; success: boolean; error?: string }> => {
  try {
    const config = getOJSConfig();

    const submissionPayload = {
      contextId: config.journalPath,
      title: {
        en: data.title,
      },
      abstract: {
        en: data.abstract,
      },
      keywords: {
        en: data.keywords,
      },
      locale: data.locale || 'en',
      sectionId: data.sectionId || 1,
    };

    const response = await ojsRequest('submissions', {
      method: 'POST',
      body: JSON.stringify(submissionPayload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errorMessage || 'Failed to create submission');
    }

    const result = await response.json();

    return {
      submissionId: result.id,
      success: true,
    };
  } catch (error) {
    console.error('OJS submission error:', error);
    return {
      submissionId: 0,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

// Upload a file to an existing submission
export const uploadFileToSubmission = async (
  submissionId: number,
  file: File,
  fileStage: 'submission' | 'review' | 'final' = 'submission'
): Promise<{ success: boolean; fileId?: number; error?: string }> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', JSON.stringify({ en: file.name }));
    formData.append('fileStage', getFileStageId(fileStage).toString());

    const response = await ojsRequest(
      `submissions/${submissionId}/files`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errorMessage || 'Failed to upload file');
    }

    const result = await response.json();

    return {
      success: true,
      fileId: result.id,
    };
  } catch (error) {
    console.error('OJS file upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

// Get file stage ID for OJS
const getFileStageId = (stage: string): number => {
  const stages: Record<string, number> = {
    submission: 2,
    review: 4,
    final: 10,
  };
  return stages[stage] || 2;
};

// Get journal sections/categories from OJS
export const getJournalSections = async (): Promise<{
  sections: { id: number; title: string }[];
  success: boolean;
  error?: string;
}> => {
  try {
    const config = getOJSConfig();
    const response = await ojsRequest(`contexts/${config.journalPath}/sections`);

    if (!response.ok) {
      throw new Error('Failed to fetch sections');
    }

    const result = await response.json();

    return {
      sections: result.items?.map((s: { id: number; title: { en: string } }) => ({
        id: s.id,
        title: s.title?.en || 'Untitled',
      })) || [],
      success: true,
    };
  } catch (error) {
    console.error('OJS sections error:', error);
    return {
      sections: [],
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

// Get published issues from OJS
export const getPublishedIssues = async (): Promise<{
  issues: { id: number; title: string; volume: number; number: number; year: number }[];
  success: boolean;
}> => {
  try {
    const response = await ojsRequest('issues?isPublished=true');

    if (!response.ok) {
      throw new Error('Failed to fetch issues');
    }

    const result = await response.json();

    return {
      issues: result.items?.map((issue: {
        id: number;
        title: { en: string };
        volume: number;
        number: number;
        year: number;
      }) => ({
        id: issue.id,
        title: issue.title?.en || `Volume ${issue.volume}, Issue ${issue.number}`,
        volume: issue.volume,
        number: issue.number,
        year: issue.year,
      })) || [],
      success: true,
    };
  } catch (error) {
    console.error('OJS issues error:', error);
    return {
      issues: [],
      success: false,
    };
  }
};

// Get published articles from OJS
export const getPublishedArticles = async (
  issueId?: number,
  limit: number = 20
): Promise<{
  articles: {
    id: number;
    title: string;
    abstract: string;
    authors: string[];
    doi?: string;
    publishedDate?: string;
  }[];
  success: boolean;
}> => {
  try {
    let endpoint = `submissions?status=3&count=${limit}`;
    if (issueId) {
      endpoint += `&issueIds[]=${issueId}`;
    }

    const response = await ojsRequest(endpoint);

    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    const result = await response.json();

    return {
      articles: result.items?.map((article: {
        id: number;
        title: { en: string };
        abstract: { en: string };
        authors: { fullName: string }[];
        doi?: string;
        datePublished?: string;
      }) => ({
        id: article.id,
        title: article.title?.en || 'Untitled',
        abstract: article.abstract?.en || '',
        authors: article.authors?.map(a => a.fullName) || [],
        doi: article.doi,
        publishedDate: article.datePublished,
      })) || [],
      success: true,
    };
  } catch (error) {
    console.error('OJS articles error:', error);
    return {
      articles: [],
      success: false,
    };
  }
};

// Full submission workflow: compress, create submission, upload file
export const submitArticleToOJS = async (
  submissionData: SubmissionData,
  files: File[]
): Promise<{
  success: boolean;
  submissionId?: number;
  uploadedFiles?: UploadedFile[];
  error?: string;
}> => {
  try {
    // 1. Create submission
    const submission = await createSubmission(submissionData);

    if (!submission.success) {
      throw new Error(submission.error || 'Failed to create submission');
    }

    // 2. Upload each file
    const uploadedFiles: UploadedFile[] = [];

    for (const file of files) {
      const uploadResult = await uploadFileToSubmission(
        submission.submissionId,
        file
      );

      if (uploadResult.success && uploadResult.fileId) {
        uploadedFiles.push({
          fileId: uploadResult.fileId,
          fileName: file.name,
          fileSize: file.size,
        });
      }
    }

    return {
      success: true,
      submissionId: submission.submissionId,
      uploadedFiles,
    };
  } catch (error) {
    console.error('Full submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
