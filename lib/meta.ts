// Title, description, canonical, share image and schema helpers for every page.
import type { Metadata } from "next";
import { DOC, SITE_URL, site } from "@/lib/site";
import { largest } from "@/lib/images";

const OG_DEFAULT = { file: "og-image.jpg", w: 1200, h: 630, alt: "Dr. Md. Isma Azam (Zico), neurosurgeon in Dhaka" };

/** path: "/" or "/about" */
export function pageMeta(pathName: string, title: string, description: string,
  og: { file: string; w: number; h: number; alt: string } = OG_DEFAULT): Metadata {
  const canonical = SITE_URL + pathName;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      type: "website", title, description, url: canonical, locale: "en_BD", alternateLocale: ["bn_BD"],
      images: [{ url: `${SITE_URL}/assets/img/${og.file}`, width: og.w, height: og.h, alt: og.alt }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export const PHYSICIAN_ID = SITE_URL + "/#physician";
export function physicianSchema() {
  return {
    "@context": "https://schema.org", "@type": "Physician", "@id": PHYSICIAN_ID,
    name: DOC.name, alternateName: ["Dr. Zico", "Dr. Isma Azam Zico", "ডাঃ ইসমা আজম জিকো"],
    url: SITE_URL + "/", medicalSpecialty: "Neurosurgery",
    image: `${SITE_URL}/assets/img/${largest("dr-zico-portrait.png")}`,
    description: "Neurosurgeon in Dhaka treating brain and spine conditions: PLID, cervical spine, brain tumors, aneurysm, hydrocephalus.",
    telephone: DOC.pa_intl,
    worksFor: { "@type": "Hospital", name: "Continental Hospital", address: { "@type": "PostalAddress", streetAddress: "Plot 15, Road 71, Gulshan 2", addressLocality: "Dhaka", postalCode: "1212", addressCountry: "BD" } },
    address: { "@type": "PostalAddress", streetAddress: "House 16, Road 2, Dhanmondi R/A", addressLocality: "Dhaka", postalCode: "1205", addressCountry: "BD" },
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Monday", "Wednesday"], opens: "22:00", closes: "23:59" }],
    alumniOf: [{ "@type": "CollegeOrUniversity", name: "Dhaka Medical College" }, { "@type": "CollegeOrUniversity", name: "Bangabandhu Sheikh Mujib Medical University" }],
    sameAs: [DOC.fb, DOC.yt, DOC.li],
  };
}

/** items: [name, path] with path like "/" or "/about" */
export function breadcrumbSchema(items: [string, string][]) {
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map(([name, p], i) => ({ "@type": "ListItem", position: i + 1, name, item: SITE_URL + (p === "/" ? "/" : p) })),
  };
}

export function faqSchema(faqs: [string, string, string][]) {
  return {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a.replace(/<[^>]+>/g, "").trim() } })),
  };
}

export const LAST_REVIEWED = site.LAST_REVIEWED;
