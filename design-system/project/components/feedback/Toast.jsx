import React from 'react';

/**
 * Toast — a small, transient notification. Surface-raised card with a 3px
 * left rule in the tone color, a soft popover shadow, mono text, and an
 * optional × dismiss. Tone is semantic (ready / stale / accent / a thread).
 *
 * Stack several in a fixed corner container; this component is just the slip.
 */
export function Toast({ tone = 'var(--accent)', title, children, icon, onDismiss, style }) {
  return (
    <div
      role="status"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        minWidth: 240,
        maxWidth: 380,
        background: 'var(--surface-raised)',
        border: '1px solid var(--border-default)',
        borderLeft: `3px solid ${tone}`,
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow-pop)',
        padding: '11px 13px',
        fontFamily: 'var(--font-mono)',
        ...style,
      }}
    >
      {icon && <span style={{ color: tone, fontSize: 13, lineHeight: 1.4, flex: '0 0 auto' }}>{icon}</span>}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: children ? 3 : 0 }}>{title}</div>}
        {children && <div style={{ fontSize: 11.5, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{children}</div>}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 15, lineHeight: 1, padding: 0, flex: '0 0 auto' }}
        >
          ×
        </button>
      )}
    </div>
  );
}
