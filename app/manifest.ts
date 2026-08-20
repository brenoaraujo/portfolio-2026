import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_TITLE,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#fdfbfa",
    theme_color: "#fdfbfa",
    icons: [{ src: "/icon.png", sizes: "any", type: "image/png" }],
  };
}
