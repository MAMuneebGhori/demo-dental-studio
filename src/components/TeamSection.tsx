"use client";
import { useState } from "react";
import { Modal } from "./Modal";

export function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const team = [
    { id: 1, name: "Dr. Anna Petrova", role: "Chief Prosthodontist", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&q=80", bio: "With over 15 years of experience in restorative dentistry..." },
    { id: 2, name: "Dr. Juris Kalnins", role: "Implantologist", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&q=80", bio: "A leading expert in All-On-X procedures and bone grafting..." },
    { id: 3, name: "Liene Berzina", role: "Aesthetician", img: "https://images.unsplash.com/photo-1594824432258-6902264bb3e3?w=500&q=80", bio: "Specializing in digital smile design and veneers..." },
    { id: 4, name: "Dr. Martins Ozols", role: "Endodontist", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&q=80", bio: "Using microscopic precision to save teeth..." },
  ];

  return (
    <>
      <section id="team" className="py-24 bg-sage-light text-forest-dark">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map(member => (
              <div 
                key={member.id} 
                className="group cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                  <img src={member.img} alt={member.name} className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-forest-dark/20 group-hover:bg-transparent transition-colors" />
                </div>
                <h3 className="text-xl font-bold group-hover:text-sage-button transition-colors">{member.name}</h3>
                <p className="text-forest-dark/70 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Modal */}
      <Modal isOpen={!!selectedMember} onClose={() => setSelectedMember(null)}>
        {selectedMember && (
          <div className="w-full h-full flex flex-col md:flex-row">
            <div className="md:w-1/2 h-64 md:h-full">
              <img src={selectedMember.img} alt={selectedMember.name} className="w-full h-full object-cover filter grayscale" />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-sage-light">
              <span className="text-sage-button uppercase tracking-widest text-sm font-bold mb-2">{selectedMember.role}</span>
              <h2 className="text-4xl font-bold mb-6">{selectedMember.name}</h2>
              <p className="text-sage-light/80 text-lg leading-relaxed mb-8">
                {selectedMember.bio}
                <br/><br/>
                We change the experience and help you regain confidence. In our care, you'll receive not only treatment and a perfect smile, but also care, openness and support all the way to the result.
              </p>
              <button className="self-start bg-sage-button text-forest-dark px-6 py-3 rounded-full font-bold hover:bg-sage-light transition-colors">
                Book a consultation
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
