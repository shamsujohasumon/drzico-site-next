// Header, mobile drawer, footer, floating Call/Book button and scripts: the frame around every page.
import type { ReactNode } from "react";
import { Icon } from "@/components/Icon";
import { Img } from "@/components/Images";
import { V } from "@/components/Bits";
import { DOC, SERVICES, site } from "@/lib/site";
import { asset } from "@/lib/assets";
import { PageScript } from "@/components/PageScript";

const NAV: [string, string, string][] = [["home", "Home", "/"], ["services", "Services", "/services"], ["about", "About", "/about"],
  ["gallery", "Gallery", "/gallery"], ["appointment", "Chambers", "/appointment"], ["faq", "FAQ", "/faq"], ["blog", "Blog", "/blog"]];

function Header({ active }: { active: string }) {
  const cur = (k: string) => (k === active ? { "aria-current": "page" as const } : {});
  return (
    <>
      <a className="skip" href="#main">Skip to main content</a>
      <div className="topbar"><div className="wrap"><span>Appointment (personal assistant): <a className="pa" href={`tel:${DOC.pa_intl}`}>{DOC.pa}</a> · Popular Dhanmondi serial: <a href={`tel:${DOC.phone_popular_intl}`}>{DOC.phone_popular}</a> · Continental hotline: <a href={`tel:${DOC.continental_hotline}`}>{DOC.continental_hotline}</a></span><span className="emerg"><Icon name="alert" /> Emergency? Go to the nearest hospital emergency department.</span></div></div>
      <header className="site-header"><div className="wrap">
        <a className="brand" href="/" aria-label="Dr. Zico, neurosurgeon, home"><Img className="brand-logo" file="logo.png" sizes="200px" largest={480} alt="Dr. Zico logo" w={793} h={219} lazy={false} /><span className="vh">Dr. Md. Isma Azam (Zico), Neurosurgeon, Brain &amp; Spine</span></a>
        <nav className="nav" aria-label="Main"><ul>
          {NAV.filter(([k]) => k !== "faq").map(([k, l, h]) => k === "services" ? (
            <li key={k} className={`has-menu${active === "services" || active === "service" ? " is-active" : ""}`}>
              <button className="nav-trigger" type="button" aria-expanded="false" aria-controls="svc-menu">Services <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></button>
              <div className="menu" id="svc-menu" hidden>
                {SERVICES.map((s) => <a key={s.slug} href={`/${s.slug}`}><span className="ic"><Icon name={s.icon} /></span><span><strong>{s.name}</strong><span lang="bn">{s.bn_name}</span></span></a>)}
                <a className="menu-all" href="/services">All services and conditions</a>
              </div></li>
          ) : <li key={k}><a href={h} {...cur(k)}>{l}</a></li>)}
        </ul></nav>
        <div className="header-tools">
          <a className="header-phone" href={`tel:${DOC.pa_intl}`}><span>Appointment</span><b>{DOC.pa}</b></a>
          <button className="icon-btn" type="button" data-theme-toggle aria-label="Switch colour theme"><Icon name="moon" cls="i-moon" /><Icon name="sun" cls="i-sun" /></button>
          <a className="btn btn-primary header-cta" href="/appointment#book"><Icon name="calendar" /> Book appointment</a>
          <button className="menu-toggle" type="button" data-drawer-open aria-controls="drawer" aria-expanded="false" aria-label="Open menu"><Icon name="menu" /></button>
        </div>
      </div></header>
      <div className="drawer" id="drawer" hidden><div className="drawer-panel" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="drawer-head"><span className="brand-name">Dr. Zico</span><button className="menu-toggle" type="button" data-drawer-close aria-label="Close menu"><Icon name="close" /></button></div>
        <nav aria-label="Mobile"><ul>
          {NAV.map(([k, l, h]) => k !== "services" ? <li key={k}><a href={h} {...cur(k)}>{l}</a></li> : [
            <li key={k}><a href="/services" {...cur("services")}>Services</a></li>,
            <li key={k + "-sub"}><ul className="drawer-sub">{SERVICES.map((s) => <li key={s.slug}><a href={`/${s.slug}`}>{s.name}</a></li>)}</ul></li>,
          ])}
        </ul></nav>
        <a className="btn btn-primary" href="/appointment#book"><Icon name="calendar" /> Book appointment</a>
        <a className="btn btn-ghost" href={`tel:${DOC.pa_intl}`}><Icon name="phone" /> Call {DOC.pa}</a>
        <p className="small muted">Popular Dhanmondi serial: <a href={`tel:${DOC.phone_popular_intl}`}>{DOC.phone_popular}</a><br />Continental hotline: <a href={`tel:${DOC.continental_hotline}`}>{DOC.continental_hotline}</a></p>
      </div></div>
    </>
  );
}

function ContactWidget() {
  const hospitals: [string, string, string, string, string, string][] = [
    ["continental", "Continental Hospital, Gulshan 2", "chamber-continental.jpg", DOC.continental_hotline, DOC.continental_hotline, "Hospital hotline"],
    ["popular", "Popular Diagnostic Centre, Dhanmondi", "chamber-popular-dhanmondi.jpg", DOC.phone_popular_intl, DOC.phone_popular, "Serial and appointment"],
    ["malibag", "Dr. Sirajul Islam Medical College & Hospital, Malibag", "chamber-malibag.jpg", "+8801927333000", DOC.phone_malibag, "Appointment; call to confirm hours"],
  ];
  return (
    <>
      <button className="floating-call" type="button" data-contact-open aria-haspopup="dialog" aria-controls="contact-modal" aria-label="Call / Book: call a hospital or book an appointment"><Icon name="phone" /><span>Call / Book</span></button>
      <dialog className="contact-modal" id="contact-modal" aria-labelledby="contact-title" aria-describedby="contact-intro">
        <div className="contact-heading"><div><span className="eyebrow">Appointments</span><h2 id="contact-title">Call or book a visit</h2></div><button className="icon-btn" type="button" data-contact-close aria-label="Close appointment options" autoFocus><Icon name="close" /></button></div>
        <p className="muted" id="contact-intro">Choose your hospital to call or request an appointment.</p>
        <p className="small bn" lang="bn">হাসপাতালে সরাসরি কল করুন অথবা অ্যাপয়েন্টমেন্টের ফর্ম পূরণ করুন।</p>
        <div className="contact-hospitals">
          {hospitals.map(([key, name, image, phone, display, note]) => (
            <article className="contact-hospital" key={key}><Img file={image} sizes="(max-width: 760px) 90vw, 360px" alt={name} w={1200} h={675} />
              <div className="contact-hospital-info"><h3>{name}</h3><p className="small muted">{note}</p>
                <div className="contact-actions"><a className="btn btn-primary" href={`tel:${phone}`}><Icon name="phone" /> {display}</a>
                  <a className="btn btn-ghost" href={`/appointment?chamber=${key}#book`}><Icon name="calendar" /> Appointment</a></div></div></article>
          ))}
        </div>
        <div className="contact-assistant"><span className="small muted">Need help choosing a chamber?</span><a href={`tel:${DOC.pa_intl}`}><Icon name="phone" /> Personal assistant: {DOC.pa}</a></div>
      </dialog>
    </>
  );
}

function Footer() {
  return (
    <>
      <footer className="site-footer"><div className="wrap">
        <div className="footer-grid">
          <div className="stack-sm"><a className="brand" href="/"><Img className="brand-logo" file="logo.png" sizes="200px" largest={480} alt="Dr. Zico logo" w={793} h={219} /><span className="vh">Dr. Md. Isma Azam (Zico), Neurosurgeon in Dhaka</span></a>
            <p className="muted small">{DOC.degrees}</p>
            <p className="small"><a href={DOC.fb} rel="noopener" target="_blank">Facebook</a> · <a href={DOC.yt} rel="noopener" target="_blank">YouTube</a> · <a href={DOC.li} rel="noopener" target="_blank">LinkedIn</a></p></div>
          <div><h2>Services</h2><ul>{SERVICES.map((s) => <li key={s.slug}><a href={`/${s.slug}`}>{s.name}</a></li>)}</ul></div>
          <div><h2>Chambers</h2><ul>
            <li><strong>Continental Hospital, Gulshan 2</strong><br /><span className="muted">Plot 15, Road 71, Gulshan 2, Dhaka 1212</span><br /><span className="muted">Sat to Thu · 8:30 AM to 4:00 PM</span><br /><a className="num" href={`tel:${DOC.continental_hotline}`}>Hotline {DOC.continental_hotline}</a></li>
            <li><strong>Popular Diagnostic Centre, Dhanmondi</strong><br /><span className="muted">House 16, Road 2, Dhanmondi R/A, Dhaka 1205</span><br /><span className="muted">Sat, Mon, Wed · 10:00 PM to 12:00 AM</span><br /><a className="num" href={`tel:${DOC.phone_popular_intl}`}>{DOC.phone_popular}</a></li>
            <li><strong>Dr. Sirajul Islam Medical College &amp; Hospital, Malibag</strong><br /><span className="muted">12/3 New Circular Road, Malibag, Dhaka</span><br /><span className="muted"><V note="Two different schedules are published. Confirm the current Malibag days and time.">Hours: call to confirm</V></span><br /><a className="num" href="tel:+8801927333000">{DOC.phone_malibag}</a></li>
          </ul></div>
          <div><h2>Patients</h2><ul><li><a href="/appointment#book">Book appointment</a></li><li><a href="/services#finder">Find your condition</a></li><li><a href="/gallery">Patient gallery</a></li><li><a href="/faq">Questions and answers</a></li><li><a href="/blog">Health articles (Bangla)</a></li><li><a href="/about#case-log">Surgical case log</a></li></ul></div>
        </div>
        <p className="notice" style={{ marginTop: 32 }}>Information on this website is for general education and does not replace a consultation. Every patient is different; decisions about surgery are made after examination and review of scans. In an emergency, go to the nearest hospital emergency department.</p>
        <div className="footer-base"><span>© <span data-year>2026</span> Dr. Md. Isma Azam (Zico).</span><span>Appointment: <a className="num" href={`tel:${DOC.pa_intl}`}>{DOC.pa}</a></span></div>
      </div></footer>
      <div className="mobile-cta" aria-label="Quick actions"><button className="btn btn-ghost" type="button" data-contact-open aria-haspopup="dialog" aria-controls="contact-modal"><Icon name="phone" /> Call</button><a className="btn btn-primary" href="/appointment#book"><Icon name="calendar" /> Book</a></div>
      <ContactWidget />
      <button className="to-top" type="button" aria-label="Back to top"><Icon name="up" /></button>
    </>
  );
}

/** Wraps a page: header + <main> + footer. `active` marks the current menu item. */
export function Shell({ active, children }: { active: string; children: ReactNode }) {
  return (
    <>
      <Header active={active} />
      <main id="main" tabIndex={-1}>{children}</main>
      <Footer />
      {/* Site behaviour (menus, carousels, form, counters...). Loaded after the page is ready. */}
      <PageScript src={asset("/assets/js/conditions.js")} />
      <PageScript src={asset("/assets/js/main.js")} />
    </>
  );
}
