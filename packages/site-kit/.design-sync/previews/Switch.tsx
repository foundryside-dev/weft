import React from 'react';
import { Switch } from '@weft/site-kit';

const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' };

// On and off, each with a label.
export const States = () => (
  <div style={col}>
    <Switch defaultChecked label="Enable the Legis judge cell" />
    <Switch label="Auto-advance work-state on merge" />
  </div>
);

// Interactive — toggles its own state on click.
export const Interactive = () => {
  const [on, setOn] = React.useState(true);
  return <Switch checked={on} onChange={(e) => setOn(e.target.checked)} label="Fail open on unreachable peer" />;
};

// Disabled, in both positions.
export const Disabled = () => (
  <div style={col}>
    <Switch disabled label="Re-sign stored data (void — no backfill machinery)" />
    <Switch disabled defaultChecked label="Speak SEI natively at entry" />
  </div>
);
