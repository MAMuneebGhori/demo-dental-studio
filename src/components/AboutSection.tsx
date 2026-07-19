"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function AboutSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const yRight = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const cards = [
    { id: 1, title: "Premium Care", desc: "Experience dentistry like a spa." },
    { id: 2, title: "Advanced Tech", desc: "State-of-the-art equipment." },
    { id: 3, title: "Expert Team", desc: "Highly trained professionals." },
    { id: 4, title: "Painless", desc: "Comfort at every step." },
    { id: 5, title: "Aesthetics", desc: "Perfect your smile." },
    { id: 6, title: "Longevity", desc: "Results that last a lifetime." }
  ];

  return (
    <section id="about" ref={targetRef} className="relative h-[300vh] bg-cashmere text-foreground">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left Column - Sticky Text */}
          <div className="flex flex-col justify-center h-full">
            <h2 className="text-4xl md:text-6xl font-bold text-terracotta mb-6">Anti-Gravity<br/>Experience</h2>
            <p className="text-lg md:text-xl text-foreground/80 max-w-md">
              We shift your psychological state from clinical anxiety to premium spa hospitality. Our mechanics ensure smooth sailing through every procedure.
            </p>
          </div>

          {/* Right Column - Sliding Cards */}
          <div className="relative h-[80vh] overflow-hidden rounded-2xl hidden md:block">
            <motion.div style={{ y: yRight }} className="absolute top-0 w-full flex flex-col gap-6 pt-[40vh] pb-[40vh]">
              {cards.map(card => (
                <div key={card.id} className="bg-alabaster p-8 rounded-xl shadow-lg border border-terracotta/20 flex flex-col justify-center h-64">
                  <h3 className="text-2xl font-bold text-terracotta mb-2">{card.title}</h3>
                  <p className="text-foreground/70">{card.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Mobile Fallback */}
          <div className="md:hidden flex flex-col gap-4 pb-24">
            {cards.map(card => (
                <div key={card.id} className="bg-alabaster p-6 rounded-xl shadow-lg border border-terracotta/20 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-terracotta mb-2">{card.title}</h3>
                  <p className="text-foreground/70">{card.desc}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
