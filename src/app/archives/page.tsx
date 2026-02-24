import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Sidebar from "@/components/Sidebar";
import { archives } from "@/data/articles";
import { formatDate } from "@/utils/formatDate";

export default function ArchivesPage() {
  const volumeGroups = archives.reduce(
    (acc, issue) => {
      const key = `Vol. ${issue.volume} (${issue.year})`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(issue);
      return acc;
    },
    {} as Record<string, typeof archives>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "Archives" }]} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Archives
            </h1>
            <p className="text-gray-600">
              Browse all past issues of the journal
            </p>
          </div>

          <div className="space-y-6">
            {Object.entries(volumeGroups).map(([volumeKey, issues]) => (
              <div
                key={volumeKey}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <h2 className="text-lg font-semibold text-white bg-blue-800 px-6 py-3">
                  {volumeKey}
                </h2>
                <div className="divide-y divide-gray-200">
                  {issues.map((issue) => (
                    <Link
                      key={`${issue.volume}-${issue.issue}`}
                      href={
                        issue.volume === 4 && issue.issue === 2
                          ? "/current"
                          : `/archives/${issue.volume}/${issue.issue}`
                      }
                      className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900">
                          No. {issue.issue}: {issue.month} {issue.year}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Published:{" "}
                          {formatDate(issue.publishedDate)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {issue.volume === 4 && issue.issue === 2 && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            Current
                          </span>
                        )}
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
