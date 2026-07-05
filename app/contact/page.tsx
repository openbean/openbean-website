// The AI Receptionist's V1 structured intake (see docs/enterprise/AI_RECEPTIONIST.md).
// V1 has no backend: the form encodes the answers into a mailto URL and opens the
// operator's mail client with the full intake pre-formatted. This is a deliberate V1
// shape — see the design doc's "What this iteration ships" and the V2 section for why.
// The form's client-side validation enforces the fields the operator needs; the submit
// step is the only network behavior, and it is a mailto: by design.

import { Footer, TopBar } from "@/app/ui";
import { ContactForm } from "./ContactForm";

export const metadata = {
  title: "Talk to us — OpenBean",
  description: "The structured intake for the OpenBean maintainer team. Tell us about your organization, industry, deployment target, compliance regime, AI tool inventory, infrastructure, and timeline; a real human replies within one business day.",
};

export default function ContactPage() {
  return (
    <div className="lp ent">
      <TopBar
        tag="platform"
        right={
          <nav className="lp-nav" aria-label="Page sections">
            <a href="/#governance">Governance</a>
            <a href="/#architecture">Architecture</a>
            <a href="/#security">Security</a>
            <a href="/#deployment">Deployment</a>
            <a href="/services">Services</a>
            <a className="btn" href="/contact">Talk to us</a>
          </nav>
        }
      />
      <main className="lp-contact">
        <p className="ent-eyebrow">AI Receptionist · structured intake</p>
        <h1>Talk to a person who built the engine.</h1>
        <p className="lede">
          Every field on this form is a question the maintainer team needs answered before
          a useful next step is possible. A real human — not a chatbot, not a calendar
          funnel — reads your answers and replies within one business day.
        </p>
        <p className="promise">
          <span>one business day reply</span>
          <span>no marketing follow-up</span>
          <span>no data sold, ever</span>
        </p>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
