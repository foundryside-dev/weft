**Button** — the Weft action control: mono type, 6px radius, no pill shapes, no press-scale. Use for any click action; reach for `primary` (amber) once per view, `secondary`/`ghost` for everything else, and the semantic `danger`/`ready` fills only when the action is destructive or affirmative.

```jsx
<Button variant="primary" onClick={createIssue}>+ New issue</Button>
<Button variant="secondary">Filters</Button>
<Button variant="ghost">Kanban</Button>
<Button variant="danger">Close all</Button>
<Button variant="ready" size="sm">● Ready (12)</Button>
```

Variants: `primary` (dyed amber, ink text) · `secondary` (overlay fill, strong border) · `ghost` (transparent → overlay on hover) · `danger` (umber-maroon) · `ready` (deep emerald). Sizes: `sm` / `md` / `lg`. `loading` dims to 60% and shows "Loading…"; `disabled` drops to 45%. Hover lightens one surface step (primary darkens the amber); focus draws a 2px accent ring.
