import { Shell } from "@/components/Shell";
import { Crumbs, CtaBand, FaqBlock, JsonLd } from "@/components/Bits";
import { SERVICES, site } from "@/lib/site";
import { breadcrumbSchema, faqSchema, pageMeta, physicianSchema } from "@/lib/meta";

export const metadata = pageMeta("/faq", "Neurosurgeon FAQ | Serial, Reports, Fees | Dr. Zico Dhaka",
  "Common questions about seeing a neurosurgeon in Dhaka: neurologist vs neurosurgeon, how to get a serial, what reports to bring, when it is an emergency. Bangla and English.");

export default function Faq() {
  const crumbs: [string, string][] = [["Home", "/"], ["FAQ", "/faq"]];
  return (
    <Shell active="faq">
      <JsonLd data={physicianSchema()} />
      <JsonLd data={faqSchema(site.GENERAL_FAQ)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Crumbs items={crumbs} />
      <section className="page-hero"><div className="wrap"><span className="eyebrow">FAQ</span><h1 style={{ marginTop: 12 }}>Questions About Seeing a Neurosurgeon<span className="bn-line" lang="bn">নিউরোসার্জন নিয়ে সাধারণ প্রশ্ন</span></h1><p className="lead" style={{ marginTop: 18 }}>Answers to what patients most often ask before their first visit.</p></div></section>
      <div className="wrap page-layout">
        <aside className="toc"><nav aria-label="Questions by service"><h2>Questions by service</h2><ol>{SERVICES.map((s) => <li key={s.slug}><a href={`/${s.slug}#faq`}>{s.name}</a></li>)}</ol><a className="btn btn-primary toc-cta" href="/appointment#book">Book appointment</a></nav></aside>
        <div className="content"><FaqBlock faqs={site.GENERAL_FAQ} fid="faq" heading="Common questions" showFilter /><CtaBand /></div>
      </div>
    </Shell>
  );
}
