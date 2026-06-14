import * as React from 'react';

export type EnrichmentState = 'present' | 'absent' | 'unavailable' | 'stale' | 'partial' | 'skipped';

export interface EnrichmentChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The CLOSED enrichment vocabulary from the Weft response envelope:
   * `present` (peer present, fact attached), `absent` (peer present, no fact),
   * `unavailable` (peer unreachable), plus `stale` | `partial` | `skipped` for edges.
   */
  state?: EnrichmentState;
  /** Optional peer name prefix (e.g. "wardline", "sei"). */
  peer?: React.ReactNode;
}

/**
 * Renders one slot of a Weft response envelope's `enrichment` field. The whole
 * point is honesty: `absent` (hollow) and `unavailable` (dashed) are visually
 * distinct from `present` and from each other — never collapse them into a
 * single "ok/clean".
 */
export function EnrichmentChip(props: EnrichmentChipProps): React.ReactElement;
