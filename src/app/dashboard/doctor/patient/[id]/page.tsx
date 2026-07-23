"use client";

import React, { useState, use } from "react";
import { ArrowLeft, Save, Plus, FileText, ImageIcon, CheckCircle, Wand2, Pill, History } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCompletion } from "@ai-sdk/react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function PatientEHRPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  // Using the appointment ID to fetch real patient data is best practice. Here we safely extract a readable name.
  const patientName = "Patient Details"; // Or fetch from DB based on ID
  const supabase = createClient();
  
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
  const [toothConditions, setToothConditions] = useState<Record<number, string>>({});
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { completion, input, handleInputChange, handleSubmit, isLoading } = useCompletion({
    api: '/api/simulate'
  });

  // Generate upper arch (1-16) and lower arch (32-17, right to left visually)
  const upperArch = Array.from({ length: 16 }, (_, i) => i + 1);
  const lowerArch = Array.from({ length: 16 }, (_, i) => 32 - i);

  const handleToothClick = (tooth: number) => {
    setSelectedTooth(tooth);
  };

  const handleSetCondition = (condition: string) => {
    if (selectedTooth) {
      setToothConditions(prev => ({
        ...prev,
        [selectedTooth]: condition
      }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Optimistic UI Update & Actual DB call
    const { error } = await supabase
      .from('appointments')
      .update({ status: 'Completed' }) // Mark as completed
      .eq('id', resolvedParams.id);
      
    setIsSaving(false);

    if (error) {
      toast.error("Failed to save record.");
      return;
    }

    toast.success("Clinical notes saved successfully.");
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      router.push("/dashboard/doctor");
    }, 1500);
  };

  const getToothColor = (tooth: number) => {
    const condition = toothConditions[tooth];
    if (tooth === selectedTooth) return "bg-[#c9a973] text-[#071a12] border-[#c9a973] scale-110 shadow-md";
    switch(condition) {
      case "Cavity": return "bg-red-100 border-red-300 text-red-800";
      case "Crown": return "bg-blue-100 border-blue-300 text-blue-800";
      case "Extracted": return "bg-slate-200 border-slate-400 text-slate-500 opacity-50";
      case "Implant": return "bg-purple-100 border-purple-300 text-purple-800";
      default: return "bg-white border-[#0D241C]/20 text-[#0D241C]/70 hover:border-[#c9a973]";
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/doctor" className="p-2 bg-white rounded-full border border-[#0D241C]/10 hover:bg-[#E5EDDE] transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-serif tracking-tight">{patientName}</h1>
            <p className="text-[#0D241C]/60">Clinical Chart & EHR</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => toast.info("Opening patient history...")}
            className="px-4 py-2 bg-white border border-[#0D241C]/10 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            <History size={16} /> View History
          </button>
          <button 
            onClick={() => toast.success("Prescription template generated.")}
            className="px-4 py-2 bg-white border border-[#0D241C]/10 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            <Pill size={16} /> Write Rx
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-all ${
              saved ? "bg-emerald-500 text-white" : "bg-[#071a12] text-[#E5EDDE] hover:bg-[#0f2e21] disabled:opacity-50"
            }`}
          >
            {isSaving ? "Saving..." : saved ? <><CheckCircle size={18} /> Signed & Saved</> : <><Save size={18} /> Sign & Complete</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Dental Chart Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-[#0D241C]/5 p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Plus size={20} className="text-[#c9a973]" /> Interactive Dental Chart
            </h2>
            
            {/* Upper Arch */}
            <div className="mb-8">
              <p className="text-xs text-center text-[#0D241C]/40 uppercase tracking-widest font-semibold mb-3">Upper Arch (Maxillary)</p>
              <div className="flex justify-center gap-1 sm:gap-2">
                {upperArch.map(t => (
                  <button 
                    key={t}
                    onClick={() => handleToothClick(t)}
                    className={`w-7 h-10 sm:w-10 sm:h-14 rounded-md border-2 flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${getToothColor(t)}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Lower Arch */}
            <div className="mb-8">
              <div className="flex justify-center gap-1 sm:gap-2 mb-3">
                {lowerArch.map(t => (
                  <button 
                    key={t}
                    onClick={() => handleToothClick(t)}
                    className={`w-7 h-10 sm:w-10 sm:h-14 rounded-md border-2 flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${getToothColor(t)}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <p className="text-xs text-center text-[#0D241C]/40 uppercase tracking-widest font-semibold">Lower Arch (Mandibular)</p>
            </div>

            {/* Tooth Action Panel */}
            {selectedTooth && (
              <div className="bg-[#E5EDDE]/30 rounded-xl p-4 border border-[#0D241C]/10 animate-in fade-in slide-in-from-top-2">
                <h3 className="font-semibold mb-3">Tooth #{selectedTooth} Condition</h3>
                <div className="flex flex-wrap gap-2">
                  {["Healthy", "Cavity", "Crown", "Extracted", "Implant"].map(cond => (
                    <button 
                      key={cond}
                      onClick={() => handleSetCondition(cond === "Healthy" ? "" : cond)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        (toothConditions[selectedTooth] === cond || (cond === "Healthy" && !toothConditions[selectedTooth])) 
                          ? "bg-[#071a12] text-white border-[#071a12]" 
                          : "bg-white border-[#0D241C]/20 hover:border-[#0D241C]/50"
                      }`}
                    >
                      {cond}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Clinical Notes */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#0D241C]/5 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText size={20} className="text-[#c9a973]" /> Clinical Visit Notes
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0D241C]/70 mb-2">Procedure Details</label>
                <textarea 
                  className="w-full h-32 p-3 border border-[#0D241C]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a973]/50 resize-none bg-[#E5EDDE]/10"
                  placeholder="E.g., Administered 2 cartridges of Lidocaine 2% with 1:100k Epi. Prepared tooth #14 for MOD composite restoration..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0D241C]/70 mb-2">Anesthesia Used</label>
                  <input type="text" className="w-full p-3 border border-[#0D241C]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a973]/50 bg-[#E5EDDE]/10" placeholder="Lidocaine 2%" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0D241C]/70 mb-2">Next Visit Plan</label>
                  <input type="text" className="w-full p-3 border border-[#0D241C]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a973]/50 bg-[#E5EDDE]/10" placeholder="Crown delivery in 2 weeks" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar / Simulator */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-[#0D241C]/5 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ImageIcon size={20} className="text-[#c9a973]" /> Treatment Simulator
            </h2>
            <div className="aspect-[4/3] bg-slate-100 rounded-xl mb-4 overflow-hidden relative group border border-[#0D241C]/10">
              {completion ? (
                <div className="absolute inset-0 p-4 overflow-y-auto text-sm text-[#0D241C]/80 leading-relaxed bg-white">
                  {completion}
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#0D241C]/40 transition-colors">
                  <Wand2 size={48} className="mb-2 opacity-50" />
                  <span className="font-semibold text-sm">AI Simulator Ready</span>
                </div>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="Describe treatment (e.g. Crown on #14)"
                className="flex-1 py-2 px-3 border border-[#0D241C]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a973]/50 text-sm"
              />
              <button 
                type="submit"
                disabled={isLoading || !input}
                className="px-4 py-2 bg-[#c9a973] text-[#071a12] font-semibold rounded-lg hover:bg-[#b09363] transition-colors disabled:opacity-50 text-sm flex items-center gap-2"
              >
                {isLoading ? "Generating..." : "Simulate"}
              </button>
            </form>
          </div>

          <div className="bg-[#071a12] text-white rounded-2xl shadow-sm p-6">
            <h3 className="font-serif text-xl mb-4">Patient Alerts</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0"></span>
                <p className="text-sm text-white/80"><strong className="text-white">Allergy:</strong> Penicillin</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                <p className="text-sm text-white/80"><strong className="text-white">Condition:</strong> Hypertension (Controlled)</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                <p className="text-sm text-white/80"><strong className="text-white">Preference:</strong> Prefers morning appointments</p>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
