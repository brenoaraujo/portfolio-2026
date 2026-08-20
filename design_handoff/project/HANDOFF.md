# Handoff: Breno Araujo Portfolio — Design System + Site

## Overview

This bundle contains a complete design system extracted from a Figma file (`Portfolio.fig`, page **Handoff**) plus a full recreation of the portfolio home page. The goal is a one-designer portfolio site: warm off-white paper, Noto Serif for anything with a voice, DM Sans for anything with a job. No buttons, no cards with shadows, no color accents — the entire system is type, hairlines, and product screenshots.

## About the design files

**The files here are design references, not production code.** The `.jsx` components are plain React written to document exact geometry, type, and color — they are the spec in executable form, not a package to ship. Your job is to **recreate these designs in the target codebase's environment** (Next.js, Astro, SvelteKit, plain HTML — whatever fits), using its existing conventions, router, and build pipeline. If there is no codebase yet, pick a framework appropriate for a static personal site (Astro or Next.js static export are both good fits) and implement there.

The CSS token files (`tokens/*.css`) **can** be adopted more or less verbatim — they are the source of truth for every value.

## Fidelity

**High fidelity.** Every color, font size, line-height, letter-spacing, gap, and radius in this bundle came out of the Figma file and should be reproduced exactly. Where a value was reconstructed rather than extracted, it is called out in Caveats below.

## Where to start

1. Read `readme.md` — the full system narrative: voice, casing rules, color logic, type logic, spacing rhythm, iconography, motion.
2. Open `ui_kits/website/index.html` in a browser — the complete home page, running.
3. Open the specimen cards in `guidelines/*.html` — 14 standalone pages documenting type, color, spacing, and brand usage.
4. Port `tokens/*.css` into the target codebase first; build components against tokens, never against literals.

## Design tokens

All tokens live in four imported files (entry: `styles.css`):

| File | Contents |
| --- | --- |
| `tokens/fig-tokens.css` | The Figma Variables verbatim — Theme collection (25 vars incl. a full Dark mode under `:root[data-theme="dark"]`) and Ungrouped (3 colors) |
| `tokens/palette.css` | Base colors + semantic aliases (ink, muted, link, line, surfaces) |
| `tokens/typography.css` | Font families, Google Fonts import, the full type scale |
| `tokens/layout.css` | Spacing scale, radii, hairline, grids, motion |

Key values, for reference (canonical definitions are in the files):

- **Background**: `rgb(253,251,250)` — off-white with a warm cast, never pure white. White `rgb(255,255,255)` exists as a card-surface token and is unused on the portfolio page.
- **Ink**: `rgb(0,0,0)` primary text · `rgb(102,102,102)` body copy, dates, copyright · `rgb(100,99,96)` links only · `rgba(0,0,0,0.6)` card eyebrows · `rgb(30,30,30)` icon strokes.
- **Line**: `rgb(212,212,212)` at `0.5px`. One line weight in the whole system.
- **Radii**: exactly two — `8px` (52px avatar) and `12px` (project thumbnails). Nothing else is rounded.
- **Shadows**: none. No elevation, no glows. The only `box-shadow` is a `1px` inset used as a hairline border on work-item thumbnails.
- **Type — Noto Serif** (voice): 106.43px/87.5px display at -0.07em · 34px/39px intro · 26px/39px section titles · 18px/100% bold item titles · 18px names and footer links at -0.05em · 16px dates · 14px copyright.
- **Type — DM Sans** (information): 18px/27px body · 18px links · 14px/23px nav at -0.05em · 14px eyebrows. Tracking is always zero or negative. Emphasis is weight only (400 / 700) — never color, italic, or uppercase.
- **Spacing rhythm**: 1200px content column centered in 1440px; 40px page padding top and bottom; 80px between major sections; 56px inside the intro; 48px title→list; 32px between experience rows and work cards; 30px writing row→rule; 24px section title→work grid and between writing rows; 12px inside a row; 9px link→arrow; 8px title→aside; 4px eyebrow→title. Text measure caps at 705px.
- **Grids**: `1fr 1fr` for work cards; `1fr 2fr 1fr` for both list sections — the empty third column is what gives the résumé its right-hand air. Content hangs off `align-items: flex-end`, so "See full details on Linkedin" lands flush right.
- **Motion**: `120ms` / `200ms` at `cubic-bezier(0.2,0,0.2,1)`, opacity and underline only. Nav hover → 60% opacity; footer links gain an underline; work cards fade to 82%. No lift, no scale, no shadow bloom. No focus ring is specified — use the browser default rather than inventing one.

## Components

Each component directory holds `<Name>.jsx` (implementation), `<Name>.d.ts` (prop contract — read this for the API), and `<Name>.prompt.md` (usage rules and do-nots). Implement the same prop shapes.

| Component | Path | Role |
| --- | --- | --- |
| `WorkItem` | `components/content/` | Project card: thumbnail plate, eyebrow, title |
| `Experience` | `components/content/` | Résumé row: role, company, date range |
| `Writting` | `components/content/` | Writing row + closing rule (spelling matches the Figma layer name — keep or rename consistently) |
| `ArrowUpRight` | `components/icons/` | 16×16, 0.8px stroke — anything that leaves the page |
| `ArrowRight` | `components/icons/` | 16×16, 0.8px stroke |
| `Profile` | `components/site/` | Avatar + name lockup; acts as the wordmark |
| `NavItem` | `components/site/` | Header nav text link |
| `TextLink` | `components/site/` | Text + trailing arrow, 9px gap |
| `SectionTitle` | `components/site/` | Serif 26 heading with optional muted aside |
| `Divider` | `components/site/` | 0.5px hairline |

There are **no buttons, inputs, badges, tabs, modals, or toasts** — the source defines none, so the system has none. Don't add them without asking.

The last five (`Profile`, `NavItem`, `TextLink`, `SectionTitle`, `Divider`) were repeated layers in the Figma frame carrying no symbol; they were promoted to components so pages compose instead of copy-pasting markup. Each exists verbatim in the source; none introduces new design.

## Screens

**Home** — `ui_kits/website/index.html` (composed from `Home.jsx`, `Sections.jsx`, `SiteFooter.jsx`). Sections in order: header (Profile + Divider + 3 NavItems) · display statement · intro paragraph + "Let's talk ↗" · "Recent work." + 2×2 WorkItem grid · "Experience" list + "See full details on Linkedin ↗" · "Writing" list with the aside "Older stuff, still proud of it" · footer ("Design / Connect / Enjoy." + links + copyright). Nothing is fixed or sticky; the header scrolls away.

**Case study** — `templates/case-study/case-study.html`, a portable static export of the case-study template (open it in a browser). Sections: header · eyebrow + serif-34 title + intro + "See the live flow ↗" · full-width hero plate at 1200×700 · four-column credits row (Role / Team / Made with / Shipped) closed by a hairline · "Where it leaked" narrative with a serif-26 pull line between two 16/27 paragraphs · before/after pair at 585×389.7 · "What happened" outcome rows (same geometry as `Experience`) · right-aligned "Next —" link · footer.

**Portfolio page** — a second template exists in the design tool's own component format; the home page in `ui_kits/website/` covers the same layout, so build from that.

## Content rules (these are part of the design)

- **First person, plainspoken, slightly dry.** The designer speaks as "I" and never addresses "you."
- **Sentence case everywhere.** No title case, no all-caps, no small caps.
- **Periods as tone.** Titles that read as statements take a period ("Recent work.", "Enjoy."); bare labels don't ("Experience", "Writing").
- **CTAs are conversational**: "Let's talk", "See full details on Linkedin". Never "Get in touch today."
- **No emoji, no exclamation marks, anywhere.**
- Em dash for asides; hyphen for ranges ("2023-2026"); compact numbers ("500K+").

## Imagery

Product screenshots only — real UI at full width inside a radius-12 plate with a 1px hairline, fixed 389.7px height, completely untreated (no duotone, overlay, grain, or contrast changes). The surrounding page is drained of color precisely because these images run warm and saturated. The avatar is the only photograph of a person: 52px, radius 8. No illustrations, no decorative icons, no stock imagery.

Assets in `assets/`: `breno-profile.png`, `work-onboarding.png`, `work-raffle-design-system.png`, `work-ticket-app.png`, `work-website-redesign.png`.

## Caveats

- **Arrow geometry is reconstructed.** The two arrow vectors carry no extractable path data in the `.fig`. Box size, inset, and 0.8px stroke weight are exact; the path shape is a faithful reconstruction. Replace with exported SVGs if available.
- **Fonts load from Google Fonts** (Noto Serif, DM Sans, DM Mono). No font binaries were provided and nothing was substituted. If you have licensed webfont files, drop them in `assets/fonts/` and swap the `@import` in `tokens/typography.css` for `@font-face` rules. Self-hosting is recommended for production.
- **Dark mode exists in tokens but is applied to no frame.** `:root[data-theme="dark"]` in `tokens/fig-tokens.css` is complete; the design file never uses it. Wire it up only if asked.
- **The footer's background video** (`MP4 to WEBM monster 2` in the source) has no extractable frame; the UI kit renders `--background-secondary` behind the paper fade. Substitute the real video if you have it.
- **There is no logo.** The identity is the avatar plus "Breno Araujo." in Noto Serif 18. Nothing was invented to stand in for a mark — don't add one.

## Files in this bundle

```

  readme.md              full system narrative — read first
  SKILL.md               agent entry point
  styles.css             global entry (@imports only)
  tokens/                fig-tokens · palette · typography · layout
  components/
    content/             WorkItem · Experience · Writting
    icons/               ArrowUpRight · ArrowRight
    site/                Profile · NavItem · TextLink · SectionTitle · Divider
  ui_kits/website/       full home-page recreation (open index.html)
  guidelines/            14 specimen cards (type, color, spacing, brand)
  assets/                avatar + 4 project screenshots
```
