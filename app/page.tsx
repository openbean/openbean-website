// The V17 home page — simplified from V14's fourteen sections to eight.
// One promise carries the page: "Your company never loses what it knows."
//
//  1. Nav          six flat links + Request Evaluation
//  2. Hero         the promise + the Memory Lifecycle (signature element)
//  3. Problem      twelve words
//  4. How it works Remember → Review → Use
//  5. Proof        one real screenshot + the live demo door
//  6. Why OpenBean four benefits, one sentence each
//  7. Security     "Your knowledge stays yours." + four chips
//  8. Evaluation   honest 30-day terms → Final CTA → footer
//
// The audit, keep/merge/delete decisions, and copy rationale live in the
// engine repo: docs/brand/08-HOMEPAGE_SIMPLIFICATION.md.

import "@/app/ui/home/enterprise-home.css";
import "@/app/ui/home/enterprise-v14.css";
import "@/app/ui/home/enterprise-v17.css";
import {
  EnterpriseNav,
  HeroSection,
  ProblemStrip,
  HowItWorksSection,
  ProofSection,
  WhyOpenBeanSection,
  EnterpriseSecuritySection,
  EvaluationCTA,
  FinalCTA,
  EnterpriseFooter,
} from "@/app/ui/home";

export default function Home() {
  return (
    <div className="ob">
      <EnterpriseNav />
      <HeroSection />
      <ProblemStrip />
      <HowItWorksSection />
      <ProofSection />
      <WhyOpenBeanSection />
      <EnterpriseSecuritySection />
      <EvaluationCTA />
      <FinalCTA />
      <EnterpriseFooter />
    </div>
  );
}
