import "@/app/ui/home/enterprise-home.css";
import {
  EnterpriseNav,
  HeroSection,
  ProblemSolutionSection,
  IndustryStrip,
  WhyOpenBeanGrid,
  FinalCTA,
  EnterpriseFooter,
} from "@/app/ui/home";
// The home route composes the nav/footer directly (rather than via
// EnterprisePageShell) because its sections sit flush against the nav/footer
// with no shared <main> padding — every other page uses the shell.

export default function Home() {
  return (
    <div className="ob">
      <EnterpriseNav />
      <HeroSection />
      <WhyOpenBeanGrid />
      <IndustryStrip />
      <ProblemSolutionSection />
      <FinalCTA />
      <EnterpriseFooter />
    </div>
  );
}
