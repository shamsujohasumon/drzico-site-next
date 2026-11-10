// Page shown for any address that does not exist (served as 404.html by .htaccess).
import type { Metadata } from "next";
import { Document } from "@/components/Document";
import { Shell } from "@/components/Shell";
import { Icon } from "@/components/Icon";
import { DOC } from "@/lib/site";
export { rootViewport as viewport } from "@/lib/layoutMeta";
import { rootMetadata } from "@/lib/layoutMeta";

export const metadata: Metadata = { ...rootMetadata, title: "Page not found | Dr. Zico Neurosurgeon", robots: { index: false, follow: true } };

export default function GlobalNotFound() {
  return (
    <Document lang="en">
      <Shell active="">
        <section className="page-hero"><div className="wrap">
          <span className="eyebrow">Error 404</span><h1 style={{ marginTop: 12 }}>This page could not be found<span className="bn-line" lang="bn">পেজটি পাওয়া যায়নি</span></h1>
          <p className="lead" style={{ marginTop: 18 }}>The address may have changed. Use the menu above, or go to one of these pages.</p>
          <div className="btn-row" style={{ marginTop: 24 }}><a className="btn btn-primary" href="/">Home</a><a className="btn btn-ghost" href="/services">Services</a><a className="btn btn-ghost" href="/appointment#book"><Icon name="calendar" /> Book appointment</a><a className="btn btn-ghost" href={`tel:${DOC.pa_intl}`}><Icon name="phone" /> {DOC.pa}</a></div>
        </div></section>
      </Shell>
    </Document>
  );
}
