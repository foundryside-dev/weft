import React from 'react';

const CSS = `
.wf-field{ display:flex; flex-direction:column; gap:6px; font-family:var(--font-sans); }
.wf-field__label{ font-size:var(--text-sm); font-weight:var(--fw-semibold); color:var(--text-body); }
.wf-field__hint{ font-size:var(--text-xs); color:var(--text-muted); }
.wf-field__hint--error{ color:var(--madder-600); }
.wf-input{
  display:flex; align-items:center; gap:8px;
  background:var(--bg-sunken); border:1px solid var(--border-strong);
  border-radius:var(--radius-md); padding:0 10px; height:36px;
  box-shadow:var(--shadow-inset);
  transition:border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}
.wf-input:focus-within{ border-color:var(--border-focus); box-shadow:var(--ring); }
.wf-input--error{ border-color:var(--madder-500); }
.wf-input--mono input{ font-family:var(--font-mono); font-size:var(--text-sm); }
.wf-input input{
  flex:1; min-width:0; border:0; background:transparent; outline:none;
  font-family:var(--font-sans); font-size:var(--text-base); color:var(--text-strong);
}
.wf-input input::placeholder{ color:var(--text-faint); }
.wf-input__affix{ color:var(--text-faint); display:inline-flex; flex:none; }
.wf-input--disabled{ opacity:.55; pointer-events:none; }
`;

function useStyle(id, css){
  React.useEffect(()=>{ if(document.getElementById(id))return; const el=document.createElement('style'); el.id=id; el.textContent=css; document.head.appendChild(el); },[id,css]);
}

/**
 * Input — labelled text field with optional affixes and error state.
 */
export function Input({
  label, hint, error, mono = false, disabled = false,
  prefix = null, suffix = null, id, className = '', ...rest
}) {
  useStyle('wf-input-css', CSS);
  const fid = id || React.useId();
  const boxCls = ['wf-input', mono && 'wf-input--mono', error && 'wf-input--error', disabled && 'wf-input--disabled'].filter(Boolean).join(' ');
  return (
    <div className={['wf-field', className].filter(Boolean).join(' ')}>
      {label && <label className="wf-field__label" htmlFor={fid}>{label}</label>}
      <div className={boxCls}>
        {prefix && <span className="wf-input__affix">{prefix}</span>}
        <input id={fid} disabled={disabled} {...rest} />
        {suffix && <span className="wf-input__affix">{suffix}</span>}
      </div>
      {(hint || error) && (
        <span className={['wf-field__hint', error && 'wf-field__hint--error'].filter(Boolean).join(' ')}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
