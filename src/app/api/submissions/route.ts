/**
 * POST /api/submissions
 * Submit a new article to OJS
 */

import { NextRequest, NextResponse } from 'next/server';
import { submitArticleToOJS, type OJSSubmissionData } from '@/utils/ojsApi';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract submission data
    const journalId = formData.get('journalId') as string;
    const title = formData.get('title') as string;
    const abstract = formData.get('abstract') as string;
    const keywordsStr = formData.get('keywords') as string;
    const authorsStr = formData.get('authors') as string;
    const sectionId = formData.get('sectionId') as string;

    // Validate required fields
    if (!journalId || !title || !abstract) {
      return NextResponse.json(
        { error: 'Missing required fields: journalId, title, abstract' },
        { status: 400 }
      );
    }

    // Parse keywords and authors
    const keywords = keywordsStr ? keywordsStr.split(',').map(k => k.trim()) : [];
    const authors = authorsStr ? JSON.parse(authorsStr) : [];

    // Get uploaded files
    const files: File[] = [];
    const fileEntries = formData.getAll('files');
    for (const entry of fileEntries) {
      if (entry instanceof File) {
        files.push(entry);
      }
    }

    // Prepare submission data
    const submissionData: OJSSubmissionData = {
      title,
      abstract,
      keywords,
      authors,
      sectionId: sectionId ? parseInt(sectionId) : undefined,
    };

    // Submit to OJS
    const result = await submitArticleToOJS(journalId, submissionData, files);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to submit article' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      submissionId: result.submissionId,
      uploadedFiles: result.uploadedFiles,
      message: 'Article submitted successfully to OJS',
    });
  } catch (error) {
    console.error('API submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
