import React from 'react';
const categories = ['All Notes', 'Work', 'Personal', 'Ideas'];
export default function Sidebar({ selected, onSelect, counts }) {
  return (
    <aside className="sidebar">
      <div className="card p-4">
        <h3 className="font-semibold mb-2">Categories</h3>
        <ul className="space-y-2">
          {categories.map(cat => (
            <li key={cat}>
              <button
                onClick={() => onSelect(cat)}
                className={`w-full text-left px-3 py-2 rounded ${selected === cat ? 'bg-white/20' : 'hover:bg-white/10'}`}
              >
                <div className="flex justify-between">
                  <span>{cat}</span>
                  <span className="small-muted">{counts[cat] || 0}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
