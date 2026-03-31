export interface Skill {
  name: string;
  level: number; // 0-100
  category: "Kernel" | "Interface" | "Architecture" | "Tools" | "DevOps";
}

export const skills: Skill[] = [
  { name: "React / Next.js", level: 90, category: "Interface" },
  { name: "Firebase", level: 70, category: "Tools" },
  { name: "Rest APIs", level: 75, category: "Kernel" },
  { name: "TypeScript", level: 95, category: "Interface" },
  { name: "MongoDB", level: 70, category: "Tools" },
  { name: "Netlify", level: 90, category: "DevOps" },
  { name: "Prompt Engineering", level: 75, category: "Architecture" },
  { name: "Three.js / R3F", level: 80, category: "Interface" },
  { name: "Express", level: 80, category: "Kernel" },
  { name: "Tailwind CSS", level: 98, category: "Interface" },
  { name: "Zustand / Redux", level: 80, category: "Kernel" },
  { name: "Framer Motion", level: 82, category: "Interface" },
  { name: "Node.js", level: 85, category: "Kernel" },
  { name: "OpenAI API", level: 70, category: "Architecture" },
  { name: "PostgreSQL", level: 70, category: "Tools" },
  { name: "Vercel", level: 85, category: "DevOps" },
];