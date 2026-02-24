"use client";

import { useState } from "react";
import FileUploader from "@/components/FileUploader";
import { formatFileSize } from "@/utils/fileCompressor";

interface CompressedFile {
  name: string;
  originalSize: number;
  compressedSize: number;
  type: string;
}

export default function DemoUploadPage() {
  const [compressedFiles, setCompressedFiles] = useState<CompressedFile[]>([]);
  const [totalOriginal, setTotalOriginal] = useState(0);
  const [totalCompressed, setTotalCompressed] = useState(0);

  const handleFilesReady = (files: File[]) => {
    // This would normally go to OJS, but for demo we just show results
    console.log("Files ready for upload:", files);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-green-100 text-green-700 text-sm px-4 py-1.5 rounded-full font-medium mb-4">
            File Compression Demo
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
            Test Our Smart Compression
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload your files to see how much space you can save. Our compression
            reduces file sizes while maintaining quality.
          </p>
        </div>

        {/* Compression Stats Card */}
        <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] rounded-2xl p-6 mb-8 text-white">
          <h2 className="text-lg font-semibold mb-4">Expected Compression Rates</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">📷</div>
              <div className="text-2xl font-bold">60-80%</div>
              <div className="text-sm text-white/70">JPEG Images</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🖼️</div>
              <div className="text-2xl font-bold">40-70%</div>
              <div className="text-sm text-white/70">PNG Images</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">📄</div>
              <div className="text-2xl font-bold">10-30%</div>
              <div className="text-sm text-white/70">PDF Files*</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">📝</div>
              <div className="text-2xl font-bold">5-15%</div>
              <div className="text-sm text-white/70">Word Docs*</div>
            </div>
          </div>
          <p className="text-xs text-white/50 mt-4">
            * PDF and Word compression requires server-side processing. Currently optimized for images.
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <FileUploader
            onFilesReady={handleFilesReady}
            maxFiles={10}
            maxSizeMB={100}
            label="Drop files here to test compression"
          />
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#1e3a5f] mb-6">How Compression Works</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">1. Upload</h3>
              <p className="text-sm text-gray-600">
                Drag & drop or select your files. We accept PDF, DOC, DOCX, and images.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">2. Compress</h3>
              <p className="text-sm text-gray-600">
                Our smart algorithm compresses files while maintaining quality.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">3. Ready</h3>
              <p className="text-sm text-gray-600">
                Compressed files are ready to upload to OJS for submission.
              </p>
            </div>
          </div>

          {/* Example Results */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">Example Results:</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📷</span>
                  <div>
                    <p className="font-medium text-gray-800">research-image.jpg</p>
                    <p className="text-xs text-gray-500">High-resolution photograph</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 line-through">5.2 MB</p>
                  <p className="font-bold text-green-600">1.1 MB (79% saved)</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🖼️</span>
                  <div>
                    <p className="font-medium text-gray-800">chart-diagram.png</p>
                    <p className="text-xs text-gray-500">Scientific diagram</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 line-through">3.8 MB</p>
                  <p className="font-bold text-green-600">1.5 MB (61% saved)</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📄</span>
                  <div>
                    <p className="font-medium text-gray-800">manuscript.pdf</p>
                    <p className="text-xs text-gray-500">Research paper with figures</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 line-through">12.4 MB</p>
                  <p className="font-bold text-amber-600">10.8 MB (13% saved)*</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              * PDF compression is limited in browser. Full PDF optimization available with server-side processing.
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-[#1e3a5f] mb-2">Faster Uploads</h3>
            <p className="text-sm text-gray-600">Smaller files upload much faster, saving your time.</p>
          </div>
          <div className="bg-green-50 rounded-xl p-5 border border-green-200">
            <div className="text-3xl mb-3">💾</div>
            <h3 className="font-semibold text-green-700 mb-2">Save Storage</h3>
            <p className="text-sm text-gray-600">Reduce server storage costs with optimized files.</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
            <div className="text-3xl mb-3">✨</div>
            <h3 className="font-semibold text-purple-700 mb-2">Quality Preserved</h3>
            <p className="text-sm text-gray-600">Smart compression maintains visual quality.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
