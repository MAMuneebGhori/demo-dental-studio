"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export function Footer() {
  const overlayRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: overlayRef,
    offset: ["start end", "start start"],
  });

  // Smoothly shrink and move to the left side
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.45]);
  const left = useTransform(scrollYProgress, [0, 1], ["50%", "26%"]);
  const top = useTransform(scrollYProgress, [0, 1], ["50%", "40%"]);

  return (
    <main className="relative w-full bg-[#071a12] text-white">
      
      {/* ══════════════════════════════════════════════════════
          LAYER 1 — STICKY DEMO HERO
      ══════════════════════════════════════════════════════ */}
      <div className="sticky top-0 left-0 w-full h-screen z-10 pointer-events-none flex flex-col items-center justify-center overflow-hidden">
        
        <motion.div
          style={{ position: "absolute", left, top, x: "-50%", y: "-50%", scale }}
          className="flex flex-col items-center whitespace-nowrap"
        >
          {/* Animated entrance for letters */}
          <motion.div 
            className="flex items-center space-x-4 md:space-x-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
            }}
          >
            {["D", "E", "M", "O"].map((letter, i) => (
              <motion.span 
                key={i} 
                variants={{
                  hidden: { opacity: 0, y: 60, filter: "blur(10px)", scale: 0.8 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    filter: "blur(0px)", 
                    scale: 1, 
                    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] } 
                  }
                }}
                className="text-[18vw] md:text-[14rem] font-serif font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[#e3cda1] via-[#c9a973] to-[#8c7042] py-4"
                style={{ lineHeight: "1.2" }} 
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, letterSpacing: "0.1em", y: 20 }}
            whileInView={{ opacity: 1, letterSpacing: "0.6em", y: 0 }}
            transition={{ duration: 1.6, ease: "easeOut", delay: 0.8 }}
            viewport={{ once: true }}
            className="text-sm md:text-3xl font-light text-[#c9a973] uppercase pl-[0.6em]"
          >
            DENTAL STUDIO
          </motion.p>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════
          LAYER 2 — SCROLLING CONTENT
      ══════════════════════════════════════════════════════ */}
      <div 
        ref={overlayRef}
        className="relative z-20 w-full md:w-[65%] lg:w-[55%] xl:w-[50%] ml-auto min-h-screen flex flex-col justify-center pointer-events-auto"
      >
        <div className="w-full pt-[45vh] md:pt-0 px-8 md:px-12 lg:px-20 pb-16 md:pb-24">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
            }}
            className="flex flex-col gap-16 md:gap-24 h-full justify-center"
          >

            {/* Row 1: Contacts, Address, Hours, Careers */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-16 pt-16 md:pt-32"
            >
              
              {/* Left Column */}
              <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-4">
                  <h4 className="text-xs text-white/40 uppercase tracking-[0.25em]">Contacts</h4>
                  <a href="tel:+37122008746" className="text-3xl md:text-4xl font-light text-white hover:text-[#c9a973] transition-colors tracking-wide w-fit group relative">
                    +1 (555) 123-4567
                    <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-[#c9a973] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                  <a href="mailto:info@demodental.com" className="text-lg font-light text-white/60 hover:text-[#c9a973] transition-colors w-fit group relative">
                    info@demodental.com
                    <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#c9a973] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </div>
                
                <div className="flex flex-col gap-4">
                  <h4 className="text-xs text-white/40 uppercase tracking-[0.25em]">Address</h4>
                  <p className="text-xl md:text-2xl font-light text-white/90">123 Demo Street, New York<br/><span className="text-white/50 text-base md:text-lg">(First floor)</span></p>
                  <p className="text-sm font-light text-white/40 leading-relaxed mt-2 max-w-[280px]">The clinic is accessible to people with mobility impairments and other special needs.</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-4">
                  <h4 className="text-xs text-white/40 uppercase tracking-[0.25em]">Working hours</h4>
                  <div className="flex flex-col gap-2 text-lg font-light text-white/70">
                    <p>Monday - Friday: 10:00 - 20:00</p>
                    <p className="text-white/40">Saturday - Sunday: Closed</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h4 className="text-xs text-white/40 uppercase tracking-[0.25em]">Careers</h4>
                  <a href="#" className="group inline-flex items-center gap-6 text-xl md:text-2xl font-light text-white hover:text-[#c9a973] transition-colors duration-500 w-fit">
                    Current vacancies
                    <span className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#c9a973] group-hover:text-[#071a12] group-hover:border-[#c9a973] group-hover:scale-110 transition-all duration-500">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Row 2: Bank Details */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
              className="flex flex-col gap-5"
            >
              <h4 className="text-xs text-white/40 uppercase tracking-[0.25em]">Bank details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-light text-white/60 leading-loose">
                <div>
                  <p className="text-white/90">Demo Dental LLC</p>
                  <p>Reg. No: 12-3456789</p>
                  <p>VAT Reg. No: LV12-3456789</p>
                </div>
                <div>
                  <p>AS “SWEDBANK”</p>
                  <p>US00DEMO123456789</p>
                </div>
              </div>
            </motion.div>

            {/* Row 3: Atbalsts (EU Support / Grants) */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
              className="flex flex-col gap-6 pt-12 md:pt-16 border-t border-white/10"
            >
              <div className="flex flex-col gap-4">
                <h4 className="text-xs text-white/40 uppercase tracking-[0.25em]">EU Support & Grants</h4>
                <div className="flex items-center">
                  <span className="px-3 py-1 text-[10px] md:text-xs font-medium tracking-[0.2em] text-[#071a12] bg-[#c9a973] uppercase">
                    Co-funded by the European Union
                  </span>
                </div>
              </div>
              
              <p className="text-sm md:text-base font-light text-white/50 leading-relaxed md:leading-loose">
                SIA “DEMODENTAL” has concluded contracts No. 9.2-17-L-2025/727 (02.05.2025.) and No. 9.2-17-L-2025/722 (02.05.2025.) with the Investment and Development Agency of Latvia for receiving support under the measure “2.2.1.2.i. Support for digitalization of processes in commercial activities”, funded by the EU Recovery Fund.
              </p>
              
              <div className="flex flex-col gap-4 text-sm md:text-base font-light text-white/50">
                <p>
                  <span className="text-white/90 font-normal">Project Objective:</span> To invest in the digitalization of commercial activities.
                </p>
                <div>
                  <span className="text-white/90 font-normal block mb-4">Implemented Measures:</span>
                  <ul className="list-disc pl-5 space-y-2 marker:text-[#c9a973]">
                    <li>Implementation of a Customer Relationship Management (CRM) system</li>
                    <li>Development of a new company website</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Row 4: Copyright, Privacy & Socials */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
              className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10 text-xs font-light tracking-widest uppercase text-white/40"
            >
              <p>2026 © M A Muneeb Ghori. All rights reserved.</p>
              
              <div className="flex items-center gap-6">
                <Link href="#" className="hover:text-white transition-colors group relative pb-1">
                  Privacy policy
                  <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <div className="flex gap-4 border-l border-white/20 pl-6">
                   <a href="#" aria-label="Instagram" className="relative hover:text-[#c9a973] transition-colors group p-1">
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                       <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                       <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                       <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                     </svg>
                   </a>
                   <a href="#" aria-label="Facebook" className="relative hover:text-[#c9a973] transition-colors group p-1">
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                       <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                     </svg>
                   </a>
                </div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </main>
  );
}
