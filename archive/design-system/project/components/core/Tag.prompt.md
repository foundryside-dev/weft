**Tag** — the workhorse inline chip used all over the product: issue ids, type words, status words (`in_progress`, `triage`, `verifying`), and severities. Pass a semantic token as `tone` and it auto-tints (soft alpha wash or bordered outline); omit `tone` for a neutral overlay chip.

```jsx
<Tag>fg-da8d</Tag>                                   {/* neutral id chip */}
<Tag tone="var(--status-wip)">in_progress</Tag>      {/* soft status wash */}
<Tag tone="var(--sev-critical)" variant="severity">critical</Tag>
<Tag tone="var(--thread-legis)">legis</Tag>          {/* member thread */}
```

Variants: `soft` (alpha wash, default) · `severity`/`outline` (wash + tinted border) · `plain` (neutral overlay, ignores tone). Keep tone semantic — status, severity, or member-thread — never decorative.
