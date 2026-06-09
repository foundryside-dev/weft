import React, { useEffect, useState } from 'react';

// Theme toggle — dark is canonical/default. Flips data-theme on <html>, which
// the vendored colors_and_type.css honors via [data-theme="light"]. Persists the
// choice in localStorage. No new color values authored — only the token toggle.
const KEY = 'weft-theme';

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(KEY) || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      title={`Switch to ${next} theme`}
      aria-label={`Switch to ${next} theme`}
      style={{
        background: 'var(--surface-overlay)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius)',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        padding: '5px 9px',
        fontSize: 13,
        fontFamily: 'var(--font-mono)',
      }}
    >
      {theme === 'dark' ? '☀' : '☾'}
    </button>
  );
}
