"use client";
import { useState } from "react";
import { Modal } from "./Modal";

export function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const team = [
    { id: 1, name: "Dr. Anna Berzina", role: "Chief Medical Officer", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Dr. Marcis Ozols", role: "Implantologist", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80" },
    { id: 3, name: "Dr. Laura Kalnina", role: "Orthodontist", img: "https://images.unsplash.com/photo-1594824432258-0a09e072b220?auto=format&fit=crop&w=400&q=80" },
    { id: 4, name: "Dr. Janis Krumins", role: "Prosthodontist", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80" },
  ];

  return (
    <>
      <section id="team" className="py-32 bg-[#E5EDDE] text-[#0D241C]">
        <div className="max-w-[1400px] mx-auto px-8">
          <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-16">The Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map(member => (
              <div 
                key={member.id} 
                className="group cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-6">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-[#0D241C]/10 transition-colors" />
                </div>
                <h3 className="text-2xl font-light tracking-tight mb-2">{member.name}</h3>
                <p className="text-lg font-light tracking-tight text-[#0D241C]/60">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Modal isOpen={!!selectedMember} onClose={() => setSelectedMember(null)}>
        {selectedMember && (
          <div className="w-full min-h-screen flex flex-col md:flex-row text-[#E5EDDE]">
            <div className="flex-1 hidden md:block">
              <img src={selectedMember.img} alt={selectedMember.name} className="w-full h-full object-cover filter grayscale" />
            </div>
            <div className="flex-1 flex flex-col justify-center p-8 md:p-24">
              <h2 className="text-5xl md:text-8xl font-light tracking-tight mb-6">{selectedMember.name}</h2>
              <p className="text-2xl font-light tracking-tight text-[#E5EDDE]/60 mb-12">{selectedMember.role}</p>
              <div className="border-t border-white/10 pt-12 space-y-6 text-xl font-light tracking-tight text-white/80">
                <p>
                  With over 15 years of clinical experience, Dr. {selectedMember.name.split(" ")[1]} has transformed thousands of smiles using advanced microscopic dentistry.
                </p>
                <p>
                  "My philosophy is simple: treat every patient exactly as I would treat my own family. Precision, patience, and absolute transparency."
                </p>
              </div>
              <div className="mt-16">
                <button className="rounded-full px-8 py-3 bg-[#E5EDDE] text-[#0D241C] hover:bg-white transition-colors font-light tracking-tight">
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
