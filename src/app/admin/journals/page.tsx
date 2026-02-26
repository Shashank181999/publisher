'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import DataTable from '@/components/admin/DataTable';
import FormField from '@/components/admin/FormField';
import type { CMSJournal } from '@/types/cms';

export default function JournalsPage() {
  const [journals, setJournals] = useState<CMSJournal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingJournal, setEditingJournal] = useState<CMSJournal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const res = await fetch('/api/admin/journals');
      const data = await res.json();
      if (data.success) {
        setJournals(data.data);
      }
    } catch (error) {
      console.error('Error fetching journals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (journal: CMSJournal) => {
    setEditingJournal({ ...journal });
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingJournal({
      id: '',
      name: '',
      shortName: '',
      slug: '',
      issn: '',
      category: 'ahs',
      description: '',
      coverImage: '',
      editorInChief: { name: '', affiliation: '', email: '' },
      frequency: 'Quarterly',
      established: new Date().getFullYear(),
      subjects: [],
      ojsPath: '',
      isActive: true,
      createdAt: '',
      updatedAt: '',
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!editingJournal) return;

    setIsSaving(true);
    setMessage(null);

    try {
      const isNew = !editingJournal.createdAt;
      const res = await fetch('/api/admin/journals', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingJournal),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: `Journal ${isNew ? 'created' : 'updated'} successfully!` });
        setIsModalOpen(false);
        fetchJournals();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save' });
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (journal: CMSJournal) => {
    if (!confirm(`Are you sure you want to delete "${journal.name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/journals?id=${journal.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Journal deleted successfully!' });
        fetchJournals();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to delete' });
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred' });
    }
  };

  const columns = [
    {
      key: 'shortName',
      label: 'Code',
      render: (j: CMSJournal) => (
        <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded">{j.shortName}</span>
      ),
    },
    { key: 'name', label: 'Name' },
    { key: 'issn', label: 'ISSN' },
    {
      key: 'category',
      label: 'Category',
      render: (j: CMSJournal) => (
        <span className="capitalize">{j.category}</span>
      ),
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (j: CMSJournal) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            j.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
          }`}
        >
          {j.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  return (
    <div>
      <AdminHeader title="Journals" subtitle="Manage academic journals" />

      <div className="p-6">
        {message && (
          <div
            className={`mb-6 px-4 py-3 rounded-lg ${
              message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-slate-500">{journals.length} journals total</p>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-[#1e3a5f] text-white font-medium rounded-lg hover:bg-[#152d4a] transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Journal
          </button>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={journals}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
          emptyMessage="No journals found. Click 'Add Journal' to create one."
        />
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingJournal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#1e3a5f]">
                {editingJournal.createdAt ? 'Edit Journal' : 'New Journal'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  label="Journal Name"
                  name="name"
                  value={editingJournal.name}
                  onChange={(val) => setEditingJournal({ ...editingJournal, name: val as string })}
                  required
                />
                <FormField
                  label="Short Name"
                  name="shortName"
                  value={editingJournal.shortName}
                  onChange={(val) => setEditingJournal({ ...editingJournal, shortName: val as string })}
                  placeholder="e.g., BJAHS"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  label="Slug"
                  name="slug"
                  value={editingJournal.slug}
                  onChange={(val) => setEditingJournal({ ...editingJournal, slug: val as string })}
                  placeholder="e.g., allied-health-sciences"
                  required
                />
                <FormField
                  label="ISSN"
                  name="issn"
                  value={editingJournal.issn}
                  onChange={(val) => setEditingJournal({ ...editingJournal, issn: val as string })}
                  placeholder="e.g., 2976-8454"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <FormField
                  label="Category"
                  name="category"
                  type="select"
                  value={editingJournal.category}
                  onChange={(val) => setEditingJournal({ ...editingJournal, category: val as CMSJournal['category'] })}
                  options={[
                    { value: 'ahs', label: 'Allied Health Sciences' },
                    { value: 'medical', label: 'Medical Sciences' },
                    { value: 'social', label: 'Social Sciences' },
                    { value: 'other', label: 'Other' },
                  ]}
                />
                <FormField
                  label="Frequency"
                  name="frequency"
                  value={editingJournal.frequency}
                  onChange={(val) => setEditingJournal({ ...editingJournal, frequency: val as string })}
                />
                <FormField
                  label="Established"
                  name="established"
                  type="number"
                  value={editingJournal.established}
                  onChange={(val) => setEditingJournal({ ...editingJournal, established: val as number })}
                />
              </div>

              <FormField
                label="Description"
                name="description"
                type="textarea"
                value={editingJournal.description}
                onChange={(val) => setEditingJournal({ ...editingJournal, description: val as string })}
                rows={3}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  label="Cover Image URL"
                  name="coverImage"
                  value={editingJournal.coverImage}
                  onChange={(val) => setEditingJournal({ ...editingJournal, coverImage: val as string })}
                />
                <FormField
                  label="OJS Path"
                  name="ojsPath"
                  value={editingJournal.ojsPath || ''}
                  onChange={(val) => setEditingJournal({ ...editingJournal, ojsPath: val as string })}
                  helpText="Journal path in OJS system"
                />
              </div>

              <div className="border-t border-slate-200 pt-4">
                <h3 className="font-medium text-slate-700 mb-3">Editor in Chief</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <FormField
                    label="Name"
                    name="editorName"
                    value={editingJournal.editorInChief.name}
                    onChange={(val) =>
                      setEditingJournal({
                        ...editingJournal,
                        editorInChief: { ...editingJournal.editorInChief, name: val as string },
                      })
                    }
                  />
                  <FormField
                    label="Affiliation"
                    name="editorAffiliation"
                    value={editingJournal.editorInChief.affiliation}
                    onChange={(val) =>
                      setEditingJournal({
                        ...editingJournal,
                        editorInChief: { ...editingJournal.editorInChief, affiliation: val as string },
                      })
                    }
                  />
                  <FormField
                    label="Email"
                    name="editorEmail"
                    type="email"
                    value={editingJournal.editorInChief.email}
                    onChange={(val) =>
                      setEditingJournal({
                        ...editingJournal,
                        editorInChief: { ...editingJournal.editorInChief, email: val as string },
                      })
                    }
                  />
                </div>
              </div>

              <FormField
                label="Subjects (comma-separated)"
                name="subjects"
                value={editingJournal.subjects.join(', ')}
                onChange={(val) =>
                  setEditingJournal({
                    ...editingJournal,
                    subjects: (val as string).split(',').map((s) => s.trim()).filter(Boolean),
                  })
                }
              />

              <FormField
                label=""
                name="isActive"
                type="checkbox"
                value={editingJournal.isActive}
                onChange={(val) => setEditingJournal({ ...editingJournal, isActive: val as boolean })}
                placeholder="Journal is active"
              />
            </div>

            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-slate-600 font-medium rounded-lg hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2 bg-[#1e3a5f] text-white font-medium rounded-lg hover:bg-[#152d4a] transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Journal'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
