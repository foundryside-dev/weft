import React, { useState } from 'react';

/**
 * Tooltip — a small hover/focus popover. Surface-overlay slip, hairline border,
 * soft popover shadow, mono 11px. No glass/blur. Appears on hover and keyboard
 * focus; positioned around the trigger by `placement`.
 */
export function Tooltip({ content, children, placement = 'top', style }) {
  const [show, setShow] = useState(false);

  const POS = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 6 },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 6 },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: 6 },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: 6 },
  };

  return (
    <span
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      <span
        role="tooltip"
        style={{
          position: 'absolute',
          zIndex: 60,
          background: 'var(--surface-overlay)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-sm)',
          padding: '4px 8px',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          lineHeight: 1.4,
          whiteSpace: 'nowrap',
          boxShadow: 'var(--shadow-pop)',
          pointerEvents: 'none',
          opacity: show ? 1 : 0,
          transition: 'opacity var(--dur-fast) var(--ease)',
          ...POS[placement],
          ...style,
        }}
      >
        {content}
      </span>
    </span>
  );
}
