"use client";

import { AnimatePresence, AnimatePresenceProps } from "framer-motion";
import { ReactNode } from "react";

/**
 * Extending AnimatePresenceProps to explicitly include children
 * to resolve the "Property 'children' does not exist" TS error.
 */
interface PresenceProps extends AnimatePresenceProps {
  children: ReactNode;
}

export function Presence({ children, mode = "wait", ...props }: PresenceProps) {
  return (
    <AnimatePresence mode={mode} {...props}>
      {children}
    </AnimatePresence>
  );
}