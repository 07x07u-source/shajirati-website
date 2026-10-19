import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MotionOrchestrator } from "@/components/motion-orchestrator";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const plexArabic = localFont({
  src: [
    { path: "./fonts/IBMPlexSansArabic-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/IBMPlexSansArabic-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/IBMPlexSansArabic-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/IBMPlexSansArabic-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-plex-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "شجيرتي — تعرّف على الأشجار من حولك", template: "%s | شجيرتي" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: "technology",
  keywords: [
    "التعرف على الأشجار",
    "معرفة اسم الشجرة من الصورة",
    "أشجار السعودية",
    "أشجار الخليج",
    "أنواع النخيل",
    "الأشجار الصحراوية",
    "تطبيق شجيرتي",
    "العناية بالأشجار",
    "النباتات في السعودية",
  ],
  icons: { icon: "/brand/app-icon.png", apple: "/brand/app-icon.png" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: "شجيرتي — تعرّف على الأشجار من حولك",
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: "/brand/app-icon.png", width: 1024, height: 1024, alt: "شعار شجيرتي" }],
  },
  twitter: {
    card: "summary",
    title: "شجيرتي — تعرّف على الأشجار من حولك",
    description: siteConfig.description,
    images: ["/brand/app-icon.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f0e5" },
    { media: "(prefers-color-scheme: dark)", color: "#183328" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: siteConfig.name,
        alternateName: siteConfig.englishName,
        url: siteConfig.url,
        inLanguage: "ar",
        description: siteConfig.description,
      },
      {
        "@type": "SoftwareApplication",
        name: siteConfig.name,
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Android",
        softwareVersion: siteConfig.appVersion,
        description: siteConfig.description,
        url: `${siteConfig.url}/download/`,
      },
    ],
  };

  return (
    <html lang="ar" dir="rtl" className={plexArabic.variable}>
      <body className="premium-site">
        <a className="skip-link" href="#main-content">انتقل إلى المحتوى</a>
        <MotionOrchestrator />
        <Header />
        <div id="main-content">{children}</div>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
