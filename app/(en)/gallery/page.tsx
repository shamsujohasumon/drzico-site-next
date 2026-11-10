import { Shell } from "@/components/Shell";
import { Crumbs, CtaBand, JsonLd } from "@/components/Bits";
import { BaCard, HappyPatientCarousel, Lightbox, OtPhotos } from "@/components/Sections";
import { site } from "@/lib/site";
import { breadcrumbSchema, pageMeta, physicianSchema } from "@/lib/meta";

export const metadata = pageMeta("/gallery", "Patient Gallery: Before and After Surgery | Dr. Zico Neurosurgeon",
  "Before and after scans and photos from brain and spine operations by Dr. Md. Isma Azam (Zico), neurosurgeon in Dhaka, shared with patient consent.");

const CHIPS: [string, string][] = [["all", "All"], ["spine", "Spine"], ["brain", "Brain"]];

export default function Gallery() {
  const crumbs: [string, string][] = [["Home", "/"], ["Patient gallery", "/gallery"]];
  return (
    <Shell active="gallery">
      <JsonLd data={physicianSchema()} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Crumbs items={crumbs} />
      <section className="page-hero"><div className="wrap"><span className="eyebrow">Patient gallery</span><h1 style={{ marginTop: 12 }}>Before and After: Patient Gallery<span className="bn-line" lang="bn">রোগীদের অপারেশনের আগে ও পরে</span></h1>
        <p className="lead" style={{ marginTop: 18 }}>Scans and photos from Dr. Zico&apos;s operations, shared with patients&apos; written consent and with names removed. Drag the handle on each image to compare before and after.</p></div></section>
      <section className="section" id="cases"><div className="wrap">
        <div className="filter-bar" role="group" aria-label="Filter cases">{CHIPS.map(([k, l]) => <button key={k} type="button" data-filter={k} aria-pressed={k === "all" ? "true" : "false"}>{l}</button>)}<span className="small muted" id="filter-count" aria-live="polite"></span></div>
        <div className="ba-grid" data-filter-scope>{site.CASES.map((c) => <BaCard key={c[0]} c={c} />)}</div>
        <p className="notice" style={{ marginTop: 24 }}>Results differ from patient to patient. These images show individual cases and are not a promise of the same result.</p>
      </div></section>
      <section className="section" id="patients"><div className="wrap">
        <div className="section-head"><span className="eyebrow">Our patients</span><h2>Back to everyday life</h2><p className="muted">Patients and families with Dr. Zico. Tap any photo to see the full image.</p><p className="small bn" lang="bn">আমাদের রোগীদের ছবি: বড় করে দেখতে ছবিতে চাপ দিন।</p></div>
        <HappyPatientCarousel />
      </div></section>
      <section className="section section--tint" id="photos"><div className="wrap">
        <div className="section-head"><span className="eyebrow">Photo gallery</span><h2>In the operating theatre and the ward</h2><p className="muted">Tap any photo to see it larger.</p></div>
        <div className="gallery gallery--lb gallery--ot"><OtPhotos lightbox /></div>
      </div></section>
      <Lightbox label="Photo viewer" />
      <section className="cta-full"><div className="wrap"><CtaBand /></div></section>
    </Shell>
  );
}
