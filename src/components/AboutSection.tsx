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
    <section id="about" ref={targetRef} className="relative h-[300vh] bg-[#E5EDDE] text-[#0D241C]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Left Column - Sticky Text */}
          <div className="flex flex-col justify-center h-full">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[#0D241C] mb-8 leading-tight">
              Clinical Experience <br/>Pillars
            </h2>
            <p className="text-xl md:text-2xl font-light tracking-tight text-[#0D241C]/60 max-w-lg">
              We shift your psychological state from clinical anxiety to premium spa hospitality. Our mechanics ensure smooth sailing through every procedure.
            </p>
          </div>

          {/* Right Column - Sliding Cards */}
          <div className="relative h-[80vh] overflow-hidden hidden md:block">
            <motion.div style={{ y: yRight }} className="absolute top-0 w-full flex flex-col gap-12 pt-[40vh] pb-[40vh]">
              {pillars.map(pillar => (
                <div key={pillar.id} className="bg-transparent border-b border-[#0D241C]/10 flex flex-col justify-center min-h-64 pb-12">
                  <div className="text-[#0D241C]/20 text-6xl font-light mb-6 tracking-tight">0{pillar.id}</div>
                  <h3 className="text-3xl font-light tracking-tight text-[#0D241C] mb-4">{pillar.title}</h3>
                  <p className="text-[#0D241C]/60 text-xl font-light tracking-tight leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Mobile Fallback */}
          <div className="md:hidden flex flex-col gap-12 pb-32 h-[80vh] overflow-y-auto pt-16 no-scrollbar">
            {pillars.map(pillar => (
                <div key={pillar.id} className="bg-transparent border-b border-[#0D241C]/10 flex flex-col justify-center pb-12">
                  <div className="text-[#0D241C]/20 text-5xl font-light mb-4 tracking-tight">0{pillar.id}</div>
                  <h3 className="text-2xl font-light tracking-tight text-[#0D241C] mb-4">{pillar.title}</h3>
                  <p className="text-[#0D241C]/60 font-light text-lg">{pillar.desc}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
