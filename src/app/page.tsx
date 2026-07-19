import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { PricingSection } from "@/components/PricingSection";
import { SmileSlider } from "@/components/SmileSlider";
import { AntiGravityChatWidget } from "@/components/AntiGravityChatWidget";

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <SmileSlider />
      <PricingSection />
      <AntiGravityChatWidget />
    </main>
  );
}
