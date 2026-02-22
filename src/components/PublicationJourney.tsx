"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const journalSteps = [
  { num: 1, title: "Research Options", desc: "Choose the right journal for your research", href: "/journals", icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" },
  { num: 2, title: "Draft Article", desc: "Write and prepare your manuscript", href: "/author-services", icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" },
  { num: 3, title: "Guidelines", desc: "Follow author instructions carefully", href: "/author-services/guidelines", icon: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" },
  { num: 4, title: "Submit", desc: "Upload your paper for review", href: "/submissions", icon: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" },
  { num: 5, title: "Peer Review", desc: "Expert evaluation of your work", href: "/about#peer-review", icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0z" },
  { num: 6, title: "Revisions", desc: "Address reviewer feedback", href: "/author-services/revision", icon: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" },
  { num: 7, title: "Accepted", desc: "Article enters production", href: "/author-services/production", icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { num: 8, title: "Published", desc: "Share your research globally", href: "/author-services/promotion", icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" },
];

const bookSteps = [
  { num: 1, title: "Develop Idea", desc: "Plan your book proposal", href: "/books", icon: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" },
  { num: 2, title: "Submit Proposal", desc: "Send for editorial review", href: "/books/submit", icon: "M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" },
  { num: 3, title: "Review", desc: "Expert evaluation process", href: "/books/review", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" },
  { num: 4, title: "Contract", desc: "Sign publishing agreement", href: "/books/contract", icon: "M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" },
  { num: 5, title: "Write Book", desc: "Complete your manuscript", href: "/author-services", icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" },
  { num: 6, title: "Editorial", desc: "Professional editing", href: "/author-services/editing", icon: "M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" },
  { num: 7, title: "Production", desc: "Design and typesetting", href: "/books/production", icon: "M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" },
  { num: 8, title: "Published", desc: "Launch your book", href: "/books/marketing", icon: "M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" },
];

export default function PublicationJourney() {
  const [activeType, setActiveType] = useState<"journal" | "book">("journal");
  const [activeStep, setActiveStep] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = activeType === "journal" ? journalSteps : bookSteps;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".journey-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".journey-header", start: "top 90%" },
        }
      );

      gsap.fromTo(".timeline-container",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".timeline-container", start: "top 88%" },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Auto-advance steps
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= 8 ? 1 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="journey-header text-center mb-16">
          <span className="text-[#c8102e] font-semibold text-sm uppercase tracking-wider">Your Path to Success</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1e3a5f] mt-3 mb-6">
            Publication Journey
          </h2>

          {/* Toggle */}
          <div className="inline-flex bg-slate-100 rounded-full p-1.5">
            <button
              onClick={() => { setActiveType("journal"); setActiveStep(1); }}
              className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeType === "journal"
                  ? "bg-[#1e3a5f] text-white shadow-lg"
                  : "text-slate-600 hover:text-[#1e3a5f]"
              }`}
            >
              Journal Article
            </button>
            <button
              onClick={() => { setActiveType("book"); setActiveStep(1); }}
              className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeType === "book"
                  ? "bg-[#1e3a5f] text-white shadow-lg"
                  : "text-slate-600 hover:text-[#1e3a5f]"
              }`}
            >
              Book
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline-container">
          {/* Progress Bar */}
          <div className="relative mb-12">
            <div className="hidden md:block absolute top-6 left-0 right-0 h-1 bg-slate-200 rounded-full mx-12"></div>
            <div
              className="hidden md:block absolute top-6 left-0 h-1 bg-gradient-to-r from-[#1e3a5f] to-[#c8102e] rounded-full mx-12 transition-all duration-500"
              style={{ width: `calc(${((activeStep - 1) / 7) * 100}% - 6rem)` }}
            ></div>

            {/* Step Indicators */}
            <div className="flex justify-between relative">
              {steps.map((step) => (
                <button
                  key={step.num}
                  onClick={() => setActiveStep(step.num)}
                  className="flex flex-col items-center group z-10"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      step.num === activeStep
                        ? "bg-gradient-to-br from-[#c8102e] to-[#a00d25] text-white scale-125 shadow-xl shadow-red-200"
                        : step.num < activeStep
                          ? "bg-[#1e3a5f] text-white"
                          : "bg-white text-slate-400 border-2 border-slate-200 group-hover:border-[#1e3a5f] group-hover:text-[#1e3a5f]"
                    }`}
                  >
                    {step.num < activeStep ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.num
                    )}
                  </div>
                  <span className={`mt-3 text-xs font-medium transition-colors hidden md:block ${
                    step.num === activeStep ? "text-[#c8102e]" : "text-slate-500"
                  }`}>
                    {step.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Content */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#1e3a5f]/5 to-[#c8102e]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              {/* Left - Info */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1e3a5f] to-[#c8102e] rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={steps[activeStep - 1].icon} />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[#c8102e] text-sm font-semibold">Step {activeStep} of 8</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#1e3a5f]">{steps[activeStep - 1].title}</h3>
                  </div>
                </div>

                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                  {steps[activeStep - 1].desc}
                </p>

                <Link
                  href={steps[activeStep - 1].href}
                  className="inline-flex items-center gap-2 bg-[#1e3a5f] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#c8102e] transition-all duration-300 group"
                >
                  Learn More
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Right - Visual */}
              <div className="hidden md:flex justify-center">
                <div className="relative">
                  {/* Animated rings */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-[#1e3a5f]/10 rounded-full animate-ping"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 border border-[#c8102e]/10 rounded-full"></div>
                  </div>

                  {/* Center icon */}
                  <div className="relative w-40 h-40 bg-gradient-to-br from-slate-50 to-white rounded-full flex items-center justify-center shadow-2xl border border-slate-100">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#1e3a5f] to-[#c8102e] rounded-2xl flex items-center justify-center rotate-3 shadow-xl">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={steps[activeStep - 1].icon} />
                      </svg>
                    </div>
                  </div>

                  {/* Step number */}
                  <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-[#c8102e] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {activeStep}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={() => setActiveStep((prev) => (prev <= 1 ? 8 : prev - 1))}
                className="flex items-center gap-2 text-slate-500 hover:text-[#1e3a5f] transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              <button
                onClick={() => setActiveStep((prev) => (prev >= 8 ? 1 : prev + 1))}
                className="flex items-center gap-2 text-slate-500 hover:text-[#1e3a5f] transition-colors font-medium"
              >
                Next
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              href="/submissions"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#c8102e] to-[#a00d25] text-white px-10 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Start Your Journey Today
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
