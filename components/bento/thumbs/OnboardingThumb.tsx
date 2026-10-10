"use client";

import { useEffect, useRef, type CSSProperties } from "react";

// Ported from "Onboarding Thumbnail.dc.html": a before/after compare that wipes
// middle → full After → full Before → middle. Rendered at native size (no scale
// transform) so the UI text stays sharp.
const W = 1328, H = 808, HOLD = 1.4, MOVE = 1.3;
const K = [0.5, 0, 1, 0.5];
const ease = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

const IMG: CSSProperties = { position: "absolute", left: 0, top: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "left top", display: "block" };
const CHIP: CSSProperties = { position: "absolute", bottom: 20, padding: "5px 10px", borderRadius: 999, background: "rgba(22,22,21,.86)", color: "#fafaf8", font: "500 12px 'Noto Serif', Georgia, serif", letterSpacing: "-0.02em", zIndex: 3 };

export function OnboardingThumb() {
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const after = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const lblA = useRef<HTMLSpanElement>(null);
  const lblB = useRef<HTMLSpanElement>(null);

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
      if (vis && w && st && frame.current && after.current && bar.current && lblA.current && lblB.current) {
        const k = Math.max(w.clientWidth / W, w.clientHeight / H);
        st.style.width = `${w.clientWidth}px`;
        st.style.height = `${w.clientHeight}px`;
        const M = Math.round(Math.max(20, 56 * k));
        const fs = frame.current.style;
        fs.left = fs.right = fs.top = fs.bottom = `${M}px`;
        const seg = HOLD + MOVE, cyc = el % (3 * seg);
        const i = Math.floor(cyc / seg), loc = cyc - i * seg;
        const x = loc < HOLD ? K[i] : K[i] + (K[i + 1] - K[i]) * ease((loc - HOLD) / MOVE);
        const pct = x * 100;
        after.current.style.clipPath = `inset(0 0 0 ${pct}%)`;
        bar.current.style.left = `${pct}%`;
        lblB.current.style.opacity = String(Math.min(1, Math.max(0, (x - 0.08) / 0.12)));
        lblA.current.style.opacity = String(Math.min(1, Math.max(0, (0.92 - x) / 0.12)));
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
      <div ref={stage} style={{ position: "absolute", left: 0, top: 0, transformOrigin: "0 0", overflow: "hidden", background: "#DFDDDA url('/assets/bg.webp') repeat", backgroundBlendMode: "multiply" }}>
        <div ref={frame} style={{ position: "absolute", left: 56, top: 56, right: 56, bottom: 56, borderRadius: 12, overflow: "hidden", background: "#fff", boxShadow: "0 0 0 1px rgba(0,0,0,.06), 0 24px 48px -22px rgba(40,34,26,.45)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/thumb/onb-before.webp" alt="" draggable={false} style={IMG} />
          <div ref={after} style={{ position: "absolute", inset: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/thumb/onb-after.webp" alt="" draggable={false} style={IMG} />
          </div>
          <span ref={lblB} style={{ ...CHIP, left: 24 }}>
            Before
          </span>
          <span ref={lblA} style={{ ...CHIP, right: 20 }}>
            After
          </span>
          <div ref={bar} style={{ position: "absolute", top: 0, bottom: 0, width: 0, zIndex: 4 }}>
            <div style={{ position: "absolute", top: 0, bottom: 0, left: -1.5, width: 3, background: "#161615" }} />
            <div style={{ position: "absolute", top: "50%", marginTop: -18, left: -18, width: 36, height: 36, borderRadius: "50%", background: "#161615", color: "#fafaf8", display: "flex", alignItems: "center", justifyContent: "center", font: "600 16px sans-serif", boxShadow: "0 6px 16px rgba(0,0,0,.25)" }}>
              ‹ ›
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
