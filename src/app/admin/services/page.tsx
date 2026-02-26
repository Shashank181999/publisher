'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import DataTable from '@/components/admin/DataTable';
import FormField from '@/components/admin/FormField';
import type { CMSService } from '@/types/cms';

export default function ServicesPage() {
  const [services, setServices] = useState<CMSService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingService, setEditingService] = useState<CMSService | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (service: CMSService) => {
    setEditingService({ ...service });
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingService({
      id: '',
      name: '',
      slug: '',
      description: '',
      features: [],
      price: '',
      icon: 'document',
      isActive: true,
      order: services.length + 1,
      createdAt: '',
      updatedAt: '',
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!editingService) return;

    setIsSaving(true);
    setMessage(null);

    try {
      const isNew = !editingService.createdAt;
      const res = await fetch('/api/admin/services', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingService),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: `Service ${isNew ? 'created' : 'updated'} successfully!` });
        setIsModalOpen(false);
        fetchServices();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save' });
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (service: CMSService) => {
    if (!confirm(`Are you sure you want to delete "${service.name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/services?id=${service.id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Service deleted successfully!' });
        fetchServices();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to delete' });
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred' });
    }
  };

  const columns = [
    { key: 'order', label: '#', width: '60px' },
    { key: 'name', label: 'Service Name' },
    { key: 'slug', label: 'Slug' },
    {
      key: 'features',
      label: 'Features',
      render: (s: CMSService) => `${s.features.length} features`,
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (s: CMSService) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
          {s.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  return (
    <div>
      <AdminHeader title="Author Services" subtitle="Manage author services" />

      <div className="p-6">
        {message && (
          <div className={`mb-6 px-4 py-3 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <p className="text-slate-500">{services.length} services total</p>
          <button onClick={handleCreate} className="px-4 py-2 bg-[#1e3a5f] text-white font-medium rounded-lg hover:bg-[#152d4a] transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Service
          </button>
        </div>

        <DataTable columns={columns} data={services} onEdit={handleEdit} onDelete={handleDelete} isLoading={isLoading} emptyMessage="No services found." />
      </div>

      {isModalOpen && editingService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#1e3a5f]">{editingService.createdAt ? 'Edit Service' : 'New Service'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField label="Service Name" name="name" value={editingService.name} onChange={(val) => setEditingService({ ...editingService, name: val as string })} required />
                <FormField label="Slug" name="slug" value={editingService.slug} onChange={(val) => setEditingService({ ...editingService, slug: val as string })} required />
              </div>

              <FormField label="Description" name="description" type="textarea" value={editingService.description} onChange={(val) => setEditingService({ ...editingService, description: val as string })} rows={3} />

              <div className="grid md:grid-cols-3 gap-4">
                <FormField label="Icon" name="icon" value={editingService.icon} onChange={(val) => setEditingService({ ...editingService, icon: val as string })} placeholder="e.g., document" />
                <FormField label="Price (optional)" name="price" value={editingService.price || ''} onChange={(val) => setEditingService({ ...editingService, price: val as string })} />
                <FormField label="Order" name="order" type="number" value={editingService.order} onChange={(val) => setEditingService({ ...editingService, order: val as number })} />
              </div>

              <FormField label="Features (one per line)" name="features" type="textarea" value={editingService.features.join('\n')} onChange={(val) => setEditingService({ ...editingService, features: (val as string).split('\n').filter(Boolean) })} rows={4} />

              <FormField label="" name="isActive" type="checkbox" value={editingService.isActive} onChange={(val) => setEditingService({ ...editingService, isActive: val as boolean })} placeholder="Service is active" />
            </div>

            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 font-medium rounded-lg hover:bg-slate-100 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={isSaving} className="px-6 py-2 bg-[#1e3a5f] text-white font-medium rounded-lg hover:bg-[#152d4a] transition-colors disabled:opacity-50">
                {isSaving ? 'Saving...' : 'Save Service'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
