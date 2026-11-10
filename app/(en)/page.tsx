import { Shell } from "@/components/Shell";
import { Icon } from "@/components/Icon";
import { LocalPhoto, Ph } from "@/components/Images";
import { CtaBand, FaqBlock, JsonLd, SvcCard, V } from "@/components/Bits";
import { BaCarousel, ChamberCards, HappyPatientCarousel, Lightbox, VideoCarousel } from "@/components/Sections";
import { DOC, SERVICES, SV, SITE_URL, fmt, site, total } from "@/lib/site";
import { faqSchema, pageMeta, physicianSchema } from "@/lib/meta";
import { asset } from "@/lib/assets";
import { PageScript } from "@/components/PageScript";

export const metadata = pageMeta("/", "Neurosurgeon in Dhaka | Dr. Md. Isma Azam (Zico) | Brain & Spine Surgeon",
  "Neurosurgeon in Dhaka, Bangladesh: Dr. Md. Isma Azam (Zico), brain and spine surgeon. 5,010 operations: PLID, ACDF, brain tumor, aneurysm, hydrocephalus. Chamber: Popular Dhanmondi.");

const TOP: [string, number, string][] = [["PLID (lumbar disc)", 1443, "/plid-lumbar-disc-surgery"], ["ACDF (neck disc)", 459, "/spine-surgery#cervical"],
  ["Pituitary macroadenoma", 329, "/brain-tumor-surgery#pituitary"], ["Aneurysm clipping", 295, "/brain-aneurysm-stroke-surgery#aneurysm"],
  ["Meningioma", 276, "/brain-tumor-surgery#meningioma"]];

export default function Home() {
  const faqs = [...site.GENERAL_FAQ.slice(0, 5), ...site.GENERAL_FAQ.slice(7, 9)];
  const tech: [string, string, React.ReactNode][] = [
    ["scope", "Operating microscope", "Used for disc, neck, aneurysm and tumor surgery, including more than 450 microscopic ACDF operations."],
    ["brain", "Endoscopic surgery", "Pituitary tumors removed through the nose with no cut on the head, and ETV for hydrocephalus without a shunt."],
    ["spine", "Minimally invasive spine (MISS)", "Screws placed through small cuts for suitable spondylolisthesis patients (MISS TLIF)."],
    ["shield", "EXOSCOPE", <V key="v" note="Confirm which hospital(s) he uses the EXOSCOPE at.">High-definition 3D exoscope for fine microsurgery.</V>],
    ["users", "A complete team", "Neurosurgery and anaesthesia consultants, specialists and trained OT nurses work on every case."]];
  return (
    <Shell active="home">
      <JsonLd data={physicianSchema()} />
      <JsonLd data={faqSchema(faqs as [string, string, string][])} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: "Dr. Md. Isma Azam (Zico), Neurosurgeon", url: SITE_URL + "/", inLanguage: ["en", "bn"] }} />

      <section className="hero hero--bleed"><div className="hero-grid">
        <div className="hero-text">
          <span className="eyebrow">Neurosurgeon in Dhaka · Brain and Spine Surgeon</span>
          <h1 style={{ marginTop: 14 }}>Neurosurgeon in Dhaka: Dr. Md. Isma Azam (Zico)<span className="bn-line" lang="bn">নিউরো সার্জন ঢাকা · ব্রেইন ও স্পাইন সার্জন</span></h1>
          <p className="lead">A brain and spine surgeon in Dhaka treating patients from across Bangladesh, from slipped discs and neck problems to brain tumors, aneurysms and hydrocephalus. His own case log records <strong className="num">{fmt(site.ALL_TOTAL)}</strong> operations.</p>
          <div className="creds"><span className="chip"><Icon name="cap" /> MBBS (DMC)</span><span className="chip"><Icon name="cap" /> MRCS (England)</span><span className="chip"><Icon name="cap" /> MS (Neurosurgery)</span><span className="chip"><Icon name="cap" /> BCS (Health)</span></div>
          <div className="btn-row"><a className="btn btn-primary" href="/appointment#book"><Icon name="calendar" /> Book appointment</a><a className="btn btn-ghost" href={`tel:${DOC.pa_intl}`}><Icon name="phone" /> Call {DOC.pa}</a></div>
          <div className="small muted" style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: "8px 16px", alignItems: "center" }}><span>Continental, Gulshan: <span className="status" data-chamber-status="continental">Sat to Thu · 8:30 AM to 4 PM</span></span><span>Popular, Dhanmondi: <span className="status" data-chamber-status="popular">Sat, Mon, Wed · 10 PM to 12 AM</span></span></div>
        </div>
        <div className="hero-media">
          <LocalPhoto file="dr-zico-portrait.png" w={1212} h={1297} alt="Dr. Md. Isma Azam (Zico), neurosurgeon in Dhaka, in a white coat" cls="ph--fill" eager />
          <div className="ledger ledger--float" aria-label="Surgical case log summary"><div className="ledger-head"><h2>Surgical case log</h2><span className="ledger-total">{fmt(site.ALL_TOTAL)}</span></div>
            <ol>{TOP.map(([n, c, u]) => <li key={n}><a href={u}>{n}</a><span className="dots"></span><span className="n">{fmt(c)}</span></li>)}</ol>
            <div className="ledger-foot"><a href="/about#case-log">See all 72 procedures</a></div></div>
        </div>
      </div></section>

      <section className="stats-band" aria-label="Key numbers"><div className="wrap"><div className="stats stats--band">
        <div className="stat"><b>{fmt(site.ALL_TOTAL)}</b><span>operations in his case log</span></div>
        <div className="stat"><b>{fmt(site.SPINE_TOTAL)}</b><span>spine operations</span></div>
        <div className="stat"><b>{fmt(site.BRAIN_TOTAL)}</b><span>brain operations</span></div>
        <div className="stat"><b>{fmt(total(SV["brain-tumor-surgery"]))}</b><span>brain tumor operations</span></div>
        <div className="stat"><b>295</b><span>aneurysm clippings</span></div>
      </div></div></section>

      <section className="section" id="finder"><div className="wrap split split--even">
        <div className="section-head"><span className="eyebrow">Find your problem</span><h2>What brings you to a neurosurgeon?</h2><p className="muted">Type a symptom or diagnosis in English or Bangla, such as &quot;back pain&quot;, &quot;কোমর ব্যথা&quot;, &quot;pituitary&quot; or &quot;মাথায় পানি জমা&quot;, to go straight to the right page.</p></div>
        <div className="finder" data-finder data-limit="7">
          <label htmlFor="finder-home">Search conditions and symptoms</label>
          <div className="finder-input"><Icon name="search" /><input id="finder-home" type="search" autoComplete="off" placeholder="e.g. slipped disc, ঘাড় ব্যথা, aneurysm" /></div>
          <div className="chips"><button type="button" data-q="কোমর ব্যথা">কোমর ব্যথা</button><button type="button" data-q="ঘাড় ব্যথা">ঘাড় ব্যথা</button><button type="button" data-q="brain tumor">Brain tumor</button><button type="button" data-q="মাথায় পানি জমা">মাথায় পানি জমা</button><button type="button" data-q="pituitary">Pituitary</button><button type="button" data-q="মুখে">মুখে ব্যথা</button></div>
          <ul className="finder-results" aria-live="polite"></ul><p className="finder-empty" hidden>No match yet. Try a simpler word, or <a href="/services">see all services</a>.</p>
        </div>
      </div></section>

      <section className="section section--tint" id="services"><div className="wrap">
        <div className="section-head"><span className="eyebrow">Services</span><h2>Brain and spine surgery services</h2><p className="muted">Nine areas of care, each with its own page explaining symptoms, when surgery is needed and what to expect. The number on each card is Dr. Zico&apos;s own operation count.</p></div>
        <div className="grid grid-3">{SERVICES.map((s) => <SvcCard key={s.slug} s={s} />)}</div>
      </div></section>

      <section className="bleed bleed--ot" aria-label="In the operating theatre">
        <LocalPhoto file="ot-team-microscope.jpg" w={1800} h={1350} alt="Dr. Zico and the surgical team with a microscope and surgical monitor in the operating theatre" cls="ph--fill" />
        <div className="bleed-caption"><div className="wrap"><div className="caption-card"><span className="eyebrow">In the operating theatre</span><p>Brain and spine surgery happens in millimetres. Every operation is done under the microscope or endoscope with a full neurosurgery and anaesthesia team.</p></div></div></div>
      </section>

      <section className="section" id="technology"><div className="wrap">
        <div className="section-head"><span className="eyebrow">Technology</span><h2>Precise tools for delicate surgery</h2><p className="muted">The tools behind Dr. Zico&apos;s operations at Continental Hospital, Gulshan 2 and Dr. Sirajul Islam Medical College &amp; Hospital.</p></div>
        <div className="grid grid-3">{tech.map(([i, t, d]) => (
          <div className="box" key={t}><span className="ic" style={{ width: 40, height: 40, borderRadius: 10, background: "var(--brand-soft)", color: "var(--brand)", display: "grid", placeItems: "center" }}><Icon name={i} /></span><h3>{t}</h3><p className="small muted">{d}</p></div>
        ))}</div>
      </div></section>

      <section className="half-bleed section--tint" id="team">
        <div className="hb-media"><Ph file="team-photo.jpg" w={1536} h={2048} label="Team photo" desc="Dr. Zico with neurosurgery and anaesthesia consultants, specialists and OT nurses" alt="Dr. Zico with his surgical team" cls="ph--fill" /></div>
        <div className="hb-text"><div className="stack"><span className="eyebrow">Team</span><h2>The team behind every operation</h2><p className="muted">Brain and spine surgery is team work. Each operation involves neurosurgery and anaesthesia consultants, specialists and trained OT nurses, and the same team follows patients through recovery.</p>
          <div className="bn-box" lang="bn"><h3>আমাদের টিম</h3><p>প্রতিটি অপারেশনে নিউরোসার্জারি ও অ্যানেস্থেসিয়া কনসালট্যান্ট, বিশেষজ্ঞ ডাক্তার ও প্রশিক্ষিত OT নার্স একসাথে কাজ করেন।</p></div></div></div>
      </section>

      <section className="section" id="patients"><div className="wrap">
        <div className="section-head section-head--row"><div className="stack-sm"><span className="eyebrow">Our patients</span><h2>Back to everyday life</h2><p className="muted">Patients and families after treatment, shared with their written permission.</p><p className="small bn" lang="bn">আমাদের রোগীরা: চিকিৎসার পর স্বাভাবিক জীবনে</p></div><a className="btn btn-ghost" href="/gallery#patients"><Icon name="image" /> View patient photos</a></div>
        <HappyPatientCarousel />
        <Lightbox label="Patient photo viewer" />
      </div></section>

      <section className="section section--tint" id="before-after"><div className="wrap">
        <div className="section-head section-head--row"><div className="stack-sm"><span className="eyebrow">Before and after</span><h2>Results from real operations</h2><p className="muted">Scans and photos before and after surgery. Drag the handle to compare. All images are shared with written consent, with names removed.</p></div>
          <a className="btn btn-ghost" href="/gallery"><Icon name="image" /> Open patient gallery</a></div>
        <BaCarousel />
      </div></section>

      <section className="section" id="videos"><div className="wrap">
        <div className="section-head section-head--row"><div className="stack-sm"><span className="eyebrow">Videos</span><h2>Dr. Zico explains</h2><p className="muted">Short videos on common brain and spine problems. Tap a video to play it here.</p></div>
          <a className="btn btn-ghost" href={DOC.yt} target="_blank" rel="noopener"><Icon name="play" /> YouTube channel</a></div>
        <VideoCarousel />
      </div></section>

      <section className="section section--tint" id="facebook"><div className="wrap">
        <div className="section-head section-head--row"><div className="stack-sm"><span className="eyebrow">Facebook</span><h2>Latest from Facebook</h2><p className="muted">Recent posts, photos and videos from Dr. Zico&apos;s Facebook page. They update by themselves.</p></div>
          <a className="btn btn-ghost" href={DOC.fb} target="_blank" rel="noopener">Visit Facebook page</a></div>
        <div id="fb-feed" className="fb-feed" data-feed={site.FB_FEED_URL} data-page={DOC.fb}>
          <p className="fb-sample-note small">Sample cards for preview. They are replaced by real Facebook posts once the feed is connected, and this section stays hidden on the live site until then.</p>
          <div className="fb-grid" aria-live="polite">{Array.from({ length: 8 }, (_, i) => <div key={i} className="fb-card fb-skel" aria-hidden="true"><div className="fb-media"></div><div className="fb-body"><span></span><span></span></div></div>)}</div>
          <PageScript src={asset("/assets/js/fb-feed.js")} />
          <noscript><p><a href={DOC.fb} target="_blank" rel="noopener">See the latest posts on Facebook</a></p></noscript>
        </div>
      </div></section>

      <section className="section" id="chambers"><div className="wrap">
        <div className="section-head"><span className="eyebrow">Chambers</span><h2>Where to see Dr. Zico</h2><p className="muted">If you searched for a &quot;neurosurgeon near me&quot; in Dhaka: Dr. Zico sees patients at Continental Hospital in Gulshan during the day, and at two evening chambers in Dhanmondi and Malibag for people who work during the day.</p></div>
        <ChamberCards page="Home" />
      </div></section>

      <section className="section"><div className="wrap split">
        <div className="stack">
          <FaqBlock faqs={faqs as [string, string, string][]} fid="home-faq" />
          <p><a href="/faq">See all questions</a></p>
        </div>
        <aside className="stack">
          <div className="bn-box" lang="bn"><h3>বাংলায়: ডাঃ ইসমা আজম জিকো</h3><p>ডাঃ মোঃ ইসমা আজম (জিকো) ঢাকার একজন নিউরোসার্জন, অর্থাৎ ব্রেইন ও স্পাইন সার্জন। কোমর ব্যথা ও PLID, ঘাড়ের ডিস্ক, ব্রেইন টিউমার, মাথায় পানি জমা, মস্তিষ্কে রক্তক্ষরণ, মাথায় ও মেরুদণ্ডে আঘাতের চিকিৎসা ও অপারেশন করেন। ব্রেইনের ডাক্তার ঢাকায় খুঁজছেন? কন্টিনেন্টাল হাসপাতাল, গুলশান ২-এ শনি থেকে বৃহস্পতি সকাল ৮:৩০ থেকে বিকাল ৪টা, আর পপুলার ডায়াগনস্টিক সেন্টার, ধানমন্ডিতে শনি, সোম ও বুধবার রাত ১০টা থেকে ১২টা রোগী দেখেন। অ্যাপয়েন্টমেন্ট: {DOC.pa}।</p></div>
          <a className="post-card" href="/blog-komor-byatha-kon-doctor"><Ph file="blog-komor-byatha-cover.jpg" w={1600} h={900} label="Blog cover" desc="Illustration: person holding lower back, spine highlighted (Canva)" alt="Illustration of lower back pain" cls="ph--sm" /><span className="tag">Bangla article</span><h3 lang="bn">কোমর ব্যথা হলে কোন ডাক্তার দেখাবেন: নিউরোলজিস্ট না নিউরোসার্জন?</h3><p className="small muted">When back pain needs a neurosurgeon, and when it does not.</p></a>
        </aside>
      </div></section>

      <section className="cta-full"><div className="wrap"><CtaBand /></div></section>
    </Shell>
  );
}
