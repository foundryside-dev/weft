import * as React from 'react';

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Status tone (same mapping as Badge). */
  tone?: 'neutral' | 'ok' | 'warn' | 'danger' | 'info';
  /** Bold lead line. */
  title?: React.ReactNode;
  /** Optional leading icon (Lucide node). */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Inline message strip with a thread-accent edge — use for honest, persistent
 * status (a tripped gate, a stale index, a degraded sibling), not transient
 * toasts. Tone follows the same vocabulary as Badge.
 */
export function Banner(props: BannerProps): React.ReactElement;
