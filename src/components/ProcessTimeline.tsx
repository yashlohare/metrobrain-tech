"use client";

import { motion } from "framer-motion";
import { MessageSquare, FileCode2, Terminal, Rocket } from "lucide-react";

export default function ProcessTimeline() {
  const steps = [
    {
      icon: <MessageSquare className="w-6 h-6 text-cyan-400" />,
      title: "Discovery & Sync",
      description: "We start with a deep dive into your business goals, target audience, and technical requirements to align our vision.",
    },
    {
      icon: <FileCode2 className="w-6 h-6 text-violet-400" />,
      title: "Architecture & Strategy",
      description: "Our engineers map out the optimal tech stack, system architecture, and provide a comprehensive project timeline.",
    },
    {
      icon: <Terminal className="w-6 h-6 text-fuchsia-400" />,
      title: "Agile Development",
      description: "We build your product in iterative sprints, providing regular updates and early access to staging environments.",
    },
    {
      icon: <Rocket className="w-6 h-6 text-blue-400" />,
      title: "Launch & Scale",
      description: "Rigorous testing precedes deployment. Post-launch, we monitor performance and provide ongoing support to ensure stable scaling.",
    }
  ];

  return (
    <section className="py-24 relative bg-[#050505]" id="process">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-heading font-black text-cyan-400 uppercase tracking-[0.3em]"
          >
            Execution Plan
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-black text-white tracking-tighter"
          >
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">PROCESS.</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2">
            <motion.div 
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-cyan-500 via-violet-500 to-transparent w-full"
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${
                  idx % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? "md:text-left" : "md:text-right"} pl-16 md:pl-0 relative`}>
                  {/* Mobile Node (Hidden on Desktop) */}
                  <div className="md:hidden absolute left-[28px] top-0 w-4 h-4 rounded-full bg-[#050505] border-2 border-cyan-500 -translate-x-1/2 shadow-[0_0_15px_rgba(6,182,212,0.5)] z-10" />
                  
                  <div className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors group">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-white/50 text-sm md:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center Node (Desktop Only) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#0A0A0F] border-2 border-white/10 items-center justify-center z-10 hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-500">
                  {step.icon}
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
