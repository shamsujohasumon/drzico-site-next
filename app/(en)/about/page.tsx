import { Fragment } from "react";
import { Shell } from "@/components/Shell";
import { Icon } from "@/components/Icon";
import { Ph } from "@/components/Images";
import { Crumbs, CtaBand, JsonLd, V } from "@/components/Bits";
import { OtPhotos } from "@/components/Sections";
import { DOC, SERVICES, fmt, site, total } from "@/lib/site";
import { breadcrumbSchema, pageMeta, physicianSchema } from "@/lib/meta";

export const metadata = pageMeta("/about", "About Dr. Md. Isma Azam (Zico) | Neurosurgeon, MRCS, MS",
  "Dr. Md. Isma Azam (Zico): MBBS (DMC), MRCS (England), MS (Neurosurgery). Training, career and full surgical case log of 5,010 brain and spine operations.");

export default function About() {
  const crumbs: [string, string][] = [["Home", "/"], ["About", "/about"]];
  return (
    <Shell active="about">
      <JsonLd data={physicianSchema()} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Crumbs items={crumbs} />
      <section className="page-hero"><div className="wrap split">
        <div><span className="eyebrow">About</span><h1 style={{ marginTop: 12 }}>Dr. Md. Isma Azam (Zico), Neurosurgeon<span className="bn-line" lang="bn">ডাঃ মোঃ ইসমা আজম (জিকো), নিউরোসার্জন</span></h1>
          <p className="lead" style={{ marginTop: 18 }}>A brain and spine surgeon trained at Dhaka Medical College, the Royal College of Surgeons of England and Bangladesh&apos;s national medical university, with a case log of {fmt(site.ALL_TOTAL)} operations.</p>
          <div className="creds"><span className="chip"><Icon name="cap" /> {DOC.degrees}</span></div></div>
        <div className="about-portrait" style={{ maxWidth: 380, width: "100%" }}><Ph file="dr-zico-about.jpg" w={1200} h={1500} label="Dr. Zico portrait (About)" desc="Second portrait: at the desk, in scrubs, or with the microscope" alt="Dr. Md. Isma Azam (Zico)" /></div>
      </div></section>
      <div className="wrap page-layout">
        <aside className="toc"><nav aria-label="On this page"><h2>On this page</h2><ol><li><a href="#profile">Profile</a></li><li><a href="#training">Training and career</a></li><li><a href="#technology">Technology and team</a></li><li><a href="#gallery">Gallery</a></li><li><a href="#case-log">Case log</a></li></ol><a className="btn btn-primary toc-cta" href="/appointment#book">Book appointment</a></nav></aside>
        <div className="content">
          <section className="block" id="profile"><div className="block-head"><div><h2>Profile</h2></div></div><div className="prose">
            <p>Dr. Md. Isma Azam, known to patients as Dr. Zico, is a neurosurgeon in Dhaka who treats the full range of brain and spine conditions. His largest areas of work are lumbar disc (PLID) surgery, microscopic neck surgery (ACDF), brain tumors including endoscopic pituitary surgery, aneurysm surgery and hydrocephalus.</p>
            <p>He is Associate Consultant, Neuro Surgery at Continental Hospital (formerly United Hospital), Gulshan 2, and previously served as Assistant Professor of Neurosurgery at Dhaka Medical College Hospital. His hospital lists more than 5,000 surgeries across his career; the case log below lists {fmt(site.ALL_TOTAL)} by procedure.</p>
            <p>He believes patients should understand their scans and their choices. Many people he sees do not need an operation, and he says so.</p>
          </div><div className="bn-box" lang="bn"><h3>বাংলায়</h3><p>ডাঃ মোঃ ইসমা আজম (জিকো) ঢাকা মেডিকেল কলেজ থেকে MBBS, ইংল্যান্ডের রয়্যাল কলেজ অব সার্জনস থেকে MRCS এবং নিউরোসার্জারিতে MS করেছেন। তিনি কোমর ব্যথা ও PLID, ঘাড়ের ডিস্ক, ব্রেইন টিউমার, অ্যানিউরিজম ও মাথায় পানি জমার অপারেশন করেন।</p></div></section>

          <section className="block" id="training"><div className="block-head"><div><h2>Training and career</h2></div></div>
            <ol className="timeline">
              <li><span className="when">2007</span><div className="what">MBBS, Dhaka Medical College</div></li>
              <li><span className="when">29th BCS</span><div className="what">BCS (Health), Government health service</div></li>
              <li><span className="when">2010 to 2012</span><div className="what">Assistant Surgeon, Kazipur, Sirajganj</div></li>
              <li><span className="when">2011</span><div className="what">MRCS, Royal College of Surgeons of England</div></li>
              <li><span className="when">2012 to 2013</span><div className="what">Assistant Registrar, Surgery, Sir Salimullah Medical College</div></li>
              <li><span className="when">2013 to 2014</span><div className="what">Assistant Registrar, Orthopaedics and Traumatology, Sir Salimullah Medical College</div></li>
              <li><span className="when">2017 to 2023</span><div className="what">Registrar, Department of Neurosurgery, Dhaka Medical College Hospital</div></li>
              <li><span className="when">2019</span><div className="what">MS (Neurosurgery), Bangabandhu Sheikh Mujib Medical University (now Bangladesh Medical University)</div></li>
              <li><span className="when"><V note="Dates from Continental Hospital; his Facebook still shows this post as current. Confirm.">Feb 2023 to Sep 2025</V></span><div className="what">Assistant Professor of Neurosurgery, Dhaka Medical College Hospital</div></li>
              <li><span className="when">Current</span><div className="what">Associate Consultant, Neuro Surgery, Continental Hospital (formerly United Hospital), Gulshan 2</div></li>
            </ol>
            <div className="box"><h3>Memberships</h3><ul><li><V note="From directories. Confirm.">Member, AO Spine (Asia Pacific)</V></li><li>Executive Member, Neurospine Society Bangladesh</li><li>Executive Member, DMC Alumni Trust</li></ul></div>
          </section>

          <section className="block" id="technology"><div className="block-head"><div><h2>Technology and team</h2><span className="bn-sub" lang="bn">আধুনিক যন্ত্র ও দক্ষ টিম</span></div></div><div className="prose">
            <p>Dr. Zico operates with the operating microscope, neuro-endoscope and <V note="Confirm where the EXOSCOPE is available.">EXOSCOPE, a high-definition 3D camera system for ultra-fine microsurgery</V>. He uses keyhole and minimally invasive approaches when they are safe for the patient. Each operation involves a team of neurosurgery and anaesthesia consultants, specialists and trained OT nurses.</p></div></section>

          <section className="block" id="gallery"><div className="block-head"><div><h2>Gallery</h2><span className="bn-sub" lang="bn">ছবিতে কাজ</span></div></div>
            <div className="gallery gallery--ot"><OtPhotos /></div></section>

          <section className="block" id="case-log"><div className="block-head"><div><h2>Surgical case log</h2><span className="bn-sub" lang="bn">অপারেশনের হিসাব</span></div><span className="count-pill">{fmt(site.ALL_TOTAL)}<small>total</small></span></div>
            <p className="muted">Numbers as recorded by Dr. Zico. <V note="Confirm the date the list was last updated, and the missing meningioma sub-type numbers (clinoidal, cavernous sinus).">Figures current to September 2026.</V></p>
            <div className="logbook-wrap"><table className="logbook"><thead><tr><th scope="col">Procedure or condition</th><th scope="col" style={{ textAlign: "right" }}>Operations</th></tr></thead><tbody>
              {SERVICES.map((s) => (
                <Fragment key={s.slug}>
                  <tr className="grp"><td>{s.name}</td><td className="n">{fmt(total(s))}</td></tr>
                  {s.sections.flatMap((sec) => sec.items.map(([l, c], i) => <tr key={sec.id + i}><td>{l}</td><td className="n">{fmt(c)}</td></tr>))}
                </Fragment>
              ))}
              <tr className="grp"><td>Total</td><td className="n">{fmt(site.ALL_TOTAL)}</td></tr>
            </tbody></table></div></section>
          <CtaBand />
        </div>
      </div>
    </Shell>
  );
}
