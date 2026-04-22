"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Activity, Terminal, Layers, Globe } from "lucide-react";

type Project = {
  id: number;
  title: string;
  category: string;
  desc: string;
  image: string;
  longImage: string;
  specs: string[];
  status: string;
};

const categories = ["All", "Web App", "AI/LLM", "Mobile App"];

const projects: Project[] = [
  { 
    id: 1, 
    title: "Nexus Commerce", 
    category: "Web App", 
    desc: "A boutique, high-performance commerce engine with glassmorphic UI and sub-1s load times.", 
    image: "/projects/ecommerce.png", 
    longImage: "/prototypes/ecommerce_long.png",
    specs: ["NEXT.JS 15", "TAILWIND 4", "STRIPE API"],
    status: "DEPLOYED ALPHA"
  },
  { 
    id: 2, 
    title: "SwiftBite Deliveries", 
    category: "Mobile App", 
    desc: "Neural-fast food delivery ecosystem with real-time map tracking and biometric security.", 
    image: "/projects/food.png", 
    longImage: "/prototypes/food_long.png",
    specs: ["REACT NATIVE", "MAPBOX", "BIOMETRIC"],
    status: "ACTIVE R&D"
  },
  { 
    id: 3, 
    title: "Heulab Intelligence", 
    category: "AI/LLM", 
    desc: "Custom LLM orchestration layer handling 10k+ daily neural queries with 95% accuracy.", 
    image: "/projects/ai.png", 
    longImage: "/prototypes/ai_long.png",
    specs: ["CLAUDE 3.5", "VERCEL EDGE", "GEMINI"],
    status: "FOUNDRY CORE"
  },
  { 
    id: 4, 
    title: "Pulse Bio-Metrics", 
    category: "Mobile App", 
    desc: "Biometric workout personalization engine with real-time health-sync analytics.", 
    image: "/projects/fitness.png", 
    longImage: "/prototypes/fitness_long.png",
    specs: ["SWIFT UI", "HEALTHKIT", "COREML"],
    status: "BETA PREVIEW"
  },
  { 
    id: 5, 
    title: "Aura E-Real Estate", 
    category: "Web App", 
    desc: "Immersive 3D property portal with virtual neural tours and advanced algorithmic search.", 
    image: "/projects/realestate.png", 
    longImage: "/prototypes/realestate_long.png",
    specs: ["THREE.JS", "WEBGL", "SEARCH-NEURAL"],
    status: "EXPERIMENTAL"
  },
  { 
    id: 6, 
    title: "Vortex Finance Hub", 
    category: "Web App", 
    desc: "High-frequency trading dashboard with live WebSocket data stream and elite security.", 
    image: "/projects/finance.png", 
    longImage: "/prototypes/finance_long.png",
    specs: ["WEBSOCKETS", "POSTGRESQL", "CHART.JS"],
    status: "STABLE ALPHA"
  },
];

export default function ProjectArchive() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  return (
    <section className="py-32 relative z-10 bg-slate-950" id="work">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-[10px] font-heading font-black text-violet-400 mb-6 uppercase tracking-[0.3em]"
            >
              <Terminal className="w-3 h-3" />
              Foundry R&D Lab
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-8xl font-heading font-bold mb-8 text-white tracking-tighter uppercase leading-none"
            >
              Prototype <span className="text-gradient">Foundry.</span>
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-xl text-[10px] font-heading font-black uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === cat 
                    ? "bg-cyan-600 border-cyan-500 text-white shadow-lg shadow-cyan-500/20" 
                    : "bg-white/5 border-white/10 text-slate-500 hover:text-white hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer flex flex-col glass-card rounded-[2.5rem] hover:border-cyan-500/30 transition-all duration-500 overflow-hidden"
              >
                {/* MacOS Window Mockup */}
                <div className="w-full h-72 bg-slate-900 border-b border-white/5 relative overflow-hidden" >
                  <div className="w-full h-10 bg-slate-950/50 backdrop-blur-md border-b border-white/5 flex items-center px-6 gap-2 absolute top-0 left-0 z-10">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/50 group-hover:bg-[#ff5f56] transition-colors"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/50 group-hover:bg-[#ffbd2e] transition-colors"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/50 group-hover:bg-[#27c93f] transition-colors"></div>
                    </div>
                    <span className="ml-auto text-[9px] uppercase font-heading font-black text-slate-500 tracking-[0.2em]">{project.status}</span>
                  </div>
                  
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out opacity-60 group-hover:opacity-100" />
                  
                  <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-colors duration-500 flex items-center justify-center">
                    <div className="px-6 py-3 bg-white text-slate-950 rounded-xl font-heading font-black uppercase text-[10px] tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-2xl">
                       Access Engine
                    </div>
                  </div>
                </div>

                {/* Card Info Area */}
                <div className="p-10 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-heading font-black uppercase tracking-[0.2em] border border-cyan-500/20">
                      SYS_{project.id.toString().padStart(3, '0')}
                    </span>
                  </div>
                  <h3 className="text-3xl font-heading font-bold mb-4 text-white uppercase tracking-tighter leading-none group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 font-light leading-relaxed text-sm">
                    {project.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Immersive Prototype Viewer Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-slate-950/95 backdrop-blur-2xl"
              onClick={() => setSelectedProject(null)}
            >
              <div className="w-full h-full max-w-7xl grid lg:grid-cols-12 gap-16 items-center">
                
                {/* Prototype Screen */}
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0, x: -50 }}
                  animate={{ scale: 1, opacity: 1, x: 0 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="lg:col-span-8 h-full min-h-[500px] md:min-h-[700px] glass-card rounded-[3rem] border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col"
                >
                  <div className="w-full h-12 bg-slate-900/50 border-b border-white/5 flex items-center px-8 gap-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="flex-1 max-w-md mx-auto h-7 bg-black/30 border border-white/5 rounded-lg flex items-center px-4">
                       <span className="text-[10px] font-mono text-slate-500 truncate">metrobrain.io/foundry/{selectedProject.title.toLowerCase().replace(' ', '-')}</span>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto scrollbar-hide bg-slate-900 cursor-ns-resize">
                    <img src={selectedProject.longImage} alt={selectedProject.title} className="w-full h-auto" />
                  </div>
                </motion.div>

                {/* Technical Blueprint Panel */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="lg:col-span-4 space-y-12"
                >
                  <div>
                    <span className="px-4 py-1.5 bg-cyan-600 text-white rounded-lg text-[10px] font-heading font-black uppercase tracking-widest mb-8 inline-block shadow-lg shadow-cyan-500/20">
                      {selectedProject.status}
                    </span>
                    <h2 className="text-5xl md:text-7xl font-heading font-bold text-white uppercase tracking-tighter mb-6 leading-none">{selectedProject.title}</h2>
                    <p className="text-slate-400 font-light leading-relaxed text-xl">
                      Technical blueprint for high-performance {selectedProject.category.toLowerCase()} ecosystems.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <h3 className="text-[10px] font-heading font-black text-cyan-400 uppercase tracking-[0.4em] pb-4 border-b border-white/5 flex items-center gap-3">
                      <Layers className="w-4 h-4" />
                      Neural Specifications
                    </h3>
                    <div className="flex flex-wrap gap-3">
                       {selectedProject.specs.map(spec => (
                         <span key={spec} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-heading font-black text-white uppercase tracking-widest">
                           {spec}
                         </span>
                       ))}
                    </div>
                  </div>

                  <div className="bg-cyan-500/5 border-l-4 border-cyan-500 p-8 space-y-3 rounded-r-2xl">
                    <p className="text-[10px] font-heading font-black text-cyan-400 uppercase tracking-widest leading-none">R&D Objective</p>
                    <p className="text-slate-300 font-light italic text-lg leading-relaxed">
                      "Engineer a low-latency neural environment bridging AI intelligence with surgical UI design."
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 pt-4">
                    <button 
                       onClick={() => {
                         setSelectedProject(null);
                         document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                       }}
                       className="w-full py-6 bg-white text-slate-950 rounded-2xl font-heading font-black uppercase tracking-widest text-[10px] hover:bg-cyan-500 hover:text-white transition-all duration-500 shadow-2xl flex items-center justify-center gap-3 group"
                    >
                      Initialize Collaboration
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                    <button 
                       onClick={() => setSelectedProject(null)}
                       className="w-full py-6 bg-transparent border border-white/10 text-slate-500 rounded-2xl font-heading font-black uppercase tracking-widest text-[10px] hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-3"
                    >
                      Close Foundry
                    </button>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
