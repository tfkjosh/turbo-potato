"use client";

import React from "react";
import { useSystemStore } from "@/stores/useSystemStore";
import { Monitor, Zap, Palette, VolumeX } from "lucide-react";
import { GlassButton } from "@/components/shared/GlassButton";

export function Settings() {
  const { theme, setTheme, performanceMode, setPerformanceMode } = useSystemStore();

  const themes = [
    { id: 'glass', label: 'Glass_Protocol', desc: 'Standard high-fidelity frosted interface.' },
    { id: 'retro', label: 'Retro_CRT', desc: 'Phosphor green terminal with scanline overlay.' },
    { id: 'minimal', label: 'Zen_Minimal', desc: 'Brutalist high-contrast architectural mode.' }
  ];

  return (
    <div className="h-full flex flex-col space-y-8 font-mono pb-10">
      {/* 1. Theme Selection */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-[var(--os-accent)] opacity-60">
          <Palette size={16} />
          <h3 className="text-[10px] uppercase tracking-[0.2em]">Visual_Protocols</h3>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id as any)}
              className={`
                w-full text-left p-4 border transition-all duration-300
                ${theme === t.id 
                  ? 'border-[var(--os-accent)] bg-[var(--os-accent)]/10' 
                  : 'border-white/5 bg-white/2 hover:bg-white/5'
                }
              `}
            >
              <div className="text-xs font-bold text-[var(--os-text)]">{t.label}</div>
              <div className="text-[9px] text-[var(--os-text)]/40 mt-1">{t.desc}</div>
            </button>
          ))}
        </div>
      </section>

      {/* 2. System Performance */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-[var(--os-accent)] opacity-60">
          <Zap size={16} />
          <h3 className="text-[10px] uppercase tracking-[0.2em]">Hardware_Acceleration</h3>
        </div>
        <div className="flex items-center justify-between p-4 border border-white/5 bg-white/2">
          <div>
            <div className="text-xs text-[var(--os-text)]">Performance_Mode</div>
            <div className="text-[9px] text-[var(--os-text)]/40 mt-1">
              {performanceMode ? "Reduces geometry detail for higher FPS." : "Full detail rendering active."}
            </div>
          </div>
          <GlassButton 
            onClick={() => setPerformanceMode(!performanceMode)}
            variant={performanceMode ? "active" : "default"}
          >
            {performanceMode ? "ENABLED" : "DISABLED"}
          </GlassButton>
        </div>
      </section>

      {/* 3. System Info (Read-Only) */}
      <section className="mt-auto pt-6 border-t border-white/5">
        <div className="flex justify-between text-[8px] text-[var(--os-text)]/30 uppercase tracking-tighter">
          <span>OS_BUILD: v1.0.42_STABLE</span>
          <span>KERNEL_LOG: OK</span>
          <span>LATENCY: 12ms</span>
        </div>
      </section>
    </div>
  );
}