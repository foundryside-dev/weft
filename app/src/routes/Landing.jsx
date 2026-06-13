import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mark, Stat, Tabs } from '../ds/index.js';
import { CORE_MEMBERS, PROPOSED_MEMBERS, SHUTTLE, LACUNA, HERO_STATS } from '../data/roster.js';

// Landing — ported from design-system/project/ui_kits/weft-hub/Hub.jsx to ESM:
//   `const { useState } = React` → import; window-aliased Mark/Tabs/Stat → real
//   imports from ../ds; self-mount block removed; roster data from ../data/roster.
// Roster cards link to the internal /members/<id> route AND carry the repo link.

function Chip({ children, dim }) {
  return (
    <span
      style={{
        fontSize: 11,
        color: dim ? 'var(--text-muted)' : 'var(--text-secondary)',
        border: '1px solid var(--border-default)',
        background: 'var(--surface-raised)',
        borderRadius: 'var(--radius-sm)',
        padding: '3px 9px',
      }}
    >
      {children}
    </span>
  );
}

function Hero() {
  return (
    <section
      className="hero-weave"
      style={{ padding: '64px 30px 40px', maxWidth: 980, margin: '0 auto', backgroundImage: 'var(--weave-warp)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 22 }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--ready)' }} />
        <span className="t-label">Local-first tools for agentic development</span>
      </div>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.4rem, 1.6rem + 3.2vw, 3.5rem)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.02,
          margin: 0,
          color: 'var(--text-primary)',
        }}
      >
        Distinct threads,
        <br />
        woven on purpose.
      </h1>
      <p className="t-body" style={{ fontSize: 16, maxWidth: 680, marginTop: 22 }}>
        Weft brings together four live tools for code understanding, work tracking,
        trust-boundary checks, and change governance. Lacuna is the demo app that shows the
        tools working together. Charter and Warpline are planned extensions for requirements and
        change-impact analysis.
      </p>
      <div
        style={{
          marginTop: 26,
          padding: '16px 20px',
          borderLeft: '3px solid var(--accent)',
          background: 'var(--surface-raised)',
          borderRadius: '0 var(--radius) var(--radius) 0',
        }}
      >
        <div className="t-label" style={{ marginBottom: 7 }}>
          How Weft works
        </div>
        <div style={{ fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.5 }}>
          Each tool does one job well on its own. When another Weft tool is present, it adds
          useful context without becoming a required runtime dependency.
        </div>
      </div>
      <div style={{ display: 'flex', gap: 9, marginTop: 24, flexWrap: 'wrap' }}>
        <Chip>4 live core tools</Chip>
        <Chip>2 planned extensions</Chip>
        <Chip>1 demo app</Chip>
        <Chip>local-first · no cloud</Chip>
        <Chip>no runtime · no broker · no store</Chip>
      </div>
      <div
        style={{
          display: 'flex',
          gap: 44,
          marginTop: 30,
          paddingTop: 26,
          borderTop: '1px solid var(--border-default)',
          flexWrap: 'wrap',
        }}
      >
        {HERO_STATS.map((s) => (
          <Stat key={s.label} label={s.label} value={s.value} tone={s.tone} display />
        ))}
      </div>
    </section>
  );
}

function MemberCard({ m, open, onToggle, dim }) {
  return (
    <div
      style={{
        background: 'var(--surface-raised)',
        border: '1px solid var(--border-default)',
        borderLeft: `3px solid ${m.thread}`,
        borderRadius: 'var(--radius)',
        opacity: dim ? 0.72 : 1,
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        style={{
          width: '100%',
          textAlign: 'left',
          background: 'transparent',
          border: 'none',
          padding: '16px 18px',
          cursor: 'pointer',
          fontFamily: 'var(--font-mono)',
          color: 'inherit',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <Mark name={m.id} size={28} title={m.name} style={{ color: m.thread, flex: '0 0 auto' }} />
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: 'flex', alignItems: 'baseline', gap: 9 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{m.name}</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.lang}</span>
          </span>
          <span style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
            {m.domain}
          </span>
        </span>
        <span style={{ fontSize: 10.5, color: m.thread, whiteSpace: 'nowrap' }}>{m.status}</span>
        <span aria-hidden style={{ color: 'var(--text-muted)', fontSize: 12 }}>{open ? '▾' : '▸'}</span>
      </button>
      {open && (
        <div style={{ margin: '0 18px 16px', paddingTop: 13, borderTop: '1px solid var(--border-default)' }}>
          <div className="t-label" style={{ marginBottom: 6 }}>
            Answers
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.5, fontStyle: 'italic' }}>
            “{m.answers}”
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 12, flexWrap: 'wrap' }}>
            {m.route === false ? null : (
              <Link
                to={`/members/${m.id}`}
                style={{ fontSize: 12, color: m.thread, textDecoration: 'none', fontWeight: 600 }}
              >
                open the {m.name} page →
              </Link>
            )}
            {m.repo && (
              <a
                href={m.repo}
                target="_blank"
                rel="noopener"
                className="ext"
                style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}
              >
                {m.repoLabel}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SurfaceGroup({ label, hint, items, dim, openId, onToggle }) {
  return (
    <div style={{ marginTop: 22 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
        <div className="t-label">{label}</div>
        {hint ? <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{hint}</span> : null}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((m) => (
          <MemberCard key={m.id} m={m} open={openId === m.id} onToggle={() => onToggle(m.id)} dim={dim} />
        ))}
      </div>
    </div>
  );
}

function Roster() {
  const [openId, setOpenId] = useState('loomweave');
  const toggle = (id) => setOpenId(openId === id ? null : id);
  return (
    <section style={{ padding: '20px 30px 40px', maxWidth: 980, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <div className="t-label">The federation — click to expand</div>
        <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>
          live tools, planned extensions, and the demo app are shown separately
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {CORE_MEMBERS.map((m) => (
          <MemberCard key={m.id} m={m} open={openId === m.id} onToggle={() => toggle(m.id)} />
        ))}
      </div>
      <SurfaceGroup
        label="Planned extensions"
        hint="designed to extend the core without changing how it runs"
        items={PROPOSED_MEMBERS}
        openId={openId}
        onToggle={toggle}
        dim
      />
      <SurfaceGroup
        label="Demo app"
        hint="a runnable example, not a tool you install"
        items={[LACUNA]}
        openId={openId}
        onToggle={toggle}
        dim
      />
      <div style={{ marginTop: 22 }}>
        <div className="t-label" style={{ marginBottom: 10 }}>Future idea</div>
        <MemberCard m={SHUTTLE} open={openId === 'shuttle'} onToggle={() => toggle('shuttle')} dim />
      </div>
    </section>
  );
}

const MODES = {
  solo: {
    label: 'Solo',
    text: 'Each core tool has a useful standalone workflow. Filigree can track work, Wardline can scan code, Loomweave can map a project, and Legis can govern a change on their own.',
  },
  pair: {
    label: 'Pair',
    text: 'Add a second tool and the workflow gets richer: Wardline findings become tracked Filigree work, and Loomweave identity keeps links attached as code moves.',
  },
  suite: {
    label: 'Suite',
    text: 'Together, the core tools give an agent the code map, the work queue, the trust posture, and the governance trail for a change.',
  },
};

function CompositionLaw() {
  const [mode, setMode] = useState('pair');
  return (
    <section style={{ padding: '28px 30px 44px', maxWidth: 980, margin: '0 auto' }}>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 26,
          fontWeight: 600,
          letterSpacing: '-0.015em',
          color: 'var(--text-primary)',
          margin: '0 0 4px',
        }}
      >
        Use One, Combine Two, Run The Suite
      </h2>
      <p className="t-body" style={{ maxWidth: 640, marginBottom: 20 }}>
        Weft is useful in layers: start with one tool, connect a pair, then run the full core
        against the same project.
      </p>
      <div style={{ marginBottom: 16 }}>
        <Tabs
          variant="pill"
          value={mode}
          onChange={setMode}
          tabs={Object.keys(MODES).map((k) => ({ id: k, label: MODES[k].label }))}
        />
      </div>
      <div
        style={{
          background: 'var(--surface-raised)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          padding: '22px 24px',
          minHeight: 64,
        }}
      >
        <div style={{ fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.55 }}>{MODES[mode].text}</div>
      </div>
    </section>
  );
}

const BINDINGS = [
  ['Loomweave → Filigree', 'issues stay attached to the same code entity even as files and names change'],
  ['Wardline → Loomweave', 'trust-boundary findings appear in the code map where agents need them'],
  ['Wardline → Filigree', 'scan findings become tracked work instead of loose reports'],
  ['Legis → Filigree', 'governed sign-offs are tied back to the work item that caused them'],
  ['Charter → Loomweave', 'planned: requirements links stay connected to the code they describe'],
];

function HowTheyCompose() {
  return (
    <section style={{ padding: '8px 30px 44px', maxWidth: 980, margin: '0 auto' }}>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 26,
          fontWeight: 600,
          letterSpacing: '-0.015em',
          color: 'var(--text-primary)',
          margin: '0 0 4px',
        }}
      >
        How They Work Together
      </h2>
      <p className="t-body" style={{ maxWidth: 680, marginBottom: 18 }}>
        The tools share identity and hand off useful context, but each one still works on its own.
      </p>
      <div
        style={{
          display: 'grid',
          gap: 12,
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          marginBottom: 22,
        }}
      >
        <div style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius)', padding: '16px 18px' }}>
          <div className="t-label" style={{ marginBottom: 6 }}>1 · Stable identity keeps links attached</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
            Loomweave gives each code entity a stable identity. Filigree, Wardline, and Legis can
            refer to that identity so findings, issues, and sign-offs survive common refactors.
          </div>
        </div>
        <div style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius)', padding: '16px 18px' }}>
          <div className="t-label" style={{ marginBottom: 6 }}>2 · shared handoffs stay simple</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
            The tools exchange small, explicit payloads over local interfaces. A missing sibling
            means less context, not a broken core workflow.
          </div>
        </div>
      </div>
      <div className="t-label" style={{ marginBottom: 10 }}>Working integrations</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {BINDINGS.map(([pair, desc]) => (
          <div
            key={pair}
            style={{
              display: 'flex',
              gap: 14,
              padding: '11px 14px',
              background: 'var(--surface-raised)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius)',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-primary)', minWidth: 200 }}>{pair}</span>
            <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', flex: 1 }}>{desc}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 14 }}>
        For implementation detail, see the{' '}
        <a href="https://github.com/foundryside-dev/weft/blob/main/contracts-index.md" target="_blank" rel="noopener" className="ext" style={{ color: 'var(--text-secondary)' }}>
          integration index
        </a>
        {' '}and the full{' '}
        <a href="https://github.com/foundryside-dev/weft/blob/main/federation-map.md" target="_blank" rel="noopener" className="ext" style={{ color: 'var(--text-secondary)' }}>
          federation map
        </a>
        . Building your own member? See{' '}
        <Link to="/build" style={{ color: 'var(--accent)' }}>/build</Link>.
      </p>
    </section>
  );
}

export function Landing() {
  return (
    <>
      <Hero />
      <Roster />
      <CompositionLaw />
      <HowTheyCompose />
    </>
  );
}
