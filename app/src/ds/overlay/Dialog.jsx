import React, { useEffect } from 'react';

/**
 * Dialog — the Weft overlay. Two variants:
 *  - `modal`  : centered card (8px radius, shadow-modal) over a dim backdrop.
 *  - `panel`  : right-edge slide-in (the dashboard's detail panel), full height.
 *
 * Both stay mounted while closed so the open/close transition runs (0.2s ease,
 * the brand's panel/modal duration). No backdrop blur — the brand has no glass;
 * the backdrop is a flat dim. Esc and backdrop-click both close.
 */
export function Dialog({
  open = false,
  onClose,
  title,
  children,
  footer,
  variant = 'modal',
  width,
  style,
}) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape' && onClose) onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const isPanel = variant === 'panel';

  const backdrop = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(8, 6, 3, 0.62)',
    opacity: open ? 1 : 0,
    pointerEvents: open ? 'auto' : 'none',
    transition: 'opacity var(--dur) var(--ease)',
    zIndex: 100,
  };

  const surface = isPanel
    ? {
        position: 'fixed', top: 0, right: 0, height: '100%',
        width: width || 460, maxWidth: '100%',
        background: 'var(--surface-raised)',
        borderLeft: '1px solid var(--border-default)',
        boxShadow: open ? 'var(--shadow-modal)' : 'none',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform var(--dur) var(--ease)',
        display: 'flex', flexDirection: 'column',
        zIndex: 101, fontFamily: 'var(--font-mono)',
      }
    : {
        position: 'fixed', top: '50%', left: '50%',
        width: width || 440, maxWidth: 'calc(100% - 32px)', maxHeight: 'calc(100% - 32px)',
        background: 'var(--surface-raised)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-modal)',
        transform: open ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -48%) scale(0.98)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity var(--dur) var(--ease), transform var(--dur) var(--ease)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        zIndex: 101, fontFamily: 'var(--font-mono)',
      };

  return (
    <>
      <div style={backdrop} onClick={onClose} aria-hidden={!open} />
      <div role="dialog" aria-modal="true" aria-hidden={!open} style={{ ...surface, ...style }}>
        {(title || onClose) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderBottom: '1px solid var(--border-default)', flex: '0 0 auto' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', flex: 1 }}>{title}</span>
            {onClose && (
              <button
                onClick={onClose}
                aria-label="Close"
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: 0 }}
              >
                ×
              </button>
            )}
          </div>
        )}
        <div style={{ padding: 16, overflowY: 'auto', flex: 1, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {children}
        </div>
        {footer && (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', padding: '12px 16px', borderTop: '1px solid var(--border-default)', flex: '0 0 auto' }}>
            {footer}
          </div>
        )}
      </div>
    </>
  );
}
