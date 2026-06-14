import * as React from 'react';

export interface SeiTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The full SEI token, e.g. "loomweave:eid:7f3a9c…". Opaque — displayed, never parsed. */
  value?: string;
  /** Max characters of the id portion before eliding (0 = no truncation). */
  truncate?: number;
  /** Show a copy-to-clipboard affordance (copies the full value). */
  copyable?: boolean;
  /** Drop the chip background/border — inline mono only. */
  plain?: boolean;
}

/**
 * Renders a Stable Entity Identity (SEI) — Loomweave's durable code-identity
 * token — as an indigo mono chip with a dimmed `scheme:eid:` prefix. SEI is the
 * spine of the whole federation; treat it as opaque (never parse it).
 */
export function SeiTag(props: SeiTagProps): React.ReactElement;
