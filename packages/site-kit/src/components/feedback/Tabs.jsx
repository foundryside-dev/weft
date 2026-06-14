import React from 'react';

const CSS = `
.wf-tabs{ display:flex; gap:2px; border-bottom:1px solid var(--border-hairline); font-family:var(--font-sans); }
.wf-tab{
  position:relative; appearance:none; border:0; background:transparent; cursor:pointer;
  font-family:inherit; font-size:var(--text-sm); font-weight:var(--fw-medium);
  color:var(--text-muted); padding:9px 13px; border-radius:var(--radius-sm) var(--radius-sm) 0 0;
  display:inline-flex; align-items:center; gap:7px;
  transition:color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out);
}
.wf-tab:hover{ color:var(--text-body); background:rgba(70,65,52,.05); }
.wf-tab--active{ color:var(--indigo-700); font-weight:var(--fw-semibold); }
.wf-tab--active::after{
  content:""; position:absolute; left:6px; right:6px; bottom:-1px; height:2px;
  background:var(--indigo-600); border-radius:2px 2px 0 0;
}
.wf-tab__count{ font-family:var(--font-mono); font-size:var(--text-2xs); color:var(--text-faint); background:var(--linen-200); padding:1px 6px; border-radius:var(--radius-pill); }
.wf-tab--active .wf-tab__count{ color:var(--indigo-700); background:var(--indigo-50); }
`;

function useStyle(id, css){
  React.useEffect(()=>{ if(document.getElementById(id))return; const el=document.createElement('style'); el.id=id; el.textContent=css; document.head.appendChild(el); },[id,css]);
}

/**
 * Tabs — underline-style segmented navigation.
 */
export function Tabs({ items = [], value, onChange = () => {}, className = '' }) {
  useStyle('wf-tabs-css', CSS);
  return (
    <div className={['wf-tabs', className].filter(Boolean).join(' ')} role="tablist">
      {items.map((it) => {
        const active = it.id === value;
        return (
          <button
            key={it.id}
            role="tab"
            aria-selected={active}
            className={['wf-tab', active && 'wf-tab--active'].filter(Boolean).join(' ')}
            onClick={() => onChange(it.id)}
          >
            {it.icon}
            {it.label}
            {it.count != null && <span className="wf-tab__count">{it.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
