import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin/session';
import { readCMSFile, writeCMSFile, CMSSection } from '@/lib/admin/fileStorage';

const validSections: CMSSection[] = [
  'hero',
  'about',
  'journals',
  'articles',
  'services',
  'conferences',
  'books',
  'contact',
  'footer',
  'media',
  'homepage',
];

type RouteParams = Promise<{ section: string }>;

// GET - Read content for a section
export async function GET(
  request: NextRequest,
  { params }: { params: RouteParams }
) {
  try {
    // Check authentication
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { section } = await params;

    // Validate section
    if (!validSections.includes(section as CMSSection)) {
      return NextResponse.json(
        { success: false, error: 'Invalid section' },
        { status: 400 }
      );
    }

    const data = await readCMSFile(section as CMSSection);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Error reading content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read content' },
      { status: 500 }
    );
  }
}

// PUT - Update content for a section
export async function PUT(
  request: NextRequest,
  { params }: { params: RouteParams }
) {
  try {
    // Check authentication
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { section } = await params;

    // Validate section
    if (!validSections.includes(section as CMSSection)) {
      return NextResponse.json(
        { success: false, error: 'Invalid section' },
        { status: 400 }
      );
    }

    const body = await request.json();

    await writeCMSFile(section as CMSSection, body);

    return NextResponse.json({
      success: true,
      message: 'Content updated successfully',
    });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update content' },
      { status: 500 }
    );
  }
}
