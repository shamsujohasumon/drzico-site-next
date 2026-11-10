import { Shell } from "@/components/Shell";
import { Ph } from "@/components/Images";
import { Crumbs, JsonLd } from "@/components/Bits";
import { site } from "@/lib/site";
import { getPosts } from "@/lib/blog";
import { breadcrumbSchema, pageMeta, physicianSchema } from "@/lib/meta";

export const metadata = pageMeta("/blog", "Brain & Spine Health Articles in Bangla | Dr. Zico Neurosurgeon",
  "Bangla articles on back pain, PLID, brain tumor, hydrocephalus and neurosurgery by the team of Dr. Md. Isma Azam (Zico), neurosurgeon in Dhaka.");

export default async function Blog() {
  const crumbs: [string, string][] = [["Home", "/"], ["Blog", "/blog"]];
  const posts = await getPosts();
  return (
    <Shell active="blog">
      <JsonLd data={physicianSchema()} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Crumbs items={crumbs} />
      <section className="page-hero"><div className="wrap"><span className="eyebrow">Blog</span><h1 style={{ marginTop: 12 }}>Brain and Spine Health Articles<span className="bn-line" lang="bn">মস্তিষ্ক ও মেরুদণ্ডের স্বাস্থ্য নিয়ে লেখা</span></h1><p className="lead" style={{ marginTop: 18 }}>Plain-language articles, mostly in Bangla, answering the questions patients ask in the chamber.</p></div></section>
      <section className="section"><div className="wrap split">
        <div className="grid">{posts.map((p) => (
          <a className="post-card" href={`/${p.slug}`} key={p.slug}><Ph file={p.cover} w={1600} h={900} label="Blog cover" desc="Illustration: person holding lower back, spine highlighted (Canva)" alt="Illustration of lower back pain" cls="ph--sm" /><span className="tag">{p.tag}</span><h3 lang={p.lang}>{p.title}</h3><p className="small muted" lang={p.lang}>{p.excerpt}</p><span className="more small" style={{ color: "var(--brand)", fontWeight: 700 }}>Read article</span></a>
        ))}</div>
        <aside><div className="box"><h3>Coming next</h3><ul className="upcoming">{site.UPCOMING.map((t) => <li lang="bn" key={t}>{t}</li>)}</ul></div></aside>
      </div></section>
    </Shell>
  );
}
