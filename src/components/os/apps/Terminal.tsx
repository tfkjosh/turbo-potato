"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSystemStore, ProcessID } from "@/stores/useSystemStore";
import { executeCommand, LogEntry } from "@/features/terminal/commands";
import { motion } from "framer-motion";

const TerminalLine = ({ text, type, index }: { text: string; type: string; index: number }) => {
  const isBoot = index < 6;
  
  // Mapping types to CSS Variables
  const getLineColor = () => {
    switch (type) {
      case 'input': return "text-[var(--os-text)]";
      case 'system': return "opacity-40 text-[var(--os-text)]";
      case 'error': return "text-red-400"; // Errors usually stay red for urgency
      case 'success': return "text-[var(--os-accent)]";
      default: return "text-[var(--os-text)]";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: isBoot ? index * 0.1 : 0, duration: 0.2 }}
      className={`${getLineColor()} font-mono text-[13px] py-0.5 break-all`}
    >
      {text}
    </motion.div>
  );
};

export function Terminal() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([
    { text: "JOSHUA_OS_KERNEL_v1.0.42_STABLE", type: "system" },
    { text: "CHECKING_HARDWARE_INTEGRITY... [OK]", type: "success" },
    { text: "MOUNTING_DRIVES... [OK]", type: "success" },
    { text: "WELCOME. TYPE 'HELP' FOR COMMANDS.", type: "system" },
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const store = useSystemStore();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (cmd: string) => {
    if (!cmd.trim()) return;

    const response = executeCommand(cmd, {
      closeWindow: store.closeWindow,
      terminateProcess: store.terminateProcess,
      setPerformanceMode: store.setPerformanceMode,
      setTheme: store.setTheme, // Using the store action directly
      openWindow: store.openWindow
    });

    setLogs(prev => [...prev, { text: `λ ${cmd}`, type: "input" }, ...response.newLogs]);
    
    if (response.action) response.action();
    if (cmd.toLowerCase().trim() === "clear") setLogs([]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full font-mono text-sm leading-relaxed selection:bg-[var(--os-accent)]/30">
      {/* Log Display */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto space-y-0.5 custom-scrollbar pb-4 pr-2"
      >
        {logs.map((log, i) => (
          <TerminalLine 
            key={i} 
            text={log.text} 
            type={log.type} 
            index={i} 
          />
        ))}
      </div>

      {/* Input Line */}
      <div className="flex items-center gap-2 border-t border-white/5 pt-4">
        <span className="text-[var(--os-accent)] animate-pulse font-bold">λ</span>
        <input
          autoFocus
          type="text"
          value={input}
          aria-label="label"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCommand(input)}
          className="flex-1 bg-transparent border-none outline-none text-[var(--os-text)] caret-[var(--os-accent)]"
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  );
}