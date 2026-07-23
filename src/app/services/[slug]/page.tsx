import { servicesData } from "@/data/services";
import { notFound } from "next/navigation";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import Link from "next/link";
import { X, ChevronRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const service = servicesData.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  // Split description by newlines to create the timeline/steps
  const descriptionSteps = service.description
    ? service.description.split('\n').filter((step) => step.trim() !== '')
    : [];

  return (
    <main className="w-full min-h-screen bg-[#071a12] text-white overflow-x-hidden">
      
      {/* 
        Close Button 
      */}
      <Link 
        href="/#services" 
        className="fixed top-8 right-8 md:top-12 md:right-12 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-[#071a12] hover:scale-105 transition-all z-50 shadow-2xl"
      >
        <X size={24} strokeWidth={1.5} />
      </Link>
      
      {/* 
        SECTION 1: MASSIVE HERO PARALLAX
      */}
      <section className="relative w-full h-[80vh] md:h-[90vh] flex items-end pb-24 md:pb-32 px-4 sm:px-8 md:px-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={service.img} 
            alt={service.name} 
            fill 
            className="object-cover object-center opacity-40 scale-105 hover:scale-110 transition-transform duration-[10s]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071a12] via-[#071a12]/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[1px] bg-[#c9a973]"></span>
            <span className="font-mono text-[#c9a973] tracking-widest text-sm uppercase">Service {service.id}</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif font-light tracking-tight mb-8">
            {service.name}
          </h1>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link 
                href={`/appointment?service=${service.id}`} target="_blank" rel="noopener noreferrer"
              className="rounded-full px-10 py-4 bg-[#c9a973] text-[#071a12] hover:bg-[#b09363] transition-colors font-medium tracking-wide text-lg flex items-center gap-3"
            >
              Book Consultation <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* 
        SECTION 2: CONTENT & TIMELINE
      */}
      <section className="w-full px-4 sm:px-8 md:px-16 py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Col: Introduction */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <h2 className="text-sm text-[#c9a973] uppercase tracking-[0.2em]">Overview</h2>
            <p className="text-2xl md:text-3xl font-light text-white/90 leading-relaxed">
              {descriptionSteps[0]}
            </p>
          </div>

          {/* Right Col: Timeline */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            <h2 className="text-sm text-[#c9a973] uppercase tracking-[0.2em] mb-4">What to Expect</h2>
            
            <div className="flex flex-col gap-8 relative">
              {/* Vertical line connecting steps */}
              <div className="absolute left-6 top-8 bottom-8 w-[1px] bg-white/10" />

              {descriptionSteps.slice(1).map((step, index) => (
                <div key={index} className="flex gap-8 relative z-10 group">
                  <div className="w-12 h-12 rounded-full bg-[#071a12] border border-white/20 flex items-center justify-center shrink-0 group-hover:border-[#c9a973] group-hover:bg-[#c9a973]/10 transition-colors">
                    <CheckCircle2 size={20} className="text-white/40 group-hover:text-[#c9a973] transition-colors" />
                  </div>
                  <div className="flex flex-col pt-3">
                    <span className="text-xs text-white/30 uppercase tracking-widest font-mono mb-2">Phase 0{index + 1}</span>
                    <p className="text-lg md:text-xl font-light text-white/70 leading-relaxed">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 
        SECTION 3: PORTFOLIO GALLERY
      */}
      {service.beforeImg && service.afterImg && (
        <section className="w-full px-4 sm:px-8 md:px-16 pb-32">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div className="flex flex-col gap-4">
                <h2 className="text-sm text-[#c9a973] uppercase tracking-[0.2em]">Clinical Results</h2>
                <h3 className="text-4xl md:text-5xl font-light">Before & After</h3>
              </div>
              <p className="text-white/40 max-w-sm font-light">
                Actual results from DEMO Dental Studio patients. Individual results may vary.
              </p>
            </div>

            <div className="w-full h-[60vh] md:h-[80vh] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative">
              <BeforeAfterSlider beforeImage={service.beforeImg} afterImage={service.afterImg} />
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
