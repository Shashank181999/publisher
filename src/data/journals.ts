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
    title: 'International Conference on Allied Health Sciences 2024',
    type: 'conference',
    date: '2024-06-15',
    endDate: '2024-06-17',
    location: 'London, United Kingdom',
    isVirtual: false,
    description: 'Join leading researchers and practitioners in allied health sciences for three days of presentations, workshops, and networking.',
    status: 'upcoming',
    registrationLink: '#'
  },
  {
    id: 'webinar-1',
    title: 'Advances in Physical Therapy Research Methods',
    type: 'webinar',
    date: '2024-04-20',
    location: 'Online',
    isVirtual: true,
    description: 'A comprehensive webinar exploring the latest research methodologies in physical therapy.',
    status: 'upcoming',
    registrationLink: '#'
  },
  {
    id: 'seminar-1',
    title: 'Evidence-Based Practice in Occupational Therapy',
    type: 'seminar',
    date: '2024-05-10',
    location: 'Manchester, UK',
    isVirtual: false,
    description: 'Explore how to implement evidence-based practices in occupational therapy settings.',
    status: 'upcoming',
    registrationLink: '#'
  },
  {
    id: 'workshop-1',
    title: 'Academic Writing Workshop for Health Professionals',
    type: 'workshop',
    date: '2024-04-25',
    endDate: '2024-04-26',
    location: 'Online',
    isVirtual: true,
    description: 'Two-day intensive workshop on academic writing, manuscript preparation, and publication strategies.',
    status: 'upcoming',
    registrationLink: '#'
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
