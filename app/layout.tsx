import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@/app/ui/tokens.css";
import "@/app/ui/landing.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://openbean.xyz"),
  title: "OpenBean - Governed AI Memory Infrastructure for the Enterprise",
  description:
    "Every AI assistant across your organization shares one governed, auditable memory - deployed inside your own infrastructure, under your own policies. Self-hosted, permanently. No vendor lock-in, no shared database, no exceptions.",
  openGraph: {
    title: "OpenBean - Governed AI Memory Infrastructure",
    description: "Your knowledge. Your policies. Your infrastructure.",
    images: ["/banner.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#050605",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
