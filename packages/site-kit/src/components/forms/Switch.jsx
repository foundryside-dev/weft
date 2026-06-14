import React from 'react';

const CSS = `
.wf-switch{ display:inline-flex; align-items:center; gap:10px; cursor:pointer; font-family:var(--font-sans); user-select:none; }
.wf-switch--disabled{ opacity:.5; cursor:not-allowed; }
.wf-switch__track{
  position:relative; width:38px; height:22px; flex:none;
  background:var(--thread-400); border-radius:var(--radius-pill);
  transition:background var(--dur-mid) var(--ease-out);
}
.wf-switch input{ position:absolute; opacity:0; width:0; height:0; }
.wf-switch__thumb{
  position:absolute; top:2px; left:2px; width:18px; height:18px;
  background:#fff; border-radius:50%; box-shadow:var(--shadow-sm);
  transition:transform var(--dur-mid) var(--ease-out);
}
.wf-switch input:checked + .wf-switch__track{ background:var(--indigo-600); }
.wf-switch input:checked + .wf-switch__track .wf-switch__thumb{ transform:translateX(16px); }
.wf-switch input:focus-visible + .wf-switch__track{ box-shadow:var(--ring); }
.wf-switch__label{ font-size:var(--text-sm); color:var(--text-body); }
`;

function useStyle(id, css){
  React.useEffect(()=>{ if(document.getElementById(id))return; const el=document.createElement('style'); el.id=id; el.textContent=css; document.head.appendChild(el); },[id,css]);
}

/**
 * Switch — a binary toggle (e.g. enable a Legis cell, turn the judge on).
 */
export function Switch({ checked, defaultChecked, onChange, disabled = false, label, className = '', ...rest }) {
  useStyle('wf-switch-css', CSS);
  return (
    <label className={['wf-switch', disabled && 'wf-switch--disabled', className].filter(Boolean).join(' ')}>
      <input type="checkbox" role="switch" checked={checked} defaultChecked={defaultChecked} onChange={onChange} disabled={disabled} {...rest} />
      <span className="wf-switch__track"><span className="wf-switch__thumb" /></span>
      {label && <span className="wf-switch__label">{label}</span>}
    </label>
  );
}
