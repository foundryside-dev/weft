import * as React from 'react';

/**
 * A small inline metadata chip — issue id, type, status word, or severity.
 * `tone` tints it with a soft wash (or outline) of any semantic token.
 */
export interface TagProps {
  children: React.ReactNode;
  /** Any CSS color, typically a token: "var(--status-wip)", "var(--sev-high)", "var(--thread-legis)". Omit for a neutral overlay chip. */
  tone?: string;
  /** `soft` = alpha wash; `severity`/`outline` = washed fill + tinted border; `plain` = neutral overlay (ignores tone). @default "soft" */
  variant?: 'soft' | 'severity' | 'outline' | 'plain';
  style?: React.CSSProperties;
}

export function Tag(props: TagProps): JSX.Element;
