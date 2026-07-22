"use client";
import { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Activity, Loader2 } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function AntiGravityChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [lottieData, setLottieData] = useState<any>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! Welcome to DEMO Clinical Concierge. How can we assist with your Treatment Plan today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://lottie.host/17b2b78f-5154-4113-a417-6d60aef9778f/Ea6WnK633z.json")
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(() => {});

    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("open-chat", handleOpenChat);
    return () => window.removeEventListener("open-chat", handleOpenChat);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput("");
    
    // Add user message to state immediately
    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send only the necessary message history to the backend
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to fetch");
      }
      
      const data = await response.json();
      
      setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
    } catch (error: any) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: `Error: ${error.message}` }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-6 w-[90vw] sm:w-[340px] h-[480px] max-h-[80vh] bg-[#E5EDDE]/95 backdrop-blur-xl border border-[#0D241C]/10 flex flex-col overflow-hidden shadow-2xl rounded-t-2xl rounded-bl-2xl origin-bottom-right"
          >
            {/* Header */}
            <div className="bg-[#0D241C] p-4 flex justify-between items-center text-[#E5EDDE] shrink-0">
              <h3 className="font-medium text-sm tracking-wide flex items-center gap-2">
                <Activity size={16} strokeWidth={1.5} className="text-[#c9a973]" /> Clinical Concierge
              </h3>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity">
                <X size={20} strokeWidth={1} />
              </button>
            </div>
            
            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#0D241C]/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#0D241C]/20 transition-all">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`px-4 py-2.5 max-w-[85%] shadow-sm font-light text-[13px] leading-relaxed ${
                    msg.role === "assistant" 
                      ? "bg-white text-[#0D241C] self-start border border-[#0D241C]/5 rounded-br-2xl rounded-t-2xl" 
                      : "bg-[#071a12] text-[#E5EDDE] self-end rounded-bl-2xl rounded-t-2xl"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              ))}
              
              {isTyping && (
                <div className="bg-white px-4 py-2.5 self-start max-w-[85%] text-[#0D241C] shadow-sm rounded-br-2xl rounded-t-2xl border border-[#0D241C]/5 flex items-center gap-2">
                   <Loader2 size={14} className="animate-spin text-[#0D241C]/50" />
                   <span className="text-[12px] text-[#0D241C]/60">Concierge is typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-[#0D241C]/10 bg-white flex gap-2 shrink-0">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Describe your dental needs..." 
                className="flex-1 bg-[#E5EDDE]/50 px-4 py-2.5 outline-none text-[13px] font-light border border-[#0D241C]/10 focus:border-[#0D241C]/30 transition-colors rounded-full placeholder:text-[#0D241C]/40" 
              />
              <button 
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="bg-[#0D241C] text-[#E5EDDE] w-10 h-10 rounded-full flex items-center justify-center hover:bg-black transition-colors shrink-0 disabled:opacity-50"
              >
                <Send size={16} strokeWidth={1.5} className="ml-1" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#0D241C] text-[#E5EDDE] rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform relative"
      >
        {!isOpen && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-[#c9a973] border-2 border-[#E5EDDE] rounded-full animate-pulse" />
        )}
        {lottieData ? (
          <Lottie animationData={lottieData} loop={true} className="w-10 h-10 [&>svg>g>g>path]:stroke-[#E5EDDE]" />
        ) : (
          <Activity size={24} strokeWidth={1} />
        )}
      </button>
    </div>
  );
}
