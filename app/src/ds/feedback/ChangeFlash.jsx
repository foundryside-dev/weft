import React, { useEffect, useRef, useState } from 'react';

/**
 * ChangeFlash — wraps any element and emits the brand's one-shot accent
 * box-shadow pulse whenever `flashKey` changes (e.g. a card's data updated).
 * This is the system's *only* ambient-ish motion besides the terminal cursor:
 * a brief bloom that fades, not a loop. Respects prefers-reduced-motion (the
 * pulse is skipped, the content still updates).
 *
 * Wrap the element whose data changes; bump `flashKey` to whatever value should
 * trigger the pulse (a version number, updatedAt, JSON.stringify(row), …).
 */
export function ChangeFlash({ flashKey, color = 'var(--accent)', children, style }) {
  const [on, setOn] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return undefined; }
    const reduce = typeof window !== 'undefined'
      && window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;
    setOn(true);
    const t = setTimeout(() => setOn(false), 600);
    return () => clearTimeout(t);
  }, [flashKey]);

  return (
    <div
      style={{
        borderRadius: 'var(--radius)',
        boxShadow: on ? `0 0 0 1px ${color}, 0 0 12px -1px ${color}` : '0 0 0 0 transparent',
        transition: 'box-shadow 0.6s var(--ease)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
