import React from "react";
import { Users, Briefcase, Plus, Settings, UserPlus, Clock } from "lucide-react";
import { teamData } from "@/data/team";

export default function StaffManagementPage() {
  const roster = [
    ...teamData.map((doc, index) => ({
      id: `DOC-${index + 1}`,
      name: doc.name,
      role: "Doctor",
      specialty: doc.specialty,
      hours: "09:00 - 17:00 (Mon-Fri)",
      room: `Operatory ${['A', 'B', 'C', 'D'][index % 4]}`,
      vacation: index === 0 ? "Next: Oct 28 - Nov 2" : "None scheduled",
      status: "Active"
    })),
    {
      id: "HYG-1", name: "Jessica Taylor", role: "Hygienist", specialty: "Dental Hygiene", 
      hours: "08:00 - 16:00 (Mon-Thu)", room: "Hygiene 1", vacation: "None scheduled", status: "Active"
    },
    {
      id: "REC-1", name: "Mark Johnson", role: "Receptionist", specialty: "Admin", 
      hours: "08:30 - 17:30 (Mon-Fri)", room: "Front Desk", vacation: "None scheduled", status: "Active"
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-serif tracking-tight mb-2">Staff & Schedule Management</h1>
          <p className="text-[#0D241C]/60 text-lg">Manage clinic roster, working hours, and permissions.</p>
        </div>
        <button className="px-5 py-2.5 bg-[#071a12] text-[#E5EDDE] font-semibold rounded-lg hover:bg-[#0f2e21] transition-colors flex items-center gap-2">
          <UserPlus size={18} /> Add Staff Member
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Roster Table */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-[#0D241C]/5 overflow-hidden">
            <div className="p-6 border-b border-[#0D241C]/10 bg-[#E5EDDE]/10 flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Briefcase size={20} className="text-[#c9a973]" /> Clinic Roster
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#E5EDDE]/30 border-b border-[#0D241C]/10 text-xs uppercase tracking-wider text-[#0D241C]/60 font-semibold">
                    <th className="px-6 py-4">Staff Member</th>
                    <th className="px-6 py-4">Role / Room</th>
                    <th className="px-6 py-4">Working Hours</th>
                    <th className="px-6 py-4">Upcoming Time Off</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0D241C]/5">
                  {roster.map((staff) => (
                    <tr key={staff.id} className="hover:bg-[#E5EDDE]/10 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#c9a973]/20 flex items-center justify-center text-[#c9a973] font-bold">
                            {staff.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-[#0D241C]">{staff.name}</p>
                            <p className="text-xs text-[#0D241C]/50 font-mono">{staff.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className={`inline-flex w-max items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider ${
                            staff.role === 'Doctor' ? 'bg-blue-100 text-blue-700' :
                            staff.role === 'Hygienist' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {staff.role}
                          </span>
                          <span className="text-sm font-medium text-[#0D241C]/80">{staff.room}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Clock size={16} className="text-[#c9a973]" /> {staff.hours}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#0D241C]/70">
                        {staff.vacation}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[#0D241C]/40 hover:text-[#c9a973] transition-colors p-2 rounded-full hover:bg-[#c9a973]/10">
                          <Settings size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Role Permissions Settings Preview */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-[#0D241C]/5 p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Users size={20} className="text-[#c9a973]" /> Access Levels
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-[#E5EDDE]/30 rounded-xl border border-[#0D241C]/5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold">Admin</h3>
                  <span className="text-xs font-semibold bg-[#071a12] text-white px-2 py-0.5 rounded">Full</span>
                </div>
                <p className="text-xs text-[#0D241C]/60 leading-relaxed">Full access to billing, staff management, website settings, and analytics.</p>
              </div>

              <div className="p-4 bg-[#E5EDDE]/30 rounded-xl border border-[#0D241C]/5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold">Doctor</h3>
                  <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Clinical</span>
                </div>
                <p className="text-xs text-[#0D241C]/60 leading-relaxed">Access to patient EHR, daily schedules, charting, and treatment planning.</p>
              </div>

              <div className="p-4 bg-[#E5EDDE]/30 rounded-xl border border-[#0D241C]/5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold">Receptionist</h3>
                  <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-0.5 rounded">Limited</span>
                </div>
                <p className="text-xs text-[#0D241C]/60 leading-relaxed">Access to global calendar, web requests, and basic patient directory.</p>
              </div>
            </div>
            <button className="w-full mt-6 py-2.5 border border-[#0D241C]/10 text-[#0D241C] font-semibold rounded-lg hover:bg-[#E5EDDE]/50 transition-colors">
              Manage Roles
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
