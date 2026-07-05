// The V14 home page — the 14-section flow the V14 brief mandates:
//  1. Hero
//  2. Business Outcomes
//  3. How It Works
//  4. Why Companies Choose OpenBean
//  5. Enterprise Security
//  6. Deployment Options
//  7. Company Brain
//  8. Enterprise Demo
//  9. Customer Journey
// 10. Pricing Philosophy
// 11. (FAQ lives at /faq; linked from nav)
// 12. (Pricing philosophy section above already covers pricing)
// 13. (Contact enterprise is the FinalCTA + EnterpriseFooter)
// 14. (Footer is EnterpriseFooter)
//
// The CTA hierarchy is: "Request an Enterprise Demo" (primary) and
// "Talk to an AI Advisor" (secondary). GitHub is not on the home page
// primary CTAs; it lives in the EnterpriseFooter and the navigation's
// Company menu, demoted to secondary.

import "@/app/ui/home/enterprise-home.css";
import "@/app/ui/home/enterprise-v14.css";
import {
  EnterpriseNav,
  HeroSection,
  ProblemSolutionSection,
  IndustryStrip,
  WhyOpenBeanGrid,
  FinalCTA,
  EnterpriseFooter,
  BusinessOutcomesSection,
  HowItWorksSection,
  WhyChooseSection,
  EnterpriseSecuritySection,
  DeploymentOptionsSection,
  CompanyBrainSection,
  EnterpriseDemoSection,
  CustomerJourneySection,
  PricingPhilosophySection,
} from "@/app/ui/home";

export default function Home() {
  return (
    <div className="ob">
      <EnterpriseNav />
      <HeroSection />
      <BusinessOutcomesSection />
      <HowItWorksSection />
      <WhyChooseSection />
      <ProblemSolutionSection />
      <EnterpriseSecuritySection />
      <DeploymentOptionsSection />
      <CompanyBrainSection />
      <IndustryStrip />
      <EnterpriseDemoSection />
      <CustomerJourneySection />
      <PricingPhilosophySection />
      <WhyOpenBeanGrid />
      <FinalCTA />
      <EnterpriseFooter />
    </div>
  );
}
