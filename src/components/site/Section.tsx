import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Section({ children, className, eyebrow, title, intro, dark = false }: { children: React.ReactNode; className?: string; eyebrow?: string; title?: string; intro?: string; dark?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <section className={cn("relative overflow-hidden py-20 sm:py-24", dark ? "bg-navy-section text-primary-foreground" : "bg-background text-foreground", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(eyebrow || title || intro) && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            {eyebrow && <p className="mb-3 text-sm font-bold uppercase tracking-widest text-accent">{eyebrow}</p>}
            {title && <h2 className="font-display text-3xl font-extrabold tracking-normal text-current sm:text-5xl">{title}</h2>}
            {intro && <p className={cn("mt-5 text-base leading-8", dark ? "text-primary-foreground/80" : "text-muted-foreground")}>{intro}</p>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
