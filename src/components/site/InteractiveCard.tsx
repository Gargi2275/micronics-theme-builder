import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function InteractiveCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const reduce = useReducedMotion();
  const background = useMotionTemplate`radial-gradient(180px circle at ${x}% ${y}%, var(--spotlight), transparent 70%)`;

  return (
    <motion.div
      ref={ref}
      className={cn("group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow duration-300 hover:shadow-elevated", className)}
      style={{ backgroundImage: background }}
      {...(!reduce ? { whileHover: { y: -8, rotateX: 1.2, rotateY: -1.2 } } : {})}
      onMouseMove={(event) => {
        if (reduce) return;
        const bounds = ref.current?.getBoundingClientRect();
        if (!bounds) return;
        x.set(((event.clientX - bounds.left) / bounds.width) * 100);
        y.set(((event.clientY - bounds.top) / bounds.height) * 100);
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent bg-gradient-card opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
