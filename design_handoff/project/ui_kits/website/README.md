# UI kit — Portfolio website

A recreation of the `website` frame on the **Handoff** page of `Portfolio.fig` (node `9:159`, 1440 × 3682.4).

## Files
- `index.html` — mounts the page; loads `styles.css` and `_ds_bundle.js`.
- `Sections.jsx` — `SiteHeader`, `Introduction`, `RecentWork`, `ExperienceSection`, `WritingSection` + the page's real content data.
- `SiteFooter.jsx` — display statement, social links, copyright.
- `Home.jsx` — composes the page, holds nav state.

## Layout, verbatim from the source
- Page 1440 wide on `--surface-page` (rgb 253,251,250); content column 1200 centered, 40px top/bottom padding, 80px between sections.
- Header 52px tall: profile lockup → growing hairline → 3 nav items at 32px gap.
- Intro text block 705px wide, 32px internal gap.
- Work grid 2 × 2, 32px gap, cards 585 wide with a 389.7px thumbnail.
- Experience rows 32px apart; writing rows 24px apart; both on a `1fr 2fr 1fr` grid with 24px gaps.
- Footer 809px tall, statement block at left 119 / top 179.6, 62px gap to the social row (43px between links), copyright at top 673.6.

## Interaction
The source is a static one-page site — the only behaviours added here are the ones a browser needs: nav items scroll to their section and underline when active, work cards fade to 82% on hover, footer links underline on hover. No modals, tabs, or detail screens exist in the file, so none were invented.

## Known gaps
- The footer sits on a video layer in the source (`MP4 to WEBM monster 2`) that carries no extractable frame; it is rendered as `--background-secondary` behind the paper-to-transparent fade.
- Work-item thumbnails 2–4 were lifted from the `website7` frame on Page 1 (the Handoff instances override the image without shipping it).
