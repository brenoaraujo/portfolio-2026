import { CONTACT } from "@/lib/site";

/**
 * Compact case-study footer: a closing rule, "Let's talk" with a dry aside, the
 * contact links, and copyright. Distinct from the home page's big display
 * footer — a case study ends on a quiet invitation, not a statement.
 */
export function CaseStudyFooter() {
  return (
    <footer
      id="lets-talk"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 48,
        alignItems: "flex-start",
        alignSelf: "stretch",
        scrollMarginTop: 40,
      }}
    >
      <div className="hairline" />
      <div style={{ display: "flex", flexDirection: "row", gap: 24, alignItems: "center", flexWrap: "wrap", width: "100%" }}>
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            fontSize: "var(--type-section-size)",
            lineHeight: "39px",
            color: "var(--text-primary)",
          }}
        >
          Let&apos;s talk
        </span>
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 14,
            lineHeight: "23px",
            color: "var(--text-secondary)",
          }}
        >
          Happy to walk you through the messy parts
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: 43, alignItems: "center", flexWrap: "wrap" }}>
        {CONTACT.links.map(({ label, href, external }) => (
          <a
            key={label}
            href={href}
            className="foot-link"
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 14,
              lineHeight: 1,
              whiteSpace: "nowrap",
              color: "var(--text-primary)",
              textDecoration: "none",
            }}
          >
            {label}
          </a>
        ))}
      </div>
      <span
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 14,
          lineHeight: 1,
          color: "var(--text-footnote)",
        }}
      >
        © 2026 Breno Araujo
      </span>
    </footer>
  );
}
