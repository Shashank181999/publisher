import Link from "next/link";

export const metadata = {
  title: "Writing & Editing Services | Great Britain Publishers",
  description: "Professional writing and editing services for academic book authors. Expert developmental editing, copyediting, and proofreading.",
};

export default function WritingEditingPage() {
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
            <span className="text-white font-medium">Writing & Editing</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Writing & Editing Services
            </h1>
            <p className="text-blue-100 text-lg mb-8">
              Professional support for academic book authors at every stage of the writing process.
              From developmental editing to final proofreading, we help you create your best work.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-white text-[#1e3a5f] px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Get a Quote
              </Link>
              <Link
                href="/author-services"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                All Author Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Writing & Editing Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive support to help you produce a polished, publication-ready manuscript
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-[#1e3a5f] mb-3">Developmental Editing</h3>
              <p className="text-gray-600 text-sm mb-4">
                Big-picture editing focusing on structure, organization, argument flow, and content development.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1e3a5f] rounded-full mt-2 flex-shrink-0"></span>
                  Chapter organization and flow
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1e3a5f] rounded-full mt-2 flex-shrink-0"></span>
                  Argument clarity and coherence
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1e3a5f] rounded-full mt-2 flex-shrink-0"></span>
                  Content gaps and redundancies
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-[#1e3a5f] mb-3">Line Editing</h3>
              <p className="text-gray-600 text-sm mb-4">
                Sentence-level editing for clarity, style, readability, and academic tone.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1e3a5f] rounded-full mt-2 flex-shrink-0"></span>
                  Sentence structure improvement
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1e3a5f] rounded-full mt-2 flex-shrink-0"></span>
                  Word choice and precision
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1e3a5f] rounded-full mt-2 flex-shrink-0"></span>
                  Tone and voice consistency
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-[#1e3a5f] mb-3">Copyediting</h3>
              <p className="text-gray-600 text-sm mb-4">
                Technical editing for grammar, spelling, punctuation, and consistency.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1e3a5f] rounded-full mt-2 flex-shrink-0"></span>
                  Grammar and punctuation
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1e3a5f] rounded-full mt-2 flex-shrink-0"></span>
                  Style guide compliance
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1e3a5f] rounded-full mt-2 flex-shrink-0"></span>
                  Terminology consistency
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-[#1e3a5f] mb-3">Proofreading</h3>
              <p className="text-gray-600 text-sm mb-4">
                Final review to catch any remaining errors before publication.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1e3a5f] rounded-full mt-2 flex-shrink-0"></span>
                  Typos and spelling errors
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1e3a5f] rounded-full mt-2 flex-shrink-0"></span>
                  Formatting inconsistencies
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1e3a5f] rounded-full mt-2 flex-shrink-0"></span>
                  Cross-reference accuracy
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-[#1e3a5f] mb-3">Writing Assistance</h3>
              <p className="text-gray-600 text-sm mb-4">
                Support with drafting specific sections or chapters of your book.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1e3a5f] rounded-full mt-2 flex-shrink-0"></span>
                  Literature review writing
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1e3a5f] rounded-full mt-2 flex-shrink-0"></span>
                  Introduction and conclusion
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1e3a5f] rounded-full mt-2 flex-shrink-0"></span>
                  Abstract and summaries
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-[#1e3a5f] mb-3">Reference & Citation</h3>
              <p className="text-gray-600 text-sm mb-4">
                Formatting and verification of references and citations.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1e3a5f] rounded-full mt-2 flex-shrink-0"></span>
                  Citation style formatting
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1e3a5f] rounded-full mt-2 flex-shrink-0"></span>
                  Reference list compilation
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1e3a5f] rounded-full mt-2 flex-shrink-0"></span>
                  In-text citation checking
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Our Services?</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">Expert Editors</h3>
                  <p className="text-gray-600 text-sm">Our editors have advanced degrees and experience in academic publishing.</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">Subject Expertise</h3>
                  <p className="text-gray-600 text-sm">We match your manuscript with editors who specialize in your field.</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">Quality Assurance</h3>
                  <p className="text-gray-600 text-sm">Every project undergoes multiple quality checks before delivery.</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">Confidentiality</h3>
                  <p className="text-gray-600 text-sm">Your work is handled with strict confidentiality and security.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1e3a5f] to-[#152d4a] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Get Started Today</h3>
              <p className="text-blue-100 mb-6">
                Contact us to discuss your book project and receive a customized quote for our writing and editing services.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free initial consultation</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Transparent pricing</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Flexible turnaround times</span>
                </div>
              </div>
              <Link
                href="/contact"
                className="block w-full bg-white text-[#1e3a5f] text-center py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#1e3a5f] to-[#152d4a] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Perfect Your Manuscript?</h2>
          <p className="text-blue-100 mb-8">
            Let our expert editors help you create a polished, publication-ready book.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-[#1e3a5f] px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Contact Us
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
