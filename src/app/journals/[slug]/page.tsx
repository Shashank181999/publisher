import Link from "next/link";
import { notFound } from "next/navigation";
import { journals } from "@/data/journals";

interface JournalPageProps {
  params: Promise<{ slug: string }>;
}

// Editorial Board Data (sample)
const editorialBoard = {
  'editor-in-chief': [
    { name: 'Prof. Sarah Mitchell', affiliation: 'University of London', country: 'United Kingdom' }
  ],
  'managing-editor': [
    { name: 'Dr. James Wilson', affiliation: 'Imperial College London', country: 'United Kingdom' }
  ],
  'editors': [
    { name: 'Dr. Emma Thompson', affiliation: 'University of Edinburgh', country: 'United Kingdom' },
    { name: 'Dr. Michael Brown', affiliation: 'University of Oxford', country: 'United Kingdom' },
    { name: 'Dr. Lisa Anderson', affiliation: 'Kings College London', country: 'United Kingdom' },
  ],
  'assistant-editors': [
    { name: 'Dr. Robert Taylor', affiliation: 'University of Manchester', country: 'United Kingdom' },
    { name: 'Dr. Catherine Harris', affiliation: 'University of Cambridge', country: 'United Kingdom' },
  ]
};

// Advisory Board
const advisoryBoard = [
  { name: 'Prof. John Smith', affiliation: 'Harvard Medical School', country: 'USA' },
  { name: 'Prof. Maria Garcia', affiliation: 'University of Barcelona', country: 'Spain' },
  { name: 'Prof. Hiroshi Tanaka', affiliation: 'University of Tokyo', country: 'Japan' },
  { name: 'Prof. Anna Mueller', affiliation: 'University of Munich', country: 'Germany' },
];

export async function generateStaticParams() {
  return journals.map((journal) => ({
    slug: journal.slug,
  }));
}

export async function generateMetadata({ params }: JournalPageProps) {
  const { slug } = await params;
  const journal = journals.find((j) => j.slug === slug);
  if (!journal) return { title: 'Journal Not Found' };
  return {
    title: `${journal.name} | Great Britain Publishers`,
    description: journal.description,
  };
}

export default async function JournalPage({ params }: JournalPageProps) {
  const { slug } = await params;
  const journal = journals.find((j) => j.slug === slug);

  if (!journal) {
    notFound();
  }

  const tabs = [
    { id: 'home', name: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'about', name: 'About', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'editorial', name: 'Editorial Board', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
    { id: 'current', name: 'Current Issue', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'archives', name: 'Archives', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
    { id: 'author-info', name: 'For Authors', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
    { id: 'policies', name: 'Policies', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Journal Header */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#152d4a] text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-blue-200 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/journals" className="hover:text-white">Journals</Link>
            <span>/</span>
            <span className="text-white font-medium">{journal.shortName}</span>
          </nav>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-[#1e3a5f] font-bold text-2xl md:text-3xl">{journal.shortName}</span>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{journal.name}</h1>
              <p className="text-blue-200 mb-4">{journal.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="bg-blue-700/50 px-3 py-1 rounded-full">ISSN: {journal.issn}</span>
                <span className="bg-blue-700/50 px-3 py-1 rounded-full">{journal.frequency}</span>
                <span className="bg-blue-400/80 px-3 py-1 rounded-full">Open Access</span>
                <span className="bg-blue-300/80 px-3 py-1 rounded-full">Peer Reviewed</span>
              </div>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <Link
                href="/submissions"
                className="bg-white text-[#1e3a5f] px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition text-sm"
              >
                Submit Paper
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-[60px] z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                className="flex items-center gap-2 px-4 py-4 text-sm font-medium text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition whitespace-nowrap"
              >
                {tab.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Home Section */}
            <section id="home" className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to {journal.name}</h2>
              <p className="text-gray-600 mb-6">{journal.description}</p>

              <h3 className="font-semibold text-gray-900 mb-3">Scope & Focus</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {journal.subjects.map((subject, idx) => (
                  <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm">
                    {subject}
                  </span>
                ))}
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-[#1e3a5f] mb-1">4-6</div>
                  <div className="text-sm text-gray-600">Weeks Review Time</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-[#1e3a5f] mb-1">85%</div>
                  <div className="text-sm text-gray-600">Acceptance Rate</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-[#1e3a5f] mb-1">2-3</div>
                  <div className="text-sm text-gray-600">Days to First Decision</div>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Journal</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 mb-4">
                  {journal.name} is a peer-reviewed, open-access journal published by Great Britain Publishers.
                  The journal aims to advance scientific knowledge and promote best practices in {journal.subjects[0].toLowerCase()}
                  and related fields through rigorous research and scholarly discourse.
                </p>
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Aims & Scope</h3>
                <p className="text-gray-600 mb-4">
                  We publish original research articles, review articles, case studies, and short communications
                  that contribute to the advancement of knowledge in our focus areas. The journal welcomes
                  submissions from researchers, clinicians, and practitioners worldwide.
                </p>
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Review Process</h3>
                <p className="text-gray-600">
                  All submissions undergo a rigorous double-blind peer review process. Our expert reviewers
                  evaluate manuscripts for scientific merit, originality, methodology, and contribution to the field.
                </p>
              </div>
            </section>

            {/* Editorial Board */}
            <section id="editorial" className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Editorial Board</h2>

              {/* Editor in Chief */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#1e3a5f] rounded-full"></span>
                  Editor-in-Chief
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {editorialBoard['editor-in-chief'].map((member, idx) => (
                    <div key={idx} className="bg-blue-50 rounded-lg p-4">
                      <div className="font-semibold text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-600">{member.affiliation}</div>
                      <div className="text-sm text-gray-500">{member.country}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Managing Editor */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#1e3a5f] rounded-full"></span>
                  Managing Editor
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {editorialBoard['managing-editor'].map((member, idx) => (
                    <div key={idx} className="bg-blue-50 rounded-lg p-4">
                      <div className="font-semibold text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-600">{member.affiliation}</div>
                      <div className="text-sm text-gray-500">{member.country}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Editors */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#1e3a5f] rounded-full"></span>
                  Editors
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {editorialBoard['editors'].map((member, idx) => (
                    <div key={idx} className="bg-blue-50 rounded-lg p-4">
                      <div className="font-semibold text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-600">{member.affiliation}</div>
                      <div className="text-sm text-gray-500">{member.country}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assistant Editors */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#1e3a5f] rounded-full"></span>
                  Assistant Editors
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {editorialBoard['assistant-editors'].map((member, idx) => (
                    <div key={idx} className="bg-blue-50 rounded-lg p-4">
                      <div className="font-semibold text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-600">{member.affiliation}</div>
                      <div className="text-sm text-gray-500">{member.country}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advisory Board */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                  Advisory Board
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {advisoryBoard.map((member, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4">
                      <div className="font-semibold text-gray-900 text-sm">{member.name}</div>
                      <div className="text-xs text-gray-600">{member.affiliation}</div>
                      <div className="text-xs text-gray-500">{member.country}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Current Issue */}
            <section id="current" className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Issue</h2>
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Volume 1, Issue 1 (2024)</h3>
                <p className="text-gray-600 mb-4">
                  Our inaugural issue is coming soon. Submit your research to be part of our first publication.
                </p>
                <Link
                  href="/submissions"
                  className="inline-block bg-[#1e3a5f] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#152d4a] transition"
                >
                  Submit Your Paper
                </Link>
              </div>
            </section>

            {/* Archives */}
            <section id="archives" className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Archives</h2>
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-600">
                  Archives will be available after the first issue is published.
                </p>
              </div>
            </section>

            {/* Author Information */}
            <section id="author-info" className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Information for Authors</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Submission Guidelines</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-[#1e3a5f] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Manuscripts should be submitted in Microsoft Word format (.doc or .docx)
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-[#1e3a5f] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Use 12-point Times New Roman font with 1.5 line spacing
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-[#1e3a5f] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Include abstract (250-300 words) and 4-6 keywords
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-[#1e3a5f] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Follow APA 7th edition citation style
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Article Types</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-1">Original Research</h4>
                      <p className="text-sm text-gray-600">4,000-8,000 words</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-1">Review Articles</h4>
                      <p className="text-sm text-gray-600">5,000-10,000 words</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-1">Case Studies</h4>
                      <p className="text-sm text-gray-600">2,000-4,000 words</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-1">Short Communications</h4>
                      <p className="text-sm text-gray-600">1,500-2,500 words</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Policies */}
            <section id="policies" className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Journal Policies</h2>

              <div className="space-y-6">
                <div className="border-l-4 border-[#1e3a5f] pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Open Access Policy</h3>
                  <p className="text-gray-600 text-sm">
                    This journal provides immediate open access to its content, making research freely available to support global knowledge exchange.
                  </p>
                </div>

                <div className="border-l-4 border-[#1e3a5f] pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Peer Review Policy</h3>
                  <p className="text-gray-600 text-sm">
                    All submissions undergo double-blind peer review. Reviewers and authors remain anonymous throughout the review process.
                  </p>
                </div>

                <div className="border-l-4 border-[#1e3a5f] pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Publication Ethics</h3>
                  <p className="text-gray-600 text-sm">
                    We follow COPE guidelines for publication ethics. Plagiarism, data fabrication, and duplicate submission are strictly prohibited.
                  </p>
                </div>

                <div className="border-l-4 border-[#1e3a5f] pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Copyright Policy</h3>
                  <p className="text-gray-600 text-sm">
                    Authors retain copyright under Creative Commons Attribution (CC BY) license, allowing others to share and adapt the work with proper attribution.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Submit Box */}
            <div className="bg-gradient-to-br from-[#1e3a5f] to-[#152d4a] rounded-xl p-6 text-white">
              <h3 className="font-bold text-lg mb-3">Submit Your Research</h3>
              <p className="text-blue-100 text-sm mb-4">
                Ready to publish? Start your submission today.
              </p>
              <Link
                href="/submissions"
                className="block w-full bg-white text-[#1e3a5f] py-2.5 rounded-lg font-semibold text-center hover:bg-blue-50 transition"
              >
                Submit Manuscript
              </Link>
            </div>

            {/* Journal Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Journal Information</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">ISSN (Online)</dt>
                  <dd className="text-gray-900 font-medium">{journal.issn}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Frequency</dt>
                  <dd className="text-gray-900 font-medium">{journal.frequency}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Established</dt>
                  <dd className="text-gray-900 font-medium">{journal.established}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Access</dt>
                  <dd className="text-[#1e3a5f] font-medium">Open Access</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Review</dt>
                  <dd className="text-gray-900 font-medium">Double-Blind</dd>
                </div>
              </dl>
            </div>

            {/* APC */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Article Processing Charge (APC)</h3>
              <div className="text-center py-4">
                <div className="text-3xl font-bold text-[#1e3a5f]">£200</div>
                <div className="text-gray-500 text-sm">per accepted article</div>
              </div>
              <p className="text-gray-600 text-sm mt-4">
                APC is only charged after acceptance. No submission fees. Discounts available for authors from developing countries.
              </p>
              <Link href="/fee-structure" className="text-blue-600 text-sm font-medium hover:underline mt-3 block">
                View Fee Details →
              </Link>
            </div>

            {/* Indexing */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Indexing</h3>
              <p className="text-gray-600 text-sm mb-4">
                This journal is indexed in:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Google Scholar
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Crossref
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  DOAJ (Applied)
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Contact</h3>
              <div className="space-y-3 text-sm">
                <a
                  href={`mailto:${journal.editorInChief.email}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {journal.editorInChief.email}
                </a>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  General Inquiries
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
