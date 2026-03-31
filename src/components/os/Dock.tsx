"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/shared/MotionWrapper";
import { useSystemStore, ProcessID } from "@/stores/useSystemStore";
import { GlassButton } from "@/components/shared/GlassButton";
import { 
  Terminal, 
  User, 
  FolderLock, 
  Cpu, 
  Mail,
  Settings
} from "lucide-react";

interface DockItem {
  id: ProcessID;
  icon: any;
  label: string;
}

const DOCK_ITEMS: DockItem[] = [
  { id: "terminal", icon: Terminal, label: "Terminal" },
  { id: "about", icon: User, label: "About" },
  { id: "projects", icon: FolderLock, label: "Projects" },
  { id: "skills", icon: Cpu, label: "Systems" },
  { id: "contact", icon: Mail, label: "Contact" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export function Dock() {
  const { isBooted } = useSystemStore();

  if (!isBooted) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]">
      <FadeIn direction="up" delay={1.2} duration={0.8}>
        <nav className="pointer-events-auto flex items-center gap-1 md:gap-6 px-3 md:px-4 py-2 md:py-3 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.6)]">
          {DOCK_ITEMS.map((item) => (
            <DockIcon key={item.id} {...item} />
          ))}
        </nav>
      </FadeIn>
    </div>
  );
}

function DockIcon({ id, icon: Icon, label }: DockItem) {
  const { activeProcessId, openWindow, openWindows } = useSystemStore();
  
  const isFocused = activeProcessId === id;
  const isOpen = openWindows.some(win => win.id === id);

  return (
    <div className="relative group">
      <GlassButton
        variant={isFocused ? "active" : "default"}
        onClick={() => openWindow(id)}
        className="p-2 md:p-3"
      >
        <Icon 
          size={20} 
          className={`transition-colors duration-300 ${isFocused ? 'text-white' : 'text-white/70'}`} 
        />
      </GlassButton>
      
      {/* Tooltip: Logic handles both Mobile Focus and Desktop Hover */}
      <span className={`
        absolute left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/90 border border-white/10 
        text-[7px] md:text-[9px] text-white whitespace-nowrap tracking-[0.2em] uppercase shadow-xl
        transition-all duration-300 pointer-events-none
        ${isFocused 
          ? 'opacity-100 -top-10 md:-top-14' 
          : 'opacity-0 group-hover:opacity-100 -top-10 group-hover:-top-14'
        }
      `}>
        {label}
      </span>
      
      {/* Running Indicator (Background Process) */}
      {isOpen && !isFocused && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/40 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.15)]" />
      )}

      {/* Active Indicator (Focused Process) */}
      {isFocused && (
        <motion.div 
          layoutId="dock-active"
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.15)]"
        />
      )}

      {/* Hover Reflection: Only visible when app is totally closed */}
      {!isFocused && !isOpen && (
        <div className="hidden md:block absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-transparent group-hover:bg-white shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all" />
      )}
    </div>
  );
}