import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import ArticleCard from "@/components/ArticleCard";
import { articles, categories, currentVolume } from "@/data/articles";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Current Issue Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">Current Issue</h2>
                <p className="text-blue-100">
                  Vol. {currentVolume.volume} No. {currentVolume.issue} (
                  {currentVolume.year}): {currentVolume.month}{" "}
                  {currentVolume.year}
                </p>
                <p className="text-sm text-blue-200 mt-1">
                  Published:{" "}
                  {new Date(currentVolume.publishedDate).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
              <Link
                href="/current"
                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition"
              >
                View All Articles
              </Link>
            </div>
          </div>

          {/* Categories Section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition text-center"
                >
                  <h3 className="font-medium text-gray-800">{category.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {category.articleCount} articles
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Recent Articles */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Recent Articles
              </h2>
              <Link
                href="/archives"
                className="text-blue-600 hover:underline text-sm"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-6">
              {articles.slice(0, 5).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {articles.length > 5 && (
              <div className="text-center mt-8">
                <Link
                  href="/current"
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Load More Articles
                </Link>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
