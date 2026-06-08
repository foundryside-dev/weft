import React from 'react';

/**
 * Tabs — the Weft view switcher. Two variants:
 *  - `underline` : text tabs with a 2px accent (or thread) underline on the
 *                  active one, sitting on a hairline rule. The brand's member /
 *                  section tab treatment.
 *  - `pill`      : the dashboard nav style — active tab gets an overlay fill.
 *
 * `accent` recolors the active state (pass a thread var to tab by member).
 */
export function Tabs({ tabs = [], value, onChange, variant = 'underline', accent = 'var(--accent)', style }) {
  const items = tabs.map((t) => (typeof t === 'string' ? { id: t, label: t } : t));
  const isUnderline = variant === 'underline';

  return (
    <div
      role="tablist"
      style={{
        display: 'flex',
        alignItems: 'stretch',
        gap: isUnderline ? 18 : 4,
        borderBottom: isUnderline ? '1px solid var(--border-default)' : 'none',
        fontFamily: 'var(--font-mono)',
        ...style,
      }}
    >
      {items.map((t) => {
        const active = t.id === value;
        const base = {
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          fontWeight: active ? 600 : 500,
          cursor: 'pointer',
          border: 'none',
          background: 'transparent',
          // Only the text color fades. The underline/pill-fill (binary active
          // state) snaps instantly — a border-color/background transition can
          // stick at its from-value in throttled/headless contexts and show the
          // wrong tab as active.
          transition: 'color var(--dur-fast) var(--ease)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
        };
        const look = isUnderline
          ? {
              padding: '9px 1px',
              color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
              borderBottom: `2px solid ${active ? accent : 'transparent'}`,
              marginBottom: -1,
            }
          : {
              padding: '6px 12px',
              borderRadius: 'var(--radius)',
              color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
              background: active ? 'var(--surface-overlay)' : 'transparent',
            };
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange && onChange(t.id)}
            style={{ ...base, ...look }}
            onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            {t.icon}
            {t.label}
            {t.count != null && (
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>{t.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
