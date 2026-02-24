"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { companyInfo, journals } from "@/data/journals";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: "2023", event: "Great Britain Publishers founded in the United Kingdom with a vision to advance health sciences research globally" },
  { year: "2024", event: "Launched 7 peer-reviewed Allied Health Sciences journals covering Physical Therapy, Medical Lab Technology, and more" },
  { year: "2024", event: "Organized our first International Conference on Allied Health Sciences in London" },
  { year: "2024", event: "Introduced comprehensive Author Services platform for manuscript preparation and editing" },
  { year: "2025", event: "Expanding into Social Sciences, Humanities, and interdisciplinary research areas" },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-content",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      gsap.utils.toArray<HTMLElement>(".animate-section").forEach((section) => {
        gsap.fromTo(section,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 90%" },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".animate-card").forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.5, delay: i * 0.1, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 92%" },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 0.5, delay: i * 0.15, ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 92%" },
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1568667256549-094345857637?w=1920&q=100"
            alt="Academic Publishing"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/95 via-[#1e3a5f]/90 to-[#1e3a5f]/75"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">About Us</span>
          </nav>

          <div className="hero-content grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#c8102e]/20 text-[#c8102e] text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-[#c8102e]/30">
                Established in United Kingdom
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Advancing Knowledge,<br />
                <span className="text-[#c8102e]">Connecting Minds</span>
              </h1>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Great Britain Publishers is a distinguished academic publishing house dedicated to
                disseminating high-quality, peer-reviewed research. We bring together extraordinary
                clinicians, research scientists, and health professionals to solve fundamental
                scientific problems and drive innovation in healthcare.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/journals" className="bg-[#c8102e] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#a00d25] transition-all">
                  Explore Our Journals
                </Link>
                <Link href="/submissions" className="border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all">
                  Submit Your Research
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { value: `${journals.length}+`, label: "Peer-Reviewed Journals", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
                    { value: "100+", label: "Expert Reviewers", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
                    { value: "50+", label: "Countries Reached", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                    { value: "500+", label: "Published Articles", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-4 rounded-xl bg-white/5">
                      <svg className="w-8 h-8 text-[#c8102e] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                      </svg>
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-white/60 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-section">
              <span className="text-[#c8102e] font-semibold text-sm uppercase tracking-wider">Who We Are</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-2 mb-6">
                A Publisher Committed to Academic Excellence
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-[#1e3a5f]">Great Britain Publishers</strong> is a UK-based academic
                  publishing house specializing in health sciences, allied health professions, and interdisciplinary
                  research. We are committed to providing a platform for global researchers, academicians, and
                  practitioners to share their findings and clinical expertise.
                </p>
                <p>
                  Our publishing program encompasses peer-reviewed journals, academic books, conference proceedings,
                  and comprehensive author services. We believe that rigorous, ethical publishing advances human
                  knowledge and improves lives through the application of evidence-based practice.
                </p>
                <p>
                  What sets us apart is our dedication to supporting authors throughout their publication journey.
                  From manuscript preparation to post-publication promotion, we provide the tools and expertise
                  researchers need to maximize the impact of their work.
                </p>
              </div>
            </div>
            <div className="animate-section grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8f] rounded-2xl p-6 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">COPE Member</h3>
                <p className="text-white/80 text-sm">Following Committee on Publication Ethics guidelines</p>
              </div>
              <div className="bg-gradient-to-br from-[#c8102e] to-[#e8334d] rounded-2xl p-6 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Open Access</h3>
                <p className="text-white/80 text-sm">Committed to making research freely accessible</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Fast Publication</h3>
                <p className="text-white/80 text-sm">Efficient review and publication process</p>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">DOI & Indexing</h3>
                <p className="text-white/80 text-sm">Ensuring discoverability and citations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-section text-center mb-14">
            <span className="text-[#c8102e] font-semibold text-sm uppercase tracking-wider">Our Purpose</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-2 mb-4">Mission & Vision</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="animate-section bg-white rounded-2xl p-8 shadow-sm border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1e3a5f]/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-[#1e3a5f] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#1e3a5f] mb-4">Our Mission</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {companyInfo.mission}
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#c8102e] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-600 text-sm">Publish rigorous, peer-reviewed research across health sciences</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#c8102e] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-600 text-sm">Support authors from manuscript to publication and beyond</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#c8102e] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-600 text-sm">Foster collaboration through conferences and networking</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-section bg-white rounded-2xl p-8 shadow-sm border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c8102e]/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-[#c8102e] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#1e3a5f] mb-4">Our Vision</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  To be a globally recognized academic publisher known for advancing health sciences
                  research, maintaining the highest ethical standards, and empowering researchers
                  to make meaningful contributions that improve human health and well-being.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#c8102e] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-600 text-sm">Become a leading voice in health sciences publishing</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#c8102e] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-600 text-sm">Expand our journal portfolio across disciplines</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#c8102e] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-600 text-sm">Build a global community of researchers and practitioners</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-section text-center mb-14">
            <span className="text-[#c8102e] font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-2 mb-4">What We Do</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Comprehensive academic publishing services designed to support researchers at every stage
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Scientific Journals",
                desc: "We publish peer-reviewed journals across Allied Health Sciences, Medical Sciences, and related disciplines. Each journal maintains rigorous editorial standards and ethical guidelines.",
                href: "/journals",
                icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                color: "blue"
              },
              {
                title: "Author Services",
                desc: "Professional support including manuscript preparation, English editing, scientific editing, similarity checks, and pre-submission review to maximize acceptance chances.",
                href: "/author-services",
                icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
                color: "emerald"
              },
              {
                title: "Conferences & Events",
                desc: "International conferences, seminars, webinars, and workshops that bring together researchers, clinicians, and academics to share knowledge and network.",
                href: "/conferences",
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
                color: "purple"
              },
              {
                title: "Book Publishing",
                desc: "We publish academic textbooks, research monographs, edited volumes, and reference works with professional editing, design, and global distribution.",
                href: "/books",
                icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                color: "orange"
              },
            ].map((service, i) => (
              <Link key={i} href={service.href} className="animate-card group">
                <div className="bg-slate-50 rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-[#1e3a5f]/30 h-full hover:-translate-y-1">
                  <div className={`w-14 h-14 bg-${service.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#c8102e] transition-colors`}>
                    <svg className={`w-7 h-7 text-${service.color}-600 group-hover:text-white transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#1e3a5f] text-lg mb-3 group-hover:text-[#c8102e] transition-colors">{service.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
                  <div className="mt-4 flex items-center text-[#c8102e] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Peer Review Process */}
      <section id="peer-review" className="py-20 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8f] text-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-section text-center mb-14">
            <span className="inline-block bg-white/10 text-cyan-300 font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full border border-white/20">Quality Assurance</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Our Peer Review Process</h2>
            <p className="text-white/80 max-w-3xl mx-auto">
              We employ a rigorous double-blind peer review process to ensure the quality, validity,
              and significance of all published research. Our expert reviewers are carefully selected
              based on their expertise and experience in the relevant field.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: "1", title: "Submission", desc: "Author submits manuscript through our online system" },
              { step: "2", title: "Initial Review", desc: "Editorial team checks scope, format, and plagiarism" },
              { step: "3", title: "Peer Review", desc: "2-3 expert reviewers evaluate the manuscript" },
              { step: "4", title: "Decision", desc: "Editor makes decision based on reviewer feedback" },
              { step: "5", title: "Publication", desc: "Accepted manuscripts undergo production and publication" },
            ].map((item, i) => (
              <div key={i} className="animate-card relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 h-full">
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/70 text-sm">{item.desc}</p>
                </div>
                {i < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <svg className="w-4 h-4 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="animate-section mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-cyan-300 mb-2">2-4 Weeks</div>
              <p className="text-white/70">Average review turnaround time</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-emerald-400 mb-2">Double-Blind</div>
              <p className="text-white/70">Anonymous review process</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-amber-300 mb-2">2-3 Reviewers</div>
              <p className="text-white/70">Per manuscript minimum</p>
            </div>
          </div>
        </div>
      </section>

      {/* Publishing Ethics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-section">
              <span className="text-[#c8102e] font-semibold text-sm uppercase tracking-wider">Ethical Standards</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-2 mb-6">
                Publishing Ethics & Integrity
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                We are committed to maintaining the highest standards of publication ethics. As members
                of the Committee on Publication Ethics (COPE), we follow established guidelines for
                ethical publishing and addressing misconduct.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4">
                  <div className="w-10 h-10 bg-[#1e3a5f]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e3a5f] mb-1">Plagiarism Prevention</h4>
                    <p className="text-slate-600 text-sm">All submissions undergo plagiarism screening using industry-leading software</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4">
                  <div className="w-10 h-10 bg-[#1e3a5f]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e3a5f] mb-1">Conflict of Interest</h4>
                    <p className="text-slate-600 text-sm">Clear disclosure policies for authors, reviewers, and editors</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4">
                  <div className="w-10 h-10 bg-[#1e3a5f]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e3a5f] mb-1">Data Integrity</h4>
                    <p className="text-slate-600 text-sm">Guidelines for data sharing, reproducibility, and research integrity</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4">
                  <div className="w-10 h-10 bg-[#1e3a5f]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e3a5f] mb-1">Corrections & Retractions</h4>
                    <p className="text-slate-600 text-sm">Transparent policies for correcting or retracting published content</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-section">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200">
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-6">Author Responsibilities</h3>
                <div className="space-y-4">
                  {[
                    "Submit original work that has not been published elsewhere",
                    "Properly cite and attribute all sources and references",
                    "Disclose any conflicts of interest or funding sources",
                    "Ensure all co-authors have agreed to submission",
                    "Obtain necessary permissions for copyrighted material",
                    "Comply with ethical guidelines for human/animal research",
                    "Respond promptly to reviewer comments and revisions",
                    "Report any errors discovered after publication"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-section text-center mb-14">
            <span className="text-[#c8102e] font-semibold text-sm uppercase tracking-wider">Our Principles</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-2 mb-4">Core Values</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The fundamental principles that guide our publishing practices and relationships
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Integrity",
                desc: "We uphold the highest ethical standards in publishing, following COPE guidelines and ensuring research integrity in every publication.",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                color: "bg-blue-500"
              },
              {
                title: "Excellence",
                desc: "We strive for excellence in every aspect of publishing, from rigorous peer review to high-quality production and professional support.",
                icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
                color: "bg-emerald-500"
              },
              {
                title: "Innovation",
                desc: "We embrace new technologies and methodologies to improve the publishing experience and expand access to research findings.",
                icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
                color: "bg-purple-500"
              },
              {
                title: "Community",
                desc: "We foster a global community of researchers, connecting minds across borders and disciplines to advance collective knowledge.",
                icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
                color: "bg-orange-500"
              },
            ].map((value, i) => (
              <div key={i} className="animate-card bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center hover:shadow-lg transition-all duration-300">
                <div className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">{value.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-section text-center mb-14">
            <span className="text-[#c8102e] font-semibold text-sm uppercase tracking-wider">Our History</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-2 mb-4">Our Journey</h2>
            <p className="text-slate-600">Key milestones in our growth and development</p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1e3a5f] via-[#c8102e] to-[#1e3a5f] hidden md:block"></div>
            <div className="space-y-6">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="timeline-item flex items-start gap-6 relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1e3a5f] to-[#c8102e] text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0 z-10 shadow-lg">
                    {milestone.year}
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 shadow-sm border border-slate-200 flex-1 hover:shadow-md hover:border-[#1e3a5f]/30 transition-all">
                    <p className="text-slate-700 leading-relaxed">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-section text-center mb-14">
            <span className="text-[#c8102e] font-semibold text-sm uppercase tracking-wider">Our Advantages</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-2 mb-4">Why Publish With Us</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Discover the benefits of choosing Great Britain Publishers for your academic work
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Rigorous Peer Review", desc: "Double-blind review by 2-3 expert reviewers ensures quality and credibility", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
              { title: "Fast Publication", desc: "Efficient editorial process with average acceptance-to-publication time of 4-6 weeks", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
              { title: "Global Visibility", desc: "Wide distribution and indexing ensures your research reaches the right audience", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              { title: "Open Access Options", desc: "Choose open access to maximize the impact and accessibility of your research", icon: "M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" },
              { title: "Author Support", desc: "Comprehensive support from submission to publication and beyond", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              { title: "Ethical Publishing", desc: "Strict adherence to COPE guidelines and publication ethics standards", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
            ].map((item, i) => (
              <div key={i} className="animate-card flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md hover:border-[#1e3a5f]/30 transition-all">
                <div className="w-12 h-12 bg-[#1e3a5f]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e3a5f] mb-1">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1e3a5f] to-[#c8102e]">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Whether you&apos;re ready to submit your research, explore our journals, or learn more about our
            author services, we&apos;re here to help you succeed in your publishing journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/submissions"
              className="bg-white text-[#1e3a5f] px-8 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
            >
              Submit Manuscript
            </Link>
            <Link
              href="/journals"
              className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Browse Journals
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white/50 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 hover:border-white transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
