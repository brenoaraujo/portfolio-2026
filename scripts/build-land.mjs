/**
 * Precompute the globe's land outline for the hero coordinate reveal.
 *
 *   world-atlas land-110m  →  topojson feature  →  drop tiny islands
 *   (d3.geoArea < 0.0007 sr, which keeps Vancouver Island)  →  round
 *   coordinates to 0.1°  →  static MultiPolygon JSON (~55KB).
 *
 * Run: node scripts/build-land.mjs  (output committed; not run at build time).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { feature } from "topojson-client";
import { geoArea } from "d3-geo";

const here = dirname(fileURLToPath(import.meta.url));
const topo = JSON.parse(
  readFileSync(resolve(here, "../node_modules/world-atlas/land-110m.json"), "utf8"),
);

const fc = feature(topo, topo.objects.land); // FeatureCollection
const land = fc.features[0].geometry; // MultiPolygon
const MIN_AREA = 0.0007; // steradians — keeps Vancouver Island, drops smaller isles
const round = (n) => Math.round(n * 10) / 10;

const polygons = land.coordinates.filter(
  (poly) => geoArea({ type: "Polygon", coordinates: poly }) >= MIN_AREA,
);

const coordinates = polygons.map((poly) =>
  poly.map((ring) => ring.map(([x, y]) => [round(x), round(y)])),
);

const out = { type: "MultiPolygon", coordinates };
const dest = resolve(here, "../components/hero/land-110m.json");
writeFileSync(dest, JSON.stringify(out));

const kb = (Buffer.byteLength(JSON.stringify(out)) / 1024).toFixed(1);
console.log(
  `land-110m.json: ${polygons.length}/${land.coordinates.length} polygons kept, ${kb}KB → ${dest}`,
);
