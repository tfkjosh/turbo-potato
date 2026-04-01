export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  github?: string;
  size: "sm" | "md" | "lg"; // sm: 1x1, md: 2x1, lg: 2x2
  category: "3D" | "Frontend" | "System" | "Creative";
}

export const projects: Project[] = [
  {
    id: "aether-os",
    title: "AetherOS",
    description: "A high-fidelity web-based operating system built with Three.js and React. Features a functional terminal and window manager.",
    tech: ["Three.js", "Zustand", "Framer Motion"],
    size: "lg",
    category: "Frontend",
    link: "https://github.com/tfkjosh/turbo-potato"
  },
  {
    id: "3d-portfolio",
    title: "Creative Portfolio v3",
    description: "Pixel-perfect 3D environment with interactive camera transitions and glassmorphic UI.",
    tech: ["Next.js", "GSAP", "React Three Fiber"],
    size: "md",
    category: "3D",
    link: "https://github.com/tfkjosh/scaling-fortnight"
  },
  {
    id: "Rhetoric",
    title: "Rhetoric",
    description: "A modern ecommerce platform with a focus on performance and user experience.",
    tech: ["TypeScript", "Tailwind", "Shopify", "Next.js"],
    size: "sm",
    category: "Creative",
    link: "https://github.com/tfkjosh/sturdy-fishstick"
  },
  {
    id: "Blogspace",
    title: "Blogspace",
    description: "A modern blog platform with a focus on performance and user experience.",
    tech: ["MongoDB", "Firebase", "MERN", "React"],
    size: "md",
    category: "System",
    link: "https://github.com/tfkjosh/expert-winner"
  },
];