**Dropdown** — a trigger button + popover menu (row actions, a filter menu, an overflow ⋯). Surface-raised list, 8px radius, soft popover shadow; items hover to `surface-hover`, a `danger` item reads in coral, and it closes on select, outside-click, or Esc.

```jsx
<Dropdown
  trigger="Actions"
  items={[
    { label: 'Advance state', icon: '▸', onSelect: advance },
    { label: 'Claim', icon: '👤', onSelect: claim },
    { divider: true },
    { label: 'Delete issue', icon: '×', danger: true, onSelect: del },
  ]}
/>

<Dropdown trigger="⋯" caret={false} align="right" width={160} items={menu} />
```

Items: `{ label, icon?, onSelect?, danger?, disabled? }` or `{ divider: true }`. Use `align="right"` when the trigger sits at the right edge of a row.
