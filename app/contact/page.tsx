import { EnterprisePageShell } from "@/app/ui/home";
import { ContactForm } from "./ContactForm";

export const metadata = {
  title: "Request an Enterprise Demo — OpenBean, the AI Transformation Platform",
  description:
    "Tell us about your organization, industry, deployment target, compliance regime, and timeline; a real human replies within one business day. The structured intake for the OpenBean maintainer team.",
  keywords: [
    "OpenBean contact",
    "Request an Enterprise Demo",
    "Talk to an AI Advisor",
    "OpenBean evaluation",
    "Company Brain demo",
  ],
  openGraph: {
    title: "Request an Enterprise Demo — OpenBean",
    description:
      "The structured intake for the OpenBean maintainer team. A real human replies within one business day.",
    type: "website",
    url: "https://openbean.xyz/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Request an Enterprise Demo — OpenBean",
    description: "A real human replies within one business day.",
  },
  alternates: { canonical: "https://openbean.xyz/contact" },
};

export default function ContactPage() {
  return (
    <EnterprisePageShell>
      <div className="ob-wrap ob-doc-wrap">
        <div className="ob-doc-hero">
          <p className="ob-eyebrow">Structured intake</p>
          <h1 className="ob-h1">Talk to a real person about your organization.</h1>
          <p className="ob-lead">
            Every field below helps our team understand your organization so we can give
            you a useful next step, not a generic reply. A real person — not a chatbot, not
            a calendar funnel — reads your answers and replies within one business day.
          </p>
          <div className="ob-doc-pills">
            <span className="ob-doc-pill">One business day reply</span>
            <span className="ob-doc-pill">No marketing follow-up</span>
            <span className="ob-doc-pill">No data sold, ever</span>
          </div>
        </div>
        <ContactForm />
      </div>
    </EnterprisePageShell>
  );
}
