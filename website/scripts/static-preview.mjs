import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

const root = resolve("out");
const host = process.env.HOST?.trim() || "127.0.0.1";
const port = Number.parseInt(process.env.PORT || "3000", 10);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535.");
}
const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".ttf", "font/ttf"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"],
]);

async function resolveFile(pathname) {
  const cleanPath = decodeURIComponent(pathname).replace(/^\/+/, "");
  const candidates = cleanPath.endsWith("/")
    ? [`${cleanPath}index.html`]
    : [cleanPath, `${cleanPath}/index.html`];
  const pagePayload = cleanPath.match(/^(.*\/)?(__next\.[^/]+)\.__PAGE__\.txt$/);
  if (pagePayload) candidates.push(`${pagePayload[1] ?? ""}${pagePayload[2]}/__PAGE__.txt`);

  for (const candidate of candidates) {
    const absolute = resolve(root, candidate || "index.html");
    if (absolute !== root && !absolute.startsWith(`${root}${sep}`)) continue;
    try {
      if ((await stat(absolute)).isFile()) return absolute;
    } catch {
      // Continue to the next static-export candidate.
    }
  }
  return resolve(root, "404", "index.html");
}

createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", `http://${host}:${port}`);
    const file = await resolveFile(url.pathname);
    const body = await readFile(file);
    const isNotFound = file.endsWith(`${sep}404${sep}index.html`);
    response.writeHead(isNotFound ? 404 : 200, {
      "Cache-Control": "no-cache",
      "Content-Type": contentTypes.get(extname(file)) ?? "application/octet-stream",
    });
    response.end(body);
  } catch {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Preview server error");
  }
}).listen(port, host, () => {
  process.stdout.write(`Static preview ready at http://${host}:${port}/\n`);
});
