"use client";

import { useState } from "react";
import { Calculator, ArrowRight, Check } from "lucide-react";

export default function ProjectEstimator() {
  const [projectType, setProjectType] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [features, setFeatures] = useState<string[]>([]);

  const toggleFeature = (feat: string) => {
    setFeatures(prev => 
      prev.includes(feat) ? prev.filter(f => f !== feat) : [...prev, feat]
    );
  };

  const calculateComplexity = () => {
    let score = 0;
    if (projectType) score += 20;
    if (timeline === "Rush (1-2 Months)") score += 30;
    if (timeline === "Standard (3-6 Months)") score += 10;
    score += features.length * 15;
    
    if (score === 0) return "Select Options";
    if (score < 40) return "Low Complexity";
    if (score < 70) return "Medium Complexity";
    return "High Complexity / Enterprise";
  };

  return (
    <section className="py-24 relative bg-[#050505] border-t border-white/5" id="estimator">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Side */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-heading font-black text-cyan-400 mb-2 uppercase tracking-[0.3em]">
              Interactive Scoping
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-black text-white tracking-tighter leading-[1.1]">
              ESTIMATE YOUR<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">PROJECT SCOPE.</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-md">
              Use our interactive estimator to gauge the complexity and requirements of your next digital build before contacting our engineering team.
            </p>
            
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <p className="text-sm font-bold text-white/50 uppercase tracking-widest mb-2">Estimated Scope</p>
                <div className="flex items-center gap-4">
                  <Calculator className="w-8 h-8 text-cyan-500" />
                  <h3 className="text-2xl md:text-3xl font-heading font-black text-white tracking-tight">
                    {calculateComplexity()}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Calculator Side */}
          <div className="bg-[#0A0A0F] rounded-[2.5rem] border border-white/10 p-8 md:p-10 shadow-2xl relative overflow-hidden">
             {/* Background Element */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]" />

             <div className="relative z-10 space-y-10">
                
                {/* Section 1 */}
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">1</span>
                    Platform Type
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {["Web Application", "Mobile App", "AI Integration", "E-Commerce"].map(type => (
                      <button
                        key={type}
                        onClick={() => setProjectType(type)}
                        className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all text-left ${
                          projectType === type 
                          ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" 
                          : "bg-white/5 border-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section 2 */}
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">2</span>
                    Timeline Requirement
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {["Rush (1-2 Months)", "Standard (3-6 Months)"].map(time => (
                      <button
                        key={time}
                        onClick={() => setTimeline(time)}
                        className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all text-left ${
                          timeline === time 
                          ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" 
                          : "bg-white/5 border-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section 3 */}
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">3</span>
                    Key Features (Select Multiple)
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {["User Auth", "Payment Gateway", "Custom Dashboard", "Real-time Chat", "API Integrations", "Analytics"].map(feat => (
                      <button
                        key={feat}
                        onClick={() => toggleFeature(feat)}
                        className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all flex items-center justify-between ${
                          features.includes(feat) 
                          ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" 
                          : "bg-white/5 border-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {feat}
                        {features.includes(feat) && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <button 
                  onClick={() => {
                    const detail = {
                      projectType,
                      timeline,
                      features
                    };
                    window.dispatchEvent(new CustomEvent('open-contact', { detail }));
                  }}
                  className="w-full py-5 rounded-xl bg-white text-black font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-cyan-400 transition-colors shadow-xl"
                >
                  Discuss Full Scope
                  <ArrowRight className="w-4 h-4" />
                </button>

             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
