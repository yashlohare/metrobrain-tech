"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import AnimatedLayout from "@/components/AnimatedLayout";

const articleData = {
  "scaling-nextjs": {
    title: "Scaling Next.js Applications for Enterprise Traffic",
    category: "Architecture",
    date: "Oct 12, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    content: "When deploying Next.js for enterprise-scale applications, the architectural decisions made early in the development lifecycle compound significantly. This article explores advanced caching strategies using Redis, the optimal use of App Router's dynamic rendering, and how to distribute heavy computational loads across edge networks to achieve sub-100ms response times globally. We also dive into handling highly concurrent traffic spikes using serverless infrastructure."
  },
  "custom-llm-integrations": {
    title: "The Strategic Advantage of Custom LLM Integrations",
    category: "Artificial Intelligence",
    date: "Oct 05, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070&auto=format&fit=crop",
    content: "Off-the-shelf AI models provide a fantastic baseline, but true competitive advantage is forged through custom LLM integrations. By utilizing Retrieval-Augmented Generation (RAG) and fine-tuning models on proprietary corporate data, enterprises can automate complex, domain-specific workflows. This piece breaks down the ROI of custom AI infrastructure versus API-based dependencies, highlighting security, latency, and context-awareness benefits."
  },
  "designing-for-conversion": {
    title: "Designing for Conversion: High-Fidelity Interfaces",
    category: "UX Strategy",
    date: "Sep 28, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2070&auto=format&fit=crop",
    content: "Aesthetics alone do not drive revenue. High-fidelity interfaces must be engineered with cognitive psychology and user conversion flows in mind. By minimizing friction points, strategically using micro-animations to guide attention, and adhering to strict accessibility standards, we can significantly increase engagement metrics. This article reviews a recent case study where UI adjustments led to a 45% increase in form completions."
  }
};

export default function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  // @ts-ignore
  const article = articleData[slug];

  if (!article) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        <h1 className="text-4xl font-heading font-black text-cyan-500">ARTICLE NOT FOUND</h1>
      </div>
    );
  }

  return (
    <AnimatedLayout>
      <main className="relative min-h-screen pt-32 pb-20 px-6">
        
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/#insights" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold mb-12">
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                {article.category}
              </span>
              <div className="flex items-center gap-4 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {article.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {article.readTime}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tighter text-white leading-[1.1] mb-8">
              {article.title}
            </h1>
          </div>

          <div className="w-full aspect-[21/9] rounded-[2rem] overflow-hidden border border-white/10 mb-12 relative">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-invert prose-cyan max-w-none">
            <p className="text-xl text-white/80 leading-relaxed font-light">
              {article.content}
            </p>
            <div className="mt-12 p-8 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-white font-bold mb-4">Want to implement these strategies?</h3>
              <p className="text-white/60 mb-6">Our team of engineers and strategists are ready to architect your next digital solution.</p>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
                className="px-6 py-3 bg-cyan-500 text-black font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-cyan-400 transition-colors"
              >
                Discuss Your Project
              </button>
            </div>
          </div>
        </div>
      </main>
    </AnimatedLayout>
  );
}
