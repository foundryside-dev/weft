import React from 'react';
import { Banner } from '@weft/site-kit';

const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 520 };

// One banner per tone — the full vocabulary, with title + body.
export const Tones = () => (
  <div style={col}>
    <Banner tone="info" title="Cutover scheduled">
      All five members publish together at 14:00 UTC. The launch is the clean break — no cross-member backcompat ships.
    </Banner>
    <Banner tone="ok" title="Gate clean">
      wardline scan completed with exit 0. No trust-boundary findings on the changed files.
    </Banner>
    <Banner tone="warn" title="Freshness degraded">
      The Loomweave SEI spine is 38% stale for this repo — re-resolve before trusting move-stable identity.
    </Banner>
    <Banner tone="danger" title="Override rate gate FAILED">
      Governance override rate exceeded the budget this window. CI is red until a human signs off or the rate recovers.
    </Banner>
  </div>
);

// Body-only — no title, just an inline status strip.
export const BodyOnly = () => (
  <div style={col}>
    <Banner tone="info">
      Heads up: the board is additive-only until 3.0.0 ships. Don&apos;t shock real users twice.
    </Banner>
  </div>
);

// With a leading icon node.
export const WithIcon = () => (
  <div style={col}>
    <Banner tone="warn" title="Admission pending" icon={<span style={{ fontWeight: 700 }}>!</span>}>
      Warpline is in the five-member cutover but its isolation dogfood hasn&apos;t been adversarially exercised yet.
    </Banner>
  </div>
);
