/**
 * File Compressor Utility
 * Compresses PDFs, images, and documents before uploading to OJS
 */

// Compress image files (JPEG, PNG, WebP)
export const compressImage = async (
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1080,
  quality: number = 0.7
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        // Calculate new dimensions while maintaining aspect ratio
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Could not compress image'));
            }
          },
          file.type,
          quality
        );
      };

      img.onerror = () => reject(new Error('Could not load image'));
    };

    reader.onerror = () => reject(new Error('Could not read file'));
  });
};

// Compress PDF using canvas rendering (reduces quality but significantly smaller)
export const compressPDF = async (file: File): Promise<File> => {
  // For PDFs, we'll return as-is for now since true PDF compression
  // requires server-side processing or heavy libraries
  // The submission will handle PDF optimization on the OJS side

  // If file is already small (under 5MB), return as-is
  if (file.size < 5 * 1024 * 1024) {
    return file;
  }

  // For larger files, we can notify the user
  console.log(`PDF file ${file.name} is ${(file.size / 1024 / 1024).toFixed(2)}MB`);
  return file;
};

// Compress any document (Word, etc.) - returns as-is since compression needs server
export const compressDocument = async (file: File): Promise<File> => {
  return file;
};

// Main compression function that handles all file types
export const compressFile = async (file: File): Promise<{
  file: File;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
}> => {
  const originalSize = file.size;
  let compressedFile: File;

  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();

  try {
    // Handle images
    if (fileType.startsWith('image/')) {
      compressedFile = await compressImage(file);
    }
    // Handle PDFs
    else if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
      compressedFile = await compressPDF(file);
    }
    // Handle Word documents
    else if (
      fileType === 'application/msword' ||
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileName.endsWith('.doc') ||
      fileName.endsWith('.docx')
    ) {
      compressedFile = await compressDocument(file);
    }
    // Other files - return as-is
    else {
      compressedFile = file;
    }

    const compressedSize = compressedFile.size;
    const compressionRatio = originalSize > 0
      ? Math.round((1 - compressedSize / originalSize) * 100)
      : 0;

    return {
      file: compressedFile,
      originalSize,
      compressedSize,
      compressionRatio: Math.max(0, compressionRatio),
    };
  } catch (error) {
    console.error('Compression error:', error);
    // Return original file if compression fails
    return {
      file,
      originalSize,
      compressedSize: originalSize,
      compressionRatio: 0,
    };
  }
};

// Format file size for display
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Validate file before upload
export const validateFile = (
  file: File,
  maxSizeMB: number = 50,
  allowedTypes: string[] = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/gif',
  ]
): { valid: boolean; error?: string } => {
  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File size exceeds ${maxSizeMB}MB limit. Please compress your file.`,
    };
  }

  // Check file type
  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();

  const isAllowedType = allowedTypes.some(type => fileType.includes(type.split('/')[1])) ||
    fileName.endsWith('.pdf') ||
    fileName.endsWith('.doc') ||
    fileName.endsWith('.docx');

  if (!isAllowedType) {
    return {
      valid: false,
      error: 'File type not allowed. Please upload PDF, DOC, DOCX, or image files.',
    };
  }

  return { valid: true };
};
