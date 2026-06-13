import React, { useState, useRef, useEffect } from 'react';

/**
 * Dropdown — a trigger button + a popover menu. Surface-raised list, hairline
 * border, 8px radius, soft popover shadow. Items hover to surface-hover; a
 * `danger` item reads in warm coral. Closes on select, outside-click, or Esc.
 *
 * Items: { label, icon?, onSelect?, danger?, disabled? } or { divider: true }.
 */
export function Dropdown({ trigger, items = [], align = 'left', width = 200, caret = true, style }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    window.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); window.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '7px 12px', minHeight: 34, borderRadius: 'var(--radius)',
          background: open ? 'var(--surface-hover)' : 'var(--surface-overlay)',
          color: open ? 'var(--text-primary)' : 'var(--text-secondary)',
          border: '1px solid var(--border-strong)', cursor: 'pointer',
          transition: 'background var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease)',
        }}
      >
        {trigger}
        {caret && <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>▾</span>}
      </button>

      {open && (
      <div
        role="menu"
        style={{
          position: 'absolute', top: '100%', marginTop: 6,
          [align === 'right' ? 'right' : 'left']: 0,
          minWidth: width, zIndex: 80,
          background: 'var(--surface-raised)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-pop)',
          padding: 5, fontFamily: 'var(--font-mono)',
          // Visibility is NOT gated on a transition (which can stick at the
          // from-frame in throttled/headless contexts) — the menu is rendered
          // only while open and is fully visible. A transform-only entrance
          // adds polish but never hides content even at its first frame.
          animation: 'ddMenuIn var(--dur-fast) var(--ease)',
          ...style,
        }}
      >
        {items.map((it, idx) => {
          if (it.divider) {
            return <div key={idx} style={{ height: 1, background: 'var(--border-default)', margin: '5px 0' }} />;
          }
          const color = it.danger ? 'var(--danger-fg)' : 'var(--text-secondary)';
          return (
            <button
              key={idx}
              role="menuitem"
              disabled={it.disabled}
              onClick={() => { if (it.onSelect) it.onSelect(); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 9, width: '100%',
                textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 12,
                padding: '7px 9px', borderRadius: 'var(--radius-sm)',
                background: 'transparent', border: 'none',
                color: it.disabled ? 'var(--text-muted)' : color,
                cursor: it.disabled ? 'default' : 'pointer',
                opacity: it.disabled ? 0.55 : 1,
                transition: 'background var(--dur-fast) var(--ease)',
              }}
              onMouseEnter={(e) => { if (!it.disabled) e.currentTarget.style.background = 'var(--surface-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              {it.icon != null && <span style={{ flex: '0 0 auto', width: 16, textAlign: 'center' }}>{it.icon}</span>}
              <span style={{ flex: 1 }}>{it.label}</span>
            </button>
          );
        })}
      </div>
      )}
    </span>
  );
}
