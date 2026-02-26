'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import FormField from '@/components/admin/FormField';
import type { BooksContent } from '@/types/cms';

const defaultBooks: BooksContent = {
  title: '',
  subtitle: '',
  description: '',
  services: [],
  featuredBooks: [],
};

export default function BooksPage() {
  const [books, setBooks] = useState<BooksContent>(defaultBooks);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch('/api/admin/content/books');
      const data = await res.json();
      if (data.success) {
        setBooks(data.data);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/content/books', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(books),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Books section saved successfully!' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save' });
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred' });
    } finally {
      setIsSaving(false);
    }
  };

  const updateService = (index: number, field: string, value: string) => {
    const newServices = [...books.services];
    newServices[index] = { ...newServices[index], [field]: value };
    setBooks({ ...books, services: newServices });
  };

  const addService = () => {
    setBooks({
      ...books,
      services: [...books.services, { title: '', description: '', icon: 'book' }],
    });
  };

  const removeService = (index: number) => {
    setBooks({
      ...books,
      services: books.services.filter((_, i) => i !== index),
    });
  };

  const updateBook = (index: number, field: string, value: string) => {
    const newBooks = [...books.featuredBooks];
    newBooks[index] = { ...newBooks[index], [field]: value };
    setBooks({ ...books, featuredBooks: newBooks });
  };

  const addBook = () => {
    setBooks({
      ...books,
      featuredBooks: [
        ...books.featuredBooks,
        { id: `book-${Date.now()}`, title: '', author: '', coverImage: '', description: '', buyLink: '' },
      ],
    });
  };

  const removeBook = (index: number) => {
    setBooks({
      ...books,
      featuredBooks: books.featuredBooks.filter((_, i) => i !== index),
    });
  };

  if (isLoading) {
    return (
      <div>
        <AdminHeader title="Books Section" subtitle="Loading..." />
        <div className="p-6 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e3a5f]"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader title="Books Section" subtitle="Manage book publishing content" />

      <div className="p-6 max-w-4xl">
        {message && (
          <div className={`mb-6 px-4 py-3 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          <FormField label="Title" name="title" value={books.title} onChange={(val) => setBooks({ ...books, title: val as string })} />
          <FormField label="Subtitle" name="subtitle" value={books.subtitle} onChange={(val) => setBooks({ ...books, subtitle: val as string })} />
          <FormField label="Description" name="description" type="textarea" value={books.description} onChange={(val) => setBooks({ ...books, description: val as string })} rows={3} />

          {/* Services */}
          <div className="border-t border-slate-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-slate-700">Book Services</h3>
              <button onClick={addService} className="text-sm text-[#1e3a5f] hover:text-[#c8102e] font-medium">+ Add Service</button>
            </div>
            {books.services.map((service, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-lg mb-3">
                <div className="grid md:grid-cols-4 gap-3">
                  <input type="text" value={service.title} onChange={(e) => updateService(index, 'title', e.target.value)} placeholder="Title" className="px-3 py-2 border border-slate-300 rounded-lg" />
                  <input type="text" value={service.icon} onChange={(e) => updateService(index, 'icon', e.target.value)} placeholder="Icon" className="px-3 py-2 border border-slate-300 rounded-lg" />
                  <input type="text" value={service.description} onChange={(e) => updateService(index, 'description', e.target.value)} placeholder="Description" className="px-3 py-2 border border-slate-300 rounded-lg col-span-1" />
                  <button onClick={() => removeService(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg self-center justify-self-start">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Books */}
          <div className="border-t border-slate-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-slate-700">Featured Books</h3>
              <button onClick={addBook} className="text-sm text-[#1e3a5f] hover:text-[#c8102e] font-medium">+ Add Book</button>
            </div>
            {books.featuredBooks.map((book, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-lg mb-3">
                <div className="grid md:grid-cols-2 gap-3 mb-3">
                  <input type="text" value={book.title} onChange={(e) => updateBook(index, 'title', e.target.value)} placeholder="Book Title" className="px-3 py-2 border border-slate-300 rounded-lg" />
                  <input type="text" value={book.author} onChange={(e) => updateBook(index, 'author', e.target.value)} placeholder="Author" className="px-3 py-2 border border-slate-300 rounded-lg" />
                </div>
                <div className="grid md:grid-cols-2 gap-3 mb-3">
                  <input type="text" value={book.coverImage} onChange={(e) => updateBook(index, 'coverImage', e.target.value)} placeholder="Cover Image URL" className="px-3 py-2 border border-slate-300 rounded-lg" />
                  <input type="text" value={book.buyLink || ''} onChange={(e) => updateBook(index, 'buyLink', e.target.value)} placeholder="Buy Link (optional)" className="px-3 py-2 border border-slate-300 rounded-lg" />
                </div>
                <div className="flex gap-3">
                  <input type="text" value={book.description} onChange={(e) => updateBook(index, 'description', e.target.value)} placeholder="Description" className="flex-1 px-3 py-2 border border-slate-300 rounded-lg" />
                  <button onClick={() => removeBook(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
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
