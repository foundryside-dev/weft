import React from 'react';
import { Input } from '@weft/site-kit';

const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 };

// Labelled field with a helper hint.
export const Labelled = () => (
  <div style={col}>
    <Input label="Issue title" hint="A one-line summary, imperative mood." placeholder="Lock the seam hub-side first" defaultValue="Lock the seam hub-side first" />
  </div>
);

// Error state — the hint slot turns into the error message.
export const Error = () => (
  <div style={col}>
    <Input label="Assignee" error="No agent identity matches that name." defaultValue="codx" />
  </div>
);

// Monospace variant for SEI tokens, paths, and JSON envelopes.
export const Mono = () => (
  <div style={col}>
    <Input label="Bind SEI" mono placeholder="loomweave:eid:…" defaultValue="loomweave:eid:7f3a9c2e8b1d4a60" />
  </div>
);

// Prefix / suffix affixes.
export const Affixes = () => (
  <div style={col}>
    <Input label="Override rate budget" prefix={<span>≤</span>} suffix={<span>%</span>} defaultValue="5" />
  </div>
);

// Disabled.
export const Disabled = () => (
  <div style={col}>
    <Input label="Project" disabled defaultValue="weft" />
  </div>
);
