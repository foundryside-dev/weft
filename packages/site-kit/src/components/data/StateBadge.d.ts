import * as React from 'react';

export type WorkflowState =
  | 'open' | 'in_progress' | 'closed'
  | 'proposed' | 'approved' | 'building' | 'reviewing' | 'done'
  | 'triage' | 'confirmed' | 'fixing' | 'verifying' | 'wont_fix' | 'not_a_bug';

export interface StateBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** A Filigree workflow state. Tone is derived automatically. */
  state?: WorkflowState | string;
}

/**
 * A Filigree issue workflow-state pill, covering the task / feature / bug state
 * machines. Active states fill indigo; review states (reviewing/verifying) go
 * brass to flag the gate; done is woad; won't-fix / not-a-bug are dashed ash.
 */
export function StateBadge(props: StateBadgeProps): React.ReactElement;
