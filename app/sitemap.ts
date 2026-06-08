import type { MetadataRoute } from "next";
import { brand } from "@/lib/data/brand";
import { getAllCollectionSlugs } from "@/lib/data/collections";

const siteUrl = brand.siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/reservar`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const collectionRoutes: MetadataRoute.Sitemap = getAllCollectionSlugs().map(
    (slug) => ({
      url: `${siteUrl}/colecciones/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }),
  );

  return [...staticRoutes, ...collectionRoutes];
}
