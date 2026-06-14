import * as React from 'react';

export interface FreshnessMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Completeness as a 0–1 fraction. ≥0.95 woad, ≥0.6 brass, else madder. */
  completeness?: number;
  /** Staleness note, e.g. "fresh", "3 commits behind", "NO_SNAPSHOT". */
  staleness?: string | null;
  /** Label above the bar. */
  label?: string;
}

/**
 * Every Weft answer carries `completeness` + `staleness`; so does this. A small
 * completeness bar with an honest staleness line beneath — use it wherever a
 * query result's confidence needs to be visible (impact radius, dossier reads).
 *
 * @startingPoint section="Data" subtitle="Completeness + staleness meter" viewport="700x160"
 */
export function FreshnessMeter(props: FreshnessMeterProps): React.ReactElement;
