import Link from "next/link";
import Image from "next/image";
import { journals } from "@/data/journals";

// Brand Colors: Navy #1e3a5f | Red #c8102e | Gold #c8102e

export default function Sidebar() {
  return (
    <aside className="space-y-6">
      {/* Make a Submission */}
      <div className="bg-gradient-to-br from-[#1e3a5f] to-[#152d4a] rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">Submit Your Research</h3>
        <p className="text-sm text-white/70 mb-4">
          Submit your manuscript to our peer-reviewed journals.
        </p>
        <Link
          href="/submissions"
          className="block w-full bg-[#c8102e] text-white text-center py-3 rounded-lg hover:bg-[#a00d25] transition font-medium"
        >
          Submit Manuscript
        </Link>
      </div>

      {/* Our Journals */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-[#1e3a5f] mb-4">Our Journals</h3>
        <ul className="space-y-3">
          {journals.slice(0, 5).map((journal) => (
            <li key={journal.id}>
              <Link
                href={`/journals/${journal.slug}`}
                className="flex items-center gap-3 text-slate-600 hover:text-[#c8102e] transition"
              >
                <span className="w-8 h-8 bg-[#1e3a5f]/10 rounded-lg flex items-center justify-center text-xs font-bold text-[#1e3a5f]">
                  {journal.shortName}
                </span>
                <span className="text-sm">{journal.name.split(' ').slice(0, 3).join(' ')}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/journals"
          className="text-[#c8102e] text-sm hover:underline mt-4 block font-medium"
        >
          View All Journals →
        </Link>
      </div>

      {/* Publisher Info */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-[#1e3a5f] mb-4">Publisher</h3>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white border border-slate-200 rounded-lg p-1">
            <Image
              src="/images/logo-2.png"
              alt="Great Britain Publishers"
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
            />
          </div>
          <div>
            <div className="font-semibold text-[#1e3a5f] text-sm">Great Britain Publishers</div>
            <div className="text-xs text-slate-500">United Kingdom</div>
          </div>
        </div>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span className="text-slate-600">Location</span>
            <span className="font-medium text-[#1e3a5f]">Carluke, UK</span>
          </li>
          <li className="flex justify-between">
            <span className="text-slate-600">Journals</span>
            <span className="font-medium text-[#1e3a5f]">{journals.length}+</span>
          </li>
          <li className="flex justify-between">
            <span className="text-slate-600">Access</span>
            <span className="font-medium text-[#c8102e]">Open Access</span>
          </li>
        </ul>
      </div>

      {/* Author Services */}
      <div className="bg-[#c8102e]/10 border border-[#c8102e]/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-[#1e3a5f] mb-3">Author Services</h3>
        <p className="text-sm text-slate-600 mb-4">
          Professional editing, manuscript preparation, and more.
        </p>
        <Link
          href="/author-services"
          className="text-[#c8102e] text-sm hover:underline font-medium"
        >
          Explore Services →
        </Link>
      </div>

      {/* Quick Links */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-[#1e3a5f] mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li>
            <Link
              href="/about"
              className="text-slate-600 hover:text-[#c8102e] text-sm flex items-center gap-2 transition"
            >
              <svg className="w-4 h-4 text-[#c8102e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/conferences"
              className="text-slate-600 hover:text-[#c8102e] text-sm flex items-center gap-2 transition"
            >
              <svg className="w-4 h-4 text-[#c8102e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Conferences
            </Link>
          </li>
          <li>
            <Link
              href="/books"
              className="text-slate-600 hover:text-[#c8102e] text-sm flex items-center gap-2 transition"
            >
              <svg className="w-4 h-4 text-[#c8102e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Book Publishing
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-slate-600 hover:text-[#c8102e] text-sm flex items-center gap-2 transition"
            >
              <svg className="w-4 h-4 text-[#c8102e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
