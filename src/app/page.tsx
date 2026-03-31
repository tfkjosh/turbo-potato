import { Scene } from "@/components/gl/Scene";
import { BootScreen } from "@/components/os/BootScreen";
import { DesktopManager } from "@/components/os/DesktopManager";
import { WindowManager } from "@/components/os/WindowManager";
import { Dock } from "@/components/os/Dock";
import { StatusHeader } from "@/components/os/StatusHeader";
import { SystemFilters } from "@/components/os/SystemFilters";

export default function Home() {
  return (
    <DesktopManager>
      {/* Visual Post-Processing Stack */}
      <SystemFilters />

      {/* Boot sequence handles its own Z-index to cover everything */}
      <BootScreen />
      
      {/* UI Layer: Static elements fixed to the glass */}
      <div className="relative z-[100] h-full w-full pointer-events-none">
        <StatusHeader />
        <Dock />
      </div>

      {/* Interactive Layer: Draggable Windows */}
      <WindowManager />

      {/* Background Layer: 3D Environment */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>
    </DesktopManager>
  );
}