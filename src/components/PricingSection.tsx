"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PricingSection() {
  const [activeTab, setActiveTab] = useState("Complex diagnostics");

  const tabs = [
    "Complex diagnostics",
    "Dental and oral hygiene",
    "Dental makeover and therapy",
    "Aesthetics and correction"
  ];

  const content: Record<string, any> = {
    "Complex diagnostics": [
      { name: "First consultation + panoramic X-ray", price: "from 55€" },
      { name: "Digital smile design (DSD)", price: "120€" },
      { name: "The Perfect Smile package (3D CT, DSD, Plan)", price: "280€" }
    ],
    "Dental and oral hygiene": [
      { name: "Professional dental hygiene (AirFlow)", price: "95€" },
      { name: "Periodontal treatment (per tooth)", price: "from 45€" },
      { name: "Teeth whitening (Philips Zoom!)", price: "350€" }
    ],
    "Dental makeover and therapy": [
      { name: "Aesthetic filling (1 surface)", price: "from 90€" },
      { name: "Aesthetic filling (2+ surfaces)", price: "from 150€" },
      { name: "Microscope root canal therapy (1 canal)", price: "200€" },
      { name: "Tooth extraction (simple)", price: "from 80€" }
    ],
    "Aesthetics and correction": [
      { name: "E-max ceramic veneer", price: "from 600€" },
      { name: "Zirconia crown", price: "from 500€" },
      { name: "Premium implant placement (surgery)", price: "from 800€" },
      { name: "Implant crown", price: "from 650€" }
    ]
  };

  return (
    <section id="price" className="py-32 bg-[#E5EDDE] text-[#0D241C]">
      <div className="max-w-[1400px] mx-auto px-8">
        <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-16 leading-tight">Price list - invest in your smile</h2>
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-8 border-b border-[#0D241C]/10 mb-16 pb-4">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-2xl font-light tracking-tight pb-2 transition-all relative hover:opacity-70 ${activeTab === tab ? "opacity-100" : "opacity-40"}`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="priceTab"
                  className="absolute -bottom-4 left-0 right-0 h-0.5 bg-[#0D241C]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        <div className="max-w-4xl min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col"
            >
              {content[activeTab].map((item: any, i: number) => (
                <div key={i} className="flex justify-between items-center py-8 border-b border-[#0D241C]/10 group hover:bg-white/30 transition-colors -mx-4 px-4">
                  <span className="text-2xl font-light tracking-tight">{item.name}</span>
                  <span className="text-2xl font-light tracking-tight">{item.price}</span>
                </div>
              ))}
              
              <div className="mt-16">
                <button className="rounded-full px-8 py-3 bg-[#0D241C] text-white font-light tracking-tight hover:bg-black transition-colors">
                  Make an appointment
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
