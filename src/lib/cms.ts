// CMS Data Reader for Frontend

import { promises as fs } from 'fs';
import path from 'path';
import type {
  HeroContent,
  AboutContent,
  CMSJournal,
  CMSArticle,
  CMSService,
  CMSConference,
  BooksContent,
  ContactContent,
  FooterContent,
  HomepageContent,
} from '@/types/cms';

const CMS_DATA_DIR = path.join(process.cwd(), 'src', 'data', 'cms');

async function readJSONFile<T>(filename: string): Promise<T | null> {
  try {
    const filePath = path.join(CMS_DATA_DIR, filename);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
}

export async function getHeroContent(): Promise<HeroContent | null> {
  return readJSONFile<HeroContent>('hero.json');
}

export async function getAboutContent(): Promise<AboutContent | null> {
  return readJSONFile<AboutContent>('about.json');
}

export async function getJournals(): Promise<CMSJournal[]> {
  const data = await readJSONFile<{ items: CMSJournal[] }>('journals.json');
  return data?.items.filter((j) => j.isActive) || [];
}

export async function getJournalBySlug(slug: string): Promise<CMSJournal | null> {
  const journals = await getJournals();
  return journals.find((j) => j.slug === slug) || null;
}

export async function getArticles(): Promise<CMSArticle[]> {
  const data = await readJSONFile<{ items: CMSArticle[] }>('articles.json');
  return data?.items.filter((a) => a.isActive) || [];
}

export async function getServices(): Promise<CMSService[]> {
  const data = await readJSONFile<{ items: CMSService[] }>('services.json');
  return data?.items.filter((s) => s.isActive).sort((a, b) => a.order - b.order) || [];
}

export async function getServiceBySlug(slug: string): Promise<CMSService | null> {
  const services = await getServices();
  return services.find((s) => s.slug === slug) || null;
}

export async function getConferences(): Promise<CMSConference[]> {
  const data = await readJSONFile<{ items: CMSConference[] }>('conferences.json');
  return data?.items.filter((c) => c.isActive) || [];
}

export async function getUpcomingConferences(): Promise<CMSConference[]> {
  const conferences = await getConferences();
  return conferences.filter((c) => c.status === 'upcoming');
}

export async function getBooksContent(): Promise<BooksContent | null> {
  return readJSONFile<BooksContent>('books.json');
}

export async function getContactContent(): Promise<ContactContent | null> {
  return readJSONFile<ContactContent>('contact.json');
}

export async function getFooterContent(): Promise<FooterContent | null> {
  return readJSONFile<FooterContent>('footer.json');
}

export async function getHomepageContent(): Promise<HomepageContent | null> {
  return readJSONFile<HomepageContent>('homepage.json');
}

// Helper to get all CMS data at once (useful for homepage)
export async function getAllCMSData() {
  const [hero, about, contact, footer] = await Promise.all([
    getHeroContent(),
    getAboutContent(),
    getContactContent(),
    getFooterContent(),
  ]);

  const [journals, services, conferences] = await Promise.all([
    getJournals(),
    getServices(),
    getConferences(),
  ]);

  return {
    hero,
    about,
    contact,
    footer,
    journals,
    services,
    conferences,
  };
}
