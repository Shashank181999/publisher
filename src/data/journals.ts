// Great Britain Publishers - Journals Data

export interface Journal {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  issn: string;
  category: 'ahs' | 'medical' | 'social' | 'other';
  description: string;
  coverImage: string;
  editorInChief: {
    name: string;
    affiliation: string;
    email: string;
  };
  impactFactor?: string;
  frequency: string;
  established: number;
  subjects: string[];
  ojsPath?: string; // OJS journal path for linking to OJS
}

export interface EditorialMember {
  name: string;
  role: 'editor-in-chief' | 'managing-editor' | 'editor' | 'assistant-editor' | 'advisory-board';
  affiliation: string;
  country: string;
  email?: string;
  photo?: string;
}

export interface Conference {
  id: string;
  title: string;
  type: 'conference' | 'seminar' | 'webinar' | 'workshop';
  date: string;
  endDate?: string;
  location: string;
  isVirtual: boolean;
  description: string;
  registrationLink?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  image?: string;
}

export interface AuthorService {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  price?: string;
  icon: string;
}

// Allied Health Sciences (AHS) Journals
export const journals: Journal[] = [
  // OJS Journals - Connected to OJS
  {
    id: 'bjahs',
    name: 'Britain Journal of Allied Health Sciences',
    shortName: 'BJAHS',
    slug: 'allied-health-sciences',
    issn: '2976-8454',
    category: 'ahs',
    description: 'A peer-reviewed academic journal publishing research on Allied Health Professions topics. The journal aims to contribute to the development and advancement of allied health fields and serves as a platform for professionals, researchers, and educators.',
    coverImage: '/images/journals/bjahs-cover.jpg',
    editorInChief: {
      name: 'Editorial Board',
      affiliation: 'Great Britain Publishers',
      email: 'editor-bjahs@greatbritainjournals.com'
    },
    frequency: 'Quarterly',
    established: 2024,
    subjects: ['Allied Health Professions', 'Rehabilitation', 'Healthcare Research', 'Clinical Studies'],
    ojsPath: 'bjahs'
  },
  {
    id: 'bjms',
    name: 'Britain Journal of Medical Science',
    shortName: 'BJMS',
    slug: 'medical-science',
    issn: 'XXXX-XXXX',
    category: 'medical',
    description: 'Publishing cutting-edge research in medical sciences, clinical medicine, and healthcare innovations.',
    coverImage: '/images/journals/bjms-cover.jpg',
    editorInChief: {
      name: 'Editorial Board',
      affiliation: 'Great Britain Publishers',
      email: 'editor-bjms@greatbritainjournals.com'
    },
    frequency: 'Quarterly',
    established: 2024,
    subjects: ['Medical Sciences', 'Clinical Medicine', 'Healthcare', 'Medical Research'],
    ojsPath: 'bjms'
  },
  {
    id: 'bjrot',
    name: 'Britain Journal of Radiography & Operation Technology',
    shortName: 'BJROT',
    slug: 'radiography-operation-technology',
    issn: 'XXXX-XXXX',
    category: 'ahs',
    description: 'Focusing on radiography, medical imaging, surgical technology, and perioperative care research.',
    coverImage: '/images/journals/bjrot-cover.jpg',
    editorInChief: {
      name: 'Editorial Board',
      affiliation: 'Great Britain Publishers',
      email: 'editor-bjrot@greatbritainjournals.com'
    },
    frequency: 'Quarterly',
    established: 2024,
    subjects: ['Radiography', 'Medical Imaging', 'Surgical Technology', 'Perioperative Care'],
    ojsPath: 'bjrot'
  },
  {
    id: 'bjcstech',
    name: 'Britain Journal of Computer Science & Technology',
    shortName: 'BJCSTECH',
    slug: 'computer-science-technology',
    issn: 'XXXX-XXXX',
    category: 'other',
    description: 'Publishing research in computer science, software engineering, artificial intelligence, and technology innovations.',
    coverImage: '/images/journals/bjcstech-cover.jpg',
    editorInChief: {
      name: 'Editorial Board',
      affiliation: 'Great Britain Publishers',
      email: 'editor-bjcstech@greatbritainjournals.com'
    },
    frequency: 'Quarterly',
    established: 2024,
    subjects: ['Computer Science', 'Software Engineering', 'AI & Machine Learning', 'Technology'],
    ojsPath: 'bjcstech'
  },
  {
    id: 'bjss',
    name: 'Britain Journal of Social Sciences',
    shortName: 'BJSS',
    slug: 'social-sciences',
    issn: 'XXXX-XXXX',
    category: 'social',
    description: 'A platform for research in sociology, psychology, political science, and related social science disciplines.',
    coverImage: '/images/journals/bjss-cover.jpg',
    editorInChief: {
      name: 'Editorial Board',
      affiliation: 'Great Britain Publishers',
      email: 'editor-bjss@greatbritainjournals.com'
    },
    frequency: 'Quarterly',
    established: 2024,
    subjects: ['Sociology', 'Psychology', 'Political Science', 'Social Research'],
    ojsPath: 'bjss'
  },
  // Legacy Journals
  {
    id: 'pt',
    name: 'Journal of Physical Therapy Research',
    shortName: 'PT',
    slug: 'physical-therapy',
    issn: 'XXXX-XXXX',
    category: 'ahs',
    description: 'A peer-reviewed journal dedicated to advancing the science and practice of physical therapy through rigorous research and clinical studies.',
    coverImage: '/images/journals/pt-cover.jpg',
    editorInChief: {
      name: 'Dr. Sarah Mitchell',
      affiliation: 'University of London',
      email: 'pt-editor@greatbritainpublishers.co.uk'
    },
    frequency: 'Quarterly',
    established: 2024,
    subjects: ['Rehabilitation', 'Musculoskeletal Therapy', 'Sports Medicine', 'Neurological Rehabilitation']
  },
  {
    id: 'mlt',
    name: 'Medical Laboratory Technology Journal',
    shortName: 'MLT',
    slug: 'medical-lab-technology',
    issn: 'XXXX-XXXX',
    category: 'ahs',
    description: 'Publishing cutting-edge research in clinical laboratory sciences, diagnostic techniques, and medical technology innovations.',
    coverImage: '/images/journals/mlt-cover.jpg',
    editorInChief: {
      name: 'Dr. James Wilson',
      affiliation: 'Imperial College London',
      email: 'mlt-editor@greatbritainpublishers.co.uk'
    },
    frequency: 'Quarterly',
    established: 2024,
    subjects: ['Clinical Chemistry', 'Hematology', 'Microbiology', 'Molecular Diagnostics']
  },
  {
    id: 'slp',
    name: 'Speech & Language Pathology Review',
    shortName: 'SLP',
    slug: 'speech-language-pathology',
    issn: 'XXXX-XXXX',
    category: 'ahs',
    description: 'Advancing research and clinical practice in speech-language pathology, communication disorders, and swallowing sciences.',
    coverImage: '/images/journals/slp-cover.jpg',
    editorInChief: {
      name: 'Dr. Emma Thompson',
      affiliation: 'University of Edinburgh',
      email: 'slp-editor@greatbritainpublishers.co.uk'
    },
    frequency: 'Quarterly',
    established: 2024,
    subjects: ['Speech Disorders', 'Language Development', 'Dysphagia', 'Autism Spectrum Disorders']
  },
  {
    id: 'ot',
    name: 'Occupational Therapy International',
    shortName: 'OT',
    slug: 'occupational-therapy',
    issn: 'XXXX-XXXX',
    category: 'ahs',
    description: 'A global platform for occupational therapy research, evidence-based practice, and professional development.',
    coverImage: '/images/journals/ot-cover.jpg',
    editorInChief: {
      name: 'Dr. Michael Brown',
      affiliation: 'University of Oxford',
      email: 'ot-editor@greatbritainpublishers.co.uk'
    },
    frequency: 'Quarterly',
    established: 2024,
    subjects: ['Pediatric OT', 'Mental Health OT', 'Geriatric Rehabilitation', 'Hand Therapy']
  },
  {
    id: 'ndt',
    name: 'Nutrition & Dietetics Today',
    shortName: 'NDT',
    slug: 'nutrition-dietetics',
    issn: 'XXXX-XXXX',
    category: 'ahs',
    description: 'Publishing innovative research in nutrition science, clinical dietetics, and public health nutrition.',
    coverImage: '/images/journals/ndt-cover.jpg',
    editorInChief: {
      name: 'Dr. Lisa Anderson',
      affiliation: 'Kings College London',
      email: 'ndt-editor@greatbritainpublishers.co.uk'
    },
    frequency: 'Quarterly',
    established: 2024,
    subjects: ['Clinical Nutrition', 'Sports Nutrition', 'Public Health', 'Metabolic Disorders']
  },
  {
    id: 'ott',
    name: 'Operation Technology Journal',
    shortName: 'OTT',
    slug: 'operation-technology',
    issn: 'XXXX-XXXX',
    category: 'ahs',
    description: 'Focusing on surgical technology, perioperative care, and advancements in operating room practices.',
    coverImage: '/images/journals/ott-cover.jpg',
    editorInChief: {
      name: 'Dr. Robert Taylor',
      affiliation: 'University of Manchester',
      email: 'ott-editor@greatbritainpublishers.co.uk'
    },
    frequency: 'Quarterly',
    established: 2024,
    subjects: ['Surgical Technology', 'Perioperative Care', 'Patient Safety', 'Medical Devices']
  },
  {
    id: 'mit',
    name: 'Medical Imaging Technology Review',
    shortName: 'MIT',
    slug: 'medical-imaging-technology',
    issn: 'XXXX-XXXX',
    category: 'ahs',
    description: 'Dedicated to advancements in medical imaging, radiology, and diagnostic imaging technologies.',
    coverImage: '/images/journals/mit-cover.jpg',
    editorInChief: {
      name: 'Dr. Catherine Harris',
      affiliation: 'University of Cambridge',
      email: 'mit-editor@greatbritainpublishers.co.uk'
    },
    frequency: 'Quarterly',
    established: 2024,
    subjects: ['Radiology', 'MRI Technology', 'CT Imaging', 'Nuclear Medicine']
  }
];

// Additional Subject Categories
export const journalCategories = [
  { name: 'Allied Health Sciences', slug: 'ahs', count: 7 },
  { name: 'Medical Sciences', slug: 'medical-sciences', count: 0 },
  { name: 'Social Sciences', slug: 'social-sciences', count: 0 },
  { name: 'History', slug: 'history', count: 0 },
  { name: 'Political Science', slug: 'political-science', count: 0 },
  { name: 'International Relations', slug: 'international-relations', count: 0 },
  { name: 'Psychology', slug: 'psychology', count: 0 },
  { name: 'Sociology', slug: 'sociology', count: 0 },
  { name: 'Geography', slug: 'geography', count: 0 },
  { name: 'Economics', slug: 'economics', count: 0 },
];

// Conferences Data
export const conferences: Conference[] = [
  {
    id: 'conf-1',
    title: 'International Conference on Allied Health Sciences 2025',
    type: 'conference',
    date: '2025-06-15',
    endDate: '2025-06-17',
    location: 'London, United Kingdom',
    isVirtual: false,
    description: 'Join leading researchers and practitioners in allied health sciences for three days of presentations, workshops, and networking. Featuring keynote speakers from top universities worldwide.',
    status: 'upcoming',
    registrationLink: '#',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'
  },
  {
    id: 'conf-2',
    title: 'Global Medical Research Summit 2025',
    type: 'conference',
    date: '2025-09-20',
    endDate: '2025-09-22',
    location: 'Edinburgh, Scotland',
    isVirtual: false,
    description: 'A premier gathering of medical researchers, clinicians, and healthcare innovators discussing the future of medicine and patient care.',
    status: 'upcoming',
    registrationLink: '#',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80'
  },
  {
    id: 'webinar-1',
    title: 'Advances in Physical Therapy Research Methods',
    type: 'webinar',
    date: '2025-04-20',
    location: 'Online',
    isVirtual: true,
    description: 'A comprehensive webinar exploring the latest research methodologies in physical therapy. Learn from experts about innovative approaches to rehabilitation research.',
    status: 'upcoming',
    registrationLink: '#',
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80'
  },
  {
    id: 'webinar-2',
    title: 'Digital Health Innovations in Clinical Practice',
    type: 'webinar',
    date: '2025-05-15',
    location: 'Online',
    isVirtual: true,
    description: 'Discover how digital technologies are transforming healthcare delivery and patient outcomes. Explore telemedicine, AI diagnostics, and health apps.',
    status: 'upcoming',
    registrationLink: '#',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80'
  },
  {
    id: 'seminar-1',
    title: 'Evidence-Based Practice in Occupational Therapy',
    type: 'seminar',
    date: '2025-05-10',
    location: 'Manchester, UK',
    isVirtual: false,
    description: 'Explore how to implement evidence-based practices in occupational therapy settings. Hands-on sessions with case studies and practical applications.',
    status: 'upcoming',
    registrationLink: '#',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80'
  },
  {
    id: 'seminar-2',
    title: 'Nutrition Science and Public Health',
    type: 'seminar',
    date: '2025-07-08',
    location: 'Birmingham, UK',
    isVirtual: false,
    description: 'A focused seminar on the intersection of nutrition science and public health policy. Featuring panel discussions with leading dietitians and policy makers.',
    status: 'upcoming',
    registrationLink: '#',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80'
  },
  {
    id: 'workshop-1',
    title: 'Academic Writing Workshop for Health Professionals',
    type: 'workshop',
    date: '2025-04-25',
    endDate: '2025-04-26',
    location: 'Online',
    isVirtual: true,
    description: 'Two-day intensive workshop on academic writing, manuscript preparation, and publication strategies. Perfect for early-career researchers.',
    status: 'upcoming',
    registrationLink: '#',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80'
  },
  {
    id: 'workshop-2',
    title: 'Statistical Analysis in Health Research',
    type: 'workshop',
    date: '2025-08-12',
    endDate: '2025-08-13',
    location: 'Leeds, UK',
    isVirtual: false,
    description: 'Hands-on workshop covering statistical methods commonly used in health research. Learn SPSS, R, and data visualization techniques.',
    status: 'upcoming',
    registrationLink: '#',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
  }
];

// Author Services
export const authorServices: AuthorService[] = [
  {
    id: 'manuscript-prep',
    name: 'Manuscript Preparation',
    slug: 'manuscript-preparation',
    description: 'Professional assistance in preparing your manuscript for submission, including formatting, structure, and compliance with journal guidelines.',
    features: [
      'Document formatting to journal standards',
      'Reference style formatting',
      'Figure and table preparation',
      'Supplementary material organization'
    ],
    icon: 'document'
  },
  {
    id: 'article-writing',
    name: 'Article Writing',
    slug: 'article-writing',
    description: 'Expert writing services for research articles, review papers, and case studies.',
    features: [
      'Professional academic writing',
      'Literature review assistance',
      'Data interpretation support',
      'Revision and rewriting services'
    ],
    icon: 'pencil'
  },
  {
    id: 'english-editing',
    name: 'English Language Editing',
    slug: 'english-editing',
    description: 'Native English editing services to improve clarity, grammar, and academic tone of your manuscript.',
    features: [
      'Grammar and spelling correction',
      'Sentence structure improvement',
      'Academic tone enhancement',
      'Clarity and readability optimization'
    ],
    icon: 'language'
  },
  {
    id: 'scientific-editing',
    name: 'Scientific Editing',
    slug: 'scientific-editing',
    description: 'Expert scientific review and editing by specialists in your field to strengthen your research presentation.',
    features: [
      'Technical accuracy review',
      'Methodology assessment',
      'Results interpretation support',
      'Discussion section enhancement'
    ],
    icon: 'beaker'
  },
  {
    id: 'similarity-check',
    name: 'Similarity Review Report',
    slug: 'similarity-check',
    description: 'Comprehensive plagiarism and similarity check using industry-leading software with detailed reports.',
    features: [
      'iThenticate/Turnitin check',
      'Detailed similarity report',
      'Guidance on reducing similarity',
      'Certificate of originality'
    ],
    icon: 'shield-check'
  },
  {
    id: 'presubmission-review',
    name: 'Pre-submission Expert Review',
    slug: 'presubmission-review',
    description: 'Get your manuscript reviewed by experts before submission to maximize chances of acceptance.',
    features: [
      'Expert peer review',
      'Constructive feedback',
      'Revision recommendations',
      'Journal selection advice'
    ],
    icon: 'clipboard-check'
  },
  {
    id: 'guidelines',
    name: 'Author Guidelines',
    slug: 'guidelines',
    description: 'Comprehensive guidelines to help authors prepare and format their manuscripts according to journal requirements and academic standards.',
    features: [
      'Manuscript structure requirements',
      'Formatting and style guidelines',
      'Reference citation standards',
      'Ethical guidelines and policies',
      'Figure and table specifications',
      'Supplementary material instructions'
    ],
    icon: 'clipboard-list'
  },
  {
    id: 'revision',
    name: 'Revision Assistance',
    slug: 'revision',
    description: 'Expert support in addressing reviewer feedback and revising your manuscript to meet publication standards and improve acceptance chances.',
    features: [
      'Point-by-point response preparation',
      'Manuscript revision guidance',
      'Addressing reviewer comments',
      'Statistical analysis revision',
      'Resubmission letter drafting',
      'Quality assurance review'
    ],
    icon: 'refresh'
  },
  {
    id: 'production',
    name: 'Production Process',
    slug: 'production',
    description: 'Learn about what happens after your manuscript is accepted, including copyediting, typesetting, proofing, and final publication stages.',
    features: [
      'Professional copyediting',
      'High-quality typesetting',
      'Author proof review',
      'DOI assignment',
      'Online publication',
      'Print preparation'
    ],
    icon: 'cog'
  },
  {
    id: 'promotion',
    name: 'Research Promotion',
    slug: 'promotion',
    description: 'Maximize the impact of your published research with our promotion and dissemination services to reach a wider audience.',
    features: [
      'Social media promotion',
      'Press release preparation',
      'Academic network sharing',
      'Citation tracking',
      'Altmetric monitoring',
      'Author branding support'
    ],
    icon: 'megaphone'
  },
  {
    id: 'editing',
    name: 'Professional Editing',
    slug: 'editing',
    description: 'Comprehensive editing services for books and manuscripts, including developmental editing, copyediting, and proofreading by experienced editors.',
    features: [
      'Developmental editing',
      'Structural assessment',
      'Line-by-line copyediting',
      'Proofreading services',
      'Consistency checking',
      'Style guide compliance'
    ],
    icon: 'edit'
  }
];

// Company Information
export const companyInfo = {
  name: 'Great Britain Publishers',
  shortName: 'GBP',
  tagline: 'Advancing Knowledge, Connecting Minds',
  description: 'Great Britain Publishers brings together extraordinary clinicians, research scientists, brilliant academicians and health professionals to solve fundamental scientific problems and innovate scientific products.',
  mission: 'We manage scientific journals, provide author services, organize seminars/conferences, and platform for showcasing skills and scientific knowledge. This is committed to providing a platform for global researchers, academicians and practitioners to share research findings and clinical expertise for applying scientific knowledge and evidence-based practice to improve health and advance human progress.',
  address: {
    street: '85 Loch Park Avenue',
    city: 'Carluke',
    postcode: 'ML8 5TG',
    country: 'United Kingdom'
  },
  contact: {
    email: 'publisher@greatbritainpublishers.co.uk',
    alternateEmail: 'publisher@greatbritainpublishers.com',
    phone: '+44 1234 567890',
    whatsapp: '+44 7123 456789'
  },
  social: {
    facebook: 'https://facebook.com/greatbritainpublishers',
    twitter: 'https://twitter.com/gbpublishers',
    linkedin: 'https://linkedin.com/company/great-britain-publishers',
    youtube: 'https://youtube.com/greatbritainpublishers',
    tiktok: 'https://tiktok.com/@gbpublishers'
  },
  website: 'https://greatbritainpublishers.co.uk'
};
