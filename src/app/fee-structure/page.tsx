import Breadcrumb from "@/components/Breadcrumb";
import Sidebar from "@/components/Sidebar";

export default function FeeStructurePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "Fee Structure" }]} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Fee Structure
            </h1>
            <p className="text-gray-600 mb-8">
              Publication charges and payment details
            </p>

            {/* Fee Table */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 md:p-8 text-white mb-8">
              <h2 className="text-xl font-semibold mb-4">Article Processing Charges (APC)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-blue-100 text-sm mb-1">Pakistani Authors</p>
                  <p className="text-3xl font-bold">PKR 15,000</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-blue-100 text-sm mb-1">International Authors</p>
                  <p className="text-3xl font-bold">USD 100</p>
                </div>
              </div>
              <p className="text-blue-100 text-sm mt-4">
                * Fee is applicable only after article acceptance
              </p>
            </div>

            {/* What's Included */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                What&apos;s Included
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Double-blind peer review",
                  "Professional editing",
                  "DOI assignment",
                  "PDF formatting",
                  "Online publication",
                  "Indexing submission",
                  "Author certificate",
                  "Lifetime access",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Payment Methods
              </h2>

              {/* Bank Transfer */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Bank Transfer</h3>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Bank Name</p>
                      <p className="font-semibold text-gray-900">Meezan Bank Limited</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Account Title</p>
                      <p className="font-semibold text-gray-900">AMAR Journal Publications</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Account Number</p>
                      <p className="font-semibold text-gray-900 font-mono">0123456789012</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">IBAN</p>
                      <p className="font-semibold text-gray-900 font-mono text-xs sm:text-sm">PK36MEZN0001234567890123</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Branch Code</p>
                      <p className="font-semibold text-gray-900">0456</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Branch</p>
                      <p className="font-semibold text-gray-900">Gulberg, Lahore</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* JazzCash */}
              <div className="bg-red-50 border border-red-100 rounded-xl p-6 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold text-sm">JC</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">JazzCash</h3>
                </div>
                <div className="bg-white rounded-lg p-4 border border-red-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Account Title</p>
                      <p className="font-semibold text-gray-900">Muhammad Ahmad</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">JazzCash Number</p>
                      <p className="font-semibold text-gray-900 font-mono">0300-1234567</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* EasyPaisa */}
              <div className="bg-green-50 border border-green-100 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">EP</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">EasyPaisa</h3>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Account Title</p>
                      <p className="font-semibold text-gray-900">Muhammad Ahmad</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">EasyPaisa Number</p>
                      <p className="font-semibold text-gray-900 font-mono">0300-1234567</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Payment Instructions
              </h2>
              <ol className="space-y-3 text-sm text-blue-900">
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-blue-800">1</span>
                  <span>Wait for acceptance email from the editorial team</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-blue-800">2</span>
                  <span>Transfer the fee using any payment method above</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-blue-800">3</span>
                  <span>Take a screenshot of the payment receipt</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-blue-800">4</span>
                  <span>Email the receipt to <strong>editor@amrjournal.com</strong> with your Article ID</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-blue-800">5</span>
                  <span>Your article will be published within 3-5 working days</span>
                </li>
              </ol>
            </div>

            {/* Contact for Queries */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-2">Have questions about payment?</p>
              <a
                href="mailto:editor@amrjournal.com"
                className="text-blue-600 font-medium hover:underline"
              >
                Contact us at editor@amrjournal.com
              </a>
            </div>
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
