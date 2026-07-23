import { StackingCards, StackingCardItem } from "./ui/stacking-cards";
import { ServiceGrid } from "./ui/service-grid";
import { servicesData } from "@/data/services";
import Link from "next/link";

export function ServicesSection() {
  const topServices = servicesData.slice(0, 5);
  const bottomServices = servicesData.slice(5).map(s => ({
    ...s,
    href: `/services/${s.slug}`
  }));

  return (
    <>
      <section id="services">
        {/* Top Layout - Stacking Cards */}
        <div className="bg-[#E5EDDE] py-16 md:py-32 relative">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 mb-24 text-center">
            <h2 className="text-4xl md:text-8xl font-light tracking-tight text-[#0D241C] mb-6">Signature Services</h2>
            <p className="text-xl md:text-2xl text-[#0D241C]/60 font-light max-w-2xl mx-auto">
              Experience world-class dental care with our premium, specialized treatments designed for perfection.
            </p>
          </div>
          
          <StackingCards 
            totalCards={topServices.length} 
            className="w-full max-w-[1200px] mx-auto px-4 sm:px-8"
            scaleMultiplier={0.04}
          >
            {topServices.map((service, i) => (
              <StackingCardItem 
                key={service.id} 
                index={i} 
                topPosition={`${10 + i * 2}%`}
                className="h-[60vh] min-h-[400px] md:h-[70vh] mb-[15vh]" // margin-bottom gives scroll distance before the next card hits the top
              >
                <Link href={`/services/${service.slug}`} className="block w-full h-full">
                  <div 
                    className="relative w-full h-full rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl group border border-[#0D241C]/5 bg-[#0D241C]"
                  >
                    <img 
                      src={service.img} 
                      alt={service.name} 
                      className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D241C]/90 via-[#0D241C]/20 to-transparent transition-opacity duration-700" />
                    
                    <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end text-[#E5EDDE]">
                      <div className="overflow-hidden mb-2">
                        <span className="block text-2xl font-light tracking-widest opacity-80 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                          {service.id}
                        </span>
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="text-4xl md:text-7xl font-light tracking-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                          {service.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              </StackingCardItem>
            ))}
          </StackingCards>
        </div>

        {/* Bottom Layout - Animated Grid */}
        <div className="bg-[#0D241C]">
          <ServiceGrid
            title="General Care"
            subtitle="Essential treatments to maintain your perfect smile."
            services={bottomServices}
            className="py-32"
          />
        </div>
      </section>
    </>
  );
}
