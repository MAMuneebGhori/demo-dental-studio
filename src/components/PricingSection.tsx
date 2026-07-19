"use client";
import { Check } from "lucide-react";

export function PricingSection() {
  const packageIncludes = [
    "Complex examination",
    "Intraoral scanning (3Shape/iTero)",
    "3D CT",
    "Digital smile design (DSD)",
    "Personal treatment plan"
  ];

  return (
    <section id="price" className="py-24 bg-cashmere text-foreground">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-terracotta mb-4">Transparent Pricing</h2>
          <p className="text-lg text-foreground/70">Premium care with absolute clarity.</p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-alabaster rounded-3xl shadow-xl overflow-hidden border border-terracotta/20">
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h3 className="text-3xl font-bold text-foreground">Complex diagnostics</h3>
                <p className="text-terracotta font-medium mt-1">The Perfect Smile</p>
              </div>
              <div className="text-4xl md:text-5xl font-black text-terracotta">280€</div>
            </div>
            
            <div className="w-full h-px bg-terracotta/20 mb-8"></div>
            
            <div className="mb-10">
              <h4 className="text-lg font-semibold mb-6">What's included in the package:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packageIncludes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 bg-terracotta/10 p-1 rounded-full text-terracotta">
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <span className="text-foreground/80 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <button className="w-full bg-terracotta text-white py-4 rounded-xl text-lg font-semibold hover:bg-terracotta/90 transition-all shadow-md hover:shadow-lg">
              Book Diagnostics
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
