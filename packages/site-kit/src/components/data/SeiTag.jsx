import React from 'react';

const CSS = `
.wf-sei{
  display:inline-flex; align-items:center; gap:6px; max-width:100%;
  font-family:var(--font-mono); font-size:var(--text-xs); line-height:1;
  background:var(--indigo-50); color:var(--indigo-700);
  border:1px solid var(--indigo-100); border-radius:var(--radius-sm);
  padding:4px 7px;
}
.wf-sei__scheme{ color:var(--indigo-300); }
.wf-sei__val{ overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.wf-sei__copy{
  appearance:none; border:0; background:transparent; cursor:pointer; padding:0; margin-left:1px;
  color:var(--indigo-500); display:inline-flex; flex:none; opacity:.7;
}
.wf-sei__copy:hover{ opacity:1; }
.wf-sei--plain{ background:transparent; border-color:transparent; padding:0; }
`;

function useStyle(id, css){
  React.useEffect(()=>{ if(document.getElementById(id))return; const el=document.createElement('style'); el.id=id; el.textContent=css; document.head.appendChild(el); },[id,css]);
}

/**
 * SeiTag — renders a Stable Entity Identity token (opaque; never parsed).
 */
export function SeiTag({ value = 'loomweave:eid:0000', truncate = 10, copyable = false, plain = false, className = '', ...rest }) {
  useStyle('wf-sei-css', CSS);
  const [copied, setCopied] = React.useState(false);
  const idx = value.indexOf(':eid:');
  const scheme = idx >= 0 ? value.slice(0, idx + 5) : '';
  let rest2 = idx >= 0 ? value.slice(idx + 5) : value;
  if (truncate && rest2.length > truncate) rest2 = rest2.slice(0, truncate) + '…';
  const copy = () => {
    try { navigator.clipboard?.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1200); } catch (e) {}
  };
  return (
    <span className={['wf-sei', plain && 'wf-sei--plain', className].filter(Boolean).join(' ')} title={value} {...rest}>
      {scheme && <span className="wf-sei__scheme">{scheme}</span>}
      <span className="wf-sei__val">{rest2}</span>
      {copyable && (
        <button type="button" className="wf-sei__copy" aria-label="Copy SEI" onClick={copy}>
          {copied ? '✓' : '⧉'}
        </button>
      )}
    </span>
  );
}
