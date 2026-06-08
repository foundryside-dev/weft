**Dossier** — the SEI-keyed entity view: one durable code entity, enriched by a row of facts from each federation tool (Loomweave structure, Wardline taint, Legis governance, Filigree work, Charter obligations). Each fact shows its member's `Mark` and thread color. This is the brand's signature "five tools, one identity, enrich-only" artifact.

```jsx
<Dossier
  entity="auth.session.build_record"
  sei="sei:7f3a…b1"
  facts={[
    { member: 'loomweave', value: <>function · <b>14 callers</b> · 2 subsystems</> },
    { member: 'wardline', value: <>taint <b style={{ color: 'var(--stale)' }}>EXTERNAL_RAW</b> reaches ASSURED producer</> },
    { member: 'legis', value: <>override <b>recorded</b> · awaiting async review</> },
    { member: 'filigree', value: <>issue <b>fg-da8d</b> · fixing · P1</> },
    { member: 'charter', value: <>obligation <b>REQ-204</b> · verification pending</> },
  ]}
/>
```

`value` is a ReactNode — wrap the key term in `<b>` (it renders in `--text-primary`). Composes the `Mark` component, so order facts in the suite's read order: structure → trust → governance → work → requirements.
