import { Profile } from "@/components/site/Profile";
import { NavItem } from "@/components/site/NavItem";
import { Divider } from "@/components/site/Divider";
import { NAV } from "@/lib/site";
import { EVENTS } from "@/lib/analytics-events";

/**
 * Header: Profile + hairline + three nav anchors. Not sticky — it scrolls away
 * with the page. Nav hrefs are root-relative (/#work …) so they also resolve
 * from a case-study page.
 */
export function SiteHeader() {
  return (
    <header className="site-header">
      <Profile href="/" />
      <Divider />
      <nav className="site-nav">
        {NAV.map(({ label, href, icon }) => (
          <NavItem
            key={label}
            href={href}
            icon={icon}
            data-track={EVENTS.NAV_CLICK}
            data-track-label={label}
          >
            {label}
          </NavItem>
        ))}
      </nav>
    </header>
  );
}
