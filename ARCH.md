# Web-OS Architectural Contract (v1.0)

## 1. State Sovereignty
- **Global SoT:** Zustand (System, VFS, Windows).
- **Transient State:** Local `useState` for micro-interactions only.
- **Persistence:** All VFS changes must sync to IndexedDB via the `useFileStore` middleware.

## 2. Rendering Strategy
- **Background Layer:** Permanent R3F Canvas (Persistent across route changes).
- **Foreground Layer:** Framer Motion / DOM Windows (Mount/Unmount via Process Manager).
- **Performance:** Target 60fps. If FPS < 50, offload non-UI logic to a Web Worker.

## 3. Communication (IPC)
- Apps communicate via `window.dispatchEvent` using a custom `OS_EVENT` bus.
- No direct prop-drilling between sibling Windows.