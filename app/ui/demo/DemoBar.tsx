"use client";

// The demo's top bar. Holds the global state for the guided tour: which
// step the visitor is on, whether the tour is open, and which scenario
// they last visited. The bar is sticky and lives above every demo page.
//
// The tour is a 6-step narrative overlay. Steps 1-5 are the brief's 5 named
// steps; step 6 is the "another employee benefits" closure that makes the
// loop a story, not a checklist.

import { useEffect, useState } from "react";
import Link from "next/link";

const TOUR_STEPS = [
  {
    n: 1,
    title: "An employee asks the AI a question.",
    body:
      "A new sales rep signs in to the Company Brain and asks: 'what's our parental leave policy?' The question is simple. The answer matters.",
  },
  {
    n: 2,
    title: "The AI recalls trusted company knowledge.",
    body:
      "The AI searches the Company Brain for the most relevant piece of trusted knowledge. The answer is the '16 weeks for all caregivers' policy, approved by Margaret Chen on 2025-11-22. The full chain of custody is shown: who proposed it, who approved it, when.",
  },
  {
    n: 3,
    title: "The AI proposes something new.",
    body:
      "The AI also flags a related proposal: 'add a veteran hiring preference to the recruiting policy.' The proposal is from the HR AI (Copilot), submitted 2 weeks ago, and is awaiting Lena Kowalski's review. The rep sees both the trusted answer and the new proposal in one view.",
  },
  {
    n: 4,
    title: "A manager reviews the proposal.",
    body:
      "Lena reviews the proposal in the approval queue. She sees the AI's reasoning, the proposed change, and the trust score. She can approve, retract, or send back for more analysis. Every decision is itself a record in the log.",
  },
  {
    n: 5,
    title: "The new knowledge becomes trusted.",
    body:
      "When Lena approves, the proposal becomes trusted. Every other AI tool, in every other department, sees the new policy. The next time anyone asks the AI about hiring, the answer includes the veteran preference.",
  },
  {
    n: 6,
    title: "Another employee benefits.",
    body:
      "Six months later, a new engineering hire asks: 'do we have a parental leave policy?' The answer is the same trusted policy. The audit log shows when it was proposed, when it was approved, who approved it, and who has recalled it since. The company never lost important knowledge again.",
  },
];

type DemoBarProps = {
  active?: "home" | "tour" | "company" | "people" | "connections" | "brain" | "scenarios" | "activity" | "reset";
  cta?: { label: string; href: string };
};

export function DemoBar({ active, cta }: DemoBarProps) {
  const [tourOpen, setTourOpen] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [tourStarted, setTourStarted] = useState(false);

  // Allow starting the tour from anywhere via the "Start the tour" CTA.
  function startTour() {
    setTourStarted(true);
    setTourStep(0);
    setTourOpen(true);
  }
  function next() {
    if (tourStep < TOUR_STEPS.length - 1) {
      setTourStep(tourStep + 1);
    } else {
      setTourOpen(false);
    }
  }
  function skip() {
    setTourOpen(false);
  }

  // Keyboard navigation.
  useEffect(() => {
    if (!tourOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") skip();
      if (e.key === "Enter" || e.key === "ArrowRight") next();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  const step = TOUR_STEPS[tourStep];

  return (
    <div className="ob-demo">
      <div className="ob-demo-bar">
        <div className="ob-demo-bar-inner">
          <div className="ob-demo-bar-label">
            <span className="ob-demo-bar-pulse" aria-hidden="true" />
            <span>Live demo</span>
          </div>
          <Link href="/demo" className="ob-demo-bar-name">
            Northwind Manufacturing
          </Link>
          <nav className="ob-demo-bar-nav" aria-label="Demo sections">
            <Link href="/demo" data-active={active === "home" || undefined}>Overview</Link>
            <Link href="/demo/company" data-active={active === "company" || undefined}>Company</Link>
            <Link href="/demo/people" data-active={active === "people" || undefined}>People</Link>
            <Link href="/demo/connections" data-active={active === "connections" || undefined}>AI tools</Link>
            <Link href="/demo/brain" data-active={active === "brain" || undefined}>Company Brain</Link>
            <Link href="/demo/scenarios" data-active={active === "scenarios" || undefined}>Scenarios</Link>
            <Link href="/demo/activity" data-active={active === "activity" || undefined}>Activity</Link>
            <Link href="/demo/reset" data-active={active === "reset" || undefined}>Reset</Link>
          </nav>
          <div className="ob-demo-bar-cta">
            {cta ? (
              <a className="ob-btn ob-btn-primary ob-btn-sm" href={cta.href}>
                {cta.label}
              </a>
            ) : null}
            <button
              type="button"
              className="ob-btn ob-btn-sm"
              onClick={startTour}
              aria-label="Start the guided tour"
            >
              Start the tour
            </button>
          </div>
        </div>
      </div>

      {tourOpen ? (
        <div
          className="ob-tour"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ob-tour-title"
        >
          <div className="ob-tour-card">
            <p className="ob-tour-step">
              Step {step.n} of {TOUR_STEPS.length} · {tourStarted ? "In progress" : "Welcome"}
            </p>
            <h2 id="ob-tour-title">{step.title}</h2>
            <p>{step.body}</p>
            <div className="ob-tour-progress" aria-hidden="true">
              {TOUR_STEPS.map((_, i) => (
                <div
                  key={i}
                  className="ob-tour-progress-step"
                  data-done={i < tourStep || undefined}
                  data-current={i === tourStep || undefined}
                />
              ))}
            </div>
            <div className="ob-tour-cta">
              <button type="button" className="ob-tour-skip" onClick={skip}>
                Skip the tour
              </button>
              <div>
                <button
                  type="button"
                  className="ob-btn ob-btn-sm"
                  onClick={() => setTourStep(Math.max(0, tourStep - 1))}
                  disabled={tourStep === 0}
                  aria-label="Previous step"
                  style={{ marginRight: 8 }}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="ob-btn ob-btn-primary ob-btn-sm"
                  onClick={next}
                >
                  {tourStep === TOUR_STEPS.length - 1 ? "Finish the tour" : "Next step"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
