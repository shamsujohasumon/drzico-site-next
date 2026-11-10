// <html>, <head> and <body> shared by every page (used by both root layouts: English and Bangla).
import fs from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import { asset } from "@/lib/assets";
import { EarlyScript } from "@/components/PageScript";

const FONTS = fs.readFileSync(path.join(process.cwd(), "content", "fonts.css"), "utf8");

// Runs before the page is shown: applies a saved dark/light choice (no flash), and if a photo fails
// to load, swaps in its sample photo or hides it so the labelled placeholder shows instead.
const EARLY_JS = `(function(){try{var t=localStorage.getItem("dz-theme");if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t)}catch(e){}
addEventListener("error",function(e){var i=e.target;if(!i||i.tagName!=="IMG"||!i.dataset||!i.dataset.kind)return;
if(i.dataset.sample&&!i.dataset.tried){i.dataset.tried="1";if(i.dataset.kind!=="real")i.parentNode.classList.add("is-sample");i.removeAttribute("srcset");i.src=i.dataset.sample}
else{i.parentNode.classList.remove("is-sample");i.hidden=true}},true)})();`;

export function Document({ lang, children }: { lang: "en" | "bn"; children: ReactNode }) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <link rel="preload" href="/assets/fonts/spectral-latin-600-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/assets/fonts/public-sans-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/assets/fonts/public-sans-latin-600-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/assets/fonts/public-sans-latin-700-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
        <style dangerouslySetInnerHTML={{ __html: FONTS }} />
        <link rel="stylesheet" href={asset("/assets/css/style.css")} />
        <EarlyScript id="dz-early" code={EARLY_JS} />
      </head>
      {/* Live site: no draft mode. To show the yellow "needs checking" highlights again while
          editing, add className="draft" here and the draft bar back in components/Shell.tsx. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
