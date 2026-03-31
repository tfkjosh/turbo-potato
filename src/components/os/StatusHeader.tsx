"use client";

import { FadeIn } from "@/components/shared/MotionWrapper";
import { MotionText } from "@/components/shared/MotionText";
import { useSystemStore } from "@/stores/useSystemStore";
import { useEffect, useState } from "react";

export function StatusHeader() {
  const { isBooted } = useSystemStore();
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isBooted) return null;

  return (
    <div className="fixed top-0 inset-x-0 h-10 z-[50] flex items-center justify-between px-6 border-b border-white/5 bg-black/10 backdrop-blur-md">
      <FadeIn direction="down" delay={0.5} className="flex items-center gap-4">
        <MotionText as="span" className="text-[10px] text-white font-mono tracking-tighter uppercase">
          JK-OS v3.0.1
        </MotionText>
        <div className="w-[1px] h-3 bg-white/10" />
        <MotionText as="span" className="text-[10px] text-white/40 font-mono">
          CPU: OPTIMIZED
        </MotionText>
      </FadeIn>

      <FadeIn direction="down" delay={0.7} className="flex items-center gap-4">
        <MotionText as="span" className="text-[10px] text-white/70 font-mono">
          {time}
        </MotionText>
        <div className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse shadow-[0_0_8px_#22c55e]" />
      </FadeIn>
    </div>
  );
}