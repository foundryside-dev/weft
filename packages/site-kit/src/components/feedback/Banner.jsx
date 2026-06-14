import React from 'react';

const CSS = `
.wf-banner{
  display:flex; gap:11px; align-items:flex-start;
  font-family:var(--font-sans); font-size:var(--text-sm); line-height:var(--leading-normal);
  border:1px solid var(--border-hairline); border-radius:var(--radius-md);
  padding:12px 14px; background:var(--surface-card); color:var(--text-body);
}
.wf-banner__accent{ width:3px; align-self:stretch; border-radius:2px; background:var(--ink-400); flex:none; }
.wf-banner__body{ flex:1; min-width:0; }
.wf-banner__title{ font-weight:var(--fw-semibold); color:var(--text-strong); margin-bottom:2px; }
.wf-banner__icon{ flex:none; display:inline-flex; margin-top:1px; color:var(--ink-500); }
.wf-banner--ok{ background:var(--ok-tint); border-color:var(--woad-100); }
.wf-banner--ok .wf-banner__accent, .wf-banner--ok .wf-banner__icon{ background:var(--ok); color:var(--ok); }
.wf-banner--warn{ background:var(--warn-tint); border-color:var(--brass-100); }
.wf-banner--warn .wf-banner__accent, .wf-banner--warn .wf-banner__icon{ background:var(--warn); color:var(--warn); }
.wf-banner--danger{ background:var(--danger-tint); border-color:var(--madder-100); }
.wf-banner--danger .wf-banner__accent, .wf-banner--danger .wf-banner__icon{ background:var(--danger); color:var(--danger); }
.wf-banner--info{ background:var(--info-tint); border-color:var(--indigo-100); }
.wf-banner--info .wf-banner__accent, .wf-banner--info .wf-banner__icon{ background:var(--info); color:var(--info); }
`;

function useStyle(id, css){
  React.useEffect(()=>{ if(document.getElementById(id))return; const el=document.createElement('style'); el.id=id; el.textContent=css; document.head.appendChild(el); },[id,css]);
}

/**
 * Banner — an inline message strip (honest status, never a toast for errors).
 */
export function Banner({ tone = 'neutral', title, icon = null, className = '', children, ...rest }) {
  useStyle('wf-banner-css', CSS);
  const cls = ['wf-banner', tone !== 'neutral' && `wf-banner--${tone}`, className].filter(Boolean).join(' ');
  return (
    <div className={cls} role={tone === 'danger' ? 'alert' : 'status'} {...rest}>
      <span className="wf-banner__accent" />
      {icon && <span className="wf-banner__icon">{icon}</span>}
      <div className="wf-banner__body">
        {title && <div className="wf-banner__title">{title}</div>}
        {children}
      </div>
    </div>
  );
}
