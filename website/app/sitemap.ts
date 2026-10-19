import type { MetadataRoute } from "next";
import { allPublicRoutes, siteConfig } from "@/lib/site-config";
import { trees } from "@/lib/trees";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-18T00:00:00+03:00");
  const routes = [...allPublicRoutes, ...trees.map((tree) => `/trees/${tree.slug}/` as const)];
  return routes.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    lastModified,
    changeFrequency: path === "/" || path === "/trees/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/trees/" ? 0.95 : path.startsWith("/trees/") ? 0.85 : path.includes("privacy") || path.includes("terms") ? 0.7 : 0.8,
  }));
}
