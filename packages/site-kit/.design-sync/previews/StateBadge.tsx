import React from 'react';
import { StateBadge } from '@weft/site-kit';

const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' };
const label: React.CSSProperties = { font: '600 11px var(--font-mono, monospace)', color: 'var(--text-muted, #6E6857)', letterSpacing: '.04em', marginBottom: 6 };
const block: React.CSSProperties = { display: 'flex', flexDirection: 'column' };

// The task state machine.
export const TaskStates = () => (
  <div style={block}>
    <div style={label}>TASK</div>
    <div style={row}>
      <StateBadge state="open" />
      <StateBadge state="in_progress" />
      <StateBadge state="closed" />
    </div>
  </div>
);

// The feature state machine.
export const FeatureStates = () => (
  <div style={block}>
    <div style={label}>FEATURE</div>
    <div style={row}>
      <StateBadge state="proposed" />
      <StateBadge state="approved" />
      <StateBadge state="building" />
      <StateBadge state="reviewing" />
      <StateBadge state="done" />
    </div>
  </div>
);

// The bug state machine — note the dashed "dropped" tones.
export const BugStates = () => (
  <div style={block}>
    <div style={label}>BUG</div>
    <div style={row}>
      <StateBadge state="triage" />
      <StateBadge state="confirmed" />
      <StateBadge state="fixing" />
      <StateBadge state="verifying" />
      <StateBadge state="wont_fix" />
      <StateBadge state="not_a_bug" />
    </div>
  </div>
);
