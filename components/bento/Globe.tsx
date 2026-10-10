"use client";

import { useEffect, useRef } from "react";
import type { Frame } from "@/components/hero/globe";

const CITIES = {
  here: [-122.5984, 49.2194],
  home: [-43.9345, -19.9167],
} as const;
const rotFor = (c: readonly [number, number]): [number, number] => [-c[0], -c[1]];

/**
 * Line globe for the Local-time tile — reuses the hero's d3-geo renderer
 * (lazy-imported). Always centred on Maple Ridge; hovering a city lerps the
 * rotation to it (factor .035/frame, shortest path) and settles.
 */
export function Globe({ city, spinBump }: { city: "here" | "home"; spinBump: number }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const cur = useRef<[number, number]>([...rotFor(CITIES.here)]);
  const cityRef = useRef(city);
  const api = useRef<{ draw: typeof import("@/components/hero/globe").drawGlobe; final: Frame } | null>(null);
  const raf = useRef(0);

  const tick = () => {
    const a = api.current;
    const svg = svgRef.current;
    if (!a || !svg) {
      raf.current = 0;
      return;
    }
    const tgt = rotFor(CITIES[cityRef.current]);
    const c = cur.current;
    let dl = tgt[0] - c[0];
    while (dl > 180) dl -= 360;
    while (dl < -180) dl += 360;
    const dy = tgt[1] - c[1];
    c[0] += dl * 0.035;
    c[1] += dy * 0.035;
    a.draw(svg, CITIES[cityRef.current] as [number, number], [c[0], c[1], 0], a.final);
    raf.current = Math.abs(dl) > 0.05 || Math.abs(dy) > 0.05 ? requestAnimationFrame(tick) : 0;
  };
  const kick = () => {
    if (!raf.current) raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    let disposed = false;
    import("@/components/hero/globe").then(({ drawGlobe, FINAL }) => {
      if (disposed) return;
      api.current = { draw: drawGlobe, final: FINAL };
      if (svgRef.current) {
        drawGlobe(svgRef.current, CITIES.here as [number, number], [cur.current[0], cur.current[1], 0], FINAL);
      }
      kick();
    });
    return () => {
      disposed = true;
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    cityRef.current = city;
    kick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, spinBump]);

  return <svg ref={svgRef} width={96} height={96} viewBox="0 0 64 64" aria-hidden="true" />;
}
