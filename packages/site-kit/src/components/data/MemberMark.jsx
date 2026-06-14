import React from 'react';

export const WEFT_MEMBERS = {
  loomweave: { name: 'Loomweave', color: 'var(--member-loomweave)', domain: 'structure + SEI' },
  filigree:  { name: 'Filigree',  color: 'var(--member-filigree)',  domain: 'work state' },
  wardline:  { name: 'Wardline',  color: 'var(--member-wardline)',  domain: 'trust boundaries' },
  legis:     { name: 'Legis',     color: 'var(--member-legis)',     domain: 'governance' },
  charter:   { name: 'Charter',   color: 'var(--member-charter)',   domain: 'requirements' },
  warpline:    { name: 'Warpline',    color: 'var(--member-warpline)',    domain: 'change-impact' },
  lacuna:    { name: 'Lacuna',    color: 'var(--member-lacuna)',    domain: 'specimen' },
};

const CSS = `
.wf-member{ display:inline-flex; align-items:center; gap:7px; font-family:var(--font-mono); font-size:var(--text-xs); color:var(--text-body); white-space:nowrap; }
.wf-member__dot{ width:9px; height:9px; border-radius:2px; flex:none; box-shadow:inset 0 0 0 1px rgba(0,0,0,.08); }
.wf-member--lg{ font-size:var(--text-sm); }
.wf-member--lg .wf-member__dot{ width:11px; height:11px; }
.wf-member__domain{ color:var(--text-faint); }
`;

function useStyle(id, css){
  React.useEffect(()=>{ if(document.getElementById(id))return; const el=document.createElement('style'); el.id=id; el.textContent=css; document.head.appendChild(el); },[id,css]);
}

/**
 * MemberMark — a federation member's thread dot + name.
 */
export function MemberMark({ member = 'loomweave', size = 'md', showDomain = false, className = '', ...rest }) {
  useStyle('wf-member-css', CSS);
  const m = WEFT_MEMBERS[member] || WEFT_MEMBERS.loomweave;
  return (
    <span className={['wf-member', size === 'lg' && 'wf-member--lg', className].filter(Boolean).join(' ')} {...rest}>
      <span className="wf-member__dot" style={{ background: m.color }} />
      <span>{m.name}</span>
      {showDomain && <span className="wf-member__domain">· {m.domain}</span>}
    </span>
  );
}
