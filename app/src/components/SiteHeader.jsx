import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Mark } from '../ds/index.js';
import { ThemeToggle } from './ThemeToggle.jsx';

// Ported from the weft-hub kit's HubHeader: sticky header, Mark + wordmark + nav.
// Nav now routes via react-router. A small hamburger keeps it usable on mobile.
const NAV = [
  { to: '/', label: 'Federation', end: true },
  { to: '/members/loomweave', label: 'Members' },
  { to: '/demos', label: 'Demos' },
  { to: '/build', label: 'Build' },
];

const HUB_DOCS = 'https://github.com/foundryside-dev/weft';

function navLinkStyle({ isActive }) {
  return {
    fontSize: 12,
    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
    textDecoration: 'none',
    padding: '6px 11px',
    borderRadius: 'var(--radius)',
    background: isActive ? 'var(--surface-overlay)' : 'transparent',
  };
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '12px 30px',
        borderBottom: '1px solid var(--border-default)',
        background: 'var(--surface-raised)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        flexWrap: 'wrap',
      }}
    >
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none' }}>
        <Mark name="weft" size={26} title="Weft" style={{ color: 'var(--text-primary)' }} />
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 19,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
          }}
        >
          Weft
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 2 }}>~/weft</span>
      </Link>

      <button
        type="button"
        className="nav-toggle"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{
          marginLeft: 'auto',
          display: 'none',
          background: 'var(--surface-overlay)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius)',
          color: 'var(--text-secondary)',
          padding: '5px 9px',
          cursor: 'pointer',
          fontSize: 14,
        }}
      >
        ≡
      </button>

      <nav
        aria-label="Primary"
        data-open={open}
        style={{
          display: 'flex',
          gap: 4,
          marginLeft: 'auto',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {NAV.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end} style={navLinkStyle} onClick={() => setOpen(false)}>
            {l.label}
          </NavLink>
        ))}
        <a
          href={HUB_DOCS}
          target="_blank"
          rel="noopener"
          className="ext"
          style={{ fontSize: 12, color: 'var(--text-secondary)', textDecoration: 'none', padding: '6px 11px' }}
        >
          Docs
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
