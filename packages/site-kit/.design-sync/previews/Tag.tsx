import React from 'react';
import { Tag } from '@weft/site-kit';

const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' };

// Plain label chips.
export const Plain = () => (
  <div style={row}>
    <Tag>rust</Tag>
    <Tag>python</Tag>
    <Tag>launch-gating</Tag>
  </div>
);

// Color-dotted — a member thread color leads the label.
export const ColorDotted = () => (
  <div style={row}>
    <Tag color="var(--member-loomweave)">structure</Tag>
    <Tag color="var(--member-wardline)">trust-boundary</Tag>
    <Tag color="var(--member-legis)">governance</Tag>
  </div>
);

// Removable — an × affordance fires onRemove (e.g. clearing a filter).
export const Removable = () => (
  <div style={row}>
    <Tag onRemove={() => {}}>from-weft-hub</Tag>
    <Tag color="var(--member-filigree)" onRemove={() => {}}>P1</Tag>
  </div>
);
