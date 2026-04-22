"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Cpu, ArrowRight } from "lucide-react";

export default function AboutSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (container.current) {
      gsap.from(".about-element", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        }
      });
    }
  }, { scope: container });

  return (
    <section ref={container} id="about" className="relative py-16 px-6 overflow-hidden">
      <div className="max-w-[80rem] mx-auto relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Left Typography Column */}
        <div className="flex-1">
          <h2 className="about-element text-sm font-bold tracking-[0.3em] uppercase text-cyan-500 mb-4 flex items-center gap-4">
            <span className="w-12 h-[1px] bg-cyan-500/50" />
            About Metrobrain
          </h2>
          
          <h3 className="about-element text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white tracking-tighter leading-[1.1] mb-6">
            ARCHITECTING THE<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">DIGITAL</span><br/>
            FUTURE.
          </h3>
          
          <div className="about-element space-y-6 text-white/60 text-lg leading-relaxed max-w-xl">
            <p>
              We are a dedicated technology agency specializing in high-performance digital solutions. At Metrobrain Technology, we integrate advanced AI models, build scalable distributed systems, and craft intuitive, modern user interfaces.
            </p>
            <p>
              Our solutions are built on modern frameworks like Next.js 15, ensuring high performance, security, and scalability for enterprise-grade applications.
            </p>
          </div>
          
          <button className="about-element mt-12 group relative px-8 py-4 border border-white/10 bg-white/5 backdrop-blur-md text-white font-bold tracking-[0.2em] uppercase rounded-full overflow-hidden transition-all hover:bg-white/10 hover:border-white/30 flex items-center gap-4">
            <div className="absolute inset-0 w-0 bg-cyan-500 group-hover:w-full transition-all duration-500 ease-out" />
            <span className="relative z-10 flex items-center gap-3 group-hover:text-black transition-colors duration-300">
              Meet the Leadership
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        </div>

        {/* Right / Bottom Visual Column */}
        <div className="about-element flex-1 flex flex-col justify-center">
          <div className="relative w-full aspect-[21/9] rounded-[2rem] overflow-hidden border border-white/10 bg-[#0A0A0F] group cursor-pointer shadow-2xl shadow-cyan-900/20">
            {/* Cinematic Placeholder / Image Area */}
            <img 
              src="/banner.png" 
              alt="Metrobrain Technology - Building Intelligent Systems"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            
            {/* Frame overlay */}
            <div className="absolute inset-0 border-2 border-white/5 rounded-[2rem] pointer-events-none" />
          </div>
          
          {/* Founders specific text below the image */}
          <div className="mt-8 flex gap-8 border-t border-white/10 pt-8">
            <div>
              <p className="text-white font-bold tracking-wider">Yash Lohare</p>
              <p className="text-sm text-cyan-500 font-bold tracking-[0.2em] uppercase mt-1">Founder & CEO</p>
            </div>
            <div>
              <p className="text-white font-bold tracking-wider">Adinath Made</p>
              <p className="text-sm text-cyan-500 font-bold tracking-[0.2em] uppercase mt-1">Co-Founder & CTO</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
