export interface Article {
  id: string;
  title: string;
  authors: Author[];
  abstract: string;
  keywords: string[];
  doi: string;
  pdfUrl: string;
  category: string;
  volume: number;
  issue: number;
  year: number;
  pages: string;
  publishedDate: string;
}

export interface Author {
  name: string;
  affiliation: string;
  email?: string;
}

export interface Category {
  name: string;
  slug: string;
  articleCount: number;
}

export interface Volume {
  volume: number;
  issue: number;
  year: number;
  month: string;
  publishedDate: string;
  articles: Article[];
}
