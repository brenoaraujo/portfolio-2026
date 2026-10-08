"use client";

import {
  Fragment,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { track, EVENTS } from "@/lib/analytics";

export interface ExperienceProps {
  /** Date range, serif 16 in the first column. */
  period?: string;
  /** Role and company, serif bold 18. */
  title?: string;
  /** One-line summary of the work, DM Sans 18/23. */
  description?: string;
  /** Optional hover fan thumbnails, filling the empty right-hand column. */
  images?: string[];
  style?: CSSProperties;
}

const EASE = "var(--ease-standard)";

// Read prefers-reduced-motion as external state (no setState-in-effect).
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReduced(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getReducedSnapshot = () => window.matchMedia(REDUCED_QUERY).matches;

// ── Cross-row coordination ──────────────────────────────────────────────────
// Which fan row is active, so the *other* rows can fade back. Module-level so
// sibling <Experience> rows coordinate without the list container (HomeView)
// needing to know about it. Only fan rows (the home Experience section) take
// part — case-study Outcome rows render exactly as before.
let activeRowId: string | null = null;
let clearTimer: ReturnType<typeof setTimeout> | null = null;
const rowSubs = new Set<() => void>();
const emitRows = () => rowSubs.forEach((cb) => cb());
function subscribeActiveRow(cb: () => void) {
  rowSubs.add(cb);
  return () => {
    rowSubs.delete(cb);
  };
}
const getActiveRow = () => activeRowId;
function setActiveRow(id: string) {
  if (clearTimer) {
    clearTimeout(clearTimer);
    clearTimer = null;
  }
  if (activeRowId !== id) {
    activeRowId = id;
    emitRows();
  }
}
function releaseActiveRow(id: string) {
  // Deferred so a sibling becoming active can cancel it — the list never flashes
  // back to full opacity while moving from one row to the next.
  if (clearTimer) clearTimeout(clearTimer);
  clearTimer = setTimeout(() => {
    clearTimer = null;
    if (activeRowId === id) {
      activeRowId = null;
      emitRows();
    }
  }, 0);
}

// ── Local title decode (no shared helper exists to import) ───────────────────
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
const poolFor = (ch: string): string | null =>
  /[A-Z]/.test(ch) ? UPPER : /[a-z]/.test(ch) ? LOWER : /[0-9]/.test(ch) ? DIGITS : null;
const pick = (s: string) => s[(Math.random() * s.length) | 0];

// Decode timing (spec): first letter at 40ms, 14ms between, 2–4 glyphs × 40ms.
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

// Plate treatment shared by frames and preview (spec §"Plate treatment").
// maxWidth:none opts out of Tailwind preflight's `img { max-width: 100% }`,
// which would otherwise clamp the 325px preview to its ~252px cell and make
// `cover` crop the sides.
const PLATE: CSSProperties = {
  maxWidth: "none",
  objectFit: "cover",
  objectPosition: "top left",
  borderRadius: 12,
  border: "1px solid rgb(212,212,212)",
  boxSizing: "border-box",
  background: "rgb(255,255,255)",
};

/**
 * A single résumé row: period | role + summary, on a 1fr 2fr 1fr grid closed by
 * a hairline. When `images` are given, the empty third column becomes a hover
 * "fan": frames deal out on row-hover and a large preview opens upward on
 * frame-hover (spec: experience-fan-animation). Without images it renders
 * exactly as before (used for case-study outcomes).
 *
 * Fan rows also get two hover affordances: while one row is active the others
 * fade back, and the active row's title decodes left-to-right.
 */
export function Experience({
  period = "2023-2026",
  title = "Senior Product Designer, Ascend",
  description = "Using the Lightning Decision Jam to surface problems and prioritize a quarter",
  images,
  style,
  ...rest
}: ExperienceProps) {
  const hasFan = Array.isArray(images) && images.length > 0;
  const [hoveredRow, setHoveredRow] = useState(false);
  const [activeFrame, setActiveFrame] = useState<number | null>(null);
  const [lastFrame, setLastFrame] = useState(0);
  const reduced = useSyncExternalStore(subscribeReduced, getReducedSnapshot, () => false);

  // Cross-row fade state.
  const rowId = useId();
  const activeId = useSyncExternalStore(subscribeActiveRow, getActiveRow, () => null);
  const isActive = activeId === rowId;
  const faded = hasFan && activeId !== null && !isActive;

  // Title-decode wiring (fan rows only).
  const titleRef = useRef<HTMLSpanElement>(null);
  type Letter = { el: HTMLElement; ch: string; pool: string | null; slot: number; flicks: number };
  const letters = useRef<Letter[]>([]);
  const token = useRef(0);
  const rafRef = useRef(0);

  const rowStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    width: "100%",
    ...(hasFan ? { position: "relative", zIndex: hoveredRow ? 40 : 1 } : null),
    ...style,
  };

  // Shared across the two title render paths so typography never changes.
  const titleStyle: CSSProperties = {
    fontFamily: "var(--font-sans)",
    fontWeight: 700,
    fontSize: "var(--type-title-size)",
    lineHeight: 1.2,
    color: "var(--text-primary)",
  };

  const activateRow = () => {
    setHoveredRow(true);
    setActiveRow(rowId);
  };
  const deactivateRow = () => {
    setHoveredRow(false);
    setActiveFrame(null);
    releaseActiveRow(rowId);
  };

  // onFocus/onBlur bubble (focusin/out) so focusing a thumbnail activates the
  // row — no extra tab stop needed. The deferred clear absorbs intra-row moves.
  const rowHandlers = hasFan
    ? {
        onMouseEnter: () => {
          activateRow();
          track(EVENTS.EXPERIENCE_ROW_HOVER, { company: title });
        },
        onMouseLeave: deactivateRow,
        onFocus: activateRow,
        onBlur: deactivateRow,
        onPointerUp: (e: ReactPointerEvent) => {
          if (e.pointerType !== "mouse") activateRow();
        },
      }
    : {};

  // A frame becomes active on hover/focus — the moment a visitor actually
  // engages a thumbnail. Fire once here (shared by pointer and keyboard).
  const activateFrame = (i: number) => {
    setActiveFrame(i);
    setLastFrame(i);
    setHoveredRow(true);
    track(EVENTS.EXPERIENCE_THUMBNAIL_HOVER, { company: title, index: i });
  };

  const count = images?.length ?? 0;

  // Build the letter slots and lock each to its measured glyph width so the
  // scramble never shifts layout. Re-measure after fonts load and on resize.
  useEffect(() => {
    const host = titleRef.current;
    if (!hasFan || !host) return;
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
  }, [hasFan, title]);

  // Run the decode when the row becomes active; restore on deactivate / switch;
  // skip entirely under reduced motion. The token guarantees clean cancellation.
  useEffect(() => {
    if (!hasFan) return;
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

    if (!isActive || reduced) {
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
  }, [isActive, reduced, hasFan]);

  // Stop any running loop on unmount.
  useEffect(
    () => () => {
      token.current += 1;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const words = title.split(" ");

  return (
    <div style={rowStyle} {...rowHandlers} {...rest}>
      <div
        className="list-row-grid"
        style={
          hasFan
            ? { opacity: faded ? 0.32 : 1, transition: reduced ? "none" : "opacity 280ms ease" }
            : undefined
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingBottom: 21 }}>
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
            {period}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingBottom: 21 }}>
          {hasFan ? (
            <>
              {/* Animated title — real text at rest; letter spans are decorative. */}
              <span ref={titleRef} aria-hidden="true" style={titleStyle}>
                {words.map((word, wi) => (
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
                ))}
              </span>
              {/* Accessible name — the letter spans above are aria-hidden. */}
              <span style={SR_ONLY}>{title}</span>
            </>
          ) : (
            <span style={titleStyle}>{title}</span>
          )}
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "19px",
              color: "var(--text-secondary)",
              textWrap: "pretty",
            }}
          >
            {description}
          </span>
        </div>

        {hasFan ? (
          <div className="exp-fan-cell" style={{ paddingBottom: 21 }}>
            <div style={{ position: "relative", height: 84 }}>
              {images!.map((src, i) => {
                const dealt = hoveredRow || reduced;
                const dimmed = activeFrame !== null && activeFrame !== i;
                const frameStyle: CSSProperties = {
                  ...PLATE,
                  position: "absolute",
                  top: 6,
                  width: 112,
                  height: 74,
                  cursor: "pointer",
                  zIndex: 10 + (count - i),
                  opacity: hoveredRow || reduced ? (dimmed ? 0.42 : 1) : 0,
                  pointerEvents: dealt ? "auto" : "none",
                  left: reduced ? i * 18 : dealt ? i * 18 : 0,
                  transform: reduced
                    ? `rotate(${-6 + i * 4.5}deg)`
                    : dealt
                      ? `rotate(${-6 + i * 4.5}deg) translateY(0)`
                      : "rotate(0deg) translateY(10px)",
                  // Per-property delay is folded into the shorthand (React 19
                  // warns if you mix `transition` shorthand with `transitionDelay`).
                  transition: (() => {
                    const d = activeFrame !== null || reduced ? "0ms" : `${i * 55}ms`;
                    return reduced
                      ? `opacity 220ms ${EASE} ${d}`
                      : `opacity 220ms ${EASE} ${d}, transform 380ms ${EASE} ${d}, left 380ms ${EASE} ${d}`;
                  })(),
                };
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={src}
                    src={src}
                    alt={`${title} — thumbnail ${i + 1}`}
                    tabIndex={0}
                    style={frameStyle}
                    onMouseEnter={() => activateFrame(i)}
                    onMouseLeave={() => setActiveFrame(null)}
                    onFocus={() => activateFrame(i)}
                    onBlur={() => setActiveFrame(null)}
                    onClick={() =>
                      track(EVENTS.EXPERIENCE_THUMBNAIL_CLICK, {
                        company: title,
                        index: i,
                      })
                    }
                  />
                );
              })}

              {/* Preview — opens upward; kept on the last hovered image so it
                  fades out in place instead of snapping. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images![lastFrame]}
                alt=""
                aria-hidden="true"
                style={{
                  ...PLATE,
                  position: "absolute",
                  width: 325,
                  height: 215,
                  zIndex: 70,
                  pointerEvents: "none",
                  bottom: 26,
                  // Open up-and-left: the preview's right edge tucks against the
                  // fan's left frames (with a small overlap) so it stays well
                  // inside the column and can't be clipped at the page's right.
                  left: -(325 - 20),
                  opacity: activeFrame !== null ? 1 : 0,
                  transform: activeFrame !== null ? "translateY(0)" : "translateY(6px)",
                  transition: `opacity 180ms ${EASE}, transform 220ms ${EASE}`,
                }}
              />
            </div>
          </div>
        ) : null}
      </div>
      <div className="hairline" />
    </div>
  );
}
