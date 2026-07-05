import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@/app/ui/tokens.css";
import "@/app/ui/landing.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://openbean.xyz"),
  title: "OpenBean - The Memory Layer Your Business Can Trust",
  description:
    "OpenBean captures, organizes, and verifies important business knowledge so your AI agents, tools, and teams always work with the right context. Deployed on your own infrastructure, under your own control.",
  openGraph: {
    title: "OpenBean - The Memory Layer Your Business Can Trust",
    description: "Verified. Governed. Always up to date.",
    images: ["/banner.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#05070a",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
