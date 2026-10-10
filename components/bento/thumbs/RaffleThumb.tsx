"use client";

import { useEffect, useRef } from "react";

// Ported from "Raffle Thumbnail.dc.html": a deck of 4 cards; the front card
// slides down and tips back while the stack recedes, then re-enters at the back.
const W = 668, H = 688, C = 440, HOLD = 1.3, MOVE = 1.0;
const cards = ["01", "02", "03", "04"];
const ease = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

export function RaffleThumb() {
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let el = 0, last = performance.now(), raf = 0, vis = true;
    const io = new IntersectionObserver(([e]) => (vis = e.isIntersecting), { threshold: 0 });
    if (wrap.current) io.observe(wrap.current);
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      if (!reduced && vis) el += dt;
      const w = wrap.current, st = stage.current;
      if (vis && w && st) {
        const k = Math.max(w.clientWidth / W, w.clientHeight / H);
        st.style.transform = `translate(${(w.clientWidth - W * k) / 2}px,${(w.clientHeight - H * k) / 2}px) scale(${k})`;
        const n = cards.length, seg = HOLD + MOVE;
        const step = Math.floor(el / seg), local = el - step * seg;
        const pr = local < HOLD ? 0 : (local - HOLD) / MOVE;
        const pos = step + ease(Math.min(1, pr));
        const x0 = (W - C) / 2, y0 = (H - C) / 2 + 70;
        els.current.forEach((cel, i) => {
          if (!cel) return;
          let r = ((i - pos) % n + n) % n;
          if (r > n - 1) r -= n;
          if (r < 0) {
            const q = -r;
            cel.style.transform = `translate3d(${x0}px,${y0 + q * 640}px,${q * 60}px) rotateX(${-q * 18}deg) rotate(${-q * 12}deg)`;
            cel.style.opacity = String(1 - Math.pow(q, 3));
            cel.style.zIndex = "20";
            cel.style.filter = "none";
          } else {
            const d = r;
            const arrive = d > n - 1.001 ? ease(Math.min(1, local / 0.45)) : 1;
            cel.style.transform = `translate3d(${x0}px,${y0 - d * 52 - (1 - arrive) * 40}px,${-d * 150}px)`;
            cel.style.opacity = String(arrive);
            cel.style.zIndex = String(10 - Math.round(d * 2));
            cel.style.filter = `brightness(${1 - Math.min(d, 3) * 0.08})`;
          }
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrap} style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div ref={stage} style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transformOrigin: "0 0", overflow: "hidden", background: "#DFDDDA", perspective: "1300px", perspectiveOrigin: "50% 0%" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/assets/bg.webp')", backgroundRepeat: "repeat", mixBlendMode: "multiply", opacity: 0.6 }} />
        {cards.map((c, i) => (
          <div
            key={c}
            ref={(cel) => {
              els.current[i] = cel;
            }}
            style={{ position: "absolute", left: 0, top: 0, width: C, height: C, transformOrigin: "50% 50%", willChange: "transform", backfaceVisibility: "hidden", borderRadius: 14, overflow: "hidden", background: "#fff", boxShadow: "0 0 0 1px rgba(0,0,0,.06), 0 24px 48px -22px rgba(40,34,26,.45)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/assets/thumb/raffle-${c}.webp`} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
