import { signOutAction } from "@/lib/auth-actions";
import { createClient } from "@/lib/supabase/server";
import { LogOut, LayoutDashboard, Users, Calendar, Inbox, Briefcase, CreditCard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { isValidDemoEmail } from "@/lib/demo-accounts";
import { DashboardMobileNav } from "@/components/DashboardMobileNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient();
  let { data: { user } } = await supabase.auth.getUser();

  const cookieStore = await cookies();
  const demoEmail = cookieStore.get("demo_access")?.value;

  if (!user && String(process.env.NODE_ENV) !== 'production' && isValidDemoEmail(demoEmail)) {
    user = {
      email: demoEmail,
      user_metadata: { role: demoEmail === "admin@demodental.com" ? "admin" : "doctor" }
    } as any;
  }

  if (!user) {
    redirect("/login");
  }

  // Determine role. If no role is found, default to doctor for testing layout.
  const role = user.user_metadata?.role || 'doctor';

  return (
    <div className="flex h-screen bg-[#E5EDDE] text-[#0D241C] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#071a12] text-[#E5EDDE] flex flex-col justify-between hidden md:flex">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 mb-12 cursor-pointer">
            <div className="w-8 h-8 bg-[#c9a973] rounded-full flex items-center justify-center">
              <span className="text-[#071a12] font-bold font-serif text-xl">D</span>
            </div>
            <span className="font-serif text-xl tracking-tight text-white">DEMO</span>
          </Link>

          <nav className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-[#c9a973]/70 font-semibold mb-4 px-3">
              {role === 'admin' ? 'Admin Controls' : 'Doctor Portal'}
            </p>
            <Link href={role === 'admin' ? '/dashboard/admin' : '/dashboard/doctor'} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-white transition-colors">
              <LayoutDashboard size={18} />
              <span className="font-medium text-sm">Overview</span>
            </Link>
            {role === 'admin' && (
              <>
                <Link href="/dashboard/admin/patients" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                  <Users size={18} />
                  <span className="font-medium text-sm">Patient Directory</span>
                </Link>
                <Link href="/dashboard/admin/requests" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                  <Inbox size={18} />
                  <span className="font-medium text-sm">Web Requests</span>
                </Link>
                <Link href="/dashboard/admin/staff" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                  <Briefcase size={18} />
                  <span className="font-medium text-sm">Staff Management</span>
                </Link>
                <Link href="/dashboard/admin/billing" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                  <CreditCard size={18} />
                  <span className="font-medium text-sm">Billing & Services</span>
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="p-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-6 px-3">
            <div className="w-10 h-10 rounded-full bg-[#c9a973] flex items-center justify-center text-[#071a12] font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">{user.email}</p>
              <p className="text-xs text-[#c9a973] capitalize">{role}</p>
            </div>
          </div>

          <form action={signOutAction}>
            <button type="submit" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors">
              <LogOut size={18} />
              <span className="font-medium text-sm">Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <DashboardMobileNav role={role} userEmail={user.email || ""} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
