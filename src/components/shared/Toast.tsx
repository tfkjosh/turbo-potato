"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { GlassButton } from './GlassButton';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, type, isVisible, onClose }: ToastProps) {
  // Auto-hide after 4 seconds
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          className="fixed top-10 left-0 right-0 z-[100] flex justify-center pointer-events-none"
        >
          <div className={`
            pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-2xl 
            backdrop-blur-xl border shadow-2xl min-w-[300px]
            ${type === 'success' 
              ? 'bg-blue-500/10 border-blue-500/50 text-blue-100' 
              : 'bg-red-500/10 border-red-500/50 text-red-100'
            }
          `}>
            {/* Status Icon */}
            <div className={`w-2 h-2 rounded-full animate-pulse ${type === 'success' ? 'bg-blue-400' : 'bg-red-400'}`} />
            
            <p className="text-sm font-medium tracking-wide italic">
              {message}
            </p>
            
            <GlassButton onClick={onClose} className="ml-auto opacity-50 hover:opacity-100 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </GlassButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}