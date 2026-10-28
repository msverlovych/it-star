import type { MetadataRoute } from "next";
import { getPaths, getResources } from "@/data/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  const staticRoutes = ["", "/resources", "/paths", "/about"].map((path) => ({
    url: `${base}${path || "/"}`,
  }));

  const resourceRoutes = getResources().map((resource) => ({
    url: `${base}/resources/${resource.slug}`,
  }));

  const pathRoutes = getPaths().map((path) => ({
    url: `${base}/paths/${path.slug}`,
  }));

  return [...staticRoutes, ...pathRoutes, ...resourceRoutes];
}
