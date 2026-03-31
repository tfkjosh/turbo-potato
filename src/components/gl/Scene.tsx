"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Orb } from "./Orb";
import { 
  PerspectiveCamera, 
  MeshReflectorMaterial, 
  Float,
  Environment,
} from "@react-three/drei";
import { useRef } from "react";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useSystemStore } from "@/stores/useSystemStore";

function HolographicCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Subtle rotation based on mouse position
    const targetRotationX = -state.mouse.y * 0.4;
    const targetRotationY = state.mouse.x * 0.4;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotationX,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotationY,
      0.05
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 2, 0]}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial 
          color="#06b6d4" 
          wireframe 
          emissive="#06b6d4" 
          emissiveIntensity={4} 
        />
      </mesh>
    </Float>
  );
}

function SceneContent() {
  const openWindows = useSystemStore((state) => state.openWindows);
  const isWorkspaceActive = openWindows.length > 0;
  
  // Ref for camera baseline to ensure smooth interpolation
  const focusOffset = useRef(new THREE.Vector3(0, 3, 12));

  useFrame((state) => {
    // 1. Determine focal targets
    // Wide View: [0, 3, 12] | Focus View: [0, 1.5, 8]
    const targetY = isWorkspaceActive ? 1.5 : 3;
    const targetZ = isWorkspaceActive ? 8 : 12;

    // 2. Smoothly transition the focal baseline
    focusOffset.current.y = THREE.MathUtils.lerp(focusOffset.current.y, targetY, 0.04);
    focusOffset.current.z = THREE.MathUtils.lerp(focusOffset.current.z, targetZ, 0.04);

    // 3. Mouse Parallax (The "Floating" effect)
    const parallaxX = state.mouse.x * 1.5;
    const parallaxY = state.mouse.y * 0.5;

    // 4. Combine baseline and parallax for final position
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, parallaxX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, focusOffset.current.y + parallaxY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, focusOffset.current.z, 0.05);

    // Camera always maintains focus on the core center
    state.camera.lookAt(0, 1, 0);
  });
  
  return (
    <>
      <PerspectiveCamera makeDefault fov={50} />
      
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#06b6d4" />
      <Environment preset="city" />

      <group position={[0, -1, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={1024}
            mixBlur={1}
            mixStrength={80}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050505"
            metalness={0.5}
            mirror={0.8}
          />
        </mesh>
        <gridHelper args={[100, 50, "#06b6d4", "#020617"]} position={[0, 0.01, 0]} />
      </group>

      <HolographicCore />

      <EffectComposer enableNormalPass={false}>
        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.4} />
        <Vignette eskil={false} offset={0.3} darkness={0.9} />
      </EffectComposer>
    </>
  );
}

export function Scene() {
  const {theme, performanceMode} = useSystemStore();

  const isRetro = theme === 'retro';

  return (
    <Canvas camera={{ position: [0, 2, 10], fov: 45 }}>

      {/* 2. Dynamic Lighting */}
      <ambientLight intensity={isRetro ? 0.2 : 0.5} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        color={isRetro ? "#00ff00" : "#00ffff"} 
      />

      {/* 3. The Central Asset */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
        <Orb />
      </Float>
    </Canvas>
  );
}