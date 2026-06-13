import React, { useState } from 'react';

/**
 * Button — the Weft action control. Mono, 6px radius, no pill shapes, no scale
 * on press. Hover lightens the surface one step (or, for primary, darkens the
 * amber). Focus shows a 2px accent ring. Color is rationed: `danger` and
 * `ready` are the only semantic fills.
 */
export function Button({
  children,
  variant = 'secondary',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);

  const base = {
    fontFamily: 'var(--font-mono)',
    fontWeight: 500,
    borderRadius: 'var(--radius)',
    border: '1px solid transparent',
    cursor: disabled || loading ? 'default' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    whiteSpace: 'nowrap',
    transition: 'background var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease)',
    opacity: loading ? 0.6 : 1,
    pointerEvents: loading ? 'none' : undefined,
    outline: 'none',
    boxShadow: focus ? 'var(--focus-ring)' : undefined,
  };

  const SIZES = {
    sm: { fontSize: 11, padding: '5px 9px', minHeight: 28 },
    md: { fontSize: 12, padding: '7px 12px', minHeight: 34 },
    lg: { fontSize: 13, padding: '9px 16px', minHeight: 40 },
  };

  const VARIANTS = {
    primary: {
      rest: { background: 'var(--accent)', color: 'var(--text-on-accent)', borderColor: 'var(--accent)' },
      hover: { background: 'var(--accent-hover)', borderColor: 'var(--accent-hover)' },
    },
    secondary: {
      rest: { background: 'var(--surface-overlay)', color: 'var(--text-secondary)', borderColor: 'var(--border-strong)' },
      hover: { background: 'var(--surface-hover)', color: 'var(--text-primary)' },
    },
    ghost: {
      rest: { background: 'transparent', color: 'var(--text-secondary)' },
      hover: { background: 'var(--surface-overlay)', color: 'var(--text-primary)' },
    },
    danger: {
      rest: { background: 'var(--danger-fill)', color: 'var(--danger-fg)', borderColor: 'var(--danger-border)' },
      hover: { background: 'var(--danger-fill-hi)' },
    },
    ready: {
      rest: { background: 'var(--ready-fill)', color: 'var(--ready-fg)', borderColor: 'var(--ready-border)' },
      hover: { background: 'var(--ready-fill)' },
    },
  };

  const v = VARIANTS[variant] || VARIANTS.secondary;
  const composed = {
    ...base,
    ...SIZES[size],
    ...v.rest,
    ...(hover && !disabled && !loading ? v.hover : null),
    ...(disabled ? { opacity: 0.45, cursor: 'default', pointerEvents: 'none' } : null),
    ...style,
  };

  return (
    <button
      type={type}
      style={composed}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      {...rest}
    >
      {loading ? 'Loading…' : children}
    </button>
  );
}
