import type { ReactNode } from "react";
import { Document } from "@/components/Document";
export { rootMetadata as metadata, rootViewport as viewport } from "@/lib/layoutMeta";

/** Bangla pages (articles): same frame, html lang="bn". */
export default function BanglaLayout({ children }: { children: ReactNode }) {
  return <Document lang="bn">{children}</Document>;
}
