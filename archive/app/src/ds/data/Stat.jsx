import React from 'react';

/**
 * Stat — a single metric: big value, uppercase label, optional delta and a
 * tone dot. The footer counters and insight KPIs are built from these. Mono
 * throughout; the value uses the display face when `display` is set.
 *
 * Layout is `block` (stacked, for a KPI grid) or `inline` (label · value on one
 * row, for a dense footer strip).
 */
export function Stat({
  label,
  value,
  delta,
  deltaTone,
  tone,
  layout = 'block',
  display = false,
  style,
}) {
  const dotColor = tone || null;
  const deltaColor = deltaTone
    || (typeof delta === 'string' && delta.trim().startsWith('-') ? 'var(--stale)' : 'var(--ready)');

  if (layout === 'inline') {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 8, fontFamily: 'var(--font-mono)', ...style }}>
        {dotColor && <span style={{ width: 7, height: 7, borderRadius: '50%', background: dotColor, alignSelf: 'center', flex: '0 0 auto' }} />}
        <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{value}</span>
        {delta != null && <span style={{ fontSize: 11, color: deltaColor }}>{delta}</span>}
      </span>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontFamily: 'var(--font-mono)', ...style }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>
        {dotColor && <span style={{ width: 7, height: 7, borderRadius: '50%', background: dotColor, flex: '0 0 auto' }} />}
        {label}
      </span>
      <span style={{ display: 'flex', alignItems: 'baseline', gap: 9 }}>
        <span style={{
          fontFamily: display ? 'var(--font-display)' : 'var(--font-mono)',
          fontSize: display ? 34 : 26,
          fontWeight: display ? 700 : 600,
          letterSpacing: display ? '-0.02em' : '0',
          lineHeight: 1,
          color: 'var(--text-primary)',
        }}>{value}</span>
        {delta != null && <span style={{ fontSize: 12, fontWeight: 500, color: deltaColor }}>{delta}</span>}
      </span>
    </div>
  );
}
