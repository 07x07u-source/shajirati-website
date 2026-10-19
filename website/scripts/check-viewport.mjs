const pages = await fetch("http://127.0.0.1:9223/json").then((response) => response.json());
const targetPath = process.argv[2] ?? "/";
const motionMode = process.argv.includes("--motion");
const page = pages.find((entry) => entry.type === "page");
if (!page?.webSocketDebuggerUrl) throw new Error("No debuggable Chrome page found");

const socket = new WebSocket(page.webSocketDebuggerUrl);
const pending = new Map();
const issues = [];
let messageId = 0;

await new Promise((resolve, reject) => {
  socket.onopen = resolve;
  socket.onerror = reject;
});

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (message.method === "Runtime.exceptionThrown") issues.push(message.params.exceptionDetails.text);
  if (message.method === "Log.entryAdded" && ["error", "warning"].includes(message.params.entry.level)) {
    issues.push(`${message.params.entry.level}: ${message.params.entry.text}`);
  }
  if (message.method === "Network.responseReceived" && message.params.response.status >= 400) {
    issues.push(`${message.params.response.status}: ${message.params.response.url}`);
  }
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message));
  else resolve(message.result);
};

function command(method, params = {}) {
  const id = ++messageId;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
}

await command("Page.enable");
await command("Runtime.enable");
await command("Log.enable");
await command("Log.clear");
await command("Network.enable");
await command("Emulation.setDeviceMetricsOverride", {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
});
await command("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-reduced-motion", value: motionMode ? "no-preference" : "reduce" }],
});
await command("Page.navigate", { url: `http://127.0.0.1:3000${targetPath}` });
await new Promise((resolve) => setTimeout(resolve, 1800));

const result = await command("Runtime.evaluate", {
  returnByValue: true,
  expression: `(() => {
    const rect = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const box = element.getBoundingClientRect();
      return { left: box.left, right: box.right, width: box.width };
    };
    return {
      innerWidth,
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      body: rect('body'),
      header: rect('.glass-nav'),
      hero: rect('.home-focus-hero, .discovery-hero, .home-hero, .page-hero'),
      heroGrid: rect('.home-focus-hero-grid, .discovery-hero-grid, .hero-grid'),
      animations: {
        route: document.querySelector('.route-stage') ? getComputedStyle(document.querySelector('.route-stage')).animationName : null,
        scan: document.querySelector('.scan-line') ? getComputedStyle(document.querySelector('.scan-line')).animationName : null,
        marquee: document.querySelector('.nature-marquee > div') ? getComputedStyle(document.querySelector('.nature-marquee > div')).animationName : null
      }
    };
  })()`,
});

const screenshot = await command("Page.captureScreenshot", {
  format: "png",
  fromSurface: true,
  captureBeyondViewport: false,
});
await writeFile("preview-mobile-cdp.png", Buffer.from(screenshot.data, "base64"));

process.stdout.write(`${JSON.stringify({ ...result.result.value, consoleIssues: issues }, null, 2)}\n`);
socket.close();
import { writeFile } from "node:fs/promises";
