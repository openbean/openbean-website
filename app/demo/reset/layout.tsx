// Layout for /demo/reset — exports metadata for the client page.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset the demo — Northwind on OpenBean",
  description:
    "Reset the demo to a fresh state in one click. The seed runs at build time; a page reload shows the fresh state. The reset is one of the V15 brief's 'one command, reset demo' requirements.",
  alternates: { canonical: "https://openbean.xyz/demo/reset" },
  robots: { index: true, follow: true },
};

export default function ResetLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
