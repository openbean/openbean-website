// The V16 Enterprise Delivery — the discovery intake page.
// The wizard is a client component; the page is a server
// component that imports it and provides the marketing
// surface around it.

import { EnterprisePageShell } from "@/app/ui/home";
import DiscoveryWizard from "./DiscoveryWizard";

export const metadata = {
  title: "Discovery Wizard — OpenBean Enterprise Delivery",
  description:
    "A 12-step guided intake. Tell us about your organization, your AI tool inventory, your compliance regime, your deployment preference, and your success criteria. The OpenBean delivery team will reply within 1 business day.",
  keywords: [
    "OpenBean discovery",
    "Enterprise delivery",
    "AI Transformation Platform",
    "Company Brain",
    "Enterprise Memory Platform",
  ],
  openGraph: {
    title: "Discovery Wizard — OpenBean Enterprise Delivery",
    description:
      "A 12-step guided intake for the OpenBean delivery team. A real human replies within 1 business day.",
    type: "website",
    url: "https://openbean.xyz/discovery",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discovery Wizard — OpenBean Enterprise Delivery",
    description: "A 12-step guided intake for the OpenBean delivery team.",
  },
  alternates: { canonical: "https://openbean.xyz/discovery" },
  robots: { index: true, follow: true },
};

export default function DiscoveryPage() {
  return (
    <main className="ob-doc">
      <div className="ob-wrap ob-doc-wrap">
        <section style={{ paddingTop: 60, paddingBottom: 20 }}>
          <p className="ent-eyebrow">Enterprise delivery · The first consultant</p>
          <h1 className="ob-doc-h1">The discovery wizard.</h1>
          <p className="lede" style={{ maxWidth: 720 }}>
            OpenBean is delivered as a professional service. The first
            step is a 12-question intake. The questions are the same
            questions an OpenBean delivery engineer would ask on a
            discovery call. The output is a discovery brief the
            sales engineer reads. A real human replies within 1
            business day.
          </p>
        </section>

        <section style={{ paddingTop: 16, paddingBottom: 60 }}>
          <DiscoveryWizard />
        </section>

        <section style={{ paddingTop: 24, paddingBottom: 60, borderTop: "1px solid var(--ob-line)" }}>
          <h2 style={{ fontFamily: "var(--nf-display, inherit), ui-sans-serif, sans-serif", fontSize: "1.3rem", fontWeight: 600, margin: "0 0 12px", color: "var(--ob-ink)" }}>
            What happens after you submit
          </h2>
          <ol style={{ paddingLeft: 20, color: "var(--ob-muted)", lineHeight: 1.7 }}>
            <li>The OpenBean delivery team reviews your answers (typically within 1 business day).</li>
            <li>A sales engineer emails you a <strong style={{ color: "var(--ob-ink)" }}>discovery summary</strong> (a 1-page recap of your answers + a recommended deployment architecture).</li>
            <li>If your readiness is &ldquo;Ready,&rdquo; the sales engineer attaches a <strong style={{ color: "var(--ob-ink)" }}>proposal draft</strong> to the reply.</li>
            <li>If your readiness is &ldquo;Additional discovery&rdquo; or &ldquo;Not ready,&rdquo; the sales engineer schedules a <strong style={{ color: "var(--ob-ink)" }}>follow-up call</strong> to address the missing items.</li>
            <li>The discovery is free. The follow-up call is free. The proposal is free. Nothing is invoiced until you sign a Statement of Work.</li>
          </ol>
        </section>

        <section style={{ paddingTop: 24, paddingBottom: 60, borderTop: "1px solid var(--ob-line)" }}>
          <h2 style={{ fontFamily: "var(--nf-display, inherit), ui-sans-serif, sans-serif", fontSize: "1.3rem", fontWeight: 600, margin: "0 0 12px", color: "var(--ob-ink)" }}>
            Prefer a quick chat instead?
          </h2>
          <p style={{ color: "var(--ob-muted)", maxWidth: 720 }}>
            The discovery wizard is the structured path. The{" "}
            <a href="/contact" style={{ color: "var(--ob-trust)" }}>contact form</a>{" "}
            is the unstructured path — use it if you have a quick
            question or want to talk to a human first. Both paths
            reach the same delivery team.
          </p>
        </section>
      </div>
    </main>
  );
}
