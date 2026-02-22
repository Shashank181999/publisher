"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { companyInfo, journals } from "@/data/journals";

gsap.registerPlugin(ScrollTrigger);

const leadershipTeam = [
  {
    name: "Prof. Richard Thompson",
    role: "Chief Executive Officer",
    bio: "Over 25 years of experience in academic publishing and health sciences research.",
  },
  {
    name: "Dr. Elizabeth Clarke",
    role: "Editorial Director",
    bio: "Former journal editor with expertise in allied health sciences and evidence-based practice.",
  },
  {
    name: "Mr. James Morrison",
    role: "Director of Operations",
    bio: "Leading publishing operations and strategic partnerships across the UK and internationally.",
  },
  {
    name: "Dr. Sarah Mitchell",
    role: "Head of Author Services",
    bio: "Supporting authors through manuscript preparation, editing, and publication success.",
  },
];

const milestones = [
  { year: "2023", event: "Great Britain Publishers founded in United Kingdom" },
  { year: "2024", event: "Launch of 7 Allied Health Sciences journals" },
  { year: "2024", event: "First international conference organized" },
  { year: "2024", event: "Author services platform launched" },
  { year: "2025", event: "Expansion to Social Sciences and Humanities" },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(".hero-content",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      // Section animations
      gsap.utils.toArray<HTMLElement>(".animate-section").forEach((section) => {
        gsap.fromTo(section,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 90%" },
          }
        );
      });

      // Card animations
      gsap.utils.toArray<HTMLElement>(".animate-card").forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.5, delay: i * 0.1, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 92%" },
          }
        );
      });

      // Timeline animations
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
      {/* Hero Section with Parallax */}
      <section className="relative min-h-[60vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1568667256549-094345857637?w=1920&q=100"
            alt="Academic Publishing"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/95 via-[#1e3a5f]/85 to-[#1e3a5f]/70"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">About Us</span>
          </nav>

          <div className="hero-content grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                About <span className="text-[#c8102e]">{companyInfo.name}</span>
              </h1>
              <p className="text-white/80 text-lg leading-relaxed">
                {companyInfo.description}
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: `${journals.length}+`, label: "Journals" },
                    { value: "100+", label: "Reviewers" },
                    { value: "50+", label: "Countries" },
                    { value: "500+", label: "Articles" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-white/60 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="animate-section bg-gradient-to-br from-[#1e3a5f]/5 to-[#1e3a5f]/10 rounded-2xl p-8 border border-[#1e3a5f]/10">
              <div className="w-14 h-14 bg-[#1e3a5f] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed">
                {companyInfo.mission}
              </p>
            </div>

            <div className="animate-section bg-gradient-to-br from-[#c8102e]/5 to-[#c8102e]/10 rounded-2xl p-8 border border-[#c8102e]/10">
              <div className="w-14 h-14 bg-[#c8102e] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed">
                To be a globally recognized academic publisher known for advancing health sciences
                research and supporting researchers throughout their publication journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-section text-center mb-14">
            <span className="text-[#c8102e] font-semibold text-sm uppercase tracking-wider">Services</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-2 mb-4">What We Do</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Comprehensive academic publishing services for researchers, clinicians, and practitioners
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Scientific Journals", desc: "Peer-reviewed journals in Allied Health Sciences and related disciplines.", href: "/journals", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
              { title: "Author Services", desc: "Professional manuscript preparation, editing, and pre-submission review.", href: "/author-services", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
              { title: "Conferences", desc: "International conferences, seminars, webinars, and workshops.", href: "/conferences", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
              { title: "Book Publishing", desc: "Academic textbooks, monographs, and edited volumes.", href: "/books", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
            ].map((service, i) => (
              <Link key={i} href={service.href} className="animate-card group">
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-[#1e3a5f]/30 h-full hover:-translate-y-1">
                  <div className="w-12 h-12 bg-[#1e3a5f]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#c8102e] transition-colors">
                    <svg className="w-6 h-6 text-[#1e3a5f] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#1e3a5f] mb-2 group-hover:text-[#c8102e] transition-colors">{service.title}</h3>
                  <p className="text-slate-600 text-sm">{service.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-section text-center mb-14">
            <span className="text-[#c8102e] font-semibold text-sm uppercase tracking-wider">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-2 mb-4">Leadership Team</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our experienced leadership team is committed to advancing academic publishing excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadershipTeam.map((member, idx) => (
              <div key={idx} className="animate-card bg-slate-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1e3a5f] to-[#c8102e] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-bold text-[#1e3a5f] mb-1">{member.name}</h3>
                <p className="text-[#c8102e] text-sm font-medium mb-2">{member.role}</p>
                <p className="text-slate-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-section text-center mb-14">
            <span className="text-[#c8102e] font-semibold text-sm uppercase tracking-wider">History</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-2 mb-4">Our Journey</h2>
            <p className="text-slate-600">Key milestones in our growth</p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1e3a5f] to-[#c8102e] hidden md:block"></div>
            <div className="space-y-6">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="timeline-item flex items-start gap-6 relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1e3a5f] to-[#c8102e] text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0 z-10 shadow-lg">
                    {milestone.year}
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 flex-1 hover:shadow-md transition-shadow">
                    <p className="text-slate-700">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-section text-center mb-14">
            <span className="text-[#c8102e] font-semibold text-sm uppercase tracking-wider">Principles</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-2 mb-4">Our Values</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Integrity", desc: "We uphold the highest ethical standards in publishing, following COPE guidelines and ensuring research integrity.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
              { title: "Excellence", desc: "We strive for excellence in every publication, ensuring rigorous peer review and high-quality production.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
              { title: "Community", desc: "We foster a global community of researchers, connecting minds and advancing knowledge together.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
            ].map((value, i) => (
              <div key={i} className="animate-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1e3a5f]/10 to-[#c8102e]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">{value.title}</h3>
                <p className="text-slate-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1e3a5f] to-[#c8102e]">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-white/80 text-lg mb-8">
            Have questions? We&apos;d love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-[#1e3a5f] px-8 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
            >
              Contact Us
            </Link>
            <Link
              href="/submissions"
              className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Submit Manuscript
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
