"use client";

import { useState } from "react";

interface Author {
  givenName: string;
  familyName: string;
  email: string;
  affiliation: string;
}

interface Props {
  journalId: string;
  journalName: string;
  editorEmail: string;
}

export default function SubmissionForm({ journalId, journalName, editorEmail }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submissionId, setSubmissionId] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [keywords, setKeywords] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const [authors, setAuthors] = useState<Author[]>([
    { givenName: "", familyName: "", email: "", affiliation: "" },
  ]);

  const addAuthor = () => {
    setAuthors([...authors, { givenName: "", familyName: "", email: "", affiliation: "" }]);
  };

  const removeAuthor = (index: number) => {
    if (authors.length > 1) {
      setAuthors(authors.filter((_, i) => i !== index));
    }
  };

  const updateAuthor = (index: number, field: keyof Author, value: string) => {
    const updated = [...authors];
    updated[index][field] = value;
    setAuthors(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("journalId", journalId);
      formData.append("title", title);
      formData.append("abstract", abstract);
      formData.append("keywords", keywords);
      formData.append("authors", JSON.stringify(authors));

      if (files) {
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }
      }

      const response = await fetch("/api/submissions", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit manuscript");
      }

      setSubmitStatus("success");
      setSubmissionId(result.submissionId);

      // Reset form
      setTitle("");
      setAbstract("");
      setKeywords("");
      setFiles(null);
      setAuthors([{ givenName: "", familyName: "", email: "", affiliation: "" }]);
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <svg
          className="w-16 h-16 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-xl font-semibold text-green-800 mb-2">Submission Successful!</h3>
        <p className="text-green-700 mb-4">
          Your manuscript has been submitted to {journalName}.
          {submissionId && (
            <span className="block mt-2">
              Submission ID: <strong>#{submissionId}</strong>
            </span>
          )}
        </p>
        <p className="text-gray-600 text-sm">
          The editorial team will review your submission and contact you at your provided email address.
        </p>
        <button
          onClick={() => setSubmitStatus("idle")}
          className="mt-6 px-6 py-2 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#2d4a6f] transition"
        >
          Submit Another Manuscript
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitStatus === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{errorMessage}</p>
        </div>
      )}

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Manuscript Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
          placeholder="Enter the full title of your manuscript"
        />
      </div>

      {/* Authors */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Authors <span className="text-red-500">*</span>
        </label>
        {authors.map((author, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-600">Author {index + 1}</span>
              {authors.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAuthor(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={author.givenName}
                onChange={(e) => updateAuthor(index, "givenName", e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                placeholder="First Name"
              />
              <input
                type="text"
                value={author.familyName}
                onChange={(e) => updateAuthor(index, "familyName", e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                placeholder="Last Name"
              />
              <input
                type="email"
                value={author.email}
                onChange={(e) => updateAuthor(index, "email", e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                placeholder="Email Address"
              />
              <input
                type="text"
                value={author.affiliation}
                onChange={(e) => updateAuthor(index, "affiliation", e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                placeholder="Affiliation/Institution"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addAuthor}
          className="text-[#1e3a5f] hover:text-[#2d4a6f] text-sm font-medium flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Another Author
        </button>
      </div>

      {/* Abstract */}
      <div>
        <label htmlFor="abstract" className="block text-sm font-medium text-gray-700 mb-1">
          Abstract <span className="text-red-500">*</span>
        </label>
        <textarea
          id="abstract"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          required
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
          placeholder="Enter your abstract (250-300 words recommended)"
        />
        <p className="text-xs text-gray-500 mt-1">
          Word count: {abstract.trim().split(/\s+/).filter(Boolean).length}
        </p>
      </div>

      {/* Keywords */}
      <div>
        <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">
          Keywords <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
          placeholder="Enter keywords separated by commas (e.g., research, methodology, analysis)"
        />
      </div>

      {/* File Upload */}
      <div>
        <label htmlFor="files" className="block text-sm font-medium text-gray-700 mb-1">
          Manuscript Files <span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#1e3a5f] transition">
          <input
            type="file"
            id="files"
            onChange={(e) => setFiles(e.target.files)}
            required
            multiple
            accept=".doc,.docx,.pdf"
            className="hidden"
          />
          <label htmlFor="files" className="cursor-pointer">
            <svg
              className="w-12 h-12 text-gray-400 mx-auto mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-gray-600 mb-1">Click to upload or drag and drop</p>
            <p className="text-gray-400 text-sm">DOC, DOCX, or PDF (max 10MB)</p>
          </label>
        </div>
        {files && files.length > 0 && (
          <div className="mt-3 space-y-2">
            {Array.from(files).map((file, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-lg font-medium text-white transition ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#c8102e] hover:bg-red-700"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit Manuscript"
          )}
        </button>
      </div>

      <p className="text-xs text-gray-500 text-center">
        By submitting, you confirm that this manuscript is original work and has not been published elsewhere.
      </p>
    </form>
  );
}
