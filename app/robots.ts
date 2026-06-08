import type { MetadataRoute } from "next";
import { brand } from "@/lib/data/brand";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = brand.siteUrl;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
