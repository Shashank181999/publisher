import Link from "next/link";
import Image from "next/image";

export default function Sidebar() {
  return (
    <aside className="space-y-6">
      {/* Make a Submission */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          Make a Submission
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Submit your research manuscript to our journal for peer review.
        </p>
        <Link
          href="/submissions"
          className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Submit Manuscript
        </Link>
      </div>

      {/* HEC Recognized Badge */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="flex justify-center mb-3">
          <Image
            src="/images/logo-2.png"
            alt="HEC Recognition"
            width={80}
            height={80}
            className="rounded"
          />
        </div>
        <h3 className="text-lg font-semibold text-green-800">
          HEC Recognized Journal
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          Category Y - Higher Education Commission of Pakistan
        </p>
      </div>

      {/* Journal Information */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Journal Information
        </h3>
        <ul className="space-y-3 text-sm">
          <li className="flex justify-between">
            <span className="text-gray-600">ISSN (Online)</span>
            <span className="font-medium">3007-3197</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">Frequency</span>
            <span className="font-medium">Quarterly</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">Review Process</span>
            <span className="font-medium">Double Blind</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">Language</span>
            <span className="font-medium">English</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">Access</span>
            <span className="font-medium text-green-600">Open Access</span>
          </li>
        </ul>
      </div>

      {/* Fee Structure */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-3">
          Publication Fee
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          Article Processing Charges (APC):
        </p>
        <p className="text-2xl font-bold text-yellow-700">PKR 15,000</p>
        <p className="text-xs text-gray-500 mt-2">
          * Fee is applicable after acceptance
        </p>
        <Link
          href="/fee-structure"
          className="text-blue-600 text-sm hover:underline mt-3 block"
        >
          View Fee Structure →
        </Link>
      </div>

      {/* Quick Links */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Links
        </h3>
        <ul className="space-y-2">
          <li>
            <Link
              href="/author-guidelines"
              className="text-blue-600 hover:underline text-sm flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Author Guidelines
            </Link>
          </li>
          <li>
            <Link
              href="/review-policy"
              className="text-blue-600 hover:underline text-sm flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              Review Policy
            </Link>
          </li>
          <li>
            <Link
              href="/ethics"
              className="text-blue-600 hover:underline text-sm flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Publication Ethics
            </Link>
          </li>
          <li>
            <Link
              href="/copyright"
              className="text-blue-600 hover:underline text-sm flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                />
              </svg>
              Copyright Policy
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
