# Breno Araujo — Portfolio Design System

A one-designer portfolio site: warm off-white paper, Noto Serif for everything with a voice, DM Sans for everything with a job. No buttons, no cards-with-shadows, no color accents — the whole system is type, hairlines, and product screenshots.

## Sources

- **`Portfolio.fig`** — attached by the user and mounted read-only. Scope for this system: the **Handoff** page, frames `website` (`9:159`), `work-item` (`9:201`), `writting` (`9:202`), `experience` (`9:203`).
  Component symbols live on Page 1 and are instanced into Handoff: `work-item` (`1:7526`), `experience` (`1:7511`), `writting` (`1:7520`), `Arrow up-right` (`1:7705`), `Arrow right` (`1:1674`).
  Figma Variables: two collections — **Theme** (25 vars: colors, spacing floats, font-family strings, with a Dark mode) and **Ungrouped** (3 colors). Both are materialized verbatim in `tokens/fig-tokens.css`.
- No codebase, repository, deck, or brand guide was provided. No public Figma URL was given (the file was attached as a binary), so no link is recorded here.
- **There is no logo in the source file.** The identity is the avatar photo plus the name "Breno Araujo." set in Noto Serif 18 (`Profile`). Nothing was drawn or invented to stand in for a mark.

## Index

| Path | What |
| --- | --- |
| `styles.css` | Global entry — `@import`s only |
| `tokens/fig-tokens.css` | Figma Variables, verbatim (incl. Dark mode) |
| `tokens/palette.css` | Base colors + semantic aliases |
| `tokens/typography.css` | Font families, webfont import, type scale |
| `tokens/layout.css` | Spacing, radii, hairlines, grids, motion |
| `components/icons/` | `ArrowUpRight`, `ArrowRight` |
| `components/content/` | `WorkItem`, `Experience`, `Writting` |
| `components/site/` | `Profile`, `NavItem`, `TextLink`, `SectionTitle`, `Divider` |
| `ui_kits/website/` | Full recreation of the portfolio home page |
| `templates/portfolio-page/` | Template — one-page portfolio |
| `templates/case-study/` | Template — editorial case-study page |
| `guidelines/` | 14 foundation specimen cards |
| `assets/` | Avatar photo + four project screenshots |
| `SKILL.md` | Agent-Skills entry point |

### Components

Every component family in the source is built. Source layer name → component name:

| Figma family | Component |
| --- | --- |
| `work-item` (`1:7526`) | `WorkItem` |
| `experience` (`1:7511`) | `Experience` |
| `writting` (`1:7520`) | `Writting` |
| `Arrow up-right` (`1:7705`) | `ArrowUpRight` |
| `Arrow right` (`1:1674`) | `ArrowRight` |

## Intentional additions

Confirmed intentional additions: `Profile`, `NavItem`, `TextLink`, `SectionTitle`, `Divider`.

These five are repeated layers in the Handoff frame that carried no symbol, promoted to components so the UI kit and template compose instead of copy-pasting markup. Each exists verbatim in the source; none introduces new design.

- `Profile` — the avatar + name lockup in the header (used as the wordmark). Source: `Profile` frame in node `9:159`.
- `NavItem` — the repeated nav text layer; already a component directory in the file (`9:168`), used 3×.
- `TextLink` — the "Let's talk ↗" / "See full details on Linkedin ↗" pattern, used 2×.
- `SectionTitle` — the serif-26 heading with its optional muted aside, used 4×.
- `Divider` — the 0.5px hairline line node, used in the header and to close every list row.

No other primitives were added. The source defines no buttons, inputs, badges, tabs, modals, or toasts, so this system has none.

---

## Content fundamentals

**Voice: first person, plainspoken, slightly dry.** The designer speaks as "I" and addresses no one directly — there is no "you" anywhere in the copy. Claims are concrete and slightly self-deprecating rather than promotional.

- Opening line: *"I'm a product designer based in Vancouver, designing since doing tableless layouts was vibe coding."* — a real fact, then a joke that dates him on purpose.
- Method, not adjectives: *"I listen first, gather as much context and data as I can, then prototype quickly (Figma, code, or AI) to reduce ambiguity…"*
- Ends on a benefit stated bluntly: *"Engineers get answers instead of specs."*

**Casing: sentence case everywhere.** No title case, no all-caps, no small caps — not in nav ("About me"), not in eyebrows ("User Flow and UI" keeps its source capitals), not in section titles.

**Periods as punctuation of tone.** Section titles and the footer statement end in a period when they read as a statement: "Recent work.", "Breno Araujo.", "Enjoy." — headings that are just labels don't: "Experience", "Writing".

**Labels are short and literal.** Eyebrows name the discipline in 2–4 words: "Design System", "Mobile App", "Web Design", "User Flow and UI". Project titles describe the outcome, not the client: "Onboarding for a new revenue streamline", "On-Site Ticket Sales App".

**Calls to action are conversational, never imperative-salesy.** "Let's talk" (twice), "See full details on Linkedin". No "Get in touch today", no "Hire me".

**Asides carry the humour.** The Writing section is labelled *"Older stuff, still proud of it"* — the system's one place for a wink.

**Em dashes for the aside, ranges with a hyphen:** "a talent marketplace — 500K+ engineers, and the recruiters hiring them"; "2023-2026". Numbers are compact: "500K+", "nearly two decades".

**No emoji. Anywhere.** No exclamation marks either. The footer statement — "Design / Connect / Enjoy." — is the loudest the voice ever gets, and it gets there through type size, not punctuation.

---

## Visual foundations

**Ground.** One background, everywhere: `rgb(253,251,250)` — an off-white with a faint warm cast, never pure white. White (`rgb(255,255,255)`) is reserved as a card surface token and is not used in the portfolio page itself. There are no full-bleed background images, no textures, no patterns, no gradient fields; the single gradient in the file is a 198px paper→transparent fade at the top of the footer, protecting content over the footer's media layer.

**Color.** Effectively monochrome. Black `rgb(0,0,0)` for all primary text; `rgb(102,102,102)` for body copy, dates and the copyright; `rgb(100,99,96)` — a hair warmer — for links only; `rgba(0,0,0,0.6)` for card eyebrows; `rgb(30,30,30)` for icon strokes; `rgb(212,212,212)` for every line. Color arrives exclusively through the project screenshots, which are left completely untreated — no duotone, no overlay, no grain, no rounding of their internal contrast. Those images run warm and saturated (yellow/violet app screens, an orange-lit photo), which is precisely why the surrounding page is drained of color. A full Dark mode exists in the Figma Variables (`tokens/fig-tokens.css`, `:root[data-theme="dark"]`) but is not applied to any frame in the file.

**Type.** Two families, sharply divided. **Noto Serif** carries voice: the 106.43px/87.5px display statement at -0.07em, the 34px/39px intro, 26px/39px section titles, 18px bold item titles, 18px names and footer links at -0.05em, 16px dates, 14px copyright. **DM Sans** carries information: 18px/27px body paragraphs, 18px links, 14px/23px nav at -0.05em, 14px eyebrows. Tracking is always negative or zero — never open. Serif headings sit tight: 18px titles run at 100% line-height, and the display block runs *below* its cap height (87.5px leading on 106px type) so the three words lock into a single mass. Body text is generous by contrast (27px on 18px). Emphasis is weight only — 400 vs 700 — never color, never italic, never uppercase.

**Spacing and layout.** A 1200px content column centered in 1440px, 40px of page padding top and bottom. Vertical rhythm: 80px between major sections; 56px inside the intro block; 48px from an "Experience"/"Writing" title to its list; 32px between experience rows and between work cards; 30px from a writing row to its rule; 24px from a section title to the work grid, and between writing rows; 12px inside a row; 9px between a link and its arrow; 8px between a title and its aside; 4px between eyebrow and title. Two grids do all the work: `1fr 1fr` for the work cards and `1fr 2fr 1fr` for both list sections — the empty third column is what gives the résumé its right-hand air. Content hangs off `align-items: flex-end` inside the column, so the "See full details on Linkedin" link naturally lands flush right. Text measure is capped at 705px. Nothing is fixed or sticky; the header scrolls away with the page.

**Lines, corners and shadows.** One line: `0.5px` `rgb(212,212,212)`, drawn as a zero-height element with an inset shadow — used to fill the header between the name and the nav, and to close every experience and writing row. There are **no shadows** in the system: no drop shadows, no elevation, no glows. The only box-shadow in the source is a `1px` inset hairline used as a border on work-item thumbnails. Two radii total: `8px` on the 52px avatar, `12px` on project thumbnails. Nothing else is rounded, because nothing else has a container — there are no cards, panels, pills, or capsules. No transparency or blur is used anywhere except the 60%-opacity eyebrow text and the footer fade.

**Motion and states.** The source file specifies no animation, and none was invented. This system defines a minimal set so live builds behave: `120ms`/`200ms` at `cubic-bezier(0.2,0,0.2,1)`, applied as opacity and underline changes only. Nav hover fades to 60% opacity; footer links gain an underline; work cards fade to 82% — no lift, no scale, no shadow bloom. Press states darken nothing and shrink nothing; links are already underlined, so the active state is simply the pointer. There is no focus ring in the file — add the browser default rather than inventing one.

**Imagery.** Product screenshots only — real UI, shown at full width inside a radius-12 plate with a 1px hairline, at a fixed 389.7px height. They are never masked into circles, tilted, mocked into devices (one is already a laptop render from the source), or overlaid with text. The avatar is the only photograph of a person, at 52px, radius 8. No illustrations, no icons-as-decoration, no stock imagery.

---

## Iconography

The file's entire icon vocabulary is **two 16×16 stroke arrows**: `Arrow up-right` (`1:7705`) for anything that leaves the page, and `Arrow right` (`1:1674`). Both are drawn in a 16px box with a `0.8px` stroke in `rgb(30,30,30)` — hairline-thin, matching the 0.5px rules; the glyph occupies 6.667px (up-right) or 9.333px (right) and is inset 4.667/3.333px. There is no icon font, no icon sprite, no PNG icons, no third-party set (no Lucide/Heroicons/Material), and no CDN dependency. Emoji and Unicode-as-icon are never used.

Arrows appear only beside text links (9px gap, colored to match the link) — never alone, never in a button, never as a bullet. Because the source vectors export as empty geometry from the `.fig` binary, both arrows were rebuilt as stroke paths at the source's exact box, inset and stroke weight; see Caveats.

---

## Caveats

- **Arrow geometry is reconstructed.** The two arrow vectors carry no extractable path data in the `.fig`; box size, inset and 0.8px stroke weight are exact, the path shape is a faithful reconstruction. Replace with exported SVGs if you have them.
- **Fonts load from Google Fonts** (Noto Serif, DM Sans, DM Mono). No font binaries were provided; nothing was substituted — all three are the real families named in the file. If you have licensed webfont files, drop them in `assets/fonts/` and swap the `@import` in `tokens/typography.css` for `@font-face` rules.
- **Out-of-scope fonts.** The wider `.fig` (Page 1 explorations) also uses BIZ UDMincho, Bricolage Grotesque, Braah One, Modak, Bitter, Inter UI and Raveo. None appear in the Handoff frames, so none are tokenized here.
- **The footer's background video** (`MP4 to WEBM monster 2`) has no extractable frame; the UI kit renders `--background-secondary` behind the paper fade.
