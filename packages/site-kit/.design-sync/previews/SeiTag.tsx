import React from 'react';
import { SeiTag } from '@weft/site-kit';

const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' };

// The default chip: an opaque Stable Entity Identity token, dimmed scheme prefix.
export const Default = () => (
  <SeiTag value="loomweave:eid:7f3a9c2e8b1d4a60" />
);

// Copy affordance — copies the full token, never the truncated display.
export const Copyable = () => (
  <SeiTag value="loomweave:eid:7f3a9c2e8b1d4a60" copyable />
);

// Truncation controls how much of the id portion shows before eliding.
export const Truncation = () => (
  <div style={row}>
    <SeiTag value="loomweave:eid:7f3a9c2e8b1d4a60c9f2" truncate={6} />
    <SeiTag value="loomweave:eid:7f3a9c2e8b1d4a60c9f2" truncate={12} />
    <SeiTag value="loomweave:eid:7f3a9c2e8b1d4a60c9f2" truncate={0} />
  </div>
);

// Plain variant — inline mono, no chip background, for dense tables.
export const Plain = () => (
  <div style={row}>
    <SeiTag value="loomweave:eid:7f3a9c2e8b1d4a60" plain />
    <SeiTag value="loomweave:eid:0a1b2c3d4e5f6071" plain copyable />
  </div>
);
