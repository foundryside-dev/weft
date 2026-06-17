import React from 'react';
import { EnrichmentChip } from '@weft/site-kit';

const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' };

// The CLOSED enrichment vocabulary, each visually distinct. The whole point is
// honesty: `absent` (hollow) and `unavailable` (dashed) never collapse into
// "ok/clean".
export const Vocabulary = () => (
  <div style={row}>
    <EnrichmentChip state="present" />
    <EnrichmentChip state="absent" />
    <EnrichmentChip state="unavailable" />
    <EnrichmentChip state="stale" />
    <EnrichmentChip state="partial" />
    <EnrichmentChip state="skipped" />
  </div>
);

// With a peer-name prefix — one slot of a response envelope's enrichment field.
export const WithPeer = () => (
  <div style={row}>
    <EnrichmentChip peer="wardline" state="present" />
    <EnrichmentChip peer="loomweave" state="absent" />
    <EnrichmentChip peer="legis" state="unavailable" />
  </div>
);

// A realistic envelope readout: several peers reported at once.
export const EnvelopeReadout = () => (
  <div style={row}>
    <EnrichmentChip peer="loomweave" state="present" />
    <EnrichmentChip peer="wardline" state="present" />
    <EnrichmentChip peer="legis" state="partial" />
    <EnrichmentChip peer="warpline" state="unavailable" />
  </div>
);
