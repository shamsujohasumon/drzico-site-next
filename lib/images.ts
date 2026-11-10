// Picks the optimized WebP copies made by scripts/prepare.mjs (see content/image-manifest.json).
import fs from "node:fs";
import path from "node:path";
import manifest from "@/content/image-manifest.json";
import { site } from "@/lib/site";

type Entry = { w: number; h: number; hash: string; variants: [string, number][] };
const M = manifest as unknown as Record<string, Entry>;
const IMG_DIR = path.join(process.cwd(), "public", "assets", "img");

export const A = (p: string) => `/assets/img/${p}`;
export const hasImage = (file: string) => fs.existsSync(path.join(IMG_DIR, file));

export type ImgAttrs = { src: string; srcSet?: string; sizes?: string; "data-full"?: string };

/** src / srcset / sizes / data-full for a photo; falls back to the original file. */
export function imgAttrs(file: string, sizes: string, largest = 1600): ImgAttrs {
  const v = M[file]?.variants;
  if (!v || !v.length) return { src: A(file) };
  const usable = v.filter(([, w]) => w <= largest);
  const use = usable.length ? usable : v.slice(0, 1);
  const src = use.length === 1 ? use[use.length - 1][0] : (use.find(([, w]) => w >= 960)?.[0] ?? use[use.length - 1][0]);
  return {
    src: A(src),
    srcSet: v.map(([n, w]) => `${A(n)} ${w}w`).join(", "),
    sizes,
    "data-full": A(v[v.length - 1][0]),
  };
}

/** Largest optimized copy (used in schema and the image sitemap). */
export const largest = (file: string) => { const v = M[file]?.variants; return v && v.length ? v[v.length - 1][0] : file; };

/** Remote sample photo shown while a real photo is still missing (draft only). */
export function sampleFor(file: string, w: number): string {
  const name = file.split("/").pop()!;
  if (site.REAL_REMOTE[name]) return site.REAL_REMOTE[name];
  const base = site.SAMPLES[name];
  return base ? `${base}?auto=format&fit=crop&w=${Math.min(w, 1800)}&q=70` : "";
}
export const isRealRemote = (file: string) => Boolean(site.REAL_REMOTE[file.split("/").pop()!]);

export const SZ_HALF = "(max-width: 760px) 100vw, 45vw";
export const SZ_CARD = "(max-width: 560px) 86vw, (max-width: 1000px) 45vw, 300px";
