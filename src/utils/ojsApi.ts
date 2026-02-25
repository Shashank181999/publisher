/**
 * OJS API Integration
 * Multi-journal support for Great Britain Journals OJS
 */

import { OJS_JOURNALS, OJS_API_KEY, OJS_BASE_URL, getJournalById } from '@/config/ojs-config';

// ============ Types ============

export interface OJSAuthor {
  givenName: string;
  familyName: string;
  email: string;
  affiliation?: string;
  country?: string;
  orcid?: string;
}

export interface OJSSubmissionData {
  title: string;
  abstract: string;
  keywords: string[];
  authors: OJSAuthor[];
  sectionId?: number;
  locale?: string;
}

export interface OJSArticle {
  id: number;
  title: string;
  abstract: string;
  authors: string[];
  doi?: string;
  publishedDate?: string;
  pdfUrl?: string;
  volume?: number;
  issue?: number;
  pages?: string;
  journalId: string;
  journalName: string;
}

export interface OJSIssue {
  id: number;
  title: string;
  volume: number;
  number: number;
  year: number;
  publishedDate?: string;
  journalId: string;
}

export interface OJSSection {
  id: number;
  title: string;
}

// ============ API Request Helper ============

const ojsRequest = async (
  journalId: string,
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const journal = getJournalById(journalId);

  if (!journal) {
    throw new Error(`Journal not found: ${journalId}`);
  }

  if (!OJS_API_KEY) {
    throw new Error('OJS API key not configured');
  }

  const url = `${journal.apiUrl}/${endpoint}`;

  const headers: HeadersInit = {
    'Authorization': `Bearer ${OJS_API_KEY}`,
    ...options.headers,
  };

  // Don't set Content-Type for FormData
  if (!(options.body instanceof FormData)) {
    (headers as Record<string, string>)['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};

// ============ GET Published Articles ============

export const getPublishedArticles = async (
  journalId: string,
  options: { issueId?: number; limit?: number; offset?: number } = {}
): Promise<{ articles: OJSArticle[]; success: boolean; error?: string }> => {
  try {
    const journal = getJournalById(journalId);
    if (!journal) throw new Error(`Journal not found: ${journalId}`);

    const { issueId, limit = 20, offset = 0 } = options;

    let endpoint = `submissions?status=3&count=${limit}&offset=${offset}`;
    if (issueId) {
      endpoint += `&issueIds[]=${issueId}`;
    }

    const response = await ojsRequest(journalId, endpoint);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errorMessage || 'Failed to fetch articles');
    }

    const result = await response.json();

    const articles: OJSArticle[] = result.items?.map((article: {
      id: number;
      fullTitle?: { en: string };
      title?: { en: string };
      abstract?: { en: string };
      authors?: { fullName: string }[];
      doiObject?: { doi: string };
      datePublished?: string;
      _href?: string;
      volume?: number;
      issue?: number;
      pages?: string;
    }) => ({
      id: article.id,
      title: article.fullTitle?.en || article.title?.en || 'Untitled',
      abstract: article.abstract?.en || '',
      authors: article.authors?.map(a => a.fullName) || [],
      doi: article.doiObject?.doi,
      publishedDate: article.datePublished,
      volume: article.volume,
      issue: article.issue,
      pages: article.pages,
      journalId: journal.id,
      journalName: journal.name,
    })) || [];

    return { articles, success: true };
  } catch (error) {
    console.error('OJS fetch articles error:', error);
    return {
      articles: [],
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

// ============ GET All Articles from All Journals ============

export const getAllPublishedArticles = async (
  options: { limit?: number } = {}
): Promise<{ articles: OJSArticle[]; success: boolean; errors?: string[] }> => {
  const { limit = 10 } = options;
  const errors: string[] = [];
  const allArticles: OJSArticle[] = [];

  const results = await Promise.all(
    OJS_JOURNALS.map(async (journal) => {
      const result = await getPublishedArticles(journal.id, { limit });
      if (!result.success && result.error) {
        errors.push(`${journal.shortName}: ${result.error}`);
      }
      return result.articles;
    })
  );

  results.forEach(articles => {
    allArticles.push(...articles);
  });

  // Sort by published date (newest first)
  allArticles.sort((a, b) => {
    const dateA = a.publishedDate ? new Date(a.publishedDate).getTime() : 0;
    const dateB = b.publishedDate ? new Date(b.publishedDate).getTime() : 0;
    return dateB - dateA;
  });

  return {
    articles: allArticles,
    success: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
};

// ============ GET Published Issues ============

export const getPublishedIssues = async (
  journalId: string
): Promise<{ issues: OJSIssue[]; success: boolean; error?: string }> => {
  try {
    const journal = getJournalById(journalId);
    if (!journal) throw new Error(`Journal not found: ${journalId}`);

    const response = await ojsRequest(journalId, 'issues?isPublished=true');

    if (!response.ok) {
      throw new Error('Failed to fetch issues');
    }

    const result = await response.json();

    const issues: OJSIssue[] = result.items?.map((issue: {
      id: number;
      title?: { en: string };
      volume: number;
      number: number;
      year: number;
      datePublished?: string;
    }) => ({
      id: issue.id,
      title: issue.title?.en || `Volume ${issue.volume}, Issue ${issue.number}`,
      volume: issue.volume,
      number: issue.number,
      year: issue.year,
      publishedDate: issue.datePublished,
      journalId: journal.id,
    })) || [];

    return { issues, success: true };
  } catch (error) {
    console.error('OJS fetch issues error:', error);
    return {
      issues: [],
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

// ============ GET Journal Sections ============

export const getJournalSections = async (
  journalId: string
): Promise<{ sections: OJSSection[]; success: boolean; error?: string }> => {
  try {
    const response = await ojsRequest(journalId, 'sections');

    if (!response.ok) {
      throw new Error('Failed to fetch sections');
    }

    const result = await response.json();

    const sections: OJSSection[] = result.items?.map((s: {
      id: number;
      title: { en: string }
    }) => ({
      id: s.id,
      title: s.title?.en || 'Untitled',
    })) || [];

    return { sections, success: true };
  } catch (error) {
    console.error('OJS sections error:', error);
    return {
      sections: [],
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

// ============ CREATE Submission ============

export const createSubmission = async (
  journalId: string,
  data: OJSSubmissionData
): Promise<{ submissionId: number; success: boolean; error?: string }> => {
  try {
    const journal = getJournalById(journalId);
    if (!journal) throw new Error(`Journal not found: ${journalId}`);

    const submissionPayload = {
      contextId: journal.path,
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

    const response = await ojsRequest(journalId, 'submissions', {
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

// ============ UPLOAD File to Submission ============

export const uploadFileToSubmission = async (
  journalId: string,
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
      journalId,
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

const getFileStageId = (stage: string): number => {
  const stages: Record<string, number> = {
    submission: 2,
    review: 4,
    final: 10,
  };
  return stages[stage] || 2;
};

// ============ Full Submission Workflow ============

export const submitArticleToOJS = async (
  journalId: string,
  submissionData: OJSSubmissionData,
  files: File[]
): Promise<{
  success: boolean;
  submissionId?: number;
  uploadedFiles?: { fileId: number; fileName: string; fileSize: number }[];
  error?: string;
}> => {
  try {
    // 1. Create submission
    const submission = await createSubmission(journalId, submissionData);

    if (!submission.success) {
      throw new Error(submission.error || 'Failed to create submission');
    }

    // 2. Upload each file
    const uploadedFiles: { fileId: number; fileName: string; fileSize: number }[] = [];

    for (const file of files) {
      const uploadResult = await uploadFileToSubmission(
        journalId,
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

// ============ GET Single Article Details ============

export const getArticleById = async (
  journalId: string,
  articleId: number
): Promise<{ article: OJSArticle | null; success: boolean; error?: string }> => {
  try {
    const journal = getJournalById(journalId);
    if (!journal) throw new Error(`Journal not found: ${journalId}`);

    const response = await ojsRequest(journalId, `submissions/${articleId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }

    const article = await response.json();

    return {
      article: {
        id: article.id,
        title: article.fullTitle?.en || article.title?.en || 'Untitled',
        abstract: article.abstract?.en || '',
        authors: article.authors?.map((a: { fullName: string }) => a.fullName) || [],
        doi: article.doiObject?.doi,
        publishedDate: article.datePublished,
        volume: article.volume,
        issue: article.issue,
        pages: article.pages,
        journalId: journal.id,
        journalName: journal.name,
      },
      success: true,
    };
  } catch (error) {
    console.error('OJS fetch article error:', error);
    return {
      article: null,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

// ============ Export Journals Config ============

export { OJS_JOURNALS, OJS_BASE_URL, getJournalById };
