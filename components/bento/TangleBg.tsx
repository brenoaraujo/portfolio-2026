"use client";

import { useEffect, useRef } from "react";

/**
 * Tangle — a single looping line with randomized coils per load. On hover of the
 * host <section> the amplitude eases to 0 (a straight line) and opacity to 100%.
 * Ported from "Tangle.dc.html"; pauses off-screen and when settled.
 */
export function TangleBg({ color = "#ffffff" }: { color?: string }) {
  const svg = useRef<SVGSVGElement>(null);
  const path = useRef<SVGPathElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = (a: number, b: number) => a + Math.random() * (b - a);
    const R = {
      loops: q(6, 10), f1: q(4, 10), f2: q(15, 30), p1: q(0, 6.3), p2: q(0, 6.3),
      l2: q(2.2, 4.6), p3: q(0, 6.3), f3: q(2, 4.5), cy: q(0.5, 0.68), dir: Math.random() < 0.5 ? 1 : -1,
    };
    let a = 1, raf = 0, vis = true, lastDrawn = -1;

    const draw = () => {
      const s = svg.current, p = path.current;
      if (!s || !p) return;
      const W = s.clientWidth, H = s.clientHeight;
      if (!W) return;
      s.setAttribute("viewBox", `0 0 ${W} ${H}`);
      const cy = H * R.cy, N = 600;
      let d = "";
      for (let i = 0; i <= N; i++) {
        const t = i / N, ang = R.dir * t * Math.PI * 2 * R.loops;
        const r = Math.min(W, H) * (0.12 + 0.1 * Math.sin(t * R.f1 + R.p1) + 0.06 * Math.sin(t * R.f2 + R.p2));
        const ang2 = t * Math.PI * 2 * R.l2 + R.p3;
        const x = -20 + t * (W + 40) + a * (r * Math.cos(ang) * 1.3 + Math.cos(ang2) * W * 0.03);
        const y = cy + a * (r * Math.sin(ang) * 1.1 + Math.sin(ang2 + 1) * H * 0.06 + Math.sin(t * R.f3 + R.p1) * H * 0.1);
        d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
      }
      p.setAttribute("d", d);
      p.setAttribute("opacity", String(0.6 + 0.4 * (1 - a)));
      lastDrawn = a;
    };

    if (reduced) {
      // one static coil, no animation
      requestAnimationFrame(draw);
      return;
    }

    const io = new IntersectionObserver(([e]) => (vis = e.isIntersecting), { threshold: 0 });
    if (svg.current) io.observe(svg.current);
    const tick = () => {
      if (vis && svg.current) {
        const hover = svg.current.closest("section")?.matches(":hover") ?? false;
        const target = hover ? 0 : 1;
        a += (target - a) * (hover ? 0.045 : 0.03);
        if (hover || Math.abs(a - lastDrawn) > 0.0008) draw();
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
    <svg ref={svg} width="100%" height="100%" preserveAspectRatio="none" style={{ display: "block" }} aria-hidden="true">
      <path ref={path} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.6} />
    </svg>
  );
}
