The case-study card used in "Recent work." — screenshot thumbnail, discipline eyebrow, serif title.

```jsx
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32}}>
  <WorkItem image="assets/work-onboarding.png" eyebrow="User Flow and UI" title="Onboarding for a new revenue streamline" />
  <WorkItem image="assets/work-ticket-app.png" eyebrow="Mobile App" title="On-Site Ticket Sales App" />
</div>
```

Notes: the thumbnail holds the source's 585 : 389.7 ratio at any column width (`imageHeight` overrides it); never crop it to a different aspect. `href` turns the whole card into a link.
