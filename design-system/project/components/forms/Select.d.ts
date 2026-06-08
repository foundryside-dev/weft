import * as React from 'react';

/** A styled native select matching the Input field, with a ▾ caret. */
export interface SelectProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /** <option> elements. */
  children?: React.ReactNode;
  disabled?: boolean;
  /** @default 200 */
  width?: number | string;
  style?: React.CSSProperties;
}

export function Select(props: SelectProps): JSX.Element;
