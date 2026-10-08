"use client";

import { useEffect, useRef } from "react";
import { CLOSING } from "@/lib/site";
import { HomeFooter } from "@/components/site/HomeFooter";

/* The collage design frame (Figma 324:1607). All photo geometry is expressed in
   this space and emitted as percentages so the pile scales with the container. */
const CW = 501.9;
const CH = 690.4;

/* Bring the selected print to the front — off by default (try true later). */
const RAISE_ON_HOVER = false;

interface PrintMeta {
  src: string;
  /** Axis-aligned bounding box of the baked (pre-rotated) image, in frame px. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Visible print rectangle, measured from the image's transparency as % of the
      image box: centre, size, and rotation. Drives both the frame and hit-area. */
  cx: number;
  cy: number;
  pw: number;
  ph: number;
  angle: number;
  slug: string;
  alt: string;
}

/* Back → front. bbox from the Figma collage; visible-print rects measured from
   each image's transparency; slugs/alt per the prototype. */
const PRINTS: PrintMeta[] = [
  { src: "/assets/collage-1.webp", x: 186, y: 196, w: 242.392, h: 183.555, cx: 49.88, cy: 49.74, pw: 98.73, ph: 97.52, angle: -1.1, slug: "04 — Motorcycle", alt: "On the motorcycle by a lake" },
  { src: "/assets/collage-2.webp", x: 18.34, y: -25.52, w: 318.244, h: 253.644, cx: 49.88, cy: 49.83, pw: 92.46, ph: 86.79, angle: -6.88, slug: "01 — Proud of", alt: "Kids playing in the living room" },
  { src: "/assets/collage-3.webp", x: -17, y: 183, w: 248.17, h: 281.78, cx: 50.19, cy: 48.51, pw: 86.31, ph: 93.13, angle: 1.8, slug: "03 — Campfire", alt: "At a campfire" },
  { src: "/assets/collage-4.webp", x: 250.7, y: 12.53, w: 279.085, h: 241.931, cx: 47.53, cy: 49.8, pw: 86.95, ph: 79.46, angle: 5.99, slug: "02 — Family", alt: "Family on the couch" },
  { src: "/assets/collage-5.webp", x: 177, y: 306, w: 320.278, h: 268.084, cx: 50.15, cy: 50.2, pw: 70.72, ph: 56.95, angle: 11.78, slug: "05 — Drums", alt: "Playing drums" },
];

const pct = (v: number, total: number) => `${((v / total) * 100).toFixed(3)}%`;

/** The visible print rect in frame px: {cx,cy} centre, {w,h} size, angle. */
function printRect(p: PrintMeta) {
  return {
    cx: p.x + (p.cx / 100) * p.w,
    cy: p.y + (p.cy / 100) * p.h,
    w: (p.pw / 100) * p.w,
    h: (p.ph / 100) * p.h,
    angle: p.angle,
  };
}

/** Hit area = the visible print's rotated quad, as a clip-path polygon in bbox %. */
function hitClip(p: PrintMeta) {
  const a = (p.angle * Math.PI) / 180;
  const c = Math.cos(a);
  const s = Math.sin(a);
  const hw = ((p.pw / 100) * p.w) / 2;
  const hh = ((p.ph / 100) * p.h) / 2;
  const pts = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ].map(([u, v]) => {
    const rx = u * hw * c - v * hh * s;
    const ry = u * hw * s + v * hh * c;
    return [p.cx + (rx / p.w) * 100, p.cy + (ry / p.h) * 100] as const;
  });
  // All points must lie inside the image box.
  if (pts.some(([x, y]) => x < 0 || x > 100 || y < 0 || y > 100)) return "none";
  return `polygon(${pts.map(([x, y]) => `${x.toFixed(2)}% ${y.toFixed(2)}%`).join(",")})`;
}

/** Corner-mark paths that extend the print's edges outward (gap 5px, length 11px). */
function cropPaths(fw: number, fh: number) {
  const G = 5;
  const L = 11;
  const W = fw;
  const H = fh;
  return {
    tl: `M${-G - L} 0H${-G}M0 ${-G - L}V${-G}`,
    tr: `M${W + G} 0H${W + G + L}M${W} ${-G - L}V${-G}`,
    bl: `M${-G - L} ${H}H${-G}M0 ${H + G}V${H + G + L}`,
    br: `M${W + G} ${H}H${W + G + L}M${W} ${H + G}V${H + G + L}`,
  };
}

const LINES = CLOSING.statementLines;

/**
 * Home closing ("About me") — portrait, about blurb, the big red "light the fire
 * of my utopia." headline (two live ink plates), and the scattered photo pile
 * with crop-mark selection. Interactions: the light plate registers on scroll
 * and slips with the cursor; prints select on hover/focus/tap with a decoding
 * slug. Replaces the old monster-video footer on the home page.
 */
export function HomeClosing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const light = section.querySelector<HTMLElement>(".utopia__plate--light");
    const headline = section.querySelector<HTMLElement>(".utopia");
    const photos = Array.from(section.querySelectorAll<HTMLElement>(".photo"));
    const frames = Array.from(section.querySelectorAll<HTMLElement>(".frame"));
    if (!light || !headline) return;

    // ── selection + decode ──────────────────────────────────────────────────
    const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const DIGITS = "0123456789";
    const pick = (s: string) => s[Math.floor(Math.random() * s.length)];

    type Char = { el: HTMLElement; ch: string; pool: string | null; flicks: number; slot: number };
    type Item = { ph: HTMLElement; fr: HTMLElement; chars: Char[]; on: boolean; token: number };

    const items: Item[] = photos.map((ph, i) => {
      const fr = frames[i];
      const chars = Array.from(fr.querySelectorAll<HTMLElement>(".crop__slug .ch")).map((el) => {
        const ch = el.textContent ?? "";
        const pool = /[0-9]/.test(ch) ? DIGITS : /[A-Z]/.test(ch) ? UPPER : null;
        return { el, ch, pool, flicks: 3 + Math.floor(Math.random() * 3), slot: -1 };
      });
      return { ph, fr, chars, on: false, token: 0 };
    });

    const resetChars = (it: Item) =>
      it.chars.forEach((c) => {
        c.el.className = "ch";
        c.el.textContent = c.ch;
        c.slot = -1;
      });

    const decode = (it: Item) => {
      const t0 = performance.now();
      const id = it.token;
      const tick = (now: number) => {
        if (it.token !== id || !it.on) return;
        let busy = false;
        it.chars.forEach((c, i) => {
          const start = t0 + 140 + i * 22;
          const end = start + (c.pool ? c.flicks * 40 : 0);
          if (now < start) {
            c.el.className = "ch off";
            busy = true;
          } else if (now < end) {
            busy = true;
            const slot = Math.floor((now - start) / 40);
            if (c.slot !== slot) {
              c.slot = slot;
              c.el.textContent = pick(c.pool!);
            }
            c.el.className = "ch hot";
          } else {
            c.el.className = "ch";
            c.el.textContent = c.ch;
          }
        });
        if (busy) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const deselect = (it: Item) => {
      if (!it.on) return;
      it.on = false;
      it.token++; // cancels any running decode
      it.ph.classList.remove("sel");
      it.fr.classList.remove("sel");
      if (RAISE_ON_HOVER) it.ph.style.zIndex = "";
      resetChars(it);
    };

    const select = (it: Item) => {
      if (it.on) return;
      items.forEach((o) => o !== it && deselect(o));
      it.on = true;
      it.token++;
      it.ph.classList.add("sel");
      it.fr.classList.add("sel");
      if (RAISE_ON_HOVER) it.ph.style.zIndex = "30";
      if (reduce) {
        resetChars(it); // marks fade in, slug shown plainly, no decode
        return;
      }
      decode(it);
    };

    const cleanups: Array<() => void> = [];
    items.forEach((it) => {
      const hit = it.ph.querySelector<HTMLElement>(".hit");
      if (!hit) return;
      const enter = (e: PointerEvent) => e.pointerType === "mouse" && select(it);
      const leave = (e: PointerEvent) => e.pointerType === "mouse" && deselect(it);
      const up = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") (it.on ? deselect : select)(it);
      };
      const focus = () => select(it);
      const blur = () => deselect(it);
      hit.addEventListener("pointerenter", enter);
      hit.addEventListener("pointerleave", leave);
      hit.addEventListener("pointerup", up);
      it.ph.addEventListener("focus", focus);
      it.ph.addEventListener("blur", blur);
      cleanups.push(() => {
        hit.removeEventListener("pointerenter", enter);
        hit.removeEventListener("pointerleave", leave);
        hit.removeEventListener("pointerup", up);
        it.ph.removeEventListener("focus", focus);
        it.ph.removeEventListener("blur", blur);
      });
    });
    const docUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && !(e.target as Element | null)?.closest?.(".hit")) {
        items.forEach(deselect);
      }
    };
    document.addEventListener("pointerup", docUp);

    // ── headline: scroll registration + cursor slip ─────────────────────────
    const DES = { x: 0.07, y: 0.1 }; // designed light-plate offset (em), today's look
    const EXTRA = { x: -0.36, y: 0.21, r: -1.4 }; // extra before registration
    const REG_SPAN = 0.55;
    const SLIP_MAX = 6;
    const SLIP_SENS = 5;
    const SLIP_SETTLE = 0.1;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 2);

    let fontPx = parseFloat(getComputedStyle(light).fontSize) || 100;
    const onResize = () => (fontPx = parseFloat(getComputedStyle(light).fontSize) || 100);
    window.addEventListener("resize", onResize);

    if (reduce) {
      light.style.transform = `translate(${(DES.x * fontPx).toFixed(2)}px, ${(DES.y * fontPx).toFixed(2)}px)`;
    }

    let slipX = 0;
    let slipY = 0;
    let tgtX = 0;
    let tgtY = 0;
    let last: { x: number; y: number; t: number } | null = null;
    let lastMove = 0;
    const onMove = (e: PointerEvent) => {
      if (reduce || e.pointerType !== "mouse") return;
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
    };
    section.addEventListener("pointermove", onMove);

    let raf = 0;
    let active = false;
    const loop = (now: number) => {
      if (!active) return;
      const r = headline.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * REG_SPAN)));
      if (now - lastMove > 70) {
        tgtX = 0;
        tgtY = 0;
      }
      slipX += (tgtX - slipX) * SLIP_SETTLE;
      slipY += (tgtY - slipY) * SLIP_SETTLE;
      const k = 1 - easeOut(p);
      const x = (DES.x + EXTRA.x * k) * fontPx + slipX;
      const y = (DES.y + EXTRA.y * k) * fontPx + slipY;
      light.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) rotate(${(EXTRA.r * k).toFixed(3)}deg)`;
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !active) {
        active = true;
        raf = requestAnimationFrame(loop);
      } else if (!entry.isIntersecting && active) {
        active = false;
        cancelAnimationFrame(raf);
      }
    });
    if (!reduce) io.observe(section);

    return () => {
      cleanups.forEach((fn) => fn());
      document.removeEventListener("pointerup", docUp);
      section.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Rough-ink displacement filters for the two headline plates. */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <filter id="utopia-rough-r" x="-6%" y="-6%" width="112%" height="112%">
          <feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="2.2" />
        </filter>
        <filter id="utopia-rough-l" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency=".45" numOctaves="2" seed="9" />
          <feDisplacementMap in="SourceGraphic" scale="4.5" />
        </filter>
      </svg>

      <section className="closing" aria-label="About and contact" ref={sectionRef}>
        <div className="closing__stage">
        <img
          className="closing__photo"
          src={CLOSING.photo}
          alt="Breno Araujo"
          width={406}
          height={406}
          loading="lazy"
        />

        <p className="closing__about">{CLOSING.about}</p>

        <div className="utopia">
          <div className="utopia__plate utopia__plate--light" aria-hidden="true">
            {LINES.map((line, i) => (
              <span key={line} className={i === 1 ? "ln utopia__ind" : "ln"}>
                {line}
              </span>
            ))}
          </div>
          <h2 className="utopia__plate utopia__plate--red">
            {LINES.map((line, i) => (
              <span key={line} className={i === 1 ? "ln utopia__ind" : "ln"}>
                {line}
              </span>
            ))}
          </h2>
        </div>

        {/* Scattered B&W photo pile — interactive, desktop-only (figma 324:1607). */}
        <div className="closing__collage">
          {PRINTS.map((p, i) => (
            <div
              key={p.src}
              className="photo"
              tabIndex={0}
              role="img"
              aria-label={p.alt}
              style={{
                left: pct(p.x, CW),
                top: pct(p.y, CH),
                width: pct(p.w, CW),
                aspectRatio: `${p.w} / ${p.h}`,
                zIndex: 10 + i,
                ["--a" as string]: `${p.angle}deg`,
              }}
            >
              <img src={p.src} alt="" loading="lazy" />
              <div className="hit" style={{ clipPath: hitClip(p) }} />
            </div>
          ))}
        </div>

        {/* Crop-mark overlay — above everything in the section, incl. the headline. */}
        <div className="closing__frames" aria-hidden="true">
          {PRINTS.map((p) => {
            const r = printRect(p);
            const d = cropPaths(r.w, r.h);
            return (
              <div
                key={p.src}
                className="frame"
                style={{
                  left: pct(r.cx - r.w / 2, CW),
                  top: pct(r.cy - r.h / 2, CH),
                  width: pct(r.w, CW),
                  height: pct(r.h, CH),
                  ["--a" as string]: `${p.angle}deg`,
                }}
              >
                <svg className="marks" viewBox={`0 0 ${r.w} ${r.h}`} aria-hidden="true">
                  {(["tl", "tr", "bl", "br"] as const).map((k) => (
                    <g key={k} className={`m ${k}`}>
                      <path className="halo" d={d[k]} />
                      <path className="ink" d={d[k]} />
                    </g>
                  ))}
                </svg>
                <span className="crop__slug">
                  {[...p.slug.toUpperCase()].map((ch, j) => (
                    <span key={j} className="ch">
                      {ch}
                    </span>
                  ))}
                </span>
              </div>
            );
          })}
        </div>
        </div>
      </section>

      <HomeFooter />
    </>
  );
}
