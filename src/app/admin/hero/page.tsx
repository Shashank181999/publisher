'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import FormField from '@/components/admin/FormField';
import MediaPicker from '@/components/admin/MediaPicker';
import type { HeroContent } from '@/types/cms';

const defaultHero: HeroContent = {
  badge: { text: '', icon: 'pulse' },
  title: { line1: '', line2: '' },
  description: '',
  primaryCta: { text: '', link: '' },
  secondaryCta: { text: '', link: '' },
  stats: [],
  backgroundImage: '',
  backgroundVideo: '',
  useVideo: false,
};

export default function HeroPage() {
  const [hero, setHero] = useState<HeroContent>(defaultHero);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showMediaPicker, setShowMediaPicker] = useState<'image' | 'video' | null>(null);

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const res = await fetch('/api/admin/content/hero');
      const data = await res.json();
      if (data.success) {
        setHero(data.data);
      }
    } catch (error) {
      console.error('Error fetching hero:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/content/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hero),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Hero section saved successfully!' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save' });
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred' });
    } finally {
      setIsSaving(false);
    }
  };

  const updateStat = (index: number, field: 'value' | 'label', value: string) => {
    const newStats = [...hero.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setHero({ ...hero, stats: newStats });
  };

  const addStat = () => {
    setHero({ ...hero, stats: [...hero.stats, { value: '', label: '' }] });
  };

  const removeStat = (index: number) => {
    const newStats = hero.stats.filter((_, i) => i !== index);
    setHero({ ...hero, stats: newStats });
  };

  if (isLoading) {
    return (
      <div>
        <AdminHeader title="Hero Section" subtitle="Loading..." />
        <div className="p-6 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e3a5f]"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader title="Hero Section" subtitle="Edit the homepage hero banner" />

      <div className="p-6 max-w-4xl">
        {message && (
          <div
            className={`mb-6 px-4 py-3 rounded-lg ${
              message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          {/* Badge */}
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              label="Badge Text"
              name="badgeText"
              value={hero.badge.text}
              onChange={(val) => setHero({ ...hero, badge: { ...hero.badge, text: val as string } })}
              placeholder="e.g., UK's Premier Academic Publisher"
            />
            <FormField
              label="Badge Icon"
              name="badgeIcon"
              type="select"
              value={hero.badge.icon}
              onChange={(val) => setHero({ ...hero, badge: { ...hero.badge, icon: val as 'pulse' | 'star' | 'bell' } })}
              options={[
                { value: 'pulse', label: 'Pulse (animated dot)' },
                { value: 'star', label: 'Star' },
                { value: 'bell', label: 'Bell' },
              ]}
            />
          </div>

          {/* Title */}
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              label="Title Line 1"
              name="titleLine1"
              value={hero.title.line1}
              onChange={(val) => setHero({ ...hero, title: { ...hero.title, line1: val as string } })}
              placeholder="e.g., Publish Your Research with"
            />
            <FormField
              label="Title Line 2 (Highlighted)"
              name="titleLine2"
              value={hero.title.line2}
              onChange={(val) => setHero({ ...hero, title: { ...hero.title, line2: val as string } })}
              placeholder="e.g., Great Britain Publishers"
            />
          </div>

          {/* Description */}
          <FormField
            label="Description"
            name="description"
            type="textarea"
            value={hero.description}
            onChange={(val) => setHero({ ...hero, description: val as string })}
            placeholder="Short description text"
            rows={3}
          />

          {/* CTAs */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-medium text-slate-700">Primary Button</h3>
              <FormField
                label="Button Text"
                name="primaryCtaText"
                value={hero.primaryCta.text}
                onChange={(val) => setHero({ ...hero, primaryCta: { ...hero.primaryCta, text: val as string } })}
                placeholder="e.g., Browse Journals"
              />
              <FormField
                label="Button Link"
                name="primaryCtaLink"
                value={hero.primaryCta.link}
                onChange={(val) => setHero({ ...hero, primaryCta: { ...hero.primaryCta, link: val as string } })}
                placeholder="e.g., /journals"
              />
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-slate-700">Secondary Button</h3>
              <FormField
                label="Button Text"
                name="secondaryCtaText"
                value={hero.secondaryCta.text}
                onChange={(val) => setHero({ ...hero, secondaryCta: { ...hero.secondaryCta, text: val as string } })}
                placeholder="e.g., Submit Research"
              />
              <FormField
                label="Button Link"
                name="secondaryCtaLink"
                value={hero.secondaryCta.link}
                onChange={(val) => setHero({ ...hero, secondaryCta: { ...hero.secondaryCta, link: val as string } })}
                placeholder="e.g., /submissions"
              />
            </div>
          </div>

          {/* Stats */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-slate-700">Statistics</h3>
              <button
                onClick={addStat}
                className="text-sm text-[#1e3a5f] hover:text-[#c8102e] font-medium"
              >
                + Add Stat
              </button>
            </div>
            <div className="space-y-3">
              {hero.stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => updateStat(index, 'value', e.target.value)}
                    placeholder="Value (e.g., 7+)"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
                  />
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => updateStat(index, 'label', e.target.value)}
                    placeholder="Label (e.g., Journals)"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
                  />
                  <button
                    onClick={() => removeStat(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Background */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="font-medium text-slate-700 mb-4">Background Media</h3>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Background Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={hero.backgroundImage}
                    onChange={(e) => setHero({ ...hero, backgroundImage: e.target.value })}
                    placeholder="Image URL"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
                  />
                  <button
                    onClick={() => setShowMediaPicker('image')}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Browse
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Background Video</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={hero.backgroundVideo}
                    onChange={(e) => setHero({ ...hero, backgroundVideo: e.target.value })}
                    placeholder="Video URL"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
                  />
                  <button
                    onClick={() => setShowMediaPicker('video')}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Browse
                  </button>
                </div>
              </div>
            </div>

            <FormField
              label=""
              name="useVideo"
              type="checkbox"
              value={hero.useVideo}
              onChange={(val) => setHero({ ...hero, useVideo: val as boolean })}
              placeholder="Use video background instead of image"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4 border-t border-slate-200">
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
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Media Picker Modal */}
      {showMediaPicker && (
        <MediaPicker
          type={showMediaPicker}
          currentValue={showMediaPicker === 'image' ? hero.backgroundImage : hero.backgroundVideo}
          onSelect={(media) => {
            if (showMediaPicker === 'image') {
              setHero({ ...hero, backgroundImage: media.url });
            } else {
              setHero({ ...hero, backgroundVideo: media.url });
            }
          }}
          onClose={() => setShowMediaPicker(null)}
        />
      )}
    </div>
  );
}
