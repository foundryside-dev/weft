import * as React from 'react';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Controlled on/off state. */
  checked?: boolean;
  /** Uncontrolled initial state. */
  defaultChecked?: boolean;
  /** Change handler. */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** Optional trailing label. */
  label?: React.ReactNode;
  disabled?: boolean;
}

/**
 * Binary toggle — turns the track indigo when on. Use for enabling a feature
 * dial (e.g. a Legis 2×2 cell, "judge on"), not for choosing between options.
 */
export function Switch(props: SwitchProps): React.ReactElement;
