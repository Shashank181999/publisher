import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin/session';
import { readCMSFile, writeCMSFile, generateId, getCurrentTimestamp } from '@/lib/admin/fileStorage';
import type { CMSService } from '@/types/cms';

interface ServicesData {
  items: CMSService[];
}

// GET - List all services
export async function GET() {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await readCMSFile<ServicesData>('services');

    return NextResponse.json({
      success: true,
      data: data.items,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST - Create a new service
export async function POST(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const data = await readCMSFile<ServicesData>('services');

    const newService: CMSService = {
      ...body,
      id: body.id || generateId(),
      isActive: body.isActive ?? true,
      order: body.order ?? data.items.length + 1,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp(),
    };

    data.items.push(newService);
    await writeCMSFile('services', data);

    return NextResponse.json({
      success: true,
      data: newService,
    });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create service' },
      { status: 500 }
    );
  }
}

// PUT - Update a service
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
        { success: false, error: 'Service ID is required' },
        { status: 400 }
      );
    }

    const data = await readCMSFile<ServicesData>('services');
    const index = data.items.findIndex((item) => item.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }

    data.items[index] = {
      ...data.items[index],
      ...updates,
      updatedAt: getCurrentTimestamp(),
    };

    await writeCMSFile('services', data);

    return NextResponse.json({
      success: true,
      data: data.items[index],
    });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update service' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a service
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
        { success: false, error: 'Service ID is required' },
        { status: 400 }
      );
    }

    const data = await readCMSFile<ServicesData>('services');
    const index = data.items.findIndex((item) => item.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }

    data.items.splice(index, 1);
    await writeCMSFile('services', data);

    return NextResponse.json({
      success: true,
      message: 'Service deleted',
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete service' },
      { status: 500 }
    );
  }
}
