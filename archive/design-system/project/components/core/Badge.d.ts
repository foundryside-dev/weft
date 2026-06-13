import * as React from 'react';

/**
 * A prominent status pill — Open / Active / Done. For small inline metadata
 * chips use Tag instead.
 */
export interface BadgeProps {
  children: React.ReactNode;
  /** `solid` = filled amber; `outline` = overlay fill with a strong border. @default "solid" */
  variant?: 'solid' | 'outline';
  style?: React.CSSProperties;
}

export function Badge(props: BadgeProps): JSX.Element;
