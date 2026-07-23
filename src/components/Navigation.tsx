"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

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
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Read the current language from the cookie
    const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
    if (match && match[1]) {
      setCurrentLang(match[1]);
    }
    
    setMounted(true);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  if (pathname?.startsWith("/services/") || pathname?.startsWith("/team/") || pathname === "/appointment") {
    return null;
  }

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
    <nav className={`fixed w-full z-50 transition-all duration-500 flex justify-center ${isScrolled ? "top-4 px-4 sm:px-6" : "top-0 px-0"}`}>
      <div className={`w-full flex justify-between items-center transition-all duration-500 ${
        isScrolled 
          ? "max-w-[1200px] bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-full px-6 py-3 sm:px-8 sm:py-4" 
          : "max-w-[1400px] bg-transparent px-8 py-8"
      }`}>
        {/* Logo */}
        <Link href="/" className="text-3xl font-light tracking-tight text-[#0D241C]">DEMO.</Link>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex gap-8 items-center bg-white/20 px-8 py-2.5 rounded-full border border-white/20 backdrop-blur-sm shadow-sm">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`relative text-sm font-medium tracking-wide transition-all duration-300 ${
                activeSection === link.id 
                  ? "text-[#0D241C]" 
                  : "text-[#0D241C]/60 hover:text-[#0D241C]"
              }`}
            >
              {link.name}
              {activeSection === link.id && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#0D241C] rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex gap-3 text-xs font-semibold tracking-widest text-[#0D241C] uppercase">
            {['en', 'lv', 'ru'].map(lang => (
              <button 
                key={lang} 
                onClick={() => {
                  setCurrentLang(lang);
                  document.cookie = `googtrans=/en/${lang}; path=/`;
                  window.location.reload();
                }}
                aria-label={`Change language to ${lang}`}
                aria-pressed={currentLang === lang}
                className={`transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#0D241C] focus:ring-offset-2 rounded-sm ${
                  currentLang === lang 
                    ? 'border-b-2 border-[#0D241C] opacity-100' 
                    : 'opacity-40 hover:opacity-100'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
          <Link href="/appointment" target="_blank" rel="noopener noreferrer" className="rounded-full px-8 py-3.5 min-h-[44px] bg-[#0a1e16] text-[#E5EDDE] text-sm font-semibold tracking-wide hover:bg-[#0f2e21] hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95">
            Book appointment
          </Link>
        </div>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-[#0D241C] focus:outline-none focus:ring-2 focus:ring-[#0D241C] rounded-md"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="absolute top-full left-0 w-full bg-white shadow-xl lg:hidden flex flex-col p-6 gap-6 rounded-b-3xl border-t border-[#0D241C]/5" role="menu">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg font-medium min-h-[48px] flex items-center active:text-[#c9a973] transition-colors ${
                  activeSection === link.id ? "text-[#c9a973]" : "text-[#0D241C]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="flex gap-4 pt-4 border-t border-[#0D241C]/10">
            {['en', 'lv', 'ru'].map(lang => (
              <button 
                key={lang} 
                onClick={() => {
                  setCurrentLang(lang);
                  document.cookie = `googtrans=/en/${lang}; path=/`;
                  window.location.reload();
                }}
                className={`text-sm font-semibold uppercase ${
                  currentLang === lang ? 'text-[#0D241C] border-b-2 border-[#0D241C]' : 'text-[#0D241C]/40'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <Link 
            href="/appointment" 
            target="_blank" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full text-center rounded-full px-6 py-4 min-h-[56px] flex items-center justify-center bg-[#0a1e16] text-[#E5EDDE] text-lg font-bold tracking-wide active:scale-95 transition-transform shadow-lg"
          >
            Book appointment
          </Link>
        </div>
      )}
    </nav>
  );
}
