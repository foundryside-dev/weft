import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs } from '../ds/index.js';
import { FiligreeDashboard } from '../demos/dashboard/FiligreeDashboard.jsx';
import { WeftCliTerminal } from '../demos/cli/WeftCliTerminal.jsx';

// Demos — wires the two interactive kits as LIVE React demos. Both kits were
// ported from in-browser Babel globals to ESM (see src/demos/*). They prove the
// federation is real, not slideware.
const DEMOS = {
  lacuna: {
    label: 'Lacuna tour',
    caption: 'what the specimen contains and what the tour proves',
    detail:
      'Start with Lacuna itself: a small library app under specimen/, a catalog of intentional flaws in tour/lacunae.toml, and a tour harness that runs the live Weft CLIs and MCP surfaces against that catalog. A real Codex or Claude session would inspect these files, run make tour or make verify, then read the generated evidence. The page below walks that same artifact trail.',
    note: 'Lacuna is not a member product. It is the specimen the member tools are pointed at.',
  },
  dashboard: {
    label: 'Filigree dashboard',
    caption: 'the one real GUI in the suite',
    detail:
      'A faithful recreation of Filigree’s web dashboard — switch views, toggle the status pills and the Ready filter, click any card to open its detail panel, and flip the demo’s own dark ⇄ light theme. The issue data is illustrative.',
    note: 'the detail panel slides in full-height (the product’s real behavior) — Esc or the backdrop closes it.',
  },
};

const ORDER = ['lacuna', 'dashboard'];
const ALIASES = { cli: 'lacuna' };

export function Demos() {
  const { which } = useParams();
  const navigate = useNavigate();
  const active = DEMOS[which] ? which : ALIASES[which] || 'lacuna';
  const d = DEMOS[active];

  return (
    <div className="page-shell" style={{ padding: '28px 30px 20px' }}>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.9rem, 1.5rem + 1.6vw, 2.6rem)',
          fontWeight: 700,
          letterSpacing: 0,
          color: 'var(--text-primary)',
          margin: '0 0 6px',
        }}
      >
        See it run
      </h1>
      <p className="t-body" style={{ maxWidth: 720, marginTop: 0, marginBottom: 20 }}>
        Start with Lacuna, then inspect the product surfaces. Lacuna is the seeded
        codebase: an agent runs the Weft command-line tools against known flaws and
        keeps the narrative in lockstep with generated evidence.
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
