/**
 * GET /api/journals/[journalId]/sections
 * Get sections/categories for a specific journal
 */

import { NextRequest, NextResponse } from 'next/server';
import { getJournalSections } from '@/utils/ojsApi';
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

    const result = await getJournalSections(journalId);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to fetch sections' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      journal: journal.name,
      sections: result.sections,
    });
  } catch (error) {
    console.error('API sections error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
