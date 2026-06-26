import React from 'react';
import { MemberMark } from '@weft/site-kit';

const wrap: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' };
const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' };

// Every federation member by its thread color + mono name.
export const Roster = () => (
  <div style={wrap}>
    <MemberMark member="loomweave" />
    <MemberMark member="filigree" />
    <MemberMark member="wardline" />
    <MemberMark member="legis" />
    <MemberMark member="plainweave" />
    <MemberMark member="warpline" />
    <MemberMark member="lacuna" />
  </div>
);

// With each member's one-line domain authority appended.
export const WithDomain = () => (
  <div style={col}>
    <MemberMark member="loomweave" showDomain />
    <MemberMark member="filigree" showDomain />
    <MemberMark member="wardline" showDomain />
    <MemberMark member="legis" showDomain />
  </div>
);

// Two sizes.
export const Sizes = () => (
  <div style={wrap}>
    <MemberMark member="loomweave" size="md" />
    <MemberMark member="loomweave" size="lg" />
  </div>
);
