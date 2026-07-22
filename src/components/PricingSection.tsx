"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

type PriceItem = { name: string; price: string; note?: string };
type Category = { label: string; items: PriceItem[] };

const categories: Category[] = [
  {
    label: "Diagnostics",
    items: [
      { name: "First consultation + panoramic X-ray", price: "from 55€", note: "Includes full oral examination" },
      { name: "3D CBCT scan (full arch)", price: "90€", note: "High-resolution volumetric imaging" },
      { name: "Digital Smile Design (DSD)", price: "120€", note: "Preview your new smile digitally" },
      { name: "The Perfect Smile package (CT + DSD + Plan)", price: "280€", note: "Complete pre-treatment bundle" },
    ],
  },
  {
    label: "Hygiene",
    items: [
      { name: "Professional hygiene — EMS AIRFLOW®", price: "95€", note: "Guided Biofilm Therapy protocol" },
      { name: "Periodontal treatment (per tooth)", price: "from 45€" },
      { name: "Teeth whitening — Philips Zoom!", price: "350€", note: "In-clinic, 1 session" },
      { name: "Airflow + Whitening combo", price: "390€", note: "Best value package" },
    ],
  },
  {
    label: "Therapy",
    items: [
      { name: "Aesthetic composite filling (1 surface)", price: "from 90€" },
      { name: "Aesthetic composite filling (2+ surfaces)", price: "from 150€" },
      { name: "Microscope root canal therapy (1 canal)", price: "200€", note: "High-magnification precision" },
      { name: "Microscope root canal therapy (3 canals)", price: "from 450€" },
      { name: "Simple tooth extraction", price: "from 80€" },
      { name: "Surgical tooth extraction (wisdom)", price: "from 180€" },
    ],
  },
  {
    label: "Aesthetics",
    items: [
      { name: "E-max ceramic veneer", price: "from 600€", note: "Ultra-thin, natural-looking" },
      { name: "Zirconia crown", price: "from 500€", note: "Durable & metal-free" },
      { name: "Premium implant placement", price: "from 800€", note: "Surgery only, per implant" },
      { name: "Implant crown (zirconia)", price: "from 650€" },
      { name: "ALL-ON-4 full arch restoration", price: "from 9 500€", note: "Complete smile in one day" },
    ],
  },
  {
    label: "Children",
    items: [
      { name: "Pediatric consultation", price: "from 35€" },
      { name: "Preventive sealant (per tooth)", price: "20€" },
      { name: "Fluoride treatment", price: "25€" },
      { name: "Pediatric composite filling", price: "from 60€" },
    ],
  },
];

export function PricingSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax the big heading
  const headingY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} id="price" className="bg-[#E5EDDE] text-[#0D241C] py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8">

        {/* Header with parallax */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <motion.div style={{ y: headingY }}>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-[#0D241C]/40 text-xs tracking-[0.3em] uppercase mb-4"
            >
              Transparent pricing
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-none text-[#0D241C]"
            >
              Price list
            </motion.h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="text-[#0D241C]/50 font-light text-lg max-w-xs leading-relaxed"
          >
            All prices include VAT. Individual treatment plans available on request.
          </motion.p>
        </div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row border border-[#0D241C]/12 rounded-[2rem] overflow-hidden shadow-sm"
        >
          {/* LEFT — Category tabs */}
          <div className="lg:w-64 xl:w-72 flex-shrink-0 bg-[#D8E8D8] border-b lg:border-b-0 lg:border-r border-[#0D241C]/8 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible">
            {categories.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => setActiveIdx(i)}
                className={`relative px-6 lg:px-8 py-5 lg:py-6 text-left transition-all flex-shrink-0 lg:flex-shrink group ${
                  i === activeIdx
                    ? "text-[#0D241C]"
                    : "text-[#0D241C]/35 hover:text-[#0D241C]/65 hover:bg-[#0D241C]/4"
                }`}
              >
                {i === activeIdx && (
                  <motion.div
                    layoutId="activeBar"
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#0D241C]"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                {i === activeIdx && (
                  <motion.div
                    layoutId="activeBg"
                    className="absolute inset-0 bg-[#0D241C]/5"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative text-xs tracking-[0.2em] uppercase font-light block mb-1 opacity-50">0{i + 1}</span>
                <span className="relative text-base lg:text-lg font-light">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* RIGHT — Price items */}
          <div className="flex-1 p-8 md:p-12 lg:p-16 min-h-[480px] bg-[#E5EDDE]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex flex-col"
              >
                <motion.h3
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-3xl font-light mb-10 text-[#0D241C]/70"
                >
                  {categories[activeIdx].label}
                </motion.h3>

                <div className="flex flex-col divide-y divide-[#0D241C]/8">
                  {categories[activeIdx].items.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-start justify-between gap-6 py-6 group hover:bg-[#D8E8D8] -mx-4 px-4 rounded-xl transition-colors cursor-default"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-base md:text-lg font-light text-[#0D241C] group-hover:text-[#0D241C] transition-colors">
                          {item.name}
                        </span>
                        {item.note && (
                          <span className="text-xs font-light text-[#0D241C]/35">{item.note}</span>
                        )}
                      </div>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.07 + 0.15 }}
                        className="text-base md:text-lg font-light text-[#0D241C] flex-shrink-0 tabular-nums"
                      >
                        {item.price}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="mt-12 pt-8 border-t border-[#0D241C]/10 flex flex-wrap gap-4"
                >
                  <Link href="/appointment">
                    <button className="rounded-full px-8 py-3 bg-[#0D241C] text-white hover:bg-black hover:scale-105 transition-all font-light text-sm tracking-wide">
                      Make an appointment
                    </button>
                  </Link>
                  <button className="rounded-full px-8 py-3 border border-[#0D241C]/20 text-[#0D241C]/60 hover:bg-[#0D241C]/5 transition-colors font-light text-sm tracking-wide">
                    Download full price list
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 text-[#0D241C]/30 text-sm font-light text-center"
        >
          Prices are indicative. Final cost depends on clinical complexity. Free consultation available.
        </motion.p>
      </div>
    </section>
  );
}
