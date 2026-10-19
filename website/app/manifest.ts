import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "شجيرتي — الموقع الرسمي",
    short_name: "شجيرتي",
    description: "الموقع الرسمي لتطبيق شجيرتي للتعرف على الأشجار والنباتات.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F0E5",
    theme_color: "#234B35",
    lang: "ar",
    dir: "rtl",
    icons: [{ src: "/brand/app-icon.png", sizes: "1024x1024", type: "image/png" }],
  };
}
