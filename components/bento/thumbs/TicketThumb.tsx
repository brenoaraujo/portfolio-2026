"use client";

import { useEffect, useRef } from "react";

// Ported from "Ticket App Thumbnail.dc.html": a carousel of phone screens that
// advances only while the work tile is hovered, with an elastic settle.
const W = 1328, H = 688, HOLD = 1.4, MOVE = 1.1, GAP = 280, PH = 540;
const PW = PH * 0.4624;
const screens = ["02", "06", "03", "05", "04", "01"];
const elastic = (p: number) => {
  if (p >= 1) return 1;
  const c = 1.15, d = c + 1;
  return 1 + d * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2);
};

export function TicketThumb() {
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const phones = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let el = 0, last = performance.now(), raf = 0, vis = true;
    const io = new IntersectionObserver(([e]) => (vis = e.isIntersecting), { threshold: 0 });
    if (wrap.current) io.observe(wrap.current);
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const hovered = wrap.current?.closest("a")?.matches(":hover") ?? true;
      if (!reduced && vis && hovered) el += dt;
      const w = wrap.current, st = stage.current;
      if (vis && w && st) {
        const k = Math.max(w.clientWidth / W, w.clientHeight / H);
        st.style.transform = `translate(${(w.clientWidth - W * k) / 2}px,${(w.clientHeight - H * k) / 2}px) scale(${k})`;
        const seg = HOLD + MOVE, n = screens.length;
        const step = Math.floor(el / seg), local = el - step * seg;
        const p = local < HOLD ? 0 : (local - HOLD) / MOVE;
        const pos = step + elastic(p);
        phones.current.forEach((pel, i) => {
          if (!pel) return;
          let d = ((i - pos) % n + n) % n;
          if (d > n / 2) d -= n;
          const a = Math.abs(d);
          pel.style.transform = `translate(${W / 2 + d * GAP - PW / 2}px,${(H - PH) / 2}px)`;
          pel.style.zIndex = String(10 - Math.round(a * 2));
          pel.style.opacity = a > 2.6 ? String(Math.max(0, 1 - (a - 2.6) * 3)) : "1";
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
      <div ref={stage} style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transformOrigin: "0 0", overflow: "hidden", background: "#DFDDDA" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/assets/bg.webp')", backgroundRepeat: "repeat", mixBlendMode: "multiply", opacity: 0.6 }} />
        {screens.map((s, i) => (
          <div
            key={s}
            ref={(el) => {
              phones.current[i] = el;
            }}
            style={{ position: "absolute", left: 0, top: 0, width: PW, height: PH, transformOrigin: "50% 60%", willChange: "transform", padding: 7, boxSizing: "border-box", borderRadius: 34, background: "#0f0f0e", boxShadow: "0 0 0 1px rgba(0,0,0,.08), 0 24px 48px -20px rgba(40,34,26,.45)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/assets/thumb/ticket-${s}.webp`} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 27, display: "block", background: "#fff" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
