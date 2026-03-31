"use client";

import React, { createContext, useContext, useState } from 'react';

type BootState = 'bios' | 'loading' | 'desktop';

const SystemContext = createContext<{
  status: BootState;
  setStatus: (s: BootState) => void;
} | null>(null);

export function SystemProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<BootState>('bios');

  return (
    <SystemContext.Provider value={{ status, setStatus }}>
      <div className={status === 'bios' ? 'brightness-50 grayscale' : 'brightness-100 transition-all duration-1000'}>
        {children}
      </div>
    </SystemContext.Provider>
  );
}

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) throw new Error("useSystem must be used within SystemProvider");
  return context;
};