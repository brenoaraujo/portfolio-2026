One row of the Experience list — period on the left, role + summary in the wide middle column, hairline underneath.

```jsx
<div style={{display:"flex",flexDirection:"column",gap:32}}>
  <Experience period="2023-2026" title="Senior Product Designer, Ascend"
    description="Setting design direction across point-of-sale, checkout, design systems, and a marketing operations platform." />
  <Experience period="2019-2023" title="Lead Designer, VanHack"
    description="Designing both sides of a talent marketplace — 500K+ engineers, and the recruiters hiring them." />
</div>
```

The third grid column is intentionally empty — it holds the right-hand air of the 1200px content column. Don't fill it.
