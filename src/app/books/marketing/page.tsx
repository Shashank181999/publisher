import Link from "next/link";

export const metadata = {
  title: "Book Marketing | Great Britain Publishers",
  description: "Maximize your book's reach with our comprehensive marketing and promotion services for academic authors.",
};

export default function BookMarketingPage() {
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
            <span className="text-white font-medium">Marketing</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Launch Your Book
            </h1>
            <p className="text-blue-100 text-lg mb-8">
              Your book is ready! Now let&apos;s make sure it reaches the readers who need it most.
              Our marketing team helps maximize your book&apos;s visibility and impact.
            </p>
          </div>
        </div>
      </section>

      {/* Marketing Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Marketing Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive marketing support to ensure your book gets the attention it deserves.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-bold text-[#1e3a5f] mb-2">Global Distribution</h3>
              <p className="text-gray-600 text-sm">
                Your book available through major retailers worldwide including Amazon, Barnes & Noble, and academic bookstores.
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-bold text-[#1e3a5f] mb-2">Social Media Promotion</h3>
              <p className="text-gray-600 text-sm">
                Strategic social media campaigns across LinkedIn, Twitter, Facebook, and academic networks.
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-bold text-[#1e3a5f] mb-2">Press & Media</h3>
              <p className="text-gray-600 text-sm">
                Press releases, media kits, and outreach to academic publications and news outlets.
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-bold text-[#1e3a5f] mb-2">Email Campaigns</h3>
              <p className="text-gray-600 text-sm">
                Targeted email marketing to relevant academic communities and professional networks.
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-bold text-[#1e3a5f] mb-2">Conference Presence</h3>
              <p className="text-gray-600 text-sm">
                Book displays and promotions at relevant academic conferences and events.
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-bold text-[#1e3a5f] mb-2">Analytics & Reporting</h3>
              <p className="text-gray-600 text-sm">
                Regular reports on sales, downloads, citations, and engagement metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Author Toolkit */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Author Marketing Toolkit</h2>
              <p className="text-gray-600 mb-8">
                We provide you with everything you need to promote your book effectively.
              </p>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900">Promotional Graphics</h3>
                  <p className="text-gray-600 text-sm">High-quality images and banners for social media and websites</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900">Press Release Template</h3>
                  <p className="text-gray-600 text-sm">Ready-to-use press release announcing your publication</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900">Social Media Kit</h3>
                  <p className="text-gray-600 text-sm">Pre-written posts and hashtag strategies for multiple platforms</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900">Author Interview Guide</h3>
                  <p className="text-gray-600 text-sm">Sample Q&A for podcasts, webinars, and media interviews</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1e3a5f] to-[#152d4a] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Maximize Your Impact</h3>
              <p className="text-blue-100 mb-6">
                Join our author community and learn best practices for promoting your academic work.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Author webinars and workshops</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Marketing tips and guides</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Networking opportunities</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Collaborative promotions</span>
                </div>
              </div>

              <Link
                href="/contact"
                className="block w-full bg-white text-[#1e3a5f] text-center py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
              >
                Contact Marketing Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Marketing Success</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-[#1e3a5f] mb-2">50+</div>
              <div className="text-gray-600">Countries Reached</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-[#1e3a5f] mb-2">1000+</div>
              <div className="text-gray-600">Library Acquisitions</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-[#1e3a5f] mb-2">10K+</div>
              <div className="text-gray-600">Academic Downloads</div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Journey */}
      <section className="py-16 bg-gradient-to-r from-[#1e3a5f] to-[#152d4a] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
          <p className="text-blue-100 mb-8 text-lg">
            You&apos;ve completed the book publishing journey. Your work is now available to readers worldwide,
            making a lasting contribution to your field.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/books/submit-proposal"
              className="bg-white text-[#1e3a5f] px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Start Another Book
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
