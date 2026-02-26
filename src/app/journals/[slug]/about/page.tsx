import Link from "next/link";
import { notFound } from "next/navigation";
import { getJournalBySlug } from "@/lib/cms";
import { getOJSJournalData } from "@/lib/ojs";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AboutPage({ params }: Props) {
  const { slug } = await params;
  const cmsJournal = await getJournalBySlug(slug);

  if (!cmsJournal || !cmsJournal.ojsPath) {
    notFound();
  }

  const ojsData = await getOJSJournalData(cmsJournal.ojsPath);

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
            <span>About</span>
          </nav>
          <h1 className="text-2xl font-bold">{ojsData.name}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Journal</h2>

          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              {ojsData.aboutTheJournal}
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Focus and Scope</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              The {ojsData.name} is a peer-reviewed academic journal that publishes research and scholarly articles.
              The journal aims to contribute to the development and advancement of its field, providing a platform
              for professionals, researchers, and educators to share knowledge, innovations, and evidence-based practices.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Open Access Policy</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              This journal provides immediate open access to its content on the principle that making research
              freely available to the public supports a greater global exchange of knowledge.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Journal Information</h3>
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <p><strong>Publisher:</strong> Great Britain Publishers</p>
              <p><strong>Frequency:</strong> Quarterly</p>
              <p><strong>Language:</strong> English</p>
              <p><strong>ISSN:</strong> {cmsJournal.issn || 'Pending'}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <Link href={`/journals/${slug}`} className="text-[#1e3a5f] hover:underline">
            ← Journal Home
          </Link>
          <Link href={`/journals/${slug}/submissions`} className="text-[#1e3a5f] hover:underline">
            Submission Guidelines
          </Link>
        </div>
      </div>
    </div>
  );
}
