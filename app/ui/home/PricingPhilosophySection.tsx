// V14: Pricing Philosophy section. A short, plain-language explanation that
// links out to the full /pricing page. Lives on the home page so the "Why is
// there no price?" question is answered before the CTA is hit.

const REQUEST_DEMO = "/contact?intent=demo";

export function PricingPhilosophySection() {
  return (
    <section className="ob-section" id="pricing-philosophy">
      <div className="ob-wrap">
        <p className="ob-eyebrow" style={{ justifyContent: "center", display: "flex" }}>Pricing philosophy</p>
        <h2 className="ob-h2 ob-center">There is no price on this page. Here is why.</h2>
        <p className="ob-lead ob-center" style={{ maxWidth: "62ch", margin: "18px auto 0" }}>
          OpenBean is self-hosted software your engineering team operates. The maintainer
          team does not meter it, does not count seats, and does not run a service your
          company’s knowledge lives inside. There is no per-seat or per-claim number that
          would mean what a buyer expects a SaaS price to mean.
        </p>
        <p className="ob-body ob-center" style={{ maxWidth: "62ch", margin: "24px auto 0" }}>
          The price is the result of a Discovery conversation, not a number on a page.
          The four-step path to a quote is on the <a href="/pricing">pricing page</a>.
        </p>
        <div className="ob-cta-row ob-center" style={{ marginTop: "24px" }}>
          <a className="ob-btn ob-btn-lg" href="/pricing">Read the pricing philosophy</a>
          <a className="ob-btn ob-btn-primary ob-btn-lg" href={REQUEST_DEMO}>
            Request an Enterprise Demo
          </a>
        </div>
      </div>
    </section>
  );
}
