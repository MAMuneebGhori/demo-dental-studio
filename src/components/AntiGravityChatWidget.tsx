"use client";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Activity } from "lucide-react";

export function AntiGravityChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [lottieData, setLottieData] = useState<any>(null);

  useEffect(() => {
    fetch("https://lottie.host/17b2b78f-5154-4113-a417-6d60aef9778f/Ea6WnK633z.json")
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(() => {});
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="mb-6 w-80 h-96 bg-[#E5EDDE]/95 backdrop-blur-xl border border-[#0D241C]/10 flex flex-col overflow-hidden shadow-2xl"
          >
            <div className="bg-[#0D241C] p-4 flex justify-between items-center text-[#E5EDDE]">
              <h3 className="font-light tracking-tight flex items-center gap-2">
                <Activity size={18} strokeWidth={1} /> Clinical Concierge
              </h3>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity">
                <X size={20} strokeWidth={1} />
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
              <div className="bg-white p-4 self-start max-w-[85%] text-[#0D241C] shadow-sm font-light text-sm leading-relaxed border border-[#0D241C]/5">
                <p>Hello! Welcome to LAVA Clinical Concierge. How can we assist with your Treatment Plan today?</p>
              </div>
            </div>
            <div className="p-4 border-t border-[#0D241C]/10 bg-white flex gap-2">
              <input type="text" placeholder="Describe your dental needs..." className="flex-1 bg-[#E5EDDE]/30 px-4 py-2 outline-none text-sm font-light border border-[#0D241C]/10 focus:border-[#0D241C]/30 transition-colors" />
              <button className="bg-[#0D241C] text-[#E5EDDE] w-10 h-10 flex items-center justify-center hover:bg-black transition-colors shrink-0">
                <Send size={16} strokeWidth={1} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#0D241C] text-[#E5EDDE] rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
      >
        {lottieData ? (
          <Lottie animationData={lottieData} loop={true} className="w-10 h-10 [&>svg>g>g>path]:stroke-[#E5EDDE]" />
        ) : (
          <Activity size={24} strokeWidth={1} />
        )}
      </button>
    </div>
  );
}
