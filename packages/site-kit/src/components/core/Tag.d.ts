import * as React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Optional leading square dot color (e.g. a member thread color or label hue). */
  color?: string | null;
  /** When provided, renders a removable "×" affordance and calls this on click. */
  onRemove?: (() => void) | null;
  children?: React.ReactNode;
}

/**
 * A neutral label chip — issue labels, filters, facets. Square-cornered (not a
 * pill — that's Badge). Pass `color` for a categorical dot, `onRemove` to make
 * it dismissible.
 */
export function Tag(props: TagProps): React.ReactElement;
