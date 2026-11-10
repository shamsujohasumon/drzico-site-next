import { Shell } from "@/components/Shell";
import { Icon } from "@/components/Icon";
import { BringList, Crumbs, JsonLd } from "@/components/Bits";
import { ChamberCards } from "@/components/Sections";
import { DOC, SERVICES } from "@/lib/site";
import { breadcrumbSchema, pageMeta, physicianSchema } from "@/lib/meta";

export const metadata = pageMeta("/appointment", "Book Appointment | Dr. Zico Neurosurgeon | Popular Dhanmondi Serial",
  "Get a serial for Dr. Md. Isma Azam (Zico), neurosurgeon: Popular Diagnostic Centre Dhanmondi, Sat, Mon, Wed 10 PM to 12 AM, call 09666 787801. Chamber in Malibag too.");

export default function Appointment() {
  const crumbs: [string, string][] = [["Home", "/"], ["Chambers and appointment", "/appointment"]];
  return (
    <Shell active="appointment">
      <JsonLd data={physicianSchema()} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Crumbs items={crumbs} />
      <section className="page-hero"><div className="wrap">
        <span className="eyebrow">Chambers and appointment</span><h1 style={{ marginTop: 12 }}>Book an Appointment with Dr. Zico<span className="bn-line" lang="bn">সিরিয়াল ও চেম্বারের তথ্য</span></h1>
        <p className="lead" style={{ marginTop: 18 }}>Dr. Zico sees patients at three places in Dhaka. The quickest way to book is to call his personal assistant on <a href={`tel:${DOC.pa_intl}`}>{DOC.pa}</a> or the chamber directly. You can also send a request below.</p>
      </div></section>
      <section className="section" id="chambers"><div className="wrap"><h2 className="vh">Dr. Zico&apos;s chambers</h2><ChamberCards page="Appointment" /></div></section>
      <section className="section section--tint" id="book"><div className="wrap split" data-wa={DOC.pa_intl.replace(/^\+/, "")}>
        <div>
          <form className="bk" id="booking-form" noValidate>
            <div className="bk-head"><h2>Request a serial on WhatsApp</h2>
              <p className="muted">Takes less than a minute. Your details go to Dr. Zico&apos;s assistant on WhatsApp, who will reply with your serial and time.</p>
              <p className="bk-bn small" lang="bn">ফর্মটি পূরণ করে পাঠালে ডাঃ জিকোর সহকারীর হোয়াটসঅ্যাপে চলে যাবে, তিনি সিরিয়াল জানিয়ে দেবেন।</p></div>
            <div className="bk-step"><span className="bk-label" id="bk-ch-label"><b>1</b> Choose a chamber</span>
              <div className="bk-chambers" role="radiogroup" aria-labelledby="bk-ch-label">
                <label className="bk-ch"><input type="radio" name="chamber" value="continental" /><span className="bk-ch-box"><strong>Continental Hospital</strong><span>Gulshan 2</span><span className="bk-when">Sat to Thu, 8:30 AM to 4 PM</span></span></label>
                <label className="bk-ch"><input type="radio" name="chamber" value="popular" defaultChecked /><span className="bk-ch-box"><strong>Popular Diagnostic</strong><span>Dhanmondi</span><span className="bk-when">Sat, Mon, Wed, 10 PM to 12 AM</span></span></label>
                <label className="bk-ch"><input type="radio" name="chamber" value="malibag" /><span className="bk-ch-box"><strong>Dr. Sirajul Islam MCH</strong><span>Malibag</span><span className="bk-when">Day and time confirmed on WhatsApp</span></span></label>
              </div></div>
            <div className="bk-step"><span className="bk-label" id="bk-day-label"><b>2</b> Preferred day <em>(optional)</em></span>
              <div className="bk-days" id="bk-days" role="radiogroup" aria-labelledby="bk-day-label"></div></div>
            <div className="bk-step"><span className="bk-label"><b>3</b> Patient details</span>
              <div className="bk-grid">
                <div className="bk-field"><label htmlFor="b-name">Patient&apos;s name</label><input id="b-name" name="name" autoComplete="name" placeholder="Full name" required /><span className="bk-err" id="b-name-err" hidden></span></div>
                <div className="bk-field"><label htmlFor="b-phone">Mobile number</label><input id="b-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="01XXXXXXXXX" required /><span className="bk-err" id="b-phone-err" hidden></span></div>
                <div className="bk-field"><label htmlFor="b-concern">Problem <em>(optional)</em></label><select id="b-concern" name="concern" defaultValue=""><option value="">Choose if you know</option>{SERVICES.map((s) => <option key={s.slug} value={s.concern}>{s.name}</option>)}<option value="unsure">Not sure</option></select></div>
                <div className="bk-field"><label htmlFor="b-notes">Short note <em>(optional)</em></label><input id="b-notes" name="notes" maxLength={200} placeholder="e.g. back pain for 2 months, have MRI" /></div>
              </div></div>
            <button className="bk-send" type="submit"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3Z" /></svg> Send on WhatsApp</button>
            <p className="bk-alt small">Prefer to call? <a href={`tel:${DOC.pa_intl}`}>{DOC.pa}</a> (personal assistant)</p>
          </form>
          <div className="bk-done" id="booking-success" tabIndex={-1} hidden>
            <div className="bk-done-ic" aria-hidden="true"><Icon name="check" /></div>
            <h2>WhatsApp is open</h2>
            <p>Your message to Dr. Zico&apos;s assistant is ready. <strong>Press Send in WhatsApp</strong> to finish. The assistant will reply with your serial.</p>
            <p className="small muted" lang="bn">হোয়াটসঅ্যাপে মেসেজ তৈরি আছে, শুধু Send চাপুন।</p>
            <div className="btn-row"><a className="btn btn-primary" id="bk-reopen" href="#" target="_blank" rel="noopener">Open WhatsApp again</a><button className="btn btn-ghost" type="button" id="b-again">Edit details</button></div>
            <p className="small muted">WhatsApp not installed? Call <a href={`tel:${DOC.pa_intl}`}>{DOC.pa}</a>.</p>
          </div>
        </div>
        <aside className="stack">
          <div className="box"><h3 className="box-title"><Icon name="file" /> Bring with you</h3><BringList /></div>
          <div className="box"><h3>How the serial works</h3><ol className="steps-list small"><li>Call the chamber number, or send a request here.</li><li>The chamber gives you a serial number and time.</li><li>Arrive a little early with your films and reports.</li></ol></div>
          <div className="bn-box" lang="bn"><h3>সিরিয়াল নিতে</h3><p>ব্যক্তিগত সহকারী: {DOC.pa}। কন্টিনেন্টাল হাসপাতাল (শনি থেকে বৃহস্পতি, সকাল ৮:৩০ থেকে বিকাল ৪টা): হটলাইন ১০৬৬৬। পপুলার ডায়াগনস্টিক সেন্টার, ধানমন্ডি: {DOC.phone_popular} (শনি, সোম, বুধ, রাত ১০টা থেকে ১২টা)। সব MRI/CT রিপোর্ট সাথে আনুন।</p></div>
        </aside>
      </div></section>
    </Shell>
  );
}
