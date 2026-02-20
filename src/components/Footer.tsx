import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Journal Info */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/images/logo.png"
                alt="Journal Logo"
                width={70}
                height={70}
                className="rounded-lg bg-white p-1"
              />
              <div>
                <h3 className="text-white font-bold text-lg">
                  Annual Methodological Archive
                </h3>
                <p className="text-sm text-gray-400">Research Review</p>
              </div>
            </div>
            <p className="text-sm mb-4 leading-relaxed">
              A peer-reviewed, open-access academic journal publishing
              high-quality research across multiple disciplines including
              Social Sciences, Applied Sciences, Computer Science, and more.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-medium">
                ISSN: 3007-3197
              </span>
              <span className="bg-green-600 text-white text-xs px-3 py-1.5 rounded-full font-medium">
                HEC Recognized
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/current" className="hover:text-white transition flex items-center gap-2">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Current Issue
                </Link>
              </li>
              <li>
                <Link href="/archives" className="hover:text-white transition flex items-center gap-2">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Archives
                </Link>
              </li>
              <li>
                <Link href="/submissions" className="hover:text-white transition flex items-center gap-2">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Submit Manuscript
                </Link>
              </li>
              <li>
                <Link href="/aims-scope" className="hover:text-white transition flex items-center gap-2">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Aims & Scope
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition flex items-center gap-2">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Editorial Board
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span>editor@amrjournal.com</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span>Lahore, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Annual Methodological Archive Research Review. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 mt-3">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
