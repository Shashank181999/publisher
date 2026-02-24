import Link from "next/link";

export const metadata = {
  title: "Book Production | Great Britain Publishers",
  description: "Learn about our professional book production process including editing, typesetting, cover design, and printing.",
};

export default function BookProductionPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e3a5f] via-[#1e3a5f] to-[#152d4a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-blue-200 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/books" className="hover:text-white">Book Publishing</Link>
            <span>/</span>
            <span className="text-white font-medium">Production</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Book Production
            </h1>
            <p className="text-blue-100 text-lg mb-8">
              Your manuscript transforms into a professional publication through our meticulous
              production process including design, typesetting, and printing.
            </p>
          </div>
        </div>
      </section>

      {/* Production Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Production Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From accepted manuscript to finished book, every step is handled with care and expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <div className="w-12 h-12 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Copyediting</h3>
              <p className="text-gray-600 text-sm">
                Professional copyeditors review for grammar, spelling, consistency, and style.
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <div className="w-12 h-12 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Cover Design</h3>
              <p className="text-gray-600 text-sm">
                Our designers create an eye-catching cover that represents your book&apos;s content.
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <div className="w-12 h-12 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Typesetting</h3>
              <p className="text-gray-600 text-sm">
                Expert typesetting for beautiful interior layout with professional formatting.
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <div className="w-12 h-12 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                4
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Printing</h3>
              <p className="text-gray-600 text-sm">
                High-quality printing with options for paperback, hardcover, and special editions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Production Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Production Services</h2>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">Developmental Editing</h3>
                  <p className="text-gray-600 text-sm">Big-picture editing focusing on structure, content organization, and narrative flow.</p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">Line Editing</h3>
                  <p className="text-gray-600 text-sm">Sentence-level editing for clarity, style, and readability improvements.</p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">Proofreading</h3>
                  <p className="text-gray-600 text-sm">Final review catching typos, formatting errors, and inconsistencies.</p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">Indexing</h3>
                  <p className="text-gray-600 text-sm">Professional indexing for academic and reference books.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gradient-to-br from-[#1e3a5f] to-[#152d4a] rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Author Proofs</h3>
                <p className="text-blue-100 mb-6">
                  You&apos;ll receive proofs at key stages to review and approve before final production.
                </p>

                <div className="space-y-4">
                  <div className="bg-white/10 rounded-xl p-4">
                    <h4 className="font-semibold mb-1">First Proofs</h4>
                    <p className="text-blue-100 text-sm">Review edited manuscript with tracked changes</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <h4 className="font-semibold mb-1">Page Proofs</h4>
                    <p className="text-blue-100 text-sm">Review typeset pages for layout and formatting</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <h4 className="font-semibold mb-1">Cover Proof</h4>
                    <p className="text-blue-100 text-sm">Approve final cover design before printing</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <h4 className="font-semibold mb-1">Final Proof</h4>
                    <p className="text-blue-100 text-sm">Last review before book goes to print</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Publication Formats</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-blue-50 rounded-xl p-6">
              <h3 className="font-bold text-[#1e3a5f] mb-2">Paperback</h3>
              <p className="text-gray-600 text-sm">Affordable, portable format ideal for students and general readers.</p>
            </div>

            <div className="text-center bg-blue-50 rounded-xl p-6">
              <h3 className="font-bold text-[#1e3a5f] mb-2">Hardcover</h3>
              <p className="text-gray-600 text-sm">Durable, premium format for libraries and collectors.</p>
            </div>

            <div className="text-center bg-blue-50 rounded-xl p-6">
              <h3 className="font-bold text-[#1e3a5f] mb-2">eBook</h3>
              <p className="text-gray-600 text-sm">Digital formats (EPUB, PDF) for instant access worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 bg-gradient-to-r from-[#1e3a5f] to-[#152d4a] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Launch</h2>
          <p className="text-blue-100 mb-8">
            Once production is complete, your book moves to publication and marketing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/books/marketing"
              className="bg-white text-[#1e3a5f] px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Learn About Marketing
            </Link>
            <Link
              href="/books"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Back to Book Publishing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
