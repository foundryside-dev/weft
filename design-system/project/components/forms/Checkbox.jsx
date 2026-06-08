import React from 'react';

/**
 * Checkbox — a controlled box + label. Checked state fills with the amber
 * accent and shows an ink check. Click anywhere on the label toggles it.
 */
export function Checkbox({ checked = false, onChange, children, disabled = false, style, ...rest }) {
  const box = {
    width: 15,
    height: 15,
    borderRadius: 3,
    border: '1px solid',
    borderColor: checked ? 'var(--accent)' : 'var(--border-strong)',
    background: checked ? 'var(--accent)' : 'var(--surface-overlay)',
    color: 'var(--text-on-accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 10,
    flex: '0 0 auto',
    transition: 'background var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease)',
  };
  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
      {...rest}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      <span style={box} aria-hidden="true">{checked ? '✓' : ''}</span>
      {children}
    </label>
  );
}
