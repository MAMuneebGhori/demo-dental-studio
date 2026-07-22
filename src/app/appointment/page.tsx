"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Sparkles, Check, ChevronRight, Calendar, User, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function AppointmentPage() {
  const [step, setStep] = useState(1);
  
  // Form State
  const [bookingType, setBookingType] = useState<"patient" | "consultation" | null>(null);
  const [selection, setSelection] = useState<string | null>(null);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiResultReady, setAiResultReady] = useState(false);

  // Form inputs
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", date: "" });

  const handleNextStep = () => {
    if (step === 2) {
      setStep(3);
      setIsAiGenerating(true);
      setTimeout(() => {
        setIsAiGenerating(false);
        setAiResultReady(true);
      }, 3500); // Simulate AI generation time
    } else {
      setStep((s) => s + 1);
    }
  };

  const handlePrevStep = () => {
    setStep((s) => Math.max(1, s - 1));
    if (step === 3) {
      setAiResultReady(false);
      setIsAiGenerating(false);
    }
  };

  const problems = [
    { id: "pain", label: "Tooth Pain / Emergency", desc: "Immediate attention required" },
    { id: "veneers", label: "Cosmetic Veneers", desc: "Smile redesign and aesthetics" },
    { id: "implants", label: "Dental Implants", desc: "Permanent tooth replacement" },
    { id: "ortho", label: "Dr. Smith - Orthodontics", desc: "Braces and Invisalign" },
  ];

  return (
    <main className="w-full min-h-screen bg-[#071a12] text-white pt-24 md:pt-32 pb-24 px-4 sm:px-8 relative overflow-hidden">
      
      {/* Background glowing orb */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#c9a973]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-emerald-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header & Progress */}
        <div className="flex flex-col gap-8 mb-12 md:mb-16">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm font-light uppercase tracking-widest">
              <ChevronLeft size={16} /> Back to Home
            </Link>
            <div className="text-xs font-medium tracking-[0.2em] text-[#c9a973] uppercase">
              Step {step} of 3
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl md:text-5xl font-serif font-light tracking-wide">
              {step === 1 && "How can we help you?"}
              {step === 2 && "What are you looking for?"}
              {step === 3 && "Finalize your booking"}
            </h1>
            
            {/* Progress Bar */}
            <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
              <motion.div 
                className="h-full bg-[#c9a973]"
                initial={{ width: "33%" }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>

        {/* Form Content Area */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Type Selection */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <button
                  onClick={() => { setBookingType("patient"); handleNextStep(); }}
                  className={`group relative p-8 md:p-12 rounded-[2rem] border transition-all duration-500 text-left overflow-hidden ${
                    bookingType === "patient" ? "border-[#c9a973] bg-[#c9a973]/10" : "border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="relative z-10 flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 group-hover:text-[#c9a973] group-hover:border-[#c9a973]/50 transition-colors">
                      <User size={20} />
                    </div>
                    <h3 className="text-2xl font-light tracking-wide text-white">Booking for Patient</h3>
                    <p className="text-sm text-white/50 font-light leading-relaxed">
                      I am a new or existing patient looking to schedule a standard appointment or treatment.
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => { 
                    window.dispatchEvent(new CustomEvent('open-chat'));
                  }}
                  className={`group relative p-8 md:p-12 rounded-[2rem] border transition-all duration-500 text-left overflow-hidden ${
                    bookingType === "consultation" ? "border-[#c9a973] bg-[#c9a973]/10" : "border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="relative z-10 flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 group-hover:text-[#c9a973] group-hover:border-[#c9a973]/50 transition-colors">
                      <Sparkles size={20} />
                    </div>
                    <h3 className="text-2xl font-light tracking-wide text-white">Virtual Consultation</h3>
                    <p className="text-sm text-white/50 font-light leading-relaxed">
                      I want a professional AI-assisted remote evaluation before coming into the clinic.
                    </p>
                  </div>
                </button>
              </motion.div>
            )}

            {/* STEP 2: Service/Problem Selection */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-10"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {problems.map((prob) => (
                    <div
                      key={prob.id}
                      onClick={() => {
                        setSelection(prob.id);
                        setTimeout(() => handleNextStep(), 300);
                      }}
                      className={`cursor-pointer flex items-center gap-4 p-6 rounded-2xl border transition-all duration-300 ${
                        selection === prob.id 
                          ? "border-[#c9a973] bg-[#c9a973]/10 shadow-[0_0_20px_rgba(201,169,115,0.1)]" 
                          : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20"
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                        selection === prob.id ? "border-[#c9a973] bg-[#c9a973]" : "border-white/30"
                      }`}>
                        {selection === prob.id && <Check size={14} className="text-[#071a12]" strokeWidth={3} />}
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-lg text-white/90 font-light">{prob.label}</span>
                        <span className="text-xs text-white/40">{prob.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-white/10">
                  <button onClick={handlePrevStep} className="text-white/50 hover:text-white transition-colors text-sm uppercase tracking-widest">
                    Go Back
                  </button>
                  <button 
                    onClick={handleNextStep}
                    disabled={!selection}
                    className="flex items-center gap-2 bg-[#c9a973] hover:bg-[#b09363] text-[#071a12] disabled:opacity-30 disabled:hover:bg-[#c9a973] px-8 py-3 rounded-full font-medium tracking-wide transition-all"
                  >
                    Continue <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: AI Generation & Final Details */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
              >
                
                {/* Left Col: AI UI */}
                <div className="w-full flex flex-col gap-6">
                  <h3 className="text-sm text-white/50 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Sparkles size={16} className="text-[#c9a973]" /> DEMO AI Diagnostics
                  </h3>
                  
                  <div className="w-full aspect-[4/3] rounded-3xl border border-white/10 bg-black/40 overflow-hidden relative flex flex-col items-center justify-center">
                    
                    {/* Scanning State */}
                    {isAiGenerating && (
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-6"
                      >
                        {/* Scanning Line Animation */}
                        <motion.div 
                          animate={{ top: ["0%", "100%", "0%"] }}
                          transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                          className="absolute left-0 right-0 h-[2px] bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)] z-20"
                        />
                        {/* Fake 3D Skeleton structure */}
                        <div className="w-48 h-48 opacity-30 border border-emerald-500/50 rounded-full flex items-center justify-center relative">
                           <div className="w-32 h-32 border border-emerald-500/30 rounded-full animate-ping" />
                           <div className="w-16 h-16 border border-emerald-500/80 rounded-full animate-pulse" />
                        </div>
                        <p className="text-emerald-400 font-mono text-xs tracking-widest uppercase relative z-10 bg-[#071a12]/80 px-4 py-1 rounded">
                          Analyzing {selection}...
                        </p>
                      </motion.div>
                    )}

                    {/* Result State */}
                    {aiResultReady && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 to-[#071a12] p-8 flex flex-col justify-between"
                      >
                        <div className="flex justify-between items-start">
                           <div className="flex gap-2">
                             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                             <span className="text-xs text-emerald-500 uppercase tracking-widest font-mono">Profile Matched</span>
                           </div>
                           <div className="text-xs text-white/30 font-mono">DEMO_MODEL_V4</div>
                        </div>
                        
                        <div className="flex flex-col gap-2 items-center text-center">
                           <div className="w-16 h-16 rounded-full bg-[#c9a973]/20 flex items-center justify-center mb-4 text-[#c9a973]">
                             <Check size={32} />
                           </div>
                           <h4 className="text-xl text-white font-light">Treatment Plan Formulated</h4>
                           <p className="text-sm text-white/50">Our specialists will be ready with your personalized {selection} consultation.</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Right Col: Form */}
                <div className="flex flex-col gap-8 justify-center">
                   
                   <div className="flex flex-col gap-6">
                      {/* Premium Floating Label Inputs */}
                      <div className="relative group">
                        <input type="text" id="name" required className="w-full bg-transparent border-b border-white/20 py-4 text-white text-lg focus:outline-none focus:border-[#c9a973] transition-colors peer placeholder-transparent" placeholder="Full Name" />
                        <label htmlFor="name" className="absolute left-0 top-4 text-white/40 text-lg transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#c9a973] peer-valid:-top-3 peer-valid:text-xs peer-valid:text-white/60 cursor-text">
                          Full Name
                        </label>
                      </div>

                      <div className="relative group">
                        <input type="email" id="email" required className="w-full bg-transparent border-b border-white/20 py-4 text-white text-lg focus:outline-none focus:border-[#c9a973] transition-colors peer placeholder-transparent" placeholder="Email Address" />
                        <label htmlFor="email" className="absolute left-0 top-4 text-white/40 text-lg transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#c9a973] peer-valid:-top-3 peer-valid:text-xs peer-valid:text-white/60 cursor-text">
                          Email Address
                        </label>
                      </div>

                      <div className="relative group">
                        <input type="tel" id="phone" required className="w-full bg-transparent border-b border-white/20 py-4 text-white text-lg focus:outline-none focus:border-[#c9a973] transition-colors peer placeholder-transparent" placeholder="Phone Number" />
                        <label htmlFor="phone" className="absolute left-0 top-4 text-white/40 text-lg transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#c9a973] peer-valid:-top-3 peer-valid:text-xs peer-valid:text-white/60 cursor-text">
                          Phone Number
                        </label>
                      </div>
                      
                      <div className="relative group mt-2">
                         <div className="flex items-center border-b border-white/20 py-4 text-white/40 text-lg hover:border-[#c9a973] transition-colors cursor-pointer">
                           <Calendar size={20} className="mr-3 text-[#c9a973]" />
                           <span>Select Date & Time</span>
                         </div>
                      </div>
                   </div>

                   <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-4">
                     <button onClick={handlePrevStep} className="text-white/50 hover:text-white transition-colors text-sm uppercase tracking-widest order-2 sm:order-1">
                        Go Back
                     </button>
                     
                     <button 
                       disabled={isAiGenerating}
                       className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-10 py-4 rounded-full font-medium tracking-wide transition-all shadow-[0_0_20px_rgba(5,150,105,0.3)] hover:shadow-[0_0_30px_rgba(5,150,105,0.5)] order-1 sm:order-2"
                     >
                       Confirm Booking
                     </button>
                   </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
