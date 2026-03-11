import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Terminal, Code, Smartphone, Rocket, Globe } from 'lucide-react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));

    // GSAP Staggered Reveals for Features
    gsap.fromTo(".gsap-feature-card", 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gsap-features-container",
          start: "top 80%"
        }
      }
    );
  }, []);

  const particlesOptions = {
    fullScreen: { enable: false },
    particles: {
      number: { value: 100, density: { enable: true, area: 800 } },
      color: { value: ["#00d4ff", "#7c3aed", "#ec4899"] },
      shape: { type: "circle" },
      opacity: { value: { min: 0.2, max: 0.6 }, animation: { enable: true, speed: 1, minimumValue: 0.1 } },
      size: { value: { min: 1, max: 4 } },
      links: {
        enable: true,
        distance: 180,
        color: "#00d4ff",
        opacity: 0.4,
        width: 1.5,
        consent: false,
        triangles: { enable: true, opacity: 0.1 }
      },
      move: {
        enable: true,
        speed: 1.2,
        direction: "none",
        outModes: { default: "bounce" },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: ["grab", "bubble"] },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        grab: { distance: 220, links: { opacity: 1, color: "#00d4ff" } },
        bubble: { distance: 200, size: 8, duration: 2, opacity: 0.8 },
        push: { quantity: 4 },
      },
    },
    detectRetina: true,
  };
  return (
    <div className="relative isolate overflow-hidden min-h-screen">
      {/* Neuron Particles Background */}
      {init && (
        <Particles 
          id="tsparticles" 
          options={particlesOptions} 
          className="absolute inset-0 -z-20 p-events-none" 
        />
      )}

      {/* 3D Background Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-pink-500/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute top-1/2 -right-20 w-[30rem] h-[30rem] bg-blue-600/20 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 lg:pt-48 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-pink-400 font-semibold mb-8 border-pink-500/30">
              <Rocket size={16} /> Metrobrain Technologies Agency
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8"
          >
            Transforming Ideas into <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500">
              Digital Reality
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            We build lightning-fast web applications, stunning e-commerce platforms, and custom software solutions designed to scale your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/contact" className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-blue-600 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(244,114,182,0.5)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
              Start Your Project <Rocket size={20} />
            </Link>
            <Link to="/portfolio" className="px-8 py-4 rounded-full glass-panel text-white font-bold text-lg hover:bg-white/10 border-white/20 transition-all flex items-center justify-center gap-2">
              View Our Work <Globe size={20} />
            </Link>
          </motion.div>
        </div>

        {/* Feature Cards Setup */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 gsap-features-container">
          {[
            { title: "Web Apps", icon: <Terminal className="text-pink-400" size={32}/>, text: "React & Next.js SPAs built for immense scale and perfect SEO." },
            { title: "E-Commerce", icon: <Code className="text-purple-400" size={32}/>, text: "High-conversion storefronts using custom headless architectures." },
            { title: "Mobile Dev", icon: <Smartphone className="text-blue-400" size={32}/>, text: "Cross-platform iOS and Android apps using React Native." },
          ].map((feature, i) => (
            <div
              key={feature.title}
              className="glass-panel p-8 rounded-2xl hover:border-pink-500/50 transition-colors group cursor-default gsap-feature-card"
            >
              <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
