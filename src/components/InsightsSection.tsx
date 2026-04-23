"use client";

import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

const articles = [
  {
    slug: "agentic-ai-enterprise",
    category: "AI & Automation",
    title: "Agentic AI: The Next Frontier in Enterprise Workflows",
    date: "Oct 18, 2026",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop"
  },
  {
    slug: "cloud-native-scalability",
    category: "Cloud Engineering",
    title: "Mastering Cloud-Native Scalability with Next.js 15",
    date: "Oct 15, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
  },
  {
    slug: "scaling-nextjs",
    category: "Architecture",
    title: "Scaling Next.js Applications for Enterprise Traffic",
    date: "Oct 12, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    slug: "custom-llm-integrations",
    category: "Artificial Intelligence",
    title: "The Strategic Advantage of Custom LLM Integrations",
    date: "Oct 05, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function InsightsSection() {
  return (
    <section className="py-16 md:py-24 relative bg-[#0A0A0F]" id="insights">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-cyan-500 mb-4 flex items-center gap-3">
              <BookOpen className="w-4 h-4" />
              Strategic Insights
            </h2>
            <h3 className="text-3xl md:text-6xl font-heading font-black text-white tracking-tighter">
              THOUGHT LEADERSHIP.
            </h3>
          </div>
          <button className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors group">
            View All Articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <Link 
              key={i}
              href={`/insight/${article.slug}`}
              className="group cursor-pointer flex flex-col"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden mb-6">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-cyan-500/10 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                    {article.readTime}
                  </span>
                </div>
                
                <h4 className="text-xl md:text-2xl font-bold font-heading text-white leading-tight mb-4 group-hover:text-cyan-400 transition-colors">
                  {article.title}
                </h4>
                
                <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-white/40">{article.date}</span>
                  <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                    Read More <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
