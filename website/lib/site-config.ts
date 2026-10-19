function parsedHttpUrl(value: string | undefined, label: string) {
  const candidate = value?.trim();
  if (!candidate) return "";
  let parsed: URL;
  try {
    parsed = new URL(candidate);
  } catch {
    throw new Error(`${label} must be an absolute URL.`);
  }
  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error(`${label} must use HTTP or HTTPS.`);
  }
  return parsed;
}

function normalizedOrigin(value: string | undefined, label: string) {
  const parsed = parsedHttpUrl(value, label);
  if (!parsed) return "";
  const isLocal = parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1";
  if (parsed.protocol !== "https:" && !isLocal) {
    throw new Error(`${label} must use HTTPS outside local development.`);
  }
  if (parsed.pathname !== '/' || parsed.search || parsed.hash) {
    throw new Error(`${label} must contain only the site origin.`);
  }
  return parsed.origin;
}

function normalizedHttpsUrl(value: string | undefined, label: string) {
  const parsed = parsedHttpUrl(value, label);
  if (!parsed) return "";
  if (parsed.protocol !== "https:") {
    throw new Error(`${label} must use HTTPS.`);
  }
  return parsed.toString();
}

function normalizedEmail(value: string | undefined) {
  const candidate = value?.trim() ?? "";
  if (candidate && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate)) {
    throw new Error("SUPPORT_EMAIL is not a valid email address.");
  }
  return candidate;
}

const explicitSiteUrl = normalizedOrigin(process.env.SITE_URL, "SITE_URL");
const renderSiteUrl = normalizedOrigin(
  process.env.RENDER_EXTERNAL_URL,
  "RENDER_EXTERNAL_URL",
);
const siteUrl = explicitSiteUrl || renderSiteUrl || "http://localhost:3000";
const googlePlayUrl = normalizedHttpsUrl(
  process.env.GOOGLE_PLAY_URL,
  "GOOGLE_PLAY_URL",
);

if (googlePlayUrl && new URL(googlePlayUrl).hostname !== "play.google.com") {
  throw new Error("GOOGLE_PLAY_URL must point to play.google.com.");
}

export const siteConfig = {
  name: "شجيرتي",
  englishName: "Shajirati",
  description:
    "تطبيق ذكي يساعدك على التعرّف على الأشجار والنباتات واستكشاف معلومات العناية بها.",
  shortDescription: "تعرّف على الأشجار من حولك.",
  url: siteUrl,
  officialDomain: explicitSiteUrl,
  supportEmail: normalizedEmail(process.env.SUPPORT_EMAIL),
  legalOwner: process.env.LEGAL_OWNER?.trim() || "",
  googlePlayUrl,
  appStatus:
    process.env.APP_STATUS === "published" && googlePlayUrl
      ? "published"
      : "coming-soon",
  socialLinks: [] as { label: string; href: string }[],
  policyLastUpdated: "15 أكتوبر 2026",
  appVersion: "1.1.0",
  locale: "ar_SA",
  language: "ar",
} as const;

export const mainNavigation = [
  { href: "/", label: "الرئيسية" },
  { href: "/trees/", label: "دليل الأشجار" },
  { href: "/features/", label: "المميزات" },
  { href: "/how-it-works/", label: "كيف يعمل؟" },
  { href: "/about/", label: "عن شجيرتي" },
  { href: "/support/", label: "الدعم" },
] as const;

export const footerNavigation = {
  platform: [
    { href: "/about/", label: "من نحن" },
    { href: "/trees/", label: "دليل الأشجار" },
    { href: "/features/", label: "المميزات" },
    { href: "/how-it-works/", label: "كيف يعمل؟" },
    { href: "/download/", label: "تحميل التطبيق" },
    { href: "/updates/", label: "التحديثات" },
  ],
  help: [
    { href: "/faq/", label: "الأسئلة الشائعة" },
    { href: "/support/", label: "مركز المساعدة" },
    { href: "/contact/", label: "تواصل معنا" },
    { href: "/data-deletion/", label: "حذف البيانات" },
  ],
  legal: [
    { href: "/privacy/", label: "الخصوصية" },
    { href: "/terms/", label: "الشروط والأحكام" },
    { href: "/acceptable-use/", label: "الاستخدام المقبول" },
    { href: "/cookies/", label: "ملفات الارتباط" },
    { href: "/ads-policy/", label: "سياسة الإعلانات" },
    { href: "/disclaimer/", label: "إخلاء المسؤولية" },
  ],
} as const;

export const allPublicRoutes = [
  "/",
  "/trees/",
  "/about/",
  "/features/",
  "/how-it-works/",
  "/download/",
  "/faq/",
  "/contact/",
  "/support/",
  "/privacy/",
  "/terms/",
  "/acceptable-use/",
  "/cookies/",
  "/ads-policy/",
  "/disclaimer/",
  "/data-deletion/",
  "/updates/",
] as const;
