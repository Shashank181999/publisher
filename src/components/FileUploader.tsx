"use client";

import { useState, useCallback } from "react";
import { compressFile, formatFileSize, validateFile } from "@/utils/fileCompressor";

interface UploadedFile {
  id: string;
  file: File;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  status: "pending" | "compressing" | "ready" | "uploading" | "done" | "error";
  error?: string;
}

interface FileUploaderProps {
  onFilesReady?: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  acceptedTypes?: string;
  label?: string;
}

export default function FileUploader({
  onFilesReady,
  maxFiles = 5,
  maxSizeMB = 50,
  acceptedTypes = ".pdf,.doc,.docx,.jpg,.jpeg,.png",
  label = "Upload Files",
}: FileUploaderProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = useCallback(async (file: File): Promise<UploadedFile> => {
    const id = Math.random().toString(36).substring(7);

    // Validate file first
    const validation = validateFile(file, maxSizeMB);
    if (!validation.valid) {
      return {
        id,
        file,
        originalSize: file.size,
        compressedSize: file.size,
        compressionRatio: 0,
        status: "error",
        error: validation.error,
      };
    }

    try {
      // Compress the file
      const result = await compressFile(file);

      return {
        id,
        file: result.file,
        originalSize: result.originalSize,
        compressedSize: result.compressedSize,
        compressionRatio: result.compressionRatio,
        status: "ready",
      };
    } catch (error) {
      return {
        id,
        file,
        originalSize: file.size,
        compressedSize: file.size,
        compressionRatio: 0,
        status: "error",
        error: "Compression failed",
      };
    }
  }, [maxSizeMB]);

  const handleFiles = useCallback(async (newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles).slice(0, maxFiles - files.length);

    // Add files with pending status
    const pendingFiles: UploadedFile[] = fileArray.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      originalSize: file.size,
      compressedSize: file.size,
      compressionRatio: 0,
      status: "compressing" as const,
    }));

    setFiles((prev) => [...prev, ...pendingFiles]);

    // Process each file
    for (let i = 0; i < fileArray.length; i++) {
      const processed = await processFile(fileArray[i]);

      setFiles((prev) =>
        prev.map((f) =>
          f.id === pendingFiles[i].id ? { ...processed, id: f.id } : f
        )
      );
    }

    // Notify parent of ready files
    if (onFilesReady) {
      const readyFiles = fileArray.map(async (file) => {
        const result = await compressFile(file);
        return result.file;
      });
      Promise.all(readyFiles).then(onFilesReady);
    }
  }, [files.length, maxFiles, processFile, onFilesReady]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const totalOriginalSize = files.reduce((acc, f) => acc + f.originalSize, 0);
  const totalCompressedSize = files.reduce((acc, f) => acc + f.compressedSize, 0);
  const totalSaved = totalOriginalSize - totalCompressedSize;

  return (
    <div className="w-full">
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
          isDragging
            ? "border-[#1e3a5f] bg-blue-50"
            : "border-gray-300 hover:border-[#1e3a5f] hover:bg-gray-50"
        }`}
      >
        <input
          type="file"
          multiple
          accept={acceptedTypes}
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="space-y-3">
          <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>

          <div>
            <p className="text-lg font-semibold text-gray-700">{label}</p>
            <p className="text-sm text-gray-500 mt-1">
              Drag & drop files here or click to browse
            </p>
            <p className="text-xs text-gray-400 mt-2">
              PDF, DOC, DOCX, JPG, PNG (Max {maxSizeMB}MB per file)
            </p>
          </div>

          {/* Compression Badge */}
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Auto-compression enabled
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-4 space-y-3">
          {files.map((fileData) => (
            <div
              key={fileData.id}
              className={`flex items-center gap-4 p-4 rounded-lg border ${
                fileData.status === "error"
                  ? "bg-red-50 border-red-200"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* File Icon */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                fileData.status === "error" ? "bg-red-100" : "bg-blue-100"
              }`}>
                {fileData.file.type.includes("pdf") ? (
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM8.5 13h1v4h-1v-4zm2.5 0h1.5c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1H11v-4zm3.5 0h1.5v1H15v.5h1v1h-1v1.5h-1V13zm-3 1v2h.5v-2H11.5z"/>
                  </svg>
                ) : fileData.file.type.includes("image") ? (
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{fileData.file.name}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span>{formatFileSize(fileData.originalSize)}</span>

                  {fileData.status === "compressing" && (
                    <span className="text-blue-600 flex items-center gap-1">
                      <svg className="w-3 h-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Compressing...
                    </span>
                  )}

                  {fileData.status === "ready" && fileData.compressionRatio > 0 && (
                    <span className="text-green-600 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {fileData.compressionRatio}% smaller → {formatFileSize(fileData.compressedSize)}
                    </span>
                  )}

                  {fileData.status === "error" && (
                    <span className="text-red-600">{fileData.error}</span>
                  )}
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFile(fileData.id)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors group"
              >
                <svg className="w-4 h-4 text-gray-500 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}

          {/* Total Summary */}
          {files.length > 1 && totalSaved > 0 && (
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-green-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Total space saved</span>
              </div>
              <span className="font-bold text-green-700">{formatFileSize(totalSaved)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
