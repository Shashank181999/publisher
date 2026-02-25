"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { conferences } from "@/data/journals";

gsap.registerPlugin(ScrollTrigger);

type EventType = 'all' | 'conference' | 'webinar' | 'seminar' | 'workshop';

// Consistent date formatting to avoid hydration errors
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function formatDate(dateStr: string, format: 'short' | 'long' = 'short'): string {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = format === 'long' ? monthsFull[date.getMonth()] : months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function formatDateNoYear(dateStr: string, format: 'short' | 'long' = 'short'): string {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = format === 'long' ? monthsFull[date.getMonth()] : months[date.getMonth()];
  return `${day} ${month}`;
}

// Consistent theme colors - blue primary
const eventTypeInfo = {
  conference: {
    color: "bg-[#1e3a5f]",
    lightColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-[#1e3a5f]",
    hoverColor: "hover:bg-[#2a4a6f]",
  },
  webinar: {
    color: "bg-[#1e3a5f]",
    lightColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-[#1e3a5f]",
    hoverColor: "hover:bg-[#2a4a6f]",
  },
  seminar: {
    color: "bg-[#1e3a5f]",
    lightColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-[#1e3a5f]",
    hoverColor: "hover:bg-[#2a4a6f]",
  },
  workshop: {
    color: "bg-[#1e3a5f]",
    lightColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-[#1e3a5f]",
    hoverColor: "hover:bg-[#2a4a6f]",
  },
};

export default function ConferencesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<EventType>('all');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-content",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(".stat-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".stats-grid", start: "top 90%" },
        }
      );

      gsap.fromTo(".event-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".events-grid", start: "top 85%" },
        }
      );

      gsap.fromTo(".type-card",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".types-grid", start: "top 85%" },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleFilterClick = (type: EventType) => {
    setActiveFilter(type);
    // Scroll to events section
    document.getElementById('upcoming')?.scrollIntoView({ behavior: 'smooth' });
  };

  const featuredEvent = conferences.find(e => e.type === 'conference');
  const filteredEvents = activeFilter === 'all'
    ? conferences.filter(e => e.id !== featuredEvent?.id)
    : conferences.filter(e => e.type === activeFilter);

  return (
    <div ref={containerRef} className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80"
            alt="Conference"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/95 via-[#1e3a5f]/90 to-[#2a4a6f]/85"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Conferences & Events</span>
          </nav>

          <div className="hero-content grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-white/10 text-blue-200 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-white/20">
                Join Our Global Community
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Conferences &<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">Events</span>
              </h1>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Join leading researchers, clinicians, and practitioners at our scientific conferences,
                seminars, webinars, and workshops. Network, learn, and share your expertise with a global audience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#upcoming"
                  className="bg-white text-[#1e3a5f] px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  View Upcoming Events
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all"
                >
                  Propose an Event
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="stats-grid grid grid-cols-2 gap-4">
                {[
                  { value: "10+", label: "Events Annually", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
                  { value: "500+", label: "Participants", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
                  { value: "20+", label: "Countries", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                  { value: "50+", label: "Expert Speakers", icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" },
                ].map((stat, i) => (
                  <div key={i} className="stat-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                    <svg className="w-8 h-8 text-blue-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                    </svg>
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-blue-200 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-100 text-[#1e3a5f] font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">Event Types</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Browse by Category</h2>
          </div>

          <div className="types-grid grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* All Events */}
            <button onClick={() => handleFilterClick('all')} className="type-card group text-left">
              <div className={`bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border ${activeFilter === 'all' ? 'border-[#1e3a5f] ring-2 ring-[#1e3a5f]' : 'border-blue-200'} hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                <div className="w-16 h-16 bg-[#1e3a5f] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-2">All Events</h3>
                <p className="text-gray-600 text-sm mb-4">View all upcoming events across all categories</p>
                <span className="text-[#1e3a5f] font-semibold text-sm flex items-center gap-1">
                  {conferences.length} Events
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </button>

            {/* Conferences */}
            <button onClick={() => handleFilterClick('conference')} className="type-card group text-left">
              <div className={`bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border ${activeFilter === 'conference' ? 'border-[#1e3a5f] ring-2 ring-[#1e3a5f]' : 'border-blue-200'} hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                <div className="w-16 h-16 bg-[#1e3a5f] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-2">Conferences</h3>
                <p className="text-gray-600 text-sm mb-4">Multi-day international gatherings</p>
                <span className="text-[#1e3a5f] font-semibold text-sm flex items-center gap-1">
                  {conferences.filter(e => e.type === 'conference').length} Events
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </button>

            {/* Webinars */}
            <button onClick={() => handleFilterClick('webinar')} className="type-card group text-left">
              <div className={`bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border ${activeFilter === 'webinar' ? 'border-[#1e3a5f] ring-2 ring-[#1e3a5f]' : 'border-blue-200'} hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                <div className="w-16 h-16 bg-[#1e3a5f] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-2">Webinars</h3>
                <p className="text-gray-600 text-sm mb-4">Online live sessions worldwide</p>
                <span className="text-[#1e3a5f] font-semibold text-sm flex items-center gap-1">
                  {conferences.filter(e => e.type === 'webinar').length} Events
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </button>

            {/* Seminars */}
            <button onClick={() => handleFilterClick('seminar')} className="type-card group text-left">
              <div className={`bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border ${activeFilter === 'seminar' ? 'border-[#1e3a5f] ring-2 ring-[#1e3a5f]' : 'border-blue-200'} hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                <div className="w-16 h-16 bg-[#1e3a5f] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-2">Seminars</h3>
                <p className="text-gray-600 text-sm mb-4">Focused academic discussions</p>
                <span className="text-[#1e3a5f] font-semibold text-sm flex items-center gap-1">
                  {conferences.filter(e => e.type === 'seminar').length} Events
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </button>

            {/* Workshops */}
            <button onClick={() => handleFilterClick('workshop')} className="type-card group text-left">
              <div className={`bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border ${activeFilter === 'workshop' ? 'border-[#1e3a5f] ring-2 ring-[#1e3a5f]' : 'border-blue-200'} hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                <div className="w-16 h-16 bg-[#1e3a5f] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-2">Workshops</h3>
                <p className="text-gray-600 text-sm mb-4">Hands-on training sessions</p>
                <span className="text-[#1e3a5f] font-semibold text-sm flex items-center gap-1">
                  {conferences.filter(e => e.type === 'workshop').length} Events
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Event */}
      {featuredEvent && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block bg-blue-100 text-[#1e3a5f] font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">Featured</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Flagship Conference</h2>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <div className="grid lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={featuredEvent.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"}
                    alt={featuredEvent.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#1e3a5f] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Flagship Event
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-blue-100 text-[#1e3a5f] px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {featuredEvent.type}
                    </span>
                    {featuredEvent.isVirtual && (
                      <span className="bg-blue-100 text-[#1e3a5f] px-3 py-1 rounded-full text-sm font-medium">
                        Virtual Option Available
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{featuredEvent.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{featuredEvent.description}</p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Date</div>
                        <div className="font-semibold">
                          {formatDate(featuredEvent.date, 'long')}
                          {featuredEvent.endDate && ` - ${formatDateNoYear(featuredEvent.endDate, 'long')}`}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Location</div>
                        <div className="font-semibold">{featuredEvent.location}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button className="bg-[#1e3a5f] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#2a4a6f] transition-all shadow-lg hover:shadow-xl">
                      Register Now
                    </button>
                    <button className="border-2 border-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:border-[#1e3a5f] hover:text-[#1e3a5f] transition-all">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events Grid */}
      <section id="upcoming" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="inline-block bg-blue-100 text-[#1e3a5f] font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
                {activeFilter === 'all' ? 'All Events' : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}s`}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {activeFilter === 'all' ? 'All Upcoming Events' : `Upcoming ${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}s`}
              </h2>
              <p className="text-gray-600 mt-2">
                {activeFilter === 'all'
                  ? "Don't miss our upcoming conferences, seminars, webinars, and workshops"
                  : `Browse all our upcoming ${activeFilter}s`}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {activeFilter !== 'all' && (
                <button
                  onClick={() => setActiveFilter('all')}
                  className="inline-flex items-center gap-2 text-gray-600 font-medium hover:text-gray-900 transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear Filter
                </button>
              )}
              <Link href="/contact" className="inline-flex items-center gap-2 text-[#1e3a5f] font-semibold hover:text-[#2a4a6f] transition">
                Propose an Event
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="events-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => {
              const typeInfo = eventTypeInfo[event.type as keyof typeof eventTypeInfo];
              return (
                <div
                  key={event.id}
                  className="event-card group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden hover:-translate-y-1"
                >
                  <div className="relative h-48">
                    <Image
                      src={event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`${typeInfo.color} text-white px-3 py-1 rounded-full text-xs font-semibold capitalize shadow-lg`}>
                        {event.type}
                      </span>
                      {event.isVirtual && (
                        <span className="bg-white/90 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                          Virtual
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-white font-bold text-lg line-clamp-2 drop-shadow-lg">
                        {event.title}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm">
                        <div className={`w-8 h-8 ${typeInfo.lightColor} rounded-lg flex items-center justify-center`}>
                          <svg className={`w-4 h-4 ${typeInfo.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-medium">
                          {formatDate(event.date, 'short')}
                          {event.endDate && ` - ${formatDateNoYear(event.endDate, 'short')}`}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className={`w-8 h-8 ${typeInfo.lightColor} rounded-lg flex items-center justify-center`}>
                          <svg className={`w-4 h-4 ${typeInfo.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-medium">{event.location}</span>
                      </div>
                    </div>

                    <button className={`w-full ${typeInfo.color} ${typeInfo.hoverColor} text-white py-3 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md`}>
                      Register Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Attend */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-100 text-[#1e3a5f] font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">Benefits</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Attend Our Events</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Expert Speakers", desc: "Learn from leading researchers and practitioners in your field", icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" },
              { title: "Networking", desc: "Connect with peers and build valuable professional relationships", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
              { title: "CME Credits", desc: "Earn continuing education credits for professional development", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
              { title: "Publication", desc: "Opportunity to publish your research in conference proceedings", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-blue-100 text-[#1e3a5f] font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">Recognition</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Awards & Recognition</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We recognize outstanding contributions to research and practice through our prestigious awards program.
                Present your work for a chance to receive recognition from your peers.
              </p>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#1e3a5f] rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Best Paper Award</h4>
                      <p className="text-gray-600 text-sm">Recognizing exceptional research presentations</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#1e3a5f] rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Young Researcher Award</h4>
                      <p className="text-gray-600 text-sm">Supporting early-career researchers</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#1e3a5f] rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Excellence in Practice Award</h4>
                      <p className="text-gray-600 text-sm">Honoring outstanding practitioners</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80"
                alt="Awards ceremony"
                width={600}
                height={500}
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">50+</div>
                    <div className="text-gray-600 text-sm">Awards Given</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#1e3a5f] via-[#1e3a5f] to-[#2a4a6f] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to receive notifications about upcoming events and early bird registration offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 w-full sm:w-auto px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-white/60 border-b-2 border-white/30 focus:border-white focus:outline-none transition-all"
            />
            <button className="bg-white text-[#1e3a5f] px-10 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
