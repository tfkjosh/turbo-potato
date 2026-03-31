"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface MotionTextProps extends HTMLMotionProps<"p"> {
  children: ReactNode;
  as?: "p" | "h1" | "h2" | "h3" | "span" | "div";
  delay?: number;
}

export function MotionText({ 
  children, 
  as = "p", 
  delay = 0, 
  className, 
  ...props 
}: MotionTextProps) {
  const Component = motion[as as keyof typeof motion] as typeof motion.p;

  return (
    <Component
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ 
        duration: 0.5, 
        delay, 
        ease: [0.33, 1, 0.68, 1] 
      }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}