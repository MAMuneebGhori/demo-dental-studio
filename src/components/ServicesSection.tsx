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
    { id: "10", name: "Aligners" },
  ];

  return (
    <>
      <section id="services">
        {/* Top Layout */}
        <div className="bg-sage-light py-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-forest-dark mb-16">Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {topServices.map(service => (
                <div 
                  key={service.id} 
                  className="relative h-[400px] rounded-2xl overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedService(service)}
                >
                  <img src={service.img} alt={service.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-forest-dark/60 group-hover:bg-forest-dark/40 transition-colors" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                    <span className="text-sm font-mono opacity-80">{service.id}</span>
                    <h3 className="text-xl font-bold">{service.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Layout */}
        <div className="bg-forest-dark text-sage-light py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="lg:col-start-2 border-t border-sage-light/20">
                {bottomServices.map(service => (
                  <div 
                    key={service.id} 
                    className="flex justify-between items-center py-6 border-b border-sage-light/20 cursor-pointer group hover:text-sage-button transition-colors"
                    onClick={() => setSelectedService(service)}
                  >
                    <div className="flex gap-6 items-center">
                      <span className="font-mono text-sage-light/50">{service.id}</span>
                      <span className="text-2xl font-medium">{service.name}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-sage-light/30 flex items-center justify-center group-hover:bg-sage-button group-hover:border-sage-button group-hover:text-forest-dark transition-all transform group-hover:scale-110">
                      <ArrowUpRight size={20} />
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
          <div className="w-full h-full flex flex-col md:flex-row p-8 md:p-12 gap-8 text-sage-light">
            <div className="flex-1 flex flex-col justify-center">
              <span className="text-sage-button font-mono text-xl mb-4">{selectedService.id}</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">{selectedService.name}</h2>
              <ul className="space-y-4 mb-12 text-lg text-sage-light/80">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-sage-button"></div> Advanced digital planning
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-sage-button"></div> Painless execution
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-sage-button"></div> Long-term warranty
                </li>
              </ul>
              <div className="flex gap-4">
                <button className="bg-sage-button text-forest-dark px-6 py-3 rounded-full font-bold hover:bg-sage-light transition-colors">
                  Make an appointment
                </button>
                <button className="border border-sage-button text-sage-button px-6 py-3 rounded-full font-bold hover:bg-sage-button hover:text-forest-dark transition-colors">
                  Learn more
                </button>
              </div>
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden hidden md:block">
              {selectedService.img ? (
                <img src={selectedService.img} alt={selectedService.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-sage-light/10 flex items-center justify-center">
                  <span className="text-sage-light/30 text-lg">No image available</span>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
