"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [shouldShow, setShouldShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if preloader was already shown in this session
    const hasSeenPreloader = sessionStorage.getItem("preloaderShown");

    if (hasSeenPreloader) {
      setIsVisible(false);
      setIsLoading(false);
      return;
    }

    setShouldShow(true);

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 80);

    // Show preloader for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("preloaderShown", "true");
      // After fade out animation, hide completely
      setTimeout(() => setIsVisible(false), 500);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  if (!isVisible || !shouldShow) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#1e3a5f] via-[#152d4a] to-[#0f1f33] transition-opacity duration-500 ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Floating Books Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-float opacity-20">
          <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v-2H6.5a.5.5 0 0 1 0-1H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13z"/>
          </svg>
        </div>
        <div className="absolute top-40 right-20 animate-float-delayed opacity-20">
          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float opacity-20">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
        <div className="absolute bottom-20 right-1/4 animate-float-delayed opacity-20">
          <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
          </svg>
        </div>
      </div>

      <div className="text-center relative z-10">
        {/* Open Book Animation */}
        <div className="mb-8 relative">
          <div className="w-24 h-20 mx-auto relative">
            {/* Book Base */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-3 bg-white/20 rounded-full blur-sm"></div>

            {/* Left Page */}
            <div
              className="absolute left-1/2 bottom-2 w-10 h-14 bg-white rounded-l-sm origin-right animate-page-left"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="p-1.5 space-y-1">
                <div className="h-0.5 bg-gray-300 rounded w-full"></div>
                <div className="h-0.5 bg-gray-300 rounded w-4/5"></div>
                <div className="h-0.5 bg-gray-300 rounded w-full"></div>
                <div className="h-0.5 bg-gray-300 rounded w-3/5"></div>
              </div>
            </div>

            {/* Right Page */}
            <div
              className="absolute right-1/2 bottom-2 w-10 h-14 bg-white rounded-r-sm origin-left animate-page-right"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="p-1.5 space-y-1">
                <div className="h-0.5 bg-gray-300 rounded w-full"></div>
                <div className="h-0.5 bg-gray-300 rounded w-4/5"></div>
                <div className="h-0.5 bg-gray-300 rounded w-full"></div>
                <div className="h-0.5 bg-gray-300 rounded w-3/5"></div>
              </div>
            </div>

            {/* Book Spine */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-1 h-14 bg-white/80"></div>
          </div>
        </div>

        {/* Logo/Brand */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
            Great Britain
          </h1>
          <p className="text-blue-200 text-xl tracking-[0.3em] uppercase font-light">
            Publishers
          </p>
        </div>

        {/* Tagline */}
        <p className="text-blue-300/70 text-sm mb-8 max-w-xs mx-auto">
          Advancing Knowledge Through Academic Excellence
        </p>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-white rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="mt-3 text-blue-200/60 text-xs tracking-widest uppercase">
            Loading Experience
          </p>
        </div>

        {/* Stats Preview */}
        <div className="mt-10 flex justify-center gap-8 text-center">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-2xl font-bold text-white">10+</div>
            <div className="text-xs text-blue-300/60 uppercase tracking-wider">Journals</div>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="text-2xl font-bold text-white">500+</div>
            <div className="text-xs text-blue-300/60 uppercase tracking-wider">Articles</div>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <div className="text-2xl font-bold text-white">50+</div>
            <div className="text-xs text-blue-300/60 uppercase tracking-wider">Countries</div>
          </div>
        </div>
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>

      {/* Corner Decorations */}
      <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-white/10"></div>
      <div className="absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 border-white/10"></div>
      <div className="absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 border-white/10"></div>
      <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-white/10"></div>
    </div>
  );
}
