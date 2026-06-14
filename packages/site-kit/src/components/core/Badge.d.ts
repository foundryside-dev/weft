import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Status tone, mapped to Weft's vocabulary. `ok`=present/clean/exit 0; `warn`=partial/stale; `danger`=BLOCKED/error/exit 1; `info`=engine fact; `absent`=present-but-no-fact (dashed). */
  tone?: 'neutral' | 'ok' | 'warn' | 'danger' | 'info' | 'absent';
  /** Filled instead of tonal. Use sparingly for high-emphasis status. */
  solid?: boolean;
  /** Leading status dot. */
  dot?: boolean;
  children?: React.ReactNode;
}

/**
 * Small monospace status pill. Tones map to the products' real status words —
 * keep that mapping intact (woad=ok, madder=danger, brass=warn, ash=absent).
 */
export function Badge(props: BadgeProps): React.ReactElement;
