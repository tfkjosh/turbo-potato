"use client";

import { useSystemStore } from "@/stores/useSystemStore";

export function SystemFilters() {
  const { performanceMode, theme } = useSystemStore();

  const isRetro = theme === 'retro';
  const isMinimal = theme === 'minimal';

  // If minimal, we skip most heavy visual processing for a "Zen" look
  if (isMinimal) {
    return (
      <div 
        className="pointer-events-none fixed inset-0 os-overlay" 
        aria-hidden="true" 
      />
    );
  }

  return (
    <>
      {/* 1. Hardware Grain (Texture) - Disabled in Minimal */}
      <div 
        className="pointer-events-none fixed inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" 
        aria-hidden="true"
      />

      {/* 2. Dynamic CRT Scanlines & Glitch Overlay */}
      {(!performanceMode || isRetro) && (
        <div 
          className={`
            pointer-events-none fixed inset-0
            ${isRetro 
              ? "" 
              : ""
            }
          `}
          aria-hidden="true"
        />
      )}

      {/* 3. Screen Vignette (Tube Depth) */}
      <div 
        className={`
          pointer-events-none fixed inset-0 transition-shadow duration-700
          ${isRetro 
            ? "" 
            : ""
          }
        `}
        aria-hidden="true"
      />

      {/* 4. Terminal Matrix Glow (Only for Retro) */}
      {isRetro && (
        <div className="pointer-events-none fixed inset-0" />
      )}

      {/* 5. Legacy Hardware Layer */}
      <div className="os-overlay pointer-events-none fixed inset-0" />
    </>
  );
}