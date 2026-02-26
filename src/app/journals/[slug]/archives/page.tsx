import Link from "next/link";
import { notFound } from "next/navigation";
import { getJournalBySlug } from "@/lib/cms";
import { getOJSJournalData, getOJSArchives } from "@/lib/ojs";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ArchivesPage({ params }: Props) {
  const { slug } = await params;
  const cmsJournal = await getJournalBySlug(slug);

  if (!cmsJournal || !cmsJournal.ojsPath) {
    notFound();
  }

  const [ojsData, archives] = await Promise.all([
    getOJSJournalData(cmsJournal.ojsPath),
    getOJSArchives(cmsJournal.ojsPath),
  ]);

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
            <span>Archives</span>
          </nav>
          <h1 className="text-2xl font-bold">{ojsData.name}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Archives</h2>

          {archives.length > 0 ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {archives.map((issue) => (
                <Link
                  key={issue.id}
                  href={`/journals/${slug}/issue/${issue.id}`}
                  className="p-6 border rounded-xl hover:border-[#1e3a5f] hover:shadow-md transition text-center"
                >
                  <p className="text-lg font-semibold text-[#1e3a5f]">
                    Vol. {issue.volume}, No. {issue.number}
                  </p>
                  <p className="text-gray-600">{issue.year}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No published issues yet.</p>
            </div>
          )}
        </div>

        <div className="mt-6">
          <Link href={`/journals/${slug}`} className="text-[#1e3a5f] hover:underline">
            ← Back to {ojsData.shortName}
          </Link>
        </div>
      </div>
    </div>
  );
}
