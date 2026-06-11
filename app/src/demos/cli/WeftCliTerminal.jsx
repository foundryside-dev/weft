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
const thread = (id) => ({ color: id === 'lacuna' ? 'var(--lacuna-accent)' : `var(--thread-${id})` });

function L({ k = 'out', ind = 0, children }) {
  return <div style={{ ...K[k], paddingLeft: ind * 14, whiteSpace: 'pre-wrap' }}>{children}</div>;
}
function CliTag({ id, children }) {
  return (
    <span style={{ ...thread(id), border: '1px solid currentColor', borderRadius: 'var(--radius-sm)', padding: '0 5px', fontSize: 11, marginRight: 6 }}>
      {children}
    </span>
  );
}

const SESSIONS = {
  tour: {
    member: 'lacuna',
    label: 'tour output',
    render: () => (
      <>
        <L k="dim">Codex / Claude operator transcript: inspect files first, then run the harness.</L>
        <div style={{ height: 6 }} />
        <L k="cmd">$ cd /home/john/lacuna && make tour</L>
        <L k="dim">target: Lacuna · runs python -m tour, then regenerates docs/tour.md and docs/matrix.md</L>
        <div style={{ height: 8 }} />
        <L><span style={thread('loomweave')}>loomweave analyze</span> <span style={K.ok}>✓</span> <span style={K.dim}>300 entities, 563 structural edges</span></L>
        <L><span style={thread('loomweave')}>loomweave structure</span> <span style={K.ok}>✓</span> <span style={K.dim}>dead entities plus cycle_a / cycle_b</span></L>
        <L><span style={thread('loomweave')}>loomweave navigation</span> <span style={K.ok}>✓</span> <span style={K.dim}>call chains, coupling hotspot, entry point, subsystem</span></L>
        <L><span style={thread('wardline')}>wardline scan</span> <span style={K.ok}>✓</span> <span style={K.dim}>PY-WL-101..126 plus analyzer notices</span></L>
        <L><span style={thread('legis')}>legis govern</span> <span style={K.ok}>✓</span> <span style={K.dim}>43 active defects routed to surface_override</span></L>
        <L><span style={thread('filigree')}>filigree work cycle</span> <span style={K.ok}>✓</span> <span style={K.dim}>sentinel finding promoted, claimed, closed</span></L>
        <div style={{ height: 8 }} />
        <L k="ok">the useful output is the generated evidence, not a chat transcript.</L>
      </>
    ),
  },
  specimen: {
    member: 'loomweave',
    label: 'specimen code',
    render: () => (
      <>
        <L k="dim">What the agent reads before it trusts the demo output.</L>
        <div style={{ height: 6 }} />
        <L k="cmd">/home/john/lacuna/specimen/</L>
        <L k="dim">a clean-core library app with intentionally planted flaws kept in isolated modules</L>
        <div style={{ height: 8 }} />
        <L><span style={K.acc}>trust_flow.py</span> <span style={K.dim}>unsafe_account_key declares ASSURED but returns EXTERNAL_RAW</span></L>
        <L><span style={K.acc}>wardline_sinks.py</span> <span style={K.dim}>untrusted data reaches pickle, eval, shell, SQL, SSRF, SSTI, XXE sinks</span></L>
        <L><span style={K.acc}>wardline_boundaries.py</span> <span style={K.dim}>bad trust boundaries, contradictory markers, assert-only validation</span></L>
        <L><span style={K.acc}>pipeline.py</span> <span style={K.dim}>five-hop call chain: ingest → normalize → enrich → validate_record → persist</span></L>
        <L><span style={K.acc}>hub.py</span> <span style={K.dim}>dispatch ranks as the coupling hotspot</span></L>
        <L><span style={K.acc}>cycle_a.py / cycle_b.py</span> <span style={K.dim}>module-level import cycle for Loomweave to surface</span></L>
        <div style={{ height: 8 }} />
        <L k="warn">do not fix these files as cleanup; removing a catalogued lacuna breaks make verify.</L>
      </>
    ),
  },
  manifest: {
    member: 'lacuna',
    label: 'manifest',
    render: () => (
      <>
        <L k="dim">The harness verifies against this manifest, not against prose claims.</L>
        <div style={{ height: 6 }} />
        <L k="cmd">tour/lacunae.toml</L>
        <L k="dim">the single source of truth for expected flaws, rules, files, symbols, and coverage cells</L>
        <div style={{ height: 8 }} />
        <L><CliTag id="wardline">wardline</CliTag> PY-WL-101 through PY-WL-126 are represented by named specimen symbols.</L>
        <L><CliTag id="loomweave">loomweave</CliTag> dead entity, import cycle, call chain, coupling hotspot, entry point, subsystem, relation edges.</L>
        <L><CliTag id="filigree">filigree</CliTag> wl-log-injection is the live sentinel: preview-rule, gate-immune, promoted and work-cycled.</L>
        <L><CliTag id="legis">legis</CliTag> policy-boundary evidence distinguishes a disabled boundary from a healthy one.</L>
        <div style={{ height: 8 }} />
        <L k="dim">coverage matches on rule token plus symbol, so an incidental finding cannot credit the planted one.</L>
      </>
    ),
  },
  docs: {
    member: 'charter',
    label: 'generated docs',
    render: () => (
      <>
        <L k="dim">What the agent opens after the run to explain the result.</L>
        <div style={{ height: 6 }} />
        <L k="cmd">docs/tour.md</L>
        <L k="dim">generated by make tour; byte-for-byte checked by make verify</L>
        <div style={{ height: 8 }} />
        <L><span style={K.ok}>tour.md</span> lists the ten live steps and their stable details.</L>
        <L><span style={K.ok}>matrix.md</span> records which tools are live and which planted cells are exercised.</L>
        <L><span style={K.ok}>docs/flaws/*.md</span> gives one generated explainer per catalogued lacuna.</L>
        <div style={{ height: 8 }} />
        <L k="warn">if docs/tour.md or docs/matrix.md drift, make verify fails and tells you to rerun make tour.</L>
      </>
    ),
  },
  verify: {
    member: 'wardline',
    label: 'verify gate',
    render: () => (
      <>
        <L k="dim">The check a serious demo runs before it calls itself green.</L>
        <div style={{ height: 6 }} />
        <L k="cmd">$ cd /home/john/lacuna && make verify</L>
        <L k="dim">asserts every lacuna whose tool is live and checks generated docs for lockstep</L>
        <div style={{ height: 8 }} />
        <L><span style={K.ok}>pass</span> every expected live flaw surfaced by its tool and symbol.</L>
        <L><span style={K.err}>fail</span> a catalogued flaw disappears, a generated doc is stale, or a live tool stops surfacing a fixture.</L>
        <L><span style={K.warn}>degrade</span> unavailable tools are labelled by capability detection, not faked.</L>
        <div style={{ height: 8 }} />
        <L k="dim">the green demo is not "no bugs"; it means the known bugs are present, catalogued, and surfaced.</L>
      </>
    ),
  },
};

export function WeftCliTerminal() {
  const order = ['tour', 'specimen', 'manifest', 'docs', 'verify'];
  const [tab, setTab] = useState('tour');
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
