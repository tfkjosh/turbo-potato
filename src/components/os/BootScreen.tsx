"use client";

import { useState, useEffect } from "react";
import { useSystemStore } from "@/stores/useSystemStore";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_STEPS = [
  { id: "kernel", text: "INITIALIZING_JOSHUA_OS_KERNEL...", delay: 800 },
  { id: "hardware", text: "SCANNING_RESOURCES... [25+ PROJECTS FOUND]", delay: 1200 },
  { id: "ui", text: "MOUNTING_GLASS_INTERFACE...", delay: 1000 },
  { id: "ready", text: "SYSTEM_READY. WELCOME, OPERATOR.", delay: 500 },
];

export function BootScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const { isBooted, boot } = useSystemStore();

  useEffect(() => {
    if (currentStep < BOOT_STEPS.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, BOOT_STEPS[currentStep].delay);
      return () => clearTimeout(timer);
    } else {
      // Sequence finished, wait a beat then exit
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        // Delay the actual store update to allow exit animation to play
        setTimeout(() => boot(), 1000);
      }, 500);
      return () => clearTimeout(exitTimer);
    }
  }, [currentStep, boot]);

  // If already booted, don't render anything
  if (isBooted) return null;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.1,
            filter: "blur(20px)",
          }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center font-mono overflow-hidden"
        >
          {/* 1. The Visual Core: A pulsing glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.05)_0%,transparent_70%)]" />

          {/* 2. The Text Sequence */}
          <div className="relative flex flex-col gap-2 w-full max-w-md px-10">
            {BOOT_STEPS.slice(0, currentStep + 1).map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`text-[12px] tracking-widest ${
                  i === currentStep ? "text-white" : "text-white/20"
                }`}
              >
                <span className="mr-4">[{i + 1}/4]</span>
                {step.text}
                {i === currentStep && (
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="ml-1 inline-block w-2 h-4 bg-white align-middle"
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* 3. The Bottom Progress Bar */}
          <div className="absolute bottom-20 w-64 h-[2px] bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${(currentStep / BOOT_STEPS.length) * 100}%` }}
              className="h-full bg-white shadow-[0_0_10px_rgba(6,182,212,0.5)]"
            />
          </div>

          {/* 4. Subtle Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}