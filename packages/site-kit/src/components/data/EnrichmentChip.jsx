import React from 'react';

const CSS = `
.wf-enr{
  display:inline-flex; align-items:center; gap:6px;
  font-family:var(--font-mono); font-size:var(--text-2xs); line-height:1;
  border-radius:var(--radius-sm); padding:3px 7px 3px 6px; border:1px solid transparent; white-space:nowrap;
}
.wf-enr__mark{ width:7px; height:7px; flex:none; border-radius:50%; }
.wf-enr__peer{ color:var(--text-faint); }
/* present: solid woad dot */
.wf-enr--present{ background:var(--ok-tint); color:var(--woad-700); border-color:var(--woad-100); }
.wf-enr--present .wf-enr__mark{ background:var(--ok); }
/* absent: peer present, no fact — hollow ash dot */
.wf-enr--absent{ background:var(--absent-tint); color:var(--ink-600); border-color:var(--thread-400); }
.wf-enr--absent .wf-enr__mark{ background:transparent; box-shadow:inset 0 0 0 1.5px var(--ash-500); }
/* unavailable: peer unreachable — dashed border, dim */
.wf-enr--unavailable{ background:transparent; color:var(--ink-500); border-color:var(--thread-400); border-style:dashed; }
.wf-enr--unavailable .wf-enr__mark{ background:transparent; box-shadow:inset 0 0 0 1.5px var(--thread-400); }
/* stale / partial: brass */
.wf-enr--stale, .wf-enr--partial{ background:var(--warn-tint); color:var(--brass-700); border-color:var(--brass-100); }
.wf-enr--stale .wf-enr__mark, .wf-enr--partial .wf-enr__mark{ background:var(--warn); }
/* skipped: neutral */
.wf-enr--skipped{ background:var(--linen-200); color:var(--ink-500); border-color:var(--linen-300); }
.wf-enr--skipped .wf-enr__mark{ background:var(--ash-400); }
`;

function useStyle(id, css){
  React.useEffect(()=>{ if(document.getElementById(id))return; const el=document.createElement('style'); el.id=id; el.textContent=css; document.head.appendChild(el); },[id,css]);
}

/**
 * EnrichmentChip — a CLOSED-vocabulary federation enrichment state. Sibling
 * absence is explicit; never an implied clean state.
 */
export function EnrichmentChip({ state = 'present', peer = null, className = '', ...rest }) {
  useStyle('wf-enr-css', CSS);
  return (
    <span className={['wf-enr', `wf-enr--${state}`, className].filter(Boolean).join(' ')} {...rest}>
      <span className="wf-enr__mark" />
      {peer && <span className="wf-enr__peer">{peer}</span>}
      <span>{state}</span>
    </span>
  );
}
