import React from 'react';
import { Button } from '@weft/site-kit';

const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' };

// The variant axis: primary action, secondary, ghost, and destructive.
export const Variants = () => (
  <div style={row}>
    <Button>Save changes</Button>
    <Button variant="secondary">Cancel</Button>
    <Button variant="ghost">Dismiss</Button>
    <Button variant="danger">Delete project</Button>
  </div>
);

// Three sizes.
export const Sizes = () => (
  <div style={row}>
    <Button size="sm">Run scan</Button>
    <Button size="md">Run scan</Button>
    <Button size="lg">Run scan</Button>
  </div>
);

// With leading / trailing icon nodes.
export const WithIcons = () => (
  <div style={row}>
    <Button iconLeft={<span>↻</span>}>Re-resolve</Button>
    <Button variant="secondary" iconRight={<span>→</span>}>Open dashboard</Button>
    <Button iconOnly aria-label="Settings">⚙</Button>
  </div>
);

// Disabled.
export const Disabled = () => (
  <div style={row}>
    <Button disabled>Save changes</Button>
    <Button variant="secondary" disabled>Cancel</Button>
  </div>
);

// Full-width block button.
export const Block = () => (
  <div style={{ width: 320 }}>
    <Button block>Promote to issue</Button>
  </div>
);
