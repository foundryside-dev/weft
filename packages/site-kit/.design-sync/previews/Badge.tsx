import React from 'react';
import { Badge } from '@weft/site-kit';

const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' };

// Tonal badges — the full tone vocabulary. `absent` is dashed by design:
// sibling absence is explicit, never an implied clean state.
export const Tones = () => (
  <div style={row}>
    <Badge tone="neutral">draft</Badge>
    <Badge tone="ok">passing</Badge>
    <Badge tone="warn">degraded</Badge>
    <Badge tone="danger">failed</Badge>
    <Badge tone="info">proposed</Badge>
    <Badge tone="absent">absent</Badge>
  </div>
);

// Solid fills for higher-emphasis status.
export const Solid = () => (
  <div style={row}>
    <Badge tone="ok" solid>clean</Badge>
    <Badge tone="warn" solid>stale</Badge>
    <Badge tone="danger" solid>blocked</Badge>
    <Badge tone="info" solid>live</Badge>
    <Badge tone="neutral" solid>archived</Badge>
  </div>
);

// With a leading status dot.
export const WithDot = () => (
  <div style={row}>
    <Badge tone="ok" dot>operational</Badge>
    <Badge tone="warn" dot>partial</Badge>
    <Badge tone="danger" dot>down</Badge>
  </div>
);
