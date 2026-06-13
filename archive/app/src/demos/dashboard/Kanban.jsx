// Kanban.jsx — ported from ui_kits/filigree-dashboard/Kanban.jsx to ESM.
//   const { useState } = React → import; window IssueCard → import from ds;
//   data constants → import from ./data; Object.assign(window,…) removed.
// The board owns column layout + bucketing; cards are the library <IssueCard>.
import React from 'react';
import { IssueCard } from '../../ds/index.js';
import { CATEGORY_COLORS } from './data.js';

function Column({ label, color, items, onOpen }) {
  return (
    <div style={{ minWidth: 260, flex: '1 1 0', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9, padding: '0 4px' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
        <span style={{ fontWeight: 600, fontSize: 12, color: 'var(--text-primary)' }}>{label}</span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{items.length}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto', paddingRight: 4, minHeight: 160 }}>
        {items.length ? (
          items.map((i) => <IssueCard key={i.id} issue={i} onOpen={onOpen} />)
        ) : (
          <div style={{ fontSize: 12, color: 'var(--text-muted)', padding: 16, textAlign: 'center' }}>No issues</div>
        )}
      </div>
    </div>
  );
}

export function Kanban({ issues, onOpen }) {
  const cols = { open: [], wip: [], done: [] };
  issues.forEach((i) => cols[i.cat] && cols[i.cat].push(i));
  return (
    <div style={{ display: 'flex', gap: 16, padding: 16, flex: 1, overflowX: 'auto', backgroundImage: 'var(--weave-warp)' }}>
      <Column label="Open" color={CATEGORY_COLORS.open} items={cols.open} onOpen={onOpen} />
      <Column label="In Progress" color={CATEGORY_COLORS.wip} items={cols.wip} onOpen={onOpen} />
      <Column label="Done" color={CATEGORY_COLORS.done} items={cols.done} onOpen={onOpen} />
    </div>
  );
}
