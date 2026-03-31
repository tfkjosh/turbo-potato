// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 1. React Compiler is now a top-level first-class citizen */
  reactCompiler: true,

  /* 2. Experimental remains for features still in the 'lab' */
  experimental: {
    // optimizePackageImports remains here for now
    optimizePackageImports: ["gsap", "lucide-react", "three", "@react-three/fiber"],
  },

  /* 3. Keep the rest of your system-level overrides */
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  transpilePackages: ["three"],
};

export default nextConfig;