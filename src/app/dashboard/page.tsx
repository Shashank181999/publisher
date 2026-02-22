"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  email: string;
  role: string;
  name: string;
}

interface Submission {
  id: number;
  title: string;
  status: string;
  submittedDate: string;
  category: string;
  author: string;
  authorEmail: string;
  abstract?: string;
}

// Initial submissions data
const initialSubmissions: Submission[] = [
  {
    id: 1,
    title: "Impact of Social Media on Youth Mental Health",
    status: "Under Review",
    submittedDate: "2026-02-15",
    category: "Social Sciences",
    author: "John Author",
    authorEmail: "author@test.com",
    abstract: "This study examines the relationship between social media usage and mental health outcomes among youth aged 15-24...",
  },
  {
    id: 2,
    title: "Machine Learning Applications in Agriculture",
    status: "Revision Required",
    submittedDate: "2026-02-10",
    category: "Computer Science",
    author: "John Author",
    authorEmail: "author@test.com",
    abstract: "This paper explores the implementation of machine learning algorithms in precision agriculture...",
  },
  {
    id: 3,
    title: "Climate Change Effects on Coastal Ecosystems",
    status: "Accepted",
    submittedDate: "2026-01-28",
    category: "Applied Sciences",
    author: "John Author",
    authorEmail: "author@test.com",
    abstract: "An analysis of the long-term impacts of climate change on coastal marine ecosystems...",
  },
  {
    id: 4,
    title: "Legal Framework for Digital Privacy",
    status: "Pending Review",
    submittedDate: "2026-02-18",
    category: "Law",
    author: "Dr. Sarah Khan",
    authorEmail: "sarah@test.com",
    abstract: "This article examines the evolving legal frameworks governing digital privacy rights...",
  },
  {
    id: 5,
    title: "Sustainable Farming Practices in Punjab",
    status: "Pending Review",
    submittedDate: "2026-02-17",
    category: "Agriculture",
    author: "Prof. Ahmed Ali",
    authorEmail: "ahmed@test.com",
    abstract: "A comprehensive study of sustainable agriculture practices adopted in Punjab region...",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewComments, setReviewComments] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login");
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const openReviewModal = (submission: Submission) => {
    setSelectedSubmission(submission);
    setReviewComments("");
    setShowReviewModal(true);
  };

  const handleStatusChange = (newStatus: string) => {
    if (selectedSubmission) {
      setSubmissions(submissions.map(sub =>
        sub.id === selectedSubmission.id
          ? { ...sub, status: newStatus }
          : sub
      ));
      setShowReviewModal(false);
      setSelectedSubmission(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) return null;

  const isAdmin = user.role === "admin";

  // Filter submissions based on role - for author, filter by email
  const displaySubmissions = isAdmin
    ? submissions
    : submissions.filter(s => s.authorEmail === user.email);

  // Calculate stats
  const stats = {
    total: displaySubmissions.length,
    pending: displaySubmissions.filter(s => s.status === "Pending Review" || s.status === "Under Review").length,
    accepted: displaySubmissions.filter(s => s.status === "Accepted").length,
    revision: displaySubmissions.filter(s => s.status === "Revision Required").length,
    rejected: displaySubmissions.filter(s => s.status === "Rejected").length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Revision Required":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Review Modal */}
      {showReviewModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-bold text-gray-900">Review Submission</h2>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-4">
              {/* Submission Details */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {selectedSubmission.title}
                </h3>
                <div className="space-y-2 text-sm mb-4">
                  <p><span className="text-gray-500">Author:</span> <span className="font-medium">{selectedSubmission.author}</span></p>
                  <p><span className="text-gray-500">Category:</span> <span className="font-medium">{selectedSubmission.category}</span></p>
                  <p><span className="text-gray-500">Submitted:</span> <span className="font-medium">{new Date(selectedSubmission.submittedDate).toLocaleDateString()}</span></p>
                  <p>
                    <span className="text-gray-500">Status:</span>
                    <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedSubmission.status)}`}>
                      {selectedSubmission.status}
                    </span>
                  </p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-1 text-sm">Abstract:</h4>
                  <p className="text-sm text-gray-600">{selectedSubmission.abstract}</p>
                </div>
              </div>

              {/* Review Comments - Only for Admin */}
              {isAdmin && (
                <div className="mb-4">
                  <label className="block font-medium text-gray-700 mb-2 text-sm">
                    Review Comments
                  </label>
                  <textarea
                    value={reviewComments}
                    onChange={(e) => setReviewComments(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Add your review comments..."
                  />
                </div>
              )}

              {/* Action Buttons - Only for Admin */}
              {isAdmin && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-700 mb-3 text-sm">Change Status:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleStatusChange("Accepted")}
                      className="flex items-center justify-center gap-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange("Rejected")}
                      className="flex items-center justify-center gap-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition text-sm font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Reject
                    </button>
                    <button
                      onClick={() => handleStatusChange("Revision Required")}
                      className="flex items-center justify-center gap-1 bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 transition text-sm font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Revision
                    </button>
                    <button
                      onClick={() => handleStatusChange("Under Review")}
                      className="flex items-center justify-center gap-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      In Review
                    </button>
                  </div>
                </div>
              )}

              {/* Close button for author */}
              {!isAdmin && (
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Welcome, {user.name}!
            </h1>
            <p className="text-sm text-gray-600">
              {isAdmin ? "Admin Dashboard" : "Author Dashboard"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              isAdmin ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"
            }`}>
              {isAdmin ? "Admin" : "Author"}
            </span>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 font-medium text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
          <p className="text-lg md:text-xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-xs text-gray-600">Total</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
          <p className="text-lg md:text-xl font-bold text-blue-600">{stats.pending}</p>
          <p className="text-xs text-gray-600">Pending</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
          <p className="text-lg md:text-xl font-bold text-green-600">{stats.accepted}</p>
          <p className="text-xs text-gray-600">Accepted</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 hidden md:block">
          <p className="text-lg md:text-xl font-bold text-orange-600">{stats.revision}</p>
          <p className="text-xs text-gray-600">Revision</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 hidden md:block">
          <p className="text-lg md:text-xl font-bold text-red-600">{stats.rejected}</p>
          <p className="text-xs text-gray-600">Rejected</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Submissions Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                {isAdmin ? "All Submissions" : "My Submissions"}
              </h2>
              {!isAdmin && (
                <Link
                  href="/submissions"
                  className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  + New
                </Link>
              )}
            </div>
          </div>

          {/* Submissions Cards - Mobile Friendly */}
          <div className="space-y-3">
            {displaySubmissions.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-500">No submissions yet</p>
                {!isAdmin && (
                  <Link
                    href="/submissions"
                    className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                  >
                    Submit Your First Manuscript
                  </Link>
                )}
              </div>
            ) : (
              displaySubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900 text-sm flex-1 pr-2">
                      {submission.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(submission.status)}`}>
                      {submission.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-3">
                    {isAdmin && <span>By: {submission.author}</span>}
                    <span>{submission.category}</span>
                    <span>{new Date(submission.submittedDate).toLocaleDateString()}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openReviewModal(submission)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Details
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => openReviewModal(submission)}
                        className="text-green-600 hover:text-green-800 text-sm font-medium"
                      >
                        Review
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {!isAdmin && (
                <Link
                  href="/submissions"
                  className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-sm"
                >
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="font-medium text-blue-800">Submit Manuscript</span>
                </Link>
              )}
              <Link
                href="/current"
                className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-sm"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="font-medium text-gray-700">Current Issue</span>
              </Link>
              {isAdmin && (
                <>
                  <button className="w-full flex items-center gap-2 p-2 bg-purple-50 rounded-lg hover:bg-purple-100 transition text-sm">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    <span className="font-medium text-purple-800">Manage Users</span>
                  </button>
                  <button className="w-full flex items-center gap-2 p-2 bg-green-50 rounded-lg hover:bg-green-100 transition text-sm">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-medium text-green-800">Publish Issue</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Profile</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Name</span>
                <span className="font-medium">{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email</span>
                <span className="font-medium text-xs">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Role</span>
                <span className="font-medium capitalize">{user.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
