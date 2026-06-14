import React from 'react';

const CSS = `
.wf-exit{
  display:inline-flex; align-items:center; gap:6px;
  font-family:var(--font-mono); font-size:var(--text-2xs); font-weight:var(--fw-medium);
  border-radius:var(--radius-sm); padding:3px 7px; line-height:1; border:1px solid transparent;
}
.wf-exit__num{ font-weight:var(--fw-semibold); }
.wf-exit--0{ background:var(--ok-tint); color:var(--woad-700); border-color:var(--woad-100); }
.wf-exit--1{ background:var(--danger-tint); color:var(--madder-700); border-color:var(--madder-100); }
.wf-exit--2{ background:var(--warn-tint); color:var(--brass-700); border-color:var(--brass-100); }
`;

const LABELS = { 0: 'clean', 1: 'gate tripped', 2: 'error' };

function useStyle(id, css){
  React.useEffect(()=>{ if(document.getElementById(id))return; const el=document.createElement('style'); el.id=id; el.textContent=css; document.head.appendChild(el); },[id,css]);
}

/**
 * ExitCode — a process exit-code chip (0 clean / 1 gate tripped / 2 error).
 */
export function ExitCode({ code = 0, showLabel = true, label, className = '', ...rest }) {
  useStyle('wf-exit-css', CSS);
  const tone = code === 0 ? 0 : code === 2 ? 2 : 1;
  return (
    <span className={['wf-exit', `wf-exit--${tone}`, className].filter(Boolean).join(' ')} {...rest}>
      <span className="wf-exit__num">exit {code}</span>
      {showLabel && <span>· {label || LABELS[code] || ''}</span>}
    </span>
  );
}
