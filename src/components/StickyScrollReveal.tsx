"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import NeuroNoise from "@/components/ui/neuro-noise";

export function StickyScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Phase 2: Clip-Path Expansion
  const clipV = useTransform(scrollYProgress, [0.05, 0.3], [50, 0]);
  const clipH = useTransform(scrollYProgress, [0.05, 0.3], [50, 0]);
  const clipR = useTransform(scrollYProgress, [0.05, 0.3], [50, 0]);
  const clipPath = useMotionTemplate`inset(${clipV}% ${clipH}% round ${clipR}%)`;

  // Phase 3: Text Exit (Fades out just as video starts rising)
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.25], [1, 0]);
  const textY = useTransform(scrollYProgress, [0.15, 0.25], [0, -50]);

  // Phase 4: The Card Reveal (Solid, starts completely offscreen, ends slightly lower)
  const cardY = useTransform(scrollYProgress, [0.2, 0.4], [1500, 20]);

  return (
    <section ref={containerRef} className="relative w-full h-[200vh]">
      {/* Pinned Wrapper */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Phase 1: Lowest Layer */}
        <div className="absolute inset-0 bg-[#e4f3e3] z-0" />

        {/* Phase 1 & 3: Introductory Typography */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="absolute z-10 flex items-center justify-center pointer-events-none w-full px-6 text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-medium tracking-tight text-[#0D241C]">
            That’s us — DEMO dental studio.
          </h2>
        </motion.div>

        {/* Phase 2: Expanding Dark Green Background (NeuroNoise + White Text) */}
        <motion.div 
          style={{ clipPath }}
          className="absolute inset-0 z-20 pointer-events-none overflow-hidden bg-emerald-950"
        >
          {/* NeuroNoise Background */}
          <div className="absolute inset-0 mix-blend-screen opacity-90">
            <NeuroNoise 
              colorFront="#103c2a" 
              colorMid="#0b2c1f" 
              colorBack="#061e14"
              brightness={1}
              contrast={1}
              speed={1}
              scale={1}
              rotation={0}
            />
          </div>

          {/* Elegant Luxury Wave / Topography Curves covering full screen */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.25]">
            <svg className="w-full h-full" viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice">
              <motion.path
                d="M-200,800 C400,200 800,900 1600,100"
                fill="none"
                stroke="#e4f3e3"
                strokeWidth="1.5"
                initial={{ pathLength: 0, pathOffset: 1 }}
                animate={{ pathLength: 1, pathOffset: 0 }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.path
                d="M-200,600 C500,100 900,1000 1600,-100"
                fill="none"
                stroke="#D4B58E"
                strokeWidth="2"
                initial={{ pathLength: 0, pathOffset: 1 }}
                animate={{ pathLength: 1, pathOffset: 0 }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              <motion.path
                d="M-200,400 C600,0 1000,800 1600,200"
                fill="none"
                stroke="#e4f3e3"
                strokeWidth="1"
                initial={{ pathLength: 0, pathOffset: 1 }}
                animate={{ pathLength: 1, pathOffset: 0 }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
              <motion.path
                d="M-200,200 C300,500 1100,-100 1600,600"
                fill="none"
                stroke="#D4B58E"
                strokeWidth="1.5"
                initial={{ pathLength: 0, pathOffset: 1 }}
                animate={{ pathLength: 1, pathOffset: 0 }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.path
                d="M-200,0 C400,400 1000,0 1600,800"
                fill="none"
                stroke="#e4f3e3"
                strokeWidth="1"
                initial={{ pathLength: 0, pathOffset: 1 }}
                animate={{ pathLength: 1, pathOffset: 0 }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              />
            </svg>
          </div>

          {/* Exact duplicate of text, but in white */}
          <motion.div 
            style={{ opacity: textOpacity, y: textY }}
            className="absolute inset-0 flex items-center justify-center w-full px-6 text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-medium tracking-tight text-[#e4f3e3]">
              That’s us — DEMO dental studio.
            </h2>
          </motion.div>
        </motion.div>

        {/* Phase 4: Card Reveal */}
        <motion.div
          style={{ y: cardY }}
          className="absolute z-30 w-[95%] max-w-5xl bg-[#e4f3e3] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[520px]"
        >
          {/* Video Placeholder (Left - Adjusted for 9:16 Portrait) */}
          <div className="w-full md:w-5/12 h-[350px] md:h-full bg-[#0D241C] relative flex-shrink-0">
            <video 
              src="/promo-video.mp4" 
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay 
              muted 
              loop 
              playsInline
            />
          </div>

          {/* Text/CTA (Right) */}
          <div className="w-full md:w-7/12 p-8 md:py-16 md:pr-16 md:pl-24 md:pb-24 flex flex-col justify-center items-start text-[#0D241C]">
            <h3 className="text-3xl md:text-4xl font-medium mb-6 tracking-tight">
              A result you can see in advance
            </h3>
            <p className="text-lg md:text-xl opacity-80 mb-16 leading-relaxed font-light">
              We create a 3D digital smile design before treatment even starts. Not only do you know what the end result will be, but you can see it, influence it, and feel confident.
            </p>
            <Link href="/appointment" target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-4 bg-[#0D241C] text-[#e4f3e3] rounded-full font-medium hover:bg-emerald-900 transition-colors text-lg shadow-xl">
                Make an appointment
              </button>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
