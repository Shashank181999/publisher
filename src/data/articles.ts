import { Article, Category, Volume } from "@/types";

// Categories - to be populated from OJS
export const categories: Category[] = [];

// Articles - fetched from OJS, not stored locally
export const articles: Article[] = [];

// Current Volume - fetched from OJS
export const currentVolume: Volume = {
  volume: 1,
  issue: 1,
  year: 2024,
  month: "January",
  publishedDate: "2024-01-01",
  articles: [],
};

// Archives - fetched from OJS
export const archives: Volume[] = [];

export function getArticleById(id: string): Article | undefined {
  return articles.find((article) => article.id === id);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter(
    (article) => article.category.toLowerCase() === category.toLowerCase()
  );
}
