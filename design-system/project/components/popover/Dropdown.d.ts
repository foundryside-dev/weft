import * as React from 'react';

/**
 * A trigger button + popover menu. Surface list, 8px radius, soft shadow;
 * closes on select / outside-click / Esc.
 *
 * @startingPoint section="Components" subtitle="Trigger button + popover menu with icons & danger items" viewport="700x300"
 */
export interface DropdownProps {
  /** Contents of the trigger button (text or node). */
  trigger: React.ReactNode;
  items: MenuItem[];
  /** Which edge the menu aligns to. @default "left" */
  align?: 'left' | 'right';
  /** Min menu width in px. @default 200 */
  width?: number;
  /** Show the ▾ caret on the trigger. @default true */
  caret?: boolean;
  style?: React.CSSProperties;
}

export interface MenuItem {
  label?: React.ReactNode;
  /** Leading glyph (unicode / emoji / Mark). */
  icon?: React.ReactNode;
  onSelect?: () => void;
  /** Reads in warm coral — for destructive choices. */
  danger?: boolean;
  disabled?: boolean;
  /** Render a divider rule instead of an item. */
  divider?: boolean;
}

export function Dropdown(props: DropdownProps): JSX.Element;
