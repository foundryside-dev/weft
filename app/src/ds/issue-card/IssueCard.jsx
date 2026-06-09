import React, { useState } from 'react';

/**
 * IssueCard — the canonical Filigree kanban card, faithful to the real
 * dashboard's renderCard. A type-colored 4px left rule (or a semantic
 * ready/aging rule with a soft fiber glow), the type emoji, a priority marker
 * (P0/P1 number, else a dot), the title, then a metadata row of id / type /
 * status tag / blockers / impact / assignee / age.
 *
 * Color is rationed and semantic throughout — the rule is the only "fill".
 */

const TYPE_ICONS = { bug: '🐛', feature: '✨', task: '📋', epic: '📊', milestone: '🎯' };
const TYPE_COLORS = { bug: '#E25C49', feature: '#B79BF2', task: '#56B7E2', epic: '#E9B04A', milestone: '#5FB98E' };
const CATEGORY_COLORS = { open: '#8A7A64', wip: '#56B7E2', done: '#897C66' };
const PRIORITY_COLORS = { 0: '#E25C49', 1: '#EC8A3C', 2: '#8A7A64', 3: '#C9BBA0', 4: '#C9BBA0' };

function AgeLabel({ issue }) {
  if (issue.cat !== 'wip' || !issue.ageH) return null;
  const h = issue.ageH;
  if (h < 1) return <span style={{ color: 'var(--text-muted)' }}>{Math.round(h * 60)}m</span>;
  if (h < 24) return <span style={{ color: h > 4 ? 'var(--aging)' : 'var(--text-muted)' }}>{h}h</span>;
  return <span style={{ color: 'var(--stale)' }}>{Math.floor(h / 24)}d</span>;
}

export function IssueCard({ issue, onOpen, style }) {
  const [hover, setHover] = useState(false);
  const typeColor = TYPE_COLORS[issue.type] || '#8A7A64';
  const prioColor = PRIORITY_COLORS[issue.priority];
  const catColor = CATEGORY_COLORS[issue.cat] || '#8A7A64';
  const blockedBy = issue.blocked_by || issue.blockedBy || [];
  const openBlocks = blockedBy.length;
  const ready = issue.ready && issue.cat === 'open';
  const agingBorder =
    issue.cat === 'wip' && issue.ageH > 24 ? 'var(--stale)' : issue.cat === 'wip' && issue.ageH > 4 ? 'var(--aging)' : null;

  const border = '1px solid var(--border-default)';
  const leftBorder = ready ? '4px solid var(--ready)' : agingBorder ? `4px solid ${agingBorder}` : border;
  const glow = ready ? '-2px 0 9px -4px var(--ready)' : agingBorder ? `-2px 0 9px -4px ${agingBorder}` : 'none';

  return (
    <div
      onClick={() => onOpen && onOpen(issue)}
      tabIndex={0}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        background: hover ? 'var(--surface-hover)' : 'var(--surface-raised)',
        border,
        borderLeft: leftBorder,
        borderRadius: 'var(--radius)',
        padding: '10px 11px 10px 16px',
        cursor: onOpen ? 'pointer' : 'default',
        boxShadow: glow,
        transition: 'box-shadow .15s, border-color .15s',
        fontFamily: 'var(--font-mono)',
        ...style,
      }}
    >
      {!ready && !agingBorder && (
        <div
          style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
            borderRadius: 'var(--radius) 0 0 var(--radius)',
            background: typeColor, boxShadow: `0 0 7px -1px ${typeColor}`,
          }}
        />
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
        <span style={{ fontSize: 13 }}>{TYPE_ICONS[issue.type]}</span>
        {issue.priority <= 1 ? (
          <span style={{ fontSize: 11, fontWeight: 700, color: prioColor }}>P{issue.priority}</span>
        ) : (
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: prioColor, flex: '0 0 auto' }} />
        )}
        <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 12.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {issue.title}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11, color: 'var(--text-muted)', flexWrap: 'wrap' }}>
        <span style={{ background: 'var(--surface-overlay)', color: 'var(--text-primary)', padding: '1px 6px', borderRadius: 'var(--radius-sm)' }}>{issue.id}</span>
        <span style={{ background: 'var(--surface-overlay)', color: 'var(--text-secondary)', padding: '1px 6px', borderRadius: 'var(--radius-sm)' }}>{issue.type}</span>
        <span style={{ background: `color-mix(in srgb, ${catColor} 20%, transparent)`, color: catColor, padding: '1px 6px', borderRadius: 'var(--radius-sm)' }}>{issue.status}</span>
        {openBlocks > 0 && <span style={{ color: 'var(--stale)' }}>🔗 blocked by {openBlocks}</span>}
        {issue.impact > 0 && <span style={{ color: 'var(--aging)' }}>⚡{issue.impact}</span>}
        {issue.assignee && <span style={{ color: 'var(--text-secondary)' }}>👤 {issue.assignee}</span>}
        <AgeLabel issue={issue} />
      </div>
    </div>
  );
}
