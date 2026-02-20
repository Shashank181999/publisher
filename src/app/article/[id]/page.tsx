import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Sidebar from "@/components/Sidebar";
import { getArticleById, articles } from "@/data/articles";

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) {
    notFound();
  }

  const similarArticles = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Archives", href: "/archives" },
          { label: `Vol. ${article.volume}, Issue ${article.issue}`, href: "/current" },
          { label: article.category, href: `/category/${article.category.toLowerCase().replace(" ", "-")}` },
          { label: article.title.substring(0, 50) + "..." },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Article Header */}
            <div className="p-6 md:p-8 border-b border-gray-200">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {article.category}
                </span>
                <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                  Vol. {article.volume}, Issue {article.issue}, {article.year}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {article.title}
              </h1>

              {/* Authors */}
              <div className="space-y-3 mb-6">
                {article.authors.map((author, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                      {author.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{author.name}</p>
                      <p className="text-sm text-gray-600">
                        {author.affiliation}
                      </p>
                      {author.email && (
                        <p className="text-sm text-blue-600">{author.email}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* DOI */}
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-sm font-medium text-gray-600">DOI:</span>
                <a
                  href={`https://doi.org/${article.doi}`}
                  className="text-blue-600 hover:underline break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.doi}
                </a>
              </div>
            </div>

            {/* Abstract */}
            <div className="p-6 md:p-8 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Abstract
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify">
                {article.abstract}
              </p>
            </div>

            {/* Keywords */}
            <div className="p-6 md:p-8 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Keywords
              </h2>
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Download & Citations */}
            <div className="p-6 md:p-8 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Download
              </h2>
              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  Download PDF
                </button>
              </div>
            </div>

            {/* Citation Formats */}
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Citation
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    APA Style
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
                    {article.authors.map((a) => a.name).join(", ")} (
                    {article.year}). {article.title}.{" "}
                    <em>Annual Methodological Archive Research Review</em>,{" "}
                    {article.volume}({article.issue}), {article.pages}.
                    https://doi.org/{article.doi}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded transition">
                    Copy APA
                  </button>
                  <button className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded transition">
                    Copy Chicago
                  </button>
                  <button className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded transition">
                    Copy Harvard
                  </button>
                  <button className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded transition">
                    Download BibTeX
                  </button>
                  <button className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded transition">
                    Download EndNote
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Similar Articles */}
          {similarArticles.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Similar Articles
              </h2>
              <div className="grid gap-4">
                {similarArticles.map((similar) => (
                  <Link
                    key={similar.id}
                    href={`/article/${similar.id}`}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <h3 className="font-medium text-gray-900 hover:text-blue-600 mb-2">
                      {similar.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {similar.authors.map((a) => a.name).join(", ")}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    id: article.id,
  }));
}
