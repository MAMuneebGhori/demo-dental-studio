"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ["about", "portfolio", "services", "team", "price", "faq", "contacts"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "About us", href: "#about", id: "about" },
    { name: "Portfolio", href: "#portfolio", id: "portfolio" },
    { name: "Services", href: "#services", id: "services" },
    { name: "Team", href: "#team", id: "team" },
    { name: "Price list", href: "#price", id: "price" },
    { name: "FAQ", href: "#faq", id: "faq" },
    { name: "Contacts", href: "#contacts", id: "contacts" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#E5EDDE]/95 backdrop-blur-md border-b border-[#0D241C]/10 py-4" : "bg-transparent py-8"}`}>
      <div className="max-w-[1400px] mx-auto px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-3xl font-light tracking-tight text-[#0D241C]">LAVA.</Link>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex gap-8 items-center">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`relative text-base font-light tracking-tight text-[#0D241C] hover:opacity-70 transition-opacity ${activeSection === link.id ? "border-b border-current" : ""}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex gap-4 text-sm font-light tracking-tight text-[#0D241C] uppercase">
            {['en', 'lv', 'ru'].map(lang => (
              <button 
                key={lang} 
                onClick={() => setCurrentLang(lang)}
                className={`hover:opacity-70 transition-opacity ${currentLang === lang ? 'border-b border-current' : 'opacity-60'}`}
              >
                {lang}
              </button>
            ))}
          </div>
          <button className="rounded-full px-8 py-3 bg-[#0D241C] text-white font-light tracking-tight hover:bg-black transition-colors">
            Make an appointment
          </button>
        </div>
      </div>
    </nav>
  );
}
