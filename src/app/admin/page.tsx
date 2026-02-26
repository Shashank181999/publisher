'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';

interface DashboardStats {
  journals: number;
  articles: number;
  services: number;
  conferences: number;
  media: number;
}

const quickLinks = [
  { label: 'Edit Hero Section', href: '/admin/hero', icon: 'image', color: 'bg-blue-500' },
  { label: 'Manage Journals', href: '/admin/journals', icon: 'book', color: 'bg-purple-500' },
  { label: 'Add Conference', href: '/admin/conferences', icon: 'calendar', color: 'bg-green-500' },
  { label: 'Upload Media', href: '/admin/media', icon: 'photo', color: 'bg-orange-500' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    journals: 0,
    articles: 0,
    services: 0,
    conferences: 0,
    media: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const sections = ['journals', 'articles', 'services', 'conferences', 'media'];
      const results = await Promise.all(
        sections.map((section) =>
          fetch(`/api/admin/content/${section}`).then((res) => res.json())
        )
      );

      setStats({
        journals: results[0].data?.items?.length || 0,
        articles: results[1].data?.items?.length || 0,
        services: results[2].data?.items?.length || 0,
        conferences: results[3].data?.items?.length || 0,
        media: results[4].data?.items?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    { label: 'Journals', value: stats.journals, href: '/admin/journals', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Articles', value: stats.articles, href: '/admin/articles', color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Services', value: stats.services, href: '/admin/services', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Conferences', value: stats.conferences, href: '/admin/conferences', color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Media Files', value: stats.media, href: '/admin/media', color: 'text-pink-600', bg: 'bg-pink-50' },
  ];

  return (
    <div>
      <AdminHeader
        title="Dashboard"
        subtitle="Welcome to the Great Britain Publishers CMS"
      />

      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {statCards.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className={`${stat.bg} rounded-xl p-5 hover:shadow-lg transition-shadow`}
            >
              <p className="text-slate-600 text-sm mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>
                {isLoading ? '-' : stat.value}
              </p>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-[#1e3a5f] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-[#1e3a5f]/30 hover:shadow-md transition-all"
                >
                  <div className={`w-10 h-10 ${link.color} rounded-lg flex items-center justify-center text-white`}>
                    {link.icon === 'image' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                    {link.icon === 'book' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    )}
                    {link.icon === 'calendar' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                    {link.icon === 'photo' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Content Sections */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-[#1e3a5f] mb-4">Content Sections</h2>
            <div className="space-y-2">
              {[
                { label: 'Hero Section', href: '/admin/hero', desc: 'Homepage banner and CTA' },
                { label: 'About Page', href: '/admin/about', desc: 'Company information' },
                { label: 'Contact Info', href: '/admin/contact', desc: 'Address, phone, social' },
                { label: 'Footer', href: '/admin/footer', desc: 'Footer links and text' },
                { label: 'Books', href: '/admin/books', desc: 'Book publishing services' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <div>
                    <p className="font-medium text-slate-800 group-hover:text-[#1e3a5f]">{item.label}</p>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-[#1e3a5f] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-gradient-to-r from-[#1e3a5f] to-[#2a4a6f] rounded-xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold mb-2">Need Help?</h2>
              <p className="text-blue-200 text-sm max-w-lg">
                Use the sidebar to navigate between different sections. All changes are saved automatically when you click the Save button.
              </p>
            </div>
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
