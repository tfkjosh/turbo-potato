"use client";

export function DesktopManager({ children }: { children: React.ReactNode }) {
  return (
    <main 
      onContextMenu={(e) => e.preventDefault()} 
      className="relative h-screen w-full bg-black overflow-hidden"
    >
      {children}
    </main>
  );
}