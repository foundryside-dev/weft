import * as React from 'react';

/**
 * The SEI-keyed entity dossier — one durable identity, facts woven from each
 * federation tool. The brand's central composition artifact.
 *
 * @startingPoint section="Product" subtitle="One SEI identity, enriched by all five tools" viewport="560x300"
 */
export interface DossierProps {
  /** The entity name (e.g. "auth.session.build_record"). */
  entity: string;
  /** Stable Entity Identity, shown as a chip (e.g. "sei:7f3a…b1"). */
  sei?: string;
  /** Shows the green "● fresh" liveness marker. @default true */
  fresh?: boolean;
  facts: DossierFact[];
  style?: React.CSSProperties;
}

export interface DossierFact {
  /** Which tool produced this fact — sets the Mark + thread color. */
  member: 'loomweave' | 'filigree' | 'wardline' | 'legis' | 'charter' | 'shuttle';
  /** The fact text. ReactNode so you can <b> the key value. */
  value: React.ReactNode;
}

export function Dossier(props: DossierProps): JSX.Element;
