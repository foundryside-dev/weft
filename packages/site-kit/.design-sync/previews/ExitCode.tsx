import React from 'react';
import { ExitCode } from '@weft/site-kit';

const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' };

// The three process outcomes, with their default labels:
// 0 clean · 1 gate tripped · 2 error.
export const Codes = () => (
  <div style={row}>
    <ExitCode code={0} />
    <ExitCode code={1} />
    <ExitCode code={2} />
  </div>
);

// Bare codes, no label.
export const NoLabel = () => (
  <div style={row}>
    <ExitCode code={0} showLabel={false} />
    <ExitCode code={1} showLabel={false} />
    <ExitCode code={2} showLabel={false} />
  </div>
);

// Custom label — same tone derivation, domain-specific copy.
export const CustomLabel = () => (
  <div style={row}>
    <ExitCode code={0} label="scan clean" />
    <ExitCode code={1} label="boundary finding" />
    <ExitCode code={2} label="wardline error" />
  </div>
);
