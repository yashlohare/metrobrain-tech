"use client";

import { motion } from "framer-motion";
import { Check, Cpu, Zap, Box } from "lucide-react";

const tiers = [
  {
    name: "ASCENT_MOD",
    price: "₹5,999",
    description: "Launch your digital presence with surgical speed.",
    features: [
      "Stunning Landing Page",
      "Mobile Responsive Design",
      "Contact Form Integration",
      "Basic SEO Setup",
      "15 Days Post-Launch Support",
      "Free Hosting Setup"
    ],
    highlight: false,
    icon: Box
  },
  {
    name: "VECTOR_MOD",
    price: "₹19,999",
    description: "Scale your business with integrated intelligence.",
    features: [
      "Up to 5 Pages Website",
      "Custom UI/UX Design",
      "Basic Database Setup",
      "Admin Dashboard (Standard)",
      "Basic AI Chatbot",
      "Advanced SEO Strategy",
      "1 Month Free Support",
      "Fast Performance"
    ],
    highlight: true,
    icon: Zap
  },
  {
    name: "QUANTUM_MOD",
    price: "₹49,999",
    description: "Full-scale ecosystem for massive growth.",
    features: [
      "Custom Web Application",
      "Mobile App (basic wrapper)",
      "Advanced AI Integration",
      "Payment Gateway Setup",
      "Digital Marketing Launch",
      "Social Media Ad Setup",
      "3 Months Priority Support",
      "Dedicated Manager"
    ],
    highlight: false,
    icon: Cpu
  }
];

export default function PricingTiers() {
  return (
    <section className="py-32 relative bg-slate-950" id="pricing">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-heading font-black text-cyan-400 mb-6 uppercase tracking-[0.3em]"
          >
            Module Tiers
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-heading font-bold mb-8 text-white tracking-tighter uppercase leading-none"
          >
            Engineering <br />
            <span className="text-gradient">Modules.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg md:text-xl font-light leading-relaxed"
          >
            Transparent, competitive tiers designed to accelerate growth from startups to enterprises.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group glass-card rounded-[2.5rem] p-10 flex flex-col relative overflow-hidden transition-all duration-500 ${
                tier.highlight 
                  ? "border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.15)] md:-translate-y-4" 
                  : "hover:border-white/20"
              }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 right-0 p-8">
                  <span className="bg-cyan-600 text-white text-[9px] font-heading font-black tracking-widest px-4 py-2 rounded-lg uppercase shadow-lg shadow-cyan-500/20">
                    MOST_ACTIVE
                  </span>
                </div>
              )}
              
              <div className="mb-12">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 ${
                  tier.highlight ? "bg-cyan-500 text-white shadow-xl shadow-cyan-500/20" : "bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-white"
                }`}>
                  <tier.icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-3xl font-heading font-bold mb-4 text-white uppercase tracking-tighter">{tier.name}</h3>
                <p className="text-slate-400 text-sm border-b border-white/5 pb-10 mb-10 font-light leading-relaxed">
                  {tier.description}
                </p>
                <div className="flex flex-col">
                  <span className="text-5xl font-heading font-bold text-white tracking-tighter mb-1">{tier.price}</span>
                  <span className="text-[10px] font-heading font-black text-slate-500 uppercase tracking-widest">Initialization Fee</span>
                </div>
              </div>

              <ul className="space-y-6 mb-12 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className={`mt-1 p-1 rounded-md ${tier.highlight ? "bg-cyan-500/20 text-cyan-400" : "bg-white/5 text-slate-600"}`}>
                      <Check className="w-3 h-3 stroke-[4]" />
                    </div>
                    <span className="text-slate-400 font-light text-sm group-hover:text-slate-300 transition-colors">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-6 rounded-2xl font-heading font-black transition-all duration-500 uppercase tracking-widest text-[10px] group-hover:-translate-y-1 ${
                tier.highlight 
                  ? "bg-cyan-600 hover:bg-cyan-500 text-white shadow-2xl shadow-cyan-500/20" 
                  : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
              }`}>
                Initialize Sync
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
