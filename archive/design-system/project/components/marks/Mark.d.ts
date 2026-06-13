import * as React from 'react';

/**
 * A Weft federation glyph. Stroke-based, `currentColor` — set the color (or a
 * `.thread-*` helper / `--thread` var) on the element to paint it.
 *
 * @startingPoint section="Brand" subtitle="The org mark, the woven umbrella, and the member glyphs" viewport="700x210"
 */
export interface MarkProps {
  /** Which glyph to render. */
  name:
    | 'foundryside'
    | 'weft'
    | 'loomweave'
    | 'filigree'
    | 'wardline'
    | 'legis'
    | 'charter'
    | 'shuttle'
    | 'lacuna';
  /** Pixel size (square). @default 24 */
  size?: number;
  /** Accessible label; falls back to `name`. */
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Mark(props: MarkProps): JSX.Element;
