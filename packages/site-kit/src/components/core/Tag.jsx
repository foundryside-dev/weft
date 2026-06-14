import React from 'react';

const CSS = `
.wf-tag{
  display:inline-flex; align-items:center; gap:6px;
  font-family:var(--font-sans); font-weight:var(--fw-medium); font-size:var(--text-xs); line-height:1;
  padding:5px 9px; border-radius:var(--radius-sm);
  background:var(--surface-card); color:var(--text-body);
  border:1px solid var(--border-hairline);
}
.wf-tag__dot{ width:8px; height:8px; border-radius:2px; flex:none; }
.wf-tag__x{
  display:inline-flex; align-items:center; justify-content:center; cursor:pointer;
  width:14px; height:14px; margin-right:-2px; border-radius:3px; color:var(--text-faint);
  border:0; background:transparent; font-family:var(--font-mono); font-size:13px; line-height:1;
}
.wf-tag__x:hover{ background:rgba(70,65,52,.10); color:var(--text-body); }
`;

function useStyle(id, css){
  React.useEffect(()=>{ if(document.getElementById(id))return; const el=document.createElement('style'); el.id=id; el.textContent=css; document.head.appendChild(el); },[id,css]);
}

/**
 * Tag — a label chip, optionally color-dotted or removable.
 */
export function Tag({ color = null, onRemove = null, className = '', children, ...rest }) {
  useStyle('wf-tag-css', CSS);
  return (
    <span className={['wf-tag', className].filter(Boolean).join(' ')} {...rest}>
      {color && <span className="wf-tag__dot" style={{ background: color }} />}
      {children}
      {onRemove && (
        <button type="button" className="wf-tag__x" aria-label="Remove" onClick={onRemove}>×</button>
      )}
    </span>
  );
}
