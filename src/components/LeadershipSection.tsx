"use client";

import { motion } from "framer-motion";
import { Link, Mail, Bot, Phone, ShieldCheck } from "lucide-react";

export default function LeadershipSection() {
  return (
    <section className="py-20 md:py-32 relative bg-slate-950 overflow-hidden" id="team">
      {/* Background Decorative */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-heading font-black text-cyan-400 mb-6 uppercase tracking-[0.3em]"
          >
            Human & AI Synergy
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-8xl font-heading font-bold mb-8 text-white tracking-tighter uppercase leading-none"
          >
            Strategic <br />
            <span className="text-gradient">Leadership.</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
          {/* Yash Lohare */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group glass-card p-6 md:p-10 rounded-[2.5rem] hover:border-cyan-500/30 transition-all duration-500 relative overflow-hidden flex flex-col"
          >
            <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 mb-8 flex items-center justify-center text-3xl font-heading font-bold text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-500/10 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-500">
              YL
            </div>
            <h3 className="text-3xl font-heading font-bold mb-2 text-white uppercase tracking-tighter">Yash Lohare</h3>
            <p className="text-cyan-400 font-heading font-black text-[10px] mb-8 tracking-[0.2em] uppercase">Founder & CEO</p>
            <p className="text-slate-400 mb-10 leading-relaxed font-light text-sm flex-1">
              Visionary Technologist specializing in AI systems and enterprise architecture. Driving innovation that transforms complex business logic into high-fidelity digital ecosystems.
            </p>
            <div className="flex items-center gap-4 pt-8 border-t border-white/5">
              <a href="tel:+917047123555" className="p-3 rounded-xl bg-white/5 text-slate-400 hover:bg-cyan-500 hover:text-white transition-all duration-300">
                <Phone className="w-4 h-4" />
              </a>
              <a href="mailto:metrobraintechnologies@gmail.com" className="p-3 rounded-xl bg-white/5 text-slate-400 hover:bg-cyan-500 hover:text-white transition-all duration-300">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Foundry AI - The Agent */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative p-6 md:p-10 rounded-[2.5rem] border-2 border-cyan-500/30 bg-slate-900 shadow-[0_0_50px_rgba(6,182,212,0.1)] overflow-hidden group md:-translate-y-4 flex flex-col"
          >
             <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-[60px] rounded-full" />
             
             <div className="w-20 h-20 rounded-2xl bg-cyan-600 mb-8 flex items-center justify-center relative overflow-hidden shadow-2xl shadow-cyan-500/30">
                <motion.div 
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-white"
                />
                <Bot className="w-10 h-10 text-white relative z-10" strokeWidth={1.5} />
             </div>

            <h3 className="text-3xl font-heading font-bold mb-2 text-white uppercase tracking-tighter">Foundry AI</h3>
            <p className="text-cyan-400 font-heading font-black text-[10px] mb-8 tracking-[0.2em] uppercase neon-glow">Intelligent Support Core</p>
            <p className="text-slate-300 mb-10 leading-relaxed font-light text-sm flex-1 italic">
              &quot;Our automated intelligence core is optimized for business process automation and technical consultancy, providing instant insights and streamlined project scoping.&quot;
            </p>
            
            <button 
              onClick={() => document.getElementById('ai-assistant')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full py-5 bg-white text-slate-950 rounded-2xl font-heading font-black uppercase tracking-widest text-[10px] hover:bg-cyan-500 hover:text-white transition-all duration-500 shadow-2xl"
            >
              Consult with AI
            </button>
          </motion.div>

          {/* Adinath Made */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group glass-card p-6 md:p-10 rounded-[2.5rem] hover:border-cyan-500/30 transition-all duration-500 relative overflow-hidden flex flex-col"
          >
            <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 mb-8 flex items-center justify-center text-3xl font-heading font-bold text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-500/10 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-500">
              AM
            </div>
            <h3 className="text-3xl font-heading font-bold mb-2 text-white uppercase tracking-tighter">Adinath Made</h3>
            <p className="text-cyan-400 font-heading font-black text-[10px] mb-8 tracking-[0.2em] uppercase">Co-Founder & CTO</p>
            <p className="text-slate-400 mb-10 leading-relaxed font-light text-sm flex-1">
              Full-stack development expert focused on scaling high-performance digital infrastructure. Architecting resilient systems with surgical precision and security.
            </p>
            <div className="flex items-center gap-4 pt-8 border-t border-white/5">
              <a href="tel:+918805775486" className="p-3 rounded-xl bg-white/5 text-slate-400 hover:bg-cyan-500 hover:text-white transition-all duration-300">
                <Phone className="w-4 h-4" />
              </a>
              <a href="mailto:metrobraintechnologies@gmail.com" className="p-3 rounded-xl bg-white/5 text-slate-400 hover:bg-cyan-500 hover:text-white transition-all duration-300">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>


        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-24 text-center"
        >
          <div className="inline-flex items-center gap-4 px-10 py-5 rounded-2xl bg-white/5 border border-white/10 uppercase tracking-[0.3em] text-[10px] font-heading font-black text-slate-500 shadow-2xl">
            <ShieldCheck className="w-4 h-4 text-cyan-500" />
            Strategic Partner: <span className="text-white ml-2">METRO BRAIN EDUCARE PVT LTD</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
