"use client";

import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, ShieldCheck, Terminal as TerminalIcon, AlertCircle } from "lucide-react";
import { GlassButton } from "@/components/shared/GlassButton";
import Toast from "@/components/shared/Toast";
import emailjs from "@emailjs/browser";

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [toast, setToast] = useState({ 
    show: false, 
    message: '', 
    type: 'success' as 'success' | 'error' 
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  // 1. Create a clean data object
  // Double-check: are these keys EXACTLY what you typed in the {{}} on EmailJS?
  const templateParams = {
    name: formState.name,    
    email: formState.email,  
    message: formState.message,
    to_name: "Joshua King",  // Only include if {{to_name}} is in your template
  };

  try {
    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      templateParams, // Pass the clean object here
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    console.log("SUCCESS!", response.status, response.text);
    setLoading(false);
    setIsSubmitted(true);
    showToast("Data packet encrypted and sent!", "success");
  } catch (error: any) {
    // 2. Log the ACTUAL error message from EmailJS
    console.error("FAILED...", error);
    setLoading(false);
    // This will tell you if it's "User ID is required" or "Template not found"
    showToast(error?.text || "Transmission failed.", "error");
  }
};

  return (
    <div className="h-full flex flex-col font-mono relative p-4">
      <Toast 
        isVisible={toast.show} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ ...toast, show: false })} 
      />

      {/* Header Info */}
      <div className="flex items-center gap-3 mb-8 opacity-60">
        <TerminalIcon size={16} className="text-[var(--os-accent)]" />
        <span className="text-[10px] uppercase tracking-[0.3em]">Secure_Channel // v2.0.4</span>
      </div>

      <AnimatePresence mode="wait">
        {isSubmitted ? (
          /* SUCCESS VIEW */
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex-1 flex flex-col items-center justify-center text-center space-y-4"
          >
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              className="w-16 h-16 rounded-full bg-[var(--os-accent)]/20 flex items-center justify-center border border-[var(--os-accent)]/50 shadow-[0_0_20px_var(--os-accent)]"
            >
              <ShieldCheck className="text-[var(--os-accent)]" size={32} />
            </motion.div>
            <h2 className="text-[var(--os-accent)] text-xl tracking-widest uppercase">Transmission Successful</h2>
            <p className="text-[var(--os-text)]/60 text-xs max-w-xs">Data packet has been encrypted and routed to Joshua's local server.</p>
            <GlassButton onClick={() => setIsSubmitted(false)} className="mt-4">New Message</GlassButton>
          </motion.div>
        ) : (
          /* FORM VIEW */
          <motion.form 
            key="contact-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }} 
            onSubmit={handleSubmit}
            ref={formRef}
            className="flex-1 flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className="text-[9px] uppercase tracking-widest text-[var(--os-text)]/40 group-focus-within:text-[var(--os-accent)] transition-colors">Identification</label>
                <input 
                  value={formState.name}
                  name="name" 
                  onChange={handleChange} 
                  required
                  type="text"
                  placeholder="ENTER_NAME..."
                  className="w-full bg-white/5 border-b border-white/10 p-3 outline-none focus:border-[var(--os-accent)] transition-all text-sm text-[var(--os-text)] placeholder:text-[var(--os-text)]/20"
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-[9px] uppercase tracking-widest text-[var(--os-text)]/40 group-focus-within:text-[var(--os-accent)] transition-colors">Return_Address</label>
                <input 
                  value={formState.email}
                  onChange={handleChange}
                  name="email"  
                  required
                  type="email"
                  placeholder="EMAIL@DOMAIN.COM"
                  className="w-full bg-white/5 border-b border-white/10 p-3 outline-none focus:border-[var(--os-accent)] transition-all text-sm text-[var(--os-text)] placeholder:text-[var(--os-text)]/20"
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col space-y-2 group">
              <label className="text-[9px] uppercase tracking-widest text-[var(--os-text)]/40 group-focus-within:text-[var(--os-accent)] transition-colors">Payload_Content</label>
              <textarea 
                rows={4}
                value={formState.message}
                onChange={handleChange}
                name="message"
                required
                placeholder="TYPE_MESSAGE_HERE..."
                className="flex-1 bg-white/5 border border-white/10 p-4 outline-none focus:border-[var(--os-accent)] transition-all text-sm text-[var(--os-text)] placeholder:text-[var(--os-text)]/20 resize-none custom-scrollbar"
              />
            </div>

            <div className="pt-4 flex items-center justify-end">
              <GlassButton type="submit" className="group px-8 py-3" disabled={loading}>
                {loading ? 'SENDING...' : 'DISPATCH'}
              </GlassButton>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}