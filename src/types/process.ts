export type ProcessStatus = 'startup' | 'running' | 'minimized' | 'maximized' | 'error';

export interface ProcessMetadata {
  id: string;          // e.g., "terminal-001"
  title: string;       // e.g., "zsh"
  icon: string;        // Lucide icon name
  component: string;   // The key used to lazy-load the feature
}

export interface ProcessState extends ProcessMetadata {
  status: ProcessStatus;
  zIndex: number;
  lastActive: number; // Timestamp for LRU (Least Recently Used) focus logic
}