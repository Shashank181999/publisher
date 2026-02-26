'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import FormField from '@/components/admin/FormField';
import type { ContactContent } from '@/types/cms';

const defaultContact: ContactContent = {
  company: { name: '', tagline: '' },
  address: { street: '', city: '', postcode: '', country: '' },
  contact: { email: '', alternateEmail: '', phone: '', whatsapp: '' },
  social: {},
  mapEmbed: '',
};

export default function ContactPage() {
  const [contact, setContact] = useState<ContactContent>(defaultContact);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const res = await fetch('/api/admin/content/contact');
      const data = await res.json();
      if (data.success) {
        setContact(data.data);
      }
    } catch (error) {
      console.error('Error fetching contact:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/content/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Contact info saved successfully!' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save' });
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <AdminHeader title="Contact Information" subtitle="Loading..." />
        <div className="p-6 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e3a5f]"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader title="Contact Information" subtitle="Manage company contact details" />

      <div className="p-6 max-w-4xl">
        {message && (
          <div className={`mb-6 px-4 py-3 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          {/* Company */}
          <div>
            <h3 className="font-medium text-slate-700 mb-4">Company Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField label="Company Name" name="companyName" value={contact.company.name} onChange={(val) => setContact({ ...contact, company: { ...contact.company, name: val as string } })} />
              <FormField label="Tagline" name="tagline" value={contact.company.tagline} onChange={(val) => setContact({ ...contact, company: { ...contact.company, tagline: val as string } })} />
            </div>
          </div>

          {/* Address */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="font-medium text-slate-700 mb-4">Address</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField label="Street" name="street" value={contact.address.street} onChange={(val) => setContact({ ...contact, address: { ...contact.address, street: val as string } })} />
              <FormField label="City" name="city" value={contact.address.city} onChange={(val) => setContact({ ...contact, address: { ...contact.address, city: val as string } })} />
              <FormField label="Postcode" name="postcode" value={contact.address.postcode} onChange={(val) => setContact({ ...contact, address: { ...contact.address, postcode: val as string } })} />
              <FormField label="Country" name="country" value={contact.address.country} onChange={(val) => setContact({ ...contact, address: { ...contact.address, country: val as string } })} />
            </div>
          </div>

          {/* Contact Details */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="font-medium text-slate-700 mb-4">Contact Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField label="Email" name="email" type="email" value={contact.contact.email} onChange={(val) => setContact({ ...contact, contact: { ...contact.contact, email: val as string } })} />
              <FormField label="Alternate Email" name="alternateEmail" type="email" value={contact.contact.alternateEmail || ''} onChange={(val) => setContact({ ...contact, contact: { ...contact.contact, alternateEmail: val as string } })} />
              <FormField label="Phone" name="phone" value={contact.contact.phone} onChange={(val) => setContact({ ...contact, contact: { ...contact.contact, phone: val as string } })} />
              <FormField label="WhatsApp" name="whatsapp" value={contact.contact.whatsapp || ''} onChange={(val) => setContact({ ...contact, contact: { ...contact.contact, whatsapp: val as string } })} />
            </div>
          </div>

          {/* Social Media */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="font-medium text-slate-700 mb-4">Social Media Links</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField label="Facebook" name="facebook" type="url" value={contact.social.facebook || ''} onChange={(val) => setContact({ ...contact, social: { ...contact.social, facebook: val as string } })} />
              <FormField label="Twitter" name="twitter" type="url" value={contact.social.twitter || ''} onChange={(val) => setContact({ ...contact, social: { ...contact.social, twitter: val as string } })} />
              <FormField label="LinkedIn" name="linkedin" type="url" value={contact.social.linkedin || ''} onChange={(val) => setContact({ ...contact, social: { ...contact.social, linkedin: val as string } })} />
              <FormField label="YouTube" name="youtube" type="url" value={contact.social.youtube || ''} onChange={(val) => setContact({ ...contact, social: { ...contact.social, youtube: val as string } })} />
              <FormField label="TikTok" name="tiktok" type="url" value={contact.social.tiktok || ''} onChange={(val) => setContact({ ...contact, social: { ...contact.social, tiktok: val as string } })} />
            </div>
          </div>

          {/* Map */}
          <div className="border-t border-slate-200 pt-6">
            <FormField label="Google Maps Embed URL" name="mapEmbed" type="url" value={contact.mapEmbed || ''} onChange={(val) => setContact({ ...contact, mapEmbed: val as string })} helpText="Paste the embed URL from Google Maps" />
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
