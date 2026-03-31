"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSystemStore } from "@/stores/useSystemStore";
import * as THREE from "three";

export function Orb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme, performanceMode, activeProcessId } = useSystemStore();

  const isRetro = theme === 'retro';
  const isMinimal = theme === 'minimal';
  const hasActiveWindow = activeProcessId !== null;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // 1. Dynamic Rotation: Spins faster when a window is active/focused
    const rotationSpeed = hasActiveWindow ? 0.4 : 0.15;
    meshRef.current.rotation.y += rotationSpeed * 0.02;
    meshRef.current.rotation.z = t * 0.05;

    // 2. Pulse effect: More pronounced when active
    const pulseFreq = hasActiveWindow ? 2.5 : 1;
    const pulseAmp = hasActiveWindow ? 0.08 : 0.03;
    const scale = 1 + Math.sin(t * pulseFreq) * pulseAmp;
    
    meshRef.current.scale.set(scale, scale, scale);
  });

  // 3. Dynamic Material Properties
  const getEmissiveIntensity = () => {
    if (isRetro) return hasActiveWindow ? 3 : 1.5;
    if (isMinimal) return 0.2; // Dimmer for the Zen look
    return hasActiveWindow ? 1.2 : 0.4; // Glass default
  };

  return (
    <mesh ref={meshRef}>
      {/* Increased detail slightly for high-fidelity look */}
      <icosahedronGeometry args={[2, performanceMode ? 8 : 15]} />
      <meshStandardMaterial 
        wireframe 
        color={isRetro ? "#22c55e" : (isMinimal ? "#ffffff" : "#06b6d4")} 
        emissive={isRetro ? "#22c55e" : (isMinimal ? "#ffffff" : "#06b6d4")}
        emissiveIntensity={getEmissiveIntensity()}
        transparent
        opacity={isMinimal ? 0.4 : 0.8}
        // Fix for floor clipping/overlapping issues
        depthWrite={true}
        depthTest={true}
      />
    </mesh>
  );
}