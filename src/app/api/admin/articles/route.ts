import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin/session';
import { readCMSFile, writeCMSFile, generateId, getCurrentTimestamp } from '@/lib/admin/fileStorage';
import type { CMSArticle } from '@/types/cms';

interface ArticlesData {
  items: CMSArticle[];
}

// GET - List all articles
export async function GET() {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await readCMSFile<ArticlesData>('articles');

    return NextResponse.json({
      success: true,
      data: data.items,
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

// POST - Create a new article
export async function POST(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const data = await readCMSFile<ArticlesData>('articles');

    const newArticle: CMSArticle = {
      ...body,
      id: body.id || generateId(),
      isActive: body.isActive ?? true,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp(),
    };

    data.items.push(newArticle);
    await writeCMSFile('articles', data);

    return NextResponse.json({
      success: true,
      data: newArticle,
    });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create article' },
      { status: 500 }
    );
  }
}

// PUT - Update an article
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
        { success: false, error: 'Article ID is required' },
        { status: 400 }
      );
    }

    const data = await readCMSFile<ArticlesData>('articles');
    const index = data.items.findIndex((item) => item.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }

    data.items[index] = {
      ...data.items[index],
      ...updates,
      updatedAt: getCurrentTimestamp(),
    };

    await writeCMSFile('articles', data);

    return NextResponse.json({
      success: true,
      data: data.items[index],
    });
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update article' },
      { status: 500 }
    );
  }
}

// DELETE - Delete an article
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
        { success: false, error: 'Article ID is required' },
        { status: 400 }
      );
    }

    const data = await readCMSFile<ArticlesData>('articles');
    const index = data.items.findIndex((item) => item.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }

    data.items.splice(index, 1);
    await writeCMSFile('articles', data);

    return NextResponse.json({
      success: true,
      message: 'Article deleted',
    });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}
