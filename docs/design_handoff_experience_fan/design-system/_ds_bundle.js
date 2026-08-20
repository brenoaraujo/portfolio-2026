/* @ds-bundle: {"format":4,"namespace":"BrenoAraujoPortfolioDesignSystem_ea4905","components":[{"name":"Experience","sourcePath":"components/content/Experience.jsx"},{"name":"WorkItem","sourcePath":"components/content/WorkItem.jsx"},{"name":"Writting","sourcePath":"components/content/Writting.jsx"},{"name":"ArrowRight","sourcePath":"components/icons/ArrowRight.jsx"},{"name":"ArrowUpRight","sourcePath":"components/icons/ArrowUpRight.jsx"},{"name":"Divider","sourcePath":"components/site/Divider.jsx"},{"name":"NavItem","sourcePath":"components/site/NavItem.jsx"},{"name":"Profile","sourcePath":"components/site/Profile.jsx"},{"name":"SectionTitle","sourcePath":"components/site/SectionTitle.jsx"},{"name":"TextLink","sourcePath":"components/site/TextLink.jsx"}],"sourceHashes":{"components/content/Experience.jsx":"82e9a4290188","components/content/WorkItem.jsx":"8880bafdcdc1","components/content/Writting.jsx":"74d8a4ca3e19","components/icons/ArrowRight.jsx":"2804caf54afa","components/icons/ArrowUpRight.jsx":"7cef775bf58d","components/site/Divider.jsx":"95e675798111","components/site/NavItem.jsx":"11905dd849e1","components/site/Profile.jsx":"87d1f3a554b1","components/site/SectionTitle.jsx":"bbc362fdd9e5","components/site/TextLink.jsx":"2a6aed076721","ui_kits/website/Home.jsx":"8d388e997fbe","ui_kits/website/Sections.jsx":"eac3202b9437","ui_kits/website/SiteFooter.jsx":"fc412d04a609"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BrenoAraujoPortfolioDesignSystem_ea4905 = window.BrenoAraujoPortfolioDesignSystem_ea4905 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/Experience.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* figma symbol 1:7511 "experience" — 1200×104, 1fr 2fr 1fr grid, 24px gap,
   21px bottom padding on each cell, closing hairline divider. */
function Experience({
  period = "2023-2026",
  title = "Senior Product Designer, Ascend",
  description = "Using the Lightning Decision Jam to surface problems and prioritize a quarter",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "flex-start",
      width: "100%",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 2fr 1fr",
      gap: 24,
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      paddingBottom: 21
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      fontSize: "var(--type-meta-serif-size)",
      lineHeight: 1,
      whiteSpace: "nowrap",
      color: "var(--text-secondary)"
    }
  }, period)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      paddingBottom: 21
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 700,
      fontSize: "var(--type-title-size)",
      lineHeight: 1,
      color: "var(--text-primary)"
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 400,
      fontSize: "var(--type-body-size)",
      lineHeight: "23px",
      color: "var(--text-secondary)",
      textWrap: "pretty"
    }
  }, description))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 0,
      width: "100%",
      boxShadow: "inset 0 0 0 0.5px rgb(212,212,212), 0 0 0 0.5px rgb(212,212,212)"
    }
  }));
}
Object.assign(__ds_scope, { Experience });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Experience.jsx", error: String((e && e.message) || e) }); }

// components/content/WorkItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* figma symbol 1:7526 "work-item" — 585×460.7, column gap 24.
   Thumbnail: 389.7 tall, radius 12, inset 1px hairline. */
function WorkItem({
  image,
  eyebrow = "AI Product Design",
  title = "Onboarding for a new revenue streamline",
  href,
  imageHeight,
  style,
  ...rest
}) {
  const Root = href ? "a" : "div";
  return /*#__PURE__*/React.createElement(Root, _extends({
    href: href,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24,
      alignItems: "flex-start",
      width: "100%",
      textDecoration: "none",
      color: "inherit",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      height: imageHeight,
      aspectRatio: imageHeight ? undefined : "585 / 389.7",
      width: "100%",
      flexShrink: 0,
      borderRadius: 12,
      boxShadow: "inset 0 0 0 1px rgb(212,212,212)",
      background: image ? `url(${image}) center / cover no-repeat` : "var(--color-gray-100)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      alignItems: "flex-start",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 400,
      fontSize: "var(--type-label-size)",
      lineHeight: 1,
      letterSpacing: "var(--type-label-ls)",
      color: "var(--text-muted)"
    }
  }, eyebrow), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 700,
      fontSize: "var(--type-title-size)",
      lineHeight: 1,
      color: "var(--text-primary)"
    }
  }, title)));
}
Object.assign(__ds_scope, { WorkItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/WorkItem.jsx", error: String((e && e.message) || e) }); }

// components/content/Writting.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* figma symbol 1:7520 "writting" — 1200×80, 1fr 2fr 1fr grid, 24px gap,
   30px gap to the closing hairline divider. */
function Writting({
  year = "2020",
  title = "Using the Lightning Decision Jam to surface problems and prioritize a quarter",
  href,
  style,
  ...rest
}) {
  const Title = href ? "a" : "span";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 30,
      alignItems: "flex-start",
      width: "100%",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 2fr 1fr",
      gap: 24,
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      fontSize: "var(--type-meta-serif-size)",
      lineHeight: 1,
      whiteSpace: "nowrap",
      color: "var(--text-secondary)"
    }
  }, year), /*#__PURE__*/React.createElement(Title, {
    href: href,
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 700,
      fontSize: "var(--type-title-size)",
      lineHeight: "23px",
      color: "var(--text-primary)",
      textDecoration: "none",
      textWrap: "pretty"
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 0,
      width: "100%",
      boxShadow: "inset 0 0 0 0.5px rgb(212,212,212), 0 0 0 0.5px rgb(212,212,212)"
    }
  }));
}
Object.assign(__ds_scope, { Writting });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Writting.jsx", error: String((e && e.message) || e) }); }

// components/icons/ArrowRight.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* figma node 1:1674 "Arrow right" — 16×16 box, 9.333px glyph inset 3.333,
   0.8px stroke. Used for in-page / forward navigation. */
function ArrowRight({
  size = 16,
  color,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    fill: "none",
    "aria-hidden": "true",
    style: {
      display: "block",
      flexShrink: 0,
      color: color || "var(--icon-ink)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "0.8",
    strokeLinecap: "square"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3.333 8h9.334"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 3.333 12.667 8 8 12.667"
  })));
}
Object.assign(__ds_scope, { ArrowRight });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icons/ArrowRight.jsx", error: String((e && e.message) || e) }); }

// components/icons/ArrowUpRight.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* figma node 1:7705 "Arrow up-right" — 16×16 box, 6.667px glyph inset 4.667,
   0.8px stroke. Source vector geometry was not extractable from the .fig;
   the stroke weight, box and inset are exact. */
function ArrowUpRight({
  size = 16,
  color,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    fill: "none",
    "aria-hidden": "true",
    style: {
      display: "block",
      flexShrink: 0,
      color: color || "var(--icon-ink)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "0.8",
    strokeLinecap: "square"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4.667 11.333 11.333 4.667"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5.778 4.667h5.555v5.556"
  })));
}
Object.assign(__ds_scope, { ArrowUpRight });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icons/ArrowUpRight.jsx", error: String((e && e.message) || e) }); }

// components/site/Divider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The 0.5px rgb(212,212,212) hairline used in the header and to close
   every Experience / Writing row. */
function Divider({
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "separator",
    style: {
      height: 0,
      width: "100%",
      flexGrow: 1,
      boxShadow: "inset 0 0 0 0.5px rgb(212,212,212), 0 0 0 0.5px rgb(212,212,212)",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/Divider.jsx", error: String((e && e.message) || e) }); }

// components/site/NavItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* figma node 9:168 "Nav Item" — DM Sans 14/23, -0.05em, black.
   Three of these sit in a 32px-gap row in the header. */
function NavItem({
  children = "Work",
  href = "#",
  active = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 400,
      fontSize: "var(--type-label-size)",
      lineHeight: "23px",
      letterSpacing: "var(--type-label-ls)",
      whiteSpace: "nowrap",
      color: "var(--text-primary)",
      textDecoration: active ? "underline" : "none",
      textUnderlineOffset: 3,
      opacity: 1,
      transition: "opacity var(--duration-fast) var(--ease-standard)",
      ...style
    },
    onMouseEnter: e => e.currentTarget.style.opacity = 0.6,
    onMouseLeave: e => e.currentTarget.style.opacity = 1
  }, rest), children);
}
Object.assign(__ds_scope, { NavItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/NavItem.jsx", error: String((e && e.message) || e) }); }

// components/site/Profile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Header identity block — 52×52 avatar at radius 8, 12px gap,
   serif 18/23 at -0.05em. The source file contains no logo mark;
   the name is set in type. */
function Profile({
  name = "Breno Araujo.",
  image = "assets/breno-profile.png",
  href,
  style,
  ...rest
}) {
  const Root = href ? "a" : "div";
  return /*#__PURE__*/React.createElement(Root, _extends({
    href: href,
    style: {
      display: "flex",
      flexDirection: "row",
      gap: 12,
      alignItems: "center",
      textDecoration: "none",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      flexShrink: 0,
      borderRadius: 8,
      background: `url(${image}) center / cover no-repeat`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      fontSize: "var(--type-serif-md-size)",
      lineHeight: "23px",
      letterSpacing: "var(--type-serif-md-ls)",
      whiteSpace: "nowrap",
      color: "var(--text-primary)"
    }
  }, name));
}
Object.assign(__ds_scope, { Profile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/Profile.jsx", error: String((e && e.message) || e) }); }

// components/site/SectionTitle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* "Recent work." / "Experience" / "Writing  Older stuff, still proud of it"
   Serif 26/39; regular or bold; optional serif-18 subtitle beside it. */
function SectionTitle({
  children = "Recent work.",
  subtitle,
  weight = 700,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: weight,
      fontSize: "var(--type-section-size)",
      lineHeight: "39px",
      color: "var(--text-primary)"
    }
  }, children), subtitle ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      fontSize: "var(--type-serif-md-size)",
      lineHeight: "23px",
      letterSpacing: "var(--type-serif-md-ls)",
      whiteSpace: "nowrap",
      color: "var(--text-secondary)"
    }
  }, subtitle) : null);
}
Object.assign(__ds_scope, { SectionTitle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/SectionTitle.jsx", error: String((e && e.message) || e) }); }

// components/site/TextLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The "Let's talk ↗" / "See full details on Linkedin ↗" pattern:
   DM Sans 18, underlined, rgb(100,99,96), 9px gap to a 16px arrow. */
function TextLink({
  children = "Let's talk",
  href = "#",
  arrow = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    style: {
      display: "inline-flex",
      flexDirection: "row",
      gap: 9,
      alignItems: "center",
      textDecoration: "none",
      transition: "color var(--duration-fast) var(--ease-standard)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 400,
      fontSize: "var(--type-body-size)",
      lineHeight: 1,
      whiteSpace: "nowrap",
      color: "var(--text-link)",
      textDecoration: "underline",
      textUnderlineOffset: 2
    }
  }, children), arrow ? /*#__PURE__*/React.createElement(__ds_scope.ArrowUpRight, {
    color: "var(--text-link)"
  }) : null);
}
Object.assign(__ds_scope, { TextLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/TextLink.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
const {
  SiteHeader,
  Introduction,
  RecentWork,
  ExperienceSection,
  WritingSection,
  SiteFooter
} = window;
function Home() {
  const [active, setActive] = React.useState("Work");
  const refs = {
    Work: React.useRef(null),
    "About me": React.useRef(null),
    "Let's talk": React.useRef(null)
  };
  const go = label => {
    setActive(label);
    const el = refs[label] && refs[label].current;
    if (el) window.scrollTo({
      top: el.offsetTop - 40,
      behavior: "smooth"
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    id: "top",
    style: {
      width: 1440,
      minHeight: 3682,
      background: "var(--surface-page)",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      alignItems: "center",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1200,
      display: "flex",
      flexDirection: "column",
      gap: 80,
      padding: "40px 0",
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement(SiteHeader, {
    active: active,
    onNavigate: go
  }), /*#__PURE__*/React.createElement("div", {
    ref: refs["About me"],
    style: {
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement(Introduction, null)), /*#__PURE__*/React.createElement("div", {
    ref: refs.Work,
    style: {
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement(RecentWork, null)), /*#__PURE__*/React.createElement(ExperienceSection, null), /*#__PURE__*/React.createElement(WritingSection, null)), /*#__PURE__*/React.createElement("div", {
    ref: refs["Let's talk"],
    style: {
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement(SiteFooter, null)));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(Home, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Sections.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Profile,
  NavItem,
  Divider,
  TextLink,
  SectionTitle,
  WorkItem,
  Experience,
  Writting
} = window.BrenoAraujoPortfolioDesignSystem_ea4905;
const WORK = [{
  image: "../../assets/work-onboarding.png",
  eyebrow: "User Flow and UI",
  title: "Onboarding for a new revenue streamline"
}, {
  image: "../../assets/work-raffle-design-system.png",
  eyebrow: "Design System",
  title: "Raffle Landing Page Design System"
}, {
  image: "../../assets/work-ticket-app.png",
  eyebrow: "Mobile App",
  title: "On-Site Ticket Sales App"
}, {
  image: "../../assets/work-website-redesign.png",
  eyebrow: "Web Design",
  title: "Website Redesign"
}];
const ROLES = [{
  period: "2023-2026",
  title: "Senior Product Designer, Ascend",
  description: "Setting design direction across point-of-sale, checkout, design systems, and a marketing operations platform."
}, {
  period: "2023-2026",
  title: "Lead Designer, VanHack",
  description: "Designing both sides of a talent marketplace — 500K+ engineers, and the recruiters hiring them."
}, {
  period: "2023-2026",
  title: "Senior Product Designer, Hotmart",
  description: "Designing the analytics product every team used to monitor its indicators, built with Data Science"
}, {
  period: "2023-2026",
  title: "Lead Product Designer, Siteware",
  description: "Owning the core product for KPIs, goals, and action plans, as the company's first designer."
}];
const ARTICLES = [{
  year: "2020",
  title: "Using the Lightning Decision Jam to surface problems and prioritize a quarter"
}, {
  year: "2017",
  title: "The Chinese Room and why chatbots will never hold a real conversation"
}, {
  year: "2017",
  title: "Why User Experience Makes or Breaks Your Product"
}];
const NAV = ["Work", "About me", "Let's talk"];
function SiteHeader({
  active,
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      flexDirection: "row",
      gap: 24,
      alignItems: "center",
      height: 52,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement(Profile, {
    image: "../../assets/breno-profile.png",
    href: "#top"
  }), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "row",
      gap: 32,
      alignItems: "center"
    }
  }, NAV.map(label => /*#__PURE__*/React.createElement(NavItem, {
    key: label,
    href: "#",
    active: active === label,
    onClick: e => {
      e.preventDefault();
      onNavigate(label);
    }
  }, label))));
}
function Introduction() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 56,
      alignItems: "flex-start",
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 32,
      alignItems: "flex-start",
      width: 705
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      fontSize: "var(--type-lead-size)",
      lineHeight: "var(--type-lead-lh)",
      color: "var(--text-primary)",
      textWrap: "pretty"
    }
  }, "I'm a product designer based in Vancouver, designing since doing tableless layouts was vibe coding."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--type-body-size)",
      lineHeight: "var(--type-body-lh)",
      color: "var(--text-secondary)",
      textWrap: "pretty"
    }
  }, "I listen first, gather as much context and data as I can, then prototype quickly (Figma, code, or AI) to reduce ambiguity and help teams decide with less guesswork and more clarity.  For nearly two decades, I've designed products end-to-end, built the design systems underneath them, and now prototype in code. Engineers get answers instead of specs."), /*#__PURE__*/React.createElement(TextLink, {
    href: "#contact"
  }, "Let's talk")));
}
function RecentWork() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24,
      alignItems: "flex-start",
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    weight: 400
  }, "Recent work."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 32,
      alignSelf: "stretch"
    }
  }, WORK.map(w => /*#__PURE__*/React.createElement(HoverCard, _extends({
    key: w.title
  }, w)))));
}
function HoverCard(props) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      opacity: hover ? 0.82 : 1,
      transition: "opacity var(--duration-base) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement(WorkItem, _extends({}, props, {
    href: "#"
  })));
}
function ExperienceSection() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 48,
      alignItems: "flex-start",
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, null, "Experience"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 32,
      alignSelf: "stretch"
    }
  }, ROLES.map(r => /*#__PURE__*/React.createElement(Experience, _extends({
    key: r.title
  }, r)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement(TextLink, {
    href: "#"
  }, "See full details on Linkedin")));
}
function WritingSection() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 48,
      alignItems: "flex-start",
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    subtitle: "Older stuff, still proud of it"
  }, "Writing "), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24,
      alignSelf: "stretch"
    }
  }, ARTICLES.map(a => /*#__PURE__*/React.createElement(Writting, _extends({
    key: a.title
  }, a, {
    href: "#"
  })))));
}
Object.assign(window, {
  SiteHeader,
  Introduction,
  RecentWork,
  ExperienceSection,
  WrittingSection,
  NAV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SiteFooter.jsx
try { (() => {
const FOOTER_LINKS = ["Email", "Linkedin", "Instagram", "X"];
function SiteFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    id: "contact",
    style: {
      position: "relative",
      height: 809,
      alignSelf: "stretch",
      background: "var(--background-secondary)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      right: 0,
      height: 198,
      background: "var(--footer-fade)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 119,
      top: 179.6,
      width: 1200,
      height: 350,
      display: "flex",
      flexDirection: "column",
      gap: 62,
      justifyContent: "center",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 700,
      fontSize: "var(--type-display-size)",
      lineHeight: "var(--type-display-lh)",
      letterSpacing: "var(--type-display-ls)",
      color: "var(--text-primary)"
    }
  }, "Design", /*#__PURE__*/React.createElement("br", null), "Connect", /*#__PURE__*/React.createElement("br", null), "Enjoy."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "row",
      gap: 43,
      alignItems: "center"
    }
  }, FOOTER_LINKS.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "var(--type-serif-md-size)",
      lineHeight: 1,
      whiteSpace: "nowrap",
      color: "var(--text-primary)",
      textDecoration: "none"
    },
    onMouseEnter: e => e.currentTarget.style.textDecoration = "underline",
    onMouseLeave: e => e.currentTarget.style.textDecoration = "none"
  }, l)))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 119,
      top: 673.6,
      fontFamily: "var(--font-serif)",
      fontSize: "var(--type-footnote-size)",
      lineHeight: 1,
      color: "var(--text-footnote)"
    }
  }, "\xA9 2026 Breno Araujo"));
}
Object.assign(window, {
  SiteFooter,
  FOOTER_LINKS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SiteFooter.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Experience = __ds_scope.Experience;

__ds_ns.WorkItem = __ds_scope.WorkItem;

__ds_ns.Writting = __ds_scope.Writting;

__ds_ns.ArrowRight = __ds_scope.ArrowRight;

__ds_ns.ArrowUpRight = __ds_scope.ArrowUpRight;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.NavItem = __ds_scope.NavItem;

__ds_ns.Profile = __ds_scope.Profile;

__ds_ns.SectionTitle = __ds_scope.SectionTitle;

__ds_ns.TextLink = __ds_scope.TextLink;

})();
