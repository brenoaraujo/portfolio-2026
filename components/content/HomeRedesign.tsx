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
import { TrackHomeView } from "@/components/analytics/TrackHomeView";
import { BENTO_HERO, NOW_LIST, WORK_TILES, ARTICLES, CONTACT } from "@/lib/site";
import { EVENTS } from "@/lib/analytics-events";

const node = <span className="bento-node bento-node--tl" aria-hidden="true" />;

/**
 * Editorial bento homepage. Server-rendered shell + text; interactive tiles are
 * client islands (still SSR'd). The grid's dashed rules + nodes are static CSS;
 * GridEdgeLines measures the viewport-edge extensions at runtime.
 */
export function HomeRedesign() {
  return (
    <>
      <TrackHomeView />
      <main id="main" className="bento">
        <BentoHeader />

        <div className="bento-grid">
          <GridEdgeLines />
          <span className="bento-node bento-node--tr" aria-hidden="true" />
          <span className="bento-node bento-node--bl" aria-hidden="true" />
          <span className="bento-node bento-node--br" aria-hidden="true" />

          {/* Hero */}
          <section className="tile hero-tile" data-rows="2" data-span={3}>
            {node}
            <div className="hero-tile__eyebrows">
              <span>{BENTO_HERO.eyebrowLeft}</span>
              <span>{BENTO_HERO.eyebrowRight}</span>
            </div>
            <div className="hero-tile__body">
              <h1>{BENTO_HERO.headline}</h1>
              <p className="hero-tile__sub">{BENTO_HERO.subcopy}</p>
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
                  Let&apos;s talk on LinkedIn →
                </a>
                <a className="btn-secondary" href="#work">
                  See the work
                </a>
              </div>
            </div>
            <div className="hero-tile__shipped">
              <span>{BENTO_HERO.shippedLabel}</span>
              {BENTO_HERO.shippedAt.map((s) => (
                <span key={s} className="hero-tile__logo">
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* Now */}
          <section className="tile now-tile" data-rows="2" data-span={1}>
            {node}
            <div className="now-tile__head">
              <span>Now</span>
              <span>Oct 2026</span>
            </div>
            <div className="now-tile__list">
              {NOW_LIST.map((n) => (
                <div className="now-tile__item" key={n.k}>
                  <span className="now-tile__k">{n.k}</span>
                  <span className="now-tile__v">{n.v}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Selected Work header */}
          <section id="work" className="tile work-head" data-span={4}>
            {node}
            <h2>Selected Work</h2>
          </section>

          {/* Work tiles */}
          {WORK_TILES.map((t) => (
            <WorkTile key={t.slug} tile={t} href={`/work/${t.slug}`} />
          ))}

          {/* Experience */}
          <ExperienceTile />

          {/* Writing */}
          <section
            id="writing"
            className="tile"
            data-span={2}
            style={{ display: "flex", flexDirection: "column", padding: "72px 24px 24px", scrollMarginTop: 20 } as CSSProperties}
          >
            {node}
            <div className="rows-head">
              <span className="rows-head__title">Writing</span>
              <a
                href="https://brenoaraujo.substack.com"
                target="_blank"
                rel="noreferrer"
                data-track={EVENTS.NAV_CLICK}
                data-track-label="Substack"
                data-track-location="writing"
              >
                Substack ↗
              </a>
            </div>
            <div className="rows-list">
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
          <LocalTimeTile />
          <HowIWorkTile />
          <PrototypeTile />

          {/* Off the clock · Contact */}
          <OffTheClockTile />
          <ContactTile />
        </div>

        <BentoFooter />
      </main>
    </>
  );
}
