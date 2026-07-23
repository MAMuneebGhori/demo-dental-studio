"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-start">
      {/* Background Image */}
      <img
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
        src="/main-background.jpg"
        alt="Hero Background"
      />
      {/* Optional overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#E5EDDE]/90 via-[#E5EDDE]/50 to-transparent z-10" />
      
      {/* Left-aligned text content */}
      <div className="relative z-20 flex flex-col items-start text-left px-4 sm:px-6 md:px-16 lg:px-24 max-w-[1400px] w-full mt-32 mb-16 overflow-x-hidden">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="text-4xl sm:text-6xl md:text-8xl font-light tracking-tight text-[#0D241C] mb-6 max-w-3xl leading-[1.1] break-words"
        >
          <motion.span 
            className="block" 
            variants={{ hidden: { x: -50, opacity: 0 }, visible: { x: 0, opacity: 1 } }}
          >
            Dentistry that
          </motion.span>
          <motion.span 
            className="block" 
            variants={{ hidden: { x: -50, opacity: 0 }, visible: { x: 0, opacity: 1 } }}
          >
            will make you smile
          </motion.span>
        </motion.h1>
        
        <motion.h2 
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-2xl md:text-4xl font-light tracking-tight text-[#0D241C]/80 mb-8 max-w-2xl leading-[1.2] break-words"
        >
          Safe, modern, painless and with a smile!
        </motion.h2>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8"
        >
          <Link href="/appointment" target="_blank" rel="noopener noreferrer">
            <button className="rounded-full px-8 md:px-10 py-4 min-h-[52px] bg-[#0D241C] text-white text-base md:text-lg font-bold tracking-wide hover:opacity-90 active:scale-95 transition-all shadow-lg">
              Book appointment
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
