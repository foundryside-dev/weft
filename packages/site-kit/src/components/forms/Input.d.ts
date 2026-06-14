import * as React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  /** Field label rendered above the control. */
  label?: React.ReactNode;
  /** Helper text below the field. */
  hint?: React.ReactNode;
  /** Error message — replaces hint and turns the field madder. */
  error?: React.ReactNode;
  /** Use the monospace face (for SEIs, paths, tokens, numeric data). */
  mono?: boolean;
  /** Node rendered inside, before the text (icon or unit). */
  prefix?: React.ReactNode;
  /** Node rendered inside, after the text (icon or unit). */
  suffix?: React.ReactNode;
}

/**
 * Inset text field on a sunken linen well with a hairline border and an indigo
 * focus ring. Set `mono` for machine values (SEIs, paths, env vars).
 */
export function Input(props: InputProps): React.ReactElement;
