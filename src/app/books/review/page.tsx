import Link from "next/link";

export const metadata = {
  title: "Book Review Process | Great Britain Publishers",
  description: "Learn about our rigorous book proposal review process. Expert evaluation ensures quality academic publications.",
};

export default function BookReviewPage() {
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
            <span className="text-white font-medium">Review Process</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Expert Review Process
            </h1>
            <p className="text-blue-100 text-lg mb-8">
              Every book proposal undergoes rigorous evaluation by subject matter experts to ensure
              academic quality, originality, and market viability.
            </p>
          </div>
        </div>
      </section>

      {/* Review Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Review Your Proposal</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our multi-stage review process ensures that published books meet the highest standards of academic excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
              <div className="w-12 h-12 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center text-xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Editorial Assessment</h3>
              <p className="text-gray-600 mb-4">
                Our in-house editorial team conducts an initial review of your proposal to assess fit with our publishing program, completeness, and market potential.
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
              <div className="w-12 h-12 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center text-xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Peer Review</h3>
              <p className="text-gray-600 mb-4">
                Qualified proposals are sent to 2-3 expert reviewers in your field who evaluate scholarly contribution, academic rigor, and originality.
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
              <div className="w-12 h-12 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center text-xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Editorial Board Decision</h3>
              <p className="text-gray-600 mb-4">
                Based on reviewer feedback, our editorial board makes the final decision: accept, request revisions, or provide detailed feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Review Criteria */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What Reviewers Assess</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">Academic Quality</h3>
                  <p className="text-gray-600 text-sm">Accuracy, depth of research, and adherence to scholarly standards in your field.</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">Originality</h3>
                  <p className="text-gray-600 text-sm">Unique contribution to existing knowledge and fresh perspectives on the subject.</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">Structure & Organization</h3>
                  <p className="text-gray-600 text-sm">Logical flow, clear argumentation, and well-organized content presentation.</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">Writing Quality</h3>
                  <p className="text-gray-600 text-sm">Clarity of expression, academic writing standards, and readability.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1e3a5f] to-[#152d4a] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Timeline & Communication</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-1">4-6 Weeks</h4>
                  <p className="text-blue-100 text-sm">Typical review timeline from submission to decision</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Regular Updates</h4>
                  <p className="text-blue-100 text-sm">We keep you informed throughout the review process</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Confidential Process</h4>
                  <p className="text-blue-100 text-sm">Your work is handled with strict confidentiality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 bg-gradient-to-r from-[#1e3a5f] to-[#152d4a] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">After Approval</h2>
          <p className="text-blue-100 mb-8">
            Once your proposal passes review, you&apos;ll move to the contract stage where we&apos;ll
            discuss terms, timeline, and publication details.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/books/contract"
              className="bg-white text-[#1e3a5f] px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Learn About Contracts
            </Link>
            <Link
              href="/books/submit-proposal"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Submit Your Proposal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
