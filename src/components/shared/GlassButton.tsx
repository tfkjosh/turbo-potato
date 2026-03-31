"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "default" | "active" | "ghost";
  className?: string;
}

export function GlassButton({ 
  children, 
  variant = "default", 
  className, 
  ...props 
}: GlassButtonProps) {
  
  const variants = {
    default: "border-transparent bg-white/5 hover:bg-white/10 text-white/70 hover:text-white hover:border-white/10",
    active: "border-transparent bg-transparent text-white shadow-[0_0_20px_rgba(255,255,255,0.15)]",
    ghost: "border-transparent bg-transparent text-white/40 hover:text-white"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "relative flex items-center justify-center rounded-xl border transition-all duration-300 backdrop-blur-md",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}