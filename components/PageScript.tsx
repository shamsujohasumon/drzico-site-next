// Loads the site's own JavaScript.
// Built site (npm run build): a plain <script defer> tag. React is removed from the built pages, so
// nothing else is needed.
// Dev mode (npm run dev): React runs in the browser, so the script must wait until React has finished
// attaching to the page (afterInteractive). Otherwise the script changes the page first and React
// reports a "hydration" mismatch.
import Script from "next/script";

const DEV = process.env.NODE_ENV === "development";

export function PageScript({ src }: { src: string }) {
  return DEV ? <Script src={src} strategy="afterInteractive" /> : <script src={src} defer />;
}

/** Small inline script that must run before the page is shown (theme, image fallback). */
export function EarlyScript({ id, code }: { id: string; code: string }) {
  return DEV ? <Script id={id} strategy="beforeInteractive">{code}</Script> : <script dangerouslySetInnerHTML={{ __html: code }} />;
}
