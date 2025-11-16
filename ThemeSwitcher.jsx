import React from 'react';
export default function ThemeSwitcher({ theme, setTheme }) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => setTheme('')} className="px-2 py-1 border rounded">Colorful</button>
      <button onClick={() => setTheme('theme-light')} className="px-2 py-1 border rounded">Light</button>
      <button onClick={() => setTheme('theme-dark')} className="px-2 py-1 border rounded">Dark</button>
    </div>
  );
}
