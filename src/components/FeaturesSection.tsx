"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const features = [
  {
    title: "More personal than personal",
    desc: "After a complex diagnosis, each patient is assigned a Treatment Plan Coordinator, or Personal Concierge. He or she takes care to ensure that the entire process is flawless and personalized — from scheduling appointments to the tiniest details that make your experience enjoyable and give you peace of mind."
  },
  {
    title: "A result you can see in advance",
    desc: "We create a 3D digital smile design before treatment even starts. Not only do you know what the end result will be, but you can see it, influence it, and feel confident about every next step."
  },
  {
    title: "Peace and safety during every appointment",
    desc: "We believe that treatment starts with a feeling. The light, interior design, silence and the attitude of our team create an environment in which you can relieve stress and forget any previous perceptions of dentistry as an unpleasant experience."
  },
  {
    title: "Movie experience in a dentist's chair",
    desc: "We transform time in the dentist's chair into a pleasurable experience — choose your favorite movie, TV series or educational content and let the treatment flow seamlessly."
  },
  {
    title: "All in one place",
    desc: "Our clinic is equipped with the latest technology, allowing us to perform all necessary procedures in-house, saving you time and ensuring consistent, high-quality care."
  },
  {
    title: "Complete privacy",
    desc: "We offer private waiting rooms and treatment areas for patients who require absolute discretion and a serene environment before and after their procedures."
  }
];

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // latest is 0 to 1
    // We have 6 items. Divide the 0-1 range into 6 segments.
    let index = Math.floor(latest * 6);
    index = Math.max(0, Math.min(index, 5));
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  return (
    <section ref={containerRef} className="relative w-full h-auto min-[1600px]:h-[400vh] bg-[#0D241C]">
      
      {/* ----------------------------------------------------- */}
      {/* VERTICAL LIST (Shown at 90%, 100%, Mobile, etc.)        */}
      {/* ----------------------------------------------------- */}
      <div className="block min-[1600px]:hidden w-full px-6 md:px-12 py-24 md:py-32">
        
        {/* Title (Sharp Left) */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-[4.5rem] text-[#F5F7F5] font-medium tracking-tight mb-20 md:mb-32 text-left w-full"
        >
          Your smile starts here
        </motion.h2>
        
        {/* Feature Items (Centered) */}
        <div className="flex flex-col gap-20 md:gap-32 w-full max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col items-center text-center gap-6 md:gap-8"
            >
              <h3 className="text-2xl md:text-[2.2rem] text-[#D4B58E] font-medium tracking-wide">
                {i + 1}. {feature.title}
              </h3>
              <p className="text-base md:text-[1.1rem] leading-[1.8] text-white/80 font-light max-w-[800px] mx-auto">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ----------------------------------------------------- */}
      {/* SCROLLYTELLING WHEEL (Shown ONLY at <= 80% zoom)        */}
      {/* ----------------------------------------------------- */}
      <div className="hidden min-[1600px]:flex sticky top-0 w-full h-screen overflow-hidden flex-col items-center">
        
        {/* Title */}
        <div className="absolute top-16 left-16 z-30 pointer-events-none">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[4rem] text-[#F5F7F5] font-medium tracking-tight"
          >
            Your smile starts here
          </motion.h2>
        </div>

        {/* The Huge Wheel */}
        <div className="absolute top-[280px] left-1/2 -translate-x-1/2">
          
          {/* Animated Anchor Line dropping from the arc peak to the text with a small gap from the dot */}
          <motion.div 
            key={activeIndex}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 140, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute top-[25px] left-1/2 -translate-x-1/2 w-[1px] bg-white z-10" 
          />

          <motion.div 
            animate={{ rotate: -activeIndex * 45 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-[1100px] h-[1100px] rounded-full border border-white/10"
          >
            {features.map((_, i) => (
              <div 
                key={i} 
                className="absolute inset-0 w-full h-full"
                style={{ transform: `rotate(${i * 45}deg)` }}
              >
                {/* Marker Container at the top center of the wheel */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  
                  {/* Number Circle */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-[17px] transition-all duration-500 absolute -top-[69px] ${
                      activeIndex === i 
                        ? "bg-[#E5EDDE] text-[#0D241C] font-semibold shadow-[0_0_20px_rgba(229,237,222,0.4)] border-transparent" 
                        : "border border-white/30 text-white"
                    }`}
                  >
                    {i + 1}
                  </div>

                  {/* Connecting Line (upwards) */}
                  <div className={`w-[1px] h-5 absolute -top-[21px] transition-colors duration-500 ${
                    activeIndex === i ? "bg-[#D4B58E]" : "bg-white/20"
                  }`} />

                  {/* Golden Dot on the Arc */}
                  <div className={`w-2.5 h-2.5 rounded-full absolute -top-[5px] transition-all duration-500 ${
                    activeIndex === i ? "bg-[#D4B58E] scale-125 shadow-[0_0_10px_rgba(212,181,142,0.6)]" : "bg-[#D4B58E] opacity-50"
                  }`} />
                  
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Content (Static position inside the top of the wheel) */}
        <div className="absolute top-[470px] w-full max-w-3xl px-6 text-center z-10 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col gap-5 items-center"
            >
              <h3 className="text-[2.2rem] text-[#D4B58E] font-medium tracking-wide">
                {features[activeIndex].title}
              </h3>
              <p className="text-[1.1rem] leading-[1.7] text-white/80 font-light max-w-[700px] text-center mx-auto">
                {features[activeIndex].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </section>
  );
}
