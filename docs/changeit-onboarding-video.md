# Task: add the Change It onboarding animation to the case study

## Assets (already in the repo)

All in `public/assets/work/change-it/`:

| File | What it is | Size |
|---|---|---|
| `onboarding-flow.webm` | VP9, 2400×1400, 30 fps, 10.6 s, no audio. Primary source. | ~290 KB |
| `onboarding-flow.mp4` | H.264 High, yuv420p, faststart, no audio. Safari fallback. | ~460 KB |
| `onboarding-flow-poster.webp` | The "Before · 7 screens" state, after the screens have risen in. Use as the `poster`. | ~30 KB |
| `onboarding-flow-fallback.webp` | The settled "After · 4 screens" state. Show this instead of the video for `prefers-reduced-motion` users. | ~25 KB |
| `onboarding-flow-thumb.webp` | 1200×700 version of the end state, for cards or OG images if needed. | ~11 KB |

Aspect ratio: **2400 / 1400 (12 / 7)**. Background colour is `#EBE6E0` (`--background-primary`), so the video blends into the page.

## What the video shows

It's built to loop: the first and last frames are both the empty background. Everything rises in from below at the start and sinks out at the end, so keep `loop` on and don't trim either end.

The old 7-screen sign-up flow (Create account → Account info → Welcome → Home → Membership → Link card → All set). Account info, Membership and All set fade out. The remaining four move into the new order and grow, and their contents morph into the new screens: Create account → Become a member (was Link card) → Welcome → Home.

## Changes to make

1. **`components/case-study/Media.tsx`: `CaseVideo`**
   - Add optional `poster?: string` and `fallback?: string` props.
   - Pass `poster` to `<video poster={poster}>`. Keep `autoPlay muted loop playsInline`.
   - Add `width={2400} height={1400}`, or keep the CSS `aspectRatio` set, so the layout doesn't shift before metadata loads.
   - Reduced motion: if `fallback` is set and `matchMedia("(prefers-reduced-motion: reduce)")` matches, render the fallback `<img>` instead of the `<video>`. Follow the pattern already in `components/site/FooterVideo.tsx`. Mind SSR: render the video by default and swap after mount, or use a CSS media query to toggle between the two.
   - Put an `<img src={fallback ?? poster} alt="">` inside `<video>`, after the `<source>` tags, as a last-resort fallback.
   - Keep the existing WebM-first, MP4-second source order.
   - The animation explains the flow change, so when `alt` is passed, give the element an accessible label (`role="img"` + `aria-label`) instead of `aria-hidden`. Leave other videos unchanged.
2. **`Media`**: forward `poster` and `fallback` (and `alt`) to `CaseVideo`.
3. **`content/work/change-it.mdx`**: add the media block. Suggested spot: right after the closing `</CaseSection>` of **"Design decisions"**, before the `2.webp` flow map:

```mdx
<Media
  src="/assets/work/change-it/onboarding-flow.webm"
  poster="/assets/work/change-it/onboarding-flow-poster.webp"
  fallback="/assets/work/change-it/onboarding-flow-fallback.webp"
  alt="The sign-up flow shrinking from seven screens to four: account info, membership and the confirmation screen are removed, and card linking becomes the Become a member step."
  caption="From seven screens to four: tier and billing moved into one step, and the extra account info screen is gone."
/>
```

Check the caption wording with Breno before shipping.

## Check before shipping

- Plays muted and looping in Chrome (WebM) and Safari, desktop and iOS (MP4).
- With reduced motion turned on in the OS, the static end-state image shows and no video loads or plays.
- No layout shift while the page loads; the poster appears immediately.
- Run `npm run lint` and the build. Read `AGENTS.md` first: this Next.js version has breaking changes.
