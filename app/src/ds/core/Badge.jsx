import React from 'react';

/**
 * Badge — a prominent status pill (Open / Active / Done). Filled accent or
 * bordered outline. For small inline metadata chips (type, status, severity)
 * use <Tag> instead.
 */
export function Badge({ children, variant = 'solid', style, ...rest }) {
  const base = {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    fontWeight: 600,
    borderRadius: 'var(--radius)',
    padding: '3px 9px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    lineHeight: 1.3,
  };
  const VARIANTS = {
    solid: { background: 'var(--accent)', color: 'var(--text-on-accent)' },
    outline: {
      background: 'var(--surface-overlay)',
      color: 'var(--text-secondary)',
      border: '1px solid var(--border-strong)',
    },
  };
  return (
    <span style={{ ...base, ...(VARIANTS[variant] || VARIANTS.solid), ...style }} {...rest}>
      {children}
    </span>
  );
}
