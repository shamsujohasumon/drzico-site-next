import type { ReactNode } from "react";
import { Document } from "@/components/Document";
export { rootMetadata as metadata, rootViewport as viewport } from "@/lib/layoutMeta";

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <Document lang="en">{children}</Document>;
}
