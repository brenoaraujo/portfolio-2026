import { SiteHeader } from "@/components/site/SiteHeader";
import { HomeClosing } from "@/components/content/HomeClosing";
import { EdgeCoordinates } from "@/components/hero/EdgeCoordinates";
import { PosterInk } from "@/components/hero/PosterInk";
import { SectionTitle } from "@/components/site/SectionTitle";
import { TextLink } from "@/components/site/TextLink";
import { Button } from "@/components/site/Button";
import { WorkItem } from "@/components/content/WorkItem";
import { Experience } from "@/components/content/Experience";
import { Writing } from "@/components/content/Writing";
import { HOME, ROLES, ARTICLES, CONTACT } from "@/lib/site";
import { orderedWork, type Variant } from "@/lib/variants";
import { getPublishedSlugs } from "@/lib/work";
import { TrackHomeView } from "@/components/analytics/TrackHomeView";
import { EVENTS } from "@/lib/analytics-events";

// Writing is shown; titles render as plain text until article URLs are added.
const SHOW_WRITING = true;

/**
 * The full home page — hero, work grid, experience, writing. Renders the
 * default content when no variant is passed (the public "/" route), or an
 * application-tailored version when given one (the /for/[company] routes).
 * Only the hero copy and the work-grid order change; everything else is shared.
 */
export function HomeView({ variant }: { variant?: Variant }) {
  const title = variant?.title ?? HOME.title;
  const paragraphs = variant?.description ?? HOME.paragraphs;
  const display = HOME.display;
  const work = orderedWork(variant?.order);

  // Only link work cards that have a published case study; the rest show as
  // non-clickable cards until their MDX is written and published.
  const published = new Set(getPublishedSlugs());

  return (
    <>
      <TrackHomeView />
      <main id="main" className="page-column">
        <h1 className="sr-only">
          Breno Araujo — product designer and design engineer in Vancouver
        </h1>
        <SiteHeader />

        {/* Hero — poster word flanked by two short justified intro blocks, a CTA
            row, a decorative dot-grid rail and two geo-coordinate edge labels.
            No anchor: the nav points at Work and Experience. */}
        <section className="hero">
          <EdgeCoordinates />

          <div className="hero-inner">
            <p className="hero-intro">{title}</p>

            {/* Poster word — live red text (SEO + a11y) over the exported Figma
                gradient-map shadow (shadow.svg, transparent). Three CMY ink
                plates behind the key text give it a cursor-driven print
                misregistration (see PosterInk). */}
            <div className="poster">
              <img
                className="poster__shadow"
                src="/assets/shadow.svg"
                alt=""
                aria-hidden="true"
                width={444}
                height={167}
              />
              <PosterInk words={display.split(" ")} />
              <p className="poster__text">
                {display.split(" ").map((word) => (
                  <span key={word}>{word}</span>
                ))}
              </p>
            </div>

            {paragraphs.map((text, i) => (
              <p key={i} className="hero-intro">
                {text}
              </p>
            ))}

            <div className="hero-cta">
              <Button
                href={CONTACT.linkedin}
                external
                label="Let's talk"
                ariaLabel="Let's talk on LinkedIn"
                data-track={EVENTS.CTA_CLICK}
                data-track-label="Let's talk on LinkedIn"
                data-track-location="hero"
              />
              {/*<a
                href="#experience"
                className="hero-link"
                data-track={EVENTS.NAV_CLICK}
                data-track-label="Should I hire?"
                data-track-location="hero"
              >
                Should I hire?
              </a>*/}
            </div>
          </div>
        </section>

        {/* Recent work */}
        <section
          id="work"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            alignItems: "flex-start",
            alignSelf: "stretch",
            scrollMarginTop: 40,
          }}
        >
          <SectionTitle number="01">Work</SectionTitle>
          <div className="work-grid">
            {work.map((w, i) => {
              const isPublished = published.has(w.slug);
              return (
                <WorkItem
                  key={w.slug}
                  href={isPublished ? `/work/${w.slug}` : undefined}
                  inProgress={!isPublished}
                  priority={i === 0}
                  image={w.image}
                  eyebrow={w.eyebrow}
                  title={w.title}
                  data-track={isPublished ? EVENTS.WORK_CARD_CLICK : undefined}
                  data-track-slug={isPublished ? w.slug : undefined}
                  data-track-title={isPublished ? w.title : undefined}
                />
              );
            })}
          </div>
        </section>

        {/* Experience */}
        <section
          id="experience"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 48,
            alignItems: "flex-start",
            alignSelf: "stretch",
            scrollMarginTop: 40,
          }}
        >
          <SectionTitle number="02">Experience</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 32, alignSelf: "stretch" }}>
            {ROLES.map((r) => (
              <Experience
                key={r.title}
                period={r.period}
                title={r.title}
                description={r.description}
                images={r.images}
              />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", alignSelf: "stretch" }}>
            <TextLink
              href={CONTACT.linkedin}
              external
              data-track={EVENTS.CTA_CLICK}
              data-track-label="See full details on Linkedin"
              data-track-location="experience"
            >
              See full details on Linkedin
            </TextLink>
          </div>
        </section>

        {/* Writing — hidden until article links are confirmed */}
        {SHOW_WRITING && (
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 48,
              alignItems: "flex-start",
              alignSelf: "stretch",
            }}
          >
            <SectionTitle number="03" subtitle="Older stuff, still proud of it">Writing</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 24, alignSelf: "stretch" }}>
              {ARTICLES.map((a) => (
                <Writing key={a.title} year={a.year} title={a.title} href={a.href} />
              ))}
            </div>
          </section>
        )}
      </main>

      <HomeClosing />
    </>
  );
}
