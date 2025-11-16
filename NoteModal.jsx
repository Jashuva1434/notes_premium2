import React, { useEffect, useState } from 'react';
export default function NoteModal({ open, onClose, onSave, initial, categories }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0] || 'Personal');

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || '');
      setDescription(initial.description || '');
      setCategory(initial.category || categories[0]);
    } else {
      setTitle('');
      setDescription('');
      setCategory(categories[0] || 'Personal');
    }
  }, [initial, categories, open]);

  if (!open) return null;

  function submit(e) {
    e.preventDefault();
    const payload = {
      ...(initial || {}),
      title: title.trim(),
      description: description.trim(),
      category,
      createdAt: initial?.createdAt || new Date().toISOString(),
    };
    onSave(payload);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="modal-backdrop absolute inset-0" onClick={onClose} />
      <form onSubmit={submit} className="relative bg-white rounded-lg p-6 w-full max-w-lg z-10">
        <h3 className="text-lg font-semibold mb-3">{initial ? 'Edit Note' : 'New Note'}</h3>
        <label className="block text-sm mb-1">Title</label>
        <input className="input mb-3" value={title} onChange={(e)=>setTitle(e.target.value)} required />
        <label className="block text-sm mb-1">Description</label>
        <textarea className="input mb-3" rows={5} value={description} onChange={(e)=>setDescription(e.target.value)} required />
        <label className="block text-sm mb-1">Category</label>
        <select className="input mb-4" value={category} onChange={(e)=>setCategory(e.target.value)}>
          {categories.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
          <button type="submit" className="btn-primary">{initial ? 'Save Changes' : 'Create Note'}</button>
        </div>
      </form>
    </div>
  );
}
