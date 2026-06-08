import * as React from 'react';

/**
 * The Weft data grid — config-driven columns + plain-object rows, hairline
 * rules, uppercase header, hover highlight, optional clickable rows. Flat (no
 * zebra striping).
 *
 * @startingPoint section="Components" subtitle="Config-driven data grid with custom cell renderers" viewport="700x300"
 */
export interface TableProps {
  columns: TableColumn[];
  rows: any[];
  /** Makes rows clickable — receives (row, index). */
  onRowClick?: (row: any, index: number) => void;
  /** Stable key per row; defaults to the row index. */
  getRowKey?: (row: any, index: number) => string | number;
  /** Tighter row padding. @default false */
  dense?: boolean;
  /** Message shown when `rows` is empty. @default "No rows" */
  empty?: React.ReactNode;
  style?: React.CSSProperties;
}

export interface TableColumn {
  /** Field key on each row object. */
  key: string;
  /** Header label. Defaults to `key`. */
  label?: React.ReactNode;
  /** Cell + header alignment. @default "left" */
  align?: 'left' | 'center' | 'right';
  /** Fixed column width (CSS value), e.g. 90 or "30%". */
  width?: number | string;
  /** Custom cell renderer — receives (value, row, index). */
  render?: (value: any, row: any, index: number) => React.ReactNode;
}

export function Table(props: TableProps): JSX.Element;
