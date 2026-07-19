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
            className="mb-4 w-80 h-96 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 flex flex-col overflow-hidden"
          >
            <div className="bg-terracotta p-4 flex justify-between items-center text-white">
              <h3 className="font-semibold flex items-center gap-2">
                <Activity size={18} /> Clinical Concierge
              </h3>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
              <div className="bg-cashmere p-3 rounded-lg self-start max-w-[85%] rounded-tl-none text-terracotta shadow-sm">
                <p className="text-sm font-medium">Hello! Welcome to LAVA Clinical Concierge. How can we assist with your Treatment Plan today?</p>
              </div>
            </div>
            <div className="p-3 border-t border-black/5 bg-white flex gap-2">
              <input type="text" placeholder="Describe your dental needs..." className="flex-1 bg-alabaster px-3 py-2 rounded-full outline-none text-sm border border-black/5" />
              <button className="bg-terracotta text-white p-2 rounded-full shadow-md hover:opacity-90 transition-opacity">
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center overflow-hidden border-2 border-terracotta hover:scale-105 transition-transform"
      >
        {lottieData ? (
          <Lottie animationData={lottieData} loop={true} className="w-12 h-12" />
        ) : (
          <Activity className="text-terracotta w-8 h-8" />
        )}
      </button>
    </div>
  );
}
