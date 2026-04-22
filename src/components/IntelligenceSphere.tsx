"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TorusKnot, Icosahedron, MeshDistortMaterial, Environment, Float, Sphere } from "@react-three/drei";
import * as THREE from "three";

function AdvancedCore() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (outerRef.current) {
      outerRef.current.rotation.x = time * 0.05;
      outerRef.current.rotation.y = time * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = time * -0.1;
      innerRef.current.rotation.y = time * -0.15;
    }
    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      {/* Outer Lattice */}
      <mesh ref={outerRef}>
        <Icosahedron args={[2.2, 1]}>
          <meshStandardMaterial 
            color="#22d3ee" 
            wireframe={true} 
            transparent={true} 
            opacity={0.15} 
            roughness={0.1}
          />
        </Icosahedron>
      </mesh>

      {/* Middle Neural Ring */}
      <mesh ref={innerRef}>
        <TorusKnot args={[1.6, 0.2, 128, 32]}>
          <meshStandardMaterial 
            color="#3b82f6" 
            wireframe={true} 
            transparent={true} 
            opacity={0.3} 
          />
        </TorusKnot>
      </mesh>

      {/* Pulsating Neural Core */}
      <mesh ref={coreRef}>
        <Icosahedron args={[1.1, 3]}>
          <MeshDistortMaterial
            color="#8b5cf6" 
            envMapIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0}
            metalness={0.9}
            roughness={0.1}
            distort={0.4}
            speed={2}
          />
        </Icosahedron>
      </mesh>

      {/* Glowing Inner Point */}
      <Sphere args={[0.2, 32, 32]}>
        <meshBasicMaterial color="#ffffff" />
      </Sphere>
    </Float>
  );
}

export default function IntelligenceSphere() {
  return (
    <div className="w-full h-screen absolute right-0 top-0 pointer-events-none z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 7], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#22d3ee" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#8b5cf6" />
        <AdvancedCore />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
