"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import AnimatedLayout from "@/components/AnimatedLayout";

const serviceData = {
  "web-development": {
    title: "Web Development",
    description: "We design and develop high-performance websites built for speed, SEO, and conversion.",
    features: ["Next.js 15 & React", "Headless CMS Integration", "Performance Optimization", "E-commerce Platforms"],
    color: "text-cyan-400"
  },
  "app-development": {
    title: "App Development",
    description: "Scalable mobile and web applications engineered for cross-platform dominance.",
    features: ["React Native / Expo", "Progressive Web Apps (PWA)", "Native Device APIs", "App Store Deployment"],
    color: "text-blue-400"
  },
  "ai-tool-development": {
    title: "AI Tool Development",
    description: "Custom AI solutions and intelligent automation to scale your internal operations.",
    features: ["LLM Fine-tuning", "RAG Pipelines", "Automated Agents", "Predictive Analytics"],
    color: "text-violet-400"
  },
  "ui-ux-design": {
    title: "UI/UX Design",
    description: "Intuitive and refined user experiences that drive engagement and retention.",
    features: ["Wireframing & Prototyping", "Design Systems", "Usability Testing", "Interactive Micro-animations"],
    color: "text-emerald-400"
  },
  "cloud-devops": {
    title: "Cloud & DevOps",
    description: "Cloud-native infrastructure design for zero-downtime scalability and security.",
    features: ["AWS / GCP / Azure", "CI/CD Pipelines", "Kubernetes & Docker", "Serverless Architecture"],
    color: "text-amber-400"
  },
  "it-consulting": {
    title: "IT Consulting",
    description: "Technology-driven business strategies to modernize your enterprise stack.",
    features: ["Digital Transformation", "Tech Stack Audits", "Security & Compliance", "Agile Coaching"],
    color: "text-rose-400"
  },
  "digital-marketing": {
    title: "Digital Marketing",
    description: "SEO and performance marketing strategies engineered by algorithmic experts.",
    features: ["Technical SEO", "Conversion Rate Optimization", "Programmatic Ads", "Data Analytics"],
    color: "text-fuchsia-400"
  }
};

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  // @ts-ignore
  const service = serviceData[slug];

  if (!service) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        <h1 className="text-4xl font-heading font-black text-cyan-500">SERVICE NOT FOUND</h1>
      </div>
    );
  }

  return (
    <AnimatedLayout>
      <main className="relative min-h-screen pt-32 pb-20 px-6">
        
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/#services" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold mb-16">
            <ArrowLeft className="w-4 h-4" />
            Back to Capabilities
          </Link>

          <div className="bg-[#0A0A0F] border border-white/10 rounded-[2rem] p-8 md:p-16 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-white/40 mb-6">Capability Deep Dive</h2>
              <h1 className={`text-4xl md:text-6xl font-heading font-black tracking-tighter mb-8 ${service.color}`}>
                {service.title.toUpperCase()}
              </h1>
              
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light mb-12">
                {service.description}
              </p>

              <div className="space-y-6">
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 border-b border-white/10 pb-4">
                  Core Competencies
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-white/80">
                      <CheckCircle2 className="w-5 h-5 text-cyan-500/50" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-16 pt-8 border-t border-white/10">
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
                  className="px-8 py-4 bg-white text-black font-bold tracking-[0.2em] uppercase rounded-xl hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all"
                >
                  Initiate Deployment
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </AnimatedLayout>
  );
}
