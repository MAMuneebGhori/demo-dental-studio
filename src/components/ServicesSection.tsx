"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Modal } from "./Modal";

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState<any>(null);

  const topServices = [
    { id: "01", name: "Complex diagnostics", img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&q=80" },
    { id: "02", name: "Professional hygiene", img: "https://images.unsplash.com/photo-1598256989800-fea5ce20dded?w=400&q=80" },
    { id: "03", name: "Veneers", img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&q=80" },
    { id: "04", name: "Dental implants", img: "https://images.unsplash.com/photo-1572522709117-640a4da4dce9?w=400&q=80" },
    { id: "05", name: "ALL-ON-X", img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=80" },
  ];

  const bottomServices = [
    { id: "06", name: "Sedation and anesthesia" },
    { id: "07", name: "Therapy" },
    { id: "08", name: "Endodontics" },
    { id: "09", name: "Surgery" },
  ];

  return (
    <>
      <section id="services">
        {/* Top Layout */}
        <div className="bg-[#E5EDDE] py-32">
          <div className="max-w-[1400px] mx-auto px-8">
            <h2 className="text-5xl md:text-7xl font-light tracking-tight text-[#0D241C] mb-16">Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {topServices.map(service => (
                <div 
                  key={service.id} 
                  className="relative h-[500px] rounded-3xl overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedService(service)}
                >
                  <img src={service.img} alt={service.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale hover:grayscale-0" />
                  <div className="absolute inset-0 bg-[#0D241C]/30 transition-colors" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-between text-[#E5EDDE]">
                    <span className="text-sm font-light tracking-widest opacity-80">{service.id}</span>
                    <h3 className="text-3xl font-light tracking-tight leading-tight">{service.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Layout */}
        <div className="bg-[#0D241C] text-[#E5EDDE] py-32">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="lg:col-start-2 border-t border-white/10">
                {bottomServices.map(service => (
                  <div 
                    key={service.id} 
                    className="flex justify-between items-center py-8 border-b border-white/10 cursor-pointer group hover:opacity-70 transition-opacity"
                    onClick={() => setSelectedService(service)}
                  >
                    <div className="flex gap-8 items-center">
                      <span className="font-light tracking-widest text-[#E5EDDE]/50">{service.id}</span>
                      <span className="text-3xl font-light tracking-tight">{service.name}</span>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#E5EDDE] text-[#0D241C]">
                      <ArrowUpRight size={24} strokeWidth={1} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Modal */}
      <Modal isOpen={!!selectedService} onClose={() => setSelectedService(null)}>
        {selectedService && (
          <div className="w-full min-h-screen flex flex-col md:flex-row text-[#E5EDDE]">
            <div className="flex-1 flex flex-col justify-center p-8 md:p-24">
              <span className="font-light tracking-widest text-xl mb-6 opacity-60">{selectedService.id}</span>
              <h2 className="text-5xl md:text-8xl font-light tracking-tight mb-12">{selectedService.name}</h2>
              <ul className="space-y-6 mb-16 text-2xl font-light text-white/80 border-t border-white/10 pt-12">
                <li className="flex items-center gap-6">
                  <div className="w-2 h-2 rounded-full bg-[#E5EDDE]"></div> Advanced digital planning
                </li>
                <li className="flex items-center gap-6">
                  <div className="w-2 h-2 rounded-full bg-[#E5EDDE]"></div> Painless execution
                </li>
                <li className="flex items-center gap-6">
                  <div className="w-2 h-2 rounded-full bg-[#E5EDDE]"></div> Long-term warranty
                </li>
              </ul>
              <div className="flex gap-6">
                <button className="rounded-full px-8 py-3 bg-[#E5EDDE] text-[#0D241C] hover:bg-white transition-colors font-light tracking-tight">
                  Make an appointment
                </button>
                <button className="rounded-full px-8 py-3 border border-[#E5EDDE]/20 text-[#E5EDDE] hover:bg-white/10 transition-colors font-light tracking-tight">
                  Learn more
                </button>
              </div>
            </div>
            <div className="flex-1 hidden md:block">
              {selectedService.img ? (
                <img src={selectedService.img} alt={selectedService.name} className="w-full h-full object-cover filter grayscale" />
              ) : (
                <div className="w-full h-full bg-[#0D241C] flex items-center justify-center">
                  <span className="text-[#E5EDDE]/30 text-2xl font-light">No image available</span>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
