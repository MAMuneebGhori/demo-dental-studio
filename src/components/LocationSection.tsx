"use client";
import { MapPin, Navigation } from "lucide-react";

export function LocationSection() {
  return (
    <section id="contacts" className="py-24 bg-sage-light text-forest-dark border-t border-sage-button/20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">We are right here.</h2>
          <p className="text-lg md:text-xl text-forest-dark/80 mb-8 max-w-md">
            Conveniently located to make your appointment even easier. With easy access for people with mobility impairments.
          </p>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <MapPin className="text-sage-button mt-1" />
              <div>
                <h4 className="font-bold text-lg">LAVA Dental Clinic</h4>
                <p className="text-forest-dark/70">Brivibas iela 100, Riga, LV-1011<br/>Latvia</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Navigation className="text-sage-button mt-1" />
              <div>
                <h4 className="font-bold text-lg">Parking</h4>
                <p className="text-forest-dark/70">Free parking available directly behind the clinic (Zone P).</p>
              </div>
            </div>
          </div>
          <button className="mt-10 bg-forest-dark text-sage-light px-8 py-4 rounded-full font-bold hover:bg-forest-dark/90 transition-colors shadow-lg">
            Get Directions
          </button>
        </div>
        
        <div className="relative aspect-square md:aspect-video lg:aspect-square bg-forest-dark rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80" 
            alt="Map location" 
            className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 opacity-70"
          />
          {/* Custom Pins */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-12 h-12 bg-sage-button text-forest-dark rounded-full flex items-center justify-center font-bold text-sm shadow-xl shadow-sage-button/50 border-4 border-forest-dark z-10 relative">
              LAVA
            </div>
            <div className="w-4 h-4 bg-sage-button rotate-45 -mt-2"></div>
          </div>
          <div className="absolute top-[40%] left-[60%] w-8 h-8 bg-forest-dark/80 backdrop-blur text-white border border-white/20 flex items-center justify-center font-bold rounded">
            P
          </div>
        </div>
      </div>
    </section>
  );
}
