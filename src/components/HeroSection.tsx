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
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 mix-blend-multiply grayscale"
        src="https://cdn.pixabay.com/video/2020/05/25/40141-424888874_large.mp4"
      />
      <div className="absolute inset-0 bg-[#E5EDDE]/80 z-10" />
      
      <div className="relative z-20 text-center flex flex-col items-center px-8 max-w-4xl mx-auto mt-24">
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
          className="text-6xl md:text-8xl font-light tracking-tight text-[#0D241C] mb-8"
        >
          <motion.span 
            className="block" 
            variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          >
            Dentistry that
          </motion.span>
          <motion.span 
            className="block" 
            variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          >
            will make you smile
          </motion.span>
        </motion.h1>
        
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-2xl md:text-4xl font-light tracking-tight text-[#0D241C]/80 mb-8"
        >
          Safe, modern, painless and with a smile!
        </motion.h2>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-lg md:text-xl font-light tracking-tight text-[#0D241C]/60 max-w-2xl leading-relaxed"
        >
          We change the experience and help you regain confidence. In our care, you'll receive not only treatment and a perfect smile, but also care, openness and support all the way to the result.
        </motion.p>
      </div>
    </section>
  );
}
