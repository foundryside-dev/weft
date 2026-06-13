import React from 'react';
import { Link } from 'react-router-dom';
import { Mark, Tag } from '../ds/index.js';
import { memberById } from '../data/roster.js';

const INTEGRATION_INDEX = 'https://github.com/foundryside-dev/weft/blob/main/contracts-index.md';
const FEDERATION_MAP = 'https://github.com/foundryside-dev/weft/blob/main/federation-map.md';

// MemberPage — one page per realized member. Thread-tinted via the
// .thread-<id> class from colors_and_type.css (sets --thread). Content from the
// member briefing: product role, responsibilities, integrations, and current
// project details with links back to the owning repo.

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

  const isProposed = m.group?.includes('planned') || m.group?.includes('proposed');
  const isDemo = m.id === 'lacuna';
  const roleVerb = isProposed ? 'is planned for' : isDemo ? 'shows' : 'handles';

  return (
    <article className={`page-shell thread-${m.id}`} style={{ '--thread': m.thread, padding: '28px 30px 20px' }}>
      {/* breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 18 }}>
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Weft</Link>
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
            Status
          </span>
          {m.pending}
        </div>
      )}

      {/* domain authority */}
      <SectionHeading>{isDemo ? 'Demo role' : isProposed ? 'Planned role' : 'What it does'}</SectionHeading>
      <p className="t-body" style={{ maxWidth: 720 }}>
        {m.name} {roleVerb} {m.authority}
      </p>

      {/* what it owns */}
      <SectionHeading>Responsibilities</SectionHeading>
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
      <SectionHeading>Works with</SectionHeading>
      <p className="t-body" style={{ maxWidth: 720, marginTop: 0 }}>
        These integrations add context while keeping {m.name} useful on its own.
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
        Technical integration details live in the{' '}
        <a href={INTEGRATION_INDEX} target="_blank" rel="noopener" className="ext" style={{ color: 'var(--text-secondary)' }}>
          integration index
        </a>{' '}
        and the{' '}
        <a href={FEDERATION_MAP} target="_blank" rel="noopener" className="ext" style={{ color: 'var(--text-secondary)' }}>
          federation map
        </a>
        .
      </p>

      {m.sources?.length ? (
        <>
          <SectionHeading>Read more</SectionHeading>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {m.sources.map(([label, href], i) => (
              <li key={`${label}-${i}`} style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {href ? (
                  <a href={href} target="_blank" rel="noopener" className="ext" style={{ color: 'var(--thread)', textDecoration: 'none' }}>
                    {label}
                  </a>
                ) : (
                  <span style={{ color: 'var(--text-primary)' }}>{label}</span>
                )}
                {!href && m.id === 'warpline' ? <span style={{ color: 'var(--text-muted)' }}> — early design notes</span> : null}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {/* current project details */}
      <SectionHeading>Project details</SectionHeading>
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
            Current details
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
        For the latest details, use the project’s own repository.
        {m.repo ? (
          <>
            {' '}
            <a href={m.repo} target="_blank" rel="noopener" className="ext" style={{ color: 'var(--thread)' }}>
              {m.repoLabel}
            </a>
            {m.repoNote ? <span> — {m.repoNote}</span> : null}
          </>
        ) : (
          <span> There is no public product repo for this surface yet.</span>
        )}
      </p>

      {/* nav */}
      <div style={{ display: 'flex', gap: 20, marginTop: 28, paddingTop: 18, borderTop: '1px solid var(--border-default)', flexWrap: 'wrap' }}>
        <Link to="/" style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none' }}>
          ← the federation
        </Link>
        <Link to="/build" style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none' }}>
          build a member →
        </Link>
        <Link to="/demos/lacuna" style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none' }}>
          see it run →
        </Link>
      </div>
    </article>
  );
}
