import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(process.cwd(), "out");
const requiredRoutes = [
  "/", "/trees/", "/about/", "/features/", "/how-it-works/", "/download/", "/faq/",
  "/contact/", "/support/", "/privacy/", "/terms/", "/acceptable-use/",
  "/cookies/", "/ads-policy/", "/disclaimer/", "/data-deletion/", "/updates/", "/404/",
];
const treeSource = readFileSync(resolve(process.cwd(), "lib", "trees.ts"), "utf8");
const treeRoutes = [...treeSource.matchAll(/slug: "([a-z0-9-]+)"/g)].map((match) => `/trees/${match[1]}/`);
const routesToValidate = [...requiredRoutes, ...treeRoutes];

const failures = [];
const htmlFiles = [];

function routeFile(route) {
  return route === "/" ? join(root, "index.html") : join(root, route.slice(1), "index.html");
}

function walk(directory) {
  for (const name of readdirSync(directory)) {
    const file = join(directory, name);
    if (statSync(file).isDirectory()) walk(file);
    else if (name.endsWith(".html")) htmlFiles.push(file);
  }
}

if (!existsSync(root)) {
  console.error("Missing out/. Run npm run build first.");
  process.exit(1);
}

for (const route of routesToValidate) {
  if (!existsSync(routeFile(route))) failures.push(`Missing route output: ${route}`);
}

for (const file of ["robots.txt", "sitemap.xml", "manifest.webmanifest", "404.html"]) {
  if (!existsSync(join(root, file))) failures.push(`Missing root file: ${file}`);
}

walk(root);
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  if (!/<html[^>]+lang="ar"[^>]+dir="rtl"/.test(html)) failures.push(`Missing Arabic RTL root: ${file}`);
  if (!/<title>[^<]+<\/title>/.test(html)) failures.push(`Missing title: ${file}`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) failures.push(`Missing description: ${file}`);
  if (!/<link rel="canonical" href="[^"]+"/.test(html)) failures.push(`Missing canonical: ${file}`);
  if (!/<meta property="og:title" content="[^"]+"/.test(html)) failures.push(`Missing Open Graph title: ${file}`);
  if (!/<meta name="twitter:card" content="[^"]+"/.test(html)) failures.push(`Missing Twitter card: ${file}`);
  if (/lorem ipsum|href="#"|TODO/i.test(html)) failures.push(`Visible placeholder content: ${file}`);

  if ((process.env.RENDER === "true" || process.env.REQUIRE_PRODUCTION_URL === "1") && /https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(html)) {
    failures.push(`Production output contains a local URL: ${file}`);
  }

  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const clean = href.split(/[?#]/)[0];
    if (!clean || clean.startsWith("/_next/")) continue;
    const candidate = clean.endsWith("/")
      ? routeFile(clean)
      : join(root, clean.slice(1));
    if (!existsSync(candidate)) failures.push(`Broken local link ${href} in ${file}`);
  }
}

const appAdsPath = join(root, "app-ads.txt");
if (existsSync(appAdsPath)) {
  const appAds = readFileSync(appAdsPath, "utf8");
  if (/ca-app-pub-\d+[~/]\d+/.test(appAds)) failures.push("app-ads.txt contains an App ID or ad unit ID placeholder.");
  const authorizationLines = appAds
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
  if (!authorizationLines.length) failures.push("app-ads.txt is published without an authorization record.");
  if (authorizationLines.some((line) => line.split(",").length < 3)) {
    failures.push("app-ads.txt contains an invalid authorization record.");
  }
}

const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
for (const route of routesToValidate.filter((route) => route !== "/404/")) {
  if (!sitemap.includes(route === "/" ? "<loc>" : route)) failures.push(`Sitemap missing: ${route}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Validated ${routesToValidate.length} routes (${treeRoutes.length} tree profiles), ${htmlFiles.length} HTML files, SEO metadata, links, and optional app-ads.txt.`);
