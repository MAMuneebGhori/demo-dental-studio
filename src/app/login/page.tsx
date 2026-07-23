"use client";

import { useActionState, useState } from "react";
import { loginAction } from "@/lib/auth-actions";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#071a12] flex items-center justify-center p-4 selection:bg-[#c9a973] selection:text-[#071a12]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif text-white tracking-tight mb-2">Welcome Back</h1>
          <p className="text-[#c9a973]/70 font-light">Secure Access for DEMO Dental Studio</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <form action={formAction} className="space-y-6">
            
            <div className="relative">
              <input 
                type="email" 
                name="email"
                id="email"
                required
                className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-transparent focus:outline-none focus:border-[#c9a973] transition-colors [&:-webkit-autofill]:bg-transparent [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:[transition:background-color_5000s_ease-in-out_0s]"
                placeholder="Email Address"
              />
              <label 
                htmlFor="email"
                className="absolute left-0 -top-3.5 text-[#c9a973]/70 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#c9a973] peer-focus:text-sm cursor-text"
              >
                Email Address
              </label>
            </div>

            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                id="password"
                required
                className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 pr-10 text-white placeholder-transparent focus:outline-none focus:border-[#c9a973] transition-colors [&:-webkit-autofill]:bg-transparent [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:[transition:background-color_5000s_ease-in-out_0s]"
                placeholder="Password"
              />
              <label 
                htmlFor="password"
                className="absolute left-0 -top-3.5 text-[#c9a973]/70 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#c9a973] peer-focus:text-sm cursor-text"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-3 text-white/50 hover:text-white transition-colors focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {state?.error && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-red-400 text-sm font-medium"
              >
                {state.error}
              </motion.p>
            )}

            <button 
              type="submit" 
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 bg-[#c9a973] text-[#071a12] py-4 rounded-full font-semibold hover:bg-[#b09363] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
        
        <div className="mt-6 text-center">
          <Link href="/" className="text-white/50 hover:text-white transition-colors text-sm underline-offset-4 hover:underline">
            Return to Website
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
