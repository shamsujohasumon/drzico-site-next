import { Shell } from "@/components/Shell";
import { Ph } from "@/components/Images";
import { Crumbs, JsonLd, V } from "@/components/Bits";
import { DOC, SITE_URL } from "@/lib/site";
import { breadcrumbSchema, pageMeta, physicianSchema } from "@/lib/meta";

const TITLE = "কোমর ব্যথা হলে কোন ডাক্তার দেখাবেন: নিউরোলজিস্ট না নিউরোসার্জন?";
export const metadata = pageMeta("/blog-komor-byatha-kon-doctor", "কোমর ব্যথা হলে কোন ডাক্তার দেখাবেন? নিউরোলজিস্ট না নিউরোসার্জন",
  "কোমর ব্যথা ও পায়ে ঝিনঝিন হলে কোন ডাক্তার দেখাবেন, কখন নিউরোসার্জন দরকার এবং কখন জরুরি বিভাগে যেতে হবে। সহজ বাংলায়।");

export default function Article() {
  const crumbs: [string, string][] = [["Home", "/"], ["Blog", "/blog"], ["কোমর ব্যথা: কোন ডাক্তার?", "/blog-komor-byatha-kon-doctor"]];
  return (
    <Shell active="blog">
      <JsonLd data={physicianSchema()} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "MedicalWebPage", headline: TITLE, inLanguage: "bn", url: SITE_URL + "/blog-komor-byatha-kon-doctor", about: { "@type": "MedicalCondition", name: "Low back pain" } }} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Crumbs items={crumbs} />
      <article className="section"><div className="wrap"><div className="article" lang="bn">
        <span className="eyebrow">মেরুদণ্ড · কোমর ব্যথা</span>
        <h1>{TITLE}</h1>
        <p className="byline"><V note="Have Dr. Zico read and approve this article before publishing.">ডাঃ মোঃ ইসমা আজম (জিকো) কর্তৃক পর্যালোচিত</V></p>
        <Ph file="blog-komor-byatha-cover.jpg" w={1600} h={900} label="Blog cover" desc="Illustration: person holding lower back, spine highlighted (Canva)" alt="কোমর ব্যথার চিত্র" />
        <p>কোমর ব্যথা হয়নি এমন মানুষ খুঁজে পাওয়া কঠিন। কিন্তু ব্যথা হলে প্রথম প্রশ্ন আসে: কোন ডাক্তার দেখাবো? অর্থোপেডিক, নিউরোলজিস্ট, নিউরোসার্জন, নাকি ফিজিওথেরাপিস্ট? এই লেখায় সহজ ভাষায় বুঝিয়ে বলা হলো।</p>
        <h2>নিউরোলজিস্ট আর নিউরোসার্জনের পার্থক্য</h2>
        <p><strong>নিউরোলজিস্ট</strong> স্নায়ুরোগ বিশেষজ্ঞ, যিনি ওষুধ দিয়ে চিকিৎসা করেন: যেমন মৃগী, মাইগ্রেন, স্ট্রোক বা পারকিনসন্স। <strong>নিউরোসার্জন</strong> মস্তিষ্ক, মেরুদণ্ড ও নার্ভের সেই সমস্যাগুলোর চিকিৎসা করেন যেখানে অপারেশন লাগতে পারে: যেমন ডিস্ক প্রলাপস বা PLID, ঘাড়ের রগে চাপ, টিউমার বা আঘাত। তবে নিউরোসার্জনের কাছে আসা অনেক রোগীরই অপারেশন লাগে না।</p>
        <table><thead><tr><th>যখন এমন হয়</th><th>যাকে দেখাবেন</th></tr></thead><tbody>
          <tr><td>হঠাৎ কোমরে টান, পায়ে ব্যথা নেই</td><td>প্রথমে সাধারণ চিকিৎসক বা ফিজিওথেরাপি</td></tr>
          <tr><td>কোমর ব্যথা ও পায়ে ঝিনঝিন, সায়াটিকা</td><td>নিউরোসার্জন বা স্পাইন সার্জন</td></tr>
          <tr><td>পা দুর্বল হয়ে যাচ্ছে, পায়ের পাতা ঝুলে যাচ্ছে</td><td>দ্রুত নিউরোসার্জন</td></tr>
          <tr><td>প্রস্রাব-পায়খানার নিয়ন্ত্রণ চলে যাচ্ছে</td><td>এখনই হাসপাতালের জরুরি বিভাগে</td></tr>
        </tbody></table>
        <h2>কোমর ব্যথার সাধারণ কারণ</h2>
        <p>বেশিরভাগ কোমর ব্যথা মাংসপেশির টান থেকে হয় এবং কয়েক সপ্তাহে নিজেই সেরে যায়। ব্যথা যখন কোমর থেকে পা পর্যন্ত নামে, সাথে ঝিনঝিন বা অবশ ভাব থাকে, তখন সাধারণত ডিস্ক সরে গিয়ে নার্ভে চাপ দিচ্ছে। একে বলে <a href="/plid-lumbar-disc-surgery">PLID বা ডিস্ক প্রলাপস</a>। মেরুদণ্ডের হাড় সরে যাওয়া (<a href="/spine-surgery#spondylolisthesis">স্পন্ডাইলোলিসথেসিস</a>) বা <a href="/spinal-tb-potts-disease">মেরুদণ্ডের যক্ষ্মাও</a> কোমর ব্যথার কারণ হতে পারে।</p>
        <h2>কখন দেরি করা যাবে না</h2>
        <ul><li>পা ক্রমশ দুর্বল হয়ে যাওয়া</li><li>প্রস্রাব বা পায়খানা আটকে যাওয়া বা নিয়ন্ত্রণ না থাকা</li><li>যৌনাঙ্গের চারপাশ অবশ লাগা</li><li>জ্বর, ওজন কমা বা রাতে বেশি ব্যথার সাথে কোমর ব্যথা</li></ul>
        <p>এসব লক্ষণ থাকলে দ্রুত নিউরোসার্জন দেখান বা জরুরি বিভাগে যান।</p>
        <h2>ডাক্তার দেখানোর আগে যা করবেন</h2>
        <p>আগের সব MRI বা CT স্ক্যানের ফিল্ম ও রিপোর্ট, প্রেসক্রিপশন এবং যে ওষুধ খাচ্ছেন তার তালিকা সাথে রাখুন। ব্যথা কবে শুরু হয়েছে, কোন দিকে নামে, কী করলে বাড়ে বা কমে, তা লিখে আনলে ডাক্তারের জন্য সুবিধা হয়।</p>
        <h2>অপারেশন কি লাগবেই?</h2>
        <p>না। PLID-এর বেশিরভাগ রোগী ওষুধ, বিশ্রাম ও ফিজিওথেরাপিতে ভালো হন। অপারেশন লাগে যখন ৬ সপ্তাহ চিকিৎসার পরও পায়ের ব্যথা কমে না, দুর্বলতা বাড়ে বা প্রস্রাব-পায়খানার নিয়ন্ত্রণ চলে যায়।</p>
        <div className="bn-box"><h3>ডাঃ জিকোর চেম্বার</h3><p>কন্টিনেন্টাল হাসপাতাল, গুলশান ২: শনি থেকে বৃহস্পতি সকাল ৮:৩০ থেকে বিকাল ৪টা (হটলাইন ১০৬৬৬)। পপুলার ডায়াগনস্টিক সেন্টার, ধানমন্ডি: শনি, সোম ও বুধবার রাত ১০টা থেকে ১২টা। অ্যাপয়েন্টমেন্ট: {DOC.pa}। <a href="/appointment?concern=plid#book">অনলাইনে অনুরোধ পাঠান</a>।</p></div>
        <p className="notice">এই লেখা সাধারণ তথ্যের জন্য; এটি ডাক্তারের পরামর্শের বিকল্প নয়।</p>
      </div></div></article>
    </Shell>
  );
}
