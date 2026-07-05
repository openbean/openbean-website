// Layout for /demo/brain/recall — exports metadata for the client page.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What does AI remember? — Company Brain on OpenBean",
  description:
    "Ask the AI a question about Northwind. See what it recalls, with full provenance — which AI tool answered, which knowledge it cited, when the answer was approved.",
  alternates: { canonical: "https://openbean.xyz/demo/brain/recall" },
  robots: { index: true, follow: true },
};

export default function RecallLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
