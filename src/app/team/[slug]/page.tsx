import { teamData } from "@/data/team";
import { notFound } from "next/navigation";
import Link from "next/link";
import { X } from "lucide-react";

export async function generateStaticParams() {
  return teamData.map((member) => ({ slug: member.slug }));
}

export default async function TeamMemberPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const member = teamData.find((m) => m.slug === params.slug);

  if (!member) notFound();

  return (
    <main className="w-full min-h-screen bg-[#0D241C] text-[#E5EDDE] relative overflow-x-hidden">
      {/* Close button */}
      <Link
        href="/#team"
        className="fixed top-8 right-8 w-12 h-12 rounded-full flex items-center justify-center bg-[#E5EDDE] text-[#0D241C] hover:scale-110 transition-all z-50 shadow-xl"
      >
        <X size={20} strokeWidth={1.5} />
      </Link>

      {/* Hero — full-screen split */}
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Photo side */}
        <div className="w-full md:w-1/2 relative min-h-[60vh] md:min-h-screen md:fixed md:top-0 md:left-0 md:h-screen">
          <img
            src={member.img}
            alt={member.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D241C]/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0D241C]/60" />
          {/* Name on photo for mobile */}
          <div className="absolute bottom-8 left-8 md:hidden">
            <p className="text-[#E5EDDE]/60 text-sm tracking-widest mb-2 font-light">{member.role}</p>
            <h1 className="text-4xl font-light tracking-tight">{member.name}</h1>
          </div>
        </div>

        {/* Content side — scrollable */}
        <div className="w-full md:w-1/2 md:ml-[50%] min-h-screen">
          <div className="px-8 md:px-16 pt-24 pb-32 flex flex-col gap-12">
            {/* Name block — desktop */}
            <div className="hidden md:block">
              <p className="text-[#E5EDDE]/40 text-sm tracking-[0.3em] uppercase mb-4 font-light">{member.specialty}</p>
              <h1 className="text-6xl lg:text-8xl font-light tracking-tight leading-none mb-3">{member.name.split(" ")[0]}</h1>
              <h1 className="text-6xl lg:text-8xl font-light tracking-tight leading-none text-[#E5EDDE]/30">{member.name.split(" ").slice(1).join(" ")}</h1>
              <p className="mt-6 text-xl text-[#E5EDDE]/60 font-light">{member.role}</p>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 border-t border-b border-[#E5EDDE]/10 py-8">
              <div>
                <p className="text-3xl font-light">{member.experience}</p>
                <p className="text-sm text-[#E5EDDE]/40 tracking-widest mt-1">Experience</p>
              </div>
              <div className="border-l border-[#E5EDDE]/10 pl-8">
                <p className="text-3xl font-light">{member.languages.length}</p>
                <p className="text-sm text-[#E5EDDE]/40 tracking-widest mt-1">Languages</p>
              </div>
              <div className="border-l border-[#E5EDDE]/10 pl-8">
                <p className="text-3xl font-light">{member.awards.length}</p>
                <p className="text-sm text-[#E5EDDE]/40 tracking-widest mt-1">Awards</p>
              </div>
            </div>

            {/* Quote */}
            <blockquote className="border-l-2 border-[#E5EDDE]/20 pl-6">
              <p className="text-2xl font-light leading-relaxed text-[#E5EDDE]/80 italic">&ldquo;{member.quote}&rdquo;</p>
            </blockquote>

            {/* Bio */}
            <div>
              <h2 className="text-xs tracking-[0.3em] uppercase text-[#E5EDDE]/40 mb-6">About</h2>
              <p className="text-lg font-light leading-relaxed text-[#E5EDDE]/70 whitespace-pre-wrap">{member.bio}</p>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs tracking-[0.3em] uppercase text-[#E5EDDE]/40 mb-6">Education</h2>
              <ul className="space-y-4">
                {member.education.map((edu, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#E5EDDE]/30 flex-shrink-0" />
                    <span className="text-[#E5EDDE]/70 font-light">{edu}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages */}
            <div>
              <h2 className="text-xs tracking-[0.3em] uppercase text-[#E5EDDE]/40 mb-6">Languages</h2>
              <div className="flex flex-wrap gap-3">
                {member.languages.map((lang) => (
                  <span key={lang} className="px-5 py-2 rounded-full border border-[#E5EDDE]/20 text-[#E5EDDE]/70 font-light text-sm">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div>
              <h2 className="text-xs tracking-[0.3em] uppercase text-[#E5EDDE]/40 mb-6">Awards & Recognition</h2>
              <ul className="space-y-3">
                {member.awards.map((award, i) => (
                  <li key={i} className="flex gap-4 items-center">
                    <span className="text-[#E5EDDE]/30 text-xl">✦</span>
                    <span className="text-[#E5EDDE]/70 font-light">{award}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="pt-8">
              <button className="rounded-full px-10 py-4 bg-[#E5EDDE] text-[#0D241C] hover:bg-white hover:scale-105 transition-all font-light tracking-tight text-lg">
                Book a Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
