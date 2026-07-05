import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Archivo, IBM_Plex_Mono, Inter } from "next/font/google";
import "@openbean/ui/tokens.css";

// The landing page's three voices: Inter carries the body (the brand system font),
// Archivo carries the display headlines — a confident, slightly condensed grotesk
// built for enterprise infrastructure credibility, not a startup's rounded warmth —
// IBM Plex Mono is the "record" voice: provenance, commands, invariant labels.
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const displayFace = Archivo({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://openbean.xyz"),
  title: "OpenBean — Governed AI Memory Infrastructure for the Enterprise",
  description:
    "Every AI assistant across your organization shares one governed, auditable memory — deployed inside your own infrastructure, under your own policies. Self-hosted, permanently. No vendor lock-in, no shared database, no exceptions.",
  openGraph: {
    title: "OpenBean — Governed AI Memory Infrastructure",
    description: "Your knowledge. Your policies. Your infrastructure.",
    images: ["/banner.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#050605",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${displayFace.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
