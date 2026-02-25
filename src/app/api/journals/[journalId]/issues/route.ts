/**
 * GET /api/journals/[journalId]/issues
 * Get published issues for a specific journal
 */

import { NextRequest, NextResponse } from 'next/server';
import { getPublishedIssues } from '@/utils/ojsApi';
import { getJournalById } from '@/config/ojs-config';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ journalId: string }> }
) {
  try {
    const { journalId } = await params;

    // Check if journal exists
    const journal = getJournalById(journalId);
    if (!journal) {
      return NextResponse.json(
        { error: 'Journal not found' },
        { status: 404 }
      );
    }

    const result = await getPublishedIssues(journalId);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to fetch issues' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      journal: journal.name,
      issues: result.issues,
      count: result.issues.length,
    });
  } catch (error) {
    console.error('API issues error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
