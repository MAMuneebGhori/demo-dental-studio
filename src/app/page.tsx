import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TeamSection } from "@/components/TeamSection";
import { PricingSection } from "@/components/PricingSection";
import { LocationSection } from "@/components/LocationSection";
import { Footer } from "@/components/Footer";
import { AntiGravityChatWidget } from "@/components/AntiGravityChatWidget";

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <ServicesSection />
      <TeamSection />
      <PricingSection />
      <LocationSection />
      <Footer />
      <AntiGravityChatWidget />
    </main>
  );
}
