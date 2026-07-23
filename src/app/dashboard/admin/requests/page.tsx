import React from "react";
import { Inbox, MessageSquare, Clock } from "lucide-react";

export default function WebRequestsPage() {
  const requests = [
    { id: 1, name: "Lucas Gray", type: "AI Chatbot Lead", message: "Interested in Invisalign consultation.", time: "10 mins ago", status: "New" },
    { id: 2, name: "Sophia Martinez", type: "Appointment Form", message: "Needs an urgent appointment for a toothache.", time: "1 hour ago", status: "New" },
    { id: 3, name: "Robert Downey", type: "Contact Form", message: "Pricing inquiry for full-arch implants.", time: "3 hours ago", status: "Reviewed" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-serif tracking-tight mb-2">Web Request Queue</h1>
        <p className="text-[#0D241C]/60 text-lg">Manage incoming leads from the AI chatbot and website forms.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#0D241C]/5 overflow-hidden">
        <div className="p-6 border-b border-[#0D241C]/10 bg-[#E5EDDE]/10 flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Inbox size={20} className="text-[#c9a973]" /> Incoming Requests
          </h2>
          <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full">
            2 New
          </span>
        </div>
        <div className="divide-y divide-[#0D241C]/5">
          {requests.map((req) => (
            <div key={req.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#E5EDDE]/20 transition-colors">
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                  req.status === 'New' ? 'bg-[#c9a973] text-[#071a12]' : 'bg-[#0D241C]/5 text-[#0D241C]/40'
                }`}>
                  <MessageSquare size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">{req.name}</h3>
                    {req.status === 'New' && (
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-[#c9a973] mb-1">{req.type}</p>
                  <p className="text-[#0D241C]/70 text-sm max-w-2xl">{req.message}</p>
                </div>
              </div>
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 mt-4 md:mt-0">
                <div className="flex items-center gap-1 text-xs text-[#0D241C]/40 font-semibold">
                  <Clock size={14} /> {req.time}
                </div>
                <button className="px-4 py-2 bg-[#071a12] text-white text-sm font-semibold rounded-lg hover:bg-[#0f2e21] transition-colors">
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
