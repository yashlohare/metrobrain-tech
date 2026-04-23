"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "Metrobrain Technologies completely overhauled our digital infrastructure. Their strategic approach reduced our server latency by 40% and delivered a flawless user experience for our educational platform.",
    author: "Santosh Lohare",
    role: "MD, Metrobrain Educare Pvt. Ltd.",
    rating: 5,
  },
  {
    quote: "We needed a team that understood both deep AI integration and modern web design. Metrobrain delivered a product that exceeded our expectations on both fronts. Highly recommended.",
    author: "Harshit Suthar",
    role: "Founder, Webier",
    rating: 5,
  },
  {
    quote: "Working with the Metrobrain team was seamless. They provided transparent communication, rapid prototyping, and a final digital product that drove a significant increase in our B2B lead generation.",
    author: "Ayush Khaire",
    role: "MD, OmSai Steel Industries Pune",
    rating: 5,
  }
];

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="py-16 md:py-24 relative bg-[#020617] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-cyan-500 mb-4">
            Client Success
          </h2>
          <h3 className="text-3xl md:text-6xl font-heading font-black text-white tracking-tighter mb-6">
            Trusted by Industry Leaders.
          </h3>
          <p className="text-white/60 text-lg leading-relaxed font-light">
            Don&apos;t just take our word for it. Here is what our strategic partners say about the impact of our digital solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div 
              key={i}
              style={{ y: i % 2 !== 0 ? y : 0 }}
              className="glass-card p-6 md:p-10 rounded-[2rem] border border-white/10 hover:border-cyan-500/30 transition-all duration-500 relative group flex flex-col h-full"
            >
              <Quote className="w-12 h-12 text-cyan-500/20 absolute top-8 right-8 group-hover:text-cyan-500/40 transition-colors" />
              
              <div className="flex gap-1 mb-8">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-cyan-500 text-cyan-500" />
                ))}
              </div>

              <p className="text-white/80 text-base md:text-lg leading-relaxed font-light italic mb-10 flex-1">
                &quot;{testimonial.quote}&quot;
              </p>

              <div className="pt-6 border-t border-white/10 mt-auto">
                <h4 className="text-white font-bold tracking-wider mb-1">{testimonial.author}</h4>
                <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
