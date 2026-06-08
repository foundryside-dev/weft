import React from 'react';

/**
 * Select — a styled native <select>. Matches the Input field (overlay fill,
 * strong border, 6px radius) with a unicode ▾ caret. Optional uppercase label.
 */
export function Select({ label, value, defaultValue, onChange, children, disabled = false, width = 200, style, ...rest }) {
  const field = {
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    background: 'var(--surface-overlay)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-strong)',
    borderRadius: 'var(--radius)',
    padding: '8px 28px 8px 11px',
    width,
    maxWidth: '100%',
    boxSizing: 'border-box',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    outline: 'none',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    ...style,
  };
  return (
    <label style={{ display: 'block' }}>
      {label && (
        <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 7 }}>
          {label}
        </div>
      )}
      <div style={{ position: 'relative', display: 'inline-block', width }}>
        <select value={value} defaultValue={defaultValue} onChange={onChange} disabled={disabled} style={field} {...rest}>
          {children}
        </select>
        <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: 11, pointerEvents: 'none' }} aria-hidden="true">▾</span>
      </div>
    </label>
  );
}
