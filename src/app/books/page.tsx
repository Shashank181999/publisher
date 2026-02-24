import Link from "next/link";

export const metadata = {
  title: "Book Publishing | Great Britain Publishers",
  description: "Publish your academic book with Great Britain Publishers. Professional editing, design, and global distribution.",
};

export default function BooksPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e3a5f] via-[#1e3a5f] to-[#152d4a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-blue-200 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Book Publishing</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Book Publishing
              </h1>
              <p className="text-blue-100 text-lg mb-8">
                Transform your research into a published book. We provide comprehensive publishing
                services including professional editing, design, production, and global distribution.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/books/submit-proposal"
                  className="bg-white text-[#1e3a5f] px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
                >
                  Submit Book Proposal
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                  <h4 className="text-white font-semibold mb-1">Academic Textbooks</h4>
                  <p className="text-blue-200 text-sm">For education</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                  <h4 className="text-white font-semibold mb-1">Research Monographs</h4>
                  <p className="text-blue-200 text-sm">Original research</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                  <h4 className="text-white font-semibold mb-1">Edited Volumes</h4>
                  <p className="text-blue-200 text-sm">Multi-author works</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                  <h4 className="text-white font-semibold mb-1">Reference Works</h4>
                  <p className="text-blue-200 text-sm">Handbooks & guides</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Publish */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Publish</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We publish high-quality academic books across health sciences and related disciplines
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-[#1e3a5f] mb-2">Textbooks</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive textbooks for undergraduate and postgraduate education in health sciences.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-[#1e3a5f] mb-2">Monographs</h3>
              <p className="text-gray-600 text-sm">
                In-depth research monographs presenting original scholarly work and findings.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-[#1e3a5f] mb-2">Edited Volumes</h3>
              <p className="text-gray-600 text-sm">
                Collections of chapters by multiple authors on specific themes or topics.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-[#1e3a5f] mb-2">Reference Works</h3>
              <p className="text-gray-600 text-sm">
                Handbooks, encyclopedias, and reference guides for practitioners and researchers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Publishing Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Publishing Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From proposal to publication, we guide you through every step
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm relative">
              <div className="w-12 h-12 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Submit Proposal</h3>
              <p className="text-gray-600 text-sm">Send us your book proposal with synopsis and sample chapters</p>
              <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-sm relative">
              <div className="w-12 h-12 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Review</h3>
              <p className="text-gray-600 text-sm">Expert reviewers evaluate your proposal for quality and fit</p>
              <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-sm relative">
              <div className="w-12 h-12 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Contract</h3>
              <p className="text-gray-600 text-sm">Sign publishing agreement with agreed terms and timeline</p>
              <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-sm relative">
              <div className="w-12 h-12 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Production</h3>
              <p className="text-gray-600 text-sm">Editing, typesetting, cover design, and proofreading</p>
              <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                5
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Publication</h3>
              <p className="text-gray-600 text-sm">Print and digital publication with global distribution</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Book Services</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#1e3a5f] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Writing & Editing Services</h3>
                    <p className="text-gray-600 text-sm">Professional developmental editing, copyediting, and proofreading</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#1e3a5f] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Design & Production</h3>
                    <p className="text-gray-600 text-sm">Cover design, interior layout, typesetting, and illustration</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#1e3a5f] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Global Distribution</h3>
                    <p className="text-gray-600 text-sm">Print-on-demand and distribution through major retailers worldwide</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#1e3a5f] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Marketing Services</h3>
                    <p className="text-gray-600 text-sm">Promotional campaigns, social media, and academic marketing</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Why Publish With Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Rigorous peer review process</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Professional production quality</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Open access options available</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">ISBN and DOI assignment</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Print and eBook formats</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Author royalties</span>
                </li>
              </ul>
              <Link
                href="/books/submit-proposal"
                className="block w-full text-center bg-[#1e3a5f] text-white py-3 rounded-lg font-semibold mt-6 hover:bg-[#152d4a] transition"
              >
                Submit Your Proposal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#1e3a5f] to-[#152d4a]">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Have a Book Idea?</h2>
          <p className="text-blue-100 mb-8">
            We&apos;d love to hear from you. Submit your book proposal today and let&apos;s discuss how we can help bring your work to life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/books/submit-proposal"
              className="bg-white text-[#1e3a5f] px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Submit Book Proposal
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Contact Editorial Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
