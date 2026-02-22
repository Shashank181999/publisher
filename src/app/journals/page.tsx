"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journals, journalCategories } from "@/data/journals";

gsap.registerPlugin(ScrollTrigger);

const journalLogos: { [key: string]: string } = {
  'pt': '/images/logo-rehab-therapy.jpeg',
  'mlt': '/images/logo-medical-sciences.jpeg',
  'slp': '/images/logo-allied-health.jpeg',
  'ot': '/images/logo-rehab-therapy.jpeg',
  'ndt': '/images/logo-allied-health.jpeg',
  'ott': '/images/logo-rehab-therapy.jpeg',
  'mit': '/images/logo-medical-sciences.jpeg',
};

const categories = [
  {
    title: "Allied Health Sciences",
    count: "3 Journals",
    href: "/journals/physical-therapy",
    color: "from-blue-600 to-blue-800",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    )
  },
  {
    title: "Medical Sciences",
    count: "2 Journals",
    href: "/journals/medical-lab-technology",
    color: "from-red-600 to-red-800",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 15.5m14.8-.2l-.8 3.5a2.25 2.25 0 01-2.35 1.7H7.35a2.25 2.25 0 01-2.35-1.7L4.2 15.3" />
      </svg>
    )
  },
  {
    title: "Rehabilitation Therapy",
    count: "2 Journals",
    href: "/journals/occupational-therapy",
    color: "from-emerald-600 to-emerald-800",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    )
  },
  {
    title: "Computer Science",
    count: "Coming Soon",
    href: "/journals",
    color: "from-slate-600 to-slate-800",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".categories-container", start: "top 80%" },
        }
      );

      // Section titles
      gsap.utils.toArray<HTMLElement>(".section-title").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
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

        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c8102e]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"></div>

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
                <span className="w-2 h-2 bg-[#c8102e] rounded-full animate-pulse"></span>
                Open Access Publishing
              </div>

              <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Our Scientific<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">Journals</span>
              </h1>

              <p className="hero-desc text-lg text-white/70 mb-8 max-w-lg leading-relaxed">
                Peer-reviewed, open-access journals publishing high-quality research in Allied Health Sciences and related disciplines.
              </p>

              <div className="hero-btn flex flex-wrap gap-4">
                <Link
                  href="/submissions"
                  className="inline-flex items-center gap-2 bg-[#c8102e] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#a00d25] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
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
                <div className="absolute inset-0 bg-gradient-to-br from-[#c8102e]/20 to-blue-500/20 rounded-3xl blur-2xl scale-110"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <Image
                    src="/images/logo-2.png"
                    alt="Great Britain Publishers"
                    width={240}
                    height={240}
                    className="w-56 h-56 object-contain"
                    priority
                  />
                  <div className="absolute -top-3 -right-3 bg-[#c8102e] text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg">
                    {journals.length}+ Journals
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-container grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-white/10">
            {[
              { value: journals.length + "+", label: "Active Journals" },
              { value: "500+", label: "Articles Published" },
              { value: "100+", label: "Expert Reviewers" },
              { value: "4-6 Weeks", label: "Review Time" },
            ].map((stat, i) => (
              <div key={i} className="stat-item text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-title text-center mb-12">
            <span className="text-[#c8102e] font-semibold text-sm uppercase tracking-wider">Explore</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-2">Browse by Category</h2>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
              Discover journals across multiple disciplines and find the perfect fit for your research.
            </p>
          </div>

          <div className="categories-container grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, i) => (
              <Link
                key={i}
                href={category.href}
                className="category-card group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 hover:border-[#c8102e]/20 overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>

                <h3 className="font-bold text-[#1e3a5f] text-lg mb-2 group-hover:text-[#c8102e] transition-colors duration-300">
                  {category.title}
                </h3>

                <span className="inline-block text-sm text-slate-500 font-medium">
                  {category.count}
                </span>

                {/* Arrow */}
                <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  <svg className="w-5 h-5 text-[#c8102e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Journals Grid */}
      <section id="journals" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-title flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-[#c8102e] font-semibold text-sm uppercase tracking-wider">Our Collection</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-2">Allied Health Sciences</h2>
              <p className="text-slate-600 mt-2">{journals.filter(j => j.category === 'ahs').length} Peer-Reviewed Open Access Journals</p>
            </div>
            <Link
              href="/submissions"
              className="inline-flex items-center gap-2 text-[#c8102e] font-semibold hover:gap-3 transition-all duration-300"
            >
              Submit Your Research
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="journals-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journals.filter(j => j.category === 'ahs').map((journal) => (
              <Link key={journal.id} href={`/journals/${journal.slug}`} className="journal-card group block">
                <div className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-[#c8102e]/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  {/* Top accent */}
                  <div className="h-1 bg-gradient-to-r from-[#1e3a5f] to-[#c8102e]"></div>

                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 p-2 flex-shrink-0 overflow-hidden">
                        <Image
                          src={journalLogos[journal.id] || '/images/logo-allied-health.jpeg'}
                          alt={journal.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex gap-2 mb-2">
                          <span className="inline-block bg-[#c8102e]/10 text-[#c8102e] text-xs px-2 py-0.5 rounded-full font-medium">
                            Open Access
                          </span>
                        </div>
                        <h3 className="font-bold text-[#1e3a5f] group-hover:text-[#c8102e] transition-colors duration-300 text-sm leading-tight line-clamp-2">
                          {journal.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{journal.description}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {journal.subjects.slice(0, 2).map((subject, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-xs font-medium">
                          {subject}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="flex items-center gap-1.5 text-sm text-slate-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {journal.frequency}
                      </span>
                      <span className="flex items-center gap-1 text-[#c8102e] font-semibold text-sm group-hover:gap-2 transition-all duration-300">
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

      {/* Coming Soon */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-title text-center mb-10">
            <span className="text-[#c8102e] font-semibold text-sm uppercase tracking-wider">Expanding</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mt-2">More Disciplines Coming Soon</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {journalCategories.filter(cat => cat.count === 0).map((category) => (
              <div
                key={category.slug}
                className="bg-white rounded-xl px-5 py-3 border border-slate-200 shadow-sm hover:shadow-md hover:border-[#c8102e]/20 transition-all duration-300"
              >
                <span className="text-[#1e3a5f] font-medium text-sm">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-20 bg-gradient-to-br from-[#1e3a5f] to-[#152d4a] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c8102e]/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px]"></div>
        </div>

        <div className="cta-content relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Share Your Research?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Join researchers worldwide who trust Great Britain Publishers for their academic publications.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/submissions"
              className="inline-flex items-center gap-2 bg-[#c8102e] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#a00d25] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Submit Manuscript
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#1e3a5f] transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
