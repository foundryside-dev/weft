import * as React from 'react';

/**
 * A small hover/focus popover — surface slip, hairline border, soft shadow,
 * mono 11px. No glass. Wraps any trigger element.
 */
export interface TooltipProps {
  /** The tip contents (kept short — it doesn't wrap). */
  content: React.ReactNode;
  /** The trigger element the tip attaches to. */
  children: React.ReactNode;
  /** @default "top" */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  style?: React.CSSProperties;
}

export function Tooltip(props: TooltipProps): JSX.Element;
