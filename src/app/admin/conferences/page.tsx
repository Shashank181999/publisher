'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import DataTable from '@/components/admin/DataTable';
import FormField from '@/components/admin/FormField';
import type { CMSConference } from '@/types/cms';

export default function ConferencesPage() {
  const [conferences, setConferences] = useState<CMSConference[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingConference, setEditingConference] = useState<CMSConference | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchConferences();
  }, []);

  const fetchConferences = async () => {
    try {
      const res = await fetch('/api/admin/conferences');
      const data = await res.json();
      if (data.success) {
        setConferences(data.data);
      }
    } catch (error) {
      console.error('Error fetching conferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (conference: CMSConference) => {
    setEditingConference({ ...conference });
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingConference({
      id: '',
      title: '',
      type: 'conference',
      date: new Date().toISOString().split('T')[0],
      endDate: '',
      location: '',
      isVirtual: false,
      description: '',
      registrationLink: '',
      status: 'upcoming',
      image: '',
      isActive: true,
      createdAt: '',
      updatedAt: '',
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!editingConference) return;

    setIsSaving(true);
    setMessage(null);

    try {
      const isNew = !editingConference.createdAt;
      const res = await fetch('/api/admin/conferences', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingConference),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: `Event ${isNew ? 'created' : 'updated'} successfully!` });
        setIsModalOpen(false);
        fetchConferences();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save' });
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (conference: CMSConference) => {
    if (!confirm(`Are you sure you want to delete "${conference.title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/conferences?id=${conference.id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Event deleted successfully!' });
        fetchConferences();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to delete' });
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred' });
    }
  };

  const columns = [
    {
      key: 'title',
      label: 'Title',
      width: '35%',
      render: (c: CMSConference) => <span className="line-clamp-2">{c.title}</span>,
    },
    {
      key: 'type',
      label: 'Type',
      render: (c: CMSConference) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
          c.type === 'conference' ? 'bg-blue-100 text-blue-700' :
          c.type === 'webinar' ? 'bg-purple-100 text-purple-700' :
          c.type === 'seminar' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
        }`}>
          {c.type}
        </span>
      ),
    },
    { key: 'date', label: 'Date' },
    { key: 'location', label: 'Location' },
    {
      key: 'status',
      label: 'Status',
      render: (c: CMSConference) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
          c.status === 'upcoming' ? 'bg-green-100 text-green-700' :
          c.status === 'ongoing' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-600'
        }`}>
          {c.status}
        </span>
      ),
    },
  ];

  return (
    <div>
      <AdminHeader title="Conferences & Events" subtitle="Manage conferences, seminars, and webinars" />

      <div className="p-6">
        {message && (
          <div className={`mb-6 px-4 py-3 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <p className="text-slate-500">{conferences.length} events total</p>
          <button onClick={handleCreate} className="px-4 py-2 bg-[#1e3a5f] text-white font-medium rounded-lg hover:bg-[#152d4a] transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Event
          </button>
        </div>

        <DataTable columns={columns} data={conferences} onEdit={handleEdit} onDelete={handleDelete} isLoading={isLoading} emptyMessage="No events found." />
      </div>

      {isModalOpen && editingConference && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#1e3a5f]">{editingConference.createdAt ? 'Edit Event' : 'New Event'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <FormField label="Title" name="title" value={editingConference.title} onChange={(val) => setEditingConference({ ...editingConference, title: val as string })} required />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  label="Type"
                  name="type"
                  type="select"
                  value={editingConference.type}
                  onChange={(val) => setEditingConference({ ...editingConference, type: val as CMSConference['type'] })}
                  options={[
                    { value: 'conference', label: 'Conference' },
                    { value: 'seminar', label: 'Seminar' },
                    { value: 'webinar', label: 'Webinar' },
                    { value: 'workshop', label: 'Workshop' },
                  ]}
                />
                <FormField
                  label="Status"
                  name="status"
                  type="select"
                  value={editingConference.status}
                  onChange={(val) => setEditingConference({ ...editingConference, status: val as CMSConference['status'] })}
                  options={[
                    { value: 'upcoming', label: 'Upcoming' },
                    { value: 'ongoing', label: 'Ongoing' },
                    { value: 'completed', label: 'Completed' },
                  ]}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField label="Start Date" name="date" type="date" value={editingConference.date} onChange={(val) => setEditingConference({ ...editingConference, date: val as string })} required />
                <FormField label="End Date (optional)" name="endDate" type="date" value={editingConference.endDate || ''} onChange={(val) => setEditingConference({ ...editingConference, endDate: val as string })} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField label="Location" name="location" value={editingConference.location} onChange={(val) => setEditingConference({ ...editingConference, location: val as string })} placeholder="e.g., London, UK or Online" />
                <div className="pt-8">
                  <FormField label="" name="isVirtual" type="checkbox" value={editingConference.isVirtual} onChange={(val) => setEditingConference({ ...editingConference, isVirtual: val as boolean })} placeholder="This is a virtual event" />
                </div>
              </div>

              <FormField label="Description" name="description" type="textarea" value={editingConference.description} onChange={(val) => setEditingConference({ ...editingConference, description: val as string })} rows={3} />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField label="Registration Link" name="registrationLink" type="url" value={editingConference.registrationLink || ''} onChange={(val) => setEditingConference({ ...editingConference, registrationLink: val as string })} />
                <FormField label="Image URL" name="image" type="url" value={editingConference.image || ''} onChange={(val) => setEditingConference({ ...editingConference, image: val as string })} />
              </div>

              <FormField label="" name="isActive" type="checkbox" value={editingConference.isActive} onChange={(val) => setEditingConference({ ...editingConference, isActive: val as boolean })} placeholder="Event is active" />
            </div>

            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 font-medium rounded-lg hover:bg-slate-100 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={isSaving} className="px-6 py-2 bg-[#1e3a5f] text-white font-medium rounded-lg hover:bg-[#152d4a] transition-colors disabled:opacity-50">
                {isSaving ? 'Saving...' : 'Save Event'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
