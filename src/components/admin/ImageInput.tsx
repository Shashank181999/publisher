'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import MediaPicker from './MediaPicker';
import type { MediaItem } from '@/types/cms';

interface ImageInputProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept?: 'image' | 'video' | 'all';
  placeholder?: string;
}

export default function ImageInput({
  label,
  value,
  onChange,
  accept = 'image',
  placeholder = 'No file selected',
}: ImageInputProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isVideo = accept === 'video' || (value && value.includes('.mp4'));
  const isExternalUrl = value && (value.startsWith('http://') || value.startsWith('https://'));

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (50MB max)
    if (file.size > 50 * 1024 * 1024) {
      setError('File too large (max 50MB)');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        onChange(data.data.url);
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const handleMediaSelect = (media: MediaItem) => {
    onChange(media.url);
    setShowPicker(false);
  };

  const handleRemove = () => {
    onChange('');
  };

  const acceptTypes = accept === 'video'
    ? 'video/mp4,video/webm,video/ogg'
    : accept === 'image'
    ? 'image/*'
    : 'image/*,video/*';

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">{label}</label>

      {/* Preview Area */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
        {value ? (
          <div className="relative">
            {/* Image/Video Preview */}
            <div className="aspect-video relative bg-slate-100">
              {isVideo ? (
                <video
                  src={value}
                  className="w-full h-full object-contain"
                  controls={false}
                  muted
                />
              ) : isExternalUrl ? (
                <img
                  src={value}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              ) : (
                <Image
                  src={value}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
              )}
            </div>

            {/* Current URL */}
            <div className="p-3 bg-white border-t border-slate-200">
              <p className="text-xs text-slate-500 truncate">{value}</p>
            </div>

            {/* Remove button */}
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
              title="Remove"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="aspect-video flex items-center justify-center">
            <div className="text-center">
              <svg className="w-12 h-12 text-slate-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-slate-400">{placeholder}</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="file"
          accept={acceptTypes}
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#152d4a] transition-colors disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Uploading...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload New
            </>
          )}
        </button>

        <button
          onClick={() => setShowPicker(true)}
          disabled={isUploading}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Choose from Library
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {/* Media Picker Modal */}
      {showPicker && (
        <MediaPicker
          onSelect={handleMediaSelect}
          onClose={() => setShowPicker(false)}
          type={accept}
          currentValue={value}
        />
      )}
    </div>
  );
}
