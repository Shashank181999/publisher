import Link from "next/link";
import { notFound } from "next/navigation";
import { getJournalBySlug } from "@/lib/cms";
import { getOJSJournalData } from "@/lib/ojs";
import SubmissionForm from "./SubmissionForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function SubmissionsPage({ params }: Props) {
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
            <span>Submit Manuscript</span>
          </nav>
          <h1 className="text-2xl font-bold">{ojsData.name}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Guidelines Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Submission Guidelines</h2>

          <div className="prose max-w-none space-y-6">
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Information for Authors</h3>
              <p className="text-gray-700 leading-relaxed">
                {ojsData.informationForAuthors}
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Manuscript Requirements</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {ojsData.manuscriptSubmission}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Manuscripts should be prepared in Microsoft Word (.doc, .docx) or PDF format</li>
                <li>Use Times New Roman, 12-point font, double-spaced</li>
                <li>Include title page, abstract (250-300 words), keywords, main text, references</li>
                <li>Follow APA or Vancouver citation style as appropriate</li>
                <li>Include all figures and tables at the end of the manuscript</li>
                <li>Maximum file size: 10MB per file</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Types of Submissions</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Original Research Articles:</strong> Full-length research papers presenting new findings</li>
                <li><strong>Review Articles:</strong> Comprehensive reviews of current literature on specific topics</li>
                <li><strong>Case Reports:</strong> Detailed accounts of interesting or unusual cases</li>
                <li><strong>Short Communications:</strong> Brief reports of preliminary findings</li>
              </ul>
            </section>
          </div>
        </div>

        {/* Submission Form */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Your Manuscript</h2>
          <p className="text-gray-600 mb-6">
            Fill out the form below to submit your manuscript. Your submission will be sent directly to the journal's editorial system.
          </p>

          <SubmissionForm
            journalId={cmsJournal.ojsPath}
            journalName={ojsData.name}
            editorEmail={ojsData.editorEmail}
          />
        </div>

        {/* Alternative Contact */}
        <div className="bg-blue-50 rounded-xl p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Need Help?</h3>
          <p className="text-gray-700 mb-4">
            If you have any questions or face issues with the submission, you can also email your manuscript directly to:
          </p>
          <div className="space-y-2">
            <p>
              <a href={`mailto:${ojsData.editorEmail}`} className="text-[#1e3a5f] hover:underline font-medium">
                {ojsData.editorEmail}
              </a>
            </p>
            <p>
              <a href={`mailto:${ojsData.editorEmail2}`} className="text-[#1e3a5f] hover:underline font-medium">
                {ojsData.editorEmail2}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <Link href={`/journals/${slug}`} className="text-[#1e3a5f] hover:underline">
            ← Journal Home
          </Link>
          <Link href={`/journals/${slug}/about`} className="text-[#1e3a5f] hover:underline">
            About Journal
          </Link>
        </div>
      </div>
    </div>
  );
}
