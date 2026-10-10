"use client";

import { useRef, useState } from "react";
import { CONTACT_TILE } from "@/lib/site";
import { TangleBg } from "@/components/bento/TangleBg";
import { EVENTS } from "@/lib/analytics-events";

async function copy(text: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
  } catch {
    /* fall through */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  } catch {
    /* ignore */
  }
}

/** Contact tile — copy-email with inline "Copied ✓" + LinkedIn. Tangle bg (M4). */
export function ContactTile() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const onCopy = async () => {
    await copy(CONTACT_TILE.email);
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };
  return (
    <section id="contact" className="tile tile--fill contact-tile">
      <div className="contact-tile__bg" aria-hidden="true">
        <TangleBg color="#ffffff" />
      </div>
      <span className="bento-node bento-node--tl" aria-hidden="true" />
      <span className="contact-tile__eyebrow">{CONTACT_TILE.eyebrow}</span>
      <p className="contact-tile__headline">{CONTACT_TILE.headline}</p>
      <div className="contact-tile__actions">
        <button
          className="contact-tile__copy"
          data-copied={copied || undefined}
          onClick={onCopy}
          aria-label={`Copy email ${CONTACT_TILE.email} to clipboard`}
          data-track={EVENTS.CONTACT_CLICK}
          data-track-label="Copy email"
        >
          <span>{CONTACT_TILE.email}</span>
          <span className="contact-tile__copy-label">{copied ? "Copied ✓" : "Copy"}</span>
        </button>
        <a
          className="contact-tile__linkedin"
          href={CONTACT_TILE.linkedin}
          target="_blank"
          rel="noreferrer"
          data-track={EVENTS.CONTACT_CLICK}
          data-track-label="LinkedIn"
        >
          <span>LinkedIn</span>
          <span>↗</span>
        </a>
      </div>
    </section>
  );
}
