import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs } from '../ds/index.js';
import { FiligreeDashboard } from '../demos/dashboard/FiligreeDashboard.jsx';
import { WeftCliTerminal } from '../demos/cli/WeftCliTerminal.jsx';

// Demos — wires the two interactive kits as LIVE React demos. Both kits were
// ported from in-browser Babel globals to ESM (see src/demos/*). They prove the
// federation is real, not slideware.
const DEMOS = {
  dashboard: {
    label: 'Filigree dashboard',
    caption: 'the one real GUI in the suite',
    detail:
      'A faithful recreation of Filigree’s web dashboard — switch views (Kanban / Ready / …), toggle the status pills and the Ready filter, click any card to open its detail panel, and flip the demo’s own dark ⇄ light theme. Illustrative data; the version string is the facts-pack snapshot, not authoritative.',
    note: 'the detail panel slides in full-height (the product’s real behavior) — Esc or the backdrop closes it.',
  },
  cli: {
    label: 'Weft CLI',
    caption: 'four members live on the CLI + MCP-over-stdio',
    detail:
      'The agent-first terminal. Four members have no GUI — Loomweave, Wardline, Legis, and Charter live on the command line and a dependency-free MCP-over-stdio server. Switch sessions: a tripped Wardline trust-boundary gate, a Loomweave MCP orientation read enriched with sibling facts, a Legis Coached-cell verdict, and make tour driving the suite against the Lacuna specimen — design-only members labelled, never faked.',
    note: 'output is drawn from each tool’s own README; design-only cells are labelled honestly.',
  },
};

const ORDER = ['dashboard', 'cli'];

export function Demos() {
  const { which } = useParams();
  const navigate = useNavigate();
  const active = DEMOS[which] ? which : 'dashboard';
  const d = DEMOS[active];

  return (
    <div className="page-shell" style={{ padding: '28px 30px 20px' }}>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.9rem, 1.5rem + 1.6vw, 2.6rem)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          margin: '0 0 6px',
        }}
      >
        Live demos
      </h1>
      <p className="t-body" style={{ maxWidth: 720, marginTop: 0, marginBottom: 20 }}>
        Two of the suite’s surfaces, running in your browser — the same component library the real
        products use. Not slideware; click around.
      </p>

      <div style={{ marginBottom: 18 }}>
        <Tabs
          variant="pill"
          value={active}
          onChange={(id) => navigate(`/demos/${id}`)}
          tabs={ORDER.map((id) => ({ id, label: DEMOS[id].label }))}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{d.label}</h2>
          <span style={{ fontSize: 12, color: 'var(--accent)' }}>— {d.caption}</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55, maxWidth: 760, margin: 0 }}>{d.detail}</p>
        <p style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 6 }}>note — {d.note}</p>
      </div>

      <section aria-label={`${d.label} demo`} style={{ marginBottom: 12 }}>
        {active === 'dashboard' ? (
          <FiligreeDashboard />
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 24px' }}>
            <WeftCliTerminal />
          </div>
        )}
      </section>
    </div>
  );
}
