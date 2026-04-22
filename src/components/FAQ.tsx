"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How can I request a quote for your services?",
    answer: "You can request a quote by filling out our contact form or by scheduling a direct call with our engineering team. We typically provide a detailed proposal within 24-48 hours after our initial discovery session."
  },
  {
    question: "What industries do you specialize in?",
    answer: "We specialize in Fintech, E-commerce, EdTech, and AI-driven SaaS solutions. Our agency has delivered high-fidelity prototypes and full-scale deployments across various sectors requiring high-performance software."
  },
  {
    question: "What services do you offer?",
    answer: "Our core services include AI Tool Development, Web & App Development, UI/UX Design, Cloud & DevOps, and IT Consulting. We focus on engineering high-fidelity, premium digital products."
  },
  {
    question: "What is your approach to project management?",
    answer: "We follow an agile-driven strategic approach. Every project is divided into rapid prototyping phases, followed by rigorous testing and incremental deployments to ensure total transparency and speed."
  },
  {
    question: "How long does it typically take to complete a project?",
    answer: "Prototype development usually takes 2-4 weeks, while full-scale enterprise deployments can range from 3 to 6 months depending on the complexity and system requirements."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 px-6 bg-black relative overflow-hidden" id="faq">
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-white/50 text-lg font-light">
            Find answers to common questions about our services and process.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`group rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 ${
                openIndex === index ? 'bg-white/[0.03] border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.05)]' : 'bg-transparent hover:bg-white/[0.01]'
              }`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 md:px-8 md:py-6 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-6">
                  {/* Left Indicator Line */}
                  <div className={`w-1 h-8 rounded-full transition-all duration-500 ${
                    openIndex === index ? 'bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,1)]' : 'bg-white/5'
                  }`} />
                  <span className="text-xl font-medium text-white/90 group-hover:text-white transition-colors">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown className={`w-5 h-5 text-white/40 transition-transform duration-500 ${openIndex === index ? 'rotate-180 text-cyan-400' : ''}`} />
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6 pl-12 md:pl-20">
                  <p className="text-white/60 leading-relaxed text-lg font-light">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
