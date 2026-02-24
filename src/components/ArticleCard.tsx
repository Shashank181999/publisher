import Link from "next/link";
import { Article } from "@/types";
import { formatDate } from "@/utils/formatDate";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
          {article.category}
        </span>
        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
          Vol. {article.volume}, Issue {article.issue}
        </span>
      </div>

      <Link href={`/article/${article.id}`}>
        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition mb-3 line-clamp-2">
          {article.title}
        </h3>
      </Link>

      <div className="text-sm text-gray-600 mb-3">
        {article.authors.map((author, index) => (
          <span key={author.name}>
            {author.name}
            {index < article.authors.length - 1 && ", "}
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-500 mb-4 line-clamp-3">
        {article.abstract}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {article.keywords.slice(0, 3).map((keyword) => (
          <span
            key={keyword}
            className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded border"
          >
            {keyword}
          </span>
        ))}
        {article.keywords.length > 3 && (
          <span className="text-gray-400 text-xs px-2 py-1">
            +{article.keywords.length - 3} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-500">
          Published: {formatDate(article.publishedDate)}
        </span>
        <div className="flex gap-3">
          <Link
            href={`/article/${article.id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View Article
          </Link>
          <button className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            PDF
          </button>
        </div>
      </div>
    </div>
  );
}
