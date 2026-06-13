import * as React from 'react';

/** A single-line text field — mono, overlay fill, accent focus ring. */
export interface InputProps {
  /** Uppercase eyebrow label above the field. */
  label?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  readOnly?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Pixel width of the field. @default 260 */
  width?: number | string;
  style?: React.CSSProperties;
}

export function Input(props: InputProps): JSX.Element;
