import React from 'react';
export default function Header({ onAdd, onExport, onImportClick, savingStatus }) {
  return (
    <div className="header card">
      <div>
        <h2 className="text-2xl font-semibold">My Notes</h2>
        <div className="small-muted">Create, edit, and organise your notes.</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="small-muted">{savingStatus}</div>
        <button onClick={onExport} className="btn-primary">Export</button>
        <button onClick={onImportClick} className="btn-primary">Import</button>
        <button onClick={onAdd} className="btn-primary">+ New Note</button>
      </div>
    </div>
  );
}
