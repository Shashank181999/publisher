"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { journals, companyInfo } from "@/data/journals";

// Brand Colors: Navy #1e3a5f | Red #c8102e | Gold #c8102e

interface DropdownItem {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  href: string;
  dropdown?: DropdownItem[];
  megaMenu?: boolean;
}

const navLinks: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Journals",
    href: "/journals",
    megaMenu: true,
    dropdown: journals.map(j => ({
      name: j.shortName + " - " + j.name,
      href: `/journals/${j.slug}`,
    }))
  },
  {
    name: "Conferences",
    href: "/conferences",
    dropdown: [
      { name: "All Conferences", href: "/conferences" },
      { name: "Seminars", href: "/conferences/seminars" },
      { name: "Webinars", href: "/conferences/webinars" },
      { name: "Workshops", href: "/conferences/workshops" },
      { name: "Upcoming Events", href: "/conferences/upcoming" },
    ]
  },
  {
    name: "Author Services",
    href: "/author-services",
    dropdown: [
      { name: "All Services", href: "/author-services" },
      { name: "Manuscript Preparation", href: "/author-services/manuscript-preparation" },
      { name: "English Language Editing", href: "/author-services/english-editing" },
      { name: "Scientific Editing", href: "/author-services/scientific-editing" },
      { name: "Similarity Check", href: "/author-services/similarity-check" },
      { name: "Submit Manuscript", href: "/submissions" },
    ]
  },
  {
    name: "Books",
    href: "/books",
    dropdown: [
      { name: "Our Books", href: "/books" },
      { name: "Submit Book Proposal", href: "/books/submit-proposal" },
      { name: "Writing & Editing", href: "/books/writing-editing" },
    ]
  },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setMobileSubmenu(null);
  };

  return (
    <header className={`sticky top-0 z-50 transition-shadow duration-200 ${
      isScrolled ? "bg-white shadow-lg" : "bg-white shadow-md"
    }`}>
      {/* Top Bar */}
      <div className="bg-[#1e3a5f] text-white py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#c8102e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {companyInfo.contact.email}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#c8102e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {companyInfo.address.city}, {companyInfo.address.country}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a href={companyInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-[#c8102e] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={companyInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#c8102e] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href={companyInfo.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-[#c8102e] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
            <div className="border-l border-white/20 pl-4 flex gap-4">
              <Link href="/login" className="hover:text-[#c8102e] transition-colors">Login</Link>
              <Link href="/register" className="hover:text-[#c8102e] transition-colors">Register</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <Image
              src="/images/logo-2.png"
              alt="Great Britain Publishers"
              width={60}
              height={60}
              className="w-14 h-14 md:w-16 md:h-16 object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-bold text-[#1e3a5f] leading-tight group-hover:text-[#c8102e] transition-colors">
                Great Britain Publishers
              </h1>
              <p className="text-xs md:text-sm text-slate-500">
                Advancing Knowledge, Connecting Minds
              </p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search journals, articles, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent pr-12 bg-slate-50 focus:bg-white transition-colors"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1e3a5f] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/submissions"
              className="bg-[#c8102e] text-white px-6 py-2.5 rounded-xl font-medium text-sm shadow-md hover:bg-[#a00d25] transition-colors"
            >
              Submit Manuscript
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="bg-[#1e3a5f] hidden md:block" ref={dropdownRef}>
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex">
            {navLinks.map((link) => (
              <li key={link.name} className="relative">
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                      className="flex items-center gap-1 px-4 py-3.5 text-white hover:bg-white/10 font-medium text-sm transition-colors"
                    >
                      {link.name}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {activeDropdown === link.name && (
                      <div className={`absolute top-full left-0 bg-white shadow-2xl rounded-xl py-2 z-50 ${link.megaMenu ? 'w-[500px]' : 'w-64'} border border-slate-100`}>
                        {link.megaMenu ? (
                          <div className="p-4">
                            <div className="grid grid-cols-1 gap-1 max-h-80 overflow-y-auto">
                              {link.dropdown.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className="block p-3 rounded-lg hover:bg-[#1e3a5f]/5 transition-colors"
                                >
                                  <span className="font-medium text-[#1e3a5f] text-sm hover:text-[#c8102e]">
                                    {item.name}
                                  </span>
                                </Link>
                              ))}
                            </div>
                            <div className="border-t mt-3 pt-3">
                              <Link
                                href="/journals"
                                onClick={() => setActiveDropdown(null)}
                                className="text-[#c8102e] hover:text-[#a00d25] text-sm font-medium flex items-center gap-1"
                              >
                                View All Journals
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
                            </div>
                          </div>
                        ) : (
                          link.dropdown.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className="block px-4 py-2.5 text-[#1e3a5f] hover:bg-[#1e3a5f]/5 hover:text-[#c8102e] transition-colors text-sm"
                            >
                              {item.name}
                            </Link>
                          ))
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="block px-4 py-3.5 text-white hover:bg-white/10 font-medium text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 md:hidden overflow-y-auto transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b bg-[#1e3a5f]">
          <span className="text-white font-semibold">Menu</span>
          <button onClick={closeMenu} className="p-1 rounded-lg hover:bg-white/20 transition-colors">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Search */}
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] pr-10 bg-slate-50"
            />
            <svg className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Mobile Nav Links */}
        <nav className="py-2">
          {navLinks.map((link) => (
            <div key={link.name}>
              {link.dropdown ? (
                <>
                  <button
                    onClick={() => setMobileSubmenu(mobileSubmenu === link.name ? null : link.name)}
                    className="flex items-center justify-between w-full px-4 py-3 text-[#1e3a5f] hover:bg-[#1e3a5f]/5 hover:text-[#c8102e] transition-colors"
                  >
                    {link.name}
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${mobileSubmenu === link.name ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileSubmenu === link.name && (
                    <div className="bg-slate-50 py-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMenu}
                          className="block px-8 py-2.5 text-sm text-slate-600 hover:text-[#c8102e] transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="block px-4 py-3 text-[#1e3a5f] hover:bg-[#1e3a5f]/5 hover:text-[#c8102e] transition-colors"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Auth Links */}
        <div className="absolute bottom-16 left-0 right-0 border-t p-4 space-y-2 bg-white">
          <Link href="/submissions" onClick={closeMenu}>
            <button className="block w-full text-center py-3 bg-[#c8102e] text-white rounded-xl font-medium hover:bg-[#a00d25] transition-colors">
              Submit Manuscript
            </button>
          </Link>
          <div className="flex gap-2">
            <Link href="/login" onClick={closeMenu} className="flex-1">
              <button className="w-full text-center py-2.5 border border-[#1e3a5f] text-[#1e3a5f] rounded-xl font-medium hover:bg-[#1e3a5f]/5 transition-colors">
                Login
              </button>
            </Link>
            <Link href="/register" onClick={closeMenu} className="flex-1">
              <button className="w-full text-center py-2.5 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors">
                Register
              </button>
            </Link>
          </div>
        </div>

        {/* Company Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-slate-50 border-t text-center">
          <p className="text-xs text-slate-500">
            Great Britain Publishers | {companyInfo.address.city}, UK
          </p>
        </div>
      </div>
    </header>
  );
}
