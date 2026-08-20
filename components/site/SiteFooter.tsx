import { CONTACT } from "@/lib/site";

// Footer background video. Light now; when a theme toggle is wired, swap to
// monster-footer-dark.webm under [data-theme="dark"] (the file is already in
// /public/assets/). Kept as a webm-only background per the source ("MP4 to WEBM
// monster").
const FOOTER_VIDEO = "/assets/monster-footer-light.webm";

/**
 * Home footer — the loudest the voice ever gets: "Design / Connect / Enjoy." in
 * the 106px display serif, contact links 62px below, copyright at the bottom.
 * A looping background video sits behind a 198px paper→transparent fade, so the
 * page dissolves into the motion. Rebuilt from the source's absolute layout
 * into normal flow so it can go fluid.
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
      <video
        aria-hidden="true"
        tabIndex={-1}
        autoPlay
        muted
        playsInline
        preload="metadata"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src={FOOTER_VIDEO} type="video/webm" />
      </video>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          height: 198,
          zIndex: 1,
          background: "var(--footer-fade)",
        }}
      />
      <div className="footer-inner">
        <div style={{ display: "flex", flexDirection: "column", gap: 62, alignItems: "flex-start" }}>
          <h2 className="footer-statement">
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
