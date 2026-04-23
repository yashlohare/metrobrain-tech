"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

const projects = [
  { 
    slug: "nexus-commerce", 
    name: "Nexus Commerce", 
    desc: "A high-fidelity e-commerce experience with premium watch curation and real-time cart interactions.", 
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=2070&auto=format&fit=crop",
    metrics: ["+45% Conversion Rate", "-2.1s Load Time"]
  },
  { 
    slug: "swiftbite", 
    name: "SwiftBite", 
    desc: "A mobile-first food delivery ecosystem featuring live order tracking and dynamic status updates.", 
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2070&auto=format&fit=crop",
    metrics: ["10k+ Daily Orders", "99.9% Uptime"]
  },
  { 
    slug: "educore", 
    name: "EduCore LMS", 
    desc: "An enterprise learning management system with course progress tracking and interactive video modules.", 
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
    metrics: ["50k+ Active Users", "30% Cost Reduction"]
  },
  { 
    slug: "aura-estate", 
    name: "Aura Real Estate", 
    desc: "A luxury property viewing platform with immersive imagery and elegant searching capabilities.", 
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    metrics: ["+200% Lead Gen", "Zero Downtime"]
  },
];

export default function ProjectsShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  useGSAP(() => {
    if (container.current) {
      gsap.from(".project-header", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        }
      });
      
      gsap.from(".project-slider", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        }
      });
    }
  }, { scope: container });

  const activeProject = projects[currentIndex];

  return (
    <section ref={container} id="work" className="relative py-14 px-6">
      <div className="max-w-[90rem] mx-auto relative z-10">
        
        {/* Split Header matching SpazorLabs */}
        <div className="project-header flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tighter">
            Our Work
          </h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl lg:text-right font-light">
            We measure success not just in lines of code, but in business impact. 
            Here are some of our latest strategic deployments.
          </p>
        </div>

        {/* Full-width Carousel Slider */}
        <div 
          className="project-slider relative w-full h-[500px] md:h-[550px] rounded-[2rem] overflow-hidden border border-white/10 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* Active Image Background */}
          <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
            <img 
              key={activeProject.slug} // Force re-render for simple transition
              src={activeProject.image} 
              alt={activeProject.name}
              className="w-full h-full object-cover animate-in fade-in zoom-in duration-1000"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/70 to-transparent opacity-95" />
          </div>

          {/* Bottom Overlay Content */}
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8">
            
            {/* Project Details */}
            <div className="max-w-3xl flex flex-col items-start gap-4 md:gap-6">
              <div>
                <Link href={`/project/${activeProject.slug}`}>
                  <h3 className="text-3xl md:text-6xl font-black font-heading text-white tracking-tighter mb-2 md:mb-4 hover:text-cyan-400 transition-colors uppercase">
                    {activeProject.name}
                  </h3>
                </Link>
                <p className="text-white/70 text-sm md:text-xl leading-relaxed mb-4 md:mb-6 line-clamp-2 md:line-clamp-none">
                  {activeProject.desc}
                </p>
                
                {/* ROI Metrics */}
                <div className="flex flex-wrap gap-2 md:gap-4">
                  {activeProject.metrics?.map((metric, idx) => (
                    <div key={idx} className="px-3 py-1.5 md:px-4 md:py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-[10px] md:text-sm font-bold tracking-widest uppercase">
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
              
              <Link 
                href={`/project/${activeProject.slug}`}
                className="group/btn flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-white/10 hover:bg-white text-white hover:text-black rounded-xl border border-white/20 transition-all font-bold tracking-widest uppercase text-[10px] md:text-xs mt-2 md:mt-4"
              >
                View Our Work
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-4 shrink-0 self-end md:self-auto">
              <button 
                onClick={handlePrev}
                className="w-14 h-14 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNext}
                className="w-14 h-14 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
