"use client";

import React, { useEffect, useState } from "react";
import { Users, Calendar, DollarSign, Activity, CheckCircle, Clock, Download } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Skeleton } from "@/components/ui/Skeleton";
import { toast } from "sonner";

export default function AdminDashboardPage() {
  const supabase = createClient();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial appointments
    const fetchAppointments = async () => {
      try {
        const { data, error } = await supabase
          .from('appointments')
          .select('*')
          .order('appointment_time', { ascending: true });
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          setAppointments(data);
        } else {
          // Fallback mock data if DB is empty or connection fails
          setAppointments([
            { id: 'm1', patient_name: 'Sarah Jenkins', appointment_time: new Date().toISOString(), procedure_type: 'Cleaning', status: 'Completed' },
            { id: 'm2', patient_name: 'Michael Chen', appointment_time: new Date(Date.now() + 3600000).toISOString(), procedure_type: 'Root Canal', status: 'Confirmed' },
            { id: 'm3', patient_name: 'Emily Davis', appointment_time: new Date(Date.now() + 7200000).toISOString(), procedure_type: 'Consultation', status: 'Pending' },
          ]);
        }
      } catch (err) {
        // Fallback mock data on network/connection failure
        setAppointments([
          { id: 'm1', patient_name: 'Sarah Jenkins', appointment_time: new Date().toISOString(), procedure_type: 'Cleaning', status: 'Completed' },
          { id: 'm2', patient_name: 'Michael Chen', appointment_time: new Date(Date.now() + 3600000).toISOString(), procedure_type: 'Root Canal', status: 'Confirmed' },
          { id: 'm3', patient_name: 'Emily Davis', appointment_time: new Date(Date.now() + 7200000).toISOString(), procedure_type: 'Consultation', status: 'Pending' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'appointments' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setAppointments(prev => [...prev, payload.new].sort((a,b) => new Date(a.appointment_time).getTime() - new Date(b.appointment_time).getTime()));
            toast.success("New appointment scheduled!");
          } else if (payload.eventType === 'UPDATE') {
            setAppointments(prev => prev.map(apt => apt.id === payload.new.id ? payload.new : apt));
            toast.info(`Appointment updated.`);
          } else if (payload.eventType === 'DELETE') {
            setAppointments(prev => prev.filter(apt => apt.id !== payload.old.id));
            toast.error("An appointment was cancelled.");
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
      <div>
        <h1 className="text-4xl font-serif tracking-tight mb-2">Clinic Operations</h1>
        <p className="text-[#0D241C]/60 text-lg">Real-time overview of today's activities.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-[#0D241C]/5">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#E5EDDE] rounded-full flex items-center justify-center mb-3 md:mb-4">
            <Activity className="text-[#071a12]" size={20} />
          </div>
          <p className="text-[#0D241C]/60 font-medium mb-1 text-sm">Procedures Billed</p>
          {loading ? <Skeleton className="h-8 w-16 mt-1" /> : <h2 className="text-2xl md:text-3xl font-bold">{appointments.length * 2}</h2>}
        </div>
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-[#0D241C]/5">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-red-50 rounded-full flex items-center justify-center mb-3 md:mb-4">
            <DollarSign className="text-red-500" size={20} />
          </div>
          <p className="text-[#0D241C]/60 font-medium mb-1 text-sm">Outstanding</p>
          {loading ? <Skeleton className="h-8 w-16 mt-1" /> : <h2 className="text-2xl md:text-3xl font-bold text-red-600">$4,250</h2>}
        </div>
        <div className="bg-[#071a12] text-white p-4 md:p-6 rounded-2xl shadow-sm border border-[#0D241C]/5 col-span-2 flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden gap-3">
          <div className="relative z-10 w-full">
            <p className="text-white/70 font-medium mb-1 text-sm">Monthly Revenue Collected</p>
            <h2 className="text-2xl md:text-4xl font-bold text-[#c9a973]">$42,500.00</h2>
            <p className="text-sm text-white/50 mt-1">Daily Pending: $1,200.00</p>
            <button 
              onClick={() => {
                toast.success("Generating CSV...");
                setTimeout(() => {
                  const csvContent = "data:text/csv;charset=utf-8,Patient,Doctor,Procedure,Cost,Date\nSarah Jenkins,Dr. Anna Berzina,Cleaning,150,2026-07-23\nMichael Chen,Dr. Marcis Ozols,Root Canal,1200,2026-07-23";
                  const encodedUri = encodeURI(csvContent);
                  const link = document.createElement("a");
                  link.setAttribute("href", encodedUri);
                  link.setAttribute("download", "revenue_report.csv");
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  toast.success("revenue_report.csv downloaded successfully.");
                }, 1000);
              }}
              className="mt-3 px-4 py-2.5 min-h-[44px] bg-[#c9a973]/20 text-[#c9a973] hover:bg-[#c9a973] hover:text-[#071a12] active:bg-[#c9a973] active:text-[#071a12] rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <Download size={16} /> Export CSV
            </button>
          </div>
          <DollarSign size={80} className="text-white/5 absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-[#0D241C]/5 p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Activity className="text-[#c9a973]" /> Real-time Schedule
          </h3>
          <div className="space-y-4">
            {loading ? (
              <>
                <Skeleton className="w-full h-20 rounded-xl" />
                <Skeleton className="w-full h-20 rounded-xl" />
                <Skeleton className="w-full h-20 rounded-xl" />
              </>
            ) : appointments.length === 0 ? (
              <p className="text-[#0D241C]/50 text-sm">No appointments scheduled for today.</p>
            ) : (
              appointments.map(apt => (
                <div key={apt.id} className="p-4 rounded-xl border border-[#0D241C]/5 bg-[#E5EDDE]/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h4 className="font-bold text-[#0D241C]">{apt.patient_name}</h4>
                    <p className="text-sm text-[#0D241C]/60">{new Date(apt.appointment_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {apt.procedure_type}</p>
                  </div>
                  <span className={`self-start sm:self-auto px-3 py-1.5 rounded-full text-xs font-semibold ${
                    apt.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                    apt.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                    apt.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {apt.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#0D241C]/5 p-6 h-fit">
          <h3 className="text-xl font-bold mb-6">Clinic Status</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-[#0D241C]/10 bg-slate-50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
              <p className="text-xs font-bold text-[#0D241C]/50 uppercase tracking-wider mb-1">Operatory A</p>
              <p className="font-semibold text-emerald-700 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Active (Dr. Smith)
              </p>
            </div>
            <div className="p-4 rounded-xl border border-[#0D241C]/10 bg-slate-50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-slate-300"></div>
              <p className="text-xs font-bold text-[#0D241C]/50 uppercase tracking-wider mb-1">Operatory B</p>
              <p className="font-semibold text-slate-500">Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
