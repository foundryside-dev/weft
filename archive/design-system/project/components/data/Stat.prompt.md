**Stat** — a single metric: big value, uppercase label, optional `delta` and a leading `tone` dot. The dashboard footer counters and the insights KPIs are built from these. `block` stacks them for a KPI grid; `inline` puts label · value on one row for a dense strip. Set `display` for the Space Grotesk display face on hero numbers.

```jsx
{/* KPI grid */}
<div style={{ display: 'flex', gap: 32 }}>
  <Stat label="Open" value={12} tone="var(--status-open)" display />
  <Stat label="In progress" value={5} tone="var(--status-wip)" delta="+2" display />
  <Stat label="Done · 7d" value={28} tone="var(--ready)" display />
</div>

{/* dense footer strip */}
<Stat layout="inline" label="ready" value={8} tone="var(--ready)" />
```

A leading `-` in `delta` auto-reads stale (coral); override with `deltaTone`. Pull `tone` from the status/semantic tokens so dots match the rest of the system.
