import React from 'react';

const CSS = `
.wf-fresh{ display:inline-flex; flex-direction:column; gap:5px; font-family:var(--font-mono); min-width:140px; }
.wf-fresh__top{ display:flex; align-items:baseline; justify-content:space-between; gap:10px; font-size:var(--text-2xs); }
.wf-fresh__label{ color:var(--text-muted); letter-spacing:var(--tracking-mono); }
.wf-fresh__pct{ font-weight:var(--fw-semibold); color:var(--text-strong); }
.wf-fresh__track{ height:6px; border-radius:var(--radius-pill); background:var(--linen-200); overflow:hidden; box-shadow:var(--shadow-inset); }
.wf-fresh__fill{ height:100%; border-radius:var(--radius-pill); transition:width var(--dur-slow) var(--ease-out); }
.wf-fresh__fill--ok{ background:var(--ok); }
.wf-fresh__fill--warn{ background:var(--warn); }
.wf-fresh__fill--danger{ background:var(--danger); }
.wf-fresh__stale{ font-size:var(--text-2xs); color:var(--text-faint); display:flex; align-items:center; gap:5px; }
.wf-fresh__staledot{ width:6px; height:6px; border-radius:50%; background:var(--brass-500); }
.wf-fresh__staledot--fresh{ background:var(--ok); }
`;

function useStyle(id, css){
  React.useEffect(()=>{ if(document.getElementById(id))return; const el=document.createElement('style'); el.id=id; el.textContent=css; document.head.appendChild(el); },[id,css]);
}

/**
 * FreshnessMeter — completeness bar + staleness note. Weft answers carry both;
 * so does this component.
 */
export function FreshnessMeter({ completeness = 1, staleness = 'fresh', label = 'completeness', className = '', ...rest }) {
  useStyle('wf-fresh-css', CSS);
  const pct = Math.max(0, Math.min(1, completeness));
  const tone = pct >= 0.95 ? 'ok' : pct >= 0.6 ? 'warn' : 'danger';
  const isFresh = staleness === 'fresh' || staleness === 'current';
  return (
    <div className={['wf-fresh', className].filter(Boolean).join(' ')} {...rest}>
      <div className="wf-fresh__top">
        <span className="wf-fresh__label">{label}</span>
        <span className="wf-fresh__pct">{Math.round(pct * 100)}%</span>
      </div>
      <div className="wf-fresh__track">
        <div className={`wf-fresh__fill wf-fresh__fill--${tone}`} style={{ width: `${pct * 100}%` }} />
      </div>
      {staleness != null && (
        <div className="wf-fresh__stale">
          <span className={['wf-fresh__staledot', isFresh && 'wf-fresh__staledot--fresh'].filter(Boolean).join(' ')} />
          staleness: {staleness}
        </div>
      )}
    </div>
  );
}
