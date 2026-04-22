"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import NeuralMatrix from "./NeuralMatrix";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Refresh ScrollTrigger after layout to ensure correct trigger positions
    ScrollTrigger.refresh();
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#020617] text-white overflow-x-hidden">
      <NeuralMatrix />
      
      {/* Foreground Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
