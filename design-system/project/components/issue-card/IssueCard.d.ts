import * as React from 'react';

/**
 * The canonical Filigree kanban card — type-colored left rule, emoji type,
 * priority marker, title, and a metadata row. Color is semantic only.
 *
 * @startingPoint section="Product" subtitle="The canonical Filigree kanban card with all states" viewport="320x90"
 */
export interface IssueCardProps {
  issue: Issue;
  /** Click handler; makes the card a button. Omit for a static card. */
  onOpen?: (issue: Issue) => void;
  style?: React.CSSProperties;
}

export interface Issue {
  id: string;
  type: 'bug' | 'feature' | 'task' | 'epic' | 'milestone';
  /** 0–4 (P0 hottest). <=1 renders a Pn number; else a priority dot. */
  priority: number;
  title: string;
  /** Short status word shown as a tinted chip (e.g. "building", "fixing"). */
  status: string;
  /** Which column / lifecycle bucket. Drives the rule + age color. */
  cat: 'open' | 'wip' | 'done';
  assignee?: string | null;
  /** Hours in WIP. >4h → aging rule, >24h → stale rule. */
  ageH?: number;
  /** No open blockers + open category → emerald "ready" rule + glow. */
  ready?: boolean;
  /** Downstream blocks count; >0 shows the ⚡ impact marker. */
  impact?: number;
  blocked_by?: string[];
}

export function IssueCard(props: IssueCardProps): JSX.Element;
