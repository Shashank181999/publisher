import Link from "next/link";
import OJSArticles from "@/components/OJSArticles";

export default function ArchivesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#152d4a] py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white">Archives</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm text-white/90 mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Published Research
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Article Archives
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Browse all published articles from our peer-reviewed journals. All articles are open access and freely available.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#1e3a5f]">All Published Articles</h2>
            <Link
              href="/submissions"
              className="inline-flex items-center gap-2 bg-[#1e3a5f] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#152d4a] transition-all text-sm"
            >
              Submit Research
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Link>
          </div>

          <OJSArticles limit={50} showJournalName={true} preview={true} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">
            Want to Publish Your Research?
          </h2>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Submit your manuscript to one of our peer-reviewed journals. We offer fast review, open access, and global visibility for your research.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/submissions"
              className="inline-flex items-center gap-2 bg-[#1e3a5f] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#152d4a] transition-all"
            >
              Submit Manuscript
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/journals"
              className="inline-flex items-center gap-2 bg-slate-100 text-[#1e3a5f] px-6 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-all"
            >
              Browse Journals
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
