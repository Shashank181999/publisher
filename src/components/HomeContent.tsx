"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PublicationJourney from "@/components/PublicationJourney";
import OJSArticles from "@/components/OJSArticles";
import { formatDate } from "@/utils/formatDate";
import type { HomepageContent, CMSConference, CMSService } from "@/types/cms";

gsap.registerPlugin(ScrollTrigger);

interface HomeContentProps {
  homepage: HomepageContent;
  conferences: CMSConference[];
  services: CMSService[];
}

export default function HomeContent({ homepage, conferences, services }: HomeContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Parallax effect for hero background
      gsap.to(".hero-parallax", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Hero animations - immediate
      const heroTl = gsap.timeline();
      heroTl
        .fromTo(".hero-badge", { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" })
        .fromTo(".hero-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
        .fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3")
        .fromTo(".hero-buttons", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.2")
        .fromTo(".hero-stats .stat-item", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.08, ease: "power2.out" }, "-=0.2")
        .fromTo(".hero-image", { opacity: 0, scale: 0.95, x: 20 }, { opacity: 1, scale: 1, x: 0, duration: 0.6, ease: "power3.out" }, "-=0.5");

      // Section headers - immediate when in view
      gsap.utils.toArray<HTMLElement>(".section-header").forEach((header) => {
        gsap.fromTo(
          header,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: header,
              start: "top 90%",
            },
          }
        );
      });

      // Animate sections on scroll - immediate
      gsap.utils.toArray<HTMLElement>(".animate-section").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
            },
          }
        );
      });

      // Cards stagger animation - faster
      gsap.utils.toArray<HTMLElement>(".cards-container").forEach((container) => {
        const cards = container.querySelectorAll(".card-item");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 90%",
            },
          }
        );
      });

      // Service list items - faster stagger
      gsap.utils.toArray<HTMLElement>(".service-list").forEach((list) => {
        const items = list.querySelectorAll(".service-item");
        gsap.fromTo(
          items,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: list,
              start: "top 90%",
            },
          }
        );
      });

      // Image reveal animation - faster
      gsap.utils.toArray<HTMLElement>(".reveal-image").forEach((img) => {
        gsap.fromTo(
          img,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 90%",
            },
          }
        );
      });

      // CTA buttons animation - immediate
      gsap.utils.toArray<HTMLElement>(".cta-button").forEach((btn) => {
        gsap.fromTo(
          btn,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: btn,
              start: "top 95%",
            },
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Duplicate banners for infinite scroll effect
  const duplicatedBanners = [...homepage.featuredBanners.banners, ...homepage.featuredBanners.banners];

  return (
    <div ref={containerRef}>
      {/* Hero Section - Exactly One Viewport Height */}
      <section className="hero-section relative h-[calc(100vh-80px)] overflow-hidden">
        {/* Parallax Background Image */}
        <div
          className="hero-parallax absolute inset-0 scale-110 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1920&q=100)',
          }}
        ></div>

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/95 via-[#1e3a5f]/85 to-[#1e3a5f]/70"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#c8102e]/20 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/15 rounded-full blur-[80px]"></div>
        </div>

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}></div>
        </div>

        {/* Main content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col">
          {/* Center content */}
          <div className="flex-1 flex items-center py-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
              {/* Left side - Text content */}
              <div className="text-white">
                <div className="hero-badge inline-flex items-center gap-2 bg-[#c8102e] text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4 shadow-lg shadow-[#c8102e]/30">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  UK&apos;s Premier Academic Publisher
                </div>

                <h1 className="hero-title text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] mb-4">
                  Publish Your Research with
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#c8102e] to-red-400"> Great Britain Publishers</span>
                </h1>

                <p className="hero-desc text-base lg:text-lg text-white/70 mb-6 leading-relaxed max-w-md">
                  Peer-reviewed, open-access journals publishing high-quality research in Allied Health Sciences and related disciplines.
                </p>

                <div className="hero-buttons flex flex-wrap gap-3 mb-6">
                  <Link
                    href="/journals"
                    className="group inline-flex items-center gap-2 bg-[#c8102e] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#a00d25] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Browse Journals
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/submissions"
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#1e3a5f] transition-all duration-300"
                  >
                    Submit Research
                  </Link>
                </div>

                {/* Stats inline */}
                <div className="hero-stats flex flex-wrap gap-6">
                  {[
                    { value: "5", label: "Journals" },
                    { value: "100+", label: "Articles" },
                    { value: "50+", label: "Countries" },
                    { value: "50+", label: "Reviewers" },
                  ].map((stat, i) => (
                    <div key={i} className="stat-item">
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-white/50">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side - Logo Card */}
              <div className="hero-image hidden lg:flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-3 bg-gradient-to-br from-[#c8102e]/30 to-blue-500/20 rounded-3xl blur-2xl"></div>
                  <div className="relative bg-white rounded-2xl p-6 shadow-2xl">
                    <Image
                      src="/images/logo-2.png"
                      alt="Great Britain Publishers"
                      width={200}
                      height={200}
                      className="w-44 h-44 mx-auto object-contain"
                      priority
                    />
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {[
                        { label: "Open Access", icon: "🔓" },
                        { label: "Peer Reviewed", icon: "✓" },
                        { label: "Fast Review", icon: "⚡" },
                        { label: "DOI Assigned", icon: "🔗" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2.5 bg-[#1e3a5f]/5 rounded-lg">
                          <span className="text-base">{item.icon}</span>
                          <span className="text-xs font-medium text-[#1e3a5f]">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator at bottom */}
          <div className="pb-6 flex justify-center">
            <a href="#categories" className="flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors">
              <span className="text-[10px] uppercase tracking-widest">Explore</span>
              <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Announcement Strip */}
      {homepage.announcement.enabled && (
        <section className="bg-[#c8102e] py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-white text-center">
              <span className="font-semibold flex items-center gap-2">
                <span className="text-xl">{homepage.announcement.icon}</span> {homepage.announcement.text}
              </span>
              <Link href={homepage.announcement.buttonLink} className="bg-white text-[#c8102e] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#1e3a5f] hover:text-white transition-all duration-300">
                {homepage.announcement.buttonText}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Journals Banner */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="section-header text-center mb-10">
            <span className="text-[#c8102e] font-semibold text-sm uppercase tracking-wider">{homepage.featuredBanners.subtitle}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-3 mb-4">{homepage.featuredBanners.title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{homepage.featuredBanners.description}</p>
          </div>

          {/* Banner Slider */}
          <div className="relative overflow-hidden rounded-2xl shadow-lg max-h-[300px]">
            <div className="flex animate-scroll-banner">
              {duplicatedBanners.map((banner, i) => (
                <div key={i} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-1">
                  <Link href="/journals" className="block group">
                    <div className="relative overflow-hidden rounded-lg h-[280px]">
                      <Image
                        src={banner.src}
                        alt={banner.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-3 left-3 right-3">
                          <span className="inline-flex items-center gap-2 bg-white/90 text-[#1e3a5f] px-3 py-1.5 rounded-lg font-semibold text-sm">
                            Explore
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats Below Banner */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {(homepage.featuredBanners.stats || [
              { icon: "📚", value: "5", label: "Active Journals" },
              { icon: "📝", value: "100+", label: "Published Articles" },
              { icon: "🌍", value: "50+", label: "Countries Reached" },
              { icon: "⭐", value: "98%", label: "Author Satisfaction" }
            ]).map((stat, i) => (
              <div key={i} className="bg-gradient-to-br from-[#1e3a5f] to-[#152d4a] rounded-xl p-5 text-center text-white">
                <span className="text-2xl mb-2 block">{stat.icon}</span>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-blue-200 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journal Categories */}
      <section id="categories" className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="section-header text-center mb-10">
            <span className="text-[#c8102e] font-semibold text-sm uppercase tracking-wider">{homepage.categories.subtitle}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-2 mb-3">{homepage.categories.title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{homepage.categories.description}</p>
          </div>

          <div className="cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homepage.categories.items.map((category, i) => (
              <Link key={i} href={category.link} className="card-item group block">
                <div className={`relative bg-white rounded-2xl p-5 h-full border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  category.featured
                    ? 'border-[#c8102e]/30 shadow-md shadow-red-50'
                    : 'border-slate-200 hover:border-[#1e3a5f]/30'
                }`}>
                  {/* Featured Badge */}
                  {category.featured && (
                    <div className="absolute -top-3 left-6">
                      <span className="bg-[#c8102e] text-white text-xs px-4 py-1.5 rounded-full font-semibold shadow-lg">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Logo Image */}
                  <div className="relative w-16 h-16 mx-auto mb-4 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-[#1e3a5f] font-bold text-base mb-1 group-hover:text-[#c8102e] transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-3 line-clamp-2">{category.description}</p>

                    {/* Journal Short Name */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#1e3a5f]/5 text-[#1e3a5f]">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      {category.journals}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="cta-button text-center mt-8">
            <Link href={homepage.categories.viewAllLink} className="group inline-flex items-center gap-2 bg-[#1e3a5f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#c8102e] transition-all duration-300 shadow-md hover:shadow-lg">
              {homepage.categories.viewAllText}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Published Articles from OJS */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="section-header text-center mb-8">
            <span className="text-[#c8102e] font-semibold text-sm uppercase tracking-wider">{homepage.latestArticles.subtitle}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-3 mb-4">{homepage.latestArticles.title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{homepage.latestArticles.description}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <OJSArticles limit={homepage.latestArticles.limit} showJournalName={true} preview={true} />
          </div>

          <div className="text-center mt-10">
            <Link href={homepage.latestArticles.viewAllLink} className="group inline-flex items-center gap-2 bg-[#1e3a5f] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#c8102e] transition-all duration-300">
              {homepage.latestArticles.viewAllText}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Publish With Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={homepage.whyPublish.image}
                  alt="Scientific Research"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              {/* Stats Overlay */}
              <div className="absolute -bottom-6 -right-6 bg-[#1e3a5f] text-white p-6 rounded-2xl shadow-xl">
                <div className="text-4xl font-bold">{homepage.whyPublish.yearsExperience}</div>
                <div className="text-sm text-blue-200">Years of Excellence</div>
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="inline-block bg-[#c8102e]/10 text-[#c8102e] text-sm px-4 py-1.5 rounded-full font-semibold mb-4">
                {homepage.whyPublish.subtitle}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-6">
                {homepage.whyPublish.title}
              </h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                {homepage.whyPublish.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {homepage.whyPublish.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href={homepage.whyPublish.buttonLink}
                className="inline-flex items-center gap-2 bg-[#1e3a5f] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#c8102e] transition-colors"
              >
                {homepage.whyPublish.buttonText}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video Banner Section */}
      {homepage.videoBanner.enabled && (
        <section className="relative h-[500px] md:h-[600px] overflow-hidden">
          {/* Video Background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={homepage.videoBanner.posterImage}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={homepage.videoBanner.videoUrl} type="video/mp4" />
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/90 via-[#1e3a5f]/70 to-transparent"></div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full font-medium mb-6">
                  <span className="w-2 h-2 bg-[#c8102e] rounded-full animate-pulse"></span>
                  {homepage.videoBanner.badge}
                </span>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {homepage.videoBanner.title.line1}
                  <span className="block text-[#c8102e]">{homepage.videoBanner.title.line2}</span>
                </h2>

                <p className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed">
                  {homepage.videoBanner.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href={homepage.videoBanner.primaryButton.link}
                    className="inline-flex items-center gap-2 bg-[#c8102e] text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#1e3a5f] transition-all duration-300 shadow-lg"
                  >
                    {homepage.videoBanner.primaryButton.text}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <button
                    onClick={() => {
                      const video = document.querySelector('video');
                      if (video) {
                        video.muted = !video.muted;
                      }
                    }}
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                    Toggle Sound
                  </button>
                </div>

                {/* Stats Row */}
                <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20">
                  {homepage.videoBanner.stats.map((stat, i) => (
                    <div key={i}>
                      <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                      <div className="text-white/60 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>
      )}

      {/* Publication Steps - Interactive */}
      <PublicationJourney />

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-[#c8102e] to-[#a00d25]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="section-header">
                <span className="inline-block bg-white/20 text-white text-sm px-4 py-1.5 rounded-full font-medium mb-4">{homepage.servicesSection.subtitle}</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{homepage.servicesSection.title}</h2>
                <p className="text-white/80 mb-8 text-lg leading-relaxed">
                  {homepage.servicesSection.description}
                </p>
              </div>

              <div className="cards-container grid grid-cols-2 gap-4">
                {homepage.servicesSection.items.map((service, i) => (
                  <Link key={i} href={service.href} className="card-item group bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/20 hover:scale-[1.02] transition-all duration-300">
                    <div className="text-3xl mb-3">{service.icon}</div>
                    <h3 className="font-semibold text-white group-hover:text-white mb-1">{service.title}</h3>
                    <p className="text-sm text-white/70">{service.description}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center reveal-image">
              <div className="relative">
                <div className="relative w-80 h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={homepage.servicesSection.image}
                    alt="Academic Research & Publishing"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-sm font-medium opacity-80">Publishing Excellence</p>
                    <p className="text-xl font-bold">Your Research, Our Platform</p>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#c8102e] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">5</span>
                    </div>
                    <div>
                      <p className="text-[#1e3a5f] font-bold">Journals</p>
                      <p className="text-slate-500 text-sm">Peer-reviewed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="section-header flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="text-[#c8102e] font-semibold text-sm uppercase tracking-wider">{homepage.eventsSection.subtitle}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-2">{homepage.eventsSection.title}</h2>
            </div>
            <Link href={homepage.eventsSection.viewAllLink} className="inline-flex items-center gap-2 text-[#c8102e] font-semibold hover:gap-3 transition-all">
              {homepage.eventsSection.viewAllText}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="cards-container grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {conferences.slice(0, 4).map((event) => (
              <div key={event.id} className="card-item bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className={`h-2 ${
                  event.type === 'conference' ? 'bg-[#1e3a5f]' :
                  event.type === 'webinar' ? 'bg-[#c8102e]' : 'bg-blue-500'
                }`}></div>
                <div className="p-5">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 capitalize ${
                    event.type === 'conference' ? 'bg-[#1e3a5f]/10 text-[#1e3a5f]' :
                    event.type === 'webinar' ? 'bg-[#c8102e]/10 text-[#c8102e]' : 'bg-blue-100 text-blue-700'
                  }`}>{event.type}</span>
                  <h3 className="font-bold text-[#1e3a5f] mb-3 line-clamp-2 group-hover:text-[#c8102e] transition-colors">{event.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {event.location}
                  </div>
                  <button className="w-full py-2.5 rounded-xl font-semibold bg-[#1e3a5f] hover:bg-[#c8102e] text-white transition-colors text-sm">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Author Services */}
      <section className="py-20 bg-[#1e3a5f]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="section-header">
                <span className="inline-block bg-[#c8102e] text-white text-sm px-4 py-1.5 rounded-full font-medium mb-4">{homepage.authorServicesSection.subtitle}</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{homepage.authorServicesSection.title}</h2>
                <p className="text-white/70 mb-8 text-lg">
                  {homepage.authorServicesSection.description}
                </p>
              </div>

              <div className="service-list space-y-4 mb-8">
                {services.slice(0, 4).map((service) => (
                  <div key={service.id} className="service-item flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#c8102e] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="text-white/60 text-sm">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href={homepage.authorServicesSection.buttonLink} className="cta-button group inline-flex items-center gap-2 bg-[#c8102e] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#a00d25] transition-all duration-300 shadow-lg">
                {homepage.authorServicesSection.buttonText}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="cards-container hidden lg:grid grid-cols-2 gap-4">
              {services.slice(0, 4).map((service) => (
                <Link key={service.id} href={`/author-services/${service.slug}`} className="card-item group bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/20 hover:scale-[1.02] transition-all duration-300">
                  <h3 className="font-semibold text-white mb-2 group-hover:text-[#c8102e] transition-colors">{service.name}</h3>
                  <p className="text-white/60 text-sm line-clamp-2">{service.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="section-header text-center mb-14">
            <span className="text-[#c8102e] font-semibold text-sm uppercase tracking-wider">{homepage.whyChooseUs.subtitle}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-2 mb-3">{homepage.whyChooseUs.title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{homepage.whyChooseUs.description}</p>
          </div>

          <div className="cards-container grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {homepage.whyChooseUs.items.map((item, i) => (
              <div key={i} className="card-item bg-white rounded-2xl p-6 border border-slate-200 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1e3a5f] to-[#c8102e] rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl shadow-lg">
                  {item.icon}
                </div>
                <h3 className="font-bold text-[#1e3a5f] mb-2 text-lg">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-[#1e3a5f] via-[#1e3a5f] to-[#152d4a] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c8102e]/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px]"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="section-header">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{homepage.finalCta.title}</h2>
            <p className="text-white/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              {homepage.finalCta.description}
            </p>
          </div>
          <div className="cta-button flex flex-wrap justify-center gap-4">
            <Link href={homepage.finalCta.primaryButton.link} className="group inline-flex items-center gap-2 bg-[#c8102e] text-white px-10 py-4 rounded-xl font-semibold hover:bg-[#a00d25] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              {homepage.finalCta.primaryButton.text}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href={homepage.finalCta.secondaryButton.link} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-10 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#1e3a5f] transition-all duration-300">
              {homepage.finalCta.secondaryButton.text}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
