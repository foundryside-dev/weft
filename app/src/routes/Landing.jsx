import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mark, Stat, Tabs } from '../ds/index.js';
import { MEMBERS, SHUTTLE, LACUNA, HERO_STATS } from '../data/roster.js';

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
        <span className="t-label">Authoritative · interop layer · documentation only</span>
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
        Weft is an agent-first federation of small, local-first developer tools. Each member is
        authoritative for one domain, useful on its own, and meaningfully composable with any
        sibling — <span style={{ color: 'var(--text-primary)' }}>enrich-only, never load-bearing</span>{' '}
        when composed.
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
          The federation axiom
        </div>
        <div style={{ fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.5 }}>
          Each member is authoritative for one domain, solo-useful, meaningfully composable
          pairwise, and enrich-only — never load-bearing — when composed.
        </div>
      </div>
      <div style={{ display: 'flex', gap: 9, marginTop: 24, flexWrap: 'wrap' }}>
        <Chip>5 realized members</Chip>
        <Chip>local-first · no cloud</Chip>
        <Chip>no runtime · no broker · no store</Chip>
        <Chip dim>Shuttle — roadmap</Chip>
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
            <Link
              to={`/members/${m.id}`}
              style={{ fontSize: 12, color: m.thread, textDecoration: 'none', fontWeight: 600 }}
            >
              open the {m.name} page →
            </Link>
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

function LacunaStrip() {
  return (
    <div style={{ marginTop: 22 }}>
      <div className="t-label" style={{ marginBottom: 10, color: 'var(--lacuna-accent-dim)' }}>
        Adjacent — not a member
      </div>
      <a
        href={LACUNA.repo}
        target="_blank"
        rel="noopener"
        style={{ textDecoration: 'none', display: 'block' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '15px 18px',
            background: 'var(--lacuna-surface)',
            border: '1.5px dashed var(--lacuna-border)',
            borderRadius: 'var(--radius)',
          }}
        >
          <Mark name="lacuna" size={28} title="Lacuna" style={{ color: 'var(--lacuna-accent)', flex: '0 0 auto' }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 9 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>Lacuna</span>
              <span style={{ fontSize: 11, color: 'var(--lacuna-accent-dim)' }}>demonstration specimen</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{LACUNA.blurb}</div>
          </div>
          <span className="ext" style={{ fontSize: 11, color: 'var(--lacuna-accent)', whiteSpace: 'nowrap' }}>
            {LACUNA.repoLabel}
          </span>
        </div>
      </a>
    </div>
  );
}

function Roster() {
  const [openId, setOpenId] = useState('loomweave');
  const toggle = (id) => setOpenId(openId === id ? null : id);
  return (
    <section style={{ padding: '20px 30px 40px', maxWidth: 980, margin: '0 auto' }}>
      <div className="t-label" style={{ marginBottom: 16 }}>
        The roster — click to expand
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {MEMBERS.map((m) => (
          <MemberCard key={m.id} m={m} open={openId === m.id} onToggle={() => toggle(m.id)} />
        ))}
        <MemberCard m={SHUTTLE} open={openId === 'shuttle'} onToggle={() => toggle('shuttle')} dim />
      </div>
      <LacunaStrip />
    </section>
  );
}

const MODES = {
  solo: {
    label: 'Solo',
    text: 'Each tool has a complete, respectable use-case by itself. Filigree files, works, and closes a bug with Loomweave absent or broken.',
  },
  pair: {
    label: 'Pair',
    text: 'Combined with any one sibling it creates a meaningful capability — Wardline findings become tracked Filigree work; never a broken fragment.',
  },
  suite: {
    label: 'Suite',
    text: 'All together form something richer: the agent understands the code, its trust posture, what it may do, and every unit of work — keyed on one identity.',
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
        The composition law
      </h2>
      <p className="t-body" style={{ maxWidth: 640, marginBottom: 20 }}>
        Any Weft product must satisfy all three modes. Pairwise composability is a hard rule, not an
        aspiration.
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

// How they compose — grounded in federation-map.md + sei-standard.md. Two
// structural facts (SEI spine + the weft transport) plus representative bindings.
const BINDINGS = [
  ['Loomweave → Filigree', 'an issue stores the opaque SEI; drift is the consumer’s check via content_hash_at_attach (§1)'],
  ['Wardline → Loomweave', 'qualname reconciliation (§5) + the taint-fact store hosted opaque (§3)'],
  ['Wardline → Filigree', 'findings become tracked work via the weft scan-results intake (§4)'],
  ['Legis → Filigree', 'SEI-keyed sign-offs bound to issues (§7); "Wardline analyses, Legis governs"'],
  ['Charter → Loomweave', 'SEI consumer for trace links (§10) — designed, adapter pending'],
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
        How they compose
      </h2>
      <p className="t-body" style={{ maxWidth: 680, marginBottom: 18 }}>
        Two structural facts hold the matrix together. Every binding is enrich-only — removing one
        side never breaks the other’s core flow.
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
          <div className="t-label" style={{ marginBottom: 6 }}>1 · SEI is the connective tissue</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
            Every cross-tool binding keys on Loomweave’s Stable Entity Identity — the opaque token
            that survives the renames developers actually perform. A binding keyed on a mutable
            locator silently orphans on the first refactor. SEI is LOCKED.
          </div>
        </div>
        <div style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius)', padding: '16px 18px' }}>
          <div className="t-label" style={{ marginBottom: 6 }}>2 · the weft transport</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
            Filigree hosts the federation transport: named, pinnable HTTP generations (/api/weft/*).
            Evolution is additive — a new generation, never a mutated one — so a member that pins a
            generation is wire-stable across releases.
          </div>
        </div>
      </div>
      <div className="t-label" style={{ marginBottom: 10 }}>Representative bindings</div>
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
        Section numbers point to the hub’s{' '}
        <a href="https://github.com/foundryside-dev/weft/blob/main/contracts-index.md" target="_blank" rel="noopener" className="ext" style={{ color: 'var(--text-secondary)' }}>
          contracts index
        </a>
        ; the full grid lives in{' '}
        <a href="https://github.com/foundryside-dev/weft/blob/main/federation-map.md" target="_blank" rel="noopener" className="ext" style={{ color: 'var(--text-secondary)' }}>
          federation-map
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
