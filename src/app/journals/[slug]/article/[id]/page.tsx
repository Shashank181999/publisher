import Link from "next/link";
import { notFound } from "next/navigation";
import { getJournalBySlug } from "@/lib/cms";
import { getOJSJournalData, getOJSArticle } from "@/lib/ojs";

interface Props {
  params: Promise<{ slug: string; id: string }>;
}

// Preview articles for demonstration
const PREVIEW_ARTICLES: Record<string, Record<number, {
  title: string;
  authors: { name: string; affiliation: string; email?: string }[];
  abstract: string;
  keywords: string[];
  doi: string;
  publishedDate: string;
  volume: number;
  issue: number;
  pages: string;
  pdfUrl?: string;
}>> = {
  'allied-health-sciences': {
    1: {
      title: "Effectiveness of Telerehabilitation in Post-Stroke Recovery: A Systematic Review",
      authors: [
        { name: "Dr. Sarah Mitchell", affiliation: "Department of Rehabilitation Sciences, University of Manchester", email: "s.mitchell@manchester.ac.uk" },
        { name: "Prof. James Anderson", affiliation: "School of Health Sciences, University of Leeds" },
        { name: "Dr. Maria Garcia", affiliation: "Institute of Neurology, University College London" }
      ],
      abstract: "Background: Telerehabilitation has emerged as a promising alternative to conventional rehabilitation, particularly in the post-COVID era. This systematic review examines the effectiveness of telerehabilitation interventions for stroke survivors.\n\nMethods: We conducted a comprehensive search of PubMed, CINAHL, Cochrane Library, and Web of Science databases from January 2015 to December 2024. Randomized controlled trials (RCTs) comparing telerehabilitation with conventional rehabilitation or no intervention in adult stroke survivors were included.\n\nResults: Analysis of 45 randomized controlled trials involving 3,847 participants demonstrates significant improvements in motor function (SMD = 0.58, 95% CI: 0.42-0.74), activities of daily living (SMD = 0.45, 95% CI: 0.31-0.59), and quality of life outcomes (SMD = 0.52, 95% CI: 0.38-0.66). Patient satisfaction rates exceeded 85% across all studies.\n\nConclusions: Telerehabilitation represents an effective and accessible alternative to traditional rehabilitation for stroke survivors. Future research should focus on long-term outcomes and cost-effectiveness analyses.",
      keywords: ["Telerehabilitation", "Stroke Recovery", "Systematic Review", "Motor Function", "Quality of Life", "Remote Healthcare"],
      doi: "10.1234/bjahs.2024.001",
      publishedDate: "2024-12-15",
      volume: 1,
      issue: 1,
      pages: "1-18"
    },
    2: {
      title: "Impact of Physical Therapy on Chronic Pain Management in Elderly Patients",
      authors: [
        { name: "Dr. Emily Watson", affiliation: "Department of Geriatric Medicine, Royal London Hospital" },
        { name: "Dr. Michael Brown", affiliation: "Pain Management Center, Guy's and St Thomas' NHS Trust" }
      ],
      abstract: "Objective: To evaluate the effectiveness of multimodal physical therapy interventions in managing chronic pain among elderly patients aged 65 years and above.\n\nMethods: A prospective cohort study was conducted across 12 NHS trusts involving 892 patients with chronic musculoskeletal pain. Participants received a 12-week structured physical therapy program combining manual therapy, therapeutic exercise, and patient education.\n\nResults: Significant improvements were observed in pain intensity (40% reduction in VAS scores), functional capacity (35% improvement in WOMAC scores), and medication dependency (28% reduction in analgesic use). Improvements were maintained at 6-month follow-up.\n\nConclusions: Multimodal physical therapy represents an effective, safe, and cost-efficient approach for chronic pain management in elderly populations.",
      keywords: ["Physical Therapy", "Chronic Pain", "Elderly", "Geriatric Care", "Pain Management", "Rehabilitation"],
      doi: "10.1234/bjahs.2024.002",
      publishedDate: "2024-12-10",
      volume: 1,
      issue: 1,
      pages: "19-35"
    }
  },
  'medical-science': {
    1: {
      title: "Artificial Intelligence in Medical Diagnostics: Current Applications and Future Perspectives",
      authors: [
        { name: "Dr. Ahmed Khan", affiliation: "Department of Computer Science, Imperial College London", email: "a.khan@imperial.ac.uk" },
        { name: "Dr. Emily Roberts", affiliation: "School of Medicine, University of Oxford" }
      ],
      abstract: "Introduction: Artificial intelligence (AI) is revolutionizing medical diagnostics, offering unprecedented accuracy and efficiency in disease detection. This comprehensive review explores the current state and future potential of AI in clinical diagnostics.\n\nMethods: We analyzed 287 peer-reviewed studies published between 2020-2024, examining AI applications across radiology, pathology, dermatology, ophthalmology, and cardiology.\n\nResults: AI systems demonstrate diagnostic accuracy rates of 87-95% across various modalities, often matching or exceeding human expert performance. Deep learning algorithms achieved 94.5% sensitivity in detecting diabetic retinopathy, 91.2% accuracy in lung cancer screening, and 89.7% precision in cardiac arrhythmia classification.\n\nConclusions: AI is poised to transform medical diagnostics, though challenges remain in regulatory approval, clinical integration, and addressing algorithmic bias. Collaboration between technologists and clinicians will be essential for realizing AI's full potential in healthcare.",
      keywords: ["Artificial Intelligence", "Medical Diagnostics", "Machine Learning", "Deep Learning", "Healthcare Technology", "Clinical Decision Support"],
      doi: "10.1234/bjms.2024.001",
      publishedDate: "2024-12-10",
      volume: 1,
      issue: 1,
      pages: "1-22"
    },
    2: {
      title: "Novel Biomarkers for Early Detection of Cardiovascular Disease",
      authors: [
        { name: "Prof. David Wilson", affiliation: "British Heart Foundation Centre, University of Cambridge" },
        { name: "Dr. Lisa Chen", affiliation: "Department of Cardiology, King's College London" }
      ],
      abstract: "Background: Early detection of cardiovascular disease (CVD) remains a critical challenge in preventive medicine. This study identifies and validates novel circulating biomarkers for early CVD detection.\n\nMethods: A multi-center prospective study involving 5,200 participants followed over 8 years. Proteomics and metabolomics analyses were performed on baseline plasma samples, with incident CVD events recorded.\n\nResults: Three novel biomarker panels demonstrated superior predictive performance compared to traditional risk factors. The combined panel achieved an AUC of 0.89 for 10-year CVD risk prediction, significantly outperforming the Framingham Risk Score (AUC 0.72).\n\nConclusions: These novel biomarkers could revolutionize CVD risk stratification and enable more targeted preventive interventions.",
      keywords: ["Cardiovascular Disease", "Biomarkers", "Early Detection", "Proteomics", "Risk Prediction", "Preventive Medicine"],
      doi: "10.1234/bjms.2024.002",
      publishedDate: "2024-12-05",
      volume: 1,
      issue: 1,
      pages: "23-41"
    }
  },
  'radiography-operation-technology': {
    1: {
      title: "Advances in Digital Radiography: Image Quality Optimization Techniques",
      authors: [
        { name: "Prof. David Wilson", affiliation: "Department of Medical Imaging, University of Edinburgh" },
        { name: "Dr. Lisa Chen", affiliation: "Radiology Department, NHS Greater Glasgow" }
      ],
      abstract: "Purpose: To investigate and validate modern optimization techniques in digital radiography that achieve dose reduction while maintaining diagnostic image quality.\n\nMethods: A phantom study and retrospective clinical analysis of 2,500 radiographic examinations were conducted. Various image processing algorithms and acquisition parameters were systematically evaluated.\n\nResults: Implementation of iterative reconstruction algorithms combined with optimized exposure parameters achieved 35-45% dose reduction without compromising image quality. Radiologist diagnostic confidence remained unchanged (p > 0.05) across all anatomical regions studied.\n\nConclusions: Modern digital radiography systems, when properly optimized, can significantly reduce patient radiation exposure while maintaining excellent diagnostic quality.",
      keywords: ["Digital Radiography", "Image Quality", "Dose Optimization", "Iterative Reconstruction", "Radiation Protection"],
      doi: "10.1234/bjrot.2024.001",
      publishedDate: "2024-12-08",
      volume: 1,
      issue: 1,
      pages: "1-16"
    },
    2: {
      title: "Radiation Dose Reduction in Pediatric CT Imaging",
      authors: [
        { name: "Dr. James Taylor", affiliation: "Children's Hospital, Great Ormond Street" },
        { name: "Dr. Maria Garcia", affiliation: "Department of Pediatric Radiology, Alder Hey Hospital" }
      ],
      abstract: "Objective: To develop and validate pediatric CT protocols that minimize radiation dose while preserving diagnostic image quality for common clinical indications.\n\nMethods: Prospective study involving 1,200 pediatric CT examinations. Age-specific and weight-based protocols were developed using tube current modulation, iterative reconstruction, and optimized scan parameters.\n\nResults: New protocols achieved 40-60% dose reduction compared to adult-derived parameters. Image quality assessments showed no significant difference in diagnostic accuracy. Size-specific dose estimates (SSDE) were within internationally recommended diagnostic reference levels.\n\nConclusions: Implementing pediatric-specific CT protocols with modern dose reduction technologies significantly reduces radiation exposure in children without compromising diagnostic capability.",
      keywords: ["Pediatric CT", "Radiation Dose", "ALARA", "Dose Optimization", "Child Safety", "Medical Imaging"],
      doi: "10.1234/bjrot.2024.002",
      publishedDate: "2024-12-01",
      volume: 1,
      issue: 1,
      pages: "17-32"
    }
  },
  'computer-science-technology': {
    1: {
      title: "Machine Learning Approaches for Cybersecurity Threat Detection",
      authors: [
        { name: "Dr. Michael Brown", affiliation: "School of Computer Science, University of Bristol", email: "m.brown@bristol.ac.uk" },
        { name: "Dr. Priya Sharma", affiliation: "Cyber Security Centre, GCHQ" },
        { name: "Dr. Alex Turner", affiliation: "Department of Computing, Imperial College London" }
      ],
      abstract: "Introduction: As cyber threats evolve in sophistication, traditional rule-based detection systems increasingly fail to identify novel attack vectors. This research presents advanced machine learning algorithms for real-time cybersecurity threat detection.\n\nMethods: We developed and evaluated ensemble learning models combining deep neural networks, random forests, and gradient boosting machines. Training was performed on a curated dataset of 2.5 million network traffic samples including known attack signatures and normal traffic patterns.\n\nResults: The proposed ensemble system achieved 97.8% accuracy in identifying malicious network activities, with false positive rates below 0.3%. Real-time processing capability exceeded 100,000 packets per second on standard enterprise hardware.\n\nConclusions: Machine learning-based threat detection offers significant advantages over traditional approaches, enabling organizations to detect and respond to evolving cyber threats more effectively.",
      keywords: ["Machine Learning", "Cybersecurity", "Threat Detection", "Deep Learning", "Network Security", "Intrusion Detection"],
      doi: "10.1234/bjcstech.2024.001",
      publishedDate: "2024-12-05",
      volume: 1,
      issue: 1,
      pages: "1-19"
    },
    2: {
      title: "Blockchain Technology in Healthcare Data Management",
      authors: [
        { name: "Dr. Alex Turner", affiliation: "Department of Computing, Imperial College London" },
        { name: "Prof. Sarah Lee", affiliation: "Health Informatics Centre, University of Edinburgh" }
      ],
      abstract: "Background: Healthcare data management faces challenges in security, interoperability, and patient privacy. Blockchain technology offers potential solutions through its decentralized, immutable, and transparent architecture.\n\nMethods: We developed and implemented a permissioned blockchain framework for electronic health records (EHR) across three NHS pilot sites. The system was evaluated over 18 months involving 50,000 patient records.\n\nResults: The blockchain system demonstrated 99.99% uptime, eliminated data discrepancies between institutions, and reduced record retrieval time by 65%. Patient consent management was streamlined, with audit trails providing complete transparency.\n\nConclusions: Blockchain technology can effectively address key challenges in healthcare data management, though scalability and regulatory considerations require ongoing attention.",
      keywords: ["Blockchain", "Healthcare", "Data Management", "Electronic Health Records", "Privacy", "Interoperability"],
      doi: "10.1234/bjcstech.2024.002",
      publishedDate: "2024-11-28",
      volume: 1,
      issue: 1,
      pages: "20-38"
    }
  },
  'social-sciences': {
    1: {
      title: "Impact of Social Media on Adolescent Mental Health: A Cross-Cultural Study",
      authors: [
        { name: "Dr. Jennifer Lee", affiliation: "Department of Psychology, University of Cambridge", email: "j.lee@cam.ac.uk" },
        { name: "Prof. Hassan Ali", affiliation: "Institute of Psychiatry, King's College London" }
      ],
      abstract: "Objective: To examine the relationship between social media usage patterns and mental health outcomes among adolescents across diverse cultural contexts.\n\nMethods: A cross-sectional survey of 12,500 adolescents (ages 13-18) from the United Kingdom, United States, Japan, Brazil, and Nigeria. Validated instruments assessed social media use, depression, anxiety, self-esteem, and social comparison tendencies.\n\nResults: Significant correlations were found between social media use duration and mental health outcomes across all cultures. However, the strength of associations varied considerably: passive consumption showed stronger negative effects than active engagement. Cultural factors moderated the relationship between social comparison and mental health outcomes.\n\nConclusions: While social media impacts adolescent mental health globally, culturally-sensitive interventions are needed to address this emerging public health concern.",
      keywords: ["Social Media", "Adolescent Mental Health", "Cross-Cultural Study", "Depression", "Anxiety", "Digital Wellbeing"],
      doi: "10.1234/bjss.2024.001",
      publishedDate: "2024-12-01",
      volume: 1,
      issue: 1,
      pages: "1-20"
    },
    2: {
      title: "Remote Work and Employee Well-being: Post-Pandemic Analysis",
      authors: [
        { name: "Dr. Emma Davis", affiliation: "Business School, London School of Economics" },
        { name: "Dr. Robert Johnson", affiliation: "Department of Organizational Psychology, University of Manchester" }
      ],
      abstract: "Purpose: To analyze the long-term effects of remote work arrangements on employee mental health, productivity, and work-life balance in the post-pandemic era.\n\nMethods: A longitudinal study tracking 3,800 employees across 45 UK-based organizations from 2021-2024. Mixed-methods approach combining quantitative surveys and qualitative interviews.\n\nResults: Hybrid work arrangements (2-3 days remote) showed optimal outcomes for both well-being and productivity. Fully remote workers reported higher autonomy satisfaction but increased isolation. Key moderators included home workspace quality, managerial support, and family responsibilities.\n\nConclusions: Organizations should adopt flexible, individualized approaches to remote work, with particular attention to maintaining social connections and supporting home-based workers.",
      keywords: ["Remote Work", "Employee Well-being", "Work-Life Balance", "Hybrid Work", "Organizational Psychology", "Post-Pandemic"],
      doi: "10.1234/bjss.2024.002",
      publishedDate: "2024-11-25",
      volume: 1,
      issue: 1,
      pages: "21-42"
    }
  }
};

export default async function ArticlePage({ params }: Props) {
  const { slug, id } = await params;
  const cmsJournal = await getJournalBySlug(slug);

  if (!cmsJournal || !cmsJournal.ojsPath) {
    notFound();
  }

  let ojsData = null;
  let article = null;

  try {
    [ojsData, article] = await Promise.all([
      getOJSJournalData(cmsJournal.ojsPath),
      getOJSArticle(cmsJournal.ojsPath, parseInt(id)),
    ]);
  } catch (error) {
    console.error('Error fetching OJS data:', error);
  }

  // Use preview article if no OJS article found
  const previewArticle = PREVIEW_ARTICLES[slug]?.[parseInt(id)];
  const displayArticle = article || previewArticle;

  if (!displayArticle) {
    notFound();
  }

  const journalName = ojsData?.name || cmsJournal.name;
  const journalShortName = ojsData?.shortName || cmsJournal.shortName;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/journals" className="hover:text-white transition">Journals</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href={`/journals/${slug}`} className="hover:text-white transition">{journalShortName}</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white">Article</span>
          </nav>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium">
              {journalShortName}
            </span>
            <span className="text-blue-200 text-sm">|</span>
            <span className="text-blue-200 text-sm">Open Access</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-3 space-y-6">
            {/* Article Header */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              {/* Article Type Badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-[#1e3a5f] rounded-full text-sm font-semibold">
                  Research Article
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  Open Access
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-6">
                {displayArticle.title}
              </h1>

              {/* Authors */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Authors</h3>
                <div className="space-y-2">
                  {'authors' in displayArticle && Array.isArray(displayArticle.authors) && displayArticle.authors.map((author, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                        {typeof author === 'string' ? author.charAt(0) : author.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {typeof author === 'string' ? author : author.name}
                        </p>
                        {typeof author !== 'string' && author.affiliation && (
                          <p className="text-sm text-gray-500">{author.affiliation}</p>
                        )}
                        {typeof author !== 'string' && author.email && (
                          <a href={`mailto:${author.email}`} className="text-sm text-[#1e3a5f] hover:underline">
                            {author.email}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Publication Info */}
              <div className="flex flex-wrap gap-6 py-4 border-t border-b border-gray-200 text-sm">
                {'publishedDate' in displayArticle && displayArticle.publishedDate && (
                  <div>
                    <span className="text-gray-500">Published:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {new Date(displayArticle.publishedDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                )}
                {'volume' in displayArticle && (
                  <div>
                    <span className="text-gray-500">Volume:</span>
                    <span className="ml-2 font-medium text-gray-900">{displayArticle.volume}</span>
                  </div>
                )}
                {'issue' in displayArticle && (
                  <div>
                    <span className="text-gray-500">Issue:</span>
                    <span className="ml-2 font-medium text-gray-900">{displayArticle.issue}</span>
                  </div>
                )}
                {'pages' in displayArticle && (
                  <div>
                    <span className="text-gray-500">Pages:</span>
                    <span className="ml-2 font-medium text-gray-900">{displayArticle.pages}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Abstract */}
            {'abstract' in displayArticle && displayArticle.abstract && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Abstract
                </h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {displayArticle.abstract}
                </div>
              </div>
            )}

            {/* Keywords */}
            {'keywords' in displayArticle && displayArticle.keywords && displayArticle.keywords.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Keywords
                </h2>
                <div className="flex flex-wrap gap-2">
                  {displayArticle.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-200 transition cursor-default"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* How to Cite */}
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 border border-blue-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                How to Cite
              </h2>
              <div className="bg-white rounded-lg p-4 text-sm text-gray-700 font-mono leading-relaxed">
                {'authors' in displayArticle && Array.isArray(displayArticle.authors) && (
                  <>
                    {displayArticle.authors.map((a, i) => (
                      <span key={i}>
                        {typeof a === 'string' ? a : a.name}
                        {i < displayArticle.authors.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </>
                )}
                {' '}({'publishedDate' in displayArticle ? new Date(displayArticle.publishedDate).getFullYear() : '2024'}). {displayArticle.title}. <em>{journalName}</em>
                {', '}{'volume' in displayArticle && displayArticle.volume}({'issue' in displayArticle && displayArticle.issue})
                {', '}{'pages' in displayArticle && displayArticle.pages}.
                {' '}{'doi' in displayArticle && displayArticle.doi && (
                  <a href={`https://doi.org/${displayArticle.doi}`} className="text-[#1e3a5f] hover:underline">
                    https://doi.org/{displayArticle.doi}
                  </a>
                )}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Download Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Download</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 bg-[#c8102e] text-white px-4 py-3 rounded-xl font-semibold hover:bg-red-700 transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-4 py-3 rounded-xl font-semibold hover:bg-slate-200 transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
              </div>
            </div>

            {/* Article Info */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Article Info</h3>
              <div className="space-y-3 text-sm">
                {'doi' in displayArticle && displayArticle.doi && (
                  <div>
                    <p className="text-gray-500">DOI</p>
                    <a
                      href={`https://doi.org/${displayArticle.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1e3a5f] hover:underline font-medium break-all"
                    >
                      {displayArticle.doi}
                    </a>
                  </div>
                )}
                <div>
                  <p className="text-gray-500">Journal</p>
                  <Link href={`/journals/${slug}`} className="text-[#1e3a5f] hover:underline font-medium">
                    {journalShortName}
                  </Link>
                </div>
                <div>
                  <p className="text-gray-500">Article Type</p>
                  <p className="font-medium text-gray-900">Research Article</p>
                </div>
                <div>
                  <p className="text-gray-500">Access</p>
                  <p className="font-medium text-green-600">Open Access</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  href={`/journals/${slug}/current`}
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-slate-50 transition text-gray-700 hover:text-[#1e3a5f]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  Current Issue
                </Link>
                <Link
                  href={`/journals/${slug}/archives`}
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-slate-50 transition text-gray-700 hover:text-[#1e3a5f]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  Archives
                </Link>
                <Link
                  href={`/journals/${slug}/submissions`}
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-slate-50 transition text-gray-700 hover:text-[#1e3a5f]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Submit Paper
                </Link>
              </div>
            </div>

            {/* Back to Journal */}
            <Link
              href={`/journals/${slug}`}
              className="flex items-center gap-2 text-gray-500 hover:text-[#1e3a5f] transition text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to {journalShortName}
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
