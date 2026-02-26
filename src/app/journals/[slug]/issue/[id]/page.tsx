import Link from "next/link";
import { notFound } from "next/navigation";
import { getJournalBySlug } from "@/lib/cms";
import { getOJSJournalData, getOJSIssue } from "@/lib/ojs";

interface Props {
  params: Promise<{ slug: string; id: string }>;
}

export default async function IssuePage({ params }: Props) {
  const { slug, id } = await params;
  const cmsJournal = await getJournalBySlug(slug);

  if (!cmsJournal || !cmsJournal.ojsPath) {
    notFound();
  }

  const [ojsData, issue] = await Promise.all([
    getOJSJournalData(cmsJournal.ojsPath),
    getOJSIssue(cmsJournal.ojsPath, parseInt(id)),
  ]);

  if (!issue) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-[#1e3a5f] text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm mb-2">
            <Link href="/" className="text-blue-200 hover:text-white">Home</Link>
            <span className="text-blue-300">/</span>
            <Link href="/journals" className="text-blue-200 hover:text-white">Journals</Link>
            <span className="text-blue-300">/</span>
            <Link href={`/journals/${slug}`} className="text-blue-200 hover:text-white">{ojsData.shortName}</Link>
            <span className="text-blue-300">/</span>
            <Link href={`/journals/${slug}/archives`} className="text-blue-200 hover:text-white">Archives</Link>
            <span className="text-blue-300">/</span>
            <span>Vol. {issue.volume}, No. {issue.number}</span>
          </nav>
          <h1 className="text-2xl font-bold">{ojsData.name}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Vol. {issue.volume}, No. {issue.number} ({issue.year})
          </h2>

          {issue.articles.length > 0 ? (
            <div className="space-y-6">
              {issue.articles.map((article, index) => (
                <div key={article.id || index} className="border-b pb-6 last:border-b-0">
                  <h3 className="text-lg font-semibold">
                    <Link
                      href={`/journals/${slug}/article/${article.id}`}
                      className="text-[#1e3a5f] hover:underline"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  {article.authors.length > 0 && (
                    <p className="text-gray-600 mt-1">{article.authors.join(', ')}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No articles in this issue.</p>
          )}
        </div>

        <div className="mt-6 flex gap-4">
          <Link href={`/journals/${slug}/archives`} className="text-[#1e3a5f] hover:underline">
            ← All Issues
          </Link>
          <Link href={`/journals/${slug}`} className="text-[#1e3a5f] hover:underline">
            Journal Home
          </Link>
        </div>
      </div>
    </div>
  );
}
