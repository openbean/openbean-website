// The V15 Enterprise Demo — Reset page. The brief's "one command, reset
// demo" requirement. The website is static (output: "export"), so the
// data is the build-time source of truth; a "reset" is a page reload
// that re-runs the seed. The button makes that explicit.

"use client";

import Link from "next/link";
import { useState } from "react";
import "@/app/ui/demo/demo.css";
import { DemoBar } from "@/app/ui/demo/DemoBar";
import { SEED_STATS } from "@/app/demo/data/northwind";

export default function DemoResetPage() {
  const [confirming, setConfirming] = useState(false);
  const [resetAt, setResetAt] = useState<string | null>(null);

  function reset() {
    const now = new Date().toISOString();
    setResetAt(now);
    setConfirming(false);
    // The brief's "one command" requirement is satisfied by reloading
    // the page — the seed runs at build time. A real, live OpenBean
    // instance would call the engine's reset endpoint instead.
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  return (
    <>
      <DemoBar active="reset" />
      <main className="ob-doc">
        <div className="ob-wrap ob-doc-wrap">
          <section className="ob-demo-hero">
            <div className="ob-demo-hero-card">
              <p className="ent-eyebrow">Reset the demo</p>
              <h1>One command. Fresh state.</h1>
              <p className="lede">
                The V15 brief&apos;s Part 7: &ldquo;Everything must be
                reproducible. One command. Reset demo. Fresh organization.
                Fresh memories. Fresh users. Fresh activity. Fresh audit
                trail. Repeatable forever.&rdquo;
              </p>
            </div>
          </section>

          <section className="ob-demo-section">
            <h2>What gets reset</h2>
            <p className="lede">
              The seed is the build-time source of truth. A reset
              reloads the page; the seed produces the same state every
              time. The current demo has:
            </p>
            <ul style={{ marginTop: 18, paddingLeft: 18, color: "var(--ob-muted)", lineHeight: 1.7 }}>
              <li><strong style={{ color: "var(--ob-ink)" }}>{SEED_STATS.people}</strong> people across 7 departments</li>
              <li><strong style={{ color: "var(--ob-ink)" }}>{SEED_STATS.projects}</strong> active projects</li>
              <li><strong style={{ color: "var(--ob-ink)" }}>{SEED_STATS.knowledge}</strong> pieces of company knowledge</li>
              <li><strong style={{ color: "var(--ob-ink)" }}>{SEED_STATS.pendingApprovals}</strong> AI proposals awaiting review</li>
              <li><strong style={{ color: "var(--ob-ink)" }}>{SEED_STATS.connections}</strong> active AI tool connections</li>
              <li><strong style={{ color: "var(--ob-ink)" }}>{SEED_STATS.activityEntries}</strong> activity entries in the last 30 days</li>
            </ul>
          </section>

          <section className="ob-demo-section">
            <h2>Reset</h2>
            {resetAt ? (
              <div className="ob-reset-card">
                <h2>Resetting…</h2>
                <p>The page is reloading. The seed will produce the fresh state on the next page load.</p>
                <p className="ob-kn-meta" style={{ marginTop: 8 }}>
                  <span>Reset initiated: {resetAt}</span>
                </p>
              </div>
            ) : confirming ? (
              <div className="ob-reset-card">
                <h2>Confirm reset</h2>
                <p>This reloads the page. The seed will produce the fresh state on the next page load. No data is lost — the seed is the build-time source of truth.</p>
                <div className="row">
                  <button className="ob-btn" onClick={() => setConfirming(false)}>Cancel</button>
                  <button className="ob-btn ob-btn-primary" onClick={reset}>Reset the demo</button>
                </div>
              </div>
            ) : (
              <div className="ob-reset-card">
                <h2>Reset the demo</h2>
                <p>Reload the page to see the seed&apos;s fresh state. The reset is reversible: every state is reproducible from the seed.</p>
                <div className="row">
                  <button className="ob-btn ob-btn-primary" onClick={() => setConfirming(true)}>Reset the demo</button>
                </div>
              </div>
            )}
          </section>

          <section className="ob-demo-section">
            <p className="lede">
              <Link href="/demo" className="ob-btn">← Back to the demo home</Link>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
