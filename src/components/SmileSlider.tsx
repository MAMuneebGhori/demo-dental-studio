"use client";
import { useState } from "react";

export function SmileSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  
  return (
    <section id="portfolio" className="py-24 bg-alabaster">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-terracotta mb-4">Transformations</h2>
          <p className="text-lg text-foreground/70">Slide to reveal the before and after.</p>
        </div>
        
        <div className="relative w-full aspect-square md:aspect-[16/9] overflow-hidden rounded-2xl shadow-xl cursor-ew-resize">
          {/* After Image (Background) */}
          <img 
            src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2000&auto=format&fit=crop" 
            alt="After" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Before Image (Clipped) */}
          <div 
            className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img 
              src="https://images.unsplash.com/photo-1598256989800-fea5ce20dded?q=80&w=2000&auto=format&fit=crop" 
              alt="Before" 
              className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-75"
            />
          </div>
          
          {/* Slider Input */}
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={sliderPosition} 
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
          />
          
          {/* Slider Line */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10 pointer-events-none"
            style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-cashmere rounded-full"></div>
                <div className="w-1 h-3 bg-cashmere rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
