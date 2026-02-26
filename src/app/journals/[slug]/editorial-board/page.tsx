import Link from "next/link";
import { notFound } from "next/navigation";
import { getJournalBySlug } from "@/lib/cms";
import { getOJSJournalData, getOJSPageContent } from "@/lib/ojs";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditorialBoardPage({ params }: Props) {
  const { slug } = await params;
  const cmsJournal = await getJournalBySlug(slug);

  if (!cmsJournal || !cmsJournal.ojsPath) {
    notFound();
  }

  const [ojsData, editorialContent] = await Promise.all([
    getOJSJournalData(cmsJournal.ojsPath),
    getOJSPageContent(cmsJournal.ojsPath, 'about/editorialMasthead'),
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
            <span>Editorial Board</span>
          </nav>
          <h1 className="text-2xl font-bold">{ojsData.name}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Editorial Board</h2>

          {editorialContent.sections.length > 0 ? (
            <div className="space-y-8">
              {editorialContent.sections.map((section, index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{section.heading}</h3>
                  <p className="text-gray-700 leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          ) : editorialContent.content ? (
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{editorialContent.content}</p>
            </div>
          ) : (
            <div className="prose max-w-none space-y-8">
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Editor-in-Chief</h3>
                <p className="text-gray-600 italic">Editorial board information is being updated.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Associate Editors</h3>
                <p className="text-gray-600 italic">To be announced.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Editorial Advisory Board</h3>
                <p className="text-gray-600 italic">To be announced.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact the Editorial Team</h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <p>
                    <strong>Email:</strong>{' '}
                    <a href={`mailto:${ojsData.editorEmail}`} className="text-[#1e3a5f] hover:underline">
                      {ojsData.editorEmail}
                    </a>
                  </p>
                  <p>
                    <strong>Alternate:</strong>{' '}
                    <a href={`mailto:${ojsData.editorEmail2}`} className="text-[#1e3a5f] hover:underline">
                      {ojsData.editorEmail2}
                    </a>
                  </p>
                </div>
              </section>
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-4">
          <Link href={`/journals/${slug}`} className="text-[#1e3a5f] hover:underline">
            ← Journal Home
          </Link>
          <Link href={`/journals/${slug}/submissions`} className="text-[#1e3a5f] hover:underline">
            Submit Manuscript
          </Link>
        </div>
      </div>
    </div>
  );
}
