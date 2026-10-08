/**
 * Orthographic line-globe renderer for the hero coordinate reveal. Lazy-loaded
 * (dynamic import) so d3-geo + the land JSON never touch the hero's first paint.
 * No fills; lines use the ink token, the pin uses the accent token.
 */
import { geoOrthographic, geoPath, geoGraticule, geoDistance } from "d3-geo";
import landData from "./land-110m.json";

const NS = "http://www.w3.org/2000/svg";
export const SIZE = 64;
const R = 29.5;
const C = 32;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LAND = landData as any;
const GRATICULE = geoGraticule().step([30, 30])();
// Sphere outline as a circle path, starting at the top, going clockwise.
const CIRCLE = `M${C} ${C - R}A${R} ${R} 0 1 1 ${C} ${C + R}A${R} ${R} 0 1 1 ${C} ${C - R}`;

export type Frame = { outline: number; body: number; pin: number };
export const FINAL: Frame = { outline: 1, body: 1, pin: 1 };

function el(
  tag: string,
  attrs: Record<string, string | number>,
  parent: Element,
) {
  const node = document.createElementNS(NS, tag);
  for (const k in attrs) node.setAttribute(k, String(attrs[k]));
  parent.appendChild(node);
  return node;
}

/** Redraw the whole globe for one frame of the reveal. */
export function drawGlobe(
  svg: SVGSVGElement,
  lonlat: [number, number],
  rot: [number, number, number],
  f: Frame,
) {
  svg.replaceChildren();
  const proj = geoOrthographic()
    .scale(R)
    .translate([C, C])
    .clipAngle(90)
    .rotate(rot)
    .precision(0.2);
  const path = geoPath(proj);

  const g = el("g", { opacity: f.body }, svg);
  el(
    "path",
    {
      d: path(GRATICULE) ?? "",
      fill: "none",
      stroke: "var(--text-primary)",
      "stroke-width": 0.5,
      "stroke-opacity": 0.35,
    },
    g,
  );
  el(
    "path",
    {
      d: path(LAND) ?? "",
      fill: "none",
      stroke: "var(--text-primary)",
      "stroke-width": 0.9,
      "stroke-linejoin": "round",
    },
    g,
  );
  el(
    "path",
    {
      d: CIRCLE,
      fill: "none",
      stroke: "var(--text-primary)",
      "stroke-width": 1.25,
      pathLength: 1,
      "stroke-dasharray": "1 1",
      "stroke-dashoffset": 1 - f.outline,
    },
    svg,
  );

  // Pin — hidden when it is on the far side of the globe.
  if (f.pin > 0 && geoDistance(lonlat, proj.invert!([C, C])!) < Math.PI / 2 - 0.02) {
    const [x, y] = proj(lonlat)!;
    el("circle", { cx: x, cy: y, r: 2.6 * f.pin, fill: "var(--accent-brand)" }, svg);
  }
}
