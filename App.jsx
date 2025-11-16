import React, { useEffect, useMemo, useState } from 'react';
import { loadNotes, saveNotes } from './utils/storage';
import { exportNotes, importNotesFile } from './utils/file';
import initialData from './data/notes.json';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NoteCard from './components/NoteCard';
import NoteModal from './components/NoteModal';
import ThemeSwitcher from './components/ThemeSwitcher';
import SearchBar from './components/SearchBar';

const CATEGORIES = ['Work','Personal','Ideas'];

function ensureUniqueTitle(notes, title, category, editingId = null) {
  const base = title.replace(/\s*\(\d+\)$/, '');
  let candidate = base;
  let count = 1;
  const siblings = notes.filter(n => n.category === category && n.id !== editingId);
  while (siblings.some(s => s.title.toLowerCase() === candidate.toLowerCase())) {
    candidate = `${base} (${count})`;
    count++;
  }
  return candidate;
}

export default function App() {
  const [notes, setNotes] = useState([]);
  const [selectedCat, setSelectedCat] = useState('All Notes');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [theme, setTheme] = useState('');
  const [query, setQuery] = useState('');
  const [savingStatus, setSavingStatus] = useState('Saved');

  useEffect(() => {
    const stored = loadNotes();
    setNotes(stored && Array.isArray(stored) ? stored : initialData);
  }, []);

  useEffect(() => {
    setSavingStatus('Saving...');
    const t = setTimeout(() => { saveNotes(notes); setSavingStatus('Saved'); }, 400);
    return () => clearTimeout(t);
  }, [notes]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const counts = useMemo(() => {
    const map = { 'All Notes': notes.length };
    CATEGORIES.forEach(c => map[c] = notes.filter(n => n.category === c).length);
    return map;
  }, [notes]);

  const filtered = useMemo(() => {
    let list = notes.slice().sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt));
    if (selectedCat !== 'All Notes') list = list.filter(n => n.category === selectedCat);
    if (query) list = list.filter(n => n.title.toLowerCase().includes(query.toLowerCase()));
    return list;
  }, [notes, selectedCat, query]);

  function openNew() { setEditing(null); setModalOpen(true); }
  function handleSave(note) {
    if (note.id) {
      setNotes(prev => {
        const newTitle = ensureUniqueTitle(prev, note.title, note.category, note.id);
        return prev.map(p => p.id === note.id ? { ...p, ...note, title: newTitle } : p);
      });
    } else {
      const id = Date.now();
      setNotes(prev => {
        const newTitle = ensureUniqueTitle(prev, note.title, note.category, null);
        const created = { id, ...note, title: newTitle, createdAt: new Date().toISOString() };
        return [created, ...prev];
      });
    }
    setModalOpen(false);
  }
  function handleEdit(n) { setEditing(n); setModalOpen(true); }
  function handleDelete(n) { if(window.confirm('Delete note?')) setNotes(prev => prev.filter(p => p.id !== n.id)); }
  function handleExport() { exportNotes(notes); }
  function handleImport(file) { importNotesFile(file).then(data => { if(Array.isArray(data)) setNotes(data); else alert('Invalid file'); }).catch(()=>alert('Failed to import')); }

  return (
    <div className="app-shell">
      <Sidebar selected={selectedCat} onSelect={setSelectedCat} counts={counts} />
      <div className="main">
        <div className="flex items-center justify-between mb-4 gap-4">
          <Header onAdd={openNew} onExport={handleExport} onImportClick={()=>document.getElementById('importFile').click()} savingStatus={savingStatus} />
          <div className="flex items-center gap-3">
            <SearchBar value={query} onChange={setQuery} />
            <ThemeSwitcher theme={theme} setTheme={setTheme} />
          </div>
        </div>

        <div className="mb-4 card p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Notes • {filtered.length}</h3>
            <div className="small-muted">Updated {new Date().toLocaleDateString()}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(n => <NoteCard key={n.id} note={n} onEdit={handleEdit} onDelete={handleDelete} />)}
        </div>
      </div>

      <NoteModal open={modalOpen} onClose={()=>setModalOpen(false)} onSave={handleSave} initial={editing} categories={CATEGORIES} />

      <input id="importFile" type="file" style={{display:'none'}} accept=".json" onChange={(e)=>{ if(e.target.files[0]) handleImport(e.target.files[0]); e.target.value=''; }} />
    </div>
  );
}
