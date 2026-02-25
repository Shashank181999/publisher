'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface OJSArticle {
  id: number;
  title: string;
  abstract: string;
  authors: string[];
  doi?: string;
  publishedDate?: string;
  journalId: string;
  journalName: string;
}

interface OJSArticlesProps {
  journalId?: string;
  limit?: number;
  showJournalName?: boolean;
}

export default function OJSArticles({ journalId, limit = 10, showJournalName = false }: OJSArticlesProps) {
  const [articles, setArticles] = useState<OJSArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const url = journalId
          ? `/api/articles?journal=${journalId}&limit=${limit}`
          : `/api/articles?limit=${limit}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.articles) {
          setArticles(data.articles);
        }
      } catch (err) {
        setError('Failed to load articles');
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [journalId, limit]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-6">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 rounded-lg p-4 text-center">
        {error}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="bg-blue-50 rounded-lg p-6 text-center">
        <div className="text-5xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Articles Yet</h3>
        <p className="text-gray-600 mb-4">
          Articles will appear here once they are published in OJS.
        </p>
        <Link
          href="/submissions"
          className="inline-block bg-[#1e3a5f] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#152d4a] transition"
        >
          Submit Your Paper
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <div
          key={article.id}
          className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600">
            <Link href={`/article/${article.journalId}-${article.id}`}>
              {article.title}
            </Link>
          </h3>

          <p className="text-sm text-gray-600 mb-2">
            {article.authors.join(', ')}
          </p>

          {showJournalName && (
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
              {article.journalName}
            </span>
          )}

          {article.abstract && (
            <p className="text-gray-600 text-sm line-clamp-3 mb-3">
              {article.abstract}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-gray-500">
            {article.doi && (
              <span>DOI: {article.doi}</span>
            )}
            {article.publishedDate && (
              <span>Published: {new Date(article.publishedDate).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
