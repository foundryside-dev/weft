import * as React from 'react';

/**
 * The Weft action control — mono, 6px radius, semantic fills only.
 *
 * @startingPoint section="Components" subtitle="Primary / secondary / ghost / danger / ready, three sizes" viewport="700x250"
 */
export interface ButtonProps {
  children: React.ReactNode;
  /** Visual role. Color is rationed — `danger`/`ready` are the only semantic fills. @default "secondary" */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'ready';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  /** Shows a dimmed "Loading…" label and blocks pointer events. */
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
