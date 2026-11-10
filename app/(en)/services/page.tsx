import { Shell } from "@/components/Shell";
import { Icon } from "@/components/Icon";
import { Crumbs, CtaBand, JsonLd, SvcCard } from "@/components/Bits";
import { SERVICES, fmt, secTotal, total } from "@/lib/site";
import { breadcrumbSchema, pageMeta, physicianSchema } from "@/lib/meta";

export const metadata = pageMeta("/services", "Neurosurgery Services in Dhaka | Brain & Spine Surgery | Dr. Zico",
  "All neurosurgery services by Dr. Md. Isma Azam (Zico) in Dhaka: PLID, spine surgery, brain tumor, hydrocephalus, aneurysm, spinal tumor, spinal TB, head injury, trigeminal neuralgia.");

export default function Services() {
  const crumbs: [string, string][] = [["Home", "/"], ["Services", "/services"]];
  return (
    <Shell active="services">
      <JsonLd data={physicianSchema()} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Crumbs items={crumbs} />
      <section className="page-hero"><div className="wrap split">
        <div><span className="eyebrow">Services</span><h1 style={{ marginTop: 12 }}>Neurosurgery Services in Dhaka<span className="bn-line" lang="bn">নিউরোসার্জারি: মস্তিষ্ক ও মেরুদণ্ডের চিকিৎসা</span></h1><p className="lead" style={{ marginTop: 18 }}>Every condition Dr. Zico treats, grouped into nine services, with his operation count for each.</p></div>
        <div className="finder" data-finder data-limit="8" id="finder"><label htmlFor="finder-svc">Search conditions and symptoms</label><div className="finder-input"><Icon name="search" /><input id="finder-svc" type="search" autoComplete="off" placeholder="e.g. সায়াটিকা, meningioma, spine fracture" /></div>
          <div className="chips"><button type="button" data-q="জলমাথা">জলমাথা</button><button type="button" data-q="sciatica">Sciatica</button><button type="button" data-q="stroke">Stroke</button><button type="button" data-q="যক্ষ্মা">মেরুদণ্ডের যক্ষ্মা</button></div>
          <ul className="finder-results" aria-live="polite"></ul><p className="finder-empty" hidden>No match yet. Try another word or browse the list below.</p></div>
      </div></section>
      <section className="section"><div className="wrap"><div className="grid grid-3">{SERVICES.map((s) => <SvcCard key={s.slug} s={s} />)}</div></div></section>
      <section className="section section--tint"><div className="wrap"><div className="section-head"><span className="eyebrow">All conditions</span><h2>Every condition, with case numbers</h2></div><div className="grid grid-3">
        {SERVICES.map((s) => (
          <div className="box" key={s.slug}><h3><a href={`/${s.slug}`}>{s.name}</a> <span className="num muted small">{fmt(total(s))}</span></h3><ul>
            {s.sections.map((sec) => <li key={sec.id}><a href={`/${s.slug}#${sec.id}`}>{sec.h2}</a> <span className="num muted">{fmt(secTotal(sec))}</span></li>)}
          </ul></div>
        ))}
      </div></div></section>
      <section className="cta-full"><div className="wrap"><CtaBand /></div></section>
    </Shell>
  );
}
