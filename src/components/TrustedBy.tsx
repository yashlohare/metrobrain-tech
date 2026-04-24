"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Award, Users, Rocket, Globe } from "lucide-react";

const stats = [
  { 
    number: "06", 
    label: "Live Projects", 
    icon: Rocket,
    color: "from-blue-600 to-blue-400" 
  },
  { 
    number: "10+", 
    label: "Happy Clients", 
    icon: Users,
    color: "from-cyan-600 to-cyan-400" 
  }
];

const partners = [
  { name: "Nexus Commerce", logo: "/partners/nexus.png", isLocal: true },
  { name: "SwiftBite", logo: "/partners/swiftbite.png", isLocal: true },
  { name: "EduCore", logo: "/partners/educore.png", isLocal: true },
  { name: "Aura Real Estate", logo: "/partners/aura.png", isLocal: true },
  { name: "OM SAI", logo: "/partners/om-sai.jpg", isLocal: true },
  { name: "Metrobrain Educare Pvt.Ltd", logo: "/partners/partner-2.png", isLocal: true }
];

export default function TrustedBy() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Stats animation
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

    // Infinite Marquee for Partners
    const marquee = document.querySelector(".marquee-inner");
    if (marquee) {
      const w = marquee.scrollWidth;
      gsap.to(marquee, {
        x: `-${w / 2}`,
        duration: 25,
        repeat: -1,
        ease: "none",
      });
    }
  }, { scope: container });

  // Duplicate partners for seamless loop
  const displayPartners = [...partners, ...partners];

  return (
    <section ref={container} className="relative py-16 lg:py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Section: Trusted By & Stats */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 lg:mb-32">
          <div className="space-y-8">
            <h2 className="text-6xl md:text-8xl font-heading font-bold text-white tracking-tighter uppercase">
              Trusted By
            </h2>
            <p className="text-white/60 text-xl leading-relaxed max-w-xl font-light">
              We&apos;re a family of innovators growing together. With 10+ clients worldwide, 
              Metrobrain continues to build trust, relationships, and impactful digital solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className="stat-card group relative bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center transition-all hover:bg-white/10 hover:border-cyan-500/30 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
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

        {/* Bottom Section: Global Partners Marquee */}
        <div className="space-y-8 lg:space-y-16">
          <div className="flex flex-col items-center">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />
            <h4 className="text-[10px] font-heading font-black text-cyan-500/60 uppercase tracking-[0.6em]">
              Global Partners
            </h4>
          </div>

          <div className="relative w-full overflow-hidden mask-fade-edges py-8">
            <div className="marquee-inner flex gap-12 w-max items-center">
              {displayPartners.map((partner, i) => (
                <div key={i} className="flex flex-col items-center gap-6 group px-8">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center transition-all duration-500 group-hover:bg-white/[0.08] group-hover:border-cyan-500/30 group-hover:scale-105 shadow-2xl">
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="w-20 h-20 md:w-24 md:h-24 object-contain transition-all duration-500 drop-shadow-2xl group-hover:scale-110"
                    />
                  </div>
                  <span className="text-[10px] font-heading font-black text-cyan-400/80 uppercase tracking-[0.3em] drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-all duration-300">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        .mask-fade-edges {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>

      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
