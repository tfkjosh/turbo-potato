"use client";

import { useCallback } from "react";

export function useSystemSound() {
  const playSound = useCallback((type: "click" | "boot" | "open" | "close") => {
    // Logic for triggering audio assets or oscillators
    // Example: Click should be a high-pass 1500Hz beep for 0.05s
    console.log(`[OS-Kernel] Audio Trigger: ${type}`);
  }, []);

  return { playSound };
}