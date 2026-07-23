"use client";

import React, { useState } from "react";
import { Settings, CheckCircle, Plus, Trash2, Building, Stethoscope, Users } from "lucide-react";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("config");
  const [saving, setSaving] = useState(false);

  // Mock State for Settings
  const [clinicName, setClinicName] = useState("DEMO Dental Studio");
  const [clinicAddress, setClinicAddress] = useState("123 Forest Ave, Suite 100");
  const [clinicEmail, setClinicEmail] = useState("hello@demodental.com");

  const [services, setServices] = useState([
    { id: 1, name: "Routine Cleaning", price: 150 },
    { id: 2, name: "Veneers", price: 1200 },
    { id: 3, name: "Root Canal", price: 800 },
  ]);

  const [staff, setStaff] = useState([
    { id: 1, name: "Dr. Anna Berzina", role: "doctor" },
    { id: 2, name: "Admin User", role: "admin" },
  ]);

  const handleSaveSettings = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Settings saved to database!");
    }, 1000);
  };

  const handleAddService = () => {
    setServices([...services, { id: Date.now(), name: "New Procedure", price: 100 }]);
  };

  const handleRemoveService = (id: number) => {
    setServices(services.filter(s => s.id !== id));
    toast.success("Procedure removed.");
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif tracking-tight mb-2">Clinic Settings</h1>
          <p className="text-[#0D241C]/60 text-lg">Manage operations, procedures, and staff access.</p>
        </div>
        <button 
          onClick={handleSaveSettings}
          disabled={saving}
          className="px-6 py-2.5 bg-[#c9a973] text-[#071a12] font-bold rounded-lg hover:bg-[#b09363] transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {saving ? "Saving..." : <><CheckCircle size={18} /> Save Settings</>}
        </button>
      </div>

      <div className="flex gap-4 border-b border-[#0D241C]/10 pb-4">
        <button onClick={() => setActiveTab("config")} className={`px-4 py-2 font-semibold flex items-center gap-2 rounded-lg transition-colors ${activeTab === 'config' ? 'bg-[#071a12] text-[#c9a973]' : 'text-[#0D241C]/60 hover:bg-[#E5EDDE]/50'}`}>
          <Building size={18} /> Clinic Config
        </button>
        <button onClick={() => setActiveTab("services")} className={`px-4 py-2 font-semibold flex items-center gap-2 rounded-lg transition-colors ${activeTab === 'services' ? 'bg-[#071a12] text-[#c9a973]' : 'text-[#0D241C]/60 hover:bg-[#E5EDDE]/50'}`}>
          <Stethoscope size={18} /> Services & Pricing
        </button>
        <button onClick={() => setActiveTab("staff")} className={`px-4 py-2 font-semibold flex items-center gap-2 rounded-lg transition-colors ${activeTab === 'staff' ? 'bg-[#071a12] text-[#c9a973]' : 'text-[#0D241C]/60 hover:bg-[#E5EDDE]/50'}`}>
          <Users size={18} /> Staff Management
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#0D241C]/5 p-8">
        
        {/* TAB 1: Config */}
        {activeTab === "config" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div>
              <label className="block text-sm font-bold text-[#0D241C] mb-2">Clinic Name</label>
              <input type="text" value={clinicName} onChange={e => setClinicName(e.target.value)} className="w-full border border-[#0D241C]/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#c9a973] focus:ring-1 focus:ring-[#c9a973]" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0D241C] mb-2">Primary Address</label>
              <input type="text" value={clinicAddress} onChange={e => setClinicAddress(e.target.value)} className="w-full border border-[#0D241C]/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#c9a973] focus:ring-1 focus:ring-[#c9a973]" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0D241C] mb-2">Contact Email</label>
              <input type="email" value={clinicEmail} onChange={e => setClinicEmail(e.target.value)} className="w-full border border-[#0D241C]/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#c9a973] focus:ring-1 focus:ring-[#c9a973]" />
            </div>
          </div>
        )}

        {/* TAB 2: Services */}
        {activeTab === "services" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-xl">Procedures Catalog</h3>
              <button onClick={handleAddService} className="text-[#c9a973] font-bold flex items-center gap-1 hover:text-[#071a12] transition-colors">
                <Plus size={18} /> Add Procedure
              </button>
            </div>
            <div className="space-y-3">
              {services.map((service, index) => (
                <div key={service.id} className="flex gap-4 items-center p-4 bg-[#E5EDDE]/10 border border-[#0D241C]/10 rounded-lg">
                  <div className="flex-1">
                    <label className="text-xs font-bold text-[#0D241C]/50 uppercase tracking-widest mb-1 block">Procedure Name</label>
                    <input type="text" value={service.name} onChange={e => {
                      const newS = [...services];
                      newS[index].name = e.target.value;
                      setServices(newS);
                    }} className="w-full bg-white border border-[#0D241C]/20 rounded-md px-3 py-2" />
                  </div>
                  <div className="w-32">
                    <label className="text-xs font-bold text-[#0D241C]/50 uppercase tracking-widest mb-1 block">Base Price ($)</label>
                    <input type="number" value={service.price} onChange={e => {
                      const newS = [...services];
                      newS[index].price = Number(e.target.value);
                      setServices(newS);
                    }} className="w-full bg-white border border-[#0D241C]/20 rounded-md px-3 py-2" />
                  </div>
                  <button onClick={() => handleRemoveService(service.id)} className="mt-5 p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Staff */}
        {activeTab === "staff" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
             <div className="flex justify-between items-center">
              <h3 className="font-bold text-xl">Staff Directory</h3>
              <button onClick={() => toast.info("Invitation email sent.")} className="text-[#c9a973] font-bold flex items-center gap-1 hover:text-[#071a12] transition-colors">
                <Plus size={18} /> Invite Staff
              </button>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#0D241C]/10 text-[#0D241C]/50 text-sm uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Name</th>
                  <th className="pb-3 font-semibold">Role</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.map(s => (
                  <tr key={s.id} className="border-b border-[#0D241C]/5 hover:bg-slate-50 transition-colors">
                    <td className="py-4 font-semibold">{s.name}</td>
                    <td className="py-4">
                      <select value={s.role} onChange={(e) => {
                        const newStaff = [...staff];
                        newStaff.find(st => st.id === s.id)!.role = e.target.value;
                        setStaff(newStaff);
                      }} className="bg-[#E5EDDE]/30 border border-[#0D241C]/10 rounded-md px-2 py-1 text-sm focus:outline-none">
                        <option value="admin">Admin</option>
                        <option value="doctor">Doctor</option>
                        <option value="receptionist">Receptionist</option>
                      </select>
                    </td>
                    <td className="py-4 text-right text-sm font-semibold text-blue-600 cursor-pointer hover:underline">Edit Access</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
