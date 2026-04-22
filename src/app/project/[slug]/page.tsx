"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Code2, Database, Shield } from "lucide-react";
import AnimatedLayout from "@/components/AnimatedLayout";
import EcommercePrototype from "@/components/prototypes/EcommercePrototype";
import FoodDeliveryPrototype from "@/components/prototypes/FoodDeliveryPrototype";
import LMSPrototype from "@/components/prototypes/LMSPrototype";
import RealEstatePrototype from "@/components/prototypes/RealEstatePrototype";

// Dummy data for prototypes. In production, this would come from a CMS or Database.
const projectData = {
  "nexus-commerce": {
    name: "Nexus Commerce",
    tagline: "High-fidelity e-commerce experience.",
    description: "A premium watch curation platform showcasing glassmorphic UI elements and real-time cart interactions. Designed for the high-end retail sector.",
    color: "from-cyan-500",
    bgGlow: "bg-cyan-500/10",
    features: ["Real-time Inventory", "Glassmorphic UI", "Premium Curation"]
  },
  "swiftbite": {
    name: "SwiftBite",
    tagline: "Mobile-first food delivery ecosystem.",
    description: "A comprehensive food delivery simulation featuring a realistic mobile interface and live order tracking logic.",
    color: "from-blue-500",
    bgGlow: "bg-blue-500/10",
    features: ["Live Tracking", "Mobile-First UX", "Status Automation"]
  },
  "educore": {
    name: "EduCore LMS",
    tagline: "Enterprise learning management system.",
    description: "A robust learning hub with course progress tracking, instructor profiles, and interactive learning milestones.",
    color: "from-violet-500",
    bgGlow: "bg-violet-500/10",
    features: ["Progress Tracking", "Course Management", "Interactive Modules"]
  },
  "aura-estate": {
    name: "Aura Real Estate",
    tagline: "Luxury property viewing platform.",
    description: "A sophisticated real estate exploration tool with high-fidelity imagery and a focus on minimalist elegance.",
    color: "from-rose-500",
    bgGlow: "bg-rose-500/10",
    features: ["Immersive Imagery", "Luxury Filters", "Property Search"]
  }
};

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [isLive, setIsLive] = useState(false);
  // @ts-ignore
  const project = projectData[slug];

  if (!project) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        <h1 className="text-4xl font-heading font-black text-cyan-500">PROTOTYPE NOT FOUND</h1>
      </div>
    );
  }

  return (
    <AnimatedLayout>
      <main className="relative min-h-[80vh] pt-32 pb-8 px-6">
        
        {/* Ambient Glow */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] ${project.bgGlow} blur-[120px] pointer-events-none rounded-full`} />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Navigation */}
          <Link href="/#work" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Our Work
          </Link>

          {/* Header Section */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-gradient-to-r ${project.color} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 bg-gradient-to-r ${project.color}`}></span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/80">
                Live Prototype Deployment
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tighter text-white mb-4 leading-tight">
              {project.name.toUpperCase()}
            </h1>
            <p className="text-xl font-light text-white/60 max-w-3xl leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-white/40 border-b border-white/10 pb-4">System Architecture</h3>
              <p className="text-lg text-white/80 leading-relaxed">
                {project.description}
              </p>
              
              {/* Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {project.features.map((feat: string, i: number) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <Database className="w-5 h-5 text-cyan-500 mb-3 opacity-50" />
                    <h4 className="text-sm font-bold text-white mb-2">{feat}</h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Stats/Info */}
            <div className="space-y-4">
               <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                 <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-white/40 mb-4">Tech Stack</h3>
                 <div className="space-y-3">
                   <div className="flex items-center gap-3 text-white/80 text-sm">
                     <Code2 className="w-4 h-4 text-cyan-500" /> React 19 / Next.js
                   </div>
                   <div className="flex items-center gap-3 text-white/80 text-sm">
                     <Database className="w-4 h-4 text-violet-500" /> PostgreSQL / Redis
                   </div>
                   <div className="flex items-center gap-3 text-white/80 text-sm">
                     <Shield className="w-4 h-4 text-emerald-500" /> Enterprise Auth
                   </div>
                 </div>
               </div>
            </div>

          </div>

          {/* Interactive Live Dashboard or Specific Prototype */}
          <div className="w-full min-h-[400px] md:min-h-[550px] rounded-[2rem] border border-white/10 bg-[#060A14] overflow-hidden relative shadow-[0_0_100px_rgba(34,211,238,0.05)]">
            
            {slug === "nexus-commerce" && <EcommercePrototype />}
            {slug === "swiftbite" && <FoodDeliveryPrototype />}
            {slug === "educore" && <LMSPrototype />}
            {slug === "aura-estate" && <RealEstatePrototype />}

            {/* Default Dashboard for others */}
            {!["nexus-commerce", "swiftbite", "educore", "aura-estate"].includes(slug) && (
              <div className="absolute inset-0 flex">
                {/* Sidebar */}
                <div className="w-64 border-r border-white/5 bg-white/[0.01] hidden md:flex flex-col p-6">
                  <div className="text-xl font-black text-white tracking-tighter mb-12 flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-md bg-gradient-to-tr ${project.color}`} />
                    {project.name.split(' ')[0]}
                  </div>
                  <div className="space-y-4 flex-1">
                    {['Overview', 'Analytics', 'System Health', 'Settings'].map((item, i) => (
                      <div key={i} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${i === 0 ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10" />
                      <div>
                        <div className="text-sm text-white font-medium">Admin</div>
                        <div className="text-xs text-white/40">admin@foundry.io</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0">
                  {/* Topbar */}
                  <div className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-white/[0.01]">
                    <div className="text-lg font-medium text-white/80">Dashboard Overview</div>
                    <div className="flex items-center gap-4">
                      <div className="w-64 h-10 rounded-full bg-white/5 border border-white/10 flex items-center px-4">
                        <span className="text-sm text-white/30">Search metrics...</span>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Scrollable Area */}
                  <div className="flex-1 p-8 overflow-y-auto overflow-x-hidden space-y-8 hide-scrollbar">
                    
                    {/* Stats Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {[
                        { label: "Active Connections", val: "14,092", trend: "+12.5%" },
                        { label: "Avg. Latency", val: "24ms", trend: "-2.1%" },
                        { label: "Bandwidth (TB)", val: "1.4", trend: "+5.4%" }
                      ].map((stat, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden group hover:border-cyan-500/30 transition-colors cursor-pointer">
                          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity blur-2xl rounded-full`} />
                          <div className="text-sm text-white/40 mb-2">{stat.label}</div>
                          <div className="text-4xl font-black text-white tracking-tighter mb-4">{stat.val}</div>
                          <div className="text-xs text-emerald-400 font-medium bg-emerald-400/10 inline-block px-2 py-1 rounded-md">{stat.trend}</div>
                        </div>
                      ))}
                    </div>

                    {/* Chart Area Mock */}
                    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                      <div className="flex justify-between items-center mb-8">
                        <div className="text-lg font-medium text-white">System Throughput</div>
                        <div className="flex gap-2">
                          {['1H', '1D', '1W'].map((t, i) => (
                            <div key={i} className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer ${i === 0 ? 'bg-cyan-500/20 text-cyan-400' : 'text-white/40 hover:text-white'}`}>
                              {t}
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* CSS Animated Bar Chart */}
                      <div className="h-64 flex items-end gap-2 sm:gap-4 px-2">
                        {[40, 70, 45, 90, 65, 85, 100, 60, 50, 75, 40, 80].map((height, i) => (
                          <div key={i} className="flex-1 bg-white/5 rounded-t-lg relative group">
                            {/* Animate height on render */}
                            <div 
                              className={`absolute bottom-0 w-full rounded-t-lg bg-gradient-to-t ${project.color} to-transparent opacity-80 group-hover:opacity-100 transition-all duration-500 ease-out`}
                              style={{ height: `${height}%`, animation: `growUp 1s ease-out forwards`, animationDelay: `${i * 0.05}s` }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Data Table Mock */}
                    <div className="rounded-3xl bg-white/[0.02] border border-white/5 overflow-hidden">
                      <div className="p-6 border-b border-white/5">
                        <div className="text-lg font-medium text-white">Live Data Stream</div>
                      </div>
                      <div className="w-full">
                        <div className="grid grid-cols-4 px-6 py-4 border-b border-white/5 text-xs font-bold text-white/40 uppercase tracking-wider">
                          <div>ID</div>
                          <div>Status</div>
                          <div>Region</div>
                          <div>Latency</div>
                        </div>
                        {[1, 2, 3, 4].map((row, i) => (
                          <div key={i} className="grid grid-cols-4 px-6 py-4 border-b border-white/5 text-sm text-white/80 hover:bg-white/[0.02] transition-colors">
                            <div className="font-mono text-white/50">#REQ-{Math.floor(Math.random() * 10000)}</div>
                            <div><span className="w-2 h-2 rounded-full bg-cyan-400 inline-block mr-2 animate-pulse" />Active</div>
                            <div>us-east-1</div>
                            <div>{Math.floor(Math.random() * 50) + 10}ms</div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* Overlay to block interaction and prompt "Full Screen Demo" */}
            {!isLive && (
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/60 backdrop-blur-md transition-all duration-500 cursor-pointer group"
                onClick={() => setIsLive(true)}
              >
                <button className="px-8 py-4 bg-white text-black font-bold tracking-[0.2em] uppercase rounded-xl flex items-center gap-3 hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                  Launch Interactive Prototype <ExternalLink className="w-5 h-5" />
                </button>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mt-6 group-hover:text-white/60 transition-colors">Click to initialize connection</p>
              </div>
            )}
            
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes growUp {
                from { height: 0%; }
              }
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}} />
          </div>

        </div>
      </main>
    </AnimatedLayout>
  );
}
