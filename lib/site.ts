// All site content lives in content/site-data.json (doctor details, services, cases, FAQ, videos...).
// Edit that file (or later a CMS) to change text; the pages read everything from here.
import raw from "@/content/site-data.json";

export type Item = [string, number];
export type Faq = [string, string, string]; // question, answer HTML, language
export type Section = {
  id: string; h2: string; bn: string; items: Item[]; intro: string; symptoms: string[]; surgery: string[];
  how: string; bn_title: string; bn_text: string;
};
export type Service = {
  slug: string; icon: string; concern: string; name: string; bn_name: string; short: string; title: string; desc: string;
  h1: string; bn_h1: string; lead: string; emergency?: string; overview?: string; recovery?: string;
  sections: Section[]; faq: Faq[]; related: string[];
};
export type CaseRow = [string, string, string, string, string, string]; // id, category, title, bangla, link, note
export type Photo = { file: string; width: number; height: number; alt: string; title?: string; source?: string };
export type ServiceCase = {
  section: string; title: string; bn: string; cover: [string, string]; text: string;
  photos: [string, number, number, string][];
};
export type Gallery = { count?: number; h2: string; bn: string; intro: string; alt?: string; photos?: string };

type SiteData = {
  SITE_URL: string; VERSION: string;
  DOC: Record<string, string>;
  SERVICES: Service[];
  ALL_TOTAL: number; SPINE_TOTAL: number; BRAIN_TOTAL: number;
  SAMPLES: Record<string, string>; REAL_REMOTE: Record<string, string>;
  GENERAL_FAQ: Faq[]; CASES: CaseRow[]; CAT_LABEL: Record<string, string>;
  YT_API_KEY: string; YT_CHANNEL_ID: string; YT_MAX: number; VIDEOS: [string, string, string][];
  FB_FEED_URL: string; SERVICE_GALLERIES: Record<string, Gallery>;
  SEC_ALT: Record<string, string>; REAL_ONLY_SERVICES: string[]; LAST_REVIEWED: string;
  CASE_PROCEDURES: Record<string, object[]>; HERO_ALT: Record<string, string>;
  SERVICE_CASES: Record<string, ServiceCase[]>; UPCOMING: string[];
  HAPPY_PATIENTS: Photo[]; OPERATING_THEATRE: Photo[]; BRING: string;
};

export const site = raw as unknown as SiteData;
export const SITE_URL = site.SITE_URL;
export const DOC = site.DOC;
export const SERVICES = site.SERVICES;
export const SV: Record<string, Service> = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));

export const fmt = (n: number) => n.toLocaleString("en-US");
export const total = (s: Service) => s.sections.reduce((a, sec) => a + sec.items.reduce((b, [, n]) => b + n, 0), 0);
export const secTotal = (sec: Section) => sec.items.reduce((b, [, n]) => b + n, 0);

/** Internal page address without ".html": "about.html#x" -> "/about#x", "index.html" -> "/" */
export function url(href: string): string {
  if (/^(https?:|tel:|mailto:|#)/.test(href)) return href;
  const m = href.match(/^([^?#]*)(.*)$/)!;
  let p = m[1].replace(/\.html$/, "");
  if (p === "index" || p === "") p = "";
  return "/" + p + m[2];
}

/** Rewrites .html links inside stored HTML text (service content, FAQ answers). */
export const cleanHtml = (h: string) =>
  h.replace(/href="([a-z0-9-]+)\.html(?=["?#])/g, (_m, n) => (n === "index" ? 'href="/' : `href="/${n}`));

export const svcImg = (slug: string, name: string) => `services/${slug}/${slug}-${name}`;
export const BA_DIR = "before-after";
export const caseKey = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const shortH2 = (h2: string) => h2.split(":")[0].split("(")[0].trim();
export const stripTags = (h: string) => h.replace(/<[^>]+>/g, "");
