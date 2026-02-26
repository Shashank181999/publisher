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
  preview?: boolean;
}

export default function OJSArticles({ journalId, limit = 10, showJournalName = false, preview = false }: OJSArticlesProps) {
  const [articles, setArticles] = useState<OJSArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let url = journalId
          ? `/api/articles?journal=${journalId}&limit=${limit}`
          : `/api/articles?limit=${limit}`;

        if (preview) {
          url += '&preview=true';
        }

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
          <div key={i} className="bg-slate-100 rounded-xl p-6 border border-slate-200">
            <div className="h-5 bg-slate-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-3"></div>
            <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-slate-200 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 text-center">
        <svg className="w-12 h-12 mx-auto mb-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-10 text-center border border-slate-200">
        <div className="w-20 h-20 bg-[#1e3a5f]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#1e3a5f] mb-3">No Published Articles Yet</h3>
        <p className="text-slate-600 mb-6 max-w-md mx-auto">
          We are currently reviewing submissions. Published articles will appear here once they go through our peer-review process.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/submissions"
            className="inline-flex items-center justify-center gap-2 bg-[#1e3a5f] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#152d4a] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Submit Your Research
          </Link>
          <Link
            href="/author-services/guidelines"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#1e3a5f] px-6 py-3 rounded-xl font-semibold border border-slate-200 hover:border-[#1e3a5f] transition-all duration-300"
          >
            Author Guidelines
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <article
          key={article.id}
          className="group bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300"
        >
          <div>
              {/* Journal Badge */}
              {showJournalName && (
                <span className="inline-block bg-blue-100 text-[#1e3a5f] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {article.journalName}
                </span>
              )}

              {/* Title */}
              <h3 className="text-lg font-bold text-[#1e3a5f] mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                <Link href={`/journals/${article.journalId}/article/${article.id}`}>
                  {article.title}
                </Link>
              </h3>

              {/* Authors */}
              <p className="text-sm text-slate-600 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="line-clamp-1">{article.authors.join(', ')}</span>
              </p>

              {/* Abstract */}
              {article.abstract && (
                <p className="text-slate-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                  {article.abstract}
                </p>
              )}

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                {article.doi && (
                  <a
                    href={`https://doi.org/${article.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    DOI: {article.doi}
                  </a>
                )}
                {article.publishedDate && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(article.publishedDate).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                )}
                <Link
                  href={`/journals/${article.journalId}/article/${article.id}`}
                  className="ml-auto flex items-center gap-1 text-[#1e3a5f] font-semibold hover:text-blue-600 transition-colors"
                >
                  Read Article
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
          </div>
        </article>
      ))}
    </div>
  );
}
