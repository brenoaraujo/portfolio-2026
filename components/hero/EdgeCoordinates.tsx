"use client";

import { useEffect, useRef } from "react";
import type { Frame } from "@/components/hero/globe";

/* Cities. Left/right sides are kept as the hero already had them: the left label
   shows Maple Ridge, the right shows Belo Horizonte. */
const CITIES = {
  mr: { name: "Based on Maple Ridge, CA", coord: "49.2194° N, 122.5984° W", lonlat: [-122.5984, 49.2194] as [number, number] },
  bh: { name: "From Belo Horizonte, BR", coord: "19.9167° S, 43.9345° W", lonlat: [-43.9345, -19.9167] as [number, number] },
} as const;
type Key = keyof typeof CITIES;
const LOCS: { key: Key; side: "left" | "right" }[] = [
  { key: "mr", side: "left" },
  { key: "bh", side: "right" },
];

/* GLOBE_POSITION: where the globe sits relative to the coordinate column.
   'start' (used): below the left label, above the right. */
const GLOBE_POSITION: "start" | "top" | "beside" = "start";

/* Reveal timeline — ms from hover start. */
const T = {
  outline: [0, 400],
  body: [120, 700],
  spin: [0, 1300],
  pin: [1150, 1450],
} as const;
const STAGGER = 24; // ms between decoding letters
const FLICKER_MS = 42; // ms per random glyph
const NAME_DELAY = 150; // ms before the name starts decoding
const TOUCH_HOLD = 3000; // ms a tap keeps it revealed
const RESET_MS = 220; // ms after fade-out before the loop/letters reset

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const pick = (s: string) => s[Math.floor(Math.random() * s.length)];
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const prog = (t: number, [a, b]: readonly [number, number]) => clamp01((t - a) / (b - a));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t: number) => {
  const c1 = 1.9;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const rotFor = ([lon, lat]: [number, number]): [number, number, number] => [-lon, -lat, 0];

interface Item {
  key: Key;
  lonlat: [number, number];
  loc: HTMLElement;
  svg: SVGSVGElement;
  name: HTMLElement;
  chars: { s: HTMLElement; ch: string; pool: string | null; flicks: number; slot: number }[];
  shown: boolean;
  raf: number;
  hideTimer: number;
  decodeId: number;
  hovered: boolean;
}

/**
 * The two vertical edge coordinates. On reveal a line globe draws + spins into
 * its own city and the city name decodes letter by letter. Globe code + land
 * data are dynamically imported after mount so the hero's first paint is unaffected.
 */
export function EdgeCoordinates() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    const cleanups: Array<() => void> = [];

    import("@/components/hero/globe")
      .then(({ drawGlobe, FINAL }) => {
        if (disposed) return;

        const items: Item[] = LOCS.map(({ key, side }) => {
          const loc = root.querySelector<HTMLElement>(`.edge-loc--${side}`)!;
          const svg = loc.querySelector<SVGSVGElement>(".edge-globe")!;
          const name = loc.querySelector<HTMLElement>(".edge-name")!;
          const chars = Array.from(name.querySelectorAll<HTMLElement>(".ch")).map((s) => {
            const ch = s.textContent ?? "";
            const pool = /[0-9]/.test(ch) ? DIGITS : /[A-Z]/i.test(ch) ? UPPER : null;
            return { s, ch, pool, flicks: 4 + Math.floor(Math.random() * 3), slot: -1 };
          });
          return { key, lonlat: CITIES[key].lonlat, loc, svg, name, chars, shown: false, raf: 0, hideTimer: 0, decodeId: 0, hovered: false };
        });

        // Initial static globe (hidden by opacity until revealed).
        items.forEach((it) => drawGlobe(it.svg, it.lonlat, rotFor(it.lonlat), FINAL));

        const resetChars = (it: Item) =>
          it.chars.forEach((c) => {
            c.s.className = "ch off";
            c.s.textContent = c.ch;
            c.slot = -1;
          });

        const decode = (it: Item) => {
          const t0 = performance.now();
          const id = it.decodeId;
          const tick = (now: number) => {
            if (it.decodeId !== id || !it.shown) return;
            let busy = false;
            it.chars.forEach((c, i) => {
              const start = t0 + NAME_DELAY + i * STAGGER;
              const end = start + (c.pool ? c.flicks * FLICKER_MS : 0);
              if (now < start) {
                c.s.className = "ch off";
                c.s.textContent = c.ch;
                busy = true;
              } else if (now < end) {
                busy = true;
                const slot = Math.floor((now - start) / FLICKER_MS);
                if (c.slot !== slot) {
                  c.slot = slot;
                  c.s.textContent = pick(c.pool!);
                }
                c.s.className = "ch hot";
              } else {
                c.s.className = "ch";
                c.s.textContent = c.ch;
              }
            });
            if (busy) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        };

        const show = (it: Item, hold = 0) => {
          clearTimeout(it.hideTimer);
          if (it.shown && !hold) return;
          const wasShown = it.shown;
          it.shown = true;
          it.svg.classList.add("on");
          it.name.classList.add("show");
          if (reduce) {
            drawGlobe(it.svg, it.lonlat, rotFor(it.lonlat), FINAL);
            it.chars.forEach((c) => {
              c.s.className = "ch";
              c.s.textContent = c.ch;
            });
          } else if (!wasShown) {
            if (it.raf) cancelAnimationFrame(it.raf);
            const other = CITIES[it.key === "mr" ? "bh" : "mr"].lonlat;
            const from = rotFor(other);
            const to = rotFor(it.lonlat);
            const t0 = performance.now();
            const step = (now: number) => {
              const t = now - t0;
              const s = easeInOut(prog(t, T.spin));
              const rot: [number, number, number] = [from[0] + (to[0] - from[0]) * s, from[1] + (to[1] - from[1]) * s, 0];
              const f: Frame = {
                outline: easeOut(prog(t, T.outline)),
                body: easeOut(prog(t, T.body)),
                pin: prog(t, T.pin) > 0 ? easeOutBack(prog(t, T.pin)) : 0,
              };
              drawGlobe(it.svg, it.lonlat, rot, f);
              it.raf = t < T.pin[1] ? requestAnimationFrame(step) : 0;
            };
            it.raf = requestAnimationFrame(step);
            it.decodeId++;
            decode(it);
          }
          if (hold) it.hideTimer = window.setTimeout(() => !it.hovered && hide(it), hold);
        };

        const hide = (it: Item) => {
          clearTimeout(it.hideTimer);
          it.shown = false;
          it.svg.classList.remove("on");
          it.name.classList.remove("show");
          it.decodeId++; // cancel any running decode
          it.hideTimer = window.setTimeout(() => {
            if (it.shown) return;
            if (it.raf) {
              cancelAnimationFrame(it.raf);
              it.raf = 0;
            }
            if (!reduce) resetChars(it);
          }, RESET_MS);
        };

        items.forEach((it) => {
          const onEnter = (e: PointerEvent) => {
            if (e.pointerType === "mouse") {
              it.hovered = true;
              show(it);
            }
          };
          const onLeave = (e: PointerEvent) => {
            if (e.pointerType === "mouse") {
              it.hovered = false;
              hide(it);
            }
          };
          const onUp = (e: PointerEvent) => {
            if (e.pointerType !== "mouse") show(it, TOUCH_HOLD);
          };
          const onFocus = () => show(it);
          const onBlur = () => !it.hovered && hide(it);
          it.loc.addEventListener("pointerenter", onEnter);
          it.loc.addEventListener("pointerleave", onLeave);
          it.loc.addEventListener("pointerup", onUp);
          it.loc.addEventListener("focus", onFocus);
          it.loc.addEventListener("blur", onBlur);
          cleanups.push(() => {
            it.loc.removeEventListener("pointerenter", onEnter);
            it.loc.removeEventListener("pointerleave", onLeave);
            it.loc.removeEventListener("pointerup", onUp);
            it.loc.removeEventListener("focus", onFocus);
            it.loc.removeEventListener("blur", onBlur);
          });
        });

        cleanups.push(() =>
          items.forEach((it) => {
            clearTimeout(it.hideTimer);
            if (it.raf) cancelAnimationFrame(it.raf);
          }),
        );
      })
      .catch(() => {});

    return () => {
      disposed = true;
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div className="edge-coords" ref={rootRef}>
      {LOCS.map(({ key, side }) => {
        const city = CITIES[key];
        return (
          <div className={`edge-loc edge-loc--${side}`} key={key} tabIndex={0}>
            <span className="edge-ornament" aria-hidden="true" />
            <svg
              className="edge-globe"
              width={64}
              height={64}
              viewBox="0 0 64 64"
              aria-hidden="true"
              data-pos={GLOBE_POSITION}
            />
            <span className="sr-only">{`${city.name}. ${city.coord}`}</span>
            <span className="edge-cap" aria-hidden="true">
              <span className="edge-coord">{city.coord}</span>
              <span className="edge-name">
                {[...city.name].map((ch, i) => (
                  <span key={i} className="ch off">
                    {ch}
                  </span>
                ))}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
