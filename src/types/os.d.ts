export type ProcessID = string;

export interface OSProcess {
  id: ProcessID;
  title: string;
  componentName: string; // The "Feature" to load
  isMaximized: boolean;
  zIndex: number;
}

export interface SystemState {
  isBooted: boolean;
  activeProcessId: ProcessID | null;
  theme: 'dark' | 'light' | 'glass';
  performanceMode: boolean; // Toggle for 3D complexity
}