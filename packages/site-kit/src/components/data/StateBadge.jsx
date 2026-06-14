import React from 'react';

const STATES = {
  // task
  open:        { label: 'open',        tone: 'neutral' },
  in_progress: { label: 'in progress', tone: 'active' },
  closed:      { label: 'closed',      tone: 'done' },
  // feature
  proposed:    { label: 'proposed',    tone: 'neutral' },
  approved:    { label: 'approved',    tone: 'info' },
  building:    { label: 'building',    tone: 'active' },
  reviewing:   { label: 'reviewing',   tone: 'review' },
  done:        { label: 'done',        tone: 'done' },
  // bug
  triage:      { label: 'triage',      tone: 'neutral' },
  confirmed:   { label: 'confirmed',   tone: 'info' },
  fixing:      { label: 'fixing',      tone: 'active' },
  verifying:   { label: 'verifying',   tone: 'review' },
  wont_fix:    { label: "won't fix",   tone: 'dropped' },
  not_a_bug:   { label: 'not a bug',   tone: 'dropped' },
};

const CSS = `
.wf-state{
  display:inline-flex; align-items:center; gap:6px;
  font-family:var(--font-mono); font-size:var(--text-2xs); font-weight:var(--fw-medium); line-height:1;
  padding:4px 8px; border-radius:var(--radius-pill); border:1px solid transparent; white-space:nowrap;
}
.wf-state__dot{ width:6px; height:6px; border-radius:50%; flex:none; }
.wf-state--neutral{ background:var(--linen-200); color:var(--ink-600); border-color:var(--linen-300); }
.wf-state--neutral .wf-state__dot{ background:var(--ash-500); }
.wf-state--info{ background:var(--indigo-50); color:var(--indigo-700); border-color:var(--indigo-100); }
.wf-state--info .wf-state__dot{ background:var(--indigo-500); }
.wf-state--active{ background:var(--indigo-600); color:#fff; border-color:transparent; }
.wf-state--active .wf-state__dot{ background:#fff; }
.wf-state--review{ background:var(--warn-tint); color:var(--brass-700); border-color:var(--brass-100); }
.wf-state--review .wf-state__dot{ background:var(--brass-500); }
.wf-state--done{ background:var(--ok-tint); color:var(--woad-700); border-color:var(--woad-100); }
.wf-state--done .wf-state__dot{ background:var(--ok); }
.wf-state--dropped{ background:transparent; color:var(--ink-400); border-color:var(--thread-400); border-style:dashed; }
.wf-state--dropped .wf-state__dot{ background:var(--thread-400); }
`;

function useStyle(id, css){
  React.useEffect(()=>{ if(document.getElementById(id))return; const el=document.createElement('style'); el.id=id; el.textContent=css; document.head.appendChild(el); },[id,css]);
}

/**
 * StateBadge — a Filigree workflow-state pill (task/feature/bug state machines).
 */
export function StateBadge({ state = 'open', className = '', ...rest }) {
  useStyle('wf-state-css', CSS);
  const s = STATES[state] || { label: state, tone: 'neutral' };
  return (
    <span className={['wf-state', `wf-state--${s.tone}`, className].filter(Boolean).join(' ')} {...rest}>
      <span className="wf-state__dot" />
      {s.label}
    </span>
  );
}
