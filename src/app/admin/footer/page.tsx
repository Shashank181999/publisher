'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import FormField from '@/components/admin/FormField';
import type { FooterContent } from '@/types/cms';

const defaultFooter: FooterContent = {
  description: '',
  quickLinks: [],
  journalLinks: [],
  resourceLinks: [],
  copyright: '',
  bottomLinks: [],
};

export default function FooterPage() {
  const [footer, setFooter] = useState<FooterContent>(defaultFooter);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchFooter();
  }, []);

  const fetchFooter = async () => {
    try {
      const res = await fetch('/api/admin/content/footer');
      const data = await res.json();
      if (data.success) {
        setFooter(data.data);
      }
    } catch (error) {
      console.error('Error fetching footer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/content/footer', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(footer),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Footer saved successfully!' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save' });
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred' });
    } finally {
      setIsSaving(false);
    }
  };

  const updateLink = (section: 'quickLinks' | 'journalLinks' | 'resourceLinks' | 'bottomLinks', index: number, field: 'label' | 'href', value: string) => {
    const newLinks = [...footer[section]];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFooter({ ...footer, [section]: newLinks });
  };

  const addLink = (section: 'quickLinks' | 'journalLinks' | 'resourceLinks' | 'bottomLinks') => {
    setFooter({ ...footer, [section]: [...footer[section], { label: '', href: '' }] });
  };

  const removeLink = (section: 'quickLinks' | 'journalLinks' | 'resourceLinks' | 'bottomLinks', index: number) => {
    setFooter({ ...footer, [section]: footer[section].filter((_, i) => i !== index) });
  };

  const renderLinkSection = (title: string, section: 'quickLinks' | 'journalLinks' | 'resourceLinks' | 'bottomLinks') => (
    <div className="border-t border-slate-200 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-slate-700">{title}</h3>
        <button onClick={() => addLink(section)} className="text-sm text-[#1e3a5f] hover:text-[#c8102e] font-medium">+ Add Link</button>
      </div>
      {footer[section].map((link, index) => (
        <div key={index} className="flex items-center gap-3 mb-2">
          <input type="text" value={link.label} onChange={(e) => updateLink(section, index, 'label', e.target.value)} placeholder="Label" className="flex-1 px-3 py-2 border border-slate-300 rounded-lg" />
          <input type="text" value={link.href} onChange={(e) => updateLink(section, index, 'href', e.target.value)} placeholder="URL (e.g., /about)" className="flex-1 px-3 py-2 border border-slate-300 rounded-lg" />
          <button onClick={() => removeLink(section, index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div>
        <AdminHeader title="Footer" subtitle="Loading..." />
        <div className="p-6 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e3a5f]"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader title="Footer" subtitle="Manage footer content and links" />

      <div className="p-6 max-w-4xl">
        {message && (
          <div className={`mb-6 px-4 py-3 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          <FormField label="Footer Description" name="description" type="textarea" value={footer.description} onChange={(val) => setFooter({ ...footer, description: val as string })} rows={3} />

          {renderLinkSection('Quick Links', 'quickLinks')}
          {renderLinkSection('Journal Links', 'journalLinks')}
          {renderLinkSection('Resource Links', 'resourceLinks')}
          {renderLinkSection('Bottom Links (Legal)', 'bottomLinks')}

          <div className="border-t border-slate-200 pt-6">
            <FormField label="Copyright Text" name="copyright" value={footer.copyright} onChange={(val) => setFooter({ ...footer, copyright: val as string })} placeholder="e.g., 2024 Great Britain Publishers. All rights reserved." />
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-200">
            <button onClick={handleSave} disabled={isSaving} className="px-6 py-2.5 bg-[#1e3a5f] text-white font-medium rounded-lg hover:bg-[#152d4a] transition-colors disabled:opacity-50 flex items-center gap-2">
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
