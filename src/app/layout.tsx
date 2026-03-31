import "./globals.css";
import type { Metadata } from "next";
import type { Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover', // Critical for notched mobile/Mac devices
}

export const metadata: Metadata = {
  title: "Joshua King | Web-OS",
  description: "High-fidelity 3D Operating System Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black antialiased overflow-hidden">
        {/* The Hardware Layer: Always on top */}
        <div className="os-overlay pointer-events-none fixed inset-0 z-[10000]" />
        
        {children}
      </body>
    </html>
  );
}