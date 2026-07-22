import { HeroSection } from "@/components/HeroSection";
import { ConfidenceSection } from "@/components/ConfidenceSection";
import { AboutSection } from "@/components/AboutSection";
import { StickyScrollReveal } from "@/components/StickyScrollReveal";
import { FeaturesSection } from "@/components/FeaturesSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TeamSection } from "@/components/TeamSection";
import { TeamIntroSection } from "@/components/TeamIntroSection";
import { PricingSection } from "@/components/PricingSection";
import { FaqSection } from "@/components/FaqSection";
import { LocationSection } from "@/components/LocationSection";
import { Footer } from "@/components/Footer";
export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <ConfidenceSection />
      <AboutSection />
      <FeaturesSection />
      <StickyScrollReveal />
      <PortfolioSection />
      <ServicesSection />
      <TeamIntroSection />
      <TeamSection />
      <PricingSection />
      <FaqSection />
      <LocationSection />
      <Footer />
    </main>
  );
}
