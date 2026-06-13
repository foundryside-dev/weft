**Table** — the Weft data grid for list views (the Ready queue, insights breakdowns). Config-driven: `columns` set the header label, alignment, width, and an optional cell `render`; `rows` are plain objects keyed by `column.key`. Hairline rules, uppercase header, hover highlight, optional clickable rows. Flat — no zebra striping.

```jsx
<Table
  rows={readyIssues}
  onRowClick={(r) => open(r)}
  getRowKey={(r) => r.id}
  columns={[
    { key: 'id', label: 'ID', width: 110, render: (v) => <Tag tone="var(--surface-overlay)">{v}</Tag> },
    { key: 'title', label: 'Title' },
    { key: 'priority', label: 'P', align: 'center', width: 50, render: (v) => `P${v}` },
    { key: 'status', label: 'Status', width: 120, render: (v) => <Tag tone="var(--status-wip)">{v}</Tag> },
    { key: 'impact', label: 'Blocks', align: 'right', width: 80, render: (v) => v ? `⚡${v}` : '—' },
  ]}
/>
```

Use `render` to drop `Tag`/`Badge`/`Mark` into cells. Set `dense` for tighter rows. Pass `getRowKey` for stable keys when rows reorder.
