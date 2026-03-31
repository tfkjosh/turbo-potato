"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Fingerprint, MapPin, Zap } from "lucide-react";

export function About() {
  return (
    <div className="h-full flex flex-col md:flex-row gap-8 font-mono overflow-y-auto custom-scrollbar pb-10">
      {/* 1. Identity Sidebar */}
      <div className="w-full md:w-1/3 space-y-6">
        <div className="relative aspect-square border border-[var(--os-accent)]/30 bg-[var(--os-accent)]/5 overflow-hidden group">
          {/* Scanline Overlay for Retro Mode */}
          <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,255,255,0),rgba(255,255,255,0.02))] bg-[length:100%_2px,3px_100%]" />
          
          {/* Avatar Placeholder */}
         <div className="aspect-square bg-white/5 border border-[var(--os-accent)]/30 relative overflow-hidden group">
           {/* Placeholder for your actual image */}
           <img
             src="/profile.jpg"
             alt="User Profile"
             className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
           </img>
           <div className="absolute inset-0 bg-[var(--os-accent)]/10 mix-blend-color" />
           <div className="absolute inset-0 flex items-center justify-center text-[var(--os-accent)] opacity-20 group-hover:opacity-100 transition-opacity">
              [USER_IMAGE_REDACTED]
           </div>
        </div>
          
          {/* Metadata Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 backdrop-blur-md border-t border-white/5 text-[8px] uppercase tracking-tighter flex justify-between">
            <span>ID: JK_001_AETHER</span>
            <span>AUTH: VERIFIED</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] text-[var(--os-text)]/40 italic">
            <MapPin size={12} className="text-[var(--os-accent)]" />
            <span>LOC: EARTH_SECTOR_GRID</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-[var(--os-text)]/40 italic">
            <Shield size={12} className="text-[var(--os-accent)]" />
            <span>CLEARANCE: LEVEL_7_DEV</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-[var(--os-text)]/40 italic">
            <Zap size={12} className="text-[var(--os-accent)]" />
            <span>STATUS: SYSTEM_ACTIVE</span>
          </div>
        </div>
      </div>

      {/* 2. Biography & Mission */}
      <div className="flex-1 space-y-6">
        <header>
          <h2 className="text-2xl font-bold text-[var(--os-accent)] tracking-[0.2em] uppercase">Joshua King</h2>
          <p className="text-[10px] text-[var(--os-text)]/40 tracking-[0.4em] uppercase mt-1">Creative Frontend Engineer // UI Architect</p>
        </header>

        <section className="space-y-4">
          <div className="p-4 bg-white/5 border-l-2 border-[var(--os-accent)] text-xs leading-relaxed text-[var(--os-text)]/80">
            Specializing in high-fidelity interfaces and 3D web experiences. With 3+ years of professional experience, I bridge the gap between creative design and complex system architecture.
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 border border-white/5 bg-white/2 space-y-1">
              <span className="text-[8px] text-[var(--os-accent)] uppercase">Specialization</span>
              <p className="text-[10px] text-[var(--os-text)]">UI/UX</p>
            </div>
            <div className="p-3 border border-white/5 bg-white/2 space-y-1">
              <span className="text-[8px] text-[var(--os-accent)] uppercase">Core Tech</span>
              <p className="text-[10px] text-[var(--os-text)]">Next.js / Three.js</p>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h3 className="text-[10px] text-[var(--os-accent)] uppercase tracking-widest">Philosophy_Log</h3>
          <p className="text-[11px] leading-relaxed text-[var(--os-text)]/60 italic">
            "Mastering architectural thinking and prompt engineering to design systems that transcend traditional web boundaries. Precision is not an option; it is the protocol."
          </p>
        </section>
      </div>
    </div>
  );
}