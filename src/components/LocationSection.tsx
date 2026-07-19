"use client";
import { MapPin, Navigation } from "lucide-react";

export function LocationSection() {
  return (
    <section id="contacts" className="py-32 bg-[#E5EDDE] text-[#0D241C] border-t border-[#0D241C]/10">
      <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-8">We are right here.</h2>
          <p className="text-xl font-light tracking-tight text-[#0D241C]/80 mb-12 max-w-md">
            Conveniently located to make your appointment even easier. With easy access for people with mobility impairments.
          </p>
          <div className="space-y-12">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full flex items-center justify-center border border-[#0D241C]/20 shrink-0">
                <MapPin size={20} strokeWidth={1} />
              </div>
              <div>
                <h4 className="font-light tracking-tight text-2xl mb-2">LAVA Dental Clinic</h4>
                <p className="text-[#0D241C]/60 font-light tracking-tight text-lg">Brivibas iela 100, Riga, LV-1011<br/>Latvia</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full flex items-center justify-center border border-[#0D241C]/20 shrink-0">
                <Navigation size={20} strokeWidth={1} />
              </div>
              <div>
                <h4 className="font-light tracking-tight text-2xl mb-2">Parking</h4>
                <p className="text-[#0D241C]/60 font-light tracking-tight text-lg">Free parking available directly behind the clinic (Zone P).</p>
              </div>
            </div>
          </div>
          <button className="mt-16 rounded-full px-8 py-3 bg-[#0D241C] text-white font-light tracking-tight hover:bg-black transition-colors">
            Get Directions
          </button>
        </div>
        
        <div className="relative aspect-square lg:aspect-[4/3] bg-[#0D241C] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80" 
            alt="Map location" 
            className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 opacity-40 mix-blend-screen"
          />
          {/* Custom Pins */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-16 h-16 bg-[#E5EDDE] text-[#0D241C] rounded-full flex items-center justify-center font-light tracking-tighter text-lg shadow-2xl z-10 relative">
              LAVA
            </div>
          </div>
          <div className="absolute top-[40%] left-[65%] w-8 h-8 bg-white text-[#0D241C] flex items-center justify-center font-light text-sm shadow-xl">
            P
          </div>
          <div className="absolute top-[60%] left-[30%] w-8 h-8 bg-white text-[#0D241C] flex items-center justify-center font-light text-sm shadow-xl">
            P
          </div>
        </div>
      </div>
    </section>
  );
}
