import * as React from 'react';

/**
 * Wraps an element and pulses the brand's one-shot accent box-shadow whenever
 * `flashKey` changes. The only non-cursor ambient motion in the system — a
 * brief bloom, never a loop. Skips the pulse under prefers-reduced-motion.
 */
export interface ChangeFlashProps {
  /** Change this value to trigger the pulse (version, updatedAt, hash, …). */
  flashKey: string | number;
  /** Glow color. @default "var(--accent)" */
  color?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function ChangeFlash(props: ChangeFlashProps): JSX.Element;
