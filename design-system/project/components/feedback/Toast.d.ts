import * as React from 'react';

/**
 * A small transient notification — surface card, tone-colored left rule, soft
 * popover shadow. Stack several in a fixed corner; this is one slip.
 *
 * @startingPoint section="Components" subtitle="Toast notifications in semantic tones" viewport="700x230"
 */
export interface ToastProps {
  /** Left-rule + icon color. Semantic token. @default "var(--accent)" */
  tone?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Optional leading glyph (unicode / emoji / Mark). */
  icon?: React.ReactNode;
  /** Shows a × dismiss button wired to this handler. */
  onDismiss?: () => void;
  style?: React.CSSProperties;
}

export function Toast(props: ToastProps): JSX.Element;
