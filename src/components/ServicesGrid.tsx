"use client";

import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    slug: "web-development",
    title: "Web Development",
    desc: "Custom web architectures optimized for high performance and user engagement.",
    image: "/services/icon_web.png",
    colSpan: "lg:col-span-3 md:col-span-6 col-span-12",
  },
  {
    slug: "app-development",
    title: "App Development",
    desc: "Robust cross-platform application development with scalable cloud backends.",
    image: "/services/icon_app.png",
    colSpan: "lg:col-span-3 md:col-span-6 col-span-12",
  },
  {
    slug: "ai-tool-development",
    title: "AI Tool Development",
    desc: "Advanced AI integration and enterprise-grade process automation solutions.",
    image: "/services/icon_ai.png",
    colSpan: "lg:col-span-3 md:col-span-6 col-span-12",
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    desc: "Strategic user interface design focused on conversion and user retention.",
    image: "/services/icon_ui.png",
    colSpan: "lg:col-span-3 md:col-span-6 col-span-12",
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    desc: "Architecture and management of secure, high-availability cloud environments.",
    image: "/services/icon_cloud.png",
    colSpan: "lg:col-span-4 md:col-span-6 col-span-12",
  },
  {
    slug: "it-consulting",
    title: "IT Consulting",
    desc: "Strategic technology advisory to drive digital efficiency and business growth.",
    image: "/services/icon_consulting.png",
    colSpan: "lg:col-span-4 md:col-span-6 col-span-12",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    desc: "Data-driven marketing strategies and comprehensive search optimization.",
    image: "/services/icon_marketing.png",
    colSpan: "lg:col-span-4 md:col-span-6 col-span-12",
  }
];

const TiltServiceCard = ({ svc, setRef }: { svc: typeof services[0], setRef: (el: HTMLAnchorElement | null) => void }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <Link 
      href={`/service/${svc.slug}`}
      ref={(el) => {
        // @ts-ignore
        cardRef.current = el;
        setRef(el);
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-[2rem] bg-transparent border border-white/10 p-8 flex flex-col h-[320px] transition-all duration-300 ease-out hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] hover:border-cyan-500/50 hover:bg-white/[0.02] backdrop-blur-sm ${svc.colSpan}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Top Section: Icon & Arrow */}
      <div className="flex justify-between items-start mb-8 relative z-10" style={{ transform: "translateZ(30px)" }}>
        <div className="w-16 h-16 group-hover:scale-110 transition-transform duration-500">
           <img 
             src={svc.image} 
             alt={svc.title} 
             className="w-full h-full object-contain mix-blend-screen brightness-125 contrast-125 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]" 
             onError={(e) => {
               e.currentTarget.src = "https://via.placeholder.com/64/020617/22d3ee?text=Icon";
             }}
           />
        </div>
        
        <div className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 group-hover:bg-cyan-500 group-hover:border-cyan-400 group-hover:text-black text-white/40 transition-all duration-500">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Bottom Section: Typography */}
      <div className="mt-auto relative z-10" style={{ transform: "translateZ(20px)" }}>
        <h3 className="text-xl font-bold font-heading text-white mb-2 tracking-tight group-hover:text-cyan-400 transition-colors">
          {svc.title}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed">
          {svc.desc}
        </p>
      </div>
    </Link>
  );
};

export default function ServicesGrid() {
  const container = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useGSAP(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container.current,
              start: "top 75%",
              once: true
            }
          }
        );
      }
    });
  }, { scope: container });

  return (
    <section ref={container} id="services" className="relative py-16 px-6 bg-transparent">
      <div className="max-w-[85rem] mx-auto z-10 relative">
        <div className="text-center md:text-left mb-10">
          <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter text-white mb-4">
            Our Services
          </h2>
          <p className="text-white/50 max-w-2xl text-lg">
            Delivering cutting-edge solutions across the entire digital spectrum.
          </p>
        </div>
        
        {/* Strict 12-column Grid matching SpazorLabs */}
        <div className="grid grid-cols-12 gap-6" style={{ perspective: "1500px" }}>
          {services.map((svc, i) => {
            return (
              <TiltServiceCard 
                key={svc.slug} 
                svc={svc} 
                setRef={(el) => { cardsRef.current[i] = el; }} 
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
