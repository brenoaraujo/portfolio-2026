import { CONTACT } from "@/lib/site";

/**
 * Home footer — the loudest the voice ever gets: "Design / Connect / Enjoy." in
 * the 106px display serif, contact links 62px below, copyright at the bottom.
 * A 198px paper→transparent fade sits over the secondary surface (the source's
 * background video is substituted by the flat surface until a real file exists).
 * Rebuilt from the source's absolute layout into normal flow so it can go fluid.
 */
export function SiteFooter() {
  return (
    <footer
      id="lets-talk"
      style={{
        position: "relative",
        alignSelf: "stretch",
        background: "var(--background-secondary)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          height: 198,
          background: "var(--footer-fade)",
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "var(--content-width)",
          margin: "0 auto",
          padding: "180px 24px 48px",
          display: "flex",
          flexDirection: "column",
          minHeight: 640,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 62, alignItems: "flex-start" }}>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              fontSize: "var(--type-display-size)",
              lineHeight: "var(--type-display-lh)",
              letterSpacing: "var(--type-display-ls)",
              color: "var(--text-primary)",
            }}
          >
            Design
            <br />
            Connect
            <br />
            Enjoy.
          </h2>
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
                  fontSize: "var(--type-serif-md-size)",
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
        </div>
        <span
          style={{
            marginTop: "auto",
            paddingTop: 120,
            fontFamily: "var(--font-serif)",
            fontSize: "var(--type-footnote-size)",
            lineHeight: 1,
            color: "var(--text-footnote)",
          }}
        >
          © 2026 Breno Araujo
        </span>
      </div>
    </footer>
  );
}
