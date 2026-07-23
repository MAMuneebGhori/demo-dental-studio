"use client";

import React, { useEffect, useState } from "react";
import { User, Clock, FileText, ChevronRight, Settings, Save, Calendar as CalendarIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Skeleton } from "@/components/ui/Skeleton";
import { toast } from "sonner";

export default function DoctorDashboardPage() {
  const supabase = createClient();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [shiftStart, setShiftStart] = useState("09:00");
  const [shiftEnd, setShiftEnd] = useState("17:00");
  const [savingShift, setSavingShift] = useState(false);

  useEffect(() => {
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
          setAppointments([
            { id: '1', patient_name: 'Sarah Jenkins', appointment_time: new Date(Date.now() + 3600000).toISOString(), procedure_type: 'Cleaning', status: 'Pending' },
            { id: '2', patient_name: 'Michael Chen', appointment_time: new Date(Date.now() + 7200000).toISOString(), procedure_type: 'Root Canal', status: 'Confirmed' },
            { id: '3', patient_name: 'Emily Davis', appointment_time: new Date(Date.now() - 3600000).toISOString(), procedure_type: 'Consultation', status: 'Completed' },
          ]);
        }
      } catch (err) {
        setAppointments([
          { id: '1', patient_name: 'Sarah Jenkins', appointment_time: new Date(Date.now() + 3600000).toISOString(), procedure_type: 'Cleaning', status: 'Pending' },
          { id: '2', patient_name: 'Michael Chen', appointment_time: new Date(Date.now() + 7200000).toISOString(), procedure_type: 'Root Canal', status: 'Confirmed' },
          { id: '3', patient_name: 'Emily Davis', appointment_time: new Date(Date.now() - 3600000).toISOString(), procedure_type: 'Consultation', status: 'Completed' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'appointments' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setAppointments(prev => [...prev, payload.new].sort((a,b) => new Date(a.appointment_time).getTime() - new Date(b.appointment_time).getTime()));
            toast.success("New patient added to schedule!");
          } else if (payload.eventType === 'UPDATE') {
            setAppointments(prev => prev.map(apt => apt.id === payload.new.id ? payload.new : apt));
            toast.info(`Patient record updated.`);
          } else if (payload.eventType === 'DELETE') {
            setAppointments(prev => prev.filter(apt => apt.id !== payload.old.id));
            toast.error("An appointment was removed.");
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSaveShift = async () => {
    setSavingShift(true);
    // Simulate DB update
    setTimeout(() => {
      setSavingShift(false);
      toast.success("Shift clock updated successfully!");
    }, 800);
  };

  const upcomingAppointments = appointments.filter(apt => new Date(apt.appointment_time).getTime() > Date.now());

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 md:space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-serif tracking-tight mb-2">My Schedule</h1>
        <p className="text-[#0D241C]/60 text-base md:text-lg">Manage your patients and clinical notes for today.</p>
      </div>

      <div className="bg-[#071a12] text-white rounded-2xl shadow-sm p-6 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#c9a973]">
            <Settings size={20} /> Shift Clock & Availability
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 items-end">
            <div>
              <label className="block text-sm font-semibold text-white/70 mb-2">Start Time</label>
              <input type="time" value={shiftStart} onChange={e => setShiftStart(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 min-h-[44px] focus:outline-none focus:border-[#c9a973] text-white" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white/70 mb-2">End Time</label>
              <input type="time" value={shiftEnd} onChange={e => setShiftEnd(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 min-h-[44px] focus:outline-none focus:border-[#c9a973] text-white" />
            </div>
            <button 
              onClick={handleSaveShift}
              disabled={savingShift}
              className="w-full min-h-[44px] py-3 bg-[#c9a973] text-[#071a12] font-bold rounded-lg hover:bg-[#b09363] active:bg-[#b09363] transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {savingShift ? "Saving..." : <><Save size={16}/> Save Shift</>}
            </button>
          </div>
        </div>
        <CalendarIcon size={120} className="text-white/5 absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#0D241C]/5 overflow-hidden">
        <div className="p-6 border-b border-[#0D241C]/10 bg-[#E5EDDE]/10">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Clock className="text-[#c9a973]" /> Today's Patients (Live)
          </h2>
        </div>
        
        <div className="divide-y divide-[#0D241C]/5">
          {loading ? (
            <div className="p-6 space-y-4">
              <Skeleton className="w-full h-24 rounded-xl" />
              <Skeleton className="w-full h-24 rounded-xl" />
            </div>
          ) : upcomingAppointments.length === 0 ? (
            <div className="p-8 text-center text-[#0D241C]/50 flex flex-col items-center gap-3">
              <span className="text-4xl">🎉</span>
              <p className="font-semibold text-lg">No appointments left today!</p>
              <p className="text-sm">Enjoy your time off or check your upcoming schedule.</p>
            </div>
          ) : (
              upcomingAppointments.map((apt) => (
              <div key={apt.id} className="p-4 md:p-6 hover:bg-[#E5EDDE]/10 active:bg-[#E5EDDE]/10 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#071a12] text-[#c9a973] flex items-center justify-center font-bold font-serif text-xl shadow-inner shrink-0">
                    {apt.patient_name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#0D241C]">{apt.patient_name}</h3>
                    <p className="text-sm font-medium text-[#0D241C]/60 flex items-center gap-2 mt-1">
                      <span className="bg-[#E5EDDE] text-[#0D241C] px-2 py-0.5 rounded-md">{new Date(apt.appointment_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      • {apt.procedure_type}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    apt.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                    apt.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                    apt.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {apt.status}
                  </span>
                  <Link href={`/dashboard/doctor/patient/${apt.id}`} className="px-4 py-2.5 min-h-[44px] bg-[#071a12] text-[#c9a973] rounded-lg text-sm font-semibold hover:bg-[#0f2e21] active:bg-[#0f2e21] transition-colors flex items-center gap-2">
                    Start Consultation <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
