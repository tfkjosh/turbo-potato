"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, ShieldCheck, Terminal as TerminalIcon, AlertCircle } from "lucide-react";
import { GlassButton } from "@/components/shared/GlassButton";
import emailjs from "@emailjs/browser";

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent"| "error">("idle");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");

    // Replace these strings with your actual EmailJS IDs or process.env variables
    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, 
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, 
      formRef.current, 
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    )
    .then(() => {
      setStatus("sent");
    })
    .catch((error) => {
      console.error("OS_SYSTEM_ERROR:", error);
      setStatus("error");
    });
  };

  if (status === "sent") {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center space-y-4 font-mono">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="w-16 h-16 rounded-full bg-[var(--os-accent)]/20 flex items-center justify-center border border-[var(--os-accent)]/50 shadow-[0_0_20px_var(--os-accent)]"
        >
          <ShieldCheck className="text-[var(--os-accent)]" size={32} />
        </motion.div>
        <h2 className="text-[var(--os-accent)] text-xl tracking-widest uppercase">Transmission Successful</h2>
        <p className="text-[var(--os-text)]/60 text-xs max-w-xs">Data packet has been encrypted and routed to Joshua's local server.</p>
        <GlassButton onClick={() => setStatus("idle")} className="mt-4">New Message</GlassButton>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col font-mono relative">
      {/* Header Info */}
      <div className="flex items-center gap-3 mb-8 opacity-60">
        <TerminalIcon size={16} className="text-[var(--os-accent)]" />
        <span className="text-[10px] uppercase tracking-[0.3em]">Secure_Channel // v2.0.4</span>
      </div>

      <form ref={formRef} onSubmit={sendEmail} className="flex-1 flex flex-col space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Input */}
          <div className="space-y-2 group">
            <label className="text-[9px] uppercase tracking-widest text-[var(--os-text)]/40 group-focus-within:text-[var(--os-accent)] transition-colors">Identification</label>
            <input 
              name="user_name"  
              required
              type="text"
              placeholder="ENTER_NAME..."
              className="w-full bg-white/5 border-b border-white/10 p-3 outline-none focus:border-[var(--os-accent)] transition-all text-sm text-[var(--os-text)] placeholder:text-[var(--os-text)]/20"
            />
          </div>

          {/* Email Input */}
          <div className="space-y-2 group">
            <label className="text-[9px] uppercase tracking-widest text-[var(--os-text)]/40 group-focus-within:text-[var(--os-accent)] transition-colors">Return_Address</label>
            <input 
              name="user_email"  
              required
              type="email"
              placeholder="EMAIL@DOMAIN.COM"
              className="w-full bg-white/5 border-b border-white/10 p-3 outline-none focus:border-[var(--os-accent)] transition-all text-sm text-[var(--os-text)] placeholder:text-[var(--os-text)]/20"
            />
          </div>
        </div>

        {/* Message Input */}
        <div className="flex-1 flex flex-col space-y-2 group">
          <label className="text-[9px] uppercase tracking-widest text-[var(--os-text)]/40 group-focus-within:text-[var(--os-accent)] transition-colors">Payload_Content</label>
          <textarea 
            name="message"
            required
            placeholder="TYPE_MESSAGE_HERE..."
            className="flex-1 bg-white/5 border border-white/10 p-4 outline-none focus:border-[var(--os-accent)] transition-all text-sm text-[var(--os-text)] placeholder:text-[var(--os-text)]/20 resize-none custom-scrollbar"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex items-center justify-between">
          {status === "error" && (
            <div className="flex items-center gap-2 text-red-400 text-[10px]">
              <AlertCircle size={14} />
              <span>TRANSMISSION_FAILED</span>
            </div>
          )}
           <div className="ml-auto">
            <GlassButton disabled={status === "sending"} className="group px-8 py-3">
              <span className="flex items-center gap-2">
                {status === "sending" ? "ENCRYPTING..." : "SEND_DATA"}
                <Send size={14} className={status === "sending" ? "animate-pulse" : ""} />
              </span>
            </GlassButton>
          </div>
        </div>
      </form>
    </div>
  );
}