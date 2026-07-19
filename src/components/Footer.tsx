"use client";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#0D241C] text-[#E5EDDE] py-32">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-1">
            <h3 className="text-5xl font-light tracking-tight mb-8">LAVA.</h3>
            <p className="text-[#E5EDDE]/60 max-w-xs mb-12 font-light tracking-tight text-lg">
              Dentistry that will make you smile. Safe, modern, painless and with a smile!
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#E5EDDE] hover:text-[#0D241C] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#E5EDDE] hover:text-[#0D241C] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#E5EDDE] hover:text-[#0D241C] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-2xl font-light tracking-tight mb-8">Services</h4>
            <ul className="space-y-4 text-[#E5EDDE]/60 font-light tracking-tight text-lg">
              <li><Link href="#services" className="hover:text-white transition-colors">Complex diagnostics</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">Professional hygiene</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">Veneers & Implants</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">Therapy & Surgery</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-2xl font-light tracking-tight mb-8">Company</h4>
            <ul className="space-y-4 text-[#E5EDDE]/60 font-light tracking-tight text-lg">
              <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#team" className="hover:text-white transition-colors">Our Team</Link></li>
              <li><Link href="#portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="#price" className="hover:text-white transition-colors">Price List</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-2xl font-light tracking-tight mb-8">Contact</h4>
            <ul className="space-y-4 text-[#E5EDDE]/60 font-light tracking-tight text-lg">
              <li>+371 20 000 000</li>
              <li>info@lavadental.lv</li>
              <li>Brivibas iela 100, Riga, LV-1011</li>
              <li className="pt-8"><button className="text-white border-b border-white hover:opacity-70 transition-opacity pb-1">Make an appointment</button></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 font-light tracking-tight text-[#E5EDDE]/40">
          <p>&copy; {new Date().getFullYear()} LAVA Dental Clinic. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
