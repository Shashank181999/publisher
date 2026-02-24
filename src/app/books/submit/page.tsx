import Link from "next/link";

export const metadata = {
  title: "Submit Book Proposal | Great Britain Publishers",
  description: "Submit your book proposal to Great Britain Publishers. Learn how to prepare and submit your academic book for publication.",
};

export default function BookSubmitPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e3a5f] via-[#1e3a5f] to-[#152d4a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-blue-200 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/books" className="hover:text-white">Book Publishing</Link>
            <span>/</span>
            <span className="text-white font-medium">Submit Proposal</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Submit Your Book Proposal
            </h1>
            <p className="text-blue-100 text-lg mb-8">
              Take the first step towards publishing your academic book. Our editorial team reviews
              every proposal carefully to ensure alignment with our publishing standards.
            </p>
          </div>
        </div>
      </section>

      {/* Proposal Requirements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What to Include in Your Proposal</h2>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">1</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Book Synopsis</h3>
                      <p className="text-gray-600 text-sm">A comprehensive overview of your book (500-1000 words) explaining the main themes, arguments, and unique contributions.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">2</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Table of Contents</h3>
                      <p className="text-gray-600 text-sm">A detailed chapter outline with brief descriptions of each chapter&apos;s content and objectives.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">3</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Sample Chapters</h3>
                      <p className="text-gray-600 text-sm">One or two sample chapters demonstrating your writing style and the depth of your research.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">4</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Author Biography</h3>
                      <p className="text-gray-600 text-sm">Your academic credentials, research background, and previous publications relevant to the proposed book.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">5</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Market Analysis</h3>
                      <p className="text-gray-600 text-sm">Target audience, competing titles, and how your book fills a gap in the existing literature.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gradient-to-br from-[#1e3a5f] to-[#152d4a] rounded-2xl p-8 text-white sticky top-8">
                <h3 className="text-2xl font-bold mb-6">Ready to Submit?</h3>
                <p className="text-blue-100 mb-8">
                  Send your book proposal to our editorial team. We typically respond within 4-6 weeks.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-blue-100">Free proposal review</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-blue-100">Expert editorial feedback</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-blue-100">Confidential review process</span>
                  </div>
                </div>

                <Link
                  href="/books/submit-proposal"
                  className="block w-full bg-white text-[#1e3a5f] text-center py-4 rounded-xl font-semibold hover:bg-blue-50 transition mb-4"
                >
                  Submit Book Proposal
                </Link>

                <a
                  href="mailto:books@greatbritainpublishers.co.uk"
                  className="block w-full border-2 border-white/30 text-white text-center py-4 rounded-xl font-semibold hover:bg-white/10 transition"
                >
                  Email: books@greatbritainpublishers.co.uk
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submission Tips */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Tips for a Successful Proposal</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-[#1e3a5f] mb-2">Be Clear and Concise</h3>
              <p className="text-gray-600 text-sm">Clearly articulate your book&apos;s unique value proposition and contribution to the field.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-[#1e3a5f] mb-2">Know Your Audience</h3>
              <p className="text-gray-600 text-sm">Define your target readership and explain why they need your book.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-[#1e3a5f] mb-2">Show Your Expertise</h3>
              <p className="text-gray-600 text-sm">Highlight your qualifications and previous publications that establish your authority.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 bg-gradient-to-r from-[#1e3a5f] to-[#152d4a] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">What Happens Next?</h2>
          <p className="text-blue-100 mb-8">
            After you submit your proposal, our editorial team will review it carefully. If we&apos;re interested,
            we&apos;ll proceed to the expert review stage.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/books/review"
              className="bg-white text-[#1e3a5f] px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Learn About Review Process
            </Link>
            <Link
              href="/books"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Back to Book Publishing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
