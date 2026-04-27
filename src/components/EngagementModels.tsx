"use client";

import { motion } from "framer-motion";
import { Briefcase, Code2, Users, ArrowRight } from "lucide-react";

export default function EngagementModels() {
  const models = [
    {
      icon: <Code2 className="w-8 h-8 text-cyan-400" />,
      title: "End-to-End Development",
      description: "From concept to deployment. We handle the entire project lifecycle, delivering a fully functional product tailored to your specifications.",
      features: ["Fixed Scope & Timeline", "Dedicated Project Manager", "Full Stack Engineering", "QA & Testing"],
    },
    {
      icon: <Users className="w-8 h-8 text-violet-400" />,
      title: "Dedicated Teams",
      description: "Scale your engineering capacity instantly. Hire our expert developers to work directly with your internal team on a monthly retainer.",
      features: ["Flexible Scaling", "Direct Integration", "Continuous Delivery", "Long-term Partnership"],
    },
    {
      icon: <Briefcase className="w-8 h-8 text-fuchsia-400" />,
      title: "Tech Consulting",
      description: "Strategic guidance for complex challenges. We audit your architecture, optimize performance, and plan your digital roadmap.",
      features: ["Architecture Audits", "CTO-as-a-Service", "Performance Optimization", "Security Reviews"],
    }
  ];

  return (
    <section className="py-24 relative bg-black border-t border-white/5" id="engagement">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-heading font-black text-cyan-400 uppercase tracking-[0.3em]"
          >
            How We Work
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-black text-white tracking-tighter"
          >
            ENGAGEMENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">MODELS.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg max-w-2xl mx-auto"
          >
            Flexible collaboration structures designed to match your project needs and team dynamics.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {models.map((model, idx) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative p-8 rounded-[2rem] bg-[#0A0A0F] border border-white/10 hover:border-cyan-500/30 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
              
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  {model.icon}
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white tracking-tight">{model.title}</h3>
                  <p className="text-white/50 leading-relaxed text-sm h-20">
                    {model.description}
                  </p>
                </div>

                <ul className="space-y-3 pt-6 border-t border-white/5">
                  {model.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm text-white/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
                  className="w-full pt-8 flex items-center justify-between text-[10px] font-bold text-white/50 tracking-widest uppercase group-hover:text-cyan-400 transition-colors"
                >
                  Discuss Model
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
