import type { CSSProperties } from "react";
import { BentoHeader } from "@/components/bento/BentoHeader";
import { BentoFooter } from "@/components/bento/BentoFooter";
import { GridEdgeLines } from "@/components/bento/GridEdgeLines";
import { WorkTile } from "@/components/bento/WorkTile";
import { ExperienceTile } from "@/components/bento/ExperienceTile";
import { HowIWorkTile } from "@/components/bento/HowIWorkTile";
import { PrototypeTile } from "@/components/bento/PrototypeTile";
import { OffTheClockTile } from "@/components/bento/OffTheClockTile";
import { LocalTimeTile } from "@/components/bento/LocalTimeTile";
import { ContactTile } from "@/components/bento/ContactTile";
import { LanguageExtras } from "@/components/i18n/LanguageExtras";
import { WORK_TILES, ARTICLES, CONTACT } from "@/lib/site";
import { EVENTS } from "@/lib/analytics-events";
import { HeroIntro } from "@/components/bento/HeroIntro";
import { getDictionary, localePath, INTL_LOCALE, type Locale } from "@/lib/i18n";

const node = <span className="bento-node bento-node--tl" aria-hidden="true" />;

// Runs before the page paints, so the intro elements start hidden (see
// HeroIntro and the html.hero-anim rules in globals.css). Home only: other
// pages have no HeroIntro to remove the class again.
const HERO_ANIM_SCRIPT = `try{if(!matchMedia('(prefers-reduced-motion:reduce)').matches){document.documentElement.classList.add('hero-anim')}}catch(e){}`;

/**
 * Editorial bento homepage. Server-rendered shell + text; interactive tiles are
 * client islands (still SSR'd). The grid's dashed rules + nodes are static CSS;
 * GridEdgeLines measures the viewport-edge extensions at runtime.
 *
 * All copy comes from the locale's dictionary (lib/i18n/dictionaries). Client
 * tiles get only their own slice of it.
 */
export function HomeRedesign({
  locale,
  languageUi = true,
}: {
  locale: Locale;
  /** Language switcher + prompt/notice. Off on the English-only /for pages. */
  languageUi?: boolean;
}) {
  const t = getDictionary(locale);
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: HERO_ANIM_SCRIPT }} />
      <main id="main" className="bento">
        <HeroIntro />
        <BentoHeader locale={locale} />

        <div className="bento-grid">
          <GridEdgeLines />
          <span className="bento-node bento-node--tr" aria-hidden="true" />
          <span className="bento-node bento-node--bl" aria-hidden="true" />
          <span className="bento-node bento-node--br" aria-hidden="true" />

          {/* Hero */}
          <section className="tile hero-tile" data-rows="2" data-span={4} style={{ paddingBottom: 64 }}>
            {node}
            <div className="hero-tile__eyebrows">
              <span>{t.hero.eyebrow}</span>
            </div>
            <div className="hero-tile__body">
              <h1>{t.hero.headline}</h1>
              <p className="hero-tile__sub">{t.hero.subcopy}</p>
              <div className="hero-tile__cta">
                <a
                  className="btn-primary"
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  data-track={EVENTS.CTA_CLICK}
                  data-track-label="Let's talk on LinkedIn"
                  data-track-location="hero"
                >
                  {t.hero.cta}
                </a>
              </div>
            </div>
          </section>

          {/* Work tiles */}
          {WORK_TILES.map((tile, i) => (
            <WorkTile
              key={tile.slug}
              tile={{ ...tile, ...t.work[tile.slug] }}
              href={localePath(locale, `/work/${tile.slug}`)}
              id={i === 0 ? "work" : undefined}
            />
          ))}

          {/* Experience */}
          <ExperienceTile t={t.experience} linkedin={CONTACT.linkedin} />

          {/* Writing */}
          <section
            id="writing"
            className="tile"
            data-span={2}
            style={{ display: "flex", flexDirection: "column", padding: "72px 24px 24px", scrollMarginTop: 20 } as CSSProperties}
          >
            {node}
            <div className="rows-head">
              <span className="rows-head__title">{t.writing.title}</span>
              <a
                href="https://brenoaraujo.substack.com"
                target="_blank"
                rel="noreferrer"
                data-track={EVENTS.NAV_CLICK}
                data-track-label="Substack"
                data-track-location="writing"
              >
                {t.writing.substack}
              </a>
            </div>
            {/* Articles are written in English, so their titles stay English. */}
            <div className="rows-list" lang="en">
              {ARTICLES.map((p) => (
                <a
                  key={p.title}
                  className="write-row"
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  data-track={EVENTS.WRITING_CLICK}
                  data-track-title={p.title}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                    <span className="write-row__year">{p.year}</span>
                    <span className="write-row__title">{p.title}</span>
                  </span>
                  <span style={{ flex: "none", color: "var(--rd-muted)" }}>↗</span>
                </a>
              ))}
            </div>
          </section>

          {/* Local time · How I work · Prototype in */}
          <LocalTimeTile t={t.localTime} intlLocale={INTL_LOCALE[locale]} />
          <HowIWorkTile t={t.howIWork} />
          <PrototypeTile t={t.prototype} />

          {/* Off the clock · Contact */}
          <OffTheClockTile t={t.offTheClock} />
          <ContactTile t={t.contact} />
        </div>

        <BentoFooter locale={locale} path="/" languageSwitch={languageUi} />
        {languageUi ? <LanguageExtras locale={locale} path="/" /> : null}
      </main>
    </>
  );
}
