import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "@/app/ui/tokens.css";
import "@/app/ui/home/enterprise-base.css";

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--nf-body",
  display: "swap",
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--nf-display",
  display: "swap",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--nf-mono",
  display: "swap",
});

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
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
