"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "How do I book an appointment at DEMO Dental Studio?",
    a: "You can book an appointment by clicking the \"Make an appointment\" button anywhere on our website, calling us directly, or writing via WhatsApp. We typically confirm your appointment within 2 hours during business hours.",
  },
  {
    q: "Is the first consultation free?",
    a: "Your first consultation is available from 55€ and includes a full oral examination and a panoramic X-ray. This gives us a complete picture of your dental health and allows us to create a precise treatment plan tailored to you.",
  },
  {
    q: "Do you offer sedation for anxious patients?",
    a: "Absolutely. We offer a full range of sedation options — from mild nitrous oxide (laughing gas) to deep intravenous sedation, supervised by a certified anesthesiologist. You simply tell us your comfort level and we take care of the rest.",
  },
  {
    q: "How long does a dental implant procedure take?",
    a: "The implant placement surgery itself typically takes 30–60 minutes per implant. After a healing period of 2–4 months, we attach the final crown. However, with our ALL-ON-X protocol, a full arch of teeth can be placed and loaded in a single day.",
  },
  {
    q: "What is the EMS AIRFLOW® Prophylaxis Master?",
    a: "It is the world's leading professional teeth cleaning system, used within the Guided Biofilm Therapy (GBT) protocol. Unlike traditional scaling, AIRFLOW® uses a warm water-powder spray to gently and comprehensively remove biofilm, pigments, and soft deposits — without discomfort and without damaging tooth tissue.",
  },
  {
    q: "How long do veneers last?",
    a: "High-quality E-max ceramic veneers, like those we use at DEMO, typically last 15–20+ years with proper care. We provide a full warranty and offer detailed aftercare instructions to maximize their longevity.",
  },
  {
    q: "Do you treat children?",
    a: "Yes! Our pediatric dentistry team creates a completely fear-free, welcoming environment for children. We recommend a child's first dental visit as soon as their first tooth appears, or by their first birthday at the latest.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept cash, all major bank cards, and contactless payments. We also work with several health insurance providers — please contact us to check if your plan is covered. Interest-free installment plans are available for larger treatments.",
  },
];

function FaqItem({ faq, index, isOpen, onToggle }: {
  faq: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="group border-b border-[#E5EDDE]/15">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 py-7 text-left"
      >
        <span className={`text-lg md:text-xl font-light tracking-tight transition-colors duration-200 ${
          isOpen ? "text-[#E5EDDE]" : "text-[#E5EDDE]/50 group-hover:text-[#E5EDDE]"
        }`}>
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          className={`flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-colors duration-200 ${
            isOpen
              ? "bg-[#E5EDDE] border-[#E5EDDE] text-[#0D241C]"
              : "border-[#E5EDDE]/20 text-[#E5EDDE]/40 group-hover:border-[#E5EDDE]/50"
          }`}
        >
          <Plus size={16} strokeWidth={1.5} />
        </motion.div>
      </button>

      {/* CSS max-height transition — never blocks scroll */}
      <div
        style={{
          maxHeight: isOpen ? (contentRef.current?.scrollHeight ?? 400) + "px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div ref={contentRef}>
          <p className="pb-8 pr-12 text-[#E5EDDE]/60 font-light text-base md:text-lg leading-relaxed max-w-3xl">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  return (
    <section id="faq" className="bg-[#0D241C] py-32 px-8">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <p className="text-[#E5EDDE]/40 text-xs tracking-[0.3em] uppercase mb-4">Got questions?</p>
            <h2 className="text-5xl md:text-7xl font-light tracking-tight text-[#E5EDDE] leading-none">
              FAQ
            </h2>
          </div>
          <p className="text-[#E5EDDE]/50 font-light text-lg max-w-xs leading-relaxed">
            Everything you need to know before your visit.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col border-t border-[#E5EDDE]/15">
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIdx === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 pt-12 border-t border-[#E5EDDE]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-xl font-light text-[#E5EDDE] mb-1">Still have questions?</p>
            <p className="text-[#E5EDDE]/45 font-light">Our team is happy to answer anything.</p>
          </div>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
            className="rounded-full px-8 py-3 bg-[#E5EDDE] text-[#0D241C] hover:bg-white hover:scale-105 transition-all font-light text-sm tracking-wide"
          >
            Contact us
          </button>
        </div>
      </div>
    </section>
  );
}
