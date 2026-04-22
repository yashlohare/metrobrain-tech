"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Users, Heart, Globe } from "lucide-react";
import AnimatedLayout from "@/components/AnimatedLayout";

const companyData = {
  "careers": {
    title: "Careers",
    tagline: "Join the next generation of digital architects.",
    description: "At Metrobrain Technology, we are always looking for exceptional talent in AI engineering, full-stack development, and UX strategy. We offer a high-performance environment where your work directly impacts enterprise-scale digital ecosystems.",
    icon: <Users className="w-8 h-8 text-cyan-500" />,
    features: ["Remote-First Culture", "Competitive Equity", "R&D Focused Work"]
  },
  "our-culture": {
    title: "Our Culture",
    tagline: "Innovation through collaboration and transparency.",
    description: "Our culture is built on the principles of extreme ownership and relentless innovation. We foster an environment where bold ideas are encouraged, and technical excellence is the baseline.",
    icon: <Heart className="w-8 h-8 text-rose-500" />,
    features: ["Extreme Ownership", "Deep Work Environment", "Continuous Learning"]
  },
  "partnerships": {
    title: "Partnerships",
    tagline: "Scaling together through strategic alliances.",
    description: "We collaborate with industry leaders and innovative startups to push the boundaries of what's possible in the AI and software space. Our partnership programs are designed for long-term mutual growth.",
    icon: <Globe className="w-8 h-8 text-blue-500" />,
    features: ["Tech Integration", "Strategic Consulting", "Joint R&D Ventures"]
  }
};

export default function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  // @ts-ignore
  const data = companyData[slug];

  if (!data) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        <h1 className="text-4xl font-heading font-black text-cyan-500">PAGE NOT FOUND</h1>
      </div>
    );
  }

  return (
    <AnimatedLayout>
      <main className="relative min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold mb-16">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="bg-[#0A0A0F] border border-white/10 rounded-[2rem] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
            
            <div className="relative z-10">
              <div className="mb-8">{data.icon}</div>
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-white/40 mb-4">Company Profile</h2>
              <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tighter text-white mb-6">
                {data.title.toUpperCase()}
              </h1>
              <p className="text-xl md:text-2xl text-cyan-400 font-medium mb-8">
                {data.tagline}
              </p>
              <p className="text-lg text-white/70 leading-relaxed font-light mb-12">
                {data.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/5">
                {data.features.map((feature: string, i: number) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                    <p className="text-white font-bold text-sm tracking-wide">{feature}</p>
                  </div>
                ))}
              </div>

              <div className="mt-16">
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
                  className="px-8 py-4 bg-white text-black font-bold tracking-[0.2em] uppercase rounded-xl hover:bg-cyan-400 transition-all"
                >
                  Contact Our Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AnimatedLayout>
  );
}
