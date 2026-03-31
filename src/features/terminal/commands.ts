import { ProcessID, OSTheme } from "@/stores/useSystemStore";

export interface LogEntry {
  text: string;
  type: "input" | "system" | "error" | "success";
}

export interface CommandResponse {
  newLogs: LogEntry[];
  action?: () => void;
}

export const executeCommand = (
  cmd: string, 
  actions: {
    closeWindow: (id: ProcessID) => void;
    terminateProcess: () => void;
    setPerformanceMode: (enabled: boolean) => void;
    setTheme: (theme: OSTheme) => void;
    openWindow: (id: ProcessID) => void;
  }
): CommandResponse => {
  const cleanCmd = cmd.toLowerCase().trim();
  const args = cleanCmd.split(" ");
  const baseCmd = args[0];

  switch (baseCmd) {
    case "help":
      return {
        newLogs: [
          { text: "SYSTEM_COMMANDS:", type: "system" },
          { text: "  about     - Developer profile", type: "success" },
          { text: "  projects  - View repositories", type: "success" },
          { text: "  theme [t] - OS skin (glass, retro, minimal)", type: "system" },
          { text: "  clear     - Flush buffer", type: "success" },
          { text: "  exit      - Close terminal", type: "system" },
        ]
      };

    // --- NAVIGATION COMMANDS ---
    case "projects":
    case "about":
    case "skills":
    case "contact":
      return {
        newLogs: [{ text: `OPENING_${baseCmd.toUpperCase()}_MODULE...`, type: "success" }],
        action: () => actions.openWindow(baseCmd as ProcessID)
      };

    // --- HIGH IMPACT 3D & THEME COMMANDS ---
    case "matrix":
      return {
        newLogs: [{ text: "WAKE_UP_NEO... THE_MATRIX_HAS_YOU.", type: "success" }],
        action: () => {
          actions.setTheme('retro');
          actions.setPerformanceMode(false); // Force filters on
        }
      };

    case "theme":
      const targetTheme = args[1] as OSTheme;
      if (['glass', 'retro', 'minimal'].includes(targetTheme)) {
        return {
          newLogs: [{ text: `SWITCHING_TO_${targetTheme.toUpperCase()}_PROTOCOL...`, type: "success" }],
          action: () => {
            actions.setTheme(targetTheme);
            if (targetTheme === 'glass') actions.setPerformanceMode(true);
          }
        };
      }
      return { newLogs: [{ text: "USAGE: theme [glass|retro|minimal]", type: "error" }] };

    case "overclock":
      return {
        newLogs: [{ text: "CORE_TEMP_RISING... MAX_PERFORMANCE_ENABLED.", type: "error" }],
        action: () => actions.setPerformanceMode(true)
      };

    case "destruct":
      return {
        newLogs: [{ text: "SELF_DESTRUCT_INITIATED. GOODBYE.", type: "error" }],
        action: () => {
          setTimeout(() => actions.terminateProcess(), 1000);
        }
      };

    // --- UTILITIES ---
    case "neofetch":
      return {
        newLogs: [
          { text: "OS: Joshua-OS v1.0.42", type: "success" },
          { text: "KERNEL: Next.js 15.0 (React 19)", type: "system" },
          { text: "SHELL: Zsh-Web", type: "system" },
          { text: "UPTIME: " + Math.floor(performance.now() / 1000) + "s", type: "system" },
        ]
      };

    case "ls":
      return { newLogs: [{ text: "drwxr-xr-x  about/  projects/  skills/  contact/", type: "system" }] };

    case "whoami":
      return { newLogs: [{ text: "AUTHORIZED_VISITOR // UID: " + Math.random().toString(16).slice(2, 8), type: "success" }] };

    case "exit":
      return { newLogs: [], action: () => actions.closeWindow("terminal") };

    case "":
      return { newLogs: [] };

    default:
      return { newLogs: [{ text: `COMMAND_NOT_FOUND: ${baseCmd}`, type: "error" }] };
  }
};