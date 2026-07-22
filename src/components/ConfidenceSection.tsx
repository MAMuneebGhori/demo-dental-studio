"use client";
import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { motion } from "framer-motion";

export function ConfidenceSection() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const images = [
    {
      src: "/female-dr.jpg",
      alt: "Female doctor examining patient",
    },
    {
      src: "/opg.jpg",
      alt: "OPG X-Ray",
    },
    {
      src: "/light-curing.jpg",
      alt: "Light curing machine",
    },
    {
      src: "/autoclave.jpg",
      alt: "Autoclave sterilizer",
    },
    {
      src: "/operation.jpg",
      alt: "Dental Operation",
    },
    {
      src: "/female-dr.jpg",
      alt: "Female doctor examining patient",
    },
    {
      src: "/opg.jpg",
      alt: "OPG X-Ray",
    },
  ];

  const subtitleContent = (
    <div className="flex justify-center px-4">
      <motion.h3 
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1.5, ease: "linear" }}
        className="text-center md:text-left text-3xl md:text-5xl text-white font-bold tracking-widest uppercase pointer-events-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] whitespace-nowrap"
      >
        Welcome to modern dentistry
      </motion.h3>
    </div>
  );

  return (
    <div className="w-full bg-[#E5EDDE] relative">
      <div className="w-full pt-32 pb-16 flex justify-center items-center px-4">
        <h2 className="text-center text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#0D241C] max-w-5xl drop-shadow-sm">
          We help you to regain your confidence with smile
        </h2>
      </div>
      <ZoomParallax images={images} subtitle={subtitleContent} />
      <div className="h-[20vh] bg-[#E5EDDE]" />
    </div>
  );
}
