Outbound-link arrow, 16×16, 0.8px stroke — the only icon paired with text links in the portfolio.

```jsx
<span style={{display:"flex",alignItems:"center",gap:9}}>
  <TextLink href="#">Let's talk</TextLink>
  <ArrowUpRight />
</span>
```

Props: `size` (default 16), `color` (defaults to `var(--icon-ink)`; `TextLink` renders it in the link color). Stroke-only — never fill it.
