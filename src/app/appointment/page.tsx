"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Pen, ChevronLeft, ChevronRight, X, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { bookAppointmentAction } from "@/lib/appointment-actions";
import { servicesData } from "@/data/services";
import { teamData } from "@/data/team";

// Helper to generate days in a month
const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

function AppointmentWizard() {
  const searchParams = useSearchParams();
  const initService = searchParams?.get("service");
  const initSpecialist = searchParams?.get("specialist");

  const [step, setStep] = useState(() => {
    if (initService && initSpecialist) return 3;
    if (initService) return 2;
    return 1;
  });
  
  // Selections
  const [selectedService, setSelectedService] = useState<string | null>(initService || null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>(initSpecialist || null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Form & Booking State
  const [formData, setFormData] = useState({ name: "", surname: "", email: "", phone: "" });
  
  const [state, formAction, isPending] = useActionState(bookAppointmentAction, null);

  useEffect(() => {
    if (state?.success) {
      setStep(5);
    }
  }, [state]);

  const handleNextStep = () => setStep((s) => Math.min(5, s + 1));

  // Calendar logic for Oct 2026 (Mockup)
  const currentYear = 2026;
  const currentMonth = 9; // October (0-indexed)
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const startDayOfWeek = daysInMonth[0].getDay(); // 0 is Sunday, 1 is Monday
  
  // Adjust so Monday is first day of week
  const emptyDaysStart = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1; 

  const timeSlots = ["08:00", "08:10", "08:30", "09:00", "09:15", "10:00", "11:30"];

  const activeService = servicesData.find(s => s.id === selectedService);
  const activeSpecialist = teamData.find(s => s.id.toString() === selectedSpecialist);

  return (
    <main className="w-full min-h-screen bg-[#8ea496] text-[#0a1e16] font-sans selection:bg-[#0a1e16] selection:text-[#8ea496]">
      
      {/* Top Navbar */}
      <div className="w-full px-4 md:px-8 py-4 md:py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0a1e16]" />
          <span className="font-medium text-sm md:text-base">Book an appointment</span>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <span className="text-sm font-medium tracking-wide">EN ⌵</span>
          <Link href="/">
            <button className="w-10 h-10 min-w-[44px] min-h-[44px] rounded-full bg-[#0a1e16] text-[#8ea496] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
              <X size={18} strokeWidth={2.5} />
            </button>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 pb-32 pt-8">
        
        <AnimatePresence mode="popLayout">
          
          {/* STEP 1: SERVICE */}
          <motion.div key="step1" layout className="mb-12">
            <h2 className="text-3xl font-medium mb-6">Service</h2>
            
            {step > 1 && activeService ? (
              // Collapsed state
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="w-full bg-[#0a1e16] text-[#8ea496] rounded-xl p-5 flex justify-between items-center cursor-pointer hover:bg-[#0a1e16]/90 transition-colors"
                onClick={() => setStep(1)}
              >
                <span className="text-lg font-medium">{activeService.name}</span>
                <div className="w-8 h-8 rounded-full bg-[#8ea496] text-[#0a1e16] flex items-center justify-center">
                  <Pen size={14} strokeWidth={2.5} />
                </div>
              </motion.div>
            ) : (
              // Active state
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4"
              >
                {servicesData.slice(0, 4).map((service) => (
                  <div
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service.id);
                      setTimeout(() => setStep(2), 300);
                    }}
                    className={`cursor-pointer p-6 rounded-xl border transition-all duration-300 ${
                      selectedService === service.id 
                        ? "border-[#0a1e16] bg-[#0a1e16]/5 shadow-sm" 
                        : "border-[#0a1e16]/20 hover:border-[#0a1e16]/50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <h3 className="text-xl font-medium">{service.name}</h3>
                      <div className={`w-5 h-5 rounded-full border shrink-0 mt-1 flex items-center justify-center transition-colors ${
                        selectedService === service.id ? "border-[#0a1e16]" : "border-[#0a1e16]/40"
                      }`}>
                         {selectedService === service.id && <div className="w-2.5 h-2.5 rounded-full bg-[#0a1e16]" />}
                      </div>
                    </div>
                    <p className="text-sm font-medium opacity-70 line-clamp-2 leading-relaxed max-w-2xl">
                      {service.description.split('\n')[0]}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* STEP 2: SPECIALIST */}
          {step >= 2 && (
            <motion.div key="step2" layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <h2 className="text-3xl font-medium mb-6">Specialist</h2>
              
              {step > 2 && activeSpecialist ? (
                // Collapsed state
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="w-full bg-[#0a1e16] text-[#8ea496] rounded-xl p-5 flex justify-between items-center cursor-pointer hover:bg-[#0a1e16]/90 transition-colors"
                  onClick={() => setStep(2)}
                >
                  <span className="text-lg font-medium">{activeSpecialist.name.replace('Dr. ', '')}</span>
                  <div className="w-8 h-8 rounded-full bg-[#8ea496] text-[#0a1e16] flex items-center justify-center">
                    <Pen size={14} strokeWidth={2.5} />
                  </div>
                </motion.div>
              ) : (
                // Active state
                <motion.div className="flex flex-col gap-4">
                  {teamData.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => {
                        setSelectedSpecialist(doc.id.toString());
                        setTimeout(() => setStep(3), 300);
                      }}
                      className={`cursor-pointer p-5 rounded-xl border flex justify-between items-center transition-all duration-300 ${
                        selectedSpecialist === doc.id.toString() 
                          ? "border-[#0a1e16] bg-[#0a1e16]/5 shadow-sm" 
                          : "border-[#0a1e16]/20 hover:border-[#0a1e16]/50"
                      }`}
                    >
                      <h3 className="text-lg font-medium">{doc.name.replace('Dr. ', '')}</h3>
                      <div className={`w-5 h-5 rounded-full border shrink-0 flex items-center justify-center transition-colors ${
                        selectedSpecialist === doc.id.toString() ? "border-[#0a1e16]" : "border-[#0a1e16]/40"
                      }`}>
                         {selectedSpecialist === doc.id.toString() && <div className="w-2.5 h-2.5 rounded-full bg-[#0a1e16]" />}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STEP 3: DATE AND TIME */}
          {step >= 3 && (
            <motion.div key="step3" layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <h2 className="text-3xl font-medium mb-6">Date and time</h2>
              
              {step > 3 && selectedDate && selectedTime ? (
                 // Collapsed state
                 <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="w-full bg-[#0a1e16] text-[#8ea496] rounded-xl p-5 flex justify-between items-center cursor-pointer hover:bg-[#0a1e16]/90 transition-colors"
                  onClick={() => setStep(3)}
                >
                  <span className="text-lg font-medium">
                    {selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} at {selectedTime}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#8ea496] text-[#0a1e16] flex items-center justify-center">
                    <Pen size={14} strokeWidth={2.5} />
                  </div>
                </motion.div>
              ) : (
              <div className="flex flex-col gap-12">
                  <div className="w-full md:max-w-md bg-[#9ab5a3] p-4 md:p-6 rounded-2xl border border-[#0a1e16]/10 shadow-sm">
                    {/* Calendar Header */}
                    <div className="flex justify-between items-center mb-6">
                      <button className="w-8 h-8 rounded-full bg-[#0a1e16] text-[#8ea496] flex items-center justify-center hover:opacity-80">
                        <ChevronLeft size={16} strokeWidth={3} />
                      </button>
                      <h3 className="font-semibold text-lg">October 2026</h3>
                      <button className="w-8 h-8 rounded-full bg-[#0a1e16] text-[#8ea496] flex items-center justify-center hover:opacity-80">
                        <ChevronRight size={16} strokeWidth={3} />
                      </button>
                    </div>

                    {/* Days of Week */}
                    <div className="grid grid-cols-7 gap-2 mb-4 border-b border-[#0a1e16]/20 pb-4">
                      {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(d => (
                        <div key={d} className="text-center font-semibold text-sm">{d}</div>
                      ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-y-4 gap-x-2">
                      {Array.from({ length: emptyDaysStart }).map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {daysInMonth.map((day) => {
                        const isSelected = selectedDate?.getDate() === day.getDate();
                        const isPast = day.getDate() > 31; // Mock all clickable for now
                        return (
                          <div key={day.toString()} className="flex justify-center">
                            <button
                              onClick={() => setSelectedDate(day)}
                              className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                                isSelected 
                                  ? "bg-[#0a1e16] text-[#8ea496] shadow-md" 
                                  : "hover:bg-[#0a1e16]/10 text-[#0a1e16]/70"
                              }`}
                            >
                              {day.getDate()}
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="flex flex-col gap-6">
                    <div className="border-b-2 border-[#0a1e16] w-fit pb-1">
                      <span className="font-medium text-sm">Morning</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all border ${
                            selectedTime === time 
                              ? "bg-[#0a1e16] text-[#8ea496] border-[#0a1e16]" 
                              : "border-[#0a1e16]/20 text-[#0a1e16] hover:border-[#0a1e16]/50"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center mt-6">
                    <button 
                      onClick={() => setStep(4)}
                      disabled={!selectedDate || !selectedTime}
                      className="px-8 py-4 bg-[#0a1e16] text-[#8ea496] rounded-full text-sm font-semibold tracking-wide hover:opacity-90 disabled:opacity-30 disabled:hover:opacity-30 transition-all"
                    >
                      Continue with appointment details
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 4: DETAILS */}
          {step === 4 && (
            <motion.div key="step4" layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
                
                {/* Form */}
                <form action={formAction} className="flex flex-col gap-8">
                  {/* Hidden inputs to pass state */}
                  <input type="hidden" name="serviceId" value={activeService?.id || ""} />
                  <input type="hidden" name="date" value={selectedDate?.toISOString() || ""} />
                  <input type="hidden" name="time" value={selectedTime || ""} />

                  <h2 className="text-4xl font-medium mb-4 leading-tight">Appointment<br/>details</h2>
                  
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold">Name</label>
                      <input name="name" type="text" required minLength={2} maxLength={50} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border border-[#0a1e16]/30 rounded-lg px-4 py-3 focus:outline-none focus:border-[#0a1e16] transition-colors" placeholder="Lliene" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold">Surname</label>
                      <input name="surname" type="text" required minLength={2} maxLength={50} value={formData.surname} onChange={e => setFormData({...formData, surname: e.target.value})} className="w-full bg-transparent border border-[#0a1e16]/30 rounded-lg px-4 py-3 focus:outline-none focus:border-[#0a1e16] transition-colors" placeholder="Ozola" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold">Email</label>
                      <input name="email" type="email" required maxLength={255} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border border-[#0a1e16]/30 rounded-lg px-4 py-3 focus:outline-none focus:border-[#0a1e16] transition-colors" placeholder="yourname@example.com" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold">Phone</label>
                      <input name="phone" type="tel" required minLength={5} maxLength={20} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-transparent border border-[#0a1e16]/30 rounded-lg px-4 py-3 focus:outline-none focus:border-[#0a1e16] transition-colors" placeholder="+371 23456789" />
                    </div>
                  </div>

                  {state?.error && (
                    <div className="bg-red-500/10 text-red-500 p-4 rounded-lg text-sm font-medium">
                      {state.error}
                    </div>
                  )}

                  <div className="flex flex-col gap-4 mt-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input name="policyAccepted" type="checkbox" required className="mt-1 border-[#0a1e16]/30 rounded text-[#0a1e16] focus:ring-[#0a1e16] bg-transparent cursor-pointer" />
                      <span className="text-xs font-medium opacity-80 leading-snug group-hover:opacity-100 transition-opacity">
                        I confirm that I have read and agree to the <Link href="/privacy-policy" target="_blank" className="underline hover:text-white transition-colors">privacy policy</Link>.
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input name="termsAccepted" type="checkbox" required className="mt-1 border-[#0a1e16]/30 rounded text-[#0a1e16] focus:ring-[#0a1e16] bg-transparent cursor-pointer" />
                      <span className="text-xs font-medium opacity-80 leading-snug group-hover:opacity-100 transition-opacity">
                        I confirm that I have read and agree to the <Link href="/terms-of-service" target="_blank" className="underline hover:text-white transition-colors">terms of the service agreement</Link>.
                      </span>
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-8 gap-4">
                    <button type="button" onClick={() => setStep(3)} className="flex items-center gap-2 text-sm font-semibold min-h-[44px] hover:opacity-70 active:opacity-70 transition-opacity">
                      <ChevronLeft size={16} /> Back
                    </button>
                    <button 
                      type="submit"
                      disabled={isPending}
                      className="w-full sm:w-auto px-8 py-3.5 min-h-[44px] bg-[#0a1e16] text-[#8ea496] rounded-full text-sm font-semibold tracking-wide hover:opacity-90 active:opacity-80 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isPending ? (
                        <><Loader2 size={16} className="animate-spin" /> Booking...</>
                      ) : (
                        "Book an appointment"
                      )}
                    </button>
                  </div>
                </form>

                {/* Summary Card */}
                <div>
                  <div className="w-full border border-[#0a1e16]/20 rounded-2xl p-8 sticky top-8 bg-[#8ea496]/50">
                    <h3 className="text-2xl font-medium mb-6">Appointment<br/>information</h3>
                    
                    <button onClick={() => setStep(1)} className="flex items-center gap-2 text-sm font-semibold mb-10 hover:opacity-70 transition-opacity">
                      <div className="w-6 h-6 rounded-full bg-[#0a1e16] text-[#8ea496] flex items-center justify-center">
                        <Pen size={12} strokeWidth={2.5} />
                      </div>
                      Edit
                    </button>

                    <div className="flex flex-col gap-8">
                      <div>
                        <p className="text-xs font-medium mb-2 opacity-80">Service</p>
                        <p className="text-base font-semibold leading-snug max-w-sm">
                          {activeService?.name || "Professional hygiene with EMS prophylaxis master"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-1 opacity-80">Date</p>
                        <p className="text-base font-semibold">
                          {selectedDate ? selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : "1 October 2026"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-1 opacity-80">Time</p>
                        <p className="text-base font-semibold">{selectedTime || "08:10"}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-1 opacity-80">Address</p>
                        <p className="text-base font-semibold">Ausekļa iela 14, Rīga</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-1 opacity-80">Amount</p>
                        <p className="text-base font-semibold">110,00 €</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* STEP 5: SUCCESS */}
          {step === 5 && (
            <motion.div 
              key="step5" 
              layout 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                  className="w-24 h-24 bg-[#0a1e16] rounded-full flex items-center justify-center text-[#8ea496] mb-8 shadow-2xl"
                >
                  <CheckCircle size={48} />
                </motion.div>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-5xl font-serif mb-4"
                >
                  Booking Confirmed!
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg opacity-80 max-w-md mx-auto mb-12"
                >
                  Thank you, {formData.name || "there"}! Your appointment for {activeService?.name || "your treatment"} has been successfully booked for {selectedDate ? selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : "your selected date"} at {selectedTime || "your selected time"}. We've sent a confirmation email to {formData.email || "your email"}.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link href="/">
                    <button className="px-10 py-4 bg-[#0a1e16] text-[#8ea496] rounded-full text-sm font-semibold tracking-wide hover:opacity-90 transition-all hover:scale-105 active:scale-95">
                      Return to Homepage
                    </button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}

export default function AppointmentPage() {
  return (
    <Suspense fallback={<div className="w-full min-h-screen bg-[#8ea496]" />}>
      <AppointmentWizard />
    </Suspense>
  );
}
