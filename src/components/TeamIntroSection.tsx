"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function TeamIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="bg-[#E5EDDE] px-8 py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-16">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl text-[#0D241C] leading-tight tracking-tight font-light"
        >
          There&apos;s a team behind every smile
        </motion.h2>

        {/* Two-column: Photo LEFT corner | Text+Line RIGHT corner */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-0">

          {/* Photo — pinned left corner */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="w-full md:w-[260px] lg:w-[300px] flex-shrink-0"
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <img
                src="/team-hands.jpg"
                alt="Doctor and patient hands"
                className="absolute inset-0 w-full h-full object-cover grayscale"
              />
            </div>
          </motion.div>

          {/* Text block + line — pinned right corner */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="w-full md:w-[45%] lg:w-[42%] flex-shrink-0 flex gap-6"
          >
            {/* Animated vertical line — attached to left of text */}
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
                We believe that a smile is not just aesthetics. It is your strength, confidence and business card and our task is to make the path to this smile as comfortable, transparent and inspiring as possible.
              </p>
              <p className="text-sm md:text-base font-light text-[#0D241C]/55 leading-relaxed">
                The DEMO dental team of professionals provides top-class services thanks to{" "}
                <span className="text-[#0D241C]">coordinated teamwork</span>,{" "}
                <span className="text-[#0D241C]">innovative technologies</span>,{" "}
                <span className="text-[#0D241C]">creativity</span> and{" "}
                <span className="text-[#0D241C]">artistic excellence</span>{" "}
                in the process of dentistry.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
