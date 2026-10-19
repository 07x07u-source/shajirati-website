import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const canonical = new URL(path, siteConfig.url).toString();
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      images: [
        {
          url: "/brand/app-icon.png",
          width: 1024,
          height: 1024,
          alt: "شعار شجيرتي",
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["/brand/app-icon.png"],
    },
  };
}
