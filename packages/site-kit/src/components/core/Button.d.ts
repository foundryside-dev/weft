import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual weight. `primary` indigo fill; `secondary` outlined paper; `ghost` text-only; `danger` madder. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Control height. */
  size?: 'sm' | 'md' | 'lg';
  /** Stretch to fill the container width. */
  block?: boolean;
  /** Square icon-only button (pass a single icon as children). */
  iconOnly?: boolean;
  /** Icon node rendered before the label. */
  iconLeft?: React.ReactNode;
  /** Icon node rendered after the label. */
  iconRight?: React.ReactNode;
  /** Render as a different element/tag (e.g. 'a'). */
  as?: React.ElementType;
  children?: React.ReactNode;
}

/**
 * The primary action control for Weft surfaces. Indigo `primary` for the one
 * main action per view; `secondary`/`ghost` for everything else; `danger` only
 * for destructive or gate-tripping actions.
 *
 * @startingPoint section="Core" subtitle="Action button — primary, secondary, ghost, danger" viewport="700x220"
 */
export function Button(props: ButtonProps): React.ReactElement;
