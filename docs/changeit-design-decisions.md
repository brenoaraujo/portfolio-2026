# Task: build the Change It "Design decisions" block

## Reference

`docs/changeit-design-decisions-prototype.html` is the approved prototype. It's self-contained: open it in a browser to see the behaviour, and read its `<style>` and `<script>` for every value. Build the component to match it. Don't embed the HTML file as-is.

## Where it goes

`content/work/change-it.mdx`, inside the `<CaseSection title="Design decisions">` block:

- Keep the intro `<Prose>` paragraph ("The recordings and the funnel data pointed to three moments…").
- Replace the three `<ApproachItem>` blocks (01, 02, 03) with the new component: `<SignupDecisions />`.
- The site has a `[lang]` route. Check whether there are translated versions of `change-it.mdx`. If there are, keep the decision text in a props/labels object so it can be localised the same way the other blocks are (see `localizedMdxComponents` in `components/case-study/blocks.tsx`).

## What to build

New client component, `components/case-study/SignupDecisions.tsx` (`"use client"`), registered in `localizedMdxComponents` like the other blocks.

**Layout.** It's one plate: background `#F3F0EC`, radius 24px, inset 1px border `rgb(212,212,212)`, padding 56px 64px. Two columns, 5fr | 6fr, with a 56px gap.
- **Left:** a phone, 330px wide, aspect ratio 572 / 1248, radius 32px, 1px border plus a soft shadow.
- **Right:** an ordered list of the three decisions.
- **Below 860px:** a single column with the phone on top (280px) and the list below.

**List items.**
- **Header:** a big red number (DM Sans 700 28px, `--accent-brand`) and a title (DM Sans 400 22px). Inactive items show the number at 45% opacity and the title in `--text-secondary`.
- **Expanding body:** only the active item expands, with a 0fr → 1fr grid-row transition. It shows three facts: PROBLEM, CHANGE and WHY.
  - Labels use the same tag style as `<Decision>`: 11px, 500 weight, 0.1em tracking, uppercase, `--text-muted`.
  - Fact text uses `BodyText` metrics (DM Sans 16/27) in `--text-primary`.
  - Percentages use the `<Stat>` style.
- **Timer bar:** a 2px black bar under the active item grows from 0 to 100% over the decision's duration. It has no grey track.
- **Dividers:** 1px lines between items only, with no line above the first or below the last.

**Copy.** Use it exactly as written:

| | Title | Problem | Change | Why |
|---|---|---|---|---|
| 01 | Payment on one page | **76%** dropped off at payment | Tier and billing on one page | The third-party card form sometimes loaded blank, so the flow felt broken even when it worked, and **25%** went back to the tiers page. We couldn't change that form, so I designed around it: a clear loading state, the tier kept visible during billing, and a way to change tiers without losing progress. |
| 02 | Tiers before sign-up | **57%** left before billing | Pick a tier before creating an account | We asked people to create an account before they understood the offer or the price. I moved tier selection first, with a fallback for landing pages that couldn't pass a tier, so the ideal path worked without breaking the others. |
| 03 | Email first | **55%** chose email, listed last | Email and password come first | The page led with social login, but most people picked email, and a third of visitors bounced. Putting their choice first and removing a step made the start of sign-up shorter. |

(**bold** = `<Stat>`)

## The phone screens

The Change It screens are rebuilt in HTML; there are no screenshots. In the prototype, every element is absolutely positioned in the 580×1256 Figma export grid and scaled with container query units (`--u: calc(100cqw / 572)`, with the screen offset by −4 units so the 4px export outline is clipped). Port these element lists as they are: `signupBefore`, `signupAfter`, `paymentBefore`, `billing()`, `TIERS`, `PERKS` and `tierCard()`.

- **Fonts inside the phone:** Nunito Sans (400, 700) and Montserrat (400, 700). Load them with `next/font/google` scoped to this component, and don't add them to the site-wide fonts.
- **Logo and icons:** they're inline SVGs in the prototype (Change It logo, status bar, Google, Apple, mail, eye, close, arrow, tick). Move them into small components or `public/assets/work/change-it/` SVG files.
- **Colours:** use the prototype's `--ci-*` tokens, scoped to the component.

## Animation and behaviour

These timings are seconds from the start of each decision. Each decision lasts **16 s**, then the next one opens, and after 03 it loops back to 01.

**01 and 03: old screen → new screen.** Only the elements that changed animate, and the three phases overlap:
- **Removed elements** (keys only in the old list) fade out and move up 20 units over 1.8–2.9 s, staggered top to bottom.
- **Kept elements** (keys in both lists) slide to their new position and size over 2.1–3.5 s, staggered by y. If the styling differs (different HTML), the old and new copies cross-fade quickly mid-slide. Elements that are identical in both don't move.
- **New elements** fade in and rise 28 units over 2.5–3.9 s, staggered top to bottom.
- On 03, "Already have an account? Log In" has a different key in each version (`login` / `login-new`), so it fades out and back in at its new spot instead of sliding. Keep that.

**02: tap-through prototype.**
- At 1.3 s a tap marker appears on "See details". From 1.9 to 2.7 s the Donahue card grows by 706 units, its perks fade in, and the cards below slide down.
- At 4.3 s a tap marker appears on "Select tier". From 5.0 to 5.7 s the billing screen pushes in from the right while the tier screen moves 30% left and dims.

**Between decisions.** The phone dips (translateY 10px, scale 0.95) and settles over 650 ms while the new screen fades in. This doesn't happen on first load.

**Controls.**
- Clicking a decision opens it, restarts its animation, and un-pauses.
- A round pause/play button sits top right of the plate. Give it an aria-label.
- The timer pauses while a mouse is over the list (not the phone), while the plate is under 35% visible (IntersectionObserver), and while the tab is hidden.
- Drive everything from one `requestAnimationFrame` clock (`t` in seconds) so pausing stops all of it together.

**Reduced motion.** No autoplay. Each decision shows its final state, and clicking switches decisions without animating.

**Accessibility.**
- List headers are buttons with `aria-expanded`.
- The phone is `role="img"` with an `aria-label` per decision describing before and after. The labels are in the prototype's `scenes` array.

## Check before shipping

- Desktop and 390px mobile: there's no horizontal scroll, and the phone and list stack properly.
- All three animations run and loop; clicking and pausing work.
- Turn on reduced motion in the OS and confirm that nothing autoplays.
- Run `npm run lint` and the build. Read `AGENTS.md` first: this Next.js version has breaking changes.
