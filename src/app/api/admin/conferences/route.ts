import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin/session';
import { readCMSFile, writeCMSFile, generateId, getCurrentTimestamp } from '@/lib/admin/fileStorage';
import type { CMSConference } from '@/types/cms';

interface ConferencesData {
  items: CMSConference[];
}

// GET - List all conferences
export async function GET() {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await readCMSFile<ConferencesData>('conferences');

    return NextResponse.json({
      success: true,
      data: data.items,
    });
  } catch (error) {
    console.error('Error fetching conferences:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch conferences' },
      { status: 500 }
    );
  }
}

// POST - Create a new conference
export async function POST(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const data = await readCMSFile<ConferencesData>('conferences');

    const newConference: CMSConference = {
      ...body,
      id: body.id || generateId(),
      isActive: body.isActive ?? true,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp(),
    };

    data.items.push(newConference);
    await writeCMSFile('conferences', data);

    return NextResponse.json({
      success: true,
      data: newConference,
    });
  } catch (error) {
    console.error('Error creating conference:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create conference' },
      { status: 500 }
    );
  }
}

// PUT - Update a conference
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
        { success: false, error: 'Conference ID is required' },
        { status: 400 }
      );
    }

    const data = await readCMSFile<ConferencesData>('conferences');
    const index = data.items.findIndex((item) => item.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Conference not found' },
        { status: 404 }
      );
    }

    data.items[index] = {
      ...data.items[index],
      ...updates,
      updatedAt: getCurrentTimestamp(),
    };

    await writeCMSFile('conferences', data);

    return NextResponse.json({
      success: true,
      data: data.items[index],
    });
  } catch (error) {
    console.error('Error updating conference:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update conference' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a conference
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
        { success: false, error: 'Conference ID is required' },
        { status: 400 }
      );
    }

    const data = await readCMSFile<ConferencesData>('conferences');
    const index = data.items.findIndex((item) => item.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Conference not found' },
        { status: 404 }
      );
    }

    data.items.splice(index, 1);
    await writeCMSFile('conferences', data);

    return NextResponse.json({
      success: true,
      message: 'Conference deleted',
    });
  } catch (error) {
    console.error('Error deleting conference:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete conference' },
      { status: 500 }
    );
  }
}
