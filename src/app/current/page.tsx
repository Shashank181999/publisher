import Link from "next/link";
import OJSArticles from "@/components/OJSArticles";

export default function CurrentIssuePage() {
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
            <span className="text-white">Current Issue</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 px-4 py-2 rounded-full text-sm text-green-200 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Latest Publications
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Current Issue
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Browse the latest published articles from all our peer-reviewed journals.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#1e3a5f]">Recently Published</h2>
            <Link
              href="/archives"
              className="inline-flex items-center gap-2 text-[#1e3a5f] font-medium hover:text-blue-600 transition-colors"
            >
              View All Archives
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <OJSArticles limit={10} showJournalName={true} preview={true} />
        </div>
      </section>

      {/* Journal Links */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-bold text-[#1e3a5f] mb-6 text-center">Browse by Journal</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Allied Health Sciences", slug: "allied-health-sciences", shortName: "BJAHS" },
              { name: "Medical Science", slug: "medical-science", shortName: "BJMS" },
              { name: "Radiography & Operation Technology", slug: "radiography-operation-technology", shortName: "BJROT" },
              { name: "Computer Science & Technology", slug: "computer-science-technology", shortName: "BJCSTECH" },
              { name: "Social Sciences", slug: "social-sciences", shortName: "BJSS" },
            ].map((journal) => (
              <Link
                key={journal.slug}
                href={`/journals/${journal.slug}/current`}
                className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-[#1e3a5f] hover:bg-blue-50 transition-all group"
              >
                <div className="w-10 h-10 bg-[#1e3a5f] rounded-lg flex items-center justify-center text-white text-xs font-bold group-hover:bg-blue-600 transition-colors">
                  {journal.shortName.slice(0, 2)}
                </div>
                <div>
                  <div className="font-semibold text-[#1e3a5f] text-sm">{journal.shortName}</div>
                  <div className="text-xs text-slate-500 line-clamp-1">{journal.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
