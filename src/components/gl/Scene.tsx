"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Orb } from "./Orb";
import { 
  PerspectiveCamera, 
  MeshReflectorMaterial, 
  Float,
  Environment,
  ContactShadows,
  Grid // Swapping gridHelper for the superior Drei Grid
} from "@react-three/drei";
import { useRef, useMemo } from "react";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import { useSystemStore } from "@/stores/useSystemStore";

function SceneContent() {
  const { theme, performanceMode, openWindows } = useSystemStore();
  const isWorkspaceActive = openWindows.length > 0;
  const isRetro = theme === 'retro';
  const isMinimal = theme === 'minimal';
  
  const focusOffset = useRef(new THREE.Vector3(0, 3, 12));

  const eerieColors = useMemo(() => ({
    bg: isRetro ? "#01120a" : (isMinimal ? "#000000" : "#010409"),
    accent: isRetro ? "#15803d" : (isMinimal ? "#ffffff" : "#0891b2"),
    fogDensity: isMinimal ? 0.08 : 0.05, // Thicker fog for a claustrophobic feel
  }), [isRetro, isMinimal]);

  const lightRef = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
    if (!lightRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // 1. Eerie Flicker: Subtle oscillation of light to feel "unstable"
    lightRef.current.intensity = THREE.MathUtils.lerp(
      lightRef.current.intensity, 
      (isRetro ? 8 : 4) + Math.sin(t * 2) * 0.5, 
      0.1
    );
  });

  useFrame((state) => {
    const targetY = isWorkspaceActive ? 1.5 : 3;
    const targetZ = isWorkspaceActive ? 8 : 12;

    focusOffset.current.y = THREE.MathUtils.lerp(focusOffset.current.y, targetY, 0.04);
    focusOffset.current.z = THREE.MathUtils.lerp(focusOffset.current.z, targetZ, 0.04);

    const parallaxX = state.mouse.x * 1.2;
    const parallaxY = state.mouse.y * 0.4;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, parallaxX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, focusOffset.current.y + parallaxY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, focusOffset.current.z, 0.05);

    state.camera.lookAt(0, 1, 0);
  });

  // Dynamic colors for the grid based on theme
  const gridConfig = {
    cellSize: 0.5,
    cellThickness: 0.5,
    cellColor: isRetro ? "#22c55e" : (isMinimal ? "#444444" : "#06b6d4"),
    sectionSize: 2.5,
    sectionThickness: 1,
    sectionColor: isRetro ? "#16a34a" : (isMinimal ? "#888888" : "#0891b2"),
    fadeDistance: 25,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true
  };
  
  return (
    <>
      <color attach="background" args={[eerieColors.bg]} />
      <fogExp2 attach="fog" args={[eerieColors.bg, eerieColors.fogDensity]} />

      <PerspectiveCamera makeDefault fov={50} />
      
      <ambientLight intensity={isRetro ? 0.2 : 0.4} />
      <spotLight 
        ref={lightRef}
        position={[0, 8, 2]} 
        angle={0.3} 
        penumbra={1} 
        color={eerieColors.accent} 
      />
      
      <Environment preset="night" />

      {/* Reflector Floor */}
      {/* 3. The "Rich" Floor System */}
      <group position={[0, -2.5, 0]}>
        {/* Reflection Plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <MeshReflectorMaterial
            blur={[400, 100]}
            resolution={performanceMode ? 256 : 1024}
            mixBlur={1}
            mixStrength={80}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#080808"
            metalness={0.7}
            mirror={0.9}
          />
        </mesh>

        {/* Multi-Layered Grid Shader */}
        <Grid 
          position={[0, 0.01, 0]} 
          args={[100, 100]}
          cellSize={0.5}              // Minor lines
          cellThickness={0.8}
          cellColor={eerieColors.accent}
          sectionSize={2.5}            // Major structural lines
          sectionThickness={1.5}
          sectionColor={eerieColors.accent}
          fadeDistance={30}            // How far out the grid renders
          fadeStrength={1.5}
          infiniteGrid
        />
      </group>

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
        <Orb />
      </Float>

      <ContactShadows
        position={[0, -2.48, 0]}
        opacity={0.6}
        scale={20}
        blur={3}
        far={4.5}
        color={isRetro ? "#22c55e" : (isMinimal ? "#000000" : "#06b6d4")}
      />

      {!performanceMode && (
        <EffectComposer enableNormalPass={false}>
          <Bloom 
            luminanceThreshold={1} 
            mipmapBlur 
            intensity={isRetro ? 2.0 : 1.2} 
            radius={0.4} 
          />
          <Noise opacity={0.05} />
          <Vignette offset={0.3} darkness={0.9} />
        </EffectComposer>
      )}
    </>
  );
}

export function Scene() {
  return (
    <Canvas 
      dpr={[1, 2]} 
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 2, 10], fov: 45 }}
    >
      <SceneContent />
    </Canvas>
  );
}