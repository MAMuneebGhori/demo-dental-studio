"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    { id: "01", name: "Complex diagnostics" },
    { id: "02", name: "Professional hygiene" },
    { id: "03", name: "Veneers" },
    { id: "04", name: "Dental implants" },
    { id: "05", name: "ALL-ON-X" },
    { id: "06", name: "Sedation and anaesthesia" },
    { id: "07", name: "Therapy" },
    { id: "08", name: "Endodontics" },
    { id: "09", name: "Surgery" },
    { id: "10", name: "Aligners" },
  ];

  return (
    <section id="services" className="py-24 bg-alabaster relative">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-terracotta mb-16">Our Services</h2>
        
        <div className="relative border-t border-terracotta/20">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="group border-b border-terracotta/20 py-6 md:py-8 flex items-center justify-between cursor-pointer transition-colors hover:bg-cashmere/30 px-4 md:px-8 -mx-4 md:-mx-8"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-center gap-6">
                <span className="text-terracotta/50 font-mono text-xl">{service.id}</span>
                <span className="text-2xl md:text-4xl font-medium text-foreground group-hover:text-terracotta transition-colors">{service.name}</span>
              </div>
              <div className="w-10 h-10 rounded-full border border-terracotta/30 flex items-center justify-center group-hover:bg-terracotta group-hover:text-white transition-all transform group-hover:scale-110">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
          ))}
          
          {/* Hover Image Reveal */}
          <div className="hidden lg:block absolute top-0 right-10 w-[400px] h-[500px] pointer-events-none z-10" style={{ transform: "translateY(-10%)" }}>
            <AnimatePresence>
              {hoveredIndex !== null && (
                <motion.div
                  key={hoveredIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                >
                  <img 
                    src={`https://images.unsplash.com/photo-1598256989800-fea5ce20dded?auto=format&fit=crop&w=800&q=80&sig=${hoveredIndex}`} 
                    alt={services[hoveredIndex].name}
                    className="w-full h-full object-cover filter grayscale contrast-75 brightness-110"
                  />
                  <div className="absolute inset-0 bg-terracotta/20 mix-blend-overlay"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
