"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "₹5,999",
    features: ["Landing page", "Responsive Design", "Basic SEO", "15 days support"],
    featured: false
  },
  {
    name: "Professional",
    price: "₹19,999",
    features: ["5 pages", "Custom UI/UX", "Database & Dashboard", "AI Chatbot Engine", "1 month support"],
    featured: false
  },
  {
    name: "Enterprise",
    price: "₹49,999",
    features: ["Custom Web App", "Mobile Wrapper", "Advanced AI & Payments", "Marketing Launch", "3 months support"],
    featured: true
  }
];

// Reusable Tilt Card Component
const PricingCard = ({ tier, i }: { tier: any, i: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Subtle rotation to prevent extreme perspective clipping
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full rounded-[2rem] p-8 flex flex-col h-full transition-all duration-300 ease-out hover:shadow-2xl ${tier.featured ? 'z-10' : 'z-0'}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Background glass */}
      <div className={`absolute inset-0 rounded-[2rem] backdrop-blur-xl border ${tier.featured ? 'bg-cyan-950/40 border-cyan-500/50 shadow-[0_0_50px_rgba(34,211,238,0.2)]' : 'bg-white/10 border-white/20'}`} />
      
      {/* Glowing Energy Flow for Enterprise */}
      {tier.featured && (
        <div className="absolute inset-0 rounded-[2rem] opacity-30 overflow-hidden">
          <div className="absolute top-0 left-[-100%] w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[shimmer_2s_infinite]" />
          <div className="absolute bottom-0 right-[-100%] w-full h-[2px] bg-gradient-to-l from-transparent via-violet-400 to-transparent animate-[shimmer_2s_infinite_reverse]" />
        </div>
      )}

      {/* Badge placed exactly on the top border of the outer card */}
      {tier.featured && (
        <div className="absolute -top-3 left-0 w-full flex justify-center z-20">
          <span className="inline-block px-4 py-1 bg-[#020617] text-[10px] font-bold uppercase tracking-widest text-cyan-400 border border-cyan-400/50 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.2)]">
            Neural Foundry Pick
          </span>
        </div>
      )}

      {/* Inner Content - Subtle translateZ to give depth without clipping outside */}
      <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(10px)" }}>
        
        <div className="pt-2">
          <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
          <div className="text-4xl font-black tracking-tighter text-white mb-8">
            {tier.price}
          </div>
        </div>

        <ul className="space-y-4 mb-10">
          {tier.features.map((feat: string, idx: number) => (
            <li key={idx} className="flex items-center gap-3 text-sm text-white/60">
              <Check className={`w-4 h-4 ${tier.featured ? 'text-cyan-400' : 'text-white/30'}`} />
              {feat}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-4">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
            className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
              tier.featured 
                ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]' 
                : 'bg-white/5 text-white hover:bg-white/10'
            }`}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default function PricingSection() {
  const container = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (cardsWrapperRef.current) {
      const cards = cardsWrapperRef.current.children;
      gsap.from(cards, {
        y: 150,
        z: -100,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        }
      });
    }
  }, { scope: container });

  return (
    <section ref={container} id="pricing" className="relative py-16 px-6">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 tracking-tighter">
            ENGINEERING TIERS
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Choose the core architecture that fits your digital ecosystem. Transparent pricing, elite execution.
          </p>
        </div>

        <div ref={cardsWrapperRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch" style={{ perspective: "1000px" }}>
          {tiers.map((tier, i) => (
            <PricingCard key={i} tier={tier} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
