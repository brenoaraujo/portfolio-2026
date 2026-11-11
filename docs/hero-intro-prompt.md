# Homepage hero intro animation

Add a one-time intro animation to the homepage hero. Do not change any copy, layout, spacing or colors. Before writing code, read the relevant guides in node_modules/next/dist/docs/ (this Next.js version has breaking changes, see AGENTS.md).

Files involved: components/content/HomeRedesign.tsx, components/bento/GridEdgeLines.tsx, app/globals.css (the .bento, .bento-grid, .tile, .bento-node and .hero-tile rules).

All times are delays from the moment the animation starts (after fonts are ready).

## 1. The grid draws itself (0 to 1000ms)

The dashed lines around the hero grow out of the square nodes instead of appearing at once.

- Top-left hero node pops in at 0ms: opacity 0 to 1, scale 0.3 to 1, 260ms, cubic-bezier(0.34, 1.56, 0.64, 1).
- From that node, the top horizontal rule (including the GridEdgeLines extension to the viewport edges) grows outward in both directions: 80ms delay, 750ms.
- The left vertical border of .bento grows up and down from the same node: 80ms delay, 1000ms.
- Bottom-left node pops at 240ms, and the hero's bottom rule grows from it: 260ms delay, 750ms.
- Top-right node pops at 460ms, and the right vertical border grows from it: 480ms delay, 1000ms.
- Bottom-right node pops at 660ms.
- Lines use cubic-bezier(0.2, 0.7, 0.2, 1). Animate them with clip-path: inset() so the dash pattern never stretches.
- Hide the real CSS borders only while the overlay draws them. The final state must look identical to today.
- The header (logo and "Open to product design roles" pill) fades in over 400ms at 0ms.

## 2. Headline, letter by letter (starts at 380ms)

- Split the h1 into words, and each word into letters. Each word is an inline-block span with white-space: nowrap, so a word never breaks across lines. Each letter is an inline-block span with transform-origin: 50% 60%.
- Keep the full text on the h1 with aria-label, and mark the word spans aria-hidden.
- Each letter animates from opacity 0, filter: blur(10px), transform: scale(1.25) to opacity 1, blur(0), scale(1).
- 900ms per letter, cubic-bezier(0.16, 1, 0.3, 1), staggered 24ms per letter from left to right across the whole headline. Letters scale in place, nothing moves.
- When the animation ends, replace the spans with the plain h1 text. Splitting into letters removes the font's kerning, so the headline is a few pixels wider while split.
- The eyebrow ("Product designer & design engineer") fades in over 400ms at 300ms.

## 3. The rest settles in

- Subtext: opacity 0 to 1 and translateY(14px) to 0, 700ms at 950ms, cubic-bezier(0.16, 1, 0.3, 1).
- LinkedIn button: same motion, 700ms at 1080ms.
- Work tiles: opacity 0 to 1, 600ms, starting at 700ms with 80ms between tiles, ease-out.

## Rules

- Use the Web Animations API with fill: "backwards", so each element is hidden only until its own delay ends.
- Play once per browser session (sessionStorage flag, wrapped in try/catch). Later visits in the same session show everything immediately.
- Respect prefers-reduced-motion: no animation at all, the page renders in its final state.
- Without JavaScript the page must render fully, with every border and all text visible. Only add the pre-hide class from a small inline script, and never ship CSS that hides content by default.
- Start after document.fonts.ready, with a 500ms fallback, so the grid lines are measured in the right place.
- Nothing may shift layout. Only opacity, filter, transform and clip-path animate.
- Put it in a client component (for example components/bento/HeroIntro.tsx) and keep HomeRedesign server-rendered.
- When done, run the dev server and check desktop (1440px) and phone (375px) widths, plus reduced motion.
