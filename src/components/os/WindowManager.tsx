"use client";

import { useSystemStore } from "@/stores/useSystemStore";
import { WindowFrame } from "./WindowFrame";
import { Presence } from "../shared/Presence";
import { Terminal } from "./apps/Terminal";
import { Projects } from "./apps/Projects";
import { Contact } from "./apps/Contact";
import { Skills } from "./apps/Skills";
import { About } from "./apps/About";

// Placeholder content components
const WindowContentMap: Record<string, React.ReactNode> = {
  terminal: <Terminal />,
  about: <About />,
  projects: <Projects />,
  skills: <Skills />,
  contact: <Contact />,
  settings: <div className="text-white/80">Adjusting system parameters...</div>,
};

export function WindowManager() {
  const { openWindows } = useSystemStore();

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {/* We keep the container as pointer-events-none. 
          The WindowFrame itself will have pointer-events-auto 
          so you can still click 'through' the gaps to the 3D scene.
      */}
      <Presence mode="popLayout">
        {openWindows
          .filter((win) => !win.isMinimized) // The "Magic" line for minimizing
          .map((win) => (
            <WindowFrame 
              key={win.id} 
              id={win.id} 
              title={win.id === 'terminal' ? 'System Terminal' : win.id}
            >
              {WindowContentMap[win.id] || (
                <div className="text-white/20 italic text-xs">
                  Process {win.id} content uninitialized...
                </div>
              )}
            </WindowFrame>
          ))}
      </Presence>
    </div>
  );
}