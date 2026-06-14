import * as React from 'react';

export interface TabItem {
  /** Unique id, returned by onChange. */
  id: string;
  /** Visible label. */
  label: React.ReactNode;
  /** Optional leading icon node. */
  icon?: React.ReactNode;
  /** Optional count pill (e.g. number of findings). */
  count?: number | null;
}

export interface TabsProps {
  /** Tab definitions, in order. */
  items: TabItem[];
  /** Currently-selected tab id. */
  value: string;
  /** Called with the new id on selection. */
  onChange?: (id: string) => void;
  className?: string;
}

/**
 * Underline-style tab navigation with an indigo active marker and optional
 * count pills. Used for dashboard view switching (Board / Graph / Files / Health).
 */
export function Tabs(props: TabsProps): React.ReactElement;
