const FOOTER_LINKS = ["Email", "Linkedin", "Instagram", "X"];

function SiteFooter() {
  return (
    <footer id="contact" style={{ position: "relative", height: 809, alignSelf: "stretch", background: "var(--background-secondary)" }}>
      <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: 198, background: "var(--footer-fade)" }} />
      <div style={{ position: "absolute", left: 119, top: 179.6, width: 1200, height: 350, display: "flex", flexDirection: "column", gap: 62, justifyContent: "center", alignItems: "flex-start" }}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "var(--type-display-size)", lineHeight: "var(--type-display-lh)", letterSpacing: "var(--type-display-ls)", color: "var(--text-primary)" }}>Design<br />Connect<br />Enjoy.</h2>
        <div style={{ display: "flex", flexDirection: "row", gap: 43, alignItems: "center" }}>
          {FOOTER_LINKS.map((l) => (
            <a key={l} href="#" style={{ fontFamily: "var(--font-serif)", fontSize: "var(--type-serif-md-size)", lineHeight: 1, whiteSpace: "nowrap", color: "var(--text-primary)", textDecoration: "none" }} onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")} onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}>{l}</a>
          ))}
        </div>
      </div>
      <span style={{ position: "absolute", left: 119, top: 673.6, fontFamily: "var(--font-serif)", fontSize: "var(--type-footnote-size)", lineHeight: 1, color: "var(--text-footnote)" }}>© 2026 Breno Araujo</span>
    </footer>
  );
}

Object.assign(window, { SiteFooter, FOOTER_LINKS });
