import React from 'react';

const CSS = `
.wf-badge{
  display:inline-flex; align-items:center; gap:5px;
  font-family:var(--font-mono); font-weight:var(--fw-medium); font-size:var(--text-2xs);
  letter-spacing:var(--tracking-mono); line-height:1; white-space:nowrap;
  padding:4px 8px; border-radius:var(--radius-pill);
  border:1px solid transparent; text-transform:none;
}
.wf-badge--solid{ color:#fff; }
.wf-badge .wf-badge__dot{ width:6px; height:6px; border-radius:50%; background:currentColor; }
/* tonal tones */
.wf-badge--neutral{ background:var(--linen-200); color:var(--ink-700); border-color:var(--linen-300); }
.wf-badge--ok{ background:var(--ok-tint); color:var(--woad-700); border-color:var(--woad-100); }
.wf-badge--warn{ background:var(--warn-tint); color:var(--brass-700); border-color:var(--brass-100); }
.wf-badge--danger{ background:var(--danger-tint); color:var(--madder-700); border-color:var(--madder-100); }
.wf-badge--info{ background:var(--info-tint); color:var(--indigo-700); border-color:var(--indigo-100); }
.wf-badge--absent{ background:var(--absent-tint); color:var(--ink-500); border-color:var(--thread-400); border-style:dashed; }
/* solid */
.wf-badge--ok.wf-badge--solid{ background:var(--ok); border-color:transparent; }
.wf-badge--warn.wf-badge--solid{ background:var(--warn); border-color:transparent; }
.wf-badge--danger.wf-badge--solid{ background:var(--danger); border-color:transparent; }
.wf-badge--info.wf-badge--solid{ background:var(--info); border-color:transparent; }
.wf-badge--neutral.wf-badge--solid{ background:var(--loom-800); border-color:transparent; }
`;

function useStyle(id, css){
  React.useEffect(()=>{ if(document.getElementById(id))return; const el=document.createElement('style'); el.id=id; el.textContent=css; document.head.appendChild(el); },[id,css]);
}

/**
 * Badge — a small tonal status pill.
 */
export function Badge({ tone = 'neutral', solid = false, dot = false, className = '', children, ...rest }) {
  useStyle('wf-badge-css', CSS);
  const cls = ['wf-badge', `wf-badge--${tone}`, solid && 'wf-badge--solid', className].filter(Boolean).join(' ');
  return (
    <span className={cls} {...rest}>
      {dot && <span className="wf-badge__dot" />}
      {children}
    </span>
  );
}
