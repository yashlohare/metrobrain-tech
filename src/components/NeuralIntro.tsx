"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Cpu } from "lucide-react";

export default function NeuralIntro() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cinematic duration
    const timeout = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "auto";
    }, 3200);

    document.body.style.overflow = "hidden"; // Lock scroll during intro
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 1.2, ease: [0.9, 0, 0.1, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

          {/* Neural Pulse Core */}
          <div className="relative mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.4, 0.8], 
                opacity: [0.1, 0.4, 0.1] 
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute inset-0 bg-cyan-500 rounded-full blur-[80px]"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-28 h-28 rounded-3xl border-2 border-cyan-500/20 flex items-center justify-center relative z-10 bg-slate-900/50 backdrop-blur-xl overflow-hidden"
            >
              <img src="/logo.png" alt="Metrobrain Logo" className="w-20 h-20 rounded-2xl object-cover drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
            </motion.div>
          </div>

          {/* Typographic Expansion */}
          <div className="overflow-hidden h-20 flex items-center mb-4">
             <motion.h1 
               initial={{ y: 100, opacity: 0 }}
               animate={{ 
                 y: 0, 
                 opacity: 1,
                 letterSpacing: ["0.2em", "0.6em", "0.4em"]
               }}
               transition={{ 
                 duration: 2, 
                 times: [0, 0.7, 1],
                 ease: "easeOut"
               }}
               className="text-white text-2xl md:text-7xl font-heading font-bold uppercase tracking-[0.2em] md:tracking-[0.4em]"
             >
                METROBRAIN
             </motion.h1>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="h-[2px] w-48 bg-white/5 rounded-full relative overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 2.8, ease: "easeInOut" }}
                 className="absolute top-0 left-0 h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
               />
               <motion.div 
                 animate={{ x: [-200, 300] }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                 className="absolute top-0 w-32 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
               />
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-[10px] font-heading font-black text-cyan-500/60 uppercase tracking-[0.6em] flex items-center gap-3"
            >
               <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
               Synchronizing Neural Systems
            </motion.p>
          </motion.div>

          {/* Decorative Technical Borders */}
          <div className="absolute top-12 left-12 w-24 h-24 border-t-2 border-l-2 border-white/5 rounded-tl-3xl" />
          <div className="absolute top-12 right-12 w-24 h-24 border-t-2 border-r-2 border-white/5 rounded-tr-3xl" />
          <div className="absolute bottom-12 left-12 w-24 h-24 border-b-2 border-l-2 border-white/5 rounded-bl-3xl" />
          <div className="absolute bottom-12 right-12 w-24 h-24 border-b-2 border-r-2 border-white/5 rounded-br-3xl" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
