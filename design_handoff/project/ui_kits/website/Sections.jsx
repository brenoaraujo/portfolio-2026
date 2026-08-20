const { Profile, NavItem, Divider, TextLink, SectionTitle, WorkItem, Experience, Writting } = window.BrenoAraujoPortfolioDesignSystem_ea4905;

const WORK = [
  { image: "../../assets/work-onboarding.png", eyebrow: "User Flow and UI", title: "Onboarding for a new revenue streamline" },
  { image: "../../assets/work-raffle-design-system.png", eyebrow: "Design System", title: "Raffle Landing Page Design System" },
  { image: "../../assets/work-ticket-app.png", eyebrow: "Mobile App", title: "On-Site Ticket Sales App" },
  { image: "../../assets/work-website-redesign.png", eyebrow: "Web Design", title: "Website Redesign" },
];

const ROLES = [
  { period: "2023-2026", title: "Senior Product Designer, Ascend", description: "Setting design direction across point-of-sale, checkout, design systems, and a marketing operations platform." },
  { period: "2023-2026", title: "Lead Designer, VanHack", description: "Designing both sides of a talent marketplace — 500K+ engineers, and the recruiters hiring them." },
  { period: "2023-2026", title: "Senior Product Designer, Hotmart", description: "Designing the analytics product every team used to monitor its indicators, built with Data Science" },
  { period: "2023-2026", title: "Lead Product Designer, Siteware", description: "Owning the core product for KPIs, goals, and action plans, as the company's first designer." },
];

const ARTICLES = [
  { year: "2020", title: "Using the Lightning Decision Jam to surface problems and prioritize a quarter" },
  { year: "2017", title: "The Chinese Room and why chatbots will never hold a real conversation" },
  { year: "2017", title: "Why User Experience Makes or Breaks Your Product" },
];

const NAV = ["Work", "About me", "Let's talk"];

function SiteHeader({ active, onNavigate }) {
  return (
    <header style={{ display: "flex", flexDirection: "row", gap: 24, alignItems: "center", height: 52, alignSelf: "stretch" }}>
      <Profile image="../../assets/breno-profile.png" href="#top" />
      <Divider />
      <nav style={{ display: "flex", flexDirection: "row", gap: 32, alignItems: "center" }}>
        {NAV.map((label) => (
          <NavItem key={label} href="#" active={active === label} onClick={(e) => { e.preventDefault(); onNavigate(label); }}>{label}</NavItem>
        ))}
      </nav>
    </header>
  );
}

function Introduction() {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 56, alignItems: "flex-start", alignSelf: "stretch" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "flex-start", width: 705 }}>
        <p style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "var(--type-lead-size)", lineHeight: "var(--type-lead-lh)", color: "var(--text-primary)", textWrap: "pretty" }}>I'm a product designer based in Vancouver, designing since doing tableless layouts was vibe coding.</p>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--type-body-size)", lineHeight: "var(--type-body-lh)", color: "var(--text-secondary)", textWrap: "pretty" }}>I listen first, gather as much context and data as I can, then prototype quickly (Figma, code, or AI) to reduce ambiguity and help teams decide with less guesswork and more clarity.  For nearly two decades, I've designed products end-to-end, built the design systems underneath them, and now prototype in code. Engineers get answers instead of specs.</p>
        <TextLink href="#contact">Let's talk</TextLink>
      </div>
    </section>
  );
}

function RecentWork() {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start", alignSelf: "stretch" }}>
      <SectionTitle weight={400}>Recent work.</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignSelf: "stretch" }}>
        {WORK.map((w) => <HoverCard key={w.title} {...w} />)}
      </div>
    </section>
  );
}

function HoverCard(props) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ opacity: hover ? 0.82 : 1, transition: "opacity var(--duration-base) var(--ease-standard)" }}>
      <WorkItem {...props} href="#" />
    </div>
  );
}

function ExperienceSection() {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 48, alignItems: "flex-start", alignSelf: "stretch" }}>
      <SectionTitle>Experience</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 32, alignSelf: "stretch" }}>
        {ROLES.map((r) => <Experience key={r.title} {...r} />)}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", alignSelf: "stretch" }}>
        <TextLink href="#">See full details on Linkedin</TextLink>
      </div>
    </section>
  );
}

function WritingSection() {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 48, alignItems: "flex-start", alignSelf: "stretch" }}>
      <SectionTitle subtitle="Older stuff, still proud of it">Writing </SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, alignSelf: "stretch" }}>
        {ARTICLES.map((a) => <Writting key={a.title} {...a} href="#" />)}
      </div>
    </section>
  );
}

Object.assign(window, { SiteHeader, Introduction, RecentWork, ExperienceSection, WrittingSection, NAV });
