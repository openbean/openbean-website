import "@/app/ui/home/enterprise-home.css";
import {
  EnterpriseNav,
  HeroSection,
  TrustStrip,
  ProblemSolutionSection,
  IndustryStrip,
  WhyOpenBeanGrid,
  FinalCTA,
  EnterpriseFooter,
} from "@/app/ui/home";

export default function Home() {
  return (
    <div className="ob">
      <EnterpriseNav />
      <HeroSection />
      <TrustStrip />
      <ProblemSolutionSection />
      <IndustryStrip />
      <WhyOpenBeanGrid />
      <FinalCTA />
      <EnterpriseFooter />
    </div>
  );
}
