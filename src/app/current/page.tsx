import Breadcrumb from "@/components/Breadcrumb";
import Sidebar from "@/components/Sidebar";
import ArticleCard from "@/components/ArticleCard";
import { articles, categories, currentVolume } from "@/data/articles";
import { formatDate } from "@/utils/formatDate";

export default function CurrentIssuePage() {
  const articlesByCategory = categories.map((category) => ({
    ...category,
    articles: articles.filter(
      (a) => a.category.toLowerCase() === category.name.toLowerCase()
    ),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "Current Issue" }]} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Issue Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Vol. {currentVolume.volume} No. {currentVolume.issue} (
              {currentVolume.year})
            </h1>
            <p className="text-gray-600">
              {currentVolume.month} {currentVolume.year}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Published:{" "}
              {formatDate(currentVolume.publishedDate, 'long')}
            </p>
          </div>

          {/* Articles by Category */}
          {articlesByCategory.map(
            (category) =>
              category.articles.length > 0 && (
                <section key={category.slug} className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
                    {category.name}
                  </h2>
                  <div className="space-y-4">
                    {category.articles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                </section>
              )
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
