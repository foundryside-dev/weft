import * as React from 'react';

export interface ExitCodeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The exit code. 0 = clean (woad), 1 = gate tripped (madder), 2 = error (brass). */
  code?: number;
  /** Show the trailing meaning label. */
  showLabel?: boolean;
  /** Override the default label text. */
  label?: string;
}

/**
 * A CLI exit-code chip. Encodes Weft's shared convention: `0` clean,
 * `1` gate tripped, `2` tool error — colored woad / madder / brass.
 */
export function ExitCode(props: ExitCodeProps): React.ReactElement;
