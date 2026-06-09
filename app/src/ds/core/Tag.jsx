import React from 'react';

/**
 * Tag — a small inline metadata chip: issue id, type, status word, or
 * severity. `tone` tints it semantically (a soft alpha wash of the hue, or a
 * bordered outline). With no tone it's a neutral overlay chip.
 *
 * `tone` accepts any CSS color, including a token: "var(--thread-filigree)",
 * "var(--sev-critical)", "var(--status-wip)", etc.
 */
export function Tag({ children, tone, variant = 'soft', style, ...rest }) {
  const base = {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    fontWeight: variant === 'severity' ? 600 : 400,
    borderRadius: 'var(--radius-sm)',
    padding: '2px 7px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    lineHeight: 1.4,
    border: '1px solid transparent',
  };

  let look;
  if (!tone || variant === 'plain') {
    look = { background: 'var(--surface-overlay)', color: 'var(--text-secondary)' };
  } else if (variant === 'soft') {
    look = { background: `color-mix(in srgb, ${tone} 20%, transparent)`, color: tone };
  } else if (variant === 'severity' || variant === 'outline') {
    look = {
      background: `color-mix(in srgb, ${tone} 18%, transparent)`,
      color: tone,
      borderColor: `color-mix(in srgb, ${tone} 55%, transparent)`,
    };
  }

  return (
    <span style={{ ...base, ...look, ...style }} {...rest}>
      {children}
    </span>
  );
}
