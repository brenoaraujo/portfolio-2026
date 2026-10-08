"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { EVENTS } from "@/lib/analytics-events";

export interface WritingProps {
  /** Publication year, serif 16. */
  year?: string;
  /** Article title, serif bold 18. */
  title?: string;
  /** Links the title out to the article. */
  href?: string;
  style?: CSSProperties;
}

// Read prefers-reduced-motion as external state (no setState-in-effect).
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReduced(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getReducedSnapshot = () => window.matchMedia(REDUCED_QUERY).matches;

// ── Local title decode (same behaviour as the Experience section) ────────────
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
const poolFor = (ch: string): string | null =>
  /[A-Z]/.test(ch) ? UPPER : /[a-z]/.test(ch) ? LOWER : /[0-9]/.test(ch) ? DIGITS : null;
const pick = (s: string) => s[(Math.random() * s.length) | 0];

// Decode timing: first letter at 40ms, 14ms between, 2–4 glyphs × 40ms.
const DECODE_START = 40;
const DECODE_STEP = 14;
const GLYPH_MS = 40;

const LETTER_STYLE: CSSProperties = { display: "inline-block", textAlign: "center" };
const SR_ONLY: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
  border: 0,
};

/**
 * An article row in the Writing list: year | title, hairline underneath.
 * On hover/focus the title decodes left-to-right (the same scramble as the
 * Experience section; no row fade here). figma 1:7520 (layer name "writting").
 */
export function Writing({
  year = "2020",
  title = "Using the Lightning Decision Jam to surface problems and prioritize a quarter",
  href,
  style,
  ...rest
}: WritingProps) {
  const reduced = useSyncExternalStore(subscribeReduced, getReducedSnapshot, () => false);
  const [active, setActive] = useState(false);

  const titleRef = useRef<HTMLElement | null>(null);
  const setTitleRef = (el: HTMLElement | null) => {
    titleRef.current = el;
  };
  type Letter = { el: HTMLElement; ch: string; pool: string | null; slot: number; flicks: number };
  const letters = useRef<Letter[]>([]);
  const token = useRef(0);
  const rafRef = useRef(0);

  const titleStyle: CSSProperties = {
    fontFamily: "var(--font-sans)",
    fontWeight: 700,
    fontSize: "var(--type-title-size)",
    lineHeight: "23px",
    color: "var(--text-primary)",
    textDecoration: "none",
    textWrap: "pretty",
  };

  // Build the letter slots and lock each to its measured glyph width so the
  // scramble never shifts layout. Re-measure after fonts load and on resize.
  useEffect(() => {
    const host = titleRef.current;
    if (!host) return;
    const nodes = host.querySelectorAll<HTMLElement>("[data-ch]");
    letters.current = Array.from(nodes).map((el) => {
      const ch = el.getAttribute("data-ch") ?? "";
      return { el, ch, pool: poolFor(ch), slot: -1, flicks: 0 };
    });
    const measure = () => {
      const ls = letters.current;
      ls.forEach((L) => {
        L.el.style.width = "auto";
      });
      const widths = ls.map((L) => L.el.getBoundingClientRect().width);
      ls.forEach((L, i) => {
        L.el.style.width = `${widths[i]}px`;
      });
    };
    measure();
    let alive = true;
    document.fonts?.ready.then(() => {
      if (alive) measure();
    });
    window.addEventListener("resize", measure);
    return () => {
      alive = false;
      window.removeEventListener("resize", measure);
    };
  }, [title]);

  // Run the decode while active; restore on leave; skip under reduced motion.
  useEffect(() => {
    token.current += 1;
    const myToken = token.current;
    const ls = letters.current;

    const restore = () => {
      ls.forEach((L) => {
        L.el.textContent = L.ch;
        L.el.style.color = "";
        L.slot = -1;
      });
    };

    if (!active || reduced) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      restore();
      return;
    }

    ls.forEach((L) => {
      L.flicks = 2 + ((Math.random() * 3) | 0); // 2–4 glyphs
      L.slot = -1;
    });
    const t0 = performance.now();
    const tick = (now: number) => {
      if (token.current !== myToken) return;
      let busy = false;
      ls.forEach((L, i) => {
        if (!L.pool) return; // spaces/commas/punctuation never flicker
        const start = t0 + DECODE_START + i * DECODE_STEP;
        const end = start + L.flicks * GLYPH_MS;
        if (now < start) {
          busy = true; // not reached yet → keep the real letter
        } else if (now < end) {
          busy = true;
          const slot = ((now - start) / GLYPH_MS) | 0;
          if (L.slot !== slot) {
            L.slot = slot;
            L.el.textContent = pick(L.pool);
          }
          L.el.style.color = "var(--accent-brand)";
        } else if (L.slot !== -2) {
          L.slot = -2; // settled — lock back to the real glyph in its colour
          L.el.textContent = L.ch;
          L.el.style.color = "";
        }
      });
      if (busy) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, reduced]);

  // Stop any running loop on unmount.
  useEffect(
    () => () => {
      token.current += 1;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const words = title.split(" ");
  const letterSpans = words.map((word, wi) => (
    <Fragment key={wi}>
      {wi > 0 ? " " : null}
      <span style={{ whiteSpace: "nowrap" }}>
        {Array.from(word).map((ch, ci) => (
          <span key={ci} data-ch={ch} style={LETTER_STYLE}>
            {ch}
          </span>
        ))}
      </span>
    </Fragment>
  ));

  // onFocus/onBlur bubble (focusin/out) so focusing the title link activates the
  // row. A link owns its tap (navigation), so only plain rows activate on tap.
  const rowHandlers = {
    onMouseEnter: () => setActive(true),
    onMouseLeave: () => setActive(false),
    onFocus: () => setActive(true),
    onBlur: () => setActive(false),
    ...(href
      ? {}
      : {
          onPointerUp: (e: ReactPointerEvent) => {
            if (e.pointerType !== "mouse") setActive(true);
          },
        }),
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 30,
        alignItems: "flex-start",
        width: "100%",
        ...style,
      }}
      {...rowHandlers}
      {...rest}
    >
      <div className="list-row-grid">
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 400,
            fontSize: 14,
            lineHeight: 1,
            whiteSpace: "nowrap",
            color: "var(--text-secondary)",
          }}
        >
          {year}
        </span>
        {href ? (
          <a
            ref={setTitleRef}
            href={href}
            target="_blank"
            rel="noreferrer"
            style={titleStyle}
            aria-label={title}
            data-track={EVENTS.WRITING_CLICK}
            data-track-title={title}
          >
            {/* Letter spans are decorative; the link name comes from aria-label. */}
            <span aria-hidden="true">{letterSpans}</span>
          </a>
        ) : (
          <span ref={setTitleRef} style={titleStyle}>
            <span aria-hidden="true">{letterSpans}</span>
            <span style={SR_ONLY}>{title}</span>
          </span>
        )}
      </div>
      <div className="hairline" />
    </div>
  );
}
