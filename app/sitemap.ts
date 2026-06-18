import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { services, cities } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const cityPages: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${SITE_URL}/service-areas/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: c.isCounty ? 0.9 : 0.8,
  }));

  return [...home, ...servicePages, ...cityPages];
}
