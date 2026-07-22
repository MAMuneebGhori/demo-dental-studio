"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Pause, Play } from "lucide-react";

const images = [
  "/eq2.jpg",
  "/eq3.jpg",
  "/eq4.jpg",
  "/eq5.jpg",
  "/eq6.jpg",
  "/autoclave-terlizer.jpg"
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-[#E5EDDE]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex flex-col lg:flex-row justify-between items-center relative z-10 gap-16">
        
        {/* Left Column - Image Carousel */}
        <div className="flex flex-col gap-6 w-full lg:w-auto items-start">
          <div className="relative w-[280px] md:w-[320px] aspect-square lg:aspect-[4/5] rounded-sm overflow-hidden shadow-sm bg-black/5">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
                alt={`Dental equipment ${currentIndex + 1}`}
              />
            </AnimatePresence>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-4 w-full max-w-[320px]">
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0D241C] text-white hover:bg-[#0D241C]/90 transition-colors shadow-sm"
              aria-label={isPaused ? "Play" : "Pause"}
            >
              {isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
            </button>
            
            <div className="flex items-center gap-2 h-10 px-5 rounded-full bg-[#0D241C] shadow-sm">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsPaused(true);
                  }}
                  className={`relative h-2 rounded-full overflow-hidden transition-all duration-300 ease-out shrink-0 ${
                    idx === currentIndex 
                      ? "w-8 bg-white/20" 
                      : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  {idx === currentIndex && (
                    <motion.div
                      key={currentIndex + (isPaused ? "-paused" : "")}
                      className="absolute left-0 top-0 bottom-0 bg-white"
                      initial={{ width: isPaused ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ 
                        duration: isPaused ? 0 : 3.5, 
                        ease: "linear" 
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Typography */}
        <div className="relative w-full lg:w-[480px] xl:w-[540px]">
          
          <div className="relative pl-6 flex flex-col gap-12">
            {/* Animated Scroll Line spanning BOTH text blocks */}
            <div className="absolute left-0 top-1 bottom-1 w-[1px] bg-[#0D241C]/20">
              <motion.div 
                style={{ height: lineHeight }} 
                className="w-[1.5px] bg-[#0D241C] origin-top absolute -left-[0.25px]"
              />
            </div>

            <div>
              <h2 className="text-xl md:text-[1.35rem] leading-relaxed font-normal text-[#0D241C] tracking-tight">
                In our care, you'll receive not only treatment and a perfect smile, but also care, openness and support all the way to the result. Our mission is to change the perception of dentistry.
              </h2>
            </div>

            <div className="flex flex-col gap-6 text-[#0D241C]/80 text-[15px] md:text-base font-light leading-relaxed">
              <p>
                Music, ambiance and a finely designed interior together with a specially tailored atmosphere will enable you to experience a completely different dentistry — one that is comfortable, calm and inspiring.
              </p>
              <p>
                We want your experience with us to be like flying in first class — personal, convenient and with no worries or stress.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
