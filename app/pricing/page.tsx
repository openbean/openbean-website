// The V14 Pricing Philosophy page. There is no price on this page — the page
// is the explanation of why, and the four-step path to a quote when an
// organization is ready. V14 applies the new positioning layer
// (OpenBean / AI Transformation Platform / Company Brain) to the metadata.

import { EnterprisePageShell } from "@/app/ui/home";

export const metadata = {
  title: "Pricing — OpenBean, the AI Transformation Platform",
  description:
    "How OpenBean prices its work. No per-seat number, no per-claim metering. The price is the result of a Discovery conversation, with a four-step path from a contact form to a signed quote. The Discovery brief is the contract.",
  keywords: [
    "OpenBean pricing",
    "AI Transformation Platform pricing",
    "Company Brain pricing",
    "Enterprise Memory Platform pricing",
    "self-hosted AI pricing",
  ],
  openGraph: {
    title: "Pricing — OpenBean, the AI Transformation Platform",
    description:
      "How OpenBean prices its work. The price is the result of a Discovery conversation, with a four-step path from a contact form to a signed quote.",
    type: "website",
    url: "https://openbean.xyz/pricing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — OpenBean",
    description:
      "How OpenBean prices its work. The price is the result of a Discovery conversation.",
  },
  alternates: { canonical: "https://openbean.xyz/pricing" },
};

const CONTACT = "/contact";
const QUOTE = "/contact?intent=quote";

export default function PricingPage() {
  return (
    <EnterprisePageShell>
      <div className="ob-wrap ob-doc-wrap">
        <div className="ob-doc-hero">
          <p className="ob-eyebrow">Pricing philosophy</p>
          <h1 className="ob-h1">There is no price on this page. Here is why.</h1>
          <p className="ob-lead">
            OpenBean is self-hosted software your engineering team operates. The
            maintainer team does not meter it, does not count seats, and does
            not run a service your company’s knowledge lives inside. There is
            no per-seat or per-claim number that would mean what a buyer
            expects a SaaS price to mean, because the product does not behave
            like a SaaS product.
          </p>
        </div>

        <section className="ob-doc-section">
          <h2 className="ob-h2">What the maintainer team does sell</h2>
          <p className="ob-lead">
            When an organization wants hands-on help, the maintainer team
            sells Professional Services: named engagements with named
            deliverables and named exit conditions. The catalog is at{" "}
            <a href="/services">/services</a>. Nine services, no prices on
            the page, the same way.
          </p>
        </section>

        <section className="ob-doc-section">
          <h2 className="ob-h2">The three numbers that shape a price</h2>
          <ol>
            <li>
              <strong>The scope of the engagement.</strong> A four-week
              pilot with one team, one use case, and one deployment target
              is one number. A six-month multi-team rollout with migration,
              training, and a named on-call rotation is a different number.
              The Discovery gate is the conversation that names the scope.
            </li>
            <li>
              <strong>The tenure of the engagement.</strong> A four-week
              pilot is a one-time engagement. A twelve-month retainer that
              includes a named on-call engineer and quarterly reviews is a
              different number. The Professional Services page is the menu;
              the Discovery conversation is the order form.
            </li>
            <li>
              <strong>The environment the engagement runs against.</strong>{" "}
              A single-region VPS deployment is one number. A multi-region,
              air-gapped, or on-premise deployment with custom compliance
              controls is a different number. The Architecture Review is
              the conversation that names the environment.
            </li>
          </ol>
        </section>

        <section className="ob-doc-section">
          <h2 className="ob-h2">The four-step path to a quote</h2>
          <ol>
            <li>
              <strong>Contact form.</strong> Fill in{" "}
              <a href={QUOTE}>/contact?intent=quote</a> with the named
              scope, the named tenure, the named environment, and a real
              human’s email address. An acknowledgement within one business
              day, from a real human, with the next conversation scheduled.
            </li>
            <li>
              <strong>Discovery call.</strong> A 45-minute call with the
              maintainer team. The team names the Discovery brief and
              confirms it can support the named shape. A signed Discovery
              brief naming the scope, the tenure, the environment, the
              success criteria, and the price.
            </li>
            <li>
              <strong>Written quote.</strong> Attached to the Discovery
              brief, valid for 30 days. Names the deliverables, the
              milestones, the exit conditions, and the price. The quote is
              the contract the engagement runs against.
            </li>
            <li>
              <strong>Run the engagement.</strong> Sign, kick off, run.
              The maintainer team operates under the same Discovery brief,
              with the same named exit conditions, until the engagement
              ends. A working engagement and a written close-out report.
            </li>
          </ol>
        </section>

        <section className="ob-doc-section">
          <h2 className="ob-h2">What the maintainer team will not do</h2>
          <ul>
            <li>
              The team will not negotiate on the price for a scope it has
              not read. Every quote starts with a written Discovery brief.
            </li>
            <li>
              The team will not discount to close a quarter. The price is
              the price the engagement costs to do well; discounting it
              means doing it less well.
            </li>
            <li>
              The team will not bundle services the customer did not ask
              for. The catalog is at <a href="/services">/services</a>;
              the customer picks the ones it needs.
            </li>
          </ul>
        </section>

        <section className="ob-doc-section">
          <h2 className="ob-h2">When OpenBean is the wrong fit</h2>
          <ul>
            <li>
              A hosted or cloud version of OpenBean — there is none, and
              there will not be one. Self-hosting is the design, not a
              deployment option.
            </li>
            <li>
              24/7 phone support on a four-hour SLA — the maintainer team
              is small. A four-hour-SLA support contract is not on offer
              today.
            </li>
            <li>
              A SOC 2 / HIPAA / ISO 27001 attestation from OpenBean the
              project — the compliance posture of your deployment is your
              deployment’s posture, not the project’s.
            </li>
          </ul>
          <p>
            If any of these is what your organization needs, OpenBean is the
            wrong fit today. The honest answer is to use a different
            product, not to pretend OpenBean is something it is not.
          </p>
        </section>

        <div className="ob-doc-cta">
          <h2 className="ob-h2">Contact</h2>
          <p>
            <a className="ob-btn ob-btn-primary ob-btn-lg" href={QUOTE}>Request a quote</a>{" "}
            <a className="ob-btn ob-btn-lg" href={CONTACT}>General contact</a>
          </p>
        </div>
      </div>
    </EnterprisePageShell>
  );
}
