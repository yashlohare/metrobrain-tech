"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cpu, Terminal } from "lucide-react";
import { useUIInteraction } from "@/hooks/useUIInteraction";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const { playTick } = useUIInteraction();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "Work", href: "/#work" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
    { name: "FAQs", href: "/#faq" },
  ];

  const handleMagnetic = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    const deltaX = (e.clientX - centerX) * 0.5;
    const deltaY = (e.clientY - centerY) * 0.5;

    gsap.to(e.currentTarget, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const resetMagnetic = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // If not on the homepage, navigate to the homepage with the hash
    if (window.location.pathname !== "/") {
      window.location.href = href;
      return;
    }

    const targetId = href.replace("/#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const navHeight = navRef.current?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight - 20;

      // Animate scroll using GSAP for "animations and graphics" feel
      gsap.to(window, {
        scrollTo: { y: offsetPosition, autoKill: false },
        duration: 1.2,
        ease: "power4.inOut",
        onStart: () => {
          // Add a temporary "Neural Link" graphic effect
          const scanLine = document.createElement('div');
          scanLine.className = 'fixed inset-0 z-[100] pointer-events-none bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-1 w-full shadow-[0_0_20px_rgba(6,182,212,0.5)]';
          document.body.appendChild(scanLine);
          gsap.to(scanLine, {
            top: '100%',
            duration: 1.2,
            ease: "none",
            onComplete: () => scanLine.remove()
          });
        }
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled ? "pt-2 md:pt-4" : "pt-4 md:pt-8"
        }`}
      >
        <div className="container mx-auto px-6">
          <div 
            className={`flex items-center justify-between px-4 md:px-8 py-2 md:py-3 rounded-full transition-all duration-700 ${
              isScrolled 
                ? "bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl shadow-cyan-500/5 mx-2" 
                : "bg-transparent border border-transparent"
            }`}
          >
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-cyan-500/20 blur-lg rounded-full group-hover:bg-cyan-500/40 transition-all" />
                <div className="relative w-12 h-12 bg-white/5 border border-white/10 rounded-xl group-hover:border-cyan-500/50 transition-all overflow-hidden">
                  <img src="/logo.png" alt="Metrobrain Logo" className="w-full h-full object-contain" />
                </div>
              </div>
              <span className="text-[10px] sm:text-lg font-heading font-black tracking-[-0.05em] text-white uppercase flex items-center gap-1.5 leading-none">
                METROBRAIN TECHNOLOGY<span className="text-cyan-500 text-2xl leading-none">.</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex gap-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    onMouseMove={handleMagnetic}
                    onMouseEnter={playTick}
                    onMouseLeave={resetMagnetic}
                    className="px-4 py-2 text-[10px] font-bold text-white/50 hover:text-white transition-all tracking-[0.3em] uppercase relative group"
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </a>
                ))}
              </div>
              
              <div className="h-6 w-[1px] bg-white/10 mx-2" />

              <button 
                onMouseEnter={playTick}
                onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
                className="group relative px-6 py-2.5 bg-white text-black text-[10px] font-black rounded-full transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest group-hover:text-white transition-colors duration-500">
                  Sync Project
                  <Cpu className="w-3 h-3" />
                </span>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white p-2 hover:bg-white/5 rounded-full transition-all"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#020617] md:hidden flex flex-col"
          >
            <div className="p-8 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Metrobrain Logo" className="w-8 h-8 object-contain" />
                <span className="text-xl font-heading font-black text-white uppercase">
                  METROBRAIN TECHNOLOGY<span className="text-cyan-500">.</span>
                </span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 bg-white/5 rounded-full text-white hover:bg-white/10 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col justify-center gap-8 p-12">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-6xl font-heading font-black tracking-tighter text-white hover:text-cyan-400 transition-colors uppercase"
                >
                  {link.name}
                </motion.a>
              ))}
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('open-contact'));
                }}
                className="mt-12 px-10 py-8 bg-white text-black text-center text-xl font-black rounded-3xl shadow-2xl uppercase tracking-[0.2em]"
              >
                Sync Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
