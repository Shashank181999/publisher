'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import FormField from '@/components/admin/FormField';
import ImageInput from '@/components/admin/ImageInput';
import type { HomepageContent } from '@/types/cms';

type SectionKey = 'announcement' | 'featuredBanners' | 'categories' | 'latestArticles' | 'whyPublish' | 'videoBanner' | 'servicesSection' | 'eventsSection' | 'authorServicesSection' | 'whyChooseUs' | 'finalCta';

const sections: { key: SectionKey; label: string }[] = [
  { key: 'announcement', label: 'Announcement Strip' },
  { key: 'featuredBanners', label: 'Featured Banners' },
  { key: 'categories', label: 'Journal Categories' },
  { key: 'latestArticles', label: 'Latest Articles' },
  { key: 'whyPublish', label: 'Why Publish With Us' },
  { key: 'videoBanner', label: 'Video Banner' },
  { key: 'servicesSection', label: 'Services Section' },
  { key: 'eventsSection', label: 'Events Section' },
  { key: 'authorServicesSection', label: 'Author Services' },
  { key: 'whyChooseUs', label: 'Why Choose Us' },
  { key: 'finalCta', label: 'Final CTA' },
];

export default function HomepagePage() {
  const [homepage, setHomepage] = useState<HomepageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeSection, setActiveSection] = useState<SectionKey>('announcement');

  useEffect(() => {
    fetchHomepage();
  }, []);

  const fetchHomepage = async () => {
    try {
      const res = await fetch('/api/admin/content/homepage');
      const data = await res.json();
      if (data.success) {
        setHomepage(data.data);
      }
    } catch (error) {
      console.error('Error fetching homepage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!homepage) return;
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/content/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(homepage),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Homepage saved successfully!' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save' });
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !homepage) {
    return (
      <div>
        <AdminHeader title="Homepage Sections" subtitle="Loading..." />
        <div className="p-6 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e3a5f]"></div>
        </div>
      </div>
    );
  }

  const renderAnnouncementSection = () => (
    <div className="space-y-4">
      <FormField
        label=""
        name="announcementEnabled"
        type="checkbox"
        value={homepage.announcement.enabled}
        onChange={(val) => setHomepage({ ...homepage, announcement: { ...homepage.announcement, enabled: val as boolean } })}
        placeholder="Show announcement strip"
      />
      <div className="grid md:grid-cols-2 gap-4">
        <FormField label="Icon (emoji)" name="icon" value={homepage.announcement.icon} onChange={(val) => setHomepage({ ...homepage, announcement: { ...homepage.announcement, icon: val as string } })} />
        <FormField label="Text" name="text" value={homepage.announcement.text} onChange={(val) => setHomepage({ ...homepage, announcement: { ...homepage.announcement, text: val as string } })} />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <FormField label="Button Text" name="buttonText" value={homepage.announcement.buttonText} onChange={(val) => setHomepage({ ...homepage, announcement: { ...homepage.announcement, buttonText: val as string } })} />
        <FormField label="Button Link" name="buttonLink" value={homepage.announcement.buttonLink} onChange={(val) => setHomepage({ ...homepage, announcement: { ...homepage.announcement, buttonLink: val as string } })} />
      </div>
    </div>
  );

  const renderFeaturedBannersSection = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <FormField label="Section Title" name="title" value={homepage.featuredBanners.title} onChange={(val) => setHomepage({ ...homepage, featuredBanners: { ...homepage.featuredBanners, title: val as string } })} />
        <FormField label="Subtitle" name="subtitle" value={homepage.featuredBanners.subtitle} onChange={(val) => setHomepage({ ...homepage, featuredBanners: { ...homepage.featuredBanners, subtitle: val as string } })} />
        <FormField label="Description" name="description" value={homepage.featuredBanners.description} onChange={(val) => setHomepage({ ...homepage, featuredBanners: { ...homepage.featuredBanners, description: val as string } })} />
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-slate-700">Banners</h4>
          <button
            onClick={() => setHomepage({ ...homepage, featuredBanners: { ...homepage.featuredBanners, banners: [...homepage.featuredBanners.banners, { src: '', name: '' }] } })}
            className="text-sm text-[#1e3a5f] hover:text-[#c8102e] font-medium"
          >+ Add Banner</button>
        </div>
        {homepage.featuredBanners.banners.map((banner, i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-lg mb-3">
            <div className="flex items-center justify-between mb-3">
              <input type="text" value={banner.name} onChange={(e) => {
                const newBanners = [...homepage.featuredBanners.banners];
                newBanners[i] = { ...newBanners[i], name: e.target.value };
                setHomepage({ ...homepage, featuredBanners: { ...homepage.featuredBanners, banners: newBanners } });
              }} placeholder="Banner Name" className="flex-1 px-3 py-2 border border-slate-300 rounded-lg mr-3" />
              <button onClick={() => {
                const newBanners = homepage.featuredBanners.banners.filter((_, idx) => idx !== i);
                setHomepage({ ...homepage, featuredBanners: { ...homepage.featuredBanners, banners: newBanners } });
              }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
            <ImageInput
              label="Banner Image"
              value={banner.src}
              onChange={(url) => {
                const newBanners = [...homepage.featuredBanners.banners];
                newBanners[i] = { ...newBanners[i], src: url };
                setHomepage({ ...homepage, featuredBanners: { ...homepage.featuredBanners, banners: newBanners } });
              }}
            />
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-slate-700">Stats</h4>
          <button
            onClick={() => setHomepage({ ...homepage, featuredBanners: { ...homepage.featuredBanners, stats: [...homepage.featuredBanners.stats, { icon: '', value: '', label: '' }] } })}
            className="text-sm text-[#1e3a5f] hover:text-[#c8102e] font-medium"
          >+ Add Stat</button>
        </div>
        {homepage.featuredBanners.stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-3 mb-2">
            <input type="text" value={stat.icon} onChange={(e) => {
              const newStats = [...homepage.featuredBanners.stats];
              newStats[i] = { ...newStats[i], icon: e.target.value };
              setHomepage({ ...homepage, featuredBanners: { ...homepage.featuredBanners, stats: newStats } });
            }} placeholder="Icon (emoji)" className="w-20 px-3 py-2 border border-slate-300 rounded-lg" />
            <input type="text" value={stat.value} onChange={(e) => {
              const newStats = [...homepage.featuredBanners.stats];
              newStats[i] = { ...newStats[i], value: e.target.value };
              setHomepage({ ...homepage, featuredBanners: { ...homepage.featuredBanners, stats: newStats } });
            }} placeholder="Value" className="flex-1 px-3 py-2 border border-slate-300 rounded-lg" />
            <input type="text" value={stat.label} onChange={(e) => {
              const newStats = [...homepage.featuredBanners.stats];
              newStats[i] = { ...newStats[i], label: e.target.value };
              setHomepage({ ...homepage, featuredBanners: { ...homepage.featuredBanners, stats: newStats } });
            }} placeholder="Label" className="flex-1 px-3 py-2 border border-slate-300 rounded-lg" />
            <button onClick={() => {
              const newStats = homepage.featuredBanners.stats.filter((_, idx) => idx !== i);
              setHomepage({ ...homepage, featuredBanners: { ...homepage.featuredBanners, stats: newStats } });
            }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCategoriesSection = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <FormField label="Section Title" name="title" value={homepage.categories.title} onChange={(val) => setHomepage({ ...homepage, categories: { ...homepage.categories, title: val as string } })} />
        <FormField label="Subtitle" name="subtitle" value={homepage.categories.subtitle} onChange={(val) => setHomepage({ ...homepage, categories: { ...homepage.categories, subtitle: val as string } })} />
        <FormField label="Description" name="description" value={homepage.categories.description} onChange={(val) => setHomepage({ ...homepage, categories: { ...homepage.categories, description: val as string } })} />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <FormField label="View All Button Text" name="viewAllText" value={homepage.categories.viewAllText} onChange={(val) => setHomepage({ ...homepage, categories: { ...homepage.categories, viewAllText: val as string } })} />
        <FormField label="View All Button Link" name="viewAllLink" value={homepage.categories.viewAllLink} onChange={(val) => setHomepage({ ...homepage, categories: { ...homepage.categories, viewAllLink: val as string } })} />
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-slate-700">Category Cards</h4>
          <button
            onClick={() => setHomepage({ ...homepage, categories: { ...homepage.categories, items: [...homepage.categories.items, { title: '', description: '', journals: '', featured: false, image: '', link: '/journals' }] } })}
            className="text-sm text-[#1e3a5f] hover:text-[#c8102e] font-medium"
          >+ Add Category</button>
        </div>
        {homepage.categories.items.map((item, i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-lg mb-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3 flex-1">
                <input type="text" value={item.title} onChange={(e) => {
                  const newItems = [...homepage.categories.items];
                  newItems[i] = { ...newItems[i], title: e.target.value };
                  setHomepage({ ...homepage, categories: { ...homepage.categories, items: newItems } });
                }} placeholder="Title" className="flex-1 px-3 py-2 border border-slate-300 rounded-lg" />
                <input type="text" value={item.journals} onChange={(e) => {
                  const newItems = [...homepage.categories.items];
                  newItems[i] = { ...newItems[i], journals: e.target.value };
                  setHomepage({ ...homepage, categories: { ...homepage.categories, items: newItems } });
                }} placeholder="e.g., 3 Journals" className="w-32 px-3 py-2 border border-slate-300 rounded-lg" />
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={item.featured} onChange={(e) => {
                    const newItems = [...homepage.categories.items];
                    newItems[i] = { ...newItems[i], featured: e.target.checked };
                    setHomepage({ ...homepage, categories: { ...homepage.categories, items: newItems } });
                  }} className="rounded" />
                  <span className="text-sm">Featured</span>
                </label>
              </div>
              <button onClick={() => {
                const newItems = homepage.categories.items.filter((_, idx) => idx !== i);
                setHomepage({ ...homepage, categories: { ...homepage.categories, items: newItems } });
              }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg ml-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
            <input type="text" value={item.description} onChange={(e) => {
              const newItems = [...homepage.categories.items];
              newItems[i] = { ...newItems[i], description: e.target.value };
              setHomepage({ ...homepage, categories: { ...homepage.categories, items: newItems } });
            }} placeholder="Description" className="w-full px-3 py-2 border border-slate-300 rounded-lg mb-3" />
            <ImageInput
              label="Category Image"
              value={item.image}
              onChange={(url) => {
                const newItems = [...homepage.categories.items];
                newItems[i] = { ...newItems[i], image: url };
                setHomepage({ ...homepage, categories: { ...homepage.categories, items: newItems } });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderLatestArticlesSection = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <FormField label="Section Title" name="title" value={homepage.latestArticles.title} onChange={(val) => setHomepage({ ...homepage, latestArticles: { ...homepage.latestArticles, title: val as string } })} />
        <FormField label="Subtitle" name="subtitle" value={homepage.latestArticles.subtitle} onChange={(val) => setHomepage({ ...homepage, latestArticles: { ...homepage.latestArticles, subtitle: val as string } })} />
        <FormField label="Articles Limit" name="limit" type="number" value={homepage.latestArticles.limit} onChange={(val) => setHomepage({ ...homepage, latestArticles: { ...homepage.latestArticles, limit: val as number } })} />
      </div>
      <FormField label="Description" name="description" value={homepage.latestArticles.description} onChange={(val) => setHomepage({ ...homepage, latestArticles: { ...homepage.latestArticles, description: val as string } })} />
      <div className="grid md:grid-cols-2 gap-4">
        <FormField label="View All Text" name="viewAllText" value={homepage.latestArticles.viewAllText} onChange={(val) => setHomepage({ ...homepage, latestArticles: { ...homepage.latestArticles, viewAllText: val as string } })} />
        <FormField label="View All Link" name="viewAllLink" value={homepage.latestArticles.viewAllLink} onChange={(val) => setHomepage({ ...homepage, latestArticles: { ...homepage.latestArticles, viewAllLink: val as string } })} />
      </div>
    </div>
  );

  const renderWhyPublishSection = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <FormField label="Section Title" name="title" value={homepage.whyPublish.title} onChange={(val) => setHomepage({ ...homepage, whyPublish: { ...homepage.whyPublish, title: val as string } })} />
        <FormField label="Subtitle" name="subtitle" value={homepage.whyPublish.subtitle} onChange={(val) => setHomepage({ ...homepage, whyPublish: { ...homepage.whyPublish, subtitle: val as string } })} />
      </div>
      <FormField label="Description" name="description" type="textarea" value={homepage.whyPublish.description} onChange={(val) => setHomepage({ ...homepage, whyPublish: { ...homepage.whyPublish, description: val as string } })} rows={3} />
      <ImageInput
        label="Section Image"
        value={homepage.whyPublish.image}
        onChange={(url) => setHomepage({ ...homepage, whyPublish: { ...homepage.whyPublish, image: url } })}
      />
      <FormField label="Years Experience (e.g., 10+)" name="yearsExperience" value={homepage.whyPublish.yearsExperience} onChange={(val) => setHomepage({ ...homepage, whyPublish: { ...homepage.whyPublish, yearsExperience: val as string } })} />
      <FormField label="Features (one per line)" name="features" type="textarea" value={homepage.whyPublish.features.join('\n')} onChange={(val) => setHomepage({ ...homepage, whyPublish: { ...homepage.whyPublish, features: (val as string).split('\n').filter(Boolean) } })} rows={4} />
      <div className="grid md:grid-cols-2 gap-4">
        <FormField label="Button Text" name="buttonText" value={homepage.whyPublish.buttonText} onChange={(val) => setHomepage({ ...homepage, whyPublish: { ...homepage.whyPublish, buttonText: val as string } })} />
        <FormField label="Button Link" name="buttonLink" value={homepage.whyPublish.buttonLink} onChange={(val) => setHomepage({ ...homepage, whyPublish: { ...homepage.whyPublish, buttonLink: val as string } })} />
      </div>
    </div>
  );

  const renderVideoBannerSection = () => (
    <div className="space-y-4">
      <FormField label="" name="enabled" type="checkbox" value={homepage.videoBanner.enabled} onChange={(val) => setHomepage({ ...homepage, videoBanner: { ...homepage.videoBanner, enabled: val as boolean } })} placeholder="Show video banner section" />
      <div className="grid md:grid-cols-2 gap-6">
        <ImageInput
          label="Background Video"
          value={homepage.videoBanner.videoUrl}
          onChange={(url) => setHomepage({ ...homepage, videoBanner: { ...homepage.videoBanner, videoUrl: url } })}
          accept="video"
        />
        <ImageInput
          label="Poster Image (fallback)"
          value={homepage.videoBanner.posterImage}
          onChange={(url) => setHomepage({ ...homepage, videoBanner: { ...homepage.videoBanner, posterImage: url } })}
        />
      </div>
      <FormField label="Badge Text" name="badge" value={homepage.videoBanner.badge} onChange={(val) => setHomepage({ ...homepage, videoBanner: { ...homepage.videoBanner, badge: val as string } })} />
      <div className="grid md:grid-cols-2 gap-4">
        <FormField label="Title Line 1" name="titleLine1" value={homepage.videoBanner.title.line1} onChange={(val) => setHomepage({ ...homepage, videoBanner: { ...homepage.videoBanner, title: { ...homepage.videoBanner.title, line1: val as string } } })} />
        <FormField label="Title Line 2 (highlighted)" name="titleLine2" value={homepage.videoBanner.title.line2} onChange={(val) => setHomepage({ ...homepage, videoBanner: { ...homepage.videoBanner, title: { ...homepage.videoBanner.title, line2: val as string } } })} />
      </div>
      <FormField label="Description" name="description" type="textarea" value={homepage.videoBanner.description} onChange={(val) => setHomepage({ ...homepage, videoBanner: { ...homepage.videoBanner, description: val as string } })} rows={2} />
      <div className="grid md:grid-cols-2 gap-4">
        <FormField label="Primary Button Text" name="primaryButtonText" value={homepage.videoBanner.primaryButton.text} onChange={(val) => setHomepage({ ...homepage, videoBanner: { ...homepage.videoBanner, primaryButton: { ...homepage.videoBanner.primaryButton, text: val as string } } })} />
        <FormField label="Primary Button Link" name="primaryButtonLink" value={homepage.videoBanner.primaryButton.link} onChange={(val) => setHomepage({ ...homepage, videoBanner: { ...homepage.videoBanner, primaryButton: { ...homepage.videoBanner.primaryButton, link: val as string } } })} />
      </div>
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-slate-700">Stats</h4>
          <button onClick={() => setHomepage({ ...homepage, videoBanner: { ...homepage.videoBanner, stats: [...homepage.videoBanner.stats, { value: '', label: '' }] } })} className="text-sm text-[#1e3a5f] hover:text-[#c8102e] font-medium">+ Add Stat</button>
        </div>
        {homepage.videoBanner.stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-3 mb-2">
            <input type="text" value={stat.value} onChange={(e) => {
              const newStats = [...homepage.videoBanner.stats];
              newStats[i] = { ...newStats[i], value: e.target.value };
              setHomepage({ ...homepage, videoBanner: { ...homepage.videoBanner, stats: newStats } });
            }} placeholder="Value" className="flex-1 px-3 py-2 border border-slate-300 rounded-lg" />
            <input type="text" value={stat.label} onChange={(e) => {
              const newStats = [...homepage.videoBanner.stats];
              newStats[i] = { ...newStats[i], label: e.target.value };
              setHomepage({ ...homepage, videoBanner: { ...homepage.videoBanner, stats: newStats } });
            }} placeholder="Label" className="flex-1 px-3 py-2 border border-slate-300 rounded-lg" />
            <button onClick={() => setHomepage({ ...homepage, videoBanner: { ...homepage.videoBanner, stats: homepage.videoBanner.stats.filter((_, idx) => idx !== i) } })} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderServicesSectionEditor = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <FormField label="Section Title" name="title" value={homepage.servicesSection.title} onChange={(val) => setHomepage({ ...homepage, servicesSection: { ...homepage.servicesSection, title: val as string } })} />
        <FormField label="Subtitle" name="subtitle" value={homepage.servicesSection.subtitle} onChange={(val) => setHomepage({ ...homepage, servicesSection: { ...homepage.servicesSection, subtitle: val as string } })} />
      </div>
      <FormField label="Description" name="description" value={homepage.servicesSection.description} onChange={(val) => setHomepage({ ...homepage, servicesSection: { ...homepage.servicesSection, description: val as string } })} />
      <ImageInput
        label="Section Image"
        value={homepage.servicesSection.image}
        onChange={(url) => setHomepage({ ...homepage, servicesSection: { ...homepage.servicesSection, image: url } })}
      />
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-slate-700">Service Items</h4>
          <button onClick={() => setHomepage({ ...homepage, servicesSection: { ...homepage.servicesSection, items: [...homepage.servicesSection.items, { title: '', description: '', href: '/', icon: '📄' }] } })} className="text-sm text-[#1e3a5f] hover:text-[#c8102e] font-medium">+ Add Item</button>
        </div>
        {homepage.servicesSection.items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 mb-2">
            <input type="text" value={item.icon} onChange={(e) => {
              const newItems = [...homepage.servicesSection.items];
              newItems[i] = { ...newItems[i], icon: e.target.value };
              setHomepage({ ...homepage, servicesSection: { ...homepage.servicesSection, items: newItems } });
            }} placeholder="Icon" className="w-16 px-3 py-2 border border-slate-300 rounded-lg" />
            <input type="text" value={item.title} onChange={(e) => {
              const newItems = [...homepage.servicesSection.items];
              newItems[i] = { ...newItems[i], title: e.target.value };
              setHomepage({ ...homepage, servicesSection: { ...homepage.servicesSection, items: newItems } });
            }} placeholder="Title" className="flex-1 px-3 py-2 border border-slate-300 rounded-lg" />
            <input type="text" value={item.description} onChange={(e) => {
              const newItems = [...homepage.servicesSection.items];
              newItems[i] = { ...newItems[i], description: e.target.value };
              setHomepage({ ...homepage, servicesSection: { ...homepage.servicesSection, items: newItems } });
            }} placeholder="Description" className="flex-1 px-3 py-2 border border-slate-300 rounded-lg" />
            <input type="text" value={item.href} onChange={(e) => {
              const newItems = [...homepage.servicesSection.items];
              newItems[i] = { ...newItems[i], href: e.target.value };
              setHomepage({ ...homepage, servicesSection: { ...homepage.servicesSection, items: newItems } });
            }} placeholder="Link" className="w-32 px-3 py-2 border border-slate-300 rounded-lg" />
            <button onClick={() => setHomepage({ ...homepage, servicesSection: { ...homepage.servicesSection, items: homepage.servicesSection.items.filter((_, idx) => idx !== i) } })} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEventsSectionEditor = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <FormField label="Section Title" name="title" value={homepage.eventsSection.title} onChange={(val) => setHomepage({ ...homepage, eventsSection: { ...homepage.eventsSection, title: val as string } })} />
        <FormField label="Subtitle" name="subtitle" value={homepage.eventsSection.subtitle} onChange={(val) => setHomepage({ ...homepage, eventsSection: { ...homepage.eventsSection, subtitle: val as string } })} />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <FormField label="View All Text" name="viewAllText" value={homepage.eventsSection.viewAllText} onChange={(val) => setHomepage({ ...homepage, eventsSection: { ...homepage.eventsSection, viewAllText: val as string } })} />
        <FormField label="View All Link" name="viewAllLink" value={homepage.eventsSection.viewAllLink} onChange={(val) => setHomepage({ ...homepage, eventsSection: { ...homepage.eventsSection, viewAllLink: val as string } })} />
      </div>
      <p className="text-sm text-slate-500">Note: Events are pulled from the Conferences section. Go to Conferences to add/edit events.</p>
    </div>
  );

  const renderAuthorServicesSectionEditor = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <FormField label="Section Title" name="title" value={homepage.authorServicesSection.title} onChange={(val) => setHomepage({ ...homepage, authorServicesSection: { ...homepage.authorServicesSection, title: val as string } })} />
        <FormField label="Subtitle" name="subtitle" value={homepage.authorServicesSection.subtitle} onChange={(val) => setHomepage({ ...homepage, authorServicesSection: { ...homepage.authorServicesSection, subtitle: val as string } })} />
      </div>
      <FormField label="Description" name="description" type="textarea" value={homepage.authorServicesSection.description} onChange={(val) => setHomepage({ ...homepage, authorServicesSection: { ...homepage.authorServicesSection, description: val as string } })} rows={2} />
      <div className="grid md:grid-cols-2 gap-4">
        <FormField label="Button Text" name="buttonText" value={homepage.authorServicesSection.buttonText} onChange={(val) => setHomepage({ ...homepage, authorServicesSection: { ...homepage.authorServicesSection, buttonText: val as string } })} />
        <FormField label="Button Link" name="buttonLink" value={homepage.authorServicesSection.buttonLink} onChange={(val) => setHomepage({ ...homepage, authorServicesSection: { ...homepage.authorServicesSection, buttonLink: val as string } })} />
      </div>
      <p className="text-sm text-slate-500">Note: Services list is pulled from the Services section. Go to Services to add/edit author services.</p>
    </div>
  );

  const renderWhyChooseUsSection = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <FormField label="Section Title" name="title" value={homepage.whyChooseUs.title} onChange={(val) => setHomepage({ ...homepage, whyChooseUs: { ...homepage.whyChooseUs, title: val as string } })} />
        <FormField label="Subtitle" name="subtitle" value={homepage.whyChooseUs.subtitle} onChange={(val) => setHomepage({ ...homepage, whyChooseUs: { ...homepage.whyChooseUs, subtitle: val as string } })} />
        <FormField label="Description" name="description" value={homepage.whyChooseUs.description} onChange={(val) => setHomepage({ ...homepage, whyChooseUs: { ...homepage.whyChooseUs, description: val as string } })} />
      </div>
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-slate-700">Features</h4>
          <button onClick={() => setHomepage({ ...homepage, whyChooseUs: { ...homepage.whyChooseUs, items: [...homepage.whyChooseUs.items, { title: '', description: '', icon: '✓' }] } })} className="text-sm text-[#1e3a5f] hover:text-[#c8102e] font-medium">+ Add Feature</button>
        </div>
        {homepage.whyChooseUs.items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 mb-2">
            <input type="text" value={item.icon} onChange={(e) => {
              const newItems = [...homepage.whyChooseUs.items];
              newItems[i] = { ...newItems[i], icon: e.target.value };
              setHomepage({ ...homepage, whyChooseUs: { ...homepage.whyChooseUs, items: newItems } });
            }} placeholder="Icon" className="w-16 px-3 py-2 border border-slate-300 rounded-lg" />
            <input type="text" value={item.title} onChange={(e) => {
              const newItems = [...homepage.whyChooseUs.items];
              newItems[i] = { ...newItems[i], title: e.target.value };
              setHomepage({ ...homepage, whyChooseUs: { ...homepage.whyChooseUs, items: newItems } });
            }} placeholder="Title" className="flex-1 px-3 py-2 border border-slate-300 rounded-lg" />
            <input type="text" value={item.description} onChange={(e) => {
              const newItems = [...homepage.whyChooseUs.items];
              newItems[i] = { ...newItems[i], description: e.target.value };
              setHomepage({ ...homepage, whyChooseUs: { ...homepage.whyChooseUs, items: newItems } });
            }} placeholder="Description" className="flex-1 px-3 py-2 border border-slate-300 rounded-lg" />
            <button onClick={() => setHomepage({ ...homepage, whyChooseUs: { ...homepage.whyChooseUs, items: homepage.whyChooseUs.items.filter((_, idx) => idx !== i) } })} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFinalCtaSection = () => (
    <div className="space-y-4">
      <FormField label="Section Title" name="title" value={homepage.finalCta.title} onChange={(val) => setHomepage({ ...homepage, finalCta: { ...homepage.finalCta, title: val as string } })} />
      <FormField label="Description" name="description" type="textarea" value={homepage.finalCta.description} onChange={(val) => setHomepage({ ...homepage, finalCta: { ...homepage.finalCta, description: val as string } })} rows={2} />
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="font-medium text-slate-700">Primary Button</h4>
          <FormField label="Text" name="primaryText" value={homepage.finalCta.primaryButton.text} onChange={(val) => setHomepage({ ...homepage, finalCta: { ...homepage.finalCta, primaryButton: { ...homepage.finalCta.primaryButton, text: val as string } } })} />
          <FormField label="Link" name="primaryLink" value={homepage.finalCta.primaryButton.link} onChange={(val) => setHomepage({ ...homepage, finalCta: { ...homepage.finalCta, primaryButton: { ...homepage.finalCta.primaryButton, link: val as string } } })} />
        </div>
        <div className="space-y-2">
          <h4 className="font-medium text-slate-700">Secondary Button</h4>
          <FormField label="Text" name="secondaryText" value={homepage.finalCta.secondaryButton.text} onChange={(val) => setHomepage({ ...homepage, finalCta: { ...homepage.finalCta, secondaryButton: { ...homepage.finalCta.secondaryButton, text: val as string } } })} />
          <FormField label="Link" name="secondaryLink" value={homepage.finalCta.secondaryButton.link} onChange={(val) => setHomepage({ ...homepage, finalCta: { ...homepage.finalCta, secondaryButton: { ...homepage.finalCta.secondaryButton, link: val as string } } })} />
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'announcement': return renderAnnouncementSection();
      case 'featuredBanners': return renderFeaturedBannersSection();
      case 'categories': return renderCategoriesSection();
      case 'latestArticles': return renderLatestArticlesSection();
      case 'whyPublish': return renderWhyPublishSection();
      case 'videoBanner': return renderVideoBannerSection();
      case 'servicesSection': return renderServicesSectionEditor();
      case 'eventsSection': return renderEventsSectionEditor();
      case 'authorServicesSection': return renderAuthorServicesSectionEditor();
      case 'whyChooseUs': return renderWhyChooseUsSection();
      case 'finalCta': return renderFinalCtaSection();
      default: return null;
    }
  };

  return (
    <div>
      <AdminHeader title="Homepage Sections" subtitle="Edit all homepage content sections" />

      <div className="p-6">
        {message && (
          <div className={`mb-6 px-4 py-3 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-slate-200 p-2 sticky top-6">
              {sections.map((section) => (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === section.key
                      ? 'bg-[#1e3a5f] text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-6">
                {sections.find((s) => s.key === activeSection)?.label}
              </h2>
              {renderActiveSection()}

              <div className="flex justify-end pt-6 mt-6 border-t border-slate-200">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-[#1e3a5f] text-white font-medium rounded-lg hover:bg-[#152d4a] transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Save All Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
