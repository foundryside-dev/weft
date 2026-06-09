import React from 'react';
import { Link } from 'react-router-dom';
import { Mark, Tag } from '../ds/index.js';
import { memberById } from '../data/roster.js';

const CONTRACTS_INDEX = 'https://github.com/foundryside-dev/weft/blob/main/contracts-index.md';
const FEDERATION_MAP = 'https://github.com/foundryside-dev/weft/blob/main/federation-map.md';

// MemberPage — one page per realized member. Thread-tinted via the
// .thread-<id> class from colors_and_type.css (sets --thread). Content from the
// member briefing: domain authority, what it owns, how it composes, and a
// snapshot-facts block CLEARLY labeled non-authoritative with the repo link
// (the hub audit invariant). No version/count invented — all from roster.js.

function SectionHeading({ children }) {
  return (
    <h2
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: 20,
        fontWeight: 600,
        letterSpacing: '-0.01em',
        color: 'var(--text-primary)',
        margin: '34px 0 12px',
      }}
    >
      {children}
    </h2>
  );
}

export function MemberPage({ id }) {
  const m = memberById(id);
  if (!m) {
    return (
      <div className="page-shell" style={{ padding: '40px 30px' }}>
        <h1>Unknown member</h1>
        <Link to="/">← back to the federation</Link>
      </div>
    );
  }

  return (
    <article className={`page-shell thread-${m.id}`} style={{ padding: '28px 30px 20px' }}>
      {/* breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 18 }}>
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>~/weft</Link>
        <span aria-hidden> / </span>
        <span>members</span>
        <span aria-hidden> / </span>
        <span style={{ color: 'var(--text-secondary)' }}>{m.id}</span>
      </nav>

      {/* title block, thread left-rule */}
      <header
        style={{
          borderLeft: '4px solid var(--thread)',
          paddingLeft: 18,
          marginBottom: 6,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 13, flexWrap: 'wrap' }}>
          <Mark name={m.id} size={34} title={m.name} style={{ color: 'var(--thread)' }} />
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 1.5rem + 2vw, 2.8rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            {m.name}
          </h1>
          <Tag tone="var(--thread)">{m.lang}</Tag>
          <span style={{ fontSize: 12, color: 'var(--thread)' }}>{m.status}</span>
        </div>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 10, marginBottom: 0 }}>
          {m.surface ? `${m.surface} · ` : ''}
          <span style={{ fontStyle: 'italic' }}>“{m.answers}”</span>
        </p>
      </header>

      {/* pending banner (Charter) */}
      {m.pending && (
        <div
          role="note"
          style={{
            marginTop: 18,
            padding: '14px 18px',
            borderLeft: '3px solid var(--aging)',
            background: 'var(--surface-raised)',
            borderRadius: '0 var(--radius) var(--radius) 0',
            fontSize: 13,
            color: 'var(--text-primary)',
            lineHeight: 1.55,
          }}
        >
          <span className="t-label" style={{ display: 'block', marginBottom: 5, color: 'var(--aging)' }}>
            status — honest
          </span>
          {m.pending}
        </div>
      )}

      {/* domain authority */}
      <SectionHeading>Domain authority</SectionHeading>
      <p className="t-body" style={{ maxWidth: 720 }}>
        {m.name} is authoritative for {m.authority}
      </p>

      {/* what it owns */}
      <SectionHeading>What it owns</SectionHeading>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {m.owns.map((o, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              gap: 11,
              fontSize: 13.5,
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
            }}
          >
            <span aria-hidden style={{ color: 'var(--thread)', flex: '0 0 auto' }}>◆</span>
            <span>{o}</span>
          </li>
        ))}
      </ul>

      {/* how it composes */}
      <SectionHeading>How it composes</SectionHeading>
      <p className="t-body" style={{ maxWidth: 720, marginTop: 0 }}>
        Every binding is enrich-only — removing a sibling never breaks {m.name}’s core flow.
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {m.composes.map((c, i) => (
          <li
            key={i}
            style={{
              padding: '11px 14px',
              background: 'var(--surface-raised)',
              border: '1px solid var(--border-default)',
              borderLeft: '3px solid var(--thread)',
              borderRadius: 'var(--radius)',
              fontSize: 13,
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
            }}
          >
            {c}
          </li>
        ))}
      </ul>
      <p style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 12 }}>
        The contracts {m.name} carries are indexed in the hub{' '}
        <a href={CONTRACTS_INDEX} target="_blank" rel="noopener" className="ext" style={{ color: 'var(--text-secondary)' }}>
          contracts index
        </a>{' '}
        and placed on the{' '}
        <a href={FEDERATION_MAP} target="_blank" rel="noopener" className="ext" style={{ color: 'var(--text-secondary)' }}>
          federation map
        </a>
        .
      </p>

      {/* surface facts — snapshot, NOT authoritative */}
      <SectionHeading>Surface facts</SectionHeading>
      <div
        style={{
          background: 'var(--surface-raised)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '10px 16px',
            borderBottom: '1px solid var(--border-default)',
            background: 'var(--surface-overlay)',
          }}
        >
          <span className="t-label" style={{ color: 'var(--aging)' }}>
            snapshot — not authoritative; see the repo
          </span>
        </div>
        <dl style={{ margin: 0, padding: '6px 0' }}>
          {m.facts.map(([k, v, note], i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 14,
                padding: '8px 16px',
                borderTop: i ? '1px solid var(--border-default)' : 'none',
                flexWrap: 'wrap',
              }}
            >
              <dt style={{ fontSize: 12, color: 'var(--text-muted)', minWidth: 150, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {k}
              </dt>
              <dd style={{ margin: 0, fontSize: 13, color: 'var(--text-primary)' }}>
                {v}
                {note ? <span style={{ color: 'var(--text-muted)' }}> — {note}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12 }}>
        These values move; the hub points rather than restates. The repo is authoritative:{' '}
        <a href={m.repo} target="_blank" rel="noopener" className="ext" style={{ color: 'var(--thread)' }}>
          {m.repoLabel}
        </a>
        {m.repoNote ? <span> — {m.repoNote}</span> : null}
      </p>

      {/* nav */}
      <div style={{ display: 'flex', gap: 20, marginTop: 28, paddingTop: 18, borderTop: '1px solid var(--border-default)', flexWrap: 'wrap' }}>
        <Link to="/" style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none' }}>
          ← the federation
        </Link>
        <Link to="/build" style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none' }}>
          build a member →
        </Link>
        <Link to="/demos" style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none' }}>
          see it run →
        </Link>
      </div>
    </article>
  );
}
