import { Article, Category, Volume } from "@/types";

export const categories: Category[] = [
  { name: "Social Sciences", slug: "social-sciences", articleCount: 13 },
  { name: "Applied Sciences", slug: "applied-sciences", articleCount: 14 },
  { name: "Computer Science", slug: "computer-science", articleCount: 8 },
  { name: "Management Sciences", slug: "management-sciences", articleCount: 5 },
  { name: "English", slug: "english", articleCount: 3 },
  { name: "Law", slug: "law", articleCount: 2 },
  { name: "Agriculture", slug: "agriculture", articleCount: 4 },
  { name: "Archaeology", slug: "archaeology", articleCount: 1 },
];

export const articles: Article[] = [
  {
    id: "1",
    title: "Impact of Artificial Intelligence on Modern Healthcare Systems: A Systematic Review",
    authors: [
      { name: "Dr. Sarah Johnson", affiliation: "Department of Computer Science, Stanford University", email: "sjohnson@stanford.edu" },
      { name: "Dr. Michael Chen", affiliation: "School of Medicine, Harvard University" },
    ],
    abstract: "This systematic review examines the transformative impact of artificial intelligence (AI) on modern healthcare systems. Through comprehensive analysis of 150 peer-reviewed studies published between 2020-2025, we identify key areas where AI has significantly improved patient outcomes, diagnostic accuracy, and operational efficiency. Our findings reveal that AI-powered diagnostic tools achieve an average accuracy rate of 94.3% across various medical imaging modalities. Furthermore, machine learning algorithms have reduced hospital readmission rates by 23% through predictive analytics. The study also addresses challenges including data privacy concerns, algorithmic bias, and the need for regulatory frameworks. We conclude with recommendations for healthcare institutions seeking to integrate AI technologies while maintaining ethical standards and patient trust.",
    keywords: ["Artificial Intelligence", "Healthcare", "Machine Learning", "Diagnostics", "Patient Outcomes"],
    doi: "10.xxxxx/amr.2026.1001",
    pdfUrl: "/pdfs/article-1.pdf",
    category: "Computer Science",
    volume: 4,
    issue: 2,
    year: 2026,
    pages: "1-15",
    publishedDate: "2026-02-04",
  },
  {
    id: "2",
    title: "Sustainable Agriculture Practices in Semi-Arid Regions: A Case Study of Punjab",
    authors: [
      { name: "Dr. Ahmed Khan", affiliation: "Department of Agriculture, University of Agriculture Faisalabad" },
      { name: "Prof. Fatima Zahra", affiliation: "Environmental Sciences, LUMS" },
    ],
    abstract: "This research investigates sustainable agriculture practices implemented in semi-arid regions of Punjab, Pakistan. Through a mixed-methods approach involving 500 farmers across 10 districts, we evaluate the effectiveness of water conservation techniques, organic farming methods, and crop rotation strategies. Results indicate that drip irrigation systems reduced water consumption by 40% while maintaining crop yields. Organic farming practices showed a 15% increase in soil health indicators over a three-year period. The study highlights the economic and environmental benefits of transitioning to sustainable agriculture while identifying barriers to adoption including initial investment costs and limited access to training resources.",
    keywords: ["Sustainable Agriculture", "Water Conservation", "Organic Farming", "Punjab", "Semi-Arid"],
    doi: "10.xxxxx/amr.2026.1002",
    pdfUrl: "/pdfs/article-2.pdf",
    category: "Agriculture",
    volume: 4,
    issue: 2,
    year: 2026,
    pages: "16-32",
    publishedDate: "2026-02-04",
  },
  {
    id: "3",
    title: "The Effects of Remote Work on Employee Mental Health and Productivity",
    authors: [
      { name: "Dr. Emily Roberts", affiliation: "Department of Psychology, Oxford University" },
      { name: "Dr. James Wilson", affiliation: "Business School, University of Cambridge" },
      { name: "Sarah Ahmed", affiliation: "HR Research Institute, London" },
    ],
    abstract: "This longitudinal study examines the psychological and productivity implications of remote work arrangements on employees across various industries. Data collected from 2,500 participants over 18 months reveals nuanced findings about work-from-home policies. While 67% of participants reported improved work-life balance, 43% experienced feelings of isolation. Productivity metrics showed an initial 12% increase in the first six months, followed by a plateau. The research identifies key factors contributing to successful remote work including clear communication protocols, regular virtual team interactions, and dedicated workspace environments. Recommendations for organizations implementing hybrid work models are provided.",
    keywords: ["Remote Work", "Mental Health", "Productivity", "Work-Life Balance", "Organizational Psychology"],
    doi: "10.xxxxx/amr.2026.1003",
    pdfUrl: "/pdfs/article-3.pdf",
    category: "Social Sciences",
    volume: 4,
    issue: 2,
    year: 2026,
    pages: "33-48",
    publishedDate: "2026-02-04",
  },
  {
    id: "4",
    title: "Blockchain Technology in Supply Chain Management: Challenges and Opportunities",
    authors: [
      { name: "Prof. Li Wei", affiliation: "School of Business, Tsinghua University" },
      { name: "Dr. Rahul Sharma", affiliation: "IIT Delhi, Computer Science Department" },
    ],
    abstract: "This paper explores the implementation of blockchain technology in supply chain management across multiple industries. Through case studies of 25 multinational corporations, we analyze the benefits and challenges of blockchain adoption. Key findings indicate that blockchain implementation reduced supply chain fraud by 78% and improved traceability by 95%. However, challenges including scalability issues, high implementation costs, and regulatory uncertainty remain significant barriers. The study proposes a framework for phased blockchain integration that addresses these challenges while maximizing operational benefits.",
    keywords: ["Blockchain", "Supply Chain", "Transparency", "Digital Transformation", "Logistics"],
    doi: "10.xxxxx/amr.2026.1004",
    pdfUrl: "/pdfs/article-4.pdf",
    category: "Management Sciences",
    volume: 4,
    issue: 2,
    year: 2026,
    pages: "49-65",
    publishedDate: "2026-02-04",
  },
  {
    id: "5",
    title: "Climate Change Litigation: Emerging Legal Frameworks and Court Decisions",
    authors: [
      { name: "Prof. Amanda Sterling", affiliation: "Faculty of Law, Yale University" },
      { name: "Dr. Hassan Ali", affiliation: "Law Department, LUMS" },
    ],
    abstract: "This article analyzes the rapidly evolving landscape of climate change litigation across jurisdictions. Examining 120 court cases from 35 countries between 2020-2025, we identify emerging legal frameworks used to hold governments and corporations accountable for climate action. Our analysis reveals a 300% increase in climate-related lawsuits globally, with 65% resulting in favorable outcomes for plaintiffs. The study categorizes litigation strategies including human rights-based claims, breach of fiduciary duty, and failure to adapt. We discuss implications for policy development and corporate environmental responsibility.",
    keywords: ["Climate Change", "Litigation", "Environmental Law", "Human Rights", "Corporate Responsibility"],
    doi: "10.xxxxx/amr.2026.1005",
    pdfUrl: "/pdfs/article-5.pdf",
    category: "Law",
    volume: 4,
    issue: 2,
    year: 2026,
    pages: "66-82",
    publishedDate: "2026-02-04",
  },
  {
    id: "6",
    title: "Neuroplasticity and Language Learning in Adults: Evidence from fMRI Studies",
    authors: [
      { name: "Dr. Maria Santos", affiliation: "Neuroscience Institute, MIT" },
      { name: "Prof. Thomas Anderson", affiliation: "Department of Linguistics, UCLA" },
    ],
    abstract: "This study investigates neural changes associated with second language acquisition in adults using functional magnetic resonance imaging (fMRI). Forty-five participants aged 25-55 underwent intensive language training over six months while brain activity was monitored at regular intervals. Results demonstrate significant neuroplastic changes in language-related brain regions, challenging the critical period hypothesis. Increased gray matter density was observed in the left inferior parietal cortex and right hippocampus. The findings suggest that structured, immersive language learning can induce measurable brain changes in adults, with implications for language education methodology and cognitive reserve in aging.",
    keywords: ["Neuroplasticity", "Language Learning", "fMRI", "Adult Education", "Cognitive Neuroscience"],
    doi: "10.xxxxx/amr.2026.1006",
    pdfUrl: "/pdfs/article-6.pdf",
    category: "Applied Sciences",
    volume: 4,
    issue: 2,
    year: 2026,
    pages: "83-99",
    publishedDate: "2026-02-04",
  },
  {
    id: "7",
    title: "Post-Colonial Perspectives in Contemporary South Asian Literature",
    authors: [
      { name: "Dr. Priya Sharma", affiliation: "Department of English, Delhi University" },
      { name: "Prof. William Taylor", affiliation: "English Literature, University of Edinburgh" },
    ],
    abstract: "This literary analysis examines post-colonial themes in contemporary South Asian fiction published between 2015-2025. Through close reading of 30 novels by authors from India, Pakistan, Bangladesh, and Sri Lanka, we identify recurring motifs of identity negotiation, diaspora experiences, and historical memory. The study employs theoretical frameworks from Homi Bhabha, Gayatri Spivak, and Edward Said to analyze how contemporary writers engage with colonial legacies while articulating new forms of cultural identity. Our findings reveal a shift towards intersectional approaches that consider gender, class, and religion alongside post-colonial concerns.",
    keywords: ["Post-Colonial Literature", "South Asian Fiction", "Identity", "Diaspora", "Cultural Studies"],
    doi: "10.xxxxx/amr.2026.1007",
    pdfUrl: "/pdfs/article-7.pdf",
    category: "English",
    volume: 4,
    issue: 2,
    year: 2026,
    pages: "100-118",
    publishedDate: "2026-02-04",
  },
  {
    id: "8",
    title: "Archaeological Discoveries at the Mohenjo-daro Site: New Insights into Indus Valley Civilization",
    authors: [
      { name: "Dr. Amir Hussain", affiliation: "Department of Archaeology, University of Karachi" },
      { name: "Prof. Elena Rossi", affiliation: "Archaeological Institute, University of Rome" },
    ],
    abstract: "This paper presents findings from recent excavations at the Mohenjo-daro archaeological site conducted between 2023-2025. Using advanced ground-penetrating radar and 3D modeling technologies, our team uncovered previously unknown structures in the lower city area. Analysis of artifacts including seals, pottery, and tools provides new insights into trade networks, craft specialization, and social organization in the Indus Valley Civilization. Radiocarbon dating of organic materials refines our chronological understanding of site occupation. These discoveries contribute significantly to our understanding of one of the world's earliest urban civilizations.",
    keywords: ["Archaeology", "Indus Valley", "Mohenjo-daro", "Ancient Civilizations", "Urban Planning"],
    doi: "10.xxxxx/amr.2026.1008",
    pdfUrl: "/pdfs/article-8.pdf",
    category: "Archaeology",
    volume: 4,
    issue: 2,
    year: 2026,
    pages: "119-135",
    publishedDate: "2026-02-04",
  },
];

export const currentVolume: Volume = {
  volume: 4,
  issue: 2,
  year: 2026,
  month: "February",
  publishedDate: "2026-02-04",
  articles: articles,
};

export const archives: Volume[] = [
  currentVolume,
  {
    volume: 4,
    issue: 1,
    year: 2026,
    month: "January",
    publishedDate: "2026-01-05",
    articles: [],
  },
  {
    volume: 3,
    issue: 4,
    year: 2025,
    month: "December",
    publishedDate: "2025-12-01",
    articles: [],
  },
  {
    volume: 3,
    issue: 3,
    year: 2025,
    month: "September",
    publishedDate: "2025-09-01",
    articles: [],
  },
  {
    volume: 3,
    issue: 2,
    year: 2025,
    month: "June",
    publishedDate: "2025-06-01",
    articles: [],
  },
  {
    volume: 3,
    issue: 1,
    year: 2025,
    month: "March",
    publishedDate: "2025-03-01",
    articles: [],
  },
];

export function getArticleById(id: string): Article | undefined {
  return articles.find((article) => article.id === id);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter(
    (article) => article.category.toLowerCase() === category.toLowerCase()
  );
}
