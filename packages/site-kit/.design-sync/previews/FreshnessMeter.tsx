import React from 'react';
import { FreshnessMeter } from '@weft/site-kit';

const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 28, alignItems: 'flex-start' };

// Completeness drives the fill tone: ≥95% ok, ≥60% warn, below danger.
// Weft answers carry both completeness and staleness — so does the meter.
export const Levels = () => (
  <div style={row}>
    <FreshnessMeter completeness={1} staleness="fresh" />
    <FreshnessMeter completeness={0.72} staleness="2h old" />
    <FreshnessMeter completeness={0.34} staleness="stale" />
  </div>
);

// Custom label for the metric being measured.
export const CustomLabel = () => (
  <div style={row}>
    <FreshnessMeter completeness={0.88} staleness="12m old" label="SEI coverage" />
    <FreshnessMeter completeness={0.5} staleness="1d old" label="enrichment" />
  </div>
);

// Fresh and complete — the all-green state.
export const Fresh = () => (
  <div style={{ width: 180 }}>
    <FreshnessMeter completeness={1} staleness="current" label="completeness" />
  </div>
);
