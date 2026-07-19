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

  const pillars = [
    { id: 1, title: "More personal than personal", desc: "After a complex diagnosis, each patient is assigned a Treatment Plan Coordinator..." },
    { id: 2, title: "A result you can see in advance", desc: "We create a 3D digital smile design before treatment even starts..." },
    { id: 3, title: "Peace and safety during every appointment", desc: "We believe that treatment starts with a feeling..." },
    { id: 4, title: "Movie experience in a dentist's chair", desc: "Choose your favourite movie, TV series or educational content..." },
    { id: 5, title: "All in one place", desc: "Therapists, prosthodontists, endodontist, implantologists, aestheticians and hygienists are all here..." },
    { id: 6, title: "Complete privacy", desc: "Treatment takes place in quiet, enclosed premises." }
  ];

  return (
    <section id="about" ref={targetRef} className="relative h-[300vh] bg-cashmere text-foreground">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left Column - Sticky Text */}
          <div className="flex flex-col justify-center h-full">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-terracotta mb-6 leading-tight">
              Clinical Experience <br/>Pillars
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 max-w-md">
              We shift your psychological state from clinical anxiety to premium spa hospitality. Our mechanics ensure smooth sailing through every procedure.
            </p>
          </div>

          {/* Right Column - Sliding Cards */}
          <div className="relative h-[80vh] overflow-hidden rounded-2xl hidden md:block">
            <motion.div style={{ y: yRight }} className="absolute top-0 w-full flex flex-col gap-6 pt-[40vh] pb-[40vh]">
              {pillars.map(pillar => (
                <div key={pillar.id} className="bg-alabaster p-10 rounded-2xl shadow-xl border border-terracotta/10 flex flex-col justify-center min-h-64 transform transition-all hover:scale-[1.02]">
                  <div className="text-terracotta/20 text-5xl font-black mb-4">0{pillar.id}</div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{pillar.title}</h3>
                  <p className="text-foreground/70 text-lg leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Mobile Fallback */}
          <div className="md:hidden flex flex-col gap-6 pb-24 h-[80vh] overflow-y-auto pt-12 no-scrollbar">
            {pillars.map(pillar => (
                <div key={pillar.id} className="bg-alabaster p-8 rounded-2xl shadow-lg border border-terracotta/10 flex flex-col justify-center">
                  <div className="text-terracotta/20 text-4xl font-black mb-2">0{pillar.id}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{pillar.title}</h3>
                  <p className="text-foreground/70">{pillar.desc}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
