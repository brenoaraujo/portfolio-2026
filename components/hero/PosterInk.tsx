"use client";

import { useEffect, useRef } from "react";

/* Light-ink plate for the hero poster word — the same effect as the closing
   "light the fire of my utopia." headline: a salmon duplicate sits behind the
   solid red key text, offset so it's always visibly peeking out (a double-print
   look) with rough ink edges, and slips along the cursor's movement axis,
   easing back to its resting offset when the cursor stops. The plate is a
   decorative duplicate: aria-hidden, unselectable, no pointer events.

   Tunables ───────────────────────────────────────────────────────────────── */
const REST = { x: 0.07, y: 0.1 }; // resting offset of the light plate (em), matches the footer
const SLIP_MAX = 6; // px — max cursor-driven slip
const SLIP_SENS = 5; // px of slip per (px/ms) of cursor speed
const SETTLE = 0.1; // per-frame lerp toward the slip target
const IDLE_MS = 70; // no pointer movement for this long → ease back to rest

export function PosterInk({ words }: { words: string[] }) {
  const lightRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const light = lightRef.current;
    if (!light) return;
    const hero = light.closest<HTMLElement>(".hero");
    if (!hero) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // REST is in em; resolve from the plate's font-size once (and on resize) so
    // nothing reads layout inside the rAF loop.
    let fontPx = parseFloat(getComputedStyle(light).fontSize) || 100;
    const atRest = () =>
      `translate(${(REST.x * fontPx).toFixed(2)}px, ${(REST.y * fontPx).toFixed(2)}px)`;
    const onResize = () => {
      fontPx = parseFloat(getComputedStyle(light).fontSize) || 100;
    };
    window.addEventListener("resize", onResize);

    light.style.transform = atRest();

    // Reduced motion → rest at the designed offset, no cursor slip.
    if (reduce) {
      return () => window.removeEventListener("resize", onResize);
    }

    let slipX = 0;
    let slipY = 0;
    let tgtX = 0;
    let tgtY = 0;
    let last: { x: number; y: number; t: number } | null = null;
    let lastMove = 0;
    let raf = 0;
    let inView = true;

    const loop = (now: number) => {
      if (now - lastMove > IDLE_MS) {
        tgtX = 0;
        tgtY = 0;
      }
      slipX += (tgtX - slipX) * SETTLE;
      slipY += (tgtY - slipY) * SETTLE;

      if (tgtX === 0 && tgtY === 0 && Math.abs(slipX) < 0.05 && Math.abs(slipY) < 0.05) {
        slipX = 0;
        slipY = 0;
        light.style.transform = atRest();
        raf = 0;
        return; // back at rest → stop the loop
      }

      light.style.transform = `translate(${(REST.x * fontPx + slipX).toFixed(2)}px, ${(
        REST.y * fontPx +
        slipY
      ).toFixed(2)}px)`;
      raf = requestAnimationFrame(loop);
    };

    const kick = () => {
      if (!raf && inView) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const now = performance.now();
      if (last) {
        const dt = Math.max(8, now - last.t);
        const dx = e.clientX - last.x;
        const dy = e.clientY - last.y;
        const n = Math.hypot(dx, dy);
        if (n > 0) {
          const mag = Math.min(SLIP_MAX, (n / dt) * SLIP_SENS);
          tgtX = (dx / n) * mag;
          tgtY = (dy / n) * mag;
        }
      }
      last = { x: e.clientX, y: e.clientY, t: now };
      lastMove = now;
      kick();
    };
    hero.addEventListener("pointermove", onMove);

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (!inView && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (inView && (slipX !== 0 || slipY !== 0)) {
        kick();
      }
    });
    io.observe(hero);

    return () => {
      hero.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Rough-ink displacement filter for the light plate (mirrors the closing
          headline's #utopia-rough-l). */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <filter id="poster-rough-l" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency=".45" numOctaves="2" seed="9" />
          <feDisplacementMap in="SourceGraphic" scale="4.5" />
        </filter>
      </svg>
      <p className="poster__text poster__light" ref={lightRef} aria-hidden="true">
        {words.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </p>
    </>
  );
}
