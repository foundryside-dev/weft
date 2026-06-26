import * as React from 'react';

export type WeftMember = 'loomweave' | 'filigree' | 'wardline' | 'legis' | 'plainweave' | 'warpline' | 'lacuna';

export const WEFT_MEMBERS: Record<WeftMember, { name: string; color: string; domain: string }>;

export interface MemberMarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Which federation member. */
  member?: WeftMember;
  /** Mark size. */
  size?: 'md' | 'lg';
  /** Append the member's one-line domain authority. */
  showDomain?: boolean;
}

/**
 * Identifies a federation member by its thread color (square dot) and mono name.
 * Prefer this over per-member icons. `showDomain` appends its domain authority.
 */
export function MemberMark(props: MemberMarkProps): React.ReactElement;
