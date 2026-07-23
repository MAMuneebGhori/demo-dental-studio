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
          className="text-[#c9a973] p-2 min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#c9a973] active:bg-[#c9a973]/20 rounded-md transition-colors"
          aria-expanded={isOpen}
          aria-controls="dashboard-mobile-menu"
          aria-label="Toggle dashboard menu"
        >
          {isOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
        </button>
      </header>

      {isOpen && (
        <>
          {/* Backdrop overlay to close menu on tap */}
          <div 
            className="fixed inset-0 bg-black/40 z-30 md:hidden" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div 
            id="dashboard-mobile-menu" 
            className="fixed top-[65px] left-0 w-full h-[calc(100dvh-65px)] bg-[#071a12] z-40 flex flex-col p-6 overflow-y-auto" 
            role="menu"
          >
            <nav className="space-y-2 flex-1">
              <p className="text-xs uppercase tracking-wider text-[#c9a973]/70 font-semibold mb-4">
                {role === 'admin' ? 'Admin Controls' : 'Doctor Portal'}
              </p>
              <Link 
                href={role === 'admin' ? '/dashboard/admin' : '/dashboard/doctor'} 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 min-h-[48px] px-3 py-3 rounded-xl text-white active:bg-white/10 hover:text-[#c9a973] transition-colors"
              >
                <LayoutDashboard size={22} aria-hidden="true" />
                <span className="font-medium text-lg">Overview</span>
              </Link>
              
              {role === 'admin' && (
                <>
                  <Link onClick={() => setIsOpen(false)} href="/dashboard/admin/patients" className="flex items-center gap-4 min-h-[48px] px-3 py-3 rounded-xl text-white/70 active:bg-white/10 hover:text-[#c9a973] transition-colors">
                    <Users size={22} aria-hidden="true" />
                    <span className="font-medium text-lg">Patient Directory</span>
                  </Link>
                  <Link onClick={() => setIsOpen(false)} href="/dashboard/admin/requests" className="flex items-center gap-4 min-h-[48px] px-3 py-3 rounded-xl text-white/70 active:bg-white/10 hover:text-[#c9a973] transition-colors">
                    <Inbox size={22} aria-hidden="true" />
                    <span className="font-medium text-lg">Web Requests</span>
                  </Link>
                  <Link onClick={() => setIsOpen(false)} href="/dashboard/admin/staff" className="flex items-center gap-4 min-h-[48px] px-3 py-3 rounded-xl text-white/70 active:bg-white/10 hover:text-[#c9a973] transition-colors">
                    <Briefcase size={22} aria-hidden="true" />
                    <span className="font-medium text-lg">Staff Management</span>
                  </Link>
                  <Link onClick={() => setIsOpen(false)} href="/dashboard/admin/billing" className="flex items-center gap-4 min-h-[48px] px-3 py-3 rounded-xl text-white/70 active:bg-white/10 hover:text-[#c9a973] transition-colors">
                    <CreditCard size={22} aria-hidden="true" />
                    <span className="font-medium text-lg">Billing &amp; Services</span>
                  </Link>
                </>
              )}

              {role === 'doctor' && (
                <Link onClick={() => setIsOpen(false)} href="/dashboard/doctor" className="flex items-center gap-4 min-h-[48px] px-3 py-3 rounded-xl text-white/70 active:bg-white/10 hover:text-[#c9a973] transition-colors">
                  <Calendar size={22} aria-hidden="true" />
                  <span className="font-medium text-lg">My Schedule</span>
                </Link>
              )}
            </nav>

            <div className="border-t border-white/10 pt-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#c9a973] flex items-center justify-center text-[#071a12] font-bold shrink-0">
                  {userEmail?.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold text-white truncate">{userEmail}</p>
                  <p className="text-xs text-[#c9a973] capitalize">{role}</p>
                </div>
              </div>
              {/* Direct logout link to avoid form in mobile dropdown issues */}
              <form action="/login" method="GET">
                <button type="submit" className="w-full flex items-center gap-3 min-h-[48px] px-3 py-3 rounded-xl text-red-400 active:bg-red-400/10 hover:text-red-300 transition-colors">
                  <LogOut size={22} aria-hidden="true" />
                  <span className="font-medium text-lg">Sign Out</span>
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
