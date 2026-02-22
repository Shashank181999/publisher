"use client";

import { useState } from "react";
import Link from "next/link";

const journalSteps = [
  {
    number: 1,
    title: "Research your options",
    description: "Discover more about choosing the right journal",
    link: "/journals",
    icon: (
      <svg viewBox="0 0 80 80" className="w-16 h-16">
        <circle cx="35" cy="35" r="20" fill="none" stroke="#1e40af" strokeWidth="3"/>
        <line x1="50" y1="50" x2="65" y2="65" stroke="#1e40af" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="55" cy="70" r="8" fill="#93c5fd"/>
        <rect x="50" y="60" width="10" height="20" rx="2" fill="#3b82f6"/>
      </svg>
    )
  },
  {
    number: 2,
    title: "Draft your article",
    description: "Get advice on writing your paper",
    link: "/author-services",
    icon: (
      <svg viewBox="0 0 80 80" className="w-16 h-16">
        <rect x="20" y="15" width="40" height="50" rx="3" fill="#dbeafe" stroke="#1e40af" strokeWidth="2"/>
        <line x1="28" y1="28" x2="52" y2="28" stroke="#3b82f6" strokeWidth="2"/>
        <line x1="28" y1="36" x2="52" y2="36" stroke="#3b82f6" strokeWidth="2"/>
        <line x1="28" y1="44" x2="45" y2="44" stroke="#3b82f6" strokeWidth="2"/>
        <circle cx="60" cy="65" r="10" fill="#93c5fd"/>
        <rect x="55" y="55" width="10" height="20" rx="2" fill="#3b82f6"/>
      </svg>
    )
  },
  {
    number: 3,
    title: "Read the instructions for authors",
    description: "Learn how to use the instruction for authors",
    link: "/submissions",
    icon: (
      <svg viewBox="0 0 80 80" className="w-16 h-16">
        <rect x="25" y="10" width="35" height="45" rx="2" fill="#dbeafe" stroke="#1e40af" strokeWidth="2"/>
        <rect x="20" y="15" width="35" height="45" rx="2" fill="#eff6ff" stroke="#1e40af" strokeWidth="2"/>
        <line x1="28" y1="28" x2="48" y2="28" stroke="#3b82f6" strokeWidth="2"/>
        <line x1="28" y1="36" x2="48" y2="36" stroke="#3b82f6" strokeWidth="2"/>
        <line x1="28" y1="44" x2="40" y2="44" stroke="#3b82f6" strokeWidth="2"/>
        <circle cx="60" cy="60" r="10" fill="#93c5fd"/>
        <rect x="55" y="50" width="10" height="25" rx="2" fill="#3b82f6"/>
      </svg>
    )
  },
  {
    number: 4,
    title: "Make your submission",
    description: "Get prepared to submit your paper",
    link: "/submissions",
    icon: (
      <svg viewBox="0 0 80 80" className="w-16 h-16">
        <rect x="20" y="25" width="45" height="35" rx="3" fill="#dbeafe" stroke="#1e40af" strokeWidth="2"/>
        <polygon points="42,25 42,10 55,25" fill="#3b82f6"/>
        <line x1="28" y1="38" x2="55" y2="38" stroke="#3b82f6" strokeWidth="2"/>
        <line x1="28" y1="46" x2="50" y2="46" stroke="#3b82f6" strokeWidth="2"/>
        <circle cx="15" cy="45" r="10" fill="#93c5fd"/>
        <rect x="10" y="35" width="10" height="25" rx="2" fill="#3b82f6"/>
      </svg>
    )
  },
  {
    number: 5,
    title: "Peer review",
    description: "Read our comprehensive guide to peer review",
    link: "/about",
    icon: (
      <svg viewBox="0 0 80 80" className="w-16 h-16">
        <circle cx="40" cy="30" r="15" fill="#dbeafe" stroke="#1e40af" strokeWidth="2"/>
        <circle cx="40" cy="26" r="6" fill="#3b82f6"/>
        <ellipse cx="40" cy="50" rx="20" ry="10" fill="#93c5fd"/>
        <rect x="30" y="45" width="20" height="20" rx="2" fill="#3b82f6"/>
      </svg>
    )
  },
  {
    number: 6,
    title: "Making revisions",
    description: "Get guidance on revising and resubmitting",
    link: "/author-services",
    icon: (
      <svg viewBox="0 0 80 80" className="w-16 h-16">
        <rect x="20" y="20" width="35" height="40" rx="2" fill="#dbeafe" stroke="#1e40af" strokeWidth="2"/>
        <path d="M55 35 L65 35 L60 25 Z" fill="#3b82f6"/>
        <path d="M55 45 L65 45 L60 55 Z" fill="#3b82f6"/>
        <line x1="28" y1="32" x2="48" y2="32" stroke="#3b82f6" strokeWidth="2"/>
        <line x1="28" y1="40" x2="45" y2="40" stroke="#3b82f6" strokeWidth="2"/>
        <line x1="28" y1="48" x2="42" y2="48" stroke="#3b82f6" strokeWidth="2"/>
      </svg>
    )
  },
  {
    number: 7,
    title: "Your article is accepted",
    description: "Find out what happens when your article is in production",
    link: "/about",
    icon: (
      <svg viewBox="0 0 80 80" className="w-16 h-16">
        <circle cx="50" cy="25" r="15" fill="#dcfce7" stroke="#16a34a" strokeWidth="2"/>
        <path d="M43 25 L48 30 L58 20" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <rect x="25" y="40" width="30" height="25" rx="2" fill="#dbeafe" stroke="#1e40af" strokeWidth="2"/>
        <circle cx="20" cy="60" r="10" fill="#93c5fd"/>
        <rect x="15" y="50" width="10" height="25" rx="2" fill="#3b82f6"/>
      </svg>
    )
  },
  {
    number: 8,
    title: "Promoting your work",
    description: "Learn how to get the most from your published article",
    link: "/about",
    icon: (
      <svg viewBox="0 0 80 80" className="w-16 h-16">
        <circle cx="40" cy="35" r="20" fill="#dbeafe" stroke="#1e40af" strokeWidth="2"/>
        <path d="M35 30 L50 40 L35 50 Z" fill="#3b82f6"/>
        <rect x="55" y="50" width="15" height="20" rx="2" fill="#93c5fd"/>
        <circle cx="62" cy="45" r="8" fill="#3b82f6"/>
      </svg>
    )
  }
];

const bookSteps = [
  {
    number: 1,
    title: "Develop your idea",
    description: "Plan your book concept and outline",
    link: "/books",
    icon: (
      <svg viewBox="0 0 80 80" className="w-16 h-16">
        <circle cx="40" cy="40" r="25" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
        <path d="M40 25 L40 40 L50 50" stroke="#d97706" strokeWidth="3" fill="none" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    number: 2,
    title: "Submit proposal",
    description: "Send your book proposal for review",
    link: "/books/submit-proposal",
    icon: (
      <svg viewBox="0 0 80 80" className="w-16 h-16">
        <rect x="20" y="15" width="40" height="50" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
        <line x1="28" y1="28" x2="52" y2="28" stroke="#d97706" strokeWidth="2"/>
        <line x1="28" y1="36" x2="52" y2="36" stroke="#d97706" strokeWidth="2"/>
      </svg>
    )
  },
  {
    number: 3,
    title: "Contract & writing",
    description: "Sign agreement and write your manuscript",
    link: "/books",
    icon: (
      <svg viewBox="0 0 80 80" className="w-16 h-16">
        <rect x="15" y="20" width="30" height="40" rx="2" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
        <path d="M50 35 L70 35 L70 60 L50 60" fill="none" stroke="#d97706" strokeWidth="2"/>
      </svg>
    )
  },
  {
    number: 4,
    title: "Publication",
    description: "Your book is published and distributed",
    link: "/books",
    icon: (
      <svg viewBox="0 0 80 80" className="w-16 h-16">
        <rect x="15" y="20" width="25" height="40" rx="2" fill="#d97706"/>
        <rect x="25" y="20" width="25" height="40" rx="2" fill="#fbbf24"/>
        <rect x="35" y="20" width="25" height="40" rx="2" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
      </svg>
    )
  }
];

export default function PublicationSteps() {
  const [activeTab, setActiveTab] = useState<'journal' | 'book'>('journal');
  const steps = activeTab === 'journal' ? journalSteps : bookSteps;

  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Steps to <span className="text-blue-600">{activeTab === 'journal' ? 'Journal' : 'Book'}</span> publication
            </h2>
            <div className="w-24 h-1 bg-blue-600 mt-4"></div>
          </div>

          {/* Tab Buttons */}
          <div className="flex gap-2 mt-6 md:mt-0">
            <button
              onClick={() => setActiveTab('journal')}
              className={`px-6 py-2.5 rounded-full font-medium transition ${
                activeTab === 'journal'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              Journal
            </button>
            <button
              onClick={() => setActiveTab('book')}
              className={`px-6 py-2.5 rounded-full font-medium transition ${
                activeTab === 'book'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              Book
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Dotted Path SVG - Desktop only */}
          {activeTab === 'journal' && (
            <svg className="absolute inset-0 w-full h-full hidden lg:block pointer-events-none" style={{ zIndex: 0 }}>
              <path
                d="M 200,80 Q 350,80 400,150 Q 450,220 600,220 Q 750,220 800,150 Q 850,80 1000,80
                   Q 1100,80 1100,180 Q 1100,280 950,280 Q 800,280 750,350 Q 700,420 550,420
                   Q 400,420 350,350 Q 300,280 200,320"
                fill="none"
                stroke="#93c5fd"
                strokeWidth="3"
                strokeDasharray="8,8"
                strokeLinecap="round"
              />
            </svg>
          )}

          {/* Steps */}
          <div className={`grid gap-8 relative z-10 ${
            activeTab === 'journal'
              ? 'md:grid-cols-3 lg:grid-cols-3'
              : 'md:grid-cols-2 lg:grid-cols-4'
          }`}>
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex items-start gap-4 ${
                  activeTab === 'journal' && index >= 3 && index < 6 ? 'lg:flex-row-reverse lg:text-right' : ''
                }`}
              >
                {/* Step Number */}
                <div className="flex-shrink-0 relative">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Icon */}
                  <div className="mb-3">
                    {step.icon}
                  </div>

                  {/* Title with help icon */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2 flex-wrap">
                    {step.title}
                    <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs cursor-help">
                      ?
                    </span>
                  </h3>

                  {/* Link */}
                  <Link
                    href={step.link}
                    className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
                  >
                    {step.description}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
