// Small shared building blocks used across pages.
import type { ReactNode } from "react";
import { Icon } from "@/components/Icon";
import { DOC, fmt, total, url, cleanHtml, type Faq, type Service } from "@/lib/site";

/** Text that still needs the doctor's confirmation (yellow highlight in draft mode). */
export function V({ note, children }: { note: string; children: ReactNode }) {
  return <span className="verify" tabIndex={0} data-note={note}>{children}</span>;
}

/** Trusted HTML from content/site-data.json (written by the site team, not by visitors). */
export function Html({ html, as: Tag = "div", ...rest }: { html: string; as?: "div" | "p" | "span" | "li" | "h2"; [k: string]: unknown }) {
  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: cleanHtml(html) }} />;
}

export function Crumbs({ items }: { items: [string, string][] }) {
  return (
    <nav className="crumbs wrap" aria-label="Breadcrumb"><ol>
      {items.map(([n, u], i) => i < items.length - 1
        ? <li key={i}><a href={url(u)}>{n}</a></li>
        : <li key={i} aria-current="page">{n}</li>)}
    </ol></nav>
  );
}

export function FaqBlock({ faqs, fid = "faq", heading = "Questions patients ask", showFilter = false }:
  { faqs: Faq[]; fid?: string; heading?: string; showFilter?: boolean }) {
  return (
    <section className="block" id={fid}>
      <div className="block-head"><div><h2>{heading}</h2><span className="bn-sub" lang="bn">সাধারণ প্রশ্ন ও উত্তর</span></div></div>
      {showFilter ? (
        <div className="faq-tools"><label className="sr-only" htmlFor="faq-q">Search questions</label>
          <input id="faq-q" type="search" placeholder="Search questions, e.g. serial, PLID, খরচ" data-faq-filter={`${fid}-list`} aria-describedby="faq-count" />
          <span id="faq-count" className="small muted" aria-live="polite"></span></div>
      ) : null}
      <div className="faq" id={`${fid}-list`}>
        {faqs.map(([q, a, lang], i) => (
          <details key={i}><summary {...(lang === "bn" ? { lang: "bn" } : {})}>{q}</summary><Html className="ans" html={a} /></details>
        ))}
      </div>
    </section>
  );
}

export function CtaBand({ concern }: { concern?: string }) {
  const href = "/appointment" + (concern ? `?concern=${concern}` : "") + "#book";
  return (
    <div className="cta-band"><div><h2>Talk to Dr. Zico about your scans</h2><p>Bring your MRI or CT films and reports. He will explain what they show and whether you need surgery.</p><p lang="bn">অ্যাপয়েন্টমেন্টের জন্য কল করুন: {DOC.pa}</p></div>
      <div className="btn-row"><a className="btn btn-primary" href={href}><Icon name="calendar" /> Book appointment</a><a className="btn btn-ghost" href={`tel:${DOC.pa_intl}`}><Icon name="phone" /> {DOC.pa}</a></div></div>
  );
}

export function SvcCard({ s }: { s: Service }) {
  return (
    <a className="svc-card" href={`/${s.slug}`}><div className="top"><span className="ic"><Icon name={s.icon} /></span><span className="n">n = {fmt(total(s))}</span></div>
      <h3>{s.name}</h3><span className="bn" lang="bn">{s.bn_name}</span><p>{s.short}</p><span className="more">Learn more <Icon name="arrow" /></span></a>
  );
}

export function BringList() {
  return <ul><li>All MRI and CT films and their reports, oldest to newest</li><li>Previous prescriptions and discharge papers</li><li>A list of the medicines you take, including blood thinners</li><li>Blood test reports (sugar, creatinine) if you have them</li><li>A family member who knows your history</li></ul>;
}

/** schema.org data for Google and AI search. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
