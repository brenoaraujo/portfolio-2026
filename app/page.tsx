import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SectionTitle } from "@/components/site/SectionTitle";
import { TextLink } from "@/components/site/TextLink";
import { WorkItem } from "@/components/content/WorkItem";
import { Experience } from "@/components/content/Experience";
import { Writing } from "@/components/content/Writing";
import { WORK, ROLES, ARTICLES, CONTACT } from "@/lib/site";
import { getPublishedSlugs } from "@/lib/work";
import { TrackHomeView } from "@/components/analytics/TrackHomeView";

// Writing is shown; titles render as plain text until article URLs are added.
const SHOW_WRITING = true;

export default function Home() {
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

        {/* Introduction — this is the "about". No anchor: the nav points at Work
            and Experience; the intro is simply the top of the page. */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 56,
            alignItems: "flex-start",
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 32,
              alignItems: "flex-start",
              maxWidth: "var(--measure-prose)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 800,
                fontSize: "32px",
                lineHeight: "var(--type-lead-lh)",
                color: "var(--text-primary)",
                textWrap: "pretty",
              }}
            >
              I&apos;m a product designer based in Vancouver, designing since tableless layouts were vibe coding.
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--type-body-size)",
                lineHeight: "var(--type-body-lh)",
                color: "var(--text-secondary)",
                textWrap: "pretty",
              }}
            >
              For nearly two decades, I&apos;ve designed products end-to-end, built the design
              systems underneath them, and now prototype in code. Engineers get
              answers instead of specs.
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--type-body-size)",
                lineHeight: "var(--type-body-lh)",
                color: "var(--text-secondary)",
                textWrap: "pretty",
              }}
            >
              My default move is to listen first, gather as much context and data as I can, then
              prototype quickly (Figma, code, or AI) to reduce ambiguity and help
              teams decide with less guesswork and more clarity. 
            </p>
            <TextLink href="/#lets-talk">Let&apos;s talk</TextLink>
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
          <SectionTitle >Recent work.</SectionTitle>
          <div className="work-grid">
            {WORK.map((w) => (
              <WorkItem
                key={w.slug}
                href={published.has(w.slug) ? `/work/${w.slug}` : undefined}
                image={w.image}
                eyebrow={w.eyebrow}
                title={w.title}
              />
            ))}
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
          <SectionTitle>Experience</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 32, alignSelf: "stretch" }}>
            {ROLES.map((r) => (
              <Experience key={r.title} period={r.period} title={r.title} description={r.description} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", alignSelf: "stretch" }}>
            <TextLink href={CONTACT.linkedin} external>
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
            <SectionTitle subtitle="Older stuff, still proud of it">Writing</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 24, alignSelf: "stretch" }}>
              {ARTICLES.map((a) => (
                <Writing key={a.title} year={a.year} title={a.title} href={a.href} />
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
