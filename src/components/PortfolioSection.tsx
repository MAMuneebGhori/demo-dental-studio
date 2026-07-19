"use client";

export function PortfolioSection() {
  const images = [
    { id: 1, src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80", label: "VENEERS" },
    { id: 2, src: "https://images.unsplash.com/photo-1598256989800-fea5ce20dded?auto=format&fit=crop&w=600&q=80", label: "IMPLANTS" },
    { id: 3, src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80", label: "HYGIENE" },
    { id: 4, src: "https://images.unsplash.com/photo-1572522709117-640a4da4dce9?auto=format&fit=crop&w=600&q=80", label: "AESTHETICS" },
  ];

  return (
    <section id="portfolio" className="py-32 bg-[#E5EDDE] text-[#0D241C]">
      <div className="w-full px-4 md:px-8 mb-16">
        <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-8 max-w-[1400px] mx-auto leading-tight">
          Our patients' smiles speak for themselves.
        </h2>
      </div>
        
      {/* Edge-to-edge masonry grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {images.map((img, i) => (
          <div 
            key={img.id} 
            className={`relative overflow-hidden group ${i === 0 ? "md:col-span-2 md:row-span-2 aspect-video md:aspect-auto h-[40vh] md:h-[80vh]" : "aspect-square md:aspect-auto md:h-[40vh]"}`}
          >
            <img 
              src={img.src} 
              alt={img.label}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-[#0D241C]/20 transition-colors duration-700" />
            <div className="absolute bottom-6 left-6 bg-[#E5EDDE] px-3 py-1 text-xs font-light tracking-tight text-[#0D241C] uppercase shadow-lg border border-white/40 backdrop-blur-md">
              {img.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
