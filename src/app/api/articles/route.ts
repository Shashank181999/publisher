/**
 * GET /api/articles
 * Fetch published articles from all OJS journals
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAllPublishedArticles, getPublishedArticles } from '@/utils/ojsApi';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const journalId = searchParams.get('journal');
    const limit = parseInt(searchParams.get('limit') || '20');

    if (journalId) {
      // Fetch from specific journal
      const result = await getPublishedArticles(journalId, { limit });

      if (!result.success) {
        return NextResponse.json(
          { error: result.error || 'Failed to fetch articles' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        articles: result.articles,
        journal: journalId,
        count: result.articles.length,
      });
    }

    // Fetch from all journals
    const result = await getAllPublishedArticles({ limit });

    return NextResponse.json({
      articles: result.articles,
      count: result.articles.length,
      errors: result.errors,
    });
  } catch (error) {
    console.error('API articles error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
