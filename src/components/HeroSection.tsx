"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}
import { Cpu, ChevronDown, Activity } from "lucide-react";

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(".hero-badge", {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(".hero-title", {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: "expo.out"
    }, "-=0.4")
    .from(".hero-desc", {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.8")
    .from(".hero-btns", {
      y: 20,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.6");

    // Glitch effect loop for title
    gsap.to(".glitch-text", {
      skewX: 20,
      duration: 0.1,
      repeat: -1,
      repeatDelay: 2,
      yoyo: true,
      ease: "power4.inOut"
    });
  }, { scope: container });

  return (
    <section 
      ref={container}
      className="relative min-h-[85svh] flex flex-col items-center justify-center pt-10 px-6 overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        
        {/* Status Badge */}
        <div className="hero-badge inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-cyan-400">
            Leading the Digital Frontier
          </span>
          <Activity className="w-3 h-3 text-cyan-400/50" />
        </div>

        {/* Cinematic Title */}
        <h1 
          ref={titleRef}
          className="hero-title text-4xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter text-white mb-3 leading-[0.9]"
        >
          <span className="block glitch-text">INTELLIGENT</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600">
            SOLUTIONS.
          </span>
        </h1>

        {/* Subtitle / Description */}
        <p 
          ref={subtitleRef}
          className="hero-desc text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-6 leading-relaxed font-light tracking-wide"
        >
          We build high-performance digital ecosystems. Metrobrain Technology is your dedicated technology partner for advanced software development and scalable architectures.
        </p>

        {/* CTA Actions */}
        <div className="hero-btns flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
            className="group relative px-8 py-4 bg-white text-black font-bold tracking-[0.2em] uppercase rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
          >
            <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-500">
              Start Project
              <Cpu className="w-4 h-4" />
            </span>
          </button>
          
          <button 
            onClick={() => {
              const element = document.getElementById('work');
              if (element) {
                gsap.to(window, {
                  duration: 1.5,
                  scrollTo: { y: element, offsetY: 80 },
                  ease: "power4.inOut"
                });
              }
            }}
            className="group px-8 py-4 border border-white/10 bg-white/5 backdrop-blur-md text-white font-bold tracking-[0.2em] uppercase rounded-xl transition-all hover:bg-white/10 hover:border-white/20 active:scale-95"
          >
            View Showcase
          </button>
        </div>



      </div>

      {/* Hero-specific Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}
