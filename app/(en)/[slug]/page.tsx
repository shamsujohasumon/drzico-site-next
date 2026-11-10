// One page per service (spine-surgery, brain-tumor-surgery, ...), built from content/site-data.json.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Shell } from "@/components/Shell";
import { Icon } from "@/components/Icon";
import { LocalPhoto, Ph } from "@/components/Images";
import { BringList, Crumbs, CtaBand, FaqBlock, Html, JsonLd, SvcCard } from "@/components/Bits";
import { CaseBlocks, ServiceGallery, casePhotos } from "@/components/Sections";
import { DOC, SERVICES, SITE_URL, SV, fmt, secTotal, shortH2, site, stripTags, svcImg, total, type Service } from "@/lib/site";
import { hasImage, largest } from "@/lib/images";
import { LAST_REVIEWED, PHYSICIAN_ID, breadcrumbSchema, faqSchema, pageMeta, physicianSchema } from "@/lib/meta";

export const dynamicParams = false;
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };
const realOnly = (s: Service) => site.REAL_ONLY_SERVICES.includes(s.slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = SV[(await params).slug];
  if (!s) return {};
  const og = realOnly(s) ? { file: svcImg(s.slug, "hero.jpg"), w: 1200, h: 750, alt: site.HERO_ALT[s.slug] } : undefined;
  return pageMeta(`/${s.slug}`, s.title, s.desc, og);
}

function imagesSchema(s: Service) {
  if (!realOnly(s)) return {};
  const hero = svcImg(s.slug, "hero.jpg");
  const photos = casePhotos(s.slug).map(([f, , , grp, what]) => ({ contentUrl: `${SITE_URL}/assets/img/${largest(svcImg(s.slug, f))}`, caption: `${grp}: ${what}` }));
  const out: Record<string, unknown> = {
    primaryImageOfPage: { "@type": "ImageObject", contentUrl: `${SITE_URL}/assets/img/${hero}`, caption: site.HERO_ALT[s.slug] },
    image: [`${SITE_URL}/assets/img/${hero}`, ...photos.map((p) => p.contentUrl)],
  };
  if (site.CASE_PROCEDURES[s.slug]) out.mentions = site.CASE_PROCEDURES[s.slug];
  return out;
}

export default async function ServicePage({ params }: Props) {
  const s = SV[(await params).slug];
  if (!s) notFound();
  const real = realOnly(s);
  const book = `/appointment?concern=${s.concern}#book`;
  const heroImg = real
    ? <LocalPhoto file={svcImg(s.slug, "hero.jpg")} w={1200} h={750} alt={site.HERO_ALT[s.slug]} cls="ph--sm" sizes="(max-width: 760px) 100vw, 440px" eager />
    : <Ph file={svcImg(s.slug, "hero.jpg")} w={1600} h={1000} label={`${s.name}: main image`} desc="OT photo of this operation (no patient face) or a clean medical illustration made in Canva" alt={`${s.name} by Dr. Zico`} cls="ph--sm" />;

  const crumbs: [string, string][] = [["Home", "/"], ["Services", "/services"], [s.name, `/${s.slug}`]];
  const schema = {
    "@context": "https://schema.org", "@type": "MedicalWebPage", name: s.h1, url: `${SITE_URL}/${s.slug}`, inLanguage: ["en", "bn"],
    description: s.desc, lastReviewed: LAST_REVIEWED, dateModified: LAST_REVIEWED,
    about: s.sections.map((sec) => ({ "@type": "MedicalCondition", name: stripTags(sec.h2) })),
    mainEntity: { "@id": PHYSICIAN_ID }, ...imagesSchema(s),
  };

  return (
    <Shell active="service">
      <JsonLd data={physicianSchema()} />
      <JsonLd data={schema} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={faqSchema(s.faq)} />
      <Crumbs items={crumbs} />
      <section className="page-hero"><div className="wrap split">
        <div><span className="eyebrow">Neurosurgery service</span><h1 style={{ marginTop: 12 }}>{s.h1}<span className="bn-line" lang="bn">{s.bn_h1}</span></h1><Html as="p" className="lead" style={{ marginTop: 18 }} html={s.lead} />
          <div className="btn-row" style={{ marginTop: 24 }}><a className="btn btn-primary" href={book}><Icon name="calendar" /> Book appointment</a><a className="btn btn-ghost" href={`tel:${DOC.pa_intl}`}><Icon name="phone" /> {DOC.pa}</a></div></div>
        <aside className="hero-card">{heroImg}<span className="eyebrow">From Dr. Zico&apos;s case log</span><span className="big-n">{fmt(total(s))}</span><span className="muted small">{s.name} operations performed</span>
          <div className="breakdown">{s.sections.map((sec) => <span key={sec.id}>{shortH2(sec.h2)} <b>{fmt(secTotal(sec))}</b></span>)}</div>
          {s.emergency ? <div className="emergency" role="note"><Icon name="alert" /><Html as="p" html={s.emergency} /></div> : null}</aside>
      </div></section>
      <div className="wrap page-layout">
        <aside className="toc"><nav aria-label="On this page"><h2>On this page</h2><ol>
          {s.overview ? <li><a href="#overview"><span>Overview</span></a></li> : null}
          {s.sections.map((sec) => <li key={sec.id}><a href={`#${sec.id}`}><span>{shortH2(sec.h2)}</span><span className="num">{fmt(secTotal(sec))}</span></a></li>)}
          <li><a href="#before"><span>Before your visit</span></a></li><li><a href="#faq"><span>Questions</span></a></li>
          {site.SERVICE_GALLERIES[s.slug] ? <li><a href="#photos"><span>Photos</span></a></li> : null}
        </ol><a className="btn btn-primary toc-cta" href={book}>Book appointment</a></nav></aside>
        <div className="content">
          {s.overview ? <section className="block" id="overview"><div className="block-head"><div><h2>Overview</h2></div></div><Html className="prose" html={s.overview} /></section> : null}
          {s.sections.map((sec) => {
            const short = sec.h2.replace(/\s*\(.*?\)/g, "").split(":")[0];
            const figFile = svcImg(s.slug, sec.id + ".jpg");
            const alt = site.SEC_ALT[`${s.slug}|${sec.id}`];
            const fig = real
              ? (hasImage(figFile) ? <LocalPhoto file={figFile} w={1200} h={900} alt={alt} cls="ph--sm" /> : null)
              : <Ph file={figFile} w={1200} h={900} label={`Illustration: ${short}`} desc="Simple anatomical illustration of this condition (Canva). No real scans with patient names" alt={alt || stripTags(sec.h2)} cls="ph--sm" />;
            return (
              <section className="block" id={sec.id} key={sec.id}>
                <div className="block-head"><div><Html as="h2" html={sec.h2} /><span className="bn-sub" lang="bn">{sec.bn}</span></div><span className="count-pill">{fmt(secTotal(sec))}<small>operations</small></span></div>
                {sec.items.length > 1 ? <div className="breakdown">{sec.items.map(([l, c]) => <span key={l}>{l} <b>{fmt(c)}</b></span>)}</div> : null}
                {fig ? <div className="figure-row"><Html className="prose" html={sec.intro} />{fig}</div> : <Html className="prose" html={sec.intro} />}
                <div className="cols"><div className="box"><h3>Common symptoms</h3><ul>{sec.symptoms.map((x, i) => <Html as="li" key={i} html={x} />)}</ul></div><div className="box"><h3>When surgery is considered</h3><ul>{sec.surgery.map((x, i) => <Html as="li" key={i} html={x} />)}</ul></div></div>
                <Html className="prose" html={"<h3>How Dr. Zico treats it</h3>" + sec.how} />
                <CaseBlocks slug={s.slug} sectionId={sec.id} /><div className="bn-box" lang="bn"><h3>{sec.bn_title}</h3><Html as="p" html={sec.bn_text} /></div>
              </section>
            );
          })}
          {s.recovery ? <section className="block" id="recovery"><div className="block-head"><div><h2>Recovery and what to expect</h2></div></div><Html className="prose" html={s.recovery} /></section> : null}
          <section className="block" id="before"><div className="block-head"><div><h2>Before your consultation</h2><span className="bn-sub" lang="bn">চেম্বারে যা সাথে আনবেন</span></div></div>
            <div className="cols"><div className="box"><h3>Bring with you</h3><BringList /></div><div className="box"><h3>How to book</h3><ol className="small" style={{ paddingLeft: "1.2em" }}><li>Call his personal assistant on <a href={`tel:${DOC.pa_intl}`}>{DOC.pa}</a>, the Popular Dhanmondi serial line <a href={`tel:${DOC.phone_popular_intl}`}>{DOC.phone_popular}</a> or the Continental hotline {DOC.continental_hotline}, or <a href={book}>send a request online</a>.</li><li>Come to your chamber on the booked day with your films and reports.</li><li>Dr. Zico examines you, reviews your scans and explains your options.</li></ol></div></div></section>
          <FaqBlock faqs={s.faq} />
          <section className="block"><div className="block-head"><div><h2>Related services</h2></div></div><div className="grid grid-3">{s.related.map((r) => <SvcCard key={r} s={SV[r]} />)}</div></section>
          <ServiceGallery s={s} />
          <CtaBand concern={s.concern} /><p className="notice">This page explains common conditions in general terms and is not a diagnosis. Treatment is decided after Dr. Zico examines you and reviews your scans.</p>
        </div>
      </div>
    </Shell>
  );
}
