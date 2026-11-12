"use client";

import { useEffect } from "react";

const LINE_EASE = "cubic-bezier(0.2, 0.7, 0.2, 1)";
const NODE_EASE = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const CONTENT_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const LETTER_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

function wa(
  el: Element,
  keyframes: Keyframe[],
  options: KeyframeAnimationOptions,
) {
  return el.animate(keyframes, { fill: "backwards", ...options });
}

/** Splits h1 text into word→letter spans. Returns cleanup fn that restores plain text. */
function splitH1(h1: HTMLHeadingElement): () => void {
  const original = h1.textContent ?? "";
  h1.setAttribute("aria-label", original);
  const words = original.split(" ");
  h1.innerHTML = words
    .map((word) => {
      const letters = word
        .split("")
        .map(
          (ch) =>
            `<span aria-hidden="true" style="display:inline-block;transform-origin:50% 60%">${ch}</span>`,
        )
        .join("");
      return `<span aria-hidden="true" style="display:inline-block;white-space:nowrap">${letters}</span>`;
    })
    .join(" ");
  return () => {
    h1.removeAttribute("aria-label");
    h1.textContent = original;
  };
}

/** Create an absolutely-positioned overlay div styled as a dashed rule. */
function makeBorderOverlay(
  parent: HTMLElement,
  cls: "hero-border-overlay--h" | "hero-border-overlay--v",
  style: Partial<CSSStyleDeclaration>,
): HTMLDivElement {
  const el = document.createElement("div");
  el.className = `hero-border-overlay ${cls}`;
  Object.assign(el.style, style);
  parent.appendChild(el);
  return el;
}

export function HeroIntro() {
  useEffect(() => {
    if (!document.documentElement.classList.contains("hero-anim")) return;

    let cancelled = false;
    const cleanupFns: Array<() => void> = [];

    const run = () => {
      if (cancelled) return;

      const bento = document.querySelector<HTMLElement>(".bento");
      const grid = document.querySelector<HTMLElement>(".bento-grid");
      const heroTile = document.querySelector<HTMLElement>(".hero-tile");
      const h1 = heroTile?.querySelector<HTMLHeadingElement>("h1");
      if (!bento || !grid || !heroTile || !h1) {
        document.documentElement.classList.remove("hero-anim");
        return;
      }

      // ── Nodes ──────────────────────────────────────────────────────────────
      const nodeTL = heroTile.querySelector<HTMLElement>(".bento-node--tl");
      const nodeBL = grid.querySelector<HTMLElement>(":scope > .bento-node--bl");
      const nodeTR = grid.querySelector<HTMLElement>(":scope > .bento-node--tr");
      const nodeBR = grid.querySelector<HTMLElement>(":scope > .bento-node--br");

      const nodeAnim = (el: HTMLElement | null, delay: number) => {
        if (!el) return;
        wa(el, [
          { opacity: 0, transform: "scale(0.3)" },
          { opacity: 1, transform: "scale(1)" },
        ], { duration: 260, delay, easing: NODE_EASE });
      };
      nodeAnim(nodeTL, 0);
      nodeAnim(nodeBL, 240);
      nodeAnim(nodeTR, 460);
      nodeAnim(nodeBR, 660);

      // ── Border overlays ────────────────────────────────────────────────────
      // Measure grid rect relative to bento for overlay positioning
      const bentoRect = bento.getBoundingClientRect();
      const gridRect = grid.getBoundingClientRect();
      const gridTop = gridRect.top - bentoRect.top;

      // Top horizontal rule (border-top of .bento-grid)
      const topRule = makeBorderOverlay(bento, "hero-border-overlay--h", {
        top: `${gridTop}px`,
        left: "0",
        right: "0",
      });
      wa(topRule, [
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)" },
      ], { duration: 750, delay: 80, easing: LINE_EASE });

      // Left border of .bento (grows top-to-bottom from TL node)
      const leftBorder = makeBorderOverlay(bento, "hero-border-overlay--v", {
        left: "-1px",
        top: "0",
        bottom: "0",
        borderLeft: "1px dashed var(--rd-rule)",
        borderTop: "none",
        width: "0",
      });
      wa(leftBorder, [
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0)" },
      ], { duration: 1000, delay: 80, easing: LINE_EASE });

      // Hero bottom rule (border-bottom of .hero-tile)
      const heroBottom = heroTile.getBoundingClientRect().bottom - bentoRect.top;
      const heroBotRule = makeBorderOverlay(bento, "hero-border-overlay--h", {
        top: `${heroBottom - 1}px`,
        left: "0",
        right: "0",
      });
      wa(heroBotRule, [
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)" },
      ], { duration: 750, delay: 260, easing: LINE_EASE });

      // Right border of .bento (grows top-to-bottom from TR node)
      const rightBorder = makeBorderOverlay(bento, "hero-border-overlay--v", {
        right: "-1px",
        top: "0",
        bottom: "0",
        borderRight: "1px dashed var(--rd-rule)",
        borderLeft: "none",
        borderTop: "none",
        width: "0",
      });
      wa(rightBorder, [
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0)" },
      ], { duration: 1000, delay: 480, easing: LINE_EASE });

      // GridEdgeLines extensions — fade them in with the top rule
      const edges = Array.from(document.querySelectorAll<HTMLElement>(".bento-edge"));
      edges.forEach((edge) => {
        wa(edge, [{ opacity: 0 }, { opacity: 1 }], {
          duration: 400,
          delay: 80,
          easing: "ease-out",
        });
      });

      // ── Header ─────────────────────────────────────────────────────────────
      const header = document.querySelector<HTMLElement>(".bento-header");
      if (header) {
        wa(header, [{ opacity: 0 }, { opacity: 1 }], {
          duration: 400,
          delay: 0,
          easing: "ease-out",
        });
      }

      // ── Eyebrow ────────────────────────────────────────────────────────────
      const eyebrows = heroTile.querySelector<HTMLElement>(".hero-tile__eyebrows");
      if (eyebrows) {
        wa(eyebrows, [{ opacity: 0 }, { opacity: 1 }], {
          duration: 400,
          delay: 300,
          easing: "ease-out",
        });
      }

      // ── Headline letter-by-letter ──────────────────────────────────────────
      const restoreH1 = splitH1(h1);
      cleanupFns.push(restoreH1);

      const letterSpans = Array.from(
        h1.querySelectorAll<HTMLElement>("[aria-hidden] [aria-hidden]"),
      );
      let lastAnim: Animation | null = null;
      letterSpans.forEach((span, i) => {
        const anim = wa(span, [
          { opacity: 0, filter: "blur(10px)", transform: "scale(1.25)" },
          { opacity: 1, filter: "blur(0px)", transform: "scale(1)" },
        ], {
          duration: 900,
          delay: 380 + i * 24,
          easing: LETTER_EASE,
        });
        lastAnim = anim;
      });

      // After last letter finishes, replace spans with plain text
      if (lastAnim) {
        (lastAnim as Animation).addEventListener("finish", () => {
          restoreH1();
          // Remove from cleanupFns so it's not called twice
          const idx = cleanupFns.indexOf(restoreH1);
          if (idx >= 0) cleanupFns.splice(idx, 1);
        });
      }

      // ── Subtext + CTA ──────────────────────────────────────────────────────
      const sub = heroTile.querySelector<HTMLElement>(".hero-tile__sub");
      if (sub) {
        wa(sub, [
          { opacity: 0, transform: "translateY(14px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { duration: 700, delay: 950, easing: CONTENT_EASE });
      }

      const cta = heroTile.querySelector<HTMLElement>(".hero-tile__cta");
      if (cta) {
        wa(cta, [
          { opacity: 0, transform: "translateY(14px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { duration: 700, delay: 1080, easing: CONTENT_EASE });
      }

      // ── Work tiles ─────────────────────────────────────────────────────────
      const workTiles = Array.from(
        document.querySelectorAll<HTMLElement>(".work-tile"),
      );
      workTiles.forEach((tile, i) => {
        wa(tile, [{ opacity: 0 }, { opacity: 1 }], {
          duration: 600,
          delay: 700 + i * 80,
          easing: "ease-out",
        });
      });

      // ── Remove hero-anim class after all animations are started ────────────
      // WAAPI fill:"backwards" now owns the initial hidden state.
      document.documentElement.classList.remove("hero-anim");

      // ── Cleanup border overlays after the longest border animation ─────────
      // Right border: delay 480 + duration 1000 = 1480ms
      const overlays = [topRule, leftBorder, heroBotRule, rightBorder];
      const cleanupTimer = window.setTimeout(() => {
        overlays.forEach((o) => o.parentNode?.removeChild(o));
      }, 1600);
      cleanupFns.push(() => {
        clearTimeout(cleanupTimer);
        overlays.forEach((o) => o.parentNode?.removeChild(o));
      });

    };

    // Start after fonts ready (500ms hard fallback)
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      run();
    };
    const timer = window.setTimeout(start, 500);
    document.fonts.ready.then(start);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      cleanupFns.forEach((fn) => fn());
      document.documentElement.classList.remove("hero-anim");
    };
  }, []);

  return null;
}
