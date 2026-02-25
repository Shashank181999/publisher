/**
 * GET /api/journals
 * Get all OJS journals info
 */

import { NextResponse } from 'next/server';
import { OJS_JOURNALS } from '@/config/ojs-config';

export async function GET() {
  try {
    return NextResponse.json({
      journals: OJS_JOURNALS.map(j => ({
        id: j.id,
        name: j.name,
        shortName: j.shortName,
        category: j.category,
        path: j.path,
      })),
      count: OJS_JOURNALS.length,
    });
  } catch (error) {
    console.error('API journals error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
