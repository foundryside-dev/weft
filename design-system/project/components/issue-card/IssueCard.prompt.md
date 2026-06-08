**IssueCard** — the canonical Filigree kanban card, faithful to the real dashboard. Feed it an `issue` object; it derives the left-rule color and glow (type color normally; emerald `ready` rule when startable; aging/stale rule when WIP runs long), the priority marker (P0/P1 number else a dot), and the metadata row (id, type, status tag, blockers, impact, assignee, age).

```jsx
<IssueCard
  issue={{ id: 'fg-7f3a', type: 'feature', priority: 0, title: 'SEI backfill: locator → stable identity',
           status: 'building', cat: 'wip', assignee: 'agent-3', ageH: 2, ready: true, impact: 5 }}
  onOpen={openDetail}
/>
```

Pass `onOpen` to make it clickable. Lay several out in a column with `gap: 8` to rebuild a board lane — that's exactly what the Filigree dashboard kit does.
