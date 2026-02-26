'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import DataTable from '@/components/admin/DataTable';
import FormField from '@/components/admin/FormField';
import type { CMSArticle } from '@/types/cms';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<CMSArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<CMSArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/admin/articles');
      const data = await res.json();
      if (data.success) {
        setArticles(data.data);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (article: CMSArticle) => {
    setEditingArticle({ ...article });
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingArticle({
      id: '',
      title: '',
      authors: [{ name: '', affiliation: '', email: '' }],
      abstract: '',
      keywords: [],
      doi: '',
      pdfUrl: '',
      category: '',
      volume: 1,
      issue: 1,
      year: new Date().getFullYear(),
      pages: '',
      publishedDate: new Date().toISOString().split('T')[0],
      isActive: true,
      createdAt: '',
      updatedAt: '',
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!editingArticle) return;

    setIsSaving(true);
    setMessage(null);

    try {
      const isNew = !editingArticle.createdAt;
      const res = await fetch('/api/admin/articles', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingArticle),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: `Article ${isNew ? 'created' : 'updated'} successfully!` });
        setIsModalOpen(false);
        fetchArticles();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save' });
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (article: CMSArticle) => {
    if (!confirm(`Are you sure you want to delete "${article.title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/articles?id=${article.id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Article deleted successfully!' });
        fetchArticles();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to delete' });
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred' });
    }
  };

  const updateAuthor = (index: number, field: string, value: string) => {
    if (!editingArticle) return;
    const newAuthors = [...editingArticle.authors];
    newAuthors[index] = { ...newAuthors[index], [field]: value };
    setEditingArticle({ ...editingArticle, authors: newAuthors });
  };

  const addAuthor = () => {
    if (!editingArticle) return;
    setEditingArticle({
      ...editingArticle,
      authors: [...editingArticle.authors, { name: '', affiliation: '', email: '' }],
    });
  };

  const removeAuthor = (index: number) => {
    if (!editingArticle || editingArticle.authors.length <= 1) return;
    setEditingArticle({
      ...editingArticle,
      authors: editingArticle.authors.filter((_, i) => i !== index),
    });
  };

  const columns = [
    {
      key: 'title',
      label: 'Title',
      width: '40%',
      render: (a: CMSArticle) => (
        <span className="line-clamp-2">{a.title}</span>
      ),
    },
    {
      key: 'authors',
      label: 'Authors',
      render: (a: CMSArticle) => a.authors.map((au) => au.name).join(', '),
    },
    { key: 'category', label: 'Category' },
    {
      key: 'year',
      label: 'Year',
      render: (a: CMSArticle) => `Vol ${a.volume}, Issue ${a.issue} (${a.year})`,
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (a: CMSArticle) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${a.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
          {a.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  return (
    <div>
      <AdminHeader title="Articles" subtitle="Manage published articles" />

      <div className="p-6">
        {message && (
          <div className={`mb-6 px-4 py-3 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <p className="text-slate-500">{articles.length} articles total</p>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-[#1e3a5f] text-white font-medium rounded-lg hover:bg-[#152d4a] transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Article
          </button>
        </div>

        <DataTable columns={columns} data={articles} onEdit={handleEdit} onDelete={handleDelete} isLoading={isLoading} emptyMessage="No articles found." />
      </div>

      {isModalOpen && editingArticle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#1e3a5f]">{editingArticle.createdAt ? 'Edit Article' : 'New Article'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <FormField label="Title" name="title" value={editingArticle.title} onChange={(val) => setEditingArticle({ ...editingArticle, title: val as string })} required />

              <div className="border p-4 rounded-lg bg-slate-50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-slate-700">Authors</h3>
                  <button onClick={addAuthor} className="text-sm text-[#1e3a5f] hover:text-[#c8102e] font-medium">+ Add Author</button>
                </div>
                {editingArticle.authors.map((author, index) => (
                  <div key={index} className="grid md:grid-cols-4 gap-3 mb-3">
                    <input type="text" value={author.name} onChange={(e) => updateAuthor(index, 'name', e.target.value)} placeholder="Name" className="px-3 py-2 border border-slate-300 rounded-lg" />
                    <input type="text" value={author.affiliation} onChange={(e) => updateAuthor(index, 'affiliation', e.target.value)} placeholder="Affiliation" className="px-3 py-2 border border-slate-300 rounded-lg" />
                    <input type="email" value={author.email || ''} onChange={(e) => updateAuthor(index, 'email', e.target.value)} placeholder="Email" className="px-3 py-2 border border-slate-300 rounded-lg" />
                    <button onClick={() => removeAuthor(index)} disabled={editingArticle.authors.length <= 1} className="p-2 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-30">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <FormField label="Abstract" name="abstract" type="textarea" value={editingArticle.abstract} onChange={(val) => setEditingArticle({ ...editingArticle, abstract: val as string })} rows={4} />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField label="Category" name="category" value={editingArticle.category} onChange={(val) => setEditingArticle({ ...editingArticle, category: val as string })} />
                <FormField label="Keywords (comma-separated)" name="keywords" value={editingArticle.keywords.join(', ')} onChange={(val) => setEditingArticle({ ...editingArticle, keywords: (val as string).split(',').map((k) => k.trim()).filter(Boolean) })} />
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <FormField label="Volume" name="volume" type="number" value={editingArticle.volume} onChange={(val) => setEditingArticle({ ...editingArticle, volume: val as number })} />
                <FormField label="Issue" name="issue" type="number" value={editingArticle.issue} onChange={(val) => setEditingArticle({ ...editingArticle, issue: val as number })} />
                <FormField label="Year" name="year" type="number" value={editingArticle.year} onChange={(val) => setEditingArticle({ ...editingArticle, year: val as number })} />
                <FormField label="Pages" name="pages" value={editingArticle.pages} onChange={(val) => setEditingArticle({ ...editingArticle, pages: val as string })} placeholder="e.g., 1-15" />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <FormField label="DOI" name="doi" value={editingArticle.doi} onChange={(val) => setEditingArticle({ ...editingArticle, doi: val as string })} />
                <FormField label="PDF URL" name="pdfUrl" value={editingArticle.pdfUrl} onChange={(val) => setEditingArticle({ ...editingArticle, pdfUrl: val as string })} />
                <FormField label="Published Date" name="publishedDate" type="date" value={editingArticle.publishedDate} onChange={(val) => setEditingArticle({ ...editingArticle, publishedDate: val as string })} />
              </div>

              <FormField label="" name="isActive" type="checkbox" value={editingArticle.isActive} onChange={(val) => setEditingArticle({ ...editingArticle, isActive: val as boolean })} placeholder="Article is active" />
            </div>

            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 font-medium rounded-lg hover:bg-slate-100 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={isSaving} className="px-6 py-2 bg-[#1e3a5f] text-white font-medium rounded-lg hover:bg-[#152d4a] transition-colors disabled:opacity-50">
                {isSaving ? 'Saving...' : 'Save Article'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
