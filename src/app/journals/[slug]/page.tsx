import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getJournals, getJournalBySlug } from "@/lib/cms";
import { getOJSJournalData, getOJSArchives } from "@/lib/ojs";

interface JournalPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const journals = await getJournals();
  return journals.map((journal) => ({
    slug: journal.slug,
  }));
}

export async function generateMetadata({ params }: JournalPageProps) {
  const { slug } = await params;
  const cmsJournal = await getJournalBySlug(slug);
  if (!cmsJournal) return { title: 'Journal Not Found' };

  let ojsData = null;
  if (cmsJournal.ojsPath) {
    try {
      ojsData = await getOJSJournalData(cmsJournal.ojsPath);
    } catch (error) {
      console.error('Error fetching OJS data:', error);
    }
  }

  return {
    title: `${ojsData?.name || cmsJournal.name} | Great Britain Publishers`,
    description: ojsData?.aboutTheJournal || cmsJournal.description,
  };
}

// Preview articles for demonstration
const PREVIEW_ARTICLES: Record<string, { id: number; title: string; authors: string[] }[]> = {
  'allied-health-sciences': [
    { id: 1, title: "Effectiveness of Telerehabilitation in Post-Stroke Recovery: A Systematic Review", authors: ["Dr. Sarah Mitchell", "Prof. James Anderson"] },
    { id: 2, title: "Impact of Physical Therapy on Chronic Pain Management in Elderly Patients", authors: ["Dr. Emily Watson", "Dr. Michael Brown"] },
  ],
  'medical-science': [
    { id: 1, title: "Artificial Intelligence in Medical Diagnostics: Current Applications and Future Perspectives", authors: ["Dr. Ahmed Khan", "Dr. Emily Roberts"] },
    { id: 2, title: "Novel Biomarkers for Early Detection of Cardiovascular Disease", authors: ["Prof. David Wilson", "Dr. Lisa Chen"] },
  ],
  'radiography-operation-technology': [
    { id: 1, title: "Advances in Digital Radiography: Image Quality Optimization Techniques", authors: ["Prof. David Wilson", "Dr. Lisa Chen"] },
    { id: 2, title: "Radiation Dose Reduction in Pediatric CT Imaging", authors: ["Dr. James Taylor", "Dr. Maria Garcia"] },
  ],
  'computer-science-technology': [
    { id: 1, title: "Machine Learning Approaches for Cybersecurity Threat Detection", authors: ["Dr. Michael Brown", "Dr. Priya Sharma"] },
    { id: 2, title: "Blockchain Technology in Healthcare Data Management", authors: ["Dr. Alex Turner", "Prof. Sarah Lee"] },
  ],
  'social-sciences': [
    { id: 1, title: "Impact of Social Media on Adolescent Mental Health: A Cross-Cultural Study", authors: ["Dr. Jennifer Lee", "Prof. Hassan Ali"] },
    { id: 2, title: "Remote Work and Employee Well-being: Post-Pandemic Analysis", authors: ["Dr. Emma Davis", "Dr. Robert Johnson"] },
  ],
};

export default async function JournalPage({ params }: JournalPageProps) {
  const { slug } = await params;
  const cmsJournal = await getJournalBySlug(slug);

  if (!cmsJournal) {
    notFound();
  }

  let ojsData = null;
  let ojsArchives: Awaited<ReturnType<typeof getOJSArchives>> = [];

  if (cmsJournal.ojsPath) {
    try {
      [ojsData, ojsArchives] = await Promise.all([
        getOJSJournalData(cmsJournal.ojsPath),
        getOJSArchives(cmsJournal.ojsPath),
      ]);
    } catch (error) {
      console.error('Error fetching OJS data:', error);
    }
  }

  // Use preview articles if no real articles (for demonstration)
  const previewArticles = PREVIEW_ARTICLES[slug] || [];
  const hasPreviewContent = previewArticles.length > 0;

  const navItems = [
    { label: "Home", href: `/journals/${slug}` },
    { label: "About", href: `/journals/${slug}/about` },
    { label: "Current Issue", href: `/journals/${slug}/current` },
    { label: "Archives", href: `/journals/${slug}/archives` },
    { label: "Submit", href: `/journals/${slug}/submissions` },
    { label: "Editorial Board", href: `/journals/${slug}/editorial-board` },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#1e3a5f] via-[#2d4a6f] to-[#1e3a5f] text-white">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <nav className="flex items-center gap-2 text-sm text-blue-200">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link href="/journals" className="hover:text-white transition">Journals</Link>
            <span>/</span>
            <span className="text-white">{ojsData?.shortName || cmsJournal.name}</span>
          </nav>
        </div>

        {/* Journal Header */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Journal Logo */}
            {ojsData?.logoUrl && (
              <div className="w-32 h-32 bg-white rounded-xl shadow-lg p-2 flex-shrink-0">
                <Image
                  src={ojsData.logoUrl}
                  alt={ojsData.name}
                  width={120}
                  height={120}
                  className="w-full h-full object-contain"
                  unoptimized
                />
              </div>
            )}
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {ojsData?.name || cmsJournal.name}
              </h1>
              <p className="text-blue-200 text-sm md:text-base">
                ISSN: {cmsJournal.issn || 'Pending'} | Open Access | Peer Reviewed
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium">
                  Quarterly Publication
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-200 rounded-full text-xs font-medium">
                  Accepting Submissions
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 text-sm font-medium hover:bg-white/10 transition whitespace-nowrap rounded-t-lg"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Banner Image */}
      {ojsData?.homepageImageUrl && (
        <div className="bg-gradient-to-b from-slate-100 to-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <Image
                src={ojsData.homepageImageUrl}
                alt={ojsData.name}
                width={1200}
                height={400}
                className="w-full h-auto object-contain"
                unoptimized
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">About the Journal</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {ojsData?.aboutTheJournal || `The ${cmsJournal.name} is a peer-reviewed academic journal that publishes research and scholarly articles.`}
              </p>
              <Link
                href={`/journals/${slug}/about`}
                className="inline-flex items-center gap-2 mt-4 text-[#1e3a5f] font-medium hover:gap-3 transition-all"
              >
                Learn more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Current Issue - Show preview or real articles */}
            {(ojsData?.hasPublishedContent && ojsData.recentArticles.length > 0) || hasPreviewContent ? (
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Current Issue</h2>
                      <p className="text-sm text-gray-500">
                        Vol. 1, No. 1 (2024)
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/journals/${slug}/current`}
                    className="text-[#1e3a5f] text-sm font-medium hover:underline"
                  >
                    View All
                  </Link>
                </div>
                <div className="space-y-4">
                  {(ojsData?.recentArticles || previewArticles).slice(0, 4).map((article, index) => (
                    <Link
                      key={article.id || index}
                      href={`/journals/${slug}/article/${article.id}`}
                      className="block p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition group"
                    >
                      <h3 className="font-medium text-gray-900 group-hover:text-[#1e3a5f] transition line-clamp-2">
                        {article.title}
                      </h3>
                      {article.authors.length > 0 && (
                        <p className="text-sm text-gray-500 mt-1">
                          {article.authors.join(', ')}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border-l-4 border-[#1e3a5f] p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#1e3a5f]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Call for Papers</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  We are now accepting submissions for upcoming issues. Submit your research and contribute to the advancement of knowledge in your field.
                </p>
                <Link
                  href={`/journals/${slug}/submissions`}
                  className="inline-flex items-center gap-2 bg-[#1e3a5f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2d4a6f] transition"
                >
                  Submit Your Manuscript
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            )}

            {/* Author Information */}
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">For Authors</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                {ojsData?.informationForAuthors || `We invite submissions of original research that advances knowledge in the field.`}
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <Link
                  href={`/journals/${slug}/submissions`}
                  className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-[#1e3a5f] hover:text-white transition group"
                >
                  <svg className="w-5 h-5 text-[#1e3a5f] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="font-medium">Submission Guidelines</span>
                </Link>
                <a
                  href={`mailto:${ojsData?.editorEmail}`}
                  className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-[#1e3a5f] hover:text-white transition group"
                >
                  <svg className="w-5 h-5 text-[#1e3a5f] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">Contact Editor</span>
                </a>
              </div>
            </div>

            {/* Archives */}
            {ojsArchives.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Archives</h2>
                  </div>
                  <Link
                    href={`/journals/${slug}/archives`}
                    className="text-[#1e3a5f] text-sm font-medium hover:underline"
                  >
                    View All
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {ojsArchives.slice(0, 8).map((issue) => (
                    <Link
                      key={issue.id}
                      href={`/journals/${slug}/issue/${issue.id}`}
                      className="p-4 rounded-xl bg-gray-50 hover:bg-blue-50 border border-transparent hover:border-[#1e3a5f] transition text-center group"
                    >
                      <p className="font-semibold text-[#1e3a5f] group-hover:text-[#c8102e] transition">
                        Vol. {issue.volume}
                      </p>
                      <p className="text-sm text-gray-500">No. {issue.number}</p>
                      <p className="text-xs text-gray-400 mt-1">{issue.year}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Submit CTA */}
            <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Ready to Publish?</h3>
              <p className="text-blue-200 text-sm mb-4">
                Submit your research and join our community of scholars.
              </p>
              <Link
                href={`/journals/${slug}/submissions`}
                className="block w-full text-center bg-white text-[#1e3a5f] py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Submit Manuscript
              </Link>
            </div>

            {/* Journal Info */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Journal Info
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Publisher</span>
                  <span className="font-medium text-gray-900">Great Britain Publishers</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">ISSN</span>
                  <span className="font-medium text-gray-900">{cmsJournal.issn || 'Pending'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Frequency</span>
                  <span className="font-medium text-gray-900">Quarterly</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Language</span>
                  <span className="font-medium text-gray-900">English</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Access</span>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">Open Access</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Quick Links
              </h3>
              <div className="space-y-2">
                {[
                  { label: "About Journal", href: `/journals/${slug}/about`, icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                  { label: "Editorial Board", href: `/journals/${slug}/editorial-board`, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
                  { label: "Current Issue", href: `/journals/${slug}/current`, icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
                  { label: "Archives", href: `/journals/${slug}/archives`, icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition group"
                  >
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                    </svg>
                    <span className="text-gray-700 group-hover:text-[#1e3a5f] font-medium">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Editor
              </h3>
              <div className="space-y-3">
                <a
                  href={`mailto:${ojsData?.editorEmail}`}
                  className="flex items-center gap-2 text-sm text-[#1e3a5f] hover:underline"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {ojsData?.editorEmail}
                </a>
                <a
                  href={`mailto:${ojsData?.editorEmail2}`}
                  className="flex items-center gap-2 text-sm text-[#1e3a5f] hover:underline"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {ojsData?.editorEmail2}
                </a>
              </div>
            </div>

            {/* Back Link */}
            <Link
              href="/journals"
              className="flex items-center gap-2 text-gray-500 hover:text-[#1e3a5f] transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to All Journals
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
