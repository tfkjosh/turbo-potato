"use client";

import { projects, Project } from "@/data/projectsData";
import { useSystemStore } from "@/stores/useSystemStore";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export function Projects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-2 pb-20">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {

  const { theme } = useSystemStore();
  const isRetro = theme === "retro";

  const sizeClasses = {
    sm: "col-span-1 row-span-1",
    md: "col-span-1 md:col-span-2 row-span-1",
    lg: "col-span-1 md:col-span-2 row-span-2",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`
        ${sizeClasses[project.size]}
        group relative overflow-hidden border border-white/5 bg-white/5 p-6
        hover:border-[var(--os-accent)]/50 transition-all duration-500
        backdrop-blur-sm flex flex-col justify-between
        ${isRetro ? 'hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]' : 'hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]'}
      `}
    >
        
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 group-hover:text-[var(--os-accent)] transition-opacity">
        <span className="text-[10px] font-mono">{project.category}</span>
      </div>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-4 right-4 flex items-center gap-3 opacity-30 group-hover:opacity-100 transition-opacity"
        >
          <ExternalLink size={14} className="hover:text-[var(--os-accent)] transition-colors" />
        </a>
      )}
      <div>
        <h3 className="text-lg font-bold text-[var(--os-text)] group-hover:text-[var(--os-accent)] transition-colors">
          {project.title}
        </h3>
        <p className="mt-2 text-xs text-[var(--os-text)]/60 leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.slice(0, 3).map((t) => (
          <span key={t} className="text-[9px] uppercase tracking-widest px-2 py-0.5 bg-white/5 border border-white/10 text-[var(--os-text)]/40">
            {t}
          </span>
        ))}
      </div>
      {isRetro && (
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(0,255,0,0.05),rgba(0,255,0,0.02),rgba(0,255,0,0.05))] bg-[length:100%_2px,3px_100%]" />
      )}
    </motion.div>
  );
}