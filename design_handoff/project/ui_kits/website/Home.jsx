const { SiteHeader, Introduction, RecentWork, ExperienceSection, WritingSection, SiteFooter } = window;

function Home() {
  const [active, setActive] = React.useState("Work");
  const refs = { Work: React.useRef(null), "About me": React.useRef(null), "Let's talk": React.useRef(null) };

  const go = (label) => {
    setActive(label);
    const el = refs[label] && refs[label].current;
    if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: "smooth" });
  };

  return (
    <div id="top" style={{ width: 1440, minHeight: 3682, background: "var(--surface-page)", display: "flex", flexDirection: "column", gap: 8, alignItems: "center", overflow: "hidden" }}>
      <div style={{ width: 1200, display: "flex", flexDirection: "column", gap: 80, padding: "40px 0", alignItems: "flex-end" }}>
        <SiteHeader active={active} onNavigate={go} />
        <div ref={refs["About me"]} style={{ alignSelf: "stretch" }}><Introduction /></div>
        <div ref={refs.Work} style={{ alignSelf: "stretch" }}><RecentWork /></div>
        <ExperienceSection />
        <WritingSection />
      </div>
      <div ref={refs["Let's talk"]} style={{ alignSelf: "stretch" }}><SiteFooter /></div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Home />);
