"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";

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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-alabaster/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-terracotta tracking-tighter">LAVA.</Link>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex gap-6 xl:gap-8 items-center">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="relative text-sm font-medium text-foreground/80 hover:text-terracotta transition-colors">
              {link.name}
              {activeSection === link.id && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-terracotta"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex gap-2 text-sm font-medium text-foreground/70 uppercase">
            {['en', 'lv', 'ru'].map(lang => (
              <button 
                key={lang} 
                onClick={() => setCurrentLang(lang)}
                className={`hover:text-terracotta transition-colors ${currentLang === lang ? 'text-terracotta font-bold' : ''}`}
              >
                {lang}
              </button>
            ))}
          </div>
          <button className="bg-terracotta text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-terracotta/90 transition-all shadow-md hover:shadow-lg">
            Make an appointment
          </button>
        </div>
      </div>
    </nav>
  );
}
