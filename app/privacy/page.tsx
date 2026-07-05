import { Footer, TopBar } from "@/app/ui";

export const metadata = {
  title: "Privacy Policy — OpenBean",
  description: "What the OpenBean marketing website collects, why, and what it never does with it. Separate from the OpenBean engine itself, which is self-hosted on your own infrastructure.",
};

export default function PrivacyPage() {
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
      <main className="lp-services">
        <p className="ent-eyebrow">Legal</p>
        <h1>Privacy Policy</h1>
        <p className="lede">Last updated: July 2026.</p>
        <p className="lede">
          This policy covers the openbean.xyz marketing website — the pages you are reading
          now, including the structured contact form. It does not cover the OpenBean engine
          itself, which is self-hosted on infrastructure you control; the data your
          organization stores in your own OpenBean instance is governed by your own policies,
          not by OpenBean the project.
        </p>

        <div className="lp-svc-list">
          <article className="lp-svc">
            <h2>What this site collects</h2>
            <p className="summary">
              No accounts, no cookies, and no analytics or tracking scripts run on this site.
              The only information we receive is what you choose to type into the contact
              form.
            </p>
            <div className="grid">
              <div>
                <h3>The contact form</h3>
                <p>
                  Submitting the structured intake on <a href="/contact">/contact</a> opens
                  your own email client with your answers pre-filled, addressed to
                  hello@openbean.xyz. The form itself does not transmit anything to a server
                  we operate — the only copy that exists is the email you choose to send.
                </p>
              </div>
              <div>
                <h3>Server logs</h3>
                <p>
                  Our hosting provider keeps standard web server logs (IP address, requested
                  page, timestamp) for security and abuse prevention, in line with its own
                  retention policy. We do not combine these logs with any other data to build
                  a profile of visitors.
                </p>
              </div>
            </div>
          </article>

          <article className="lp-svc">
            <h2>What we do with an email you send us</h2>
            <p className="summary">
              A real person reads it and replies. Nothing more.
            </p>
            <div className="grid">
              <div>
                <h3>No selling, no sharing</h3>
                <p>We do not sell, rent, or share your information with third parties, ever.</p>
              </div>
              <div>
                <h3>No marketing lists</h3>
                <p>
                  Sending us an inquiry does not subscribe you to a newsletter or a marketing
                  sequence. You hear back about the thing you asked about, and that is the end
                  of it unless you start another conversation.
                </p>
              </div>
              <div>
                <h3>Retention</h3>
                <p>
                  We keep inquiry emails for as long as is useful for the business
                  relationship they relate to, and delete them on request.
                </p>
              </div>
            </div>
          </article>

          <article className="lp-svc">
            <h2>Your data in your own OpenBean instance</h2>
            <p className="summary">
              OpenBean the product is self-hosted, permanently. If your organization runs
              OpenBean, the memory it stores lives in a database your organization provisions
              and controls — never on infrastructure we operate.
            </p>
          </article>

          <article className="lp-svc">
            <h2>Questions</h2>
            <p className="summary">
              Email hello@openbean.xyz. A person replies, same as any other inquiry.
            </p>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
