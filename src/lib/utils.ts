import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Standardizes Tailwind class merging to prevent "Ghost Styles."
 * Essential for complex Web-OS window layering.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}