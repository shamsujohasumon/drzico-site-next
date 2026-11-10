// Larger blocks reused on several pages: chambers, before/after, videos, photo carousels.
import { Icon } from "@/components/Icon";
import { Img, LocalPhoto, Ph } from "@/components/Images";
import { V } from "@/components/Bits";
import { DOC, site, svcImg, caseKey, url, BA_DIR, type CaseRow, type Service } from "@/lib/site";
import { SZ_CARD } from "@/lib/images";

export function ChamberCards({ page }: { page: "Home" | "Appointment" }) {
  const eager = page === "Appointment";
  const maps = (q: string) => `https://www.google.com/maps/search/?api=1&query=${q}`;
  return (
    <div className="grid-3c">
      <article className="chamber"><LocalPhoto file="chamber-continental.jpg" w={1200} h={675} alt="Continental Hospital, Gulshan 2, Dhaka" cls="ph--sm" eager={eager} /><span className="status" data-chamber-status="continental">Sat to Thu</span><h3>Continental Hospital, Gulshan 2</h3>
        <dl><dt>Address</dt><dd>Plot 15, Road 71, Gulshan 2, Dhaka 1212</dd><dt>Days</dt><dd>Saturday to Thursday</dd><dt>Time</dt><dd>8:30 AM to 4:00 PM</dd><dt>Role</dt><dd>Associate Consultant, Neuro Surgery</dd></dl>
        <div><span className="small muted">Hospital hotline</span><br /><a className="phone" href={`tel:${DOC.continental_hotline}`}>{DOC.continental_hotline}</a></div>
        <div className="btn-row"><a className="btn btn-brand" href="/appointment?chamber=continental#book"><Icon name="calendar" /> Request appointment</a><a className="btn btn-ghost" href={maps("Continental+Hospital+Gulshan+2+Dhaka")} target="_blank" rel="noopener"><Icon name="pin" /> Map</a></div></article>
      <article className="chamber"><LocalPhoto file="chamber-popular-dhanmondi.jpg" w={1200} h={675} alt="Popular Diagnostic Centre building in Dhanmondi, Dhaka" cls="ph--sm" eager={eager} /><span className="status" data-chamber-status="popular">Sat, Mon, Wed</span><h3>Popular Diagnostic Centre, Dhanmondi</h3>
        <dl><dt>Address</dt><dd>House 16, Road 2, Dhanmondi R/A, Dhaka 1205</dd><dt>Days</dt><dd>Saturday, Monday, Wednesday</dd><dt>Time</dt><dd>10:00 PM to 12:00 AM</dd></dl>
        <div><span className="small muted">Serial (appointment)</span><br /><a className="phone" href={`tel:${DOC.phone_popular_intl}`}>{DOC.phone_popular}</a></div>
        <div className="btn-row"><a className="btn btn-brand" href="/appointment?chamber=popular#book"><Icon name="calendar" /> Request serial</a><a className="btn btn-ghost" href={maps("Popular+Diagnostic+Centre+Dhanmondi+Dhaka")} target="_blank" rel="noopener"><Icon name="pin" /> Map</a></div></article>
      <article className="chamber"><LocalPhoto file="chamber-malibag.jpg" w={1200} h={675} alt="Dr. Sirajul Islam Medical College and Hospital building in Malibag, Dhaka" cls="ph--sm" eager={eager} /><span className="status" data-chamber-status="malibag">Call to confirm hours</span><h3>Dr. Sirajul Islam Medical College &amp; Hospital, Malibag</h3>
        <dl><dt>Address</dt><dd>12/3 New Circular Road, Malibag (near Mouchak Market), Dhaka</dd><dt>Days</dt><dd><V note="Published schedules differ: daily except Friday 8 to 10 PM, or Sat to Thu 6 to 8 PM.">Call to confirm</V></dd></dl>
        <div><span className="small muted">Appointment</span><br /><a className="phone" href="tel:+8801927333000">{DOC.phone_malibag}</a> · <a className="phone" href="tel:+8801830279952">{DOC.phone_malibag2}</a></div>
        <div className="btn-row"><a className="btn btn-brand" href="/appointment?chamber=malibag#book"><Icon name="calendar" /> Request serial</a><a className="btn btn-ghost" href={maps("Dr.+Sirajul+Islam+Medical+College+Hospital+Malibag")} target="_blank" rel="noopener"><Icon name="pin" /> Map</a></div></article>
    </div>
  );
}

export function BaCard({ c }: { c: CaseRow }) {
  const [cid, cat, title, bn, link, note] = c;
  return (
    <article className="ba-card" data-cat={cat}>
      <div className="ba" style={{ ["--pos" as string]: "50%" }}>
        <div className="ba-layer ba-after"><Ph file={`${BA_DIR}/case-${cid}-after.jpg`} w={1200} h={900} label={"After: " + title} desc={note + " (after)"} alt={"After surgery: " + title} cls="ph--fill ph--sm" /></div>
        <div className="ba-layer ba-before"><Ph file={`${BA_DIR}/case-${cid}-before.jpg`} w={1200} h={900} label={"Before: " + title} desc={note + " (before)"} alt={"Before surgery: " + title} cls="ph--fill ph--sm" /></div>
        <span className="ba-tag ba-tag--b">Before</span><span className="ba-tag ba-tag--a">After</span><span className="ba-handle" aria-hidden="true"></span>
        <input className="ba-range" type="range" min="0" max="100" defaultValue="50" aria-label={`Compare before and after: ${title}`} />
      </div>
      <div className="ba-body"><span className="tag">{site.CAT_LABEL[cat]}</span><h3>{title}</h3><span className="bn small" lang="bn">{bn}</span>
        <p className="small muted"><V note="Dr. Zico to confirm the diagnosis and the result for this case before the site goes live.">{note}</V></p>
        <a className="small" href={url(link)}>About this treatment</a></div>
    </article>
  );
}

const Arrows = ({ what }: { what: string }) => (
  <div className="car-nav"><button className="icon-btn" type="button" data-car-prev aria-label={`Previous ${what}`}><Icon name="arrow" cls="flip" /></button><button className="icon-btn" type="button" data-car-next aria-label={`Next ${what}`}><Icon name="arrow" /></button></div>
);

export function BaCarousel() {
  return (
    <div className="carousel carousel--ba" data-carousel data-autoplay="4500">
      <div className="car-track" tabIndex={0} aria-label="Before and after cases, scroll sideways">{site.CASES.map((c) => <BaCard key={c[0]} c={c} />)}</div>
      <Arrows what="case" />
    </div>
  );
}

export function VideoCarousel() {
  const uploads = "UU" + site.YT_CHANNEL_ID.slice(2); // a channel's "uploads" playlist, newest first
  return (
    <>
      <div className="carousel carousel--videos" data-carousel data-autoplay="5000" data-yt-key={site.YT_API_KEY} data-yt-list={uploads} data-yt-max={site.YT_MAX}>
        <div className="car-track" tabIndex={0} aria-label="Videos, scroll sideways">
          {site.VIDEOS.map(([vid, title, src], i) => (
            <a key={vid} className="video-card" href={`https://www.youtube.com/watch?v=${vid}`} data-video={vid} data-title={title} target="_blank" rel="noopener">
              <div className="vc-thumb"><Ph file={`video-${i + 1}-thumb.jpg`} w={1280} h={720} label={`Video ${i + 1} thumbnail`} desc="Optional: your own thumbnail. If missing, the YouTube thumbnail is used" alt={"Video: " + title} cls="ph--sm" />
                <span className="play"><Icon name="play" /></span></div>
              <strong {...(/[ঀ-৿]/.test(title) ? { lang: "bn" } : {})}>{title}</strong><span className="small muted">{src} · YouTube</span></a>
          ))}
        </div>
        <Arrows what="video" />
      </div>
      <dialog className="video-modal" id="video-modal" aria-label="Video player"><div className="vm-box"><button className="icon-btn vm-close" type="button" data-vm-close aria-label="Close video"><Icon name="close" /></button><div className="vm-frame"></div><p className="vm-title"></p></div></dialog>
    </>
  );
}

export function Lightbox({ label = "Photo viewer" }: { label?: string }) {
  return <dialog className="lightbox" id="lightbox" aria-label={label}><button className="icon-btn lb-close" type="button" data-lb-close aria-label="Close"><Icon name="close" /></button><img alt="" /><p className="lb-cap"></p></dialog>;
}

export function HappyPatientCarousel() {
  const n = site.HAPPY_PATIENTS.length;
  return (
    <div className="carousel carousel--photos carousel--patients" data-carousel data-autoplay="3500" role="region" aria-roledescription="carousel" aria-label="Patient photos">
      <div className="car-track" tabIndex={0} aria-label="Patient photos; swipe or use the left and right arrow keys">
        {site.HAPPY_PATIENTS.map((p, i) => (
          <button key={p.file} className="car-photo" type="button" data-lightbox aria-label={`Open patient photo ${i + 1} of ${n}`}>
            <Img file={p.file} sizes={SZ_CARD} alt={p.alt} w={p.width} h={p.height} /></button>
        ))}
      </div>
      <Arrows what="patient photo" />
    </div>
  );
}

export function OtPhotos({ lightbox = false }: { lightbox?: boolean }) {
  return (
    <>
      {site.OPERATING_THEATRE.map((p) => {
        const img = <LocalPhoto key={p.file} file={p.file} w={p.width} h={p.height} alt={p.alt} frame="ot-photo-frame" />;
        return lightbox
          ? <button key={p.file} className="lb-item" type="button" data-lightbox aria-label={`Open photo: ${p.title}`}>{img}</button>
          : img;
      })}
    </>
  );
}

/** All photos of a service's shared cases: [file, w, h, case title, what it shows] */
export const casePhotos = (slug: string) =>
  (site.SERVICE_CASES[slug] || []).flatMap((c) => c.photos.map(([f, w, h, what]) => [f, w, h, c.title, what] as [string, number, number, string, string]));

export function CaseBlocks({ slug, sectionId }: { slug: string; sectionId: string }) {
  const cases = (site.SERVICE_CASES[slug] || []).filter((c) => c.section === sectionId);
  if (!cases.length) return null;
  return (
    <div className="case-cards"><h3 className="case-cards-title">Cases Dr. Zico has shared</h3><div className="case-grid">
      {cases.map((c) => {
        const n = c.photos.length, key = caseKey(c.title);
        const [cf, pos] = c.cover;
        const [, cw, ch, cwhat] = c.photos.find((x) => x[0] === cf)!;
        return (
          <article className="case-card" key={key}>
            <a className="case-img" href="#photos" data-goto-case={key} aria-label={`See the ${n} photos from this case: ${c.title}`}>
              <Img file={svcImg(slug, cf)} sizes="(max-width: 560px) 92vw, 300px" alt={`${c.title} by Dr. Zico: ${cwhat}`} w={cw} h={ch} style={{ objectPosition: pos }} />
              <span className="case-count"><Icon name="image" /> {n} photos</span></a>
            <div className="case-body"><h3>{c.title}</h3><span className="bn small" lang="bn">{c.bn}</span>
              <p className="small">{c.text}</p>
              <a className="case-link small" href="#photos" data-goto-case={key}><Icon name="image" /> See the {n} photos from this case</a></div>
          </article>
        );
      })}
    </div></div>
  );
}

export function ServiceGallery({ s }: { s: Service }) {
  const g = site.SERVICE_GALLERIES[s.slug];
  if (!g) return null;
  let cards;
  if (g.photos) {
    const photos = casePhotos(s.slug), n = photos.length;
    cards = photos.map(([f, w, h, grp, what], i) => (
      <button key={f} className="car-photo car-photo--whole" type="button" data-lightbox data-case={caseKey(grp)} aria-label={`Open photo ${i + 1} of ${n}: ${grp}`}>
        <Img file={svcImg(s.slug, f)} sizes={SZ_CARD} alt={`${grp} by Dr. Zico: ${what}`} w={w} h={h} />
        <span className="car-cap">{grp}</span></button>
    ));
  } else {
    cards = Array.from({ length: g.count! }, (_, k) => k + 1).map((i) => (
      <button key={i} className="car-photo" type="button" data-lightbox aria-label={`Open photo ${i} of ${g.count}`}>
        <Img file={svcImg(s.slug, `case-${String(i).padStart(2, "0")}.jpg`)} sizes={SZ_CARD} alt={`${g.alt} ${i}`} w={750} h={1000} /></button>
    ));
  }
  return (
    <section className="block" id="photos"><div className="block-head"><div><h2>{g.h2}</h2><span className="bn-sub" lang="bn">{g.bn}</span></div></div>
      <p className="muted">{g.intro}</p>
      <div className="carousel carousel--photos" data-carousel data-autoplay="3500">
        <div className="car-track" tabIndex={0} aria-label="Photos, scroll sideways">{cards}</div>
        <Arrows what="photo" /></div>
      <Lightbox /></section>
  );
}
