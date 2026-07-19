"use client";
import { useState } from "react";
import { Check } from "lucide-react";
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
    "Complex diagnostics": {
      title: "The Perfect Smile",
      price: "280€",
      features: [
        "Complex examination",
        "Intraoral scanning (3Shape/iTero)",
        "3D CT",
        "Digital smile design (DSD)",
        "Personal treatment plan"
      ]
    },
    "Dental and oral hygiene": {
      title: "Professional Cleansing",
      price: "95€",
      features: [
        "Ultrasonic scaling",
        "Air-Flow polishing",
        "Fluoride application",
        "Oral hygiene instructions"
      ]
    },
    "Dental makeover and therapy": {
      title: "Restorative Care",
      price: "from 150€",
      features: [
        "Caries treatment",
        "Aesthetic filling",
        "Root canal therapy",
        "Microscope assisted precision"
      ]
    },
    "Aesthetics and correction": {
      title: "Ceramic Veneers",
      price: "from 600€",
      features: [
        "E-max ceramic",
        "Minimal preparation",
        "Digital smile preview",
        "Long-lasting results"
      ]
    }
  };

  return (
    <section id="price" className="py-24 bg-sage-light text-forest-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Price list - invest in your smile</h2>
        </div>
        
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${activeTab === tab ? "bg-forest-dark text-sage-light shadow-lg scale-105" : "bg-white text-forest-dark border border-sage-button/20 hover:bg-sage-button/10"}`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-sage-button/20 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-8 md:p-12 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <div>
                    <h3 className="text-3xl font-bold">{activeTab}</h3>
                    <p className="text-sage-button font-medium mt-1">{content[activeTab].title}</p>
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-sage-button">{content[activeTab].price}</div>
                </div>
                
                <div className="w-full h-px bg-sage-button/20 mb-8"></div>
                
                <div className="mb-10">
                  <h4 className="text-lg font-semibold mb-6">What's included in the package:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content[activeTab].features.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-1 bg-sage-button/20 p-1 rounded-full text-sage-button">
                          <Check size={16} strokeWidth={3} />
                        </div>
                        <span className="font-medium text-forest-dark/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <button className="w-full bg-forest-dark text-sage-light py-4 rounded-xl text-lg font-bold hover:bg-forest-dark/90 transition-all shadow-md hover:shadow-lg mt-8">
                Make an appointment
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
