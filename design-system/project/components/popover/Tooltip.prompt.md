**Tooltip** — a small hover/focus popover for terse hints (a glyph's meaning, a truncated id, a keyboard shortcut). Surface slip, hairline border, soft shadow, mono 11px, no wrap. Shows on hover *and* keyboard focus.

```jsx
<Tooltip content="blocks 5 downstream" placement="top">
  <span style={{ color: 'var(--aging)' }}>⚡5</span>
</Tooltip>
```

Keep `content` short (it's single-line). For interactive content or a list of choices, use `Dropdown`.
