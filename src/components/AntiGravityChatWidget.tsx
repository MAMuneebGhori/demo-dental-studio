"use client";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Activity } from "lucide-react";

export function AntiGravityChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [lottieData, setLottieData] = useState<any>(null);

  useEffect(() => {
    // Medical pulse/scan placeholder from lottie.host
    fetch("https://lottie.host/17b2b78f-5154-4113-a417-6d60aef9778f/Ea6WnK633z.json")
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(() => {});
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="mb-4 w-80 h-96 bg-sage-light/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-forest-dark/10 flex flex-col overflow-hidden"
          >
            <div className="bg-forest-dark p-4 flex justify-between items-center text-sage-light">
              <h3 className="font-semibold flex items-center gap-2">
                <Activity size={18} className="text-sage-button" /> Clinical Concierge
              </h3>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
              <div className="bg-white p-3 rounded-lg self-start max-w-[85%] rounded-tl-none text-forest-dark shadow-sm border border-forest-dark/5">
                <p className="text-sm font-medium">Hello! Welcome to LAVA Clinical Concierge. How can we assist with your Treatment Plan today?</p>
              </div>
            </div>
            <div className="p-3 border-t border-forest-dark/10 bg-white flex gap-2">
              <input type="text" placeholder="Describe your dental needs..." className="flex-1 bg-sage-light/50 px-3 py-2 rounded-full outline-none text-sm border border-forest-dark/10 focus:border-sage-button" />
              <button className="bg-forest-dark text-sage-light p-2 rounded-full shadow-md hover:bg-sage-button transition-colors">
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-forest-dark rounded-full shadow-2xl flex items-center justify-center overflow-hidden border-2 border-sage-button hover:scale-105 transition-transform"
      >
        {lottieData ? (
          <Lottie animationData={lottieData} loop={true} className="w-12 h-12 [&>svg>g>g>path]:stroke-sage-button" />
        ) : (
          <Activity className="text-sage-button w-8 h-8" />
        )}
      </button>
    </div>
  );
}
