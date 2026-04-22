"use client";

import { motion } from "framer-motion";
import { Brain, Globe, Smartphone, MessageSquare, LineChart, Shield, Zap } from "lucide-react";

const services = [
  {
    id: "#01",
    title: "LLM AI Engineering",
    description: "Custom Large Language Model orchestration for automated decision-making and data intelligence.",
    spec: "CLAUDE 3.5 / GPT-4",
    icon: Brain,
    className: "md:col-span-2 md:row-span-1",
    color: "cyan"
  },
  {
    id: "#02",
    title: "Web Architectures",
    description: "Scalable, high-speed applications built on Next.js 15.",
    spec: "EDGE READY",
    icon: Globe,
    className: "md:col-span-1 md:row-span-1",
    color: "blue"
  },
  {
    id: "#03",
    title: "Mobile Ecosystems",
    description: "Native-performance iOS and Android development for global reach.",
    spec: "REACT NATIVE",
    icon: Smartphone,
    className: "md:col-span-1 md:row-span-2",
    color: "violet"
  },
  {
    id: "#04",
    title: "AI Chatbot Engines",
    description: "24/7 intelligent multi-lingual agents for engagement.",
    spec: "NEURAL CORE V1",
    icon: MessageSquare,
    className: "md:col-span-1 md:row-span-1",
    color: "cyan"
  },
  {
    id: "#05",
    title: "Technical SEO",
    description: "Data-driven market visibility strategies.",
    spec: "DATA ANALYSIS",
    icon: LineChart,
    className: "md:col-span-1 md:row-span-1",
    color: "blue"
  },
  {
    id: "#06",
    title: "Cyber Security",
    description: "Advanced threat protection for digital and neural-brain assets.",
    spec: "ENCRYPTION PRO",
    icon: Shield,
    className: "md:col-span-2 md:row-span-1",
    color: "violet"
  },
];

export default function ServiceMatrix() {
  return (
    <section className="py-32 relative z-10 bg-slate-950" id="services">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-heading font-black text-cyan-400 mb-6 uppercase tracking-[0.3em]"
            >
              <Zap className="w-3 h-3" />
              Core Capabilities
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-8xl font-heading font-bold mb-8 text-white tracking-tighter uppercase leading-none"
            >
              The Service <br />
              <span className="text-gradient">Matrix.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg md:text-xl font-light max-w-md leading-relaxed"
          >
            Engineering high-fidelity technical solutions designed for speed, scale, and intelligence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`group glass-card relative p-8 md:p-12 rounded-[2.5rem] overflow-hidden flex flex-col justify-between ${service.className} hover:border-cyan-500/30 transition-all duration-500`}
            >
              {/* Background Glow */}
              <div className={`absolute -top-24 -right-24 w-64 h-64 bg-${service.color}-500/5 blur-[80px] rounded-full group-hover:bg-${service.color}-500/10 transition-all duration-700`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-auto">
                  <div className={`p-4 bg-${service.color}-500/10 rounded-2xl text-${service.color}-400 group-hover:scale-110 group-hover:bg-${service.color}-500 group-hover:text-white transition-all duration-500 shadow-lg shadow-${service.color}-500/10`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-heading font-black text-slate-600 group-hover:text-cyan-400 transition-colors tracking-widest uppercase">
                    {service.id}
                  </span>
                </div>

                <div className="mt-8">
                  <div className="mb-4">
                    <span className={`px-3 py-1 bg-${service.color}-500/10 text-${service.color}-400 text-[10px] font-heading font-black uppercase tracking-widest rounded-full border border-${service.color}-500/20`}>
                       {service.spec}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3 text-white group-hover:text-gradient transition-all duration-300 uppercase tracking-tighter leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed font-light text-sm max-w-xs group-hover:text-slate-300 transition-colors">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
