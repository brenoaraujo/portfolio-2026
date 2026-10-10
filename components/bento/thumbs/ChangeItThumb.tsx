"use client";

import { useEffect, useRef } from "react";

// Ported from "ChangeIt Thumbnail.dc.html": a browser window scroll-scrubbing
// over the Change-it homepage, holding at stops then easing between them.
const W = 1328, H = 1368, PAD = 96, PAGE_W = 1258, PAGE_H = 4107;
const winW = W - PAD * 2;
const scale = winW / PAGE_W;
const viewH = H - PAD;
const maxY = PAGE_H - viewH / scale;
const stops = [0, 560, 1000, 1830, 2700, 3040];
const HOLD = 1.1, MOVE = 1.6, T = stops.length * (HOLD + MOVE);
const ease = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const yAt = (t: number) => {
  const seg = HOLD + MOVE, n = stops.length;
  const i = Math.floor(t / seg) % n;
  const local = t - Math.floor(t / seg) * seg;
  const a = Math.min(stops[i], maxY);
  const b = Math.min(stops[(i + 1) % n], maxY);
  return local < HOLD ? a : a + (b - a) * ease((local - HOLD) / MOVE);
};

export function ChangeItThumb() {
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let el = 0, last = performance.now(), raf = 0, vis = true;
    const io = new IntersectionObserver(([e]) => (vis = e.isIntersecting), { threshold: 0 });
    if (wrap.current) io.observe(wrap.current);
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      if (!reduced && vis) el = (el + dt) % T;
      const w = wrap.current, st = stage.current, pg = page.current;
      if (vis && w && st && pg) {
        const k = Math.max(w.clientWidth / W, w.clientHeight / H);
        st.style.transform = `translate(${(w.clientWidth - W * k) / 2}px,${(w.clientHeight - H * k) / 2}px) scale(${k})`;
        pg.style.transform = `translate3d(0,${-yAt(el) * scale}px,0)`;
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
      <div
        ref={stage}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: W,
          height: H,
          transformOrigin: "0 0",
          overflow: "hidden",
          background:
            "url('/assets/bg.webp') repeat, radial-gradient(90% 70% at 0% 0%, #efe6d8 0%, rgba(239,230,216,0) 60%), radial-gradient(90% 80% at 100% 100%, #c9d3e3 0%, rgba(201,211,227,0) 65%), #DFDDDA",
          backgroundBlendMode: "multiply, normal, normal, normal",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: PAD,
            top: PAD,
            width: winW,
            height: viewH + 40,
            borderRadius: "14px 14px 0 0",
            overflow: "hidden",
            background: "#fff",
            boxShadow: "0 0 0 1px rgba(15,27,50,.08), 0 30px 70px -30px rgba(15,27,50,.35)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={page}
            src="/assets/thumb/changeit-page.webp"
            alt=""
            draggable={false}
            style={{ position: "absolute", left: 0, top: 0, width: winW, height: "auto", display: "block", willChange: "transform" }}
          />
        </div>
      </div>
    </div>
  );
}
