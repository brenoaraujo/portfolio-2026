"use client";

import { useEffect, useRef, useState } from "react";

/** Once per browser session: a reminder, not a nag. */
const SEEN_KEY = "ba-translation-notice";
const SHOW_DELAY_MS = 1200;
const VISIBLE_MS = 10000;

export interface TranslationToastCopy {
  title: string;
  body: string;
  close: string;
}

/**
 * "This was machine translated" reminder on translated pages. Slides in once
 * per session, stays 10s (paused while hovered or focused), and can be closed.
 */
export function TranslationToast({ t }: { t: TranslationToastCopy }) {
  const [open, setOpen] = useState(false);
  const hideTimer = useRef<number | undefined>(undefined);

  const scheduleHide = (ms: number) => {
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setOpen(false), ms);
  };

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(SEEN_KEY)) return;
      window.sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Storage blocked: show it anyway, once per page load.
    }
    const id = window.setTimeout(() => {
      setOpen(true);
      window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setOpen(false), VISIBLE_MS);
    }, SHOW_DELAY_MS);
    return () => {
      window.clearTimeout(id);
      window.clearTimeout(hideTimer.current);
    };
  }, []);

  if (!open) return null;

  return (
    <div
      className="mt-toast"
      role="status"
      onMouseEnter={() => window.clearTimeout(hideTimer.current)}
      onMouseLeave={() => scheduleHide(4000)}
      onFocus={() => window.clearTimeout(hideTimer.current)}
      onBlur={() => scheduleHide(4000)}
    >
      <div className="mt-toast__text">
        <p className="mt-toast__title">{t.title}</p>
        <p className="mt-toast__body">{t.body}</p>
      </div>
      <button className="mt-toast__close" onClick={() => setOpen(false)} aria-label={t.close}>
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}
