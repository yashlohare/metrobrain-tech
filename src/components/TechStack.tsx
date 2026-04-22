"use client";

import { motion } from "framer-motion";

const technologies = [
  { name: "Next.js", iconUrl: "https://cdn.simpleicons.org/nextdotjs/white" },
  { name: "React", iconUrl: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "TypeScript", iconUrl: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Node.js", iconUrl: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "AWS", iconUrl: "https://cdn.simpleicons.org/amazonaws/FF9900" },
  { name: "Google Cloud", iconUrl: "https://cdn.simpleicons.org/googlecloud/4285F4" },
  { name: "PostgreSQL", iconUrl: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "Docker", iconUrl: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "Kubernetes", iconUrl: "https://cdn.simpleicons.org/kubernetes/326CE5" },
  { name: "TensorFlow", iconUrl: "https://cdn.simpleicons.org/tensorflow/FF6F00" },
  { name: "PyTorch", iconUrl: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
  { name: "Vercel", iconUrl: "https://cdn.simpleicons.org/vercel/white" },
];

export default function TechStack() {
  // Duplicate array to create a seamless loop
  const duplicatedTech = [...technologies, ...technologies, ...technologies];

  return (
    <section className="py-20 relative bg-black overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10 mb-12 text-center md:text-left">
        <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-cyan-500 mb-2">
          Enterprise Infrastructure
        </h2>
        <h3 className="text-3xl md:text-4xl font-heading font-black text-white tracking-tighter">
          Our Technology Stack
        </h3>
      </div>

      <div className="relative w-full flex overflow-hidden group">
        {/* Left Gradient Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        
        {/* Right Gradient Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
          className="flex whitespace-nowrap items-center py-4"
        >
          {duplicatedTech.map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-4 px-8 py-4 mx-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-colors group/item"
            >
              <img 
                src={tech.iconUrl} 
                alt={`${tech.name} Logo`} 
                className="w-6 h-6 object-contain grayscale opacity-70 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-300"
              />
              <span className="text-white/80 font-bold tracking-wider uppercase text-sm group-hover/item:text-white">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
