"use client";

import { useSystemStore, ProcessID } from "@/stores/useSystemStore";
import { X, Minus } from "lucide-react";
import { GlassButton } from "../shared/GlassButton";
import { FadeIn } from "../shared/MotionWrapper";

interface WindowFrameProps {
  id: ProcessID;
  title: string;
  children: React.ReactNode;
}

export function WindowFrame({ id, title, children }: WindowFrameProps) {
  const { 
    activeProcessId, 
    closeWindow, 
    minimizeWindow, 
    focusWindow, 
    openWindows,
    theme // Pulling theme from store
  } = useSystemStore();
  
  const windowState = openWindows.find(w => w.id === id);
  const isFocused = activeProcessId === id;

  if (!windowState) return null;

  const isRetro = theme === 'retro';
  const isMinimal = theme === 'minimal';

  // 1. Dynamic Theme Logic
  const getThemeContainerStyles = () => {
    if (isRetro) {
      return isFocused 
        ? "border-green-500 bg-black shadow-[0_0_20px_rgba(34,197,94,0.3)]" 
        : "border-green-900 bg-black opacity-80";
    }
    if (isMinimal) {
      return "border-white/10 bg-[#0a0a0a] rounded-none shadow-none"; // Brutalist / Sharp
    }
    // Default: Glass
    return isFocused 
      ? "border-cyan-500/40 bg-black/60 backdrop-blur-3xl shadow-cyan-500/10 ring-1 ring-cyan-500/20" 
      : "border-white/10 bg-black/40 backdrop-blur-xl opacity-80";
  };

  const getAccentColor = () => {
    if (isRetro) return "text-white";
    return "text-cyan-400";
  };

  return (
    <FadeIn
      drag
      dragMomentum={false}
      onPointerDown={() => focusWindow(id)}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ zIndex: windowState.zIndex }}
      className={`
        fixed pointer-events-auto top-[15%] left-[20%] w-[90%] max-w-[700px] h-[500px] 
        border flex flex-col overflow-hidden shadow-2xl transition-all duration-500
        ${!isMinimal && "rounded-xl"} 
        ${getThemeContainerStyles()}
      `}
    >
      {/* Title Bar */}
      <div className={`
        h-10 flex items-center justify-between px-4 select-none cursor-grab active:cursor-grabbing
        ${isRetro ? "bg-green-500/10 border-b border-green-500/30" : "bg-white/5 border-b border-white/5"}
      `}>
        <div className="flex items-center gap-2">
          {/* Status LED */}
          <div className={`w-1.5 h-1.5 rounded-full ${
            isFocused 
              ? (isRetro ? 'bg-green-500 animate-pulse' : 'bg-cyan-500 animate-pulse') 
              : 'bg-white/10'
          }`} />
          <span className={`text-[10px] font-mono uppercase tracking-[0.2em] ${isRetro ? 'text-white' : 'text-white/50'}`}>
            {title}
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <GlassButton 
            variant="ghost" 
            className={`p-1.5 border-none hover:${getAccentColor()}`}
            onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
          >
            <Minus size={14} />
          </GlassButton>

          <GlassButton 
            variant="ghost" 
            className="p-1.5 border-none hover:text-red-400" 
            onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
          >
            <X size={14} />
          </GlassButton>
        </div>
      </div>

      {/* Internal Content Area */}
      <div className={`
        flex-1 p-6 overflow-auto custom-scrollbar font-mono
        ${isRetro ? 'text-white' : 'text-white/90'}
      `}>
        {children}
      </div>

      {/* Resize Handle Visual */}
      {!isMinimal && (
        <div className={`absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 rounded-br-sm ${
          isRetro ? 'border-green-500/30' : 'border-white/10'
        }`} />
      )}
    </FadeIn>
  );
}