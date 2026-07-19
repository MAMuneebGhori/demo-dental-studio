"use client";

export function PortfolioSection() {
  const images = [
    { id: 1, src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80", label: "VENEERS" },
    { id: 2, src: "https://images.unsplash.com/photo-1598256989800-fea5ce20dded?auto=format&fit=crop&w=600&q=80", label: "IMPLANTS" },
    { id: 3, src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80", label: "HYGIENE" },
    { id: 4, src: "https://images.unsplash.com/photo-1572522709117-640a4da4dce9?auto=format&fit=crop&w=600&q=80", label: "AESTHETICS" },
  ];

  return (
    <section id="portfolio" className="py-24 bg-sage-light text-forest-dark">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 max-w-2xl leading-tight">
          Our patients' smiles speak for themselves.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {images.map((img, i) => (
            <div 
              key={img.id} 
              className={`relative rounded-3xl overflow-hidden shadow-lg group ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
            >
              <img 
                src={img.src} 
                alt={img.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-forest-dark/10 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-6 left-6 bg-white/30 backdrop-blur-md border border-white/40 text-forest-dark text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                {img.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
