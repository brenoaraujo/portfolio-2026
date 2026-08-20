The hairline rule. Grows to fill the gap between the profile block and the nav in the header, and closes each list row.

```jsx
<header style={{display:"flex",gap:24,alignItems:"center"}}>
  <Profile />
  <Divider />
  <nav style={{display:"flex",gap:32}}>…</nav>
</header>
```

Rendered as a 0-height element with a 0.5px inset shadow, matching the source's zero-height line node.

Intentional addition — no Figma symbol; promoted from the repeated 0.5px line node in the Handoff frame.
