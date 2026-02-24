import Link from "next/link";

export const metadata = {
  title: "Publishing Contract | Great Britain Publishers",
  description: "Understand our book publishing agreement terms. Fair contracts with transparent terms for academic authors.",
};

export default function BookContractPage() {
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
            <span className="text-white font-medium">Publishing Contract</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Publishing Agreement
            </h1>
            <p className="text-blue-100 text-lg mb-8">
              We believe in transparent, fair contracts. Understand what to expect when you sign
              a publishing agreement with Great Britain Publishers.
            </p>
          </div>
        </div>
      </section>

      {/* Contract Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What&apos;s in the Contract</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our publishing agreements are designed to be author-friendly while protecting both parties.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-[#1e3a5f] mb-2">Rights & Permissions</h3>
              <p className="text-gray-600 text-sm">Clear definition of publishing rights, territories, and formats covered by the agreement.</p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-[#1e3a5f] mb-2">Royalties</h3>
              <p className="text-gray-600 text-sm">Competitive royalty rates for print and digital sales with transparent reporting.</p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-[#1e3a5f] mb-2">Timeline</h3>
              <p className="text-gray-600 text-sm">Agreed manuscript delivery dates and projected publication schedule.</p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-[#1e3a5f] mb-2">Editorial Support</h3>
              <p className="text-gray-600 text-sm">Scope of editorial services provided as part of the publishing process.</p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-[#1e3a5f] mb-2">Distribution</h3>
              <p className="text-gray-600 text-sm">Global distribution channels, both print and digital, for maximum reach.</p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-[#1e3a5f] mb-2">Marketing</h3>
              <p className="text-gray-600 text-sm">Marketing and promotional commitments to ensure visibility of your book.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contract Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Contract Process</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Contract Offer</h3>
                    <p className="text-gray-600 text-sm">After your proposal is approved, we send you a formal contract offer outlining all terms.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Review & Negotiation</h3>
                    <p className="text-gray-600 text-sm">Take time to review the contract. We&apos;re open to discussing terms that work for both parties.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Signing</h3>
                    <p className="text-gray-600 text-sm">Once agreed, both parties sign the contract digitally or via post.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Onboarding</h3>
                    <p className="text-gray-600 text-sm">You&apos;ll be assigned an editor and receive a detailed timeline for manuscript delivery.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Author-Friendly Terms</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#1e3a5f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-900">Retain Copyright</h4>
                    <p className="text-gray-600 text-sm">You retain copyright; we receive publishing license</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#1e3a5f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-900">Open Access Options</h4>
                    <p className="text-gray-600 text-sm">Choose open access for maximum research impact</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#1e3a5f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-900">Author Copies</h4>
                    <p className="text-gray-600 text-sm">Complimentary author copies upon publication</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#1e3a5f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-900">No Hidden Fees</h4>
                    <p className="text-gray-600 text-sm">Transparent pricing with no surprise costs</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <Link
                  href="/contact"
                  className="block w-full bg-[#1e3a5f] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#152d4a] transition"
                >
                  Contact Our Contracts Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 bg-gradient-to-r from-[#1e3a5f] to-[#152d4a] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for the Next Step?</h2>
          <p className="text-blue-100 mb-8">
            After signing, you&apos;ll begin writing your book with guidance from our editorial team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/author-services"
              className="bg-white text-[#1e3a5f] px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Author Writing Services
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
