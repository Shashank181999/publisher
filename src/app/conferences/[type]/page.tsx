"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { conferences } from "@/data/journals";

gsap.registerPlugin(ScrollTrigger);

// Consistent date formatting to avoid hydration errors
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function formatDateNoYear(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = months[date.getMonth()];
  return `${day} ${month}`;
}

// Consistent blue theme colors
const eventTypeInfo: Record<string, {
  title: string;
  titlePlural: string;
  description: string;
  color: string;
  lightColor: string;
  borderColor: string;
  textColor: string;
  hoverColor: string;
  icon: string;
  bgGradient: string;
}> = {
  conferences: {
    title: "Conference",
    titlePlural: "Conferences",
    description: "Multi-day international gatherings with keynotes, presentations, and networking opportunities",
    color: "bg-[#1e3a5f]",
    lightColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-[#1e3a5f]",
    hoverColor: "hover:bg-[#2a4a6f]",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    bgGradient: "from-[#1e3a5f]/95 via-[#1e3a5f]/90 to-[#2a4a6f]/85",
  },
  webinars: {
    title: "Webinar",
    titlePlural: "Webinars",
    description: "Online live sessions accessible from anywhere in the world with interactive Q&A",
    color: "bg-[#1e3a5f]",
    lightColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-[#1e3a5f]",
    hoverColor: "hover:bg-[#2a4a6f]",
    icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
    bgGradient: "from-[#1e3a5f]/95 via-[#1e3a5f]/90 to-[#2a4a6f]/85",
  },
  seminars: {
    title: "Seminar",
    titlePlural: "Seminars",
    description: "Focused academic discussions on specific topics with expert speakers and peer interaction",
    color: "bg-[#1e3a5f]",
    lightColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-[#1e3a5f]",
    hoverColor: "hover:bg-[#2a4a6f]",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    bgGradient: "from-[#1e3a5f]/95 via-[#1e3a5f]/90 to-[#2a4a6f]/85",
  },
  workshops: {
    title: "Workshop",
    titlePlural: "Workshops",
    description: "Hands-on training sessions with practical exercises and skill-building activities",
    color: "bg-[#1e3a5f]",
    lightColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-[#1e3a5f]",
    hoverColor: "hover:bg-[#2a4a6f]",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    bgGradient: "from-[#1e3a5f]/95 via-[#1e3a5f]/90 to-[#2a4a6f]/85",
  },
  upcoming: {
    title: "Upcoming Event",
    titlePlural: "Upcoming Events",
    description: "All upcoming conferences, seminars, webinars, and workshops",
    color: "bg-[#1e3a5f]",
    lightColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-[#1e3a5f]",
    hoverColor: "hover:bg-[#2a4a6f]",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    bgGradient: "from-[#1e3a5f]/95 via-[#1e3a5f]/90 to-[#2a4a6f]/85",
  },
};

// Map URL slugs to data types
const typeMapping: Record<string, string> = {
  conferences: 'conference',
  webinars: 'webinar',
  seminars: 'seminar',
  workshops: 'workshop',
  upcoming: 'all',
};

export default function EventTypePage() {
  const params = useParams();
  const type = params.type as string;
  const containerRef = useRef<HTMLDivElement>(null);

  const typeInfo = eventTypeInfo[type];
  const dataType = typeMapping[type];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-content",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(".event-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".events-grid", start: "top 85%" },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Filter events based on type
  const filteredEvents = dataType === 'all'
    ? conferences
    : conferences.filter(e => e.type === dataType);

  // If type not found, show 404-like message
  if (!typeInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Type Not Found</h1>
          <p className="text-gray-600 mb-8">The event type you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/conferences" className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition">
            View All Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80"
            alt={typeInfo.titlePlural}
            fill
            className="object-cover"
            priority
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${typeInfo.bgGradient}`}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/conferences" className="hover:text-white transition-colors">Conferences & Events</Link>
            <span>/</span>
            <span className="text-white font-medium">{typeInfo.titlePlural}</span>
          </nav>

          <div className="hero-content max-w-3xl">
            <div className={`w-20 h-20 ${typeInfo.color} rounded-2xl flex items-center justify-center mb-6`}>
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={typeInfo.icon} />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {typeInfo.titlePlural}
            </h1>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              {typeInfo.description}
            </p>
            <div className="flex items-center gap-4">
              <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
                {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Upcoming {typeInfo.titlePlural}
              </h2>
              <p className="text-gray-600 mt-2">Browse and register for our {typeInfo.titlePlural.toLowerCase()}</p>
            </div>
            <Link href="/conferences" className="inline-flex items-center gap-2 text-gray-600 font-medium hover:text-gray-900 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              View All Events
            </Link>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <div className={`w-20 h-20 ${typeInfo.lightColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                <svg className={`w-10 h-10 ${typeInfo.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={typeInfo.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No {typeInfo.titlePlural} Scheduled</h3>
              <p className="text-gray-600 mb-6">Check back soon for upcoming {typeInfo.titlePlural.toLowerCase()}.</p>
              <Link href="/conferences" className={`${typeInfo.color} text-white px-6 py-3 rounded-xl font-semibold ${typeInfo.hoverColor} transition`}>
                Browse All Events
              </Link>
            </div>
          ) : (
            <div className="events-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
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
                          {formatDate(event.date)}
                          {event.endDate && ` - ${formatDateNoYear(event.endDate)}`}
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
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Other Event Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Explore Other Event Types</h2>
            <p className="text-gray-600 mt-2">Discover more opportunities to learn and network</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(eventTypeInfo)
              .filter(([key]) => key !== type && key !== 'upcoming')
              .map(([key, info]) => (
                <Link key={key} href={`/conferences/${key}`} className="group">
                  <div className={`bg-gradient-to-br ${info.lightColor} to-white rounded-2xl p-6 border ${info.borderColor} hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                    <div className={`w-14 h-14 ${info.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={info.icon} />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{info.titlePlural}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{info.description}</p>
                    <span className={`${info.textColor} font-semibold text-sm flex items-center gap-1`}>
                      {conferences.filter(e => e.type === typeMapping[key]).length} Events
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-20 bg-gradient-to-br ${typeInfo.bgGradient} relative overflow-hidden`}>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to receive notifications about upcoming {typeInfo.titlePlural.toLowerCase()} and early bird registration offers.
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
