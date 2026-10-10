import { BENTO_FOOTER } from "@/lib/site";

/** Minimal mono footer row. */
export function BentoFooter() {
  return (
    <footer className="bento-footer">
      <span>{BENTO_FOOTER.left}</span>
      <span>{BENTO_FOOTER.coords}</span>
      <a href="#main">{BENTO_FOOTER.back}</a>
    </footer>
  );
}
