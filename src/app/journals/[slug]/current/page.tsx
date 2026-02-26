import Link from "next/link";
import { notFound } from "next/navigation";
import { getJournalBySlug } from "@/lib/cms";
import { getOJSJournalData } from "@/lib/ojs";

interface Props {
  params: Promise<{ slug: string }>;
}

// Preview articles for demonstration
const PREVIEW_ARTICLES: Record<string, { id: number; title: string; authors: string[]; abstract: string }[]> = {
  'allied-health-sciences': [
    { id: 1, title: "Effectiveness of Telerehabilitation in Post-Stroke Recovery: A Systematic Review", authors: ["Dr. Sarah Mitchell", "Prof. James Anderson"], abstract: "This systematic review examines the effectiveness of telerehabilitation interventions for stroke survivors. Analysis of 45 randomized controlled trials demonstrates significant improvements in motor function and quality of life outcomes." },
    { id: 2, title: "Impact of Physical Therapy on Chronic Pain Management in Elderly Patients", authors: ["Dr. Emily Watson", "Dr. Michael Brown"], abstract: "A comprehensive study investigating physical therapy modalities for chronic pain management in geriatric populations, showing 40% improvement in pain scores." },
  ],
  'medical-science': [
    { id: 1, title: "Artificial Intelligence in Medical Diagnostics: Current Applications and Future Perspectives", authors: ["Dr. Ahmed Khan", "Dr. Emily Roberts"], abstract: "This comprehensive review explores the integration of artificial intelligence in medical diagnostics, examining current clinical applications in radiology, pathology, and dermatology with promising accuracy rates." },
    { id: 2, title: "Novel Biomarkers for Early Detection of Cardiovascular Disease", authors: ["Prof. David Wilson", "Dr. Lisa Chen"], abstract: "Research identifying new biomarkers that could revolutionize early detection of cardiovascular disease, potentially saving millions of lives worldwide." },
  ],
  'radiography-operation-technology': [
    { id: 1, title: "Advances in Digital Radiography: Image Quality Optimization Techniques", authors: ["Prof. David Wilson", "Dr. Lisa Chen"], abstract: "This study investigates modern optimization techniques in digital radiography, focusing on dose reduction while maintaining diagnostic image quality in clinical settings." },
    { id: 2, title: "Radiation Dose Reduction in Pediatric CT Imaging", authors: ["Dr. James Taylor", "Dr. Maria Garcia"], abstract: "A groundbreaking study on reducing radiation exposure in pediatric CT scans without compromising diagnostic accuracy." },
  ],
  'computer-science-technology': [
    { id: 1, title: "Machine Learning Approaches for Cybersecurity Threat Detection", authors: ["Dr. Michael Brown", "Dr. Priya Sharma"], abstract: "This research presents novel machine learning algorithms for real-time cybersecurity threat detection, achieving 97.8% accuracy in identifying malicious network activities." },
    { id: 2, title: "Blockchain Technology in Healthcare Data Management", authors: ["Dr. Alex Turner", "Prof. Sarah Lee"], abstract: "Exploring the potential of blockchain technology to secure and streamline healthcare data management systems." },
  ],
  'social-sciences': [
    { id: 1, title: "Impact of Social Media on Adolescent Mental Health: A Cross-Cultural Study", authors: ["Dr. Jennifer Lee", "Prof. Hassan Ali"], abstract: "This cross-cultural study examines the relationship between social media usage patterns and mental health outcomes among adolescents across five countries, revealing significant correlations." },
    { id: 2, title: "Remote Work and Employee Well-being: Post-Pandemic Analysis", authors: ["Dr. Emma Davis", "Dr. Robert Johnson"], abstract: "A comprehensive analysis of how remote work arrangements have affected employee mental health and productivity in the post-pandemic era." },
  ],
};

export default async function CurrentIssuePage({ params }: Props) {
  const { slug } = await params;
  const cmsJournal = await getJournalBySlug(slug);

  if (!cmsJournal || !cmsJournal.ojsPath) {
    notFound();
  }

  let ojsData = null;
  try {
    ojsData = await getOJSJournalData(cmsJournal.ojsPath);
  } catch (error) {
    console.error('Error fetching OJS data:', error);
  }

  // Use preview articles if no real articles
  const previewArticles = PREVIEW_ARTICLES[slug] || [];
  const articlesToShow = ojsData?.recentArticles?.length > 0 ? ojsData.recentArticles : previewArticles;
  const hasContent = articlesToShow.length > 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#1e3a5f] text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm mb-2">
            <Link href="/" className="text-blue-200 hover:text-white">Home</Link>
            <span className="text-blue-300">/</span>
            <Link href="/journals" className="text-blue-200 hover:text-white">Journals</Link>
            <span className="text-blue-300">/</span>
            <Link href={`/journals/${slug}`} className="text-blue-200 hover:text-white">{ojsData?.shortName || cmsJournal.shortName}</Link>
            <span className="text-blue-300">/</span>
            <span>Current Issue</span>
          </nav>
          <h1 className="text-2xl font-bold">{ojsData?.name || cmsJournal.name}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Current Issue
            <span className="text-lg font-normal text-gray-600 ml-3">
              Vol. 1, No. 1 (2024)
            </span>
          </h2>

          {hasContent ? (
            <div className="space-y-6">
              {articlesToShow.map((article, index) => (
                <div key={article.id || index} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    <Link
                      href={`/journals/${slug}/article/${article.id}`}
                      className="text-[#1e3a5f] hover:text-blue-600 transition"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  {article.authors.length > 0 && (
                    <p className="text-gray-600 flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {article.authors.join(', ')}
                    </p>
                  )}
                  {'abstract' in article && article.abstract && (
                    <p className="text-gray-500 text-sm line-clamp-2 mb-3">{article.abstract}</p>
                  )}
                  <div className="flex gap-4">
                    <Link
                      href={`/journals/${slug}/article/${article.id}`}
                      className="inline-flex items-center gap-1 text-[#1e3a5f] text-sm font-medium hover:text-blue-600 transition"
                    >
                      Read Article
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">No articles published yet.</p>
              <Link
                href={`/journals/${slug}/submissions`}
                className="inline-flex items-center gap-2 bg-[#1e3a5f] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#152d4a] transition"
              >
                Submit Your Research
              </Link>
            </div>
          )}
        </div>

        <div className="mt-6">
          <Link href={`/journals/${slug}`} className="inline-flex items-center gap-2 text-[#1e3a5f] hover:text-blue-600 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to {ojsData?.shortName || cmsJournal.shortName}
          </Link>
        </div>
      </div>
    </div>
  );
}
