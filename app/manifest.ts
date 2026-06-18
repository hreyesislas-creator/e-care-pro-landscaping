import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f6f7f5",
    theme_color: "#1b5e20",
    icons: [
      { src: "/images/branding/logo-mark.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "512x512", type: "image/png" },
    ],
    categories: ["business", "landscaping", "home services"],
  };
}
