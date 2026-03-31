"use client";

import { motion, HTMLMotionProps, Variants } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
}

const fadeInVariants: Variants = {
  hidden: (direction: string) => ({
    opacity: 0,
    y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
    x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
  },
};

export function FadeIn({
  children,
  delay = 0,
  duration = 0.8,
  direction = "none",
  ...props
}: FadeInProps) {
  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      custom={direction}
      transition={{
        delay,
        duration,
        ease: [0.21, 0.47, 0.32, 0.98], // Expert "Apple-style" ease-out
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}