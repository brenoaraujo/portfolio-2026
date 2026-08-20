import { ImageResponse } from "next/og";
import { SITE_TITLE } from "@/lib/config";

export const alt = SITE_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// On-brand share card: warm paper ground, near-black type, one hairline.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "rgb(253,251,250)",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 32, color: "rgb(102,102,102)" }}>
          Portfolio
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: "1040px", height: "1px", background: "rgb(212,212,212)", marginBottom: "40px" }} />
          <div style={{ display: "flex", fontSize: 104, color: "rgb(0,0,0)", letterSpacing: "-0.04em" }}>
            Breno Araujo.
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "rgb(102,102,102)", marginTop: "16px" }}>
            Product designer &amp; design engineer — Vancouver
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
