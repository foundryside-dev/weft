// DetailPanel.jsx — ported from ui_kits/filigree-dashboard/DetailPanel.jsx to ESM.
//   window Dialog/Tag/Button → import from ds; data constants → import from
//   ./data; Object.assign(window,…) removed. Field content only; the panel
//   chrome (slide-in, backdrop, header, footer) is the library Dialog's.
import React from 'react';
import { Dialog, Tag, Button } from '../../ds/index.js';
import { CATEGORY_COLORS, PRIORITY_COLORS, PRIORITY_LABEL, TYPE_ICONS } from './data.js';

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div className="t-label" style={{ marginBottom: 6 }}>{label}</div>
      {children}
    </div>
  );
}

export function DetailPanel({ issue, onClose, onNotify }) {
  const i = issue || {};
  const catColor = CATEGORY_COLORS[i.cat] || '#8A7A64';
  const prioColor = PRIORITY_COLORS[i.priority];

  const title = issue ? (
    <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      <span style={{ fontSize: 15 }}>{TYPE_ICONS[i.type]}</span>
      <span style={{ fontSize: 12, background: 'var(--surface-overlay)', color: 'var(--text-primary)', padding: '2px 7px', borderRadius: 'var(--radius-sm)' }}>{i.id}</span>
      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{i.type}</span>
    </span>
  ) : null;

  const footer = issue ? (
    <>
      <Button variant="secondary" onClick={() => onNotify && onNotify({ tone: 'var(--text-secondary)', icon: '👤', title: 'Claimed', body: i.id + ' · assigned to you' })}>Claim</Button>
      <Button variant="primary" onClick={() => onNotify && onNotify({ tone: 'var(--ready)', icon: '▸', title: 'State advanced', body: i.id + ' → next · context.md regenerated' })}>Advance state</Button>
    </>
  ) : null;

  return (
    <Dialog variant="panel" open={!!issue} onClose={onClose} title={title} footer={footer} width={460}>
      {issue && (
        <>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 16px', lineHeight: 1.3 }}>{i.title}</h2>
          <div style={{ display: 'flex', gap: 22, marginBottom: 18, flexWrap: 'wrap' }}>
            <div>
              <div className="t-label" style={{ marginBottom: 6 }}>Status</div>
              <Tag tone={catColor}>{i.status}</Tag>
            </div>
            <div>
              <div className="t-label" style={{ marginBottom: 6 }}>Priority</div>
              <span style={{ fontSize: 12, color: prioColor, fontWeight: 600 }}>P{i.priority} · {PRIORITY_LABEL[i.priority]}</span>
            </div>
            <div>
              <div className="t-label" style={{ marginBottom: 6 }}>Assignee</div>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{i.assignee ? '👤 ' + i.assignee : '— unassigned'}</span>
            </div>
          </div>
          <Field label="Description">
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{i.body}</p>
          </Field>
          <Field label="Dependencies">
            {i.blocked_by && i.blocked_by.length ? (
              i.blocked_by.map((b) => <div key={b} style={{ fontSize: 12, color: 'var(--stale)', marginBottom: 4 }}>🔗 blocked by {b}</div>)
            ) : i.deps && i.deps.length ? (
              i.deps.map((d) => <div key={d} style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>↳ depends on {d}</div>)
            ) : (
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>No blockers · ready to work</div>
            )}
            {i.impact > 0 && <div style={{ fontSize: 12, color: 'var(--aging)', marginTop: 4 }}>⚡ blocks {i.impact} downstream</div>}
          </Field>
          <Field label="Activity">
            <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.7 }}>
              <div>· created via MCP <span style={{ color: 'var(--text-secondary)' }}>issue_create</span></div>
              <div>· transitioned → <span style={{ color: catColor }}>{i.status}</span></div>
              <div>· context.md regenerated</div>
            </div>
          </Field>
        </>
      )}
    </Dialog>
  );
}
