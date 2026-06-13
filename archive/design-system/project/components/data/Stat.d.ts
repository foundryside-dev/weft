import * as React from 'react';

/**
 * A single metric — big value, uppercase label, optional delta + tone dot.
 * Footer counters and insight KPIs are built from these.
 *
 * @startingPoint section="Components" subtitle="KPI / metric: value, label, delta, tone dot" viewport="700x180"
 */
export interface StatProps {
  /** Uppercase metric label. */
  label: React.ReactNode;
  /** The metric value (number or preformatted string). */
  value: React.ReactNode;
  /** Optional change indicator, e.g. "+3" / "-12%". Leading "-" reads stale. */
  delta?: React.ReactNode;
  /** Override the delta color (semantic token). */
  deltaTone?: string;
  /** Show a leading status dot in this color (semantic token). */
  tone?: string;
  /** `block` = stacked KPI; `inline` = label · value on one row. @default "block" */
  layout?: 'block' | 'inline';
  /** Render the value in the Space Grotesk display face (block layout). @default false */
  display?: boolean;
  style?: React.CSSProperties;
}

export function Stat(props: StatProps): JSX.Element;
