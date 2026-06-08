**Tabs** — the Weft view switcher. `underline` draws a 2px accent (or thread) underline under the active tab on a hairline rule — the section/member treatment; `pill` is the dashboard's nav, where the active tab gets an overlay fill. Tabs can carry an `icon` (a `Mark`, emoji, or unicode glyph) and a muted `count`.

```jsx
const [view, setView] = React.useState('kanban');

<Tabs
  value={view}
  onChange={setView}
  tabs={[
    { id: 'kanban', label: 'Kanban' },
    { id: 'ready', label: 'Ready', count: 8 },
    { id: 'graph', label: 'Graph' },
  ]}
/>

{/* tab a dossier by member — recolor the underline with a thread */}
<Tabs variant="underline" accent="var(--thread-legis)" value={tab} onChange={setTab} tabs={['structure','governance','work']} />
```

Pass `accent` a `--thread-*` var to make the active state a member's color. Use `pill` for top-level app nav, `underline` for in-panel section switching.
