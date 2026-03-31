"use client";

import { create } from 'zustand';

export type ProcessID = 'terminal' | 'about' | 'projects' | 'skills' | 'contact' | 'settings';
export type OSTheme = 'glass' | 'retro' | 'minimal';

export interface WindowState {
  id: ProcessID;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface SystemState {
  isBooted: boolean;
  activeProcessId: ProcessID | null;
  theme: OSTheme;
  performanceMode: boolean;
  openWindows: WindowState[];
  lastZIndex: number;
}

interface SystemActions {
  boot: () => void;
  setPerformanceMode: (enabled: boolean) => void;
  setTheme: (theme: OSTheme) => void; // Added for protocol switching
  openWindow: (id: ProcessID) => void;
  closeWindow: (id: ProcessID) => void;
  minimizeWindow: (id: ProcessID) => void;
  focusWindow: (id: ProcessID) => void;
  terminateProcess: () => void;
}

export const useSystemStore = create<SystemState & SystemActions>((set) => ({
  isBooted: false,
  activeProcessId: null,
  theme: 'glass',
  performanceMode: true,
  openWindows: [],
  lastZIndex: 10,

  boot: () => set({ isBooted: true }),
  setPerformanceMode: (enabled) => set({ performanceMode: enabled }),
  setTheme: (theme) => set({ theme }),

  terminateProcess: () => set({ 
    activeProcessId: null, 
    openWindows: [], 
    theme: 'glass' // Reset to default on crash/restart
  }),

  openWindow: (id) => set((state) => {
    const exists = state.openWindows.find(w => w.id === id);
    const newZ = state.lastZIndex + 1;
    
    if (exists) {
      return {
        activeProcessId: id,
        lastZIndex: newZ,
        openWindows: state.openWindows.map(w => 
          w.id === id ? { ...w, isMinimized: false, zIndex: newZ } : w
        )
      };
    }

    const newWindow: WindowState = {
      id,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: newZ
    };

    return {
      activeProcessId: id,
      openWindows: [...state.openWindows, newWindow],
      lastZIndex: newZ
    };
  }),

  closeWindow: (id) => set((state) => {
    const remaining = state.openWindows.filter(w => w.id !== id);
    // Logic: Focus the next window in the stack if the closed one was active
    const nextActive = remaining.length > 0 
      ? [...remaining].sort((a, b) => b.zIndex - a.zIndex)[0].id 
      : null;

    return {
      openWindows: remaining,
      activeProcessId: state.activeProcessId === id ? nextActive : state.activeProcessId
    };
  }),

  minimizeWindow: (id) => set((state) => {
    const remainingVisible = state.openWindows.filter(w => w.id !== id && !w.isMinimized);
    const nextActive = remainingVisible.length > 0 
      ? [...remainingVisible].sort((a, b) => b.zIndex - a.zIndex)[0].id 
      : null;

    return {
      activeProcessId: state.activeProcessId === id ? nextActive : state.activeProcessId,
      openWindows: state.openWindows.map(w => 
        w.id === id ? { ...w, isMinimized: true } : w
      )
    };
  }),

  focusWindow: (id) => set((state) => {
    if (state.activeProcessId === id) return state;
    
    const newZ = state.lastZIndex + 1;
    return {
      activeProcessId: id,
      lastZIndex: newZ,
      openWindows: state.openWindows.map(w => 
        w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w
      )
    };
  }),
}));