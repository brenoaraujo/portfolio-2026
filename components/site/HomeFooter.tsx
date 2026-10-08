import { CLOSING } from "@/lib/site";
import { ArrowUp } from "@/components/icons/ArrowUp";
import { EVENTS } from "@/lib/analytics-events";

/**
 * Minimal footer bar — "Thanks for dropping by · Breno Araujo · Back to top ↑".
 * Shared by the home page and case-study pages. The "Back to top" link targets
 * #main, which is the top of either page.
 */
export function HomeFooter() {
  return (
    <footer id="lets-talk" className="home-footer">
      <span>{CLOSING.footer.left}</span>
      <span className="home-footer__center">{CLOSING.footer.center}</span>
      <a
        href="#main"
        className="home-footer__link"
        data-track={EVENTS.NAV_CLICK}
        data-track-label="Back to top"
        data-track-location="footer"
      >
        {CLOSING.footer.right}
        <ArrowUp size={14} color="currentColor" />
      </a>
    </footer>
  );
}
