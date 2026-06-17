import React from 'react';
import { Tabs } from '@weft/site-kit';

const DASHBOARD = [
  { id: 'board', label: 'Board' },
  { id: 'graph', label: 'Graph' },
  { id: 'files', label: 'Files', count: 128 },
  { id: 'health', label: 'Health', count: 3 },
];

// Interactive: click to switch the active tab (underline + count pills).
export const Interactive = () => {
  const [value, setValue] = React.useState('board');
  return <Tabs items={DASHBOARD} value={value} onChange={setValue} />;
};

// Active state on a later tab, showing the count pill highlight.
export const ActiveWithCounts = () => (
  <Tabs items={DASHBOARD} value="files" onChange={() => {}} />
);

// Minimal two-tab switch, no counts.
export const Simple = () => {
  const [value, setValue] = React.useState('current');
  return (
    <Tabs
      items={[
        { id: 'current', label: 'Current state' },
        { id: 'decisions', label: 'Decisions' },
      ]}
      value={value}
      onChange={setValue}
    />
  );
};
