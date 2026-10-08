"use client";

import { useEffect, useRef, useState } from "react";
import { EVENTS } from "@/lib/analytics-events";

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/**
 * Header email — clicking copies the address to the clipboard and flashes a
 * toast instead of opening a mail client. Lives where the `<a>` used to sit, so
 * it keeps the `.site-email` styling and its grid placement.
 */
export function CopyEmail({ email }: { email: string }) {
  const [shown, setShown] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onClick = async () => {
    await copyText(email);
    setShown(true);
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setShown(false), 2200);
  };

  return (
    <>
      <button
        type="button"
        className="site-email"
        onClick={onClick}
        aria-label={`Copy email address ${email} to clipboard`}
        title="Click to copy"
        data-track={EVENTS.CTA_CLICK}
        data-track-label="Copy email"
        data-track-location="header"
      >
        {email}
      </button>
      <span
        className={`copy-toast${shown ? " copy-toast--show" : ""}`}
        role="status"
        aria-live="polite"
      >
        {shown ? "Email copied to clipboard" : ""}
      </span>
    </>
  );
}
