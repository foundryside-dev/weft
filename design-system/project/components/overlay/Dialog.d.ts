import * as React from 'react';

/**
 * The Weft overlay — a centered modal or a right-edge slide-in panel. Flat dim
 * backdrop (no glass), 0.2s ease transition, Esc + backdrop-click to close.
 *
 * @startingPoint section="Components" subtitle="Centered modal and right slide-in detail panel" viewport="700x420"
 */
export interface DialogProps {
  open: boolean;
  /** Called on Esc, backdrop click, or the header close button. */
  onClose?: () => void;
  /** Header title; omit (with no onClose) to drop the header bar. */
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Footer node, typically right-aligned Buttons. */
  footer?: React.ReactNode;
  /** `modal` = centered card; `panel` = right slide-in. @default "modal" */
  variant?: 'modal' | 'panel';
  /** Width in px. @default 440 (modal) / 460 (panel) */
  width?: number;
  style?: React.CSSProperties;
}

export function Dialog(props: DialogProps): JSX.Element;
