import React from 'react';
import { format } from 'date-fns';
export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="note-card">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold">{note.title}</h3>
        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded">{note.category}</span>
      </div>
      <p className="mt-2 text-sm text-gray-600">{note.description}</p>
      <div className="flex items-center justify-between mt-3">
        <small className="text-xs text-gray-400">{format(new Date(note.createdAt),'PPP p')}</small>
        <div className="space-x-2">
          <button onClick={() => onEdit(note)} className="text-indigo-600 text-sm">Edit</button>
          <button onClick={() => onDelete(note)} className="text-red-600 text-sm">Delete</button>
        </div>
      </div>
    </div>
  );
}
