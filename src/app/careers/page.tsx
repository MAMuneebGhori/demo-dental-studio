"use client";
import React, { useState, useRef, useCallback, useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { submitCareerApplication } from "@/lib/career-actions";

/* ────────────────────────────────────
   Data
   ──────────────────────────────────── */
const positions = [
  {
    title: "Senior Dentist",
    type: "Full-time",
    location: "New York",
    department: "Aesthetic Dentistry",
    description:
      "Lead our aesthetic dentistry department with a focus on Veneers, ALL-ON-X treatments, and full-mouth rehabilitations. You will mentor junior dentists and shape the future of our clinical practice.",
    requirements: [
      "DDS/DMD from an accredited program",
      "5+ years of clinical experience",
      "Advanced training in prosthodontics or cosmetic dentistry",
      "Excellent patient communication skills",
    ],
  },
  {
    title: "Dental Hygienist",
    type: "Part-time / Full-time",
    location: "New York",
    department: "Preventative Care",
    description:
      "Join our preventative care team and work with cutting-edge dental hygiene technology. You will provide premium patient experiences through thorough cleanings, oral assessments, and personalized care plans.",
    requirements: [
      "Licensed Dental Hygienist (RDH)",
      "2+ years of clinical experience",
      "Proficiency with digital X-rays and intraoral scanners",
      "Passion for patient education",
    ],
  },
  {
    title: "Orthodontist",
    type: "Full-time",
    location: "New York",
    department: "Orthodontics",
    description:
      "We are expanding our orthodontics department and seeking a talented orthodontist to deliver Invisalign, ceramic braces, and lingual orthodontic treatments in our premium facility.",
    requirements: [
      "Board-certified or board-eligible orthodontist",
      "Invisalign certification preferred",
      "Experience with CBCT imaging and 3D treatment planning",
      "Strong aesthetic sensibility",
    ],
  },
  {
    title: "Patient Concierge",
    type: "Full-time",
    location: "New York",
    department: "Guest Experience",
    description:
      "Be the first face our patients see. We are seeking someone with a luxury hospitality background to manage our front desk, coordinate appointments, and ensure every patient feels like a VIP.",
    requirements: [
      "2+ years in hospitality or luxury service",
      "Exceptional interpersonal and organizational skills",
      "Fluency in English; additional languages a plus",
      "Calm, warm, and professional demeanor",
    ],
  },
];

const benefits = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
    ),
    title: "State-of-the-Art Technology",
    description: "CBCT scanners, intraoral cameras, CAD/CAM systems, and 3D-printed surgical guides — we invest in the best so you can do your best.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
    ),
    title: "Continuous Education",
    description: "We sponsor courses, conferences, and advanced certifications. Your growth is our growth — learn from the best in the field.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    ),
    title: "Work-Life Balance",
    description: "Competitive salary, flexible scheduling, generous PTO, and a wellness stipend — because happy clinicians deliver the best care.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
    ),
    title: "Luxurious Environment",
    description: "Work in a clinic designed for comfort and elegance — natural light, spa-grade interiors, and a calm atmosphere for you and your patients.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    title: "Collaborative Team",
    description: "Join a diverse, talented group of professionals who share knowledge, support each other, and celebrate wins together.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    ),
    title: "Career Growth",
    description: "Clear advancement pathways, mentorship programs, and leadership opportunities. We promote from within whenever possible.",
  },
];

/* ────────────────────────────────────
   Animated letter reveal
   ──────────────────────────────────── */
function AnimatedHeading({ text, className }: { text: string; className?: string }) {
  return (
    <motion.h1 className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}

/* ────────────────────────────────────
   Main Page
   ──────────────────────────────────── */
export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setFileName(file.name);
  }, []);

  const handleApplyClick = (idx: number) => {
    setSelectedRole(idx);
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const [formState, formAction, isPending] = useActionState(submitCareerApplication, null);

  // Track submission success from server action
  const submitted = formState?.success === true;
  const formError = formState?.error;

  return (
    <main className="w-full bg-[#071a12] min-h-screen text-[#E5EDDE] overflow-x-hidden">

      {/* ─── Floating back button ─── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="fixed top-8 left-8 z-50"
      >
        <Link
          href="/"
          className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 transition-all duration-500"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#c9a973] group-hover:-translate-x-1 transition-transform duration-300">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-sm font-light text-[#E5EDDE]/70 tracking-wide group-hover:text-[#E5EDDE] transition-colors">Back</span>
        </Link>
      </motion.div>

      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-8 overflow-hidden">
        {/* Ambient glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#c9a973]/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#2a6b4f]/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(201,169,115,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,115,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[#c9a973] text-sm tracking-[0.4em] uppercase mb-8 font-light"
        >
          Careers at DEMO Dental Studio
        </motion.p>

        <AnimatedHeading
          text="Join Our Team"
          className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight leading-none mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-[#E5EDDE]/50 text-lg md:text-xl font-light max-w-2xl leading-relaxed"
        >
          We don't just build smiles — we build careers. Join a team where innovation meets artistry, and every day brings a chance to transform lives.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 flex flex-col items-center gap-3"
        >
          <span className="text-[#E5EDDE]/30 text-xs tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-[#c9a973]/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          WHY JOIN US — Benefits Grid
      ═══════════════════════════════════════════ */}
      <section className="py-28 px-8 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-[#c9a973] text-sm tracking-[0.3em] uppercase mb-4 font-light">Why DEMO?</p>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight">More than a workplace.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-[1.5rem] border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-700 cursor-default"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-[#c9a973]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="relative z-10">
                <div className="text-[#c9a973]/70 mb-6 group-hover:text-[#c9a973] transition-colors duration-500">
                  {b.icon}
                </div>
                <h3 className="text-lg font-medium text-[#E5EDDE] mb-3 group-hover:text-white transition-colors">{b.title}</h3>
                <p className="text-[#E5EDDE]/40 font-light text-sm leading-relaxed group-hover:text-[#E5EDDE]/60 transition-colors duration-500">{b.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          OPEN POSITIONS
      ═══════════════════════════════════════════ */}
      <section className="py-28 px-8 max-w-[1000px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-[#c9a973] text-sm tracking-[0.3em] uppercase mb-4 font-light">Open Positions</p>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-4">Find your place.</h2>
          <p className="text-[#E5EDDE]/40 font-light text-lg max-w-xl">Click on a role to learn more, then apply with your details below.</p>
        </motion.div>

        <div className="space-y-4">
          {positions.map((role, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Role card */}
              <div
                onClick={() => setSelectedRole(selectedRole === idx ? null : idx)}
                className={`group cursor-pointer rounded-2xl border transition-all duration-500 overflow-hidden ${
                  selectedRole === idx
                    ? "border-[#c9a973]/40 bg-[#c9a973]/[0.04]"
                    : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]"
                }`}
              >
                <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl md:text-2xl font-light">{role.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-[#c9a973]/10 text-[#c9a973] text-xs uppercase tracking-wider rounded-full border border-[#c9a973]/20">{role.type}</span>
                      <span className="px-3 py-1 bg-white/5 text-[#E5EDDE]/60 text-xs uppercase tracking-wider rounded-full border border-white/10">{role.location}</span>
                      <span className="px-3 py-1 bg-white/5 text-[#E5EDDE]/60 text-xs uppercase tracking-wider rounded-full border border-white/10">{role.department}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ rotate: selectedRole === idx ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-[#c9a973]/40 transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#E5EDDE]/60">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </motion.div>
                  </div>
                </div>

                {/* Expandable details */}
                <AnimatePresence>
                  {selectedRole === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-8 pt-2 border-t border-white/[0.06]">
                        <p className="text-[#E5EDDE]/60 font-light leading-relaxed mb-6">{role.description}</p>
                        <h4 className="text-xs text-[#c9a973] tracking-[0.2em] uppercase mb-4">Requirements</h4>
                        <ul className="space-y-2 mb-8">
                          {role.requirements.map((req, ri) => (
                            <motion.li
                              key={ri}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: ri * 0.1, duration: 0.4 }}
                              className="flex items-start gap-3 text-[#E5EDDE]/50 font-light text-sm"
                            >
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#c9a973]/60 flex-shrink-0" />
                              {req}
                            </motion.li>
                          ))}
                        </ul>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleApplyClick(idx)}
                          className="rounded-full px-8 py-3 bg-[#c9a973] text-[#071a12] font-medium hover:bg-[#e3cda1] transition-colors text-sm"
                        >
                          Apply for this role →
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          APPLICATION FORM
      ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {showForm && !submitted && (
          <motion.section
            ref={formRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="py-28 px-8 max-w-[700px] mx-auto"
          >
            <div className="relative">
              {/* Background glow */}
              <div className="absolute -inset-10 bg-[#c9a973]/[0.03] rounded-[3rem] blur-3xl pointer-events-none" />

              <div className="relative rounded-[2rem] border border-white/[0.08] bg-white/[0.02] p-8 md:p-12 backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-[#c9a973] text-sm tracking-[0.3em] uppercase mb-3 font-light">Application</p>
                  <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-2">
                    Apply for{" "}
                    <span className="text-[#c9a973]">
                      {selectedRole !== null ? positions[selectedRole].title : "a position"}
                    </span>
                  </h2>
                  <p className="text-[#E5EDDE]/40 font-light mb-10">Fill out the form below and we'll be in touch.</p>
                </motion.div>

                <form action={formAction} className="space-y-6">
                  {/* Full Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-xs text-[#E5EDDE]/40 tracking-[0.2em] uppercase mb-3">Full Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Dr. Sarah Johnson"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 text-[#E5EDDE] placeholder:text-[#E5EDDE]/20 font-light focus:outline-none focus:border-[#c9a973]/40 focus:bg-white/[0.06] transition-all duration-300"
                    />
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <label className="block text-xs text-[#E5EDDE]/40 tracking-[0.2em] uppercase mb-3">Email Address *</label>
                    <input
                      required
                      type="email"
                      placeholder="sarah@example.com"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 text-[#E5EDDE] placeholder:text-[#E5EDDE]/20 font-light focus:outline-none focus:border-[#c9a973]/40 focus:bg-white/[0.06] transition-all duration-300"
                    />
                  </motion.div>

                  {/* Phone */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-xs text-[#E5EDDE]/40 tracking-[0.2em] uppercase mb-3">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 text-[#E5EDDE] placeholder:text-[#E5EDDE]/20 font-light focus:outline-none focus:border-[#c9a973]/40 focus:bg-white/[0.06] transition-all duration-300"
                    />
                  </motion.div>

                  {/* Position Type */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <label className="block text-xs text-[#E5EDDE]/40 tracking-[0.2em] uppercase mb-3">Position Type *</label>
                    <select
                      required
                      defaultValue={selectedRole !== null ? positions[selectedRole].title : ""}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 text-[#E5EDDE] font-light focus:outline-none focus:border-[#c9a973]/40 focus:bg-white/[0.06] transition-all duration-300 appearance-none cursor-pointer"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23c9a973' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 1.25rem center" }}
                    >
                      <option value="" disabled className="bg-[#071a12]">Select a position</option>
                      {positions.map((p, i) => (
                        <option key={i} value={p.title} className="bg-[#071a12]">{p.title}</option>
                      ))}
                      <option value="Other" className="bg-[#071a12]">Other / General Application</option>
                    </select>
                  </motion.div>

                  {/* Cover Letter */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="block text-xs text-[#E5EDDE]/40 tracking-[0.2em] uppercase mb-3">Brief Introduction</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about yourself, your experience, and why you'd be a great fit..."
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 text-[#E5EDDE] placeholder:text-[#E5EDDE]/20 font-light focus:outline-none focus:border-[#c9a973]/40 focus:bg-white/[0.06] transition-all duration-300 resize-none"
                    />
                  </motion.div>

                  {/* CV Upload — Drag & Drop */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                  >
                    <label className="block text-xs text-[#E5EDDE]/40 tracking-[0.2em] uppercase mb-3">Upload CV / Resume *</label>
                    <div
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-500 group ${
                        isDragging
                          ? "border-[#c9a973] bg-[#c9a973]/[0.06]"
                          : fileName
                          ? "border-[#c9a973]/40 bg-[#c9a973]/[0.03]"
                          : "border-white/[0.1] bg-white/[0.02] hover:border-white/[0.2] hover:bg-white/[0.04]"
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                      {fileName ? (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="flex flex-col items-center gap-3"
                        >
                          <div className="w-14 h-14 rounded-full bg-[#c9a973]/10 flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#c9a973]">
                              <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <p className="text-sm text-[#c9a973] font-medium">{fileName}</p>
                          <p className="text-xs text-[#E5EDDE]/30">Click to replace</p>
                        </motion.div>
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-14 h-14 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center group-hover:bg-white/[0.08] transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-[#E5EDDE]/40">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                            </svg>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-[#E5EDDE]/60 font-light">
                              <span className="text-[#c9a973]">Click to upload</span> or drag & drop
                            </p>
                            <p className="text-xs text-[#E5EDDE]/30 mt-1">PDF, DOC, DOCX (Max 10MB)</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Submit */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="pt-4"
                  >
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full rounded-xl py-4 bg-gradient-to-r from-[#c9a973] to-[#e3cda1] text-[#071a12] font-semibold text-base tracking-wide hover:shadow-[0_0_40px_rgba(201,169,115,0.2)] transition-shadow duration-500"
                    >
                      Submit Application
                    </motion.button>
                    <p className="text-center text-xs text-[#E5EDDE]/20 mt-4 font-light">
                      Your data will be processed in accordance with our privacy policy.
                    </p>
                  </motion.div>
                </form>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════
          THANK YOU STATE
      ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {submitted && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="py-28 px-8 max-w-[700px] mx-auto"
          >
            <div className="relative rounded-[2rem] border border-[#c9a973]/20 bg-gradient-to-b from-[#c9a973]/[0.04] to-transparent p-12 md:p-16 text-center overflow-hidden">
              {/* Animated background particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: "100%", x: `${10 + Math.random() * 80}%`, opacity: 0 }}
                    animate={{
                      y: "-20%",
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      delay: Math.random() * 1.5,
                      repeat: Infinity,
                      repeatDelay: Math.random() * 3,
                    }}
                    className="absolute w-1 h-1 rounded-full bg-[#c9a973]"
                    style={{ left: `${10 + Math.random() * 80}%` }}
                  />
                ))}
              </div>

              {/* Animated checkmark */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-[#c9a973]/10 border border-[#c9a973]/30 flex items-center justify-center mx-auto mb-8"
              >
                <motion.svg
                  width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className="text-[#c9a973]"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <motion.polyline
                    points="20 6 9 17 4 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  />
                </motion.svg>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-3xl md:text-4xl font-light mb-4"
              >
                Thank You!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                className="text-[#E5EDDE]/50 font-light text-lg max-w-md mx-auto leading-relaxed mb-4"
              >
                Your application has been received. Our team will review your details and get back to you within 5 business days.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-[#c9a973]/60 text-sm font-light"
              >
                We appreciate your interest in DEMO Dental Studio.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="mt-10"
              >
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 rounded-full px-8 py-3 border border-white/15 text-[#E5EDDE]/70 hover:bg-white/5 hover:text-[#E5EDDE] transition-all duration-300 font-light text-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Back to Home
                </Link>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════
          GENERAL APPLICATION CTA (always visible)
      ═══════════════════════════════════════════ */}
      {!submitted && (
        <section className="py-20 px-8 max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center p-12 rounded-[2rem] border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent"
          >
            <h3 className="text-2xl md:text-3xl font-light mb-4">Don't see your perfect role?</h3>
            <p className="text-[#E5EDDE]/40 font-light mb-8 max-w-lg mx-auto">
              We're always seeking exceptional talent. Send us a general application and we'll match you with future opportunities.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedRole(null);
                setShowForm(true);
                setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
              }}
              className="rounded-full px-10 py-3.5 border border-[#c9a973]/30 text-[#c9a973] hover:bg-[#c9a973]/10 transition-all duration-300 font-light"
            >
              Send General Application
            </motion.button>
          </motion.div>
        </section>
      )}

      {/* ─── Minimal Footer ─── */}
      <footer className="py-10 px-8 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#E5EDDE]/30 font-light tracking-wider">
          <p>2026 © DEMO Dental Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-[#E5EDDE]/60 transition-colors">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-[#E5EDDE]/60 transition-colors">Terms</Link>
            <Link href="/" className="hover:text-[#E5EDDE]/60 transition-colors">Home</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
