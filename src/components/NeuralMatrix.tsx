"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ParticleSystem = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Create 5000 particles
  const count = 5000;
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Random positions in a wide spread
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
      
      // Neon colors (cyan, blue, violet)
      const colorType = Math.random();
      if (colorType < 0.33) {
        // Cyan
        col[i * 3] = 0.13;
        col[i * 3 + 1] = 0.82;
        col[i * 3 + 2] = 0.93;
      } else if (colorType < 0.66) {
        // Blue
        col[i * 3] = 0.23;
        col[i * 3 + 1] = 0.51;
        col[i * 3 + 2] = 0.96;
      } else {
        // Violet
        col[i * 3] = 0.54;
        col[i * 3 + 1] = 0.36;
        col[i * 3 + 2] = 0.96;
      }
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.05;
      pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
      
      // Basic interaction with mouse
      const mouseX = (state.pointer.x * Math.PI) / 10;
      const mouseY = (state.pointer.y * Math.PI) / 10;
      
      pointsRef.current.rotation.y += (mouseX - pointsRef.current.rotation.y) * 0.05;
      pointsRef.current.rotation.x += (-mouseY - pointsRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default function NeuralMatrix() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#0A0A0F]">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <fog attach="fog" args={["#0A0A0F", 5, 15]} />
        <ParticleSystem />
      </Canvas>
    </div>
  );
}
