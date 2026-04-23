"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Award, Users, Rocket, Globe } from "lucide-react";

const stats = [
  { 
    number: "70+", 
    label: "Our Projects", 
    icon: Rocket,
    color: "from-blue-600 to-blue-400" 
  },
  { 
    number: "50+", 
    label: "Happy Clients", 
    icon: Users,
    color: "from-cyan-600 to-cyan-400" 
  },
  { 
    number: "12+", 
    label: "Project Awards", 
    icon: Award,
    color: "from-sky-600 to-sky-400" 
  }
];

const partners = [
  { name: "Nexus Commerce", logo: "/partners/nexus.png", icon: Globe },
  { name: "SwiftBite", logo: "/partners/swiftbite.png", icon: Globe },
  { name: "EduCore", logo: "/partners/educore.png", icon: Globe },
  { name: "Aura Real Estate", logo: "/partners/aura.png", icon: Globe },
  { name: "OM SAI", logo: "/partners/om-sai.jpg", isLocal: true },
  { name: "Partner 2", logo: "/partners/partner-2.png", isLocal: true }
];

export default function TrustedBy() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".stat-card", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });

    gsap.from(".partner-logo", {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".partners-grid",
        start: "top 85%",
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Section: Trusted By & Stats */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-8">
            <h2 className="text-6xl md:text-8xl font-heading font-bold text-white tracking-tighter uppercase">
              Trusted By
            </h2>
            <p className="text-white/60 text-xl leading-relaxed max-w-xl font-light">
              We're a family of innovators growing together. With 50+ clients worldwide, 
              Metrobrain continues to build trust, relationships, and impactful digital solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className="stat-card group relative bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center transition-all hover:bg-white/10 hover:border-cyan-500/30 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <h3 className="text-4xl md:text-5xl font-black font-heading text-white mb-2 tracking-tighter">
                  {stat.number}
                </h3>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Global Partners */}
        <div className="space-y-12">
          <div className="flex flex-col items-center">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
            <h4 className="text-[10px] font-heading font-black text-cyan-500/60 uppercase tracking-[0.6em] mb-12">
              Global Partners
            </h4>
          </div>

          <div className="partners-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners.map((partner, i) => (
              <div key={i} className="partner-logo flex flex-col items-center gap-6 group">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center transition-all duration-500 group-hover:bg-white/[0.08] group-hover:border-cyan-500/30 group-hover:scale-110 shadow-2xl">
                  {partner.isLocal ? (
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="w-16 h-16 md:w-20 md:h-20 object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                  ) : (
                    <partner.icon className="w-10 h-10 md:w-12 md:h-12 text-white/20 group-hover:text-cyan-400 transition-all duration-500" />
                  )}
                </div>
                <span className="text-[9px] font-heading font-black text-white/20 uppercase tracking-[0.3em] group-hover:text-white transition-colors">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
