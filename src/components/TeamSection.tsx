"use client";
import Link from "next/link";
import { teamData } from "@/data/team";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

export function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="team" className="bg-[#0D241C] py-32">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-8 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[#E5EDDE]/40 text-sm tracking-[0.3em] uppercase mb-4 font-light">The people behind every smile</p>
          <h2 className="text-6xl md:text-8xl font-light tracking-tight text-[#E5EDDE] leading-none">Our Team</h2>
        </div>
        <p className="text-[#E5EDDE]/50 font-light text-xl max-w-sm leading-relaxed">
          World-class specialists united by one mission — your perfect smile.
        </p>
      </div>

      {/* Horizontal scroll cards */}
      <div
        ref={containerRef}
        className="flex gap-6 px-8 overflow-x-auto scroll-smooth pb-8"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {teamData.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            viewport={{ once: true }}
            className="flex-shrink-0 w-[320px] md:w-[380px]"
            onMouseEnter={() => setHoveredId(member.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <Link href={`/team/${member.slug}`} className="group block">
              {/* Photo */}
              <div className="relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden mb-6">
                <img
                  src={member.img}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D241C]/70 via-transparent to-transparent" />
                {/* Bottom label */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center justify-between">
                    <span className="text-[#E5EDDE]/60 text-xs tracking-widest uppercase font-light">
                      {member.specialty}
                    </span>
                    {/* Arrow button */}
                    <div className="w-10 h-10 rounded-full bg-[#E5EDDE]/10 border border-[#E5EDDE]/20 flex items-center justify-center group-hover:bg-[#E5EDDE] group-hover:border-[#E5EDDE] transition-all duration-300">
                      <svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="1.5"
                        className="text-[#E5EDDE] group-hover:text-[#0D241C] transition-colors duration-300 group-hover:rotate-45 transition-transform"
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="px-2">
                <h3 className="text-2xl font-light tracking-tight text-[#E5EDDE] mb-1 group-hover:text-white transition-colors">
                  {member.name}
                </h3>
                <p className="text-[#E5EDDE]/50 font-light">{member.role}</p>

                {/* Experience badge */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="px-4 py-1.5 rounded-full border border-[#E5EDDE]/10 text-[#E5EDDE]/40 text-xs tracking-widest font-light">
                    {member.experience}
                  </span>
                  <span className="px-4 py-1.5 rounded-full border border-[#E5EDDE]/10 text-[#E5EDDE]/40 text-xs tracking-widest font-light">
                    {member.languages.length} languages
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

        {/* CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex-shrink-0 w-[320px] md:w-[380px]"
        >
          <div className="relative w-full aspect-[3/4] rounded-[2rem] border border-[#E5EDDE]/10 flex flex-col items-center justify-center text-center p-10 hover:border-[#E5EDDE]/30 transition-colors cursor-pointer group">
            <div className="w-16 h-16 rounded-full border border-[#E5EDDE]/20 flex items-center justify-center mb-8 group-hover:bg-[#E5EDDE]/10 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#E5EDDE]/60">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <h3 className="text-2xl font-light text-[#E5EDDE] mb-4">Join Our Team</h3>
            <p className="text-[#E5EDDE]/40 font-light text-sm leading-relaxed">
              Are you a passionate dental professional? We are always looking for exceptional people.
            </p>
            <Link href="/careers">
              <button className="mt-10 rounded-full px-8 py-3 border border-[#E5EDDE]/20 text-[#E5EDDE]/60 hover:bg-[#E5EDDE]/10 transition-colors font-light text-sm">
                Learn More
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
