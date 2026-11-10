// After `next build`: checks the pages, writes the sitemap, and writes out/.htaccess with a strict
// Content-Security-Policy that allows only this site's own scripts (each inline script by its hash).
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "out");
const site = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "site-data.json"), "utf8"));
const SITE = site.SITE_URL;

// 0) remove Next.js client-navigation data (folders like out/about/ and *.txt files). The site uses
// normal links, so they are never needed, and a folder named like a page would break /about on Apache.
for (const e of fs.readdirSync(OUT, { withFileTypes: true })) {
  const p = path.join(OUT, e.name);
  if (e.isDirectory() && !["_next", "assets"].includes(e.name)) fs.rmSync(p, { recursive: true });
  else if (e.isFile() && e.name.endsWith(".txt") && e.name !== "robots.txt") fs.rmSync(p);
  else if (e.isFile() && e.name === "_not-found.html") fs.rmSync(p);
}

// The pages need no React in the browser: every interactive part (menu, carousels, finder, form,
// videos) is plain JavaScript in public/assets/js. So the Next.js browser runtime and its page data
// are removed from the HTML. Pages become about 2.5x smaller and no framework JS is downloaded.
// Set to false only if you add React components that must run in the browser.
const STRIP_RUNTIME = true;

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const htmlFiles = walk(OUT).filter((f) => f.endsWith(".html"));

if (STRIP_RUNTIME) {
  for (const f of walk(OUT).filter((f) => f.endsWith(".html"))) {
    let h = fs.readFileSync(f, "utf8");
    h = h.replace(/<script[^>]*\bsrc="\/_next\/[^"]*"[^>]*><\/script>/g, "")
      .replace(/<link[^>]*\bhref="\/_next\/[^"]*"[^>]*\/?>/g, "")
      .replace(/<script(?:\s+id="_R_")?>(?:self\.__next_f|\(self\.__next_f|requestAnimationFrame|\$RC|\$RS)[\s\S]*?<\/script>/g, "")
      .replace(/<script id="_R_">[\s\S]*?<\/script>/g, "")
      .replace(/<!--(?:\s|\$\??|\/\$|&)*-->/g, "")
      .replace(/<div hidden=""><\/div>/g, "");
    // the same preload written twice: keep the first
    const seen = new Set();
    h = h.replace(/<link rel="preload"[^>]*>/g, (tag) => {
      const key = (tag.match(/\bhref="([^"]*)"/) || tag.match(/imageSrcSet="([^"]*)"/i) || [tag])[1] || tag;
      if (seen.has(key)) return "";
      seen.add(key); return tag;
    });
    // Next.js writes the home page address without its final "/"; keep it as https://domain/
    h = h.replace(new RegExp(`(rel="canonical" href="|property="og:url" content=")${SITE.replace(/[.]/g, "\\.")}"`, "g"), `$1${SITE}/"`);
    if (/\/_next\/|__next_f/.test(h)) { console.error(`Next.js runtime still referenced in ${path.relative(OUT, f)}`); process.exit(1); }
    fs.writeFileSync(f, h);
  }
  fs.rmSync(path.join(OUT, "_next"), { recursive: true, force: true });
}

// 1) checks: no em dash anywhere, no page without a title
const problems = [];
for (const f of htmlFiles) {
  const h = fs.readFileSync(f, "utf8");
  if (h.includes("\u2014")) problems.push(`em dash in ${path.relative(OUT, f)}`);
  if (!/<title>[^<]+<\/title>/.test(h)) problems.push(`no <title> in ${path.relative(OUT, f)}`);
}
if (problems.length) { console.error(problems.join("\n")); process.exit(1); }

// 2) hashes of every inline <script> (Next.js page data, theme/image script, JSON-LD is data and needs none)
const hashes = new Set();
for (const f of htmlFiles) {
  const h = fs.readFileSync(f, "utf8");
  for (const m of h.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/type="application\/ld\+json"/.test(m[1])) continue;
    if (!m[2]) continue;
    hashes.add("'sha256-" + crypto.createHash("sha256").update(m[2], "utf8").digest("base64") + "'");
  }
}

const csp = [
  "default-src 'self'",
  `script-src 'self' ${[...hashes].sort().join(" ")}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://images.unsplash.com https://i.ytimg.com https://*.fbcdn.net https://uhlbd.com https://old.populardiagnostic.com",
  "font-src 'self'",
  "connect-src 'self' https://www.googleapis.com" + (site.FB_FEED_URL ? " " + new URL(site.FB_FEED_URL).origin : ""),
  "frame-src https://www.youtube-nocookie.com https://www.youtube.com",
  "media-src 'self'",
  "manifest-src 'self'",
  "worker-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const tpl = fs.readFileSync(path.join(ROOT, "config", "htaccess.template"), "utf8");
fs.writeFileSync(path.join(OUT, ".htaccess"), tpl.replace("__CSP__", csp));
// Files in /_next/static/ (only present when STRIP_RUNTIME is false) have a content hash in their
// names, so browsers may keep them for a year.
const nextStatic = path.join(OUT, "_next", "static");
if (fs.existsSync(nextStatic)) fs.writeFileSync(path.join(nextStatic, ".htaccess"),
  '<IfModule mod_headers.c>\n  Header set Cache-Control "public, max-age=31536000, immutable"\n</IfModule>\n');

// 3) sitemap with the real photos each page shows
const order = ["index", "services", "about", "appointment", "gallery", "faq", "blog", "blog-komor-byatha-kon-doctor", ...site.SERVICES.map((s) => s.slug)];
const imgDir = path.join(OUT, "assets", "img");
const unesc = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const urls = order.map((n) => {
  const h = fs.readFileSync(path.join(OUT, n + ".html"), "utf8");
  const seen = [];
  for (const m of h.matchAll(/<img [^>]*?(?:data-full|src)="\/assets\/img\/([^"]+)"[^>]*>/g)) {
    let f = m[1];
    const full = m[0].match(/data-full="\/assets\/img\/([^"]+)"/);
    if (full) f = full[1];
    f = unesc(f);
    if (f.includes("logo") || f.endsWith(".svg") || !fs.existsSync(path.join(imgDir, f))) continue;
    if (!seen.includes(f)) seen.push(f);
  }
  const imgs = seen.slice(0, 1000).map((f) => `<image:image><image:loc>${SITE}/assets/img/${f}</image:loc></image:image>`).join("");
  return `<url><loc>${SITE}/${n === "index" ? "" : n}</loc><lastmod>${site.LAST_REVIEWED}</lastmod>${imgs}</url>`;
}).join("");
fs.writeFileSync(path.join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urls}</urlset>\n`);

console.log(`postbuild: ${htmlFiles.length} pages checked, ${hashes.size} inline script hashes, sitemap + .htaccess written`);
