import React from 'react';
import { Mark } from '../marks/Mark.jsx';

/**
 * Dossier — the SEI-keyed entity view: one durable code entity, with a row of
 * facts woven from each federation tool (Loomweave structure, Wardline taint,
 * Legis governance, Filigree work, Charter obligations). Each fact carries its
 * member's Mark and thread color on the left.
 *
 * This is the brand's central "composition" artifact — five tools enriching one
 * identity, never load-bearing.
 */
const THREADS = {
  loomweave: 'var(--thread-loomweave)',
  filigree: 'var(--thread-filigree)',
  wardline: 'var(--thread-wardline)',
  legis: 'var(--thread-legis)',
  charter: 'var(--thread-charter)',
  shuttle: 'var(--thread-shuttle)',
};
const LABELS = {
  loomweave: 'Loomweave', filigree: 'Filigree', wardline: 'Wardline',
  legis: 'Legis', charter: 'Charter', shuttle: 'Shuttle',
};

export function Dossier({ entity, sei, fresh = true, facts = [], style }) {
  return (
    <div
      style={{
        background: 'var(--surface-raised)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        fontFamily: 'var(--font-mono)',
        ...style,
      }}
    >
      <div style={{ padding: '13px 16px', borderBottom: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: 'var(--text-muted)' }}>◆</span>
        <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 600 }}>{entity}</span>
        {sei && (
          <span style={{ fontSize: 10.5, color: 'var(--text-muted)', background: 'var(--surface-overlay)', padding: '2px 7px', borderRadius: 'var(--radius-sm)' }}>
            {sei}
          </span>
        )}
        {fresh && <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--ready)' }}>● fresh</span>}
      </div>
      {facts.map((f, idx) => {
        const thread = THREADS[f.member] || 'var(--accent)';
        return (
          <div
            key={idx}
            style={{
              display: 'flex', alignItems: 'center', gap: 11, padding: '10px 16px',
              borderBottom: idx === facts.length - 1 ? 'none' : '1px solid var(--border-default)',
            }}
          >
            <Mark name={f.member} size={18} style={{ color: thread, flex: '0 0 auto' }} />
            <span style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: thread, width: 78, flex: '0 0 auto' }}>
              {LABELS[f.member] || f.member}
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', flex: 1 }}>{f.value}</span>
          </div>
        );
      })}
    </div>
  );
}
