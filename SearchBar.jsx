import React from 'react';
export default function SearchBar({ value, onChange }) {
  return (
    <input
      className='input'
      placeholder='Search notes by title...'
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}
