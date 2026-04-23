"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AnimatedLayout from "@/components/AnimatedLayout";
import { Cpu, Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  const [glitchText, setGlitchText] = useState("404");

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setGlitchText(Math.random().toString(36).substring(2, 5).toUpperCase());
        setTimeout(() => setGlitchText("404"), 150);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatedLayout>
      <div className="min-h-[100svh] bg-[#020617] flex flex-col items-center justify-center relative overflow-hidden px-6">
        {/* Scanline & Grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute inset-0 h-[2px] bg-cyan-500/20 animate-[scan_3s_ease-in-out_infinite] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Warning Icon */}
          <div className="w-20 h-20 mb-8 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.2)] animate-pulse">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>

          {/* Glitching 404 */}
          <h1 className="text-8xl md:text-[12rem] font-black font-heading tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 leading-none mb-6 relative">
            <span className="absolute -inset-1 text-red-500 opacity-50 blur-sm mix-blend-screen animate-pulse">{glitchText}</span>
            <span className="absolute inset-1 text-cyan-500 opacity-50 blur-sm mix-blend-screen animate-pulse" style={{ animationDelay: '0.1s' }}>{glitchText}</span>
            {glitchText}
          </h1>

          {/* Typographic Context */}
          <div className="space-y-4 mb-12">
            <h2 className="text-xl md:text-3xl font-bold font-heading tracking-[0.2em] uppercase text-red-400">
              Neural Link Severed
            </h2>
            <p className="text-white/40 text-sm md:text-base font-mono max-w-lg mx-auto">
              [FATAL_ERROR]: The requested data node does not exist in the current spatial index. Please re-establish connection to the mainframe.
            </p>
          </div>

          {/* Return Button */}
          <Link 
            href="/"
            className="group relative px-8 py-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl overflow-hidden hover:bg-cyan-500/20 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <div className="relative z-10 flex items-center gap-3">
              <Home className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs">
                Re-establish Connection
              </span>
            </div>
          </Link>

          {/* System Status */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">
            <Cpu className="w-4 h-4" />
            <span>System Indexing Complete</span>
          </div>
        </div>

        {/* Global Keyframes specific to this view */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scan {
            0% { top: -10%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 110%; opacity: 0; }
          }
        `}} />
      </div>
    </AnimatedLayout>
  );
}
