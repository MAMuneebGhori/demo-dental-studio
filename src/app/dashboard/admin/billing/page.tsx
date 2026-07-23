import React from "react";
import { CreditCard, FileText, Download, DollarSign, Stethoscope, ChevronRight, CheckCircle, Clock } from "lucide-react";

export default function BillingServicesPage() {
  const invoices = [
    { id: "INV-2026-1042", patient: "Sarah Jenkins", date: "Oct 24, 2026", amount: 1250.00, status: "Paid", method: "Credit Card" },
    { id: "INV-2026-1043", patient: "Michael Chen", date: "Oct 24, 2026", amount: 450.00, status: "Pending", method: "-" },
    { id: "INV-2026-1044", patient: "Emma Watson", date: "Oct 23, 2026", amount: 3200.00, status: "Paid", method: "Bank Transfer" },
    { id: "INV-2026-1045", patient: "David Smith", date: "Oct 22, 2026", amount: 150.00, status: "Overdue", method: "-" },
    { id: "INV-2026-1046", patient: "Olivia Brown", date: "Oct 21, 2026", amount: 890.00, status: "Paid", method: "Cash" },
  ];

  const treatments = [
    { category: "Diagnostic", items: [
      { name: "Comprehensive Oral Exam", code: "D0150", price: 120, time: "45 min" },
      { name: "Panoramic X-Ray", code: "D0330", price: 85, time: "15 min" },
    ]},
    { category: "Restorative", items: [
      { name: "Composite Filling (1 Surface)", code: "D2391", price: 180, time: "45 min" },
      { name: "Porcelain Crown", code: "D2740", price: 1250, time: "90 min" },
    ]},
    { category: "Surgical", items: [
      { name: "Simple Extraction", code: "D7140", price: 150, time: "30 min" },
      { name: "Dental Implant Placement", code: "D6010", price: 2200, time: "120 min" },
    ]}
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-serif tracking-tight mb-2">Clinic Services & Billing</h1>
          <p className="text-[#0D241C]/60 text-lg">Manage financial records and the treatment catalog.</p>
        </div>
        <button className="px-5 py-2.5 min-h-[44px] bg-[#071a12] text-[#E5EDDE] font-semibold rounded-lg hover:bg-[#0f2e21] active:bg-[#0f2e21] transition-colors flex items-center gap-2">
          <Download size={18} /> Export Monthly Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Billing Console */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-[#0D241C]/5 overflow-hidden">
            <div className="p-6 border-b border-[#0D241C]/10 bg-[#E5EDDE]/10 flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FileText size={20} className="text-[#c9a973]" /> Recent Invoices
              </h2>
            </div>
            <div className="divide-y divide-[#0D241C]/5">
              {invoices.map((inv) => (
                <div key={inv.id} className="p-6 hover:bg-[#E5EDDE]/10 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{inv.patient}</h3>
                      <p className="text-xs text-[#0D241C]/50 font-mono">{inv.id} • {inv.date}</p>
                    </div>
                    <div className="text-right">
                      <h3 className="font-bold text-lg">${inv.amount.toFixed(2)}</h3>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${
                      inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      inv.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {inv.status === 'Paid' ? <CheckCircle size={14} /> : <Clock size={14} />} {inv.status}
                    </span>
                    <button className="text-sm font-semibold text-[#c9a973] hover:text-[#0D241C] transition-colors flex items-center gap-1">
                      View Details <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-[#0D241C]/10 bg-slate-50 text-center">
              <button className="text-sm font-semibold text-[#0D241C]/60 hover:text-[#0D241C] transition-colors">
                View All Invoices
              </button>
            </div>
          </div>
        </div>

        {/* Treatment Catalog */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-[#0D241C]/5 overflow-hidden">
            <div className="p-6 border-b border-[#0D241C]/10 bg-[#E5EDDE]/10 flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Stethoscope size={20} className="text-[#c9a973]" /> Treatment Catalog
              </h2>
              <button className="text-sm font-semibold bg-white border border-[#0D241C]/10 px-3 py-1.5 rounded-md hover:bg-slate-50">
                + New Service
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              {treatments.map((cat, i) => (
                <div key={i}>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#0D241C]/50 mb-4">{cat.category}</h3>
                  <div className="space-y-3">
                    {cat.items.map((item, j) => (
                      <div key={j} className="flex items-center justify-between p-4 rounded-xl border border-[#0D241C]/5 bg-slate-50 hover:bg-white hover:border-[#c9a973]/30 transition-all group">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{item.name}</h4>
                            <span className="text-[10px] font-mono bg-[#0D241C]/5 px-1.5 py-0.5 rounded text-[#0D241C]/60">{item.code}</span>
                          </div>
                          <p className="text-xs text-[#0D241C]/50 flex items-center gap-1">
                            <Clock size={12} /> Typical duration: {item.time}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-lg">${item.price}</span>
                          <button className="text-xs font-semibold text-[#c9a973] md:opacity-0 md:group-hover:opacity-100 transition-opacity min-h-[44px] px-2">
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
