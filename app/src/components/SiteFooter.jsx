import React from 'react';
import { Mark } from '../ds/index.js';

// Ported from the weft-hub kit footer. Links to the hub docs on GitHub.
export function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-default)',
        padding: '20px 30px',
        maxWidth: 980,
        margin: '40px auto 0',
        display: 'flex',
        gap: 14,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Mark name="weft" size={18} title="Weft" style={{ color: 'var(--text-muted)' }} />
      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
        ~/weft is documentation only — there is nothing called “Weft” to install or run.
      </span>
      <a
        href="https://foundryside.dev"
        target="_blank"
        rel="noopener"
        className="ext"
        style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
      >
        <Mark name="foundryside" size={17} title="Foundryside" style={{ color: 'var(--text-muted)' }} />
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>part of Foundryside · foundryside.dev</span>
      </a>
      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>MIT · 2026</span>
    </footer>
  );
}
