import { Profile } from "@/components/site/Profile";
import { NavItem } from "@/components/site/NavItem";
import { Divider } from "@/components/site/Divider";
import { ArrowLeft } from "@/components/icons/ArrowLeft";
import { CopyEmail } from "@/components/site/CopyEmail";
import { CONTACT } from "@/lib/site";
import { EVENTS } from "@/lib/analytics-events";

/**
 * Header. Two layouts share the same hairline treatment:
 *
 * - Home (default): Profile · centered dot ornament · email, right-aligned. The
 *   ornament echoes the old hero rail, moved here to free the hero edges for the
 *   coordinate globe reveal.
 * - Case-study pages (`backLink`): a "← Back to work" link in place of the
 *   Profile, then the hairline and the three nav anchors. Sticky to the top.
 */
export function SiteHeader({ backLink = false }: { backLink?: boolean }) {
  if (backLink) {
    return (
      <header className="site-header site-header--sticky">
        <NavItem
          href="/#work"
          data-track={EVENTS.NAV_CLICK}
          data-track-label="Back to work"
          style={{ fontSize: 18 }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
            <ArrowLeft size={24} color="currentColor" />
            Back to work
          </span>
        </NavItem>
        <Divider />
      </header>
    );
  }

  return (
    <header className="site-header site-header--home">
      <Profile href="/" />
      <span className="site-ornament" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <CopyEmail email={CONTACT.email} />
    </header>
  );
}
