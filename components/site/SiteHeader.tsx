import { Profile } from "@/components/site/Profile";
import { NavItem } from "@/components/site/NavItem";
import { Divider } from "@/components/site/Divider";
import { NAV } from "@/lib/site";

/**
 * Header: Profile + hairline + three nav anchors. Not sticky — it scrolls away
 * with the page. Nav hrefs are root-relative (/#work …) so they also resolve
 * from a case-study page.
 */
export function SiteHeader() {
  return (
    <header
      className="site-header"
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 24,
        alignItems: "center",
        height: 52,
        alignSelf: "stretch",
      }}
    >
      <Profile href="/" />
      <Divider />
      <nav className="site-nav" style={{ display: "flex", flexDirection: "row", gap: 32, alignItems: "center", flexShrink: 0 }}>
        {NAV.map(({ label, href }) => (
          <NavItem key={label} href={href}>
            {label}
          </NavItem>
        ))}
      </nav>
    </header>
  );
}
