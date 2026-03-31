"use client";

import React from "react";
import { motion } from "framer-motion";
import { skills, Skill } from "@/data/skillsData";
import { Activity, Cpu, Layers, Wrench } from "lucide-react";

export function Skills() {
  const categories = {
    Kernel: <Cpu size={14} />,
    Interface: <Layers size={14} />,
    Architecture: <Activity size={14} />,
    Tools: <Wrench size={14} />,
  };

  return (
    <div className="h-full flex flex-col space-y-8 font-mono pb-10">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4 opacity-60">
        <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase">
          <Activity size={16} className="text-[var(--os-accent)]" />
          <span>System_Resource_Monitor // v1.0.2</span>
        </div>
        <div className="text-[10px]">UPTIME: 100%</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        {skills.map((skill, index) => (
          <SkillItem key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
}

function SkillItem({ skill, index }: { skill: Skill; index: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-2">
          <span className="text-[var(--os-accent)] opacity-50 uppercase text-[9px]">
            {skill.category}
          </span>
          <span className="text-xs text-[var(--os-text)] tracking-wider">
            {skill.name}
          </span>
        </div>
        <span className="text-[10px] text-[var(--os-accent)] font-bold">
          {skill.level}%
        </span>
      </div>

      {/* Progress Bar Track */}
      <div className="h-1.5 w-full bg-white/5 border border-white/10 rounded-full overflow-hidden relative">
        {/* Animated Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ 
            duration: 1.5, 
            delay: index * 0.1, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="h-full bg-[var(--os-accent)] relative"
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </motion.div>
      </div>
    </div>
  );
}