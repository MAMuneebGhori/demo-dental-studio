"use client";

import React, { useState, useEffect } from "react";
import { Search, User, Phone, Mail, FileText, CheckCircle, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Skeleton } from "@/components/ui/Skeleton";

export default function PatientsDirectoryPage() {
  const supabase = createClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      
      let query = supabase
        .from('profiles')
        .select('*', { count: 'exact' });
        
      if (searchTerm) {
        query = query.ilike('full_name', `%${searchTerm}%`);
      }
      
      const { data, count, error } = await query
        .range(page * limit, (page + 1) * limit - 1)
        .order('created_at', { ascending: false });
        
      if (data) {
        setPatients(data);
      }
      if (count !== null) {
        setTotalCount(count);
      }
      setLoading(false);
    };

    const debounceTimer = setTimeout(fetchPatients, 300);
    return () => clearTimeout(debounceTimer);
  }, [page, searchTerm]);

  const handleNextPage = () => {
    if ((page + 1) * limit < totalCount) setPage(p => p + 1);
  };
  
  const handlePrevPage = () => {
    if (page > 0) setPage(p => p - 1);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-serif tracking-tight mb-2">Patient Directory</h1>
          <p className="text-[#0D241C]/60 text-lg">Manage clinic patients, records, and balances.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-[#0D241C]/40" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-[#0D241C]/10 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#c9a973]/50 focus:border-[#c9a973]"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#0D241C]/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#E5EDDE]/30 border-b border-[#0D241C]/10 text-xs uppercase tracking-wider text-[#0D241C]/60 font-semibold">
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Last Visit</th>
                <th className="px-6 py-4">Balance</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0D241C]/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-6">
                    <div className="space-y-4">
                      <Skeleton className="w-full h-12 rounded-lg" />
                      <Skeleton className="w-full h-12 rounded-lg" />
                      <Skeleton className="w-full h-12 rounded-lg" />
                    </div>
                  </td>
                </tr>
              ) : patients.length > 0 ? patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-[#E5EDDE]/10 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#c9a973]/20 flex items-center justify-center text-[#c9a973] font-bold">
                        {(patient.full_name || "U").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-[#0D241C]">{patient.full_name || "Unknown Patient"}</p>
                        <p className="text-xs text-[#0D241C]/50 font-mono" title={patient.id}>{patient.id.substring(0, 8)}...</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-[#0D241C]/80">
                        <Mail size={14} className="text-[#0D241C]/40" /> N/A
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#0D241C]/80">
                        <Phone size={14} className="text-[#0D241C]/40" /> N/A
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium">{new Date(patient.created_at).toLocaleDateString()}</p>
                    <p className="text-xs text-[#0D241C]/50">Joined Date</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md inline-flex font-semibold text-sm border border-emerald-200">
                      <CheckCircle size={14} /> Settled
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm font-semibold text-[#c9a973] hover:text-[#0D241C] active:text-[#0D241C] transition-colors flex items-center justify-end gap-1 ml-auto min-h-[44px]">
                      <FileText size={16} /> View Record
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[#0D241C]/50">
                    No patients found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        <div className="p-4 border-t border-[#0D241C]/10 bg-[#E5EDDE]/10 flex items-center justify-between text-sm">
          <p className="text-[#0D241C]/60">
            Showing {patients.length > 0 ? page * limit + 1 : 0} to {Math.min((page + 1) * limit, totalCount)} of {totalCount} patients
          </p>
          <div className="flex gap-2">
            <button 
              onClick={handlePrevPage}
              disabled={page === 0 || loading}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md border border-[#0D241C]/10 bg-white disabled:opacity-50 hover:bg-[#E5EDDE] active:bg-[#E5EDDE] transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={handleNextPage}
              disabled={(page + 1) * limit >= totalCount || loading}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md border border-[#0D241C]/10 bg-white disabled:opacity-50 hover:bg-[#E5EDDE] active:bg-[#E5EDDE] transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
