import { EnterprisePageShell } from "@/app/ui/home";

export const metadata = {
  title: "Privacy Policy — OpenBean",
  description: "What the OpenBean marketing website collects, why, and what it never does with it. Separate from the OpenBean engine itself, which you can self-host or run on OpenBean's managed hosting.",
};

export default function PrivacyPage() {
  return (
    <EnterprisePageShell>
      <div className="ob-wrap ob-doc-wrap">
        <div className="ob-doc-hero">
          <p className="ob-eyebrow">Legal</p>
          <h1 className="ob-h1">Privacy Policy</h1>
          <p className="ob-lead">Last updated: July 2026.</p>
          <p className="ob-lead">
            This policy covers the openbean.xyz marketing website — the pages you are reading
            now, including the structured contact form. It does not cover the OpenBean engine
            itself, whether you self-host it on infrastructure you control or run it on
            OpenBean&rsquo;s managed hosting; either way, the data your organization stores in
            your OpenBean instance is governed by your own policies, not by OpenBean the
            project.
          </p>
        </div>

        <div className="ob-doc-list">
          <article className="ob-doc-card">
            <h2>What this site collects</h2>
            <p className="ob-doc-summary">
              No accounts, no cookies, and no analytics or tracking scripts run on this site.
              The only information we receive is what you choose to type into the contact
              form.
            </p>
            <div className="ob-doc-grid">
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

          <article className="ob-doc-card">
            <h2>What we do with an email you send us</h2>
            <p className="ob-doc-summary">
              A real person reads it and replies. Nothing more.
            </p>
            <div className="ob-doc-grid">
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

          <article className="ob-doc-card">
            <h2>Your data in your own OpenBean instance</h2>
            <p className="ob-doc-summary" style={{ marginBottom: 0 }}>
              OpenBean is available self-hosted or as managed hosting. If you self-host, the
              memory it stores lives in a database your organization provisions and controls
              entirely — never on infrastructure we operate. If you use managed hosting, we
              operate the infrastructure on your behalf, but the data itself stays yours: your
              organization sets the governance policy, and access, retention, and deletion are
              controlled by that policy, not by us.
            </p>
          </article>

          <article className="ob-doc-card">
            <h2>Questions</h2>
            <p className="ob-doc-summary" style={{ marginBottom: 0 }}>
              Email hello@openbean.xyz. A person replies, same as any other inquiry.
            </p>
          </article>
        </div>
      </div>
    </EnterprisePageShell>
  );
}
