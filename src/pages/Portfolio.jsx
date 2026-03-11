import React from 'react';
import { motion } from 'framer-motion';

export default function Portfolio() {
  const projects = [
    {
      title: "Metrobrain CRM",
      category: "SaaS Web Application",
      tech: ["React", "Supabase", "Tailwind", "Vite"],
      image: "linear-gradient(135deg, #1e3a8a, #312e81)",
      description: "A comprehensive franchise management portal for over 100+ active branches with automated PDF receipt generation."
    },
    {
      title: "EduTech Hub",
      category: "E-Commerce",
      tech: ["Next.js", "Stripe", "PostgreSQL"],
      image: "linear-gradient(135deg, #0f766e, #064e3b)",
      description: "Custom storefront selling physical books and digital courses with automated headless delivery."
    },
    {
      title: "FinDash",
      category: "Analytics Dashboard",
      tech: ["Vue.js", "Firebase", "D3.js"],
      image: "linear-gradient(135deg, #be185d, #831843)",
      description: "Real-time cryptocurrency and stock portfolio tracking application for high-net-worth individuals."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Our Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Work</span></h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">Detailed prototypes and live case studies of our highest-impact digital products.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((proj, i) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15 }}
            key={proj.title} 
            className="group relative rounded-3xl overflow-hidden glass-panel flex flex-col cursor-pointer"
          >
            {/* Mock Image Area */}
            <div className="h-56 w-full relative overflow-hidden" style={{ background: proj.image }}>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm z-10">
                <span className="px-6 py-2 rounded-full border border-white/30 text-white font-semibold backdrop-blur-md hover:bg-white/10 transition-colors">
                  View Case Study
                </span>
              </div>
              <div className="absolute -bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            </div>

            {/* Content Area */}
            <div className="p-8 flex-grow flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-500 mb-2">{proj.category}</span>
              <h3 className="text-2xl font-bold text-white mb-3">{proj.title}</h3>
              <p className="text-slate-400 text-sm mb-6 flex-grow">{proj.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {proj.tech.map(t => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full bg-[#1e293b] text-slate-300 border border-slate-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
