import * as React from 'react';

/**
 * The Weft view switcher — accent/thread underline tabs, or the dashboard's
 * overlay-fill pill nav.
 *
 * @startingPoint section="Components" subtitle="Underline tabs + pill nav, thread-colorable" viewport="700x130"
 */
export interface TabsProps {
  /** Tab definitions, or plain strings (used as both id and label). */
  tabs: (TabItem | string)[];
  /** The active tab id. */
  value: string;
  onChange?: (id: string) => void;
  /** `underline` = accent underline; `pill` = overlay-fill nav. @default "underline" */
  variant?: 'underline' | 'pill';
  /** Active-state color — pass a thread var to tab by member. @default "var(--accent)" */
  accent?: string;
  style?: React.CSSProperties;
}

export interface TabItem {
  id: string;
  label: React.ReactNode;
  /** Optional leading glyph (a Mark, emoji, or unicode icon). */
  icon?: React.ReactNode;
  /** Optional trailing count, muted. */
  count?: number;
}

export function Tabs(props: TabsProps): JSX.Element;
