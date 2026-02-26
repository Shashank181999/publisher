"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journals } from "@/data/journals";

gsap.registerPlugin(ScrollTrigger);

// Journal logos mapping for OJS journals
const journalLogos: { [key: string]: string } = {
  'bjahs': '/images/logo-allied-health.jpeg',
  'bjms': '/images/logo-medical-sciences.jpeg',
  'bjrot': '/images/logo-rehab-therapy.jpeg',
  'bjcstech': '/images/logo-cs-it.jpeg',
  'bjss': '/images/logo-social-sciences.jpeg',
};

// Categories based on actual OJS journals
const journalCategories = [
  {
    name: "Allied Health Sciences",
    slug: "ahs",
    count: 2,
    color: "bg-[#1e3a5f]",
    lightColor: "bg-blue-50",
    textColor: "text-[#1e3a5f]",
    borderColor: "border-blue-200",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    )
  },
  {
    name: "Medical Sciences",
    slug: "medical",
    count: 1,
    color: "bg-[#1e3a5f]",
    lightColor: "bg-blue-50",
    textColor: "text-[#1e3a5f]",
    borderColor: "border-blue-200",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 15.5m14.8-.2l-.8 3.5a2.25 2.25 0 01-2.35 1.7H7.35a2.25 2.25 0 01-2.35-1.7L4.2 15.3" />
      </svg>
    )
  },
  {
    name: "Social Sciences",
    slug: "social",
    count: 1,
    color: "bg-[#1e3a5f]",
    lightColor: "bg-blue-50",
    textColor: "text-[#1e3a5f]",
    borderColor: "border-blue-200",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    name: "Computer Science & Technology",
    slug: "other",
    count: 1,
    color: "bg-[#1e3a5f]",
    lightColor: "bg-blue-50",
    textColor: "text-[#1e3a5f]",
    borderColor: "border-blue-200",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    )
  },
];

export default function JournalsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      const heroTl = gsap.timeline();
      heroTl
        .fromTo(".hero-badge", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
        .fromTo(".hero-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
        .fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
        .fromTo(".hero-btn", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
        .fromTo(".hero-image", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" }, "-=0.5");

      // Stats animation
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".stats-container", start: "top 85%" },
        }
      );

      // Category cards
      gsap.fromTo(
        ".category-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".categories-container", start: "top 80%" },
        }
      );

      // Section titles
      gsap.utils.toArray<HTMLElement>(".section-title").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      // Journal cards
      gsap.fromTo(
        ".journal-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".journals-grid", start: "top 80%" },
        }
      );

      // CTA section
      gsap.fromTo(
        ".cta-content",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ".cta-section", start: "top 85%" },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1e3a5f] via-[#1e3a5f] to-[#152d4a] overflow-hidden">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Gradient orbs - using white/blue instead of red for better contrast */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white">Journals</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="hero-badge inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm text-white/90 mb-6">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                Open Access Publishing
              </div>

              <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Our Scientific<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">Journals</span>
              </h1>

              <p className="hero-desc text-lg text-white/70 mb-8 max-w-lg leading-relaxed">
                Peer-reviewed, open-access journals publishing high-quality research across health sciences, social sciences, and humanities.
              </p>

              <div className="hero-btn flex flex-wrap gap-4">
                <Link
                  href="/submissions"
                  className="inline-flex items-center gap-2 bg-white text-[#1e3a5f] px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Submit Manuscript
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="#journals"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  Browse Journals
                </Link>
              </div>
            </div>

            <div className="hero-image hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-3xl blur-2xl scale-110"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                  <Image
                    src="/images/logo-2.png"
                    alt="Great Britain Publishers"
                    width={240}
                    height={240}
                    className="w-56 h-56 object-contain"
                    priority
                  />
                  <div className="absolute -top-3 -right-3 bg-[#1e3a5f] text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg">
                    5 Journals
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-container grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-white/10">
            {[
              { value: "5", label: "Active Journals", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" },
              { value: "100+", label: "Articles Published", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
              { value: "50+", label: "Expert Reviewers", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
              { value: "4-6 Weeks", label: "Review Time", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
            ].map((stat, i) => (
              <div key={i} className="stat-item text-center p-4 rounded-2xl bg-white/5 border border-white/10">
                <svg className="w-8 h-8 text-blue-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                </svg>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-title text-center mb-10">
            <span className="inline-block bg-blue-100 text-blue-700 font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">Categories</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f]">Browse by Discipline</h2>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
              Our journals cover health sciences, medical research, social sciences, and technology.
            </p>
          </div>

          <div className="categories-container grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {journalCategories.map((category, i) => (
              <div
                key={i}
                className="category-card group relative bg-white rounded-2xl p-5 shadow-sm border border-blue-200 overflow-hidden"
              >
                {/* Icon */}
                <div className="relative w-12 h-12 rounded-xl bg-[#1e3a5f] flex items-center justify-center text-white mb-4">
                  {category.icon}
                </div>

                <h3 className="relative font-bold text-[#1e3a5f] text-sm">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Journals */}
      <section id="journals" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-title flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="inline-block bg-blue-100 text-blue-700 font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">Our Collection</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f]">Our Peer-Reviewed Journals</h2>
              <p className="text-slate-600 mt-2">{journals.length} Open Access Journals</p>
            </div>
            <Link
              href="/submissions"
              className="inline-flex items-center gap-2 bg-[#1e3a5f] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#152d4a] transition-all duration-300"
            >
              Submit Your Research
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="journals-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journals.map((journal) => (
              <Link key={journal.id} href={`/journals/${journal.slug}`} className="journal-card group block">
                <div className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  {/* Top accent - using gradient that works well */}
                  <div className="h-1.5 bg-gradient-to-r from-[#1e3a5f] via-blue-500 to-[#1e3a5f]"></div>

                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 p-2 flex-shrink-0 overflow-hidden group-hover:border-blue-200 transition-colors">
                        <Image
                          src={journalLogos[journal.id] || '/images/logo-allied-health.jpeg'}
                          alt={journal.name}
                          width={56}
                          height={56}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex gap-2 mb-2">
                          <span className="inline-block bg-blue-100 text-[#1e3a5f] text-xs px-2.5 py-1 rounded-full font-medium">
                            Open Access
                          </span>
                          <span className="inline-block bg-blue-50 text-[#1e3a5f] text-xs px-2.5 py-1 rounded-full font-medium">
                            Peer Reviewed
                          </span>
                        </div>
                        <h3 className="font-bold text-[#1e3a5f] group-hover:text-blue-600 transition-colors duration-300 text-sm leading-tight line-clamp-2">
                          {journal.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">{journal.description}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {journal.subjects.slice(0, 3).map((subject, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-xs font-medium">
                          {subject}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {journal.frequency}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Est. {journal.established}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all duration-300">
                        View
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Publish With Us */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-title text-center mb-12">
            <span className="inline-block bg-blue-100 text-[#1e3a5f] font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">Benefits</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f]">Why Publish With Us</h2>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
              Join thousands of researchers who trust Great Britain Publishers for their academic publications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Rigorous Peer Review", desc: "Double-blind review by 2-3 expert reviewers ensures quality", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
              { title: "Fast Publication", desc: "Average 4-6 weeks from acceptance to online publication", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
              { title: "Global Visibility", desc: "Wide distribution and indexing in major databases", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" },
              { title: "Open Access", desc: "Free access for readers, maximizing your research impact", icon: "M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" },
              { title: "DOI & Indexing", desc: "Permanent DOI assignment and database indexing", icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" },
              { title: "Author Support", desc: "Dedicated support throughout the publication process", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-[#1e3a5f] text-lg mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-20 bg-gradient-to-br from-[#1e3a5f] to-[#152d4a] relative overflow-hidden">
        {/* Background decoration - using softer colors */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-[80px]"></div>
        </div>

        <div className="cta-content relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm text-white/90 mb-6">
            <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Start Publishing Today
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Share Your Research?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Join researchers worldwide who trust Great Britain Publishers for their academic publications. Submit your manuscript today.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/submissions"
              className="inline-flex items-center gap-2 bg-white text-[#1e3a5f] px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Submit Manuscript
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/author-services"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
            >
              Author Services
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-transparent border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
