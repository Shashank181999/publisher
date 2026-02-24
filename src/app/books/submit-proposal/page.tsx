"use client";

import Link from "next/link";
import { useState } from "react";

export default function SubmitProposalPage() {
  const [formData, setFormData] = useState({
    authorName: "",
    email: "",
    affiliation: "",
    bookTitle: "",
    bookType: "",
    synopsis: "",
    targetAudience: "",
    tableOfContents: "",
    sampleChapter: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your submission! Our editorial team will review your proposal and contact you within 2-3 weeks.");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/books" className="hover:text-blue-600">Books</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Submit Proposal</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1e3a5f] to-[#152d4a] text-white p-8">
            <h1 className="text-3xl font-bold mb-2">Submit Book Proposal</h1>
            <p className="text-blue-100">
              Share your book idea with us. Our editorial team will review your proposal and get back to you.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Author Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Author Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Dr. John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john.smith@university.edu"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Affiliation <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.affiliation}
                    onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="University / Institution"
                  />
                </div>
              </div>
            </div>

            {/* Book Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Book Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Book Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.bookTitle}
                    onChange={(e) => setFormData({ ...formData, bookTitle: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter proposed book title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Book Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.bookType}
                    onChange={(e) => setFormData({ ...formData, bookType: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select book type</option>
                    <option value="textbook">Textbook</option>
                    <option value="monograph">Research Monograph</option>
                    <option value="edited-volume">Edited Volume</option>
                    <option value="reference">Reference Work / Handbook</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Synopsis / Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.synopsis}
                    onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Provide a brief synopsis of your book (300-500 words). Include the main themes, objectives, and what makes your book unique."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Audience <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Who is the primary audience for this book? (e.g., students, researchers, practitioners)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Table of Contents
                  </label>
                  <textarea
                    rows={6}
                    value={formData.tableOfContents}
                    onChange={(e) => setFormData({ ...formData, tableOfContents: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Provide a draft table of contents with chapter titles and brief descriptions"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sample Chapter (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
                    <input
                      type="file"
                      accept=".doc,.docx,.pdf"
                      onChange={(e) => setFormData({ ...formData, sampleChapter: e.target.files?.[0] || null })}
                      className="hidden"
                      id="sampleChapter"
                    />
                    <label htmlFor="sampleChapter" className="cursor-pointer">
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-gray-600 mb-1">Click to upload a sample chapter</p>
                      <p className="text-gray-400 text-sm">DOC, DOCX, or PDF (max 10MB)</p>
                    </label>
                    {formData.sampleChapter && (
                      <p className="text-green-600 mt-2 text-sm">
                        Selected: {formData.sampleChapter.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6 border-t">
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-[#1e3a5f] mb-1">What happens next?</h3>
                <p className="text-gray-700 text-sm">
                  Our editorial team will review your proposal within 2-3 weeks. We may contact you for additional
                  information or to discuss the proposal further. If approved, we will send you a publishing agreement.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1e3a5f] text-white py-3 rounded-lg font-semibold hover:bg-[#152d4a] transition"
              >
                Submit Proposal
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Have questions? Contact our editorial team at{" "}
            <a href="mailto:books@greatbritainpublishers.co.uk" className="text-[#1e3a5f] hover:underline">
              books@greatbritainpublishers.co.uk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
