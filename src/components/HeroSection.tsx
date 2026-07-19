"use client";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
        src="https://cdn.pixabay.com/video/2021/08/04/83864-584739506_large.mp4"
      />
      <div className="absolute inset-0 bg-alabaster/30 z-10" />
      <div className="relative z-20 text-center flex flex-col items-center px-4">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="text-5xl md:text-7xl font-bold text-foreground mb-4"
        >
          <motion.span 
            className="block" 
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
          >
            Dentistry that
          </motion.span>
          <motion.span 
            className="block text-terracotta" 
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
          >
            will make you smile
          </motion.span>
        </motion.h1>
      </div>
    </section>
  );
}
