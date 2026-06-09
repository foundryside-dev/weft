// WeftCliTerminal.jsx — ported from ui_kits/weft-cli/Terminal.jsx to ESM:
//   const { useState } = React → import; window Mark/Tabs → import from ds (the
//   CliData.jsx window-alias file disappears entirely); App renamed
//   WeftCliTerminal; self-mount block removed. The @keyframes blink that lived in
//   the kit's index.html now lives in app.css (reduced-motion guarded).
// The kit-local terminal line primitives (L / Prompt / Tag) stay local — they're
// a bespoke monospace renderer, not general UI.
import React, { useState } from 'react';
import { Mark, Tabs } from '../../ds/index.js';

// line kinds → color
const K = {
  cmd: { color: 'var(--text-primary)' },
  ps: { color: 'var(--ready)' },
  out: { color: 'var(--text-secondary)' },
  dim: { color: 'var(--text-muted)' },
  ok: { color: 'var(--ready)' },
  warn: { color: 'var(--aging)' },
  err: { color: 'var(--stale)' },
  acc: { color: 'var(--accent)' },
};
const thread = (id) => ({ color: `var(--thread-${id})` });

function L({ k = 'out', ind = 0, children }) {
  return <div style={{ ...K[k], paddingLeft: ind * 14, whiteSpace: 'pre-wrap' }}>{children}</div>;
}
function Prompt({ tool, cmd }) {
  return (
    <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
      <span style={K.ps}>$</span>
      <span style={{ color: 'var(--text-primary)' }}>
        {tool} <span style={{ color: 'var(--text-secondary)' }}>{cmd}</span>
      </span>
    </div>
  );
}
function CliTag({ id, children }) {
  return (
    <span style={{ ...thread(id), border: '1px solid currentColor', borderRadius: 'var(--radius-sm)', padding: '0 5px', fontSize: 11, marginRight: 6 }}>
      {children}
    </span>
  );
}

const SESSIONS = {
  wardline: {
    member: 'wardline',
    label: 'wardline scan',
    render: () => (
      <>
        <Prompt tool="wardline" cmd="scan . --fail-on ERROR" />
        <L k="dim">scanned 1 file(s); 3 finding(s) — 0 suppressed, 1 new → findings.jsonl</L>
        <div style={{ height: 8 }} />
        <L><span style={K.err}>● PY-WL-101</span>  <span style={{ color: 'var(--text-primary)' }}>demo.build_record</span></L>
        <L ind={1} k="out">declares return trust <span style={K.ok}>ASSURED</span> but returns <span style={K.err}>EXTERNAL_RAW</span> —</L>
        <L ind={1} k="out">untrusted data reaches a trusted producer with no validation.</L>
        <L ind={1} k="dim">demo.py:8 · entity <span style={{ color: 'var(--text-primary)' }}>loomweave:sei:7f3a…b1</span></L>
        <div style={{ height: 8 }} />
        <L k="dim">2 finding(s) NONE-severity (engine facts) — hidden</L>
        <Prompt tool="echo" cmd="$?" />
        <L k="err">1   <span style={K.dim}># gate tripped — fix at the boundary, not the sink</span></L>
      </>
    ),
  },
  loomweave: {
    member: 'loomweave',
    label: 'loomweave · MCP',
    render: () => (
      <>
        <Prompt tool="loomweave" cmd="serve   # 39-tool MCP surface over stdio" />
        <L k="dim">consult-mode agent → entity_orientation_pack_get("auth.session.build_record")</L>
        <div style={{ height: 8 }} />
        <L><span style={K.acc}>◆ entity</span>  auth.session.build_record  <span style={K.dim}>fn · python</span></L>
        <L ind={1} k="out"><span style={K.dim}>sei</span>        loomweave:sei:7f3a…b1  <span style={K.ok}>● stable</span></L>
        <L ind={1} k="out"><span style={K.dim}>callers</span>    14 · 2 subsystems · entry-point: no</L>
        <L ind={1} k="out"><span style={K.dim}>enriched</span>   <CliTag id="wardline">wardline</CliTag>taint EXTERNAL_RAW→ASSURED</L>
        <L ind={1} k="out"><span style={{ marginLeft: 62, display: 'inline-block' }} /><CliTag id="filigree">filigree</CliTag>issue fg-da8d · fixing</L>
        <div style={{ height: 8 }} />
        <L k="dim">summary(id) dispatches the LLM lazily, one entity at a time.</L>
      </>
    ),
  },
  legis: {
    member: 'legis',
    label: 'legis · governance',
    render: () => (
      <>
        <Prompt tool="legis" cmd="verdict --cell coached   # simple · judge ON" />
        <L k="dim">policy PY-WL-101 fired at the git/CI boundary →</L>
        <div style={{ height: 8 }} />
        <L k="out">agent proposed override:</L>
        <L ind={1} k="dim">"boundary validates downstream in sanitize() — false positive"</L>
        <div style={{ height: 6 }} />
        <L><span style={K.err}>⚖  BLOCKED</span>  <span style={K.dim}>judge rejected — sanitize() is not on the return path</span></L>
        <L k="dim">agent must correct the code or sharpen its rationale; cannot self-clear.</L>
        <div style={{ height: 8 }} />
        <L k="dim">trail: append-only · keyed on SEI · survives rename/move</L>
        <L><span style={thread('legis')}>HMAC</span> <span style={K.dim}>verdict signed · file_fingerprint + ast_path bound</span></L>
      </>
    ),
  },
  tour: {
    member: 'shuttle',
    label: 'make tour → lacuna',
    render: () => (
      <>
        <Prompt tool="make" cmd="tour   # drive every live tool against the specimen" />
        <L k="dim">target: ~/lacuna · the deliberately-flawed demonstration specimen</L>
        <div style={{ height: 8 }} />
        <L><span style={thread('loomweave')}>loomweave </span><span style={K.ok}>✓ live</span>   <span style={K.dim}>catalog built · 312 entities · SEI minted</span></L>
        <L><span style={thread('wardline')}>wardline</span> <span style={K.ok}>✓ live</span>   <span style={K.dim}>4 baselined lacunae surfaced · gate green</span></L>
        <L><span style={thread('filigree')}>filigree</span> <span style={K.ok}>✓ live</span>   <span style={K.dim}>findings → 4 tracked issues</span></L>
        <L><span style={thread('legis')}>legis   </span> <span style={K.warn}>◐ design-only</span>  <span style={K.dim}>labelled, never faked</span></L>
        <L><span style={thread('charter')}>charter </span> <span style={K.warn}>◐ design-only</span>  <span style={K.dim}>labelled, never faked</span></L>
        <div style={{ height: 8 }} />
        <L k="ok">✓ narrative regenerated · matrix coverage in lockstep</L>
        <L k="dim">degrades honestly — point the suite at Lacuna and watch it work.</L>
      </>
    ),
  },
};

export function WeftCliTerminal() {
  const order = ['wardline', 'loomweave', 'legis', 'tour'];
  const [tab, setTab] = useState('wardline');
  const S = SESSIONS[tab];
  return (
    <div style={{ width: 760, maxWidth: '100%', margin: '0 auto', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow-modal)', background: '#0C0A07' }}>
      {/* window chrome */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 13px', background: 'var(--surface-raised)', borderBottom: '1px solid var(--border-default)' }}>
        <span style={{ display: 'flex', gap: 7 }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
            <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
          ))}
        </span>
        <span style={{ marginLeft: 8, fontSize: 11.5, color: 'var(--text-muted)' }}>agent@weft — {S.label} — stdio</span>
        <Mark name="weft" size={14} title="Weft" style={{ color: 'var(--text-muted)', marginLeft: 'auto' }} />
      </div>
      {/* tab bar — library Tabs (underline), tinted by the active member's thread */}
      <div style={{ padding: '7px 12px 0', background: 'var(--surface-raised)' }}>
        <Tabs
          variant="underline"
          value={tab}
          onChange={setTab}
          accent={`var(--thread-${S.member})`}
          tabs={order.map((t) => ({
            id: t,
            label: SESSIONS[t].label,
            icon: <Mark name={SESSIONS[t].member} size={13} title={SESSIONS[t].member} style={thread(SESSIONS[t].member)} />,
          }))}
        />
      </div>
      {/* body */}
      <div style={{ padding: '16px 18px 22px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.65, minHeight: 300, overflowX: 'auto' }}>
        {S.render()}
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <span style={K.ps}>$</span>
          <span style={{ width: 8, height: 16, background: 'var(--accent)', display: 'inline-block', animation: 'blink 1.1s steps(1) infinite' }} />
        </div>
      </div>
    </div>
  );
}
