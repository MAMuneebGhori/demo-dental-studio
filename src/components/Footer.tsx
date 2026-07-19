"use client";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-forest-dark text-sage-light py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <h3 className="text-3xl font-bold text-sage-button mb-6">LAVA.</h3>
            <p className="text-sage-light/70 max-w-xs mb-8">
              Dentistry that will make you smile. Safe, modern, painless and with a smile!
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-sage-light/20 flex items-center justify-center hover:bg-sage-button hover:text-forest-dark transition-colors"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-sage-light/20 flex items-center justify-center hover:bg-sage-button hover:text-forest-dark transition-colors"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-sage-light/20 flex items-center justify-center hover:bg-sage-button hover:text-forest-dark transition-colors"><Twitter size={18} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Services</h4>
            <ul className="space-y-4 text-sage-light/70">
              <li><Link href="#services" className="hover:text-sage-button transition-colors">Complex diagnostics</Link></li>
              <li><Link href="#services" className="hover:text-sage-button transition-colors">Professional hygiene</Link></li>
              <li><Link href="#services" className="hover:text-sage-button transition-colors">Veneers & Implants</Link></li>
              <li><Link href="#services" className="hover:text-sage-button transition-colors">Therapy & Surgery</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Company</h4>
            <ul className="space-y-4 text-sage-light/70">
              <li><Link href="#about" className="hover:text-sage-button transition-colors">About Us</Link></li>
              <li><Link href="#team" className="hover:text-sage-button transition-colors">Our Team</Link></li>
              <li><Link href="#portfolio" className="hover:text-sage-button transition-colors">Portfolio</Link></li>
              <li><Link href="#price" className="hover:text-sage-button transition-colors">Price List</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Contact</h4>
            <ul className="space-y-4 text-sage-light/70">
              <li>+371 20 000 000</li>
              <li>info@lavadental.lv</li>
              <li>Brivibas iela 100, Riga, LV-1011</li>
              <li className="pt-4"><button className="text-sage-button border-b border-sage-button hover:text-white hover:border-white transition-colors pb-1">Make an appointment</button></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-sage-light/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-sage-light/50">
          <p>&copy; {new Date().getFullYear()} LAVA Dental Clinic. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-sage-button">Privacy Policy</Link>
            <Link href="#" className="hover:text-sage-button">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
