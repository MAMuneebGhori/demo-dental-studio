"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, LayoutDashboard, Users, Calendar, Inbox, Briefcase, CreditCard, LogOut } from "lucide-react";

export function DashboardMobileNav({ role, userEmail }: { role: string, userEmail: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <header className="bg-[#071a12] text-[#E5EDDE] p-4 flex justify-between items-center border-b border-white/10 relative z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#c9a973] rounded-full flex items-center justify-center">
            <span className="text-[#071a12] font-bold font-serif">D</span>
          </div>
          <span className="font-serif text-lg tracking-tight text-white">DEMO</span>
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-[#c9a973] p-1 focus:outline-none focus:ring-2 focus:ring-[#c9a973] rounded-md"
          aria-expanded={isOpen}
          aria-controls="dashboard-mobile-menu"
          aria-label="Toggle dashboard menu"
        >
          {isOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
        </button>
      </header>

      {isOpen && (
        <div id="dashboard-mobile-menu" className="absolute top-[65px] left-0 w-full h-[calc(100vh-65px)] bg-[#071a12] z-40 flex flex-col p-6" role="menu">
          <nav className="space-y-4 flex-1">
            <p className="text-xs uppercase tracking-wider text-[#c9a973]/70 font-semibold mb-4">
              {role === 'admin' ? 'Admin Controls' : 'Doctor Portal'}
            </p>
            <Link 
              href={role === 'admin' ? '/dashboard/admin' : '/dashboard/doctor'} 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-4 py-3 text-white hover:text-[#c9a973] transition-colors"
            >
              <LayoutDashboard size={22} />
              <span className="font-medium text-lg">Overview</span>
            </Link>
            
            {role === 'admin' && (
              <>
                <Link onClick={() => setIsOpen(false)} href="/dashboard/admin/patients" className="flex items-center gap-4 py-3 text-white/70 hover:text-[#c9a973] transition-colors">
                  <Users size={22} />
                  <span className="font-medium text-lg">Patient Directory</span>
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/dashboard/admin/requests" className="flex items-center gap-4 py-3 text-white/70 hover:text-[#c9a973] transition-colors">
                  <Inbox size={22} />
                  <span className="font-medium text-lg">Web Requests</span>
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/dashboard/admin/staff" className="flex items-center gap-4 py-3 text-white/70 hover:text-[#c9a973] transition-colors">
                  <Briefcase size={22} />
                  <span className="font-medium text-lg">Staff Management</span>
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/dashboard/admin/billing" className="flex items-center gap-4 py-3 text-white/70 hover:text-[#c9a973] transition-colors">
                  <CreditCard size={22} />
                  <span className="font-medium text-lg">Billing & Services</span>
                </Link>
              </>
            )}
          </nav>

          <div className="border-t border-white/10 pt-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#c9a973] flex items-center justify-center text-[#071a12] font-bold">
                {userEmail?.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">{userEmail}</p>
                <p className="text-xs text-[#c9a973] capitalize">{role}</p>
              </div>
            </div>
            {/* Direct logout link to avoid form in mobile dropdown issues */}
            <form action="/login" method="GET">
              <button type="submit" className="w-full flex items-center gap-3 py-3 text-red-400 hover:text-red-300 transition-colors">
                <LogOut size={22} />
                <span className="font-medium text-lg">Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
