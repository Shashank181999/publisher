/**
 * OJS Multi-Journal Configuration
 * Connects to Great Britain Journals OJS installation
 */

export interface OJSJournal {
  id: string;
  path: string;
  name: string;
  shortName: string;
  category: string;
  apiUrl: string;
}

// Base OJS URL
export const OJS_BASE_URL = process.env.NEXT_PUBLIC_OJS_URL || 'https://greatbritainjournals.com';

// API Key (set in .env.local)
export const OJS_API_KEY = process.env.OJS_API_KEY || '';

// All journals in the OJS installation
export const OJS_JOURNALS: OJSJournal[] = [
  {
    id: 'bjahs',
    path: 'bjahs',
    name: 'Britain Journal of Allied Health Sciences',
    shortName: 'BJAHS',
    category: 'Allied Health Sciences',
    apiUrl: `${OJS_BASE_URL}/index.php/bjahs/api/v1`,
  },
  {
    id: 'bjms',
    path: 'bjms',
    name: 'Britain Journal of Medical Science',
    shortName: 'BJMS',
    category: 'Medical Sciences',
    apiUrl: `${OJS_BASE_URL}/index.php/bjms/api/v1`,
  },
  {
    id: 'bjrot',
    path: 'bjrot',
    name: 'Britain Journal of Radiography & Operation Technology',
    shortName: 'BJROT',
    category: 'Allied Health Sciences',
    apiUrl: `${OJS_BASE_URL}/index.php/bjrot/api/v1`,
  },
  {
    id: 'bjcstech',
    path: 'bjcstech',
    name: 'Britain Journal of Computer Science & Technology',
    shortName: 'BJCSTECH',
    category: 'Computer Science',
    apiUrl: `${OJS_BASE_URL}/index.php/bjcstech/api/v1`,
  },
  {
    id: 'bjss',
    path: 'bjss',
    name: 'Britain Journal of Social Sciences',
    shortName: 'BJSS',
    category: 'Social Sciences',
    apiUrl: `${OJS_BASE_URL}/index.php/bjss/api/v1`,
  },
];

// Helper to get journal by ID
export const getJournalById = (id: string): OJSJournal | undefined => {
  return OJS_JOURNALS.find(j => j.id === id);
};

// Helper to get journal by path
export const getJournalByPath = (path: string): OJSJournal | undefined => {
  return OJS_JOURNALS.find(j => j.path === path);
};

// Get all journal IDs
export const getAllJournalIds = (): string[] => {
  return OJS_JOURNALS.map(j => j.id);
};
