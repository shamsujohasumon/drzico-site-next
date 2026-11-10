// Image slots. <Ph> shows the real photo if public/assets/img/<file> exists, otherwise a labelled
// placeholder with a sample photo (draft). <LocalPhoto> is for photos that must exist.
import { Icon } from "@/components/Icon";
import { A, hasImage, imgAttrs, isRealRemote, sampleFor, SZ_HALF } from "@/lib/images";

type PhProps = {
  file: string; w: number; h: number; label: string; desc: string; alt: string;
  cls?: string; caption?: string; sizes?: string;
};

export function Ph({ file, w, h, label, desc, alt, cls = "", caption = "", sizes = SZ_HALF }: PhProps) {
  const smp = sampleFor(file, w);
  const kind = isRealRemote(file) ? "real" : "sample";
  const exists = hasImage(file);
  const missingSample = kind !== "real" && !exists;
  return (
    <figure className={`ph ${cls}${missingSample ? " is-sample" : ""}`} style={{ aspectRatio: `${w}/${h}` }} suppressHydrationWarning>
      <div className="ph-inner" aria-hidden="true">
        <Icon name="image" />
        <strong>{label}</strong>
        <span className="ph-file">assets/img/{file}</span>
        <span className="ph-desc">{w} x {h} px · {desc}</span>
      </div>
      {exists ? (
        <img {...imgAttrs(file, sizes)} data-sample={smp} data-kind={kind} alt={alt} width={w} height={h} loading="lazy" decoding="async" suppressHydrationWarning />
      ) : (
        <img src={smp} data-tried="1" data-kind={kind} alt={alt} width={w} height={h} loading="lazy" decoding="async" suppressHydrationWarning />
      )}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

type LocalProps = {
  file: string; w: number; h: number; alt: string;
  cls?: string; frame?: string; sizes?: string; eager?: boolean;
};

export function LocalPhoto({ file, w, h, alt, cls = "", frame = "ph is-real", sizes = SZ_HALF, eager = false }: LocalProps) {
  if (!hasImage(file)) throw new Error(`Missing photo: public/assets/img/${file}`);
  const load = eager ? { loading: "eager" as const, fetchPriority: "high" as const } : { loading: "lazy" as const };
  return (
    <figure className={`${frame} ${cls}`} style={{ aspectRatio: `${w}/${h}` }} suppressHydrationWarning>
      <img {...imgAttrs(file, sizes)} data-kind="real" alt={alt} width={w} height={h} {...load} decoding="async" suppressHydrationWarning />
    </figure>
  );
}

/** Plain responsive <img> (logo, hospital photos, carousels). */
export function Img({ file, sizes, largest, alt, w, h, lazy = true, ...rest }:
  { file: string; sizes: string; largest?: number; alt: string; w: number; h: number; lazy?: boolean; [k: string]: unknown }) {
  return <img {...imgAttrs(file, sizes, largest)} alt={alt} width={w} height={h} {...(lazy ? { loading: "lazy" as const } : {})} decoding="async" suppressHydrationWarning {...rest} />;
}

export { A };
