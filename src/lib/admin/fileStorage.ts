// File Storage Utilities for CMS JSON Data

import { promises as fs } from 'fs';
import path from 'path';

const CMS_DATA_DIR = path.join(process.cwd(), 'src', 'data', 'cms');

export type CMSSection =
  | 'hero'
  | 'about'
  | 'journals'
  | 'articles'
  | 'services'
  | 'conferences'
  | 'books'
  | 'contact'
  | 'footer'
  | 'media'
  | 'homepage';

// Read a CMS JSON file
export async function readCMSFile<T>(section: CMSSection): Promise<T> {
  const filePath = path.join(CMS_DATA_DIR, `${section}.json`);

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Error reading CMS file ${section}:`, error);
    throw new Error(`Failed to read ${section} data`);
  }
}

// Write to a CMS JSON file
export async function writeCMSFile<T>(section: CMSSection, data: T): Promise<void> {
  const filePath = path.join(CMS_DATA_DIR, `${section}.json`);

  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing CMS file ${section}:`, error);
    throw new Error(`Failed to write ${section} data`);
  }
}

// Get all CMS data
export async function getAllCMSData(): Promise<Record<CMSSection, unknown>> {
  const sections: CMSSection[] = [
    'hero',
    'about',
    'journals',
    'articles',
    'services',
    'conferences',
    'books',
    'contact',
    'footer',
    'media',
  ];

  const data: Record<string, unknown> = {};

  for (const section of sections) {
    try {
      data[section] = await readCMSFile(section);
    } catch {
      data[section] = null;
    }
  }

  return data as Record<CMSSection, unknown>;
}

// Helper function to generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Helper function to get current timestamp
export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}
