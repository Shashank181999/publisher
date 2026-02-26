import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin/session';
import { readCMSFile, writeCMSFile, generateId, getCurrentTimestamp } from '@/lib/admin/fileStorage';
import type { CMSJournal } from '@/types/cms';

interface JournalsData {
  items: CMSJournal[];
}

// GET - List all journals
export async function GET() {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await readCMSFile<JournalsData>('journals');

    return NextResponse.json({
      success: true,
      data: data.items,
    });
  } catch (error) {
    console.error('Error fetching journals:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch journals' },
      { status: 500 }
    );
  }
}

// POST - Create a new journal
export async function POST(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const data = await readCMSFile<JournalsData>('journals');

    const newJournal: CMSJournal = {
      ...body,
      id: body.id || generateId(),
      isActive: body.isActive ?? true,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp(),
    };

    data.items.push(newJournal);
    await writeCMSFile('journals', data);

    return NextResponse.json({
      success: true,
      data: newJournal,
    });
  } catch (error) {
    console.error('Error creating journal:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create journal' },
      { status: 500 }
    );
  }
}

// PUT - Update a journal
export async function PUT(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Journal ID is required' },
        { status: 400 }
      );
    }

    const data = await readCMSFile<JournalsData>('journals');
    const index = data.items.findIndex((item) => item.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Journal not found' },
        { status: 404 }
      );
    }

    data.items[index] = {
      ...data.items[index],
      ...updates,
      updatedAt: getCurrentTimestamp(),
    };

    await writeCMSFile('journals', data);

    return NextResponse.json({
      success: true,
      data: data.items[index],
    });
  } catch (error) {
    console.error('Error updating journal:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update journal' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a journal
export async function DELETE(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Journal ID is required' },
        { status: 400 }
      );
    }

    const data = await readCMSFile<JournalsData>('journals');
    const index = data.items.findIndex((item) => item.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Journal not found' },
        { status: 404 }
      );
    }

    data.items.splice(index, 1);
    await writeCMSFile('journals', data);

    return NextResponse.json({
      success: true,
      message: 'Journal deleted',
    });
  } catch (error) {
    console.error('Error deleting journal:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete journal' },
      { status: 500 }
    );
  }
}
