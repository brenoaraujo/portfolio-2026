import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SectionTitle } from "@/components/site/SectionTitle";
import { TextLink } from "@/components/site/TextLink";
import { WorkItem } from "@/components/content/WorkItem";
import { Experience } from "@/components/content/Experience";
import { Writing } from "@/components/content/Writing";
import { WORK, ROLES, ARTICLES, CONTACT } from "@/lib/site";

// The Writing section is built but stays hidden until the real article links
// are confirmed (M2 issue). Flip to true once content is ready.
const SHOW_WRITING = false;

export default function Home() {
  return (
    <>
      <div className="page-column">
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
                fontWeight: 400,
                fontSize: "var(--type-lead-size)",
                lineHeight: "var(--type-lead-lh)",
                color: "var(--text-primary)",
                textWrap: "pretty",
              }}
            >
              I&apos;m a product designer based in Vancouver, designing since doing
              tableless layouts was vibe coding.
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
              I listen first, gather as much context and data as I can, then
              prototype quickly (Figma, code, or AI) to reduce ambiguity and help
              teams decide with less guesswork and more clarity. For nearly two
              decades, I&apos;ve designed products end-to-end, built the design
              systems underneath them, and now prototype in code. Engineers get
              answers instead of specs.
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
          <SectionTitle weight={400}>Recent work.</SectionTitle>
          <div className="work-grid">
            {WORK.map((w) => (
              <WorkItem
                key={w.slug}
                href={`/work/${w.slug}`}
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
      </div>

      <SiteFooter />
    </>
  );
}
