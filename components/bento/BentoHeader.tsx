import Link from "next/link";
import { BENTO_NAV, BENTO_PILL } from "@/lib/site";

/**
 * Home header: logo dot + wordmark · nav · "open to roles" pill.
 * Case-study pages (`backLink`) get a "← Back to work" link instead.
 */
export function BentoHeader({ backLink = false }: { backLink?: boolean }) {
  if (backLink) {
    return (
      <header className="bento-header">
        <Link href="/#work" className="bento-back">
          ← Back to work
        </Link>
      </header>
    );
  }
  return (
    <header className="bento-header">
      <a href="#main" className="bento-logo">
        <span className="bento-logo__dot" aria-hidden="true" />
        Breno Araujo
      </a>
      <nav className="bento-nav">
        {BENTO_NAV.map((n) => (
          <a key={n.label} href={n.href}>
            {n.label}
          </a>
        ))}
        <span className="bento-pill">
          <span className="bento-pill__dot" aria-hidden="true" />
          {BENTO_PILL}
        </span>
      </nav>
    </header>
  );
}
