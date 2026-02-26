import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin/session';
import { readCMSFile, writeCMSFile, generateId, getCurrentTimestamp } from '@/lib/admin/fileStorage';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import type { MediaLibrary, MediaItem } from '@/types/cms';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Allowed file types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];
const ALLOWED_DOC_TYPES = ['application/pdf'];

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

function getFileType(mimeType: string): 'image' | 'video' | 'document' | null {
  if (ALLOWED_IMAGE_TYPES.includes(mimeType)) return 'image';
  if (ALLOWED_VIDEO_TYPES.includes(mimeType)) return 'video';
  if (ALLOWED_DOC_TYPES.includes(mimeType)) return 'document';
  return null;
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const alt = formData.get('alt') as string | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const fileType = getFileType(file.type);
    if (!fileType) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: 'File too large (max 50MB)' },
        { status: 400 }
      );
    }

    // Create upload directory if it doesn't exist
    const typeDir = fileType === 'document' ? 'documents' : `${fileType}s`;
    const uploadPath = path.join(UPLOAD_DIR, typeDir);
    await mkdir(uploadPath, { recursive: true });

    // Generate unique filename
    const ext = path.extname(file.name);
    const id = generateId();
    const filename = `${id}${ext}`;
    const filePath = path.join(uploadPath, filename);

    // Write file to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Create media item
    const mediaItem: MediaItem = {
      id,
      filename,
      originalName: file.name,
      path: filePath,
      url: `/uploads/${typeDir}/${filename}`,
      type: fileType,
      mimeType: file.type,
      size: file.size,
      alt: alt || '',
      uploadedAt: getCurrentTimestamp(),
    };

    // Add to media library
    const mediaLibrary = await readCMSFile<MediaLibrary>('media');
    mediaLibrary.items.unshift(mediaItem);
    await writeCMSFile('media', mediaLibrary);

    return NextResponse.json({
      success: true,
      data: mediaItem,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

// DELETE - Remove a media item
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
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
        { success: false, error: 'Media ID is required' },
        { status: 400 }
      );
    }

    // Read media library
    const mediaLibrary = await readCMSFile<MediaLibrary>('media');
    const itemIndex = mediaLibrary.items.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Media item not found' },
        { status: 404 }
      );
    }

    // Remove from library (file deletion is optional - could keep orphaned files)
    mediaLibrary.items.splice(itemIndex, 1);
    await writeCMSFile('media', mediaLibrary);

    return NextResponse.json({
      success: true,
      message: 'Media item deleted',
    });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete media item' },
      { status: 500 }
    );
  }
}
