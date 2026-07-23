"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Car } from "lucide-react";

export function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="contacts"
      className="bg-[#E5EDDE] py-24 md:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-[#0D241C] mb-16 leading-tight"
        >
          We are right here.
        </motion.h2>

        {/* Three-column: Map LEFT | spacer | Line+Text RIGHT */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 md:gap-0 mb-20">

          {/* Map — left corner */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="w-full md:w-[45%] flex-shrink-0"
          >
            <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-[#0D241C]">
              <iframe
                title="DEMO Dental Studio location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2175.5!2d24.1!3d56.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTbCsDU3JzAwLjAiTiAyNMKwMDYnMDAuMCJF!5e0!3m2!1sen!2slv!4v1700000000000!5m2!1sen!2slv"
                className="absolute inset-0 w-full h-full grayscale contrast-125"
                style={{ border: 0, filter: "grayscale(1) contrast(1.1) brightness(0.85)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* DEMO pin overlay */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#E5EDDE] text-[#0D241C] rounded-full flex items-center justify-center font-light text-base shadow-2xl">
                    DEMO
                  </div>
                  <div className="w-0.5 h-4 bg-[#E5EDDE]/60 mt-1" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Line + Text — right corner */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="w-full md:w-[42%] flex-shrink-0 flex gap-6"
          >
            {/* Animated vertical line */}
            <div className="relative flex-shrink-0 w-px self-stretch hidden md:block">
              <div className="absolute inset-0 bg-[#0D241C]/15" />
              <motion.div
                className="absolute top-0 left-0 w-full bg-[#0D241C] origin-top"
                style={{ scaleY: lineScaleY, height: "100%" }}
              />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-10 pl-4">
              <p className="text-lg md:text-xl text-[#0D241C] leading-relaxed font-normal">
                Conveniently located to make your appointment even easier. With easy access for people with mobility impairments.
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full border border-[#0D241C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={16} strokeWidth={1} />
                  </div>
                  <div>
                    <p className="font-light text-[#0D241C] text-base leading-relaxed">
                      Our studio is located at <strong className="font-normal">123 Demo Street</strong>, where there are parking spaces in Zone B. We will pay for your parking while you are at DEMO dental.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full border border-[#0D241C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Car size={16} strokeWidth={1} />
                  </div>
                  <div>
                    <p className="font-light text-[#0D241C]/60 text-base leading-relaxed">
                      Free Zone B parking — we cover the cost for the full duration of your visit.
                    </p>
                  </div>
                </div>
              </div>

              <a href="https://maps.google.com/?q=DEMO+Dental+Studio" target="_blank" rel="noopener noreferrer">
                <button className="rounded-full px-8 py-3 min-h-[44px] bg-[#0D241C] text-[#E5EDDE] hover:bg-black active:scale-95 transition-all font-light text-sm tracking-wide w-fit">
                  Get Directions
                </button>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Clinic image — full width below */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="w-full"
        >
          <div className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-[2rem] overflow-hidden">
            <img
              src="/clinic-exterior.png"
              alt="DEMO Dental Studio clinic exterior"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D241C]/40 to-transparent" />
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
              <p className="text-[#E5EDDE]/70 text-sm tracking-widest uppercase font-light mb-1">DEMO Dental Studio</p>
              <p className="text-[#E5EDDE] text-xl font-light">123 Demo Street, New York</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
