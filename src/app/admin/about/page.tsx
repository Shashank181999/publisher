'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import FormField from '@/components/admin/FormField';
import type { AboutContent } from '@/types/cms';

const defaultAbout: AboutContent = {
  title: '',
  subtitle: '',
  description: '',
  mission: '',
  vision: '',
  values: [],
  teamImage: '',
  stats: [],
};

export default function AboutPage() {
  const [about, setAbout] = useState<AboutContent>(defaultAbout);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await fetch('/api/admin/content/about');
      const data = await res.json();
      if (data.success) {
        setAbout(data.data);
      }
    } catch (error) {
      console.error('Error fetching about:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/content/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(about),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'About page saved successfully!' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save' });
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred' });
    } finally {
      setIsSaving(false);
    }
  };

  const updateValue = (index: number, field: keyof AboutContent['values'][0], value: string) => {
    const newValues = [...about.values];
    newValues[index] = { ...newValues[index], [field]: value };
    setAbout({ ...about, values: newValues });
  };

  const addValue = () => {
    setAbout({
      ...about,
      values: [...about.values, { title: '', description: '', icon: 'star' }],
    });
  };

  const removeValue = (index: number) => {
    const newValues = about.values.filter((_, i) => i !== index);
    setAbout({ ...about, values: newValues });
  };

  const updateStat = (index: number, field: 'value' | 'label', value: string) => {
    const newStats = [...about.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setAbout({ ...about, stats: newStats });
  };

  const addStat = () => {
    setAbout({ ...about, stats: [...about.stats, { value: '', label: '' }] });
  };

  const removeStat = (index: number) => {
    const newStats = about.stats.filter((_, i) => i !== index);
    setAbout({ ...about, stats: newStats });
  };

  if (isLoading) {
    return (
      <div>
        <AdminHeader title="About Page" subtitle="Loading..." />
        <div className="p-6 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e3a5f]"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader title="About Page" subtitle="Edit the about page content" />

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
          {/* Basic Info */}
          <FormField
            label="Title"
            name="title"
            value={about.title}
            onChange={(val) => setAbout({ ...about, title: val as string })}
            placeholder="About Great Britain Publishers"
          />

          <FormField
            label="Subtitle"
            name="subtitle"
            value={about.subtitle}
            onChange={(val) => setAbout({ ...about, subtitle: val as string })}
            placeholder="Advancing Knowledge, Connecting Minds"
          />

          <FormField
            label="Description"
            name="description"
            type="textarea"
            value={about.description}
            onChange={(val) => setAbout({ ...about, description: val as string })}
            rows={4}
          />

          <FormField
            label="Mission Statement"
            name="mission"
            type="textarea"
            value={about.mission}
            onChange={(val) => setAbout({ ...about, mission: val as string })}
            rows={4}
          />

          <FormField
            label="Vision Statement"
            name="vision"
            type="textarea"
            value={about.vision}
            onChange={(val) => setAbout({ ...about, vision: val as string })}
            rows={3}
          />

          <FormField
            label="Team Image URL"
            name="teamImage"
            type="url"
            value={about.teamImage}
            onChange={(val) => setAbout({ ...about, teamImage: val as string })}
            placeholder="https://..."
          />

          {/* Values */}
          <div className="border-t border-slate-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-slate-700">Core Values</h3>
              <button
                onClick={addValue}
                className="text-sm text-[#1e3a5f] hover:text-[#c8102e] font-medium"
              >
                + Add Value
              </button>
            </div>
            <div className="space-y-4">
              {about.values.map((value, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 grid md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={value.title}
                        onChange={(e) => updateValue(index, 'title', e.target.value)}
                        placeholder="Title"
                        className="px-3 py-2 border border-slate-300 rounded-lg"
                      />
                      <input
                        type="text"
                        value={value.icon}
                        onChange={(e) => updateValue(index, 'icon', e.target.value)}
                        placeholder="Icon name"
                        className="px-3 py-2 border border-slate-300 rounded-lg"
                      />
                      <input
                        type="text"
                        value={value.description}
                        onChange={(e) => updateValue(index, 'description', e.target.value)}
                        placeholder="Description"
                        className="px-3 py-2 border border-slate-300 rounded-lg"
                      />
                    </div>
                    <button
                      onClick={() => removeValue(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="border-t border-slate-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-slate-700">Statistics</h3>
              <button
                onClick={addStat}
                className="text-sm text-[#1e3a5f] hover:text-[#c8102e] font-medium"
              >
                + Add Stat
              </button>
            </div>
            <div className="space-y-3">
              {about.stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => updateStat(index, 'value', e.target.value)}
                    placeholder="Value"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
                  />
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => updateStat(index, 'label', e.target.value)}
                    placeholder="Label"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
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
    </div>
  );
}
