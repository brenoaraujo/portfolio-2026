# Handoff: Experience row with fanned work previews (option 3b)

## Overview
An "Experience" list for a one-designer portfolio. Each role is a text row; hovering a row
deals a small fan of project screenshots into the empty right-hand column, and hovering one
of those frames opens it as a large preview **above** the row. Nothing in document flow ever
moves — the whole interaction is opacity + transform on absolutely positioned elements.

The design goal was a hover reveal in the spirit of tilted-screenshot portfolio rows, but
built so the pointer can never land on a target that then moves out from under it (an earlier
iteration did, and it caused an open/close loop).

## About the Design Files
The files in this bundle are **design references created in HTML** — a working prototype of the
intended look and behavior, not production code to copy. The task is to **recreate this design
in the target codebase's existing environment** (React, Vue, Svelte, SwiftUI, native, whatever
is already there) using its established component patterns, styling approach, and animation
utilities. If there is no existing environment yet, pick the framework that best fits the project
and implement it there.

`Inclined Image Ideas.dc.html` is an exploration document containing several options. **Only
option `3b` is the approved direction** — it is the second block under the "Turn 3" heading.
Everything else in that file (1a–1f, 2a, 3a) is discarded exploration; ignore it. Option 3a is
included only as context for why 3b won (3a puts the preview to the left over the text column
instead of above the row).

## Fidelity
**High fidelity.** Colors, typography, spacing, sizes, easing and durations below are the final
intended values and should be matched exactly. They come from a bound design system (see
`design-system/` in this bundle) — prefer that system's tokens over the literal values where
the target codebase already exposes them.

## Screens / Views

### Experience section
**Purpose:** let a reader skim roles as text, and optionally look at the work without leaving
the list or losing their scroll position.

**Layout**
- Section is a vertical stack, `gap: 24px`, on the paper ground `rgb(253,251,250)`.
- Section heading: "Experience" — Noto Serif 26px / 39px line-height, `rgb(0,0,0)`.
- A 0.5px hairline `rgb(212,212,212)` under the heading, and one closing every row.
  Implemented as a zero-height element with `box-shadow: inset 0 0.5px 0 rgb(212,212,212)`
  (the design system's only line treatment — do not use `border`, and do not add shadows).
- Each row is `position: relative` and a 3-column grid: `1fr minmax(0, 2fr) 1fr`,
  `gap: 24px`, `padding: 20px 0 24px`. The third column is intentionally empty in the
  resting state — that emptiness is the stage for the previews.
- Row `z-index`: 1 at rest, 40 while hovered (so its preview paints over neighbouring rows).

**Row column 1 — dates**
- Noto Serif 16px, `line-height: 100%`, `rgb(102,102,102)`. e.g. "2021 — 2024" (em dash).

**Row column 2 — role**
- `display: flex; flex-direction: column; gap: 12px; min-width: 0`.
  `min-width: 0` matters: without it the grid's `2fr` track refuses to shrink and pushes
  the date column narrower.
- Title: Noto Serif 18px, weight 700, `line-height: 100%`, `rgb(0,0,0)`.
  Trailing qualifier ("· Contract") is the same element at weight 400, `rgb(102,102,102)`.
- Blurb: DM Sans 18px / 27px, `rgb(102,102,102)`, `max-width: 460px`, `text-wrap: pretty`.

**Row column 3 — the fan (2–4 frames)**
- Container: `position: relative; height: 84px`. Height is fixed so revealing the fan cannot
  change row height.
- Each frame is an `<img>`, `position: absolute; top: 6px`, `112 × 74`, `object-fit: cover`,
  `object-position: top left`, `border-radius: 12px`, `border: 1px solid rgb(212,212,212)`,
  `box-sizing: border-box`, `background: rgb(255,255,255)`, `cursor: pointer`.
- `z-index: 10 + (count - index)` so earlier frames sit on top.
- **Resting (row not hovered):** `opacity: 0`, `pointer-events: none`, `left: 0`,
  `transform: rotate(0deg) translateY(10px)` — a single square pile.
- **Row hovered (entrance):** `opacity: 1`, `pointer-events: auto`,
  `left: index * 18px`, `transform: rotate(-6deg + index * 4.5deg) translateY(0)`.
  Transition `opacity 220ms, transform 380ms, left 380ms`, easing
  `cubic-bezier(0.2, 0, 0.2, 1)`, staggered `index * 55ms` — the frames deal themselves
  out one after another. The stagger is applied **only** while no frame is selected; once
  one is selected the delay drops to 0 so the dim/undim reads as immediate.
- **A frame hovered:** that frame stays at `opacity: 1`; the others go to `opacity: 0.42`.
  **Positions and rotations do not change.** This is the load-bearing rule of the design:
  after the entrance settles, no hover target ever moves. Do not "helpfully" re-arrange,
  spread, or lift frames on frame-hover.

**Large preview**
- One `<img>` per row, `position: absolute`, `pointer-events: none`, `z-index: 70`.
- `325 × 215`, same plate treatment as the small frames (radius 12, 1px `rgb(212,212,212)`
  hairline, white background, `object-fit: cover`, `object-position: top left`).
- Anchored to the fan's top-right: `bottom: 26px`, `left: (count * 18) + 112 - 325` px.
  It opens **upward**, into the vertical air above the row, and is flush right with the fan.
- Hidden: `opacity: 0`, `transform: translateY(6px)`. Shown: `opacity: 1`,
  `transform: translateY(0)`. Transition `opacity 180ms, transform 220ms`, same easing.
- `pointer-events: none` is required — the preview overlaps the text column and must not
  swallow hovers or block the row's own mouseleave.
- Its `src` is the last-hovered frame's image, **kept after the frame is un-hovered**, so the
  preview fades out showing the image you were just looking at rather than snapping to a
  different one mid-fade.

## Interactions & Behavior
1. `mouseenter` on a row → fan deals out (staggered), preview stays hidden.
2. `mouseenter` on a frame → set that frame active (clearing any sibling active state, and
   also setting the row active, which makes touch/fast-pointer entry work), preview fades in
   with that frame's image, siblings dim to 0.42.
3. `mouseenter` on a different frame → preview cross-fades to the new image; frames stay put.
4. `mouseleave` on the row → clear the row's active flag **and** all of its frames' flags in
   one state update. Fan returns to the pile, preview fades out. Clearing them together avoids
   a frame staying visually selected after the fan has collapsed.
5. There is no click behavior in the prototype. If these should link to case studies, wrap each
   frame in an `<a>` — but keep the large preview `pointer-events: none`.

Accessibility / non-hover input to add in implementation (not in the prototype):
- Keyboard: make frames focusable and treat `focus` exactly like `mouseenter`.
- Touch: there is no hover; either reveal the fan permanently below the text on small screens,
  or make the fan a simple horizontal row of tappable thumbnails that navigate.
- `prefers-reduced-motion: reduce` → drop the stagger and the transforms, keep the opacity fade.

## State Management
Per row, all that is needed is:
- `hoveredRow: boolean`
- `activeFrameIndex: number | null`
- `lastFrameIndex: number` — persists after `activeFrameIndex` clears, purely so the preview
  can fade out on the correct image.

No data fetching. In the prototype this is one flat map keyed by row/frame, but per-row local
state in a `<ExperienceRow>` component is the cleaner implementation.

## Design Tokens
From the bound design system (`design-system/tokens/`). Use the token, not the literal, where possible.

Colors
- Ground / page background: `rgb(253,251,250)`
- Plate background: `rgb(255,255,255)`
- Primary text: `rgb(0,0,0)`
- Secondary text (body, dates): `rgb(102,102,102)`
- Link: `rgb(100,99,96)`
- Hairline / plate border: `rgb(212,212,212)`
- No accent colors. All color in the design comes from the untreated screenshots.

Typography
- Serif (voice): Noto Serif — 26/39 section title, 18 bold 100% row title, 16 100% dates
- Sans (information): DM Sans — 18/27 body
- Mono (labels in the exploration doc only): DM Mono 12
- Tracking is negative or zero, never open.

Spacing
- Section stack gap 24; row padding `20px 0 24px`; grid gap 24; in-row gap 12
- Fan step 18px horizontal; frame `top: 6`; preview `bottom: 26`

Radii — `12px` (all screenshot plates). `8px` exists in the system for the 52px avatar only.

Lines — one only: `0.5px rgb(212,212,212)` as an inset shadow. Plate borders are `1px` of the
same color. **No drop shadows, no elevation, no glows anywhere in this system.**

Motion
- Easing `cubic-bezier(0.2, 0, 0.2, 1)` for everything
- Fan entrance: transform/left 380ms, opacity 220ms, stagger 55ms per frame
- Preview: opacity 180ms, transform 220ms
- Dim/undim: 220ms, no delay

## Assets
`assets/` — four product screenshots from the design system
(`work-onboarding.png`, `work-ticket-app.png`, `work-raffle-design-system.png`,
`work-website-redesign.png`). They are placeholders standing in for real project images and
must be used **untreated** — no duotone, no overlay, no grain, no tilt-into-device mockups.
Substitute the real project screenshots at the same aspect handling
(`object-fit: cover; object-position: top left`).

`design-system/` — the bound Breno Araujo Portfolio design system: token CSS, `styles.css`,
the component bundle, and `readme.md` with the full visual guide. Read that readme before
implementing; it is the authority on anything this document leaves open.

The row copy in the prototype is placeholder text written to demonstrate the layout. Replace it
with real content.

## Files
- `Inclined Image Ideas.dc.html` — the prototype. Approved design is the `id="3b"` block
  ("Fanned stack, preview above") in the first section. Its behavior lives in the
  `staticRows("fan")` method of the file's logic class — that method is the reference
  implementation for every number above, and it also serves option 3a via a `mode` flag.
- `support.js` — runtime required only to open the prototype in a browser. Not part of the design.
- `assets/`, `design-system/` — as described above.
