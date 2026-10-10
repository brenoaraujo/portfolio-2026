"use client";

import { useEffect, useRef, useState } from "react";

type Lines = { l: number[]; r: number[]; gl: number; gr: number };

/**
 * Horizontal dashed rules that extend from the outer-column tile bottoms out to
 * the viewport edges, plus a node at each right-edge rule. Measured at runtime
 * (ported from the handoff) so the rules stay aligned as content/width changes.
 * Progressive enhancement over the tiles' own dashed borders.
 */
export function GridEdgeLines() {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState<Lines | null>(null);

  useEffect(() => {
    const grid = anchorRef.current?.parentElement;
    if (!grid) return;
    let key = "";
    const measure = () => {
      const gr = grid.getBoundingClientRect();
      const L = new Set<number>([0]);
      const R = new Set<number>([0]);
      Array.from(grid.children).forEach((c) => {
        if (c.tagName !== "SECTION" && c.tagName !== "A") return;
        const b = c.getBoundingClientRect();
        const y = Math.round(b.bottom - gr.top);
        if (b.left - gr.left < 3) L.add(y);
        if (gr.right - b.right < 3) R.add(y);
      });
      const next: Lines = {
        l: [...L],
        r: [...R],
        gl: gr.left,
        gr: window.innerWidth - gr.right,
      };
      const k = `${next.l.join()}|${next.r.join()}|${Math.round(gr.left)}|${window.innerWidth}`;
      if (k !== key) {
        key = k;
        setLines(next);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(grid);
    window.addEventListener("resize", measure);
    const t1 = window.setTimeout(measure, 300);
    const t2 = window.setTimeout(measure, 1500);
    const imgs = Array.from(grid.querySelectorAll("img"));
    imgs.forEach((i) => i.addEventListener("load", measure));
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t1);
      clearTimeout(t2);
      imgs.forEach((i) => i.removeEventListener("load", measure));
    };
  }, []);

  return (
    <>
      <span ref={anchorRef} style={{ display: "none" }} aria-hidden="true" />
      {lines?.l.map((y) => (
        <span
          key={`l${y}`}
          className="bento-edge"
          style={{ top: y - 1, left: -lines.gl - 1, width: lines.gl }}
        />
      ))}
      {lines?.r.map((y) => (
        <span
          key={`r${y}`}
          className="bento-edge"
          style={{ top: y - 1, left: "calc(100% + 1px)", width: lines.gr }}
        />
      ))}
      {lines?.r.map((y) => (
        <span key={`rn${y}`} className="bento-node" style={{ top: y - 5, right: -4 }} aria-hidden="true" />
      ))}
    </>
  );
}
