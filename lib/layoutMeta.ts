import type { Metadata, Viewport } from "next";
import { SITE_URL } from "@/lib/site";

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "48x48" }, { url: "/assets/img/icon-192.png", type: "image/png", sizes: "192x192" }],
    apple: "/assets/img/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};
export const rootViewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#0A3A63" };
