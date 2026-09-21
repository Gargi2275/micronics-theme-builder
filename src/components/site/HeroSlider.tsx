import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppData } from "@/lib/useAppData";
import { listPublished } from "@/services/content";
import { BrandMark } from "@/components/site/Logo";

const ShieldScene = lazy(() => import("@/components/site/ShieldScene"));

export function HeroSlider() {
  const data = useAppData();
  const slides = useMemo(() => listPublished(data.heroSlides).filter((slide) => slide.active), [data.heroSlides]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const current = slides[active] ?? slides[0];

  useEffect(() => {
    if (paused || reduce || slides.length < 2) return undefined;
    const id = window.setInterval(() => setActive((index) => (index + 1) % slides.length), 6000);
    return () => window.clearInterval(id);
  }, [paused, reduce, slides.length]);

  if (!current) return null;

  const next = () => setActive((index) => (index + 1) % slides.length);
  const prev = () => setActive((index) => (index - 1 + slides.length) % slides.length);
  const finishDrag = (clientX: number) => {
    if (dragStart === null) return;
    const diff = dragStart - clientX;
    if (Math.abs(diff) > 48) diff > 0 ? next() : prev();
    setDragStart(null);
  };

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-hero text-hero-foreground"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onMouseDown={(event) => setDragStart(event.clientX)}
      onMouseUp={(event) => finishDrag(event.clientX)}
      onTouchStart={(event) => setDragStart(event.touches[0]?.clientX ?? null)}
      onTouchEnd={(event) => finishDrag(event.changedTouches[0]?.clientX ?? 0)}
    >
      <link rel="preload" as="image" href={slides[0]?.image} />
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={current.id}
            src={current.image}
            alt={current.alt}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: reduce ? 1 : 1.08 }}
            animate={{ opacity: 1, scale: reduce ? 1 : 1.17, x: reduce ? 0 : -18 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.1 }, scale: { duration: 7, ease: "linear" }, x: { duration: 7, ease: "linear" } }}
            loading={active === 0 ? "eager" : "lazy"}
            sizes="100vw"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute inset-0 bg-perspective-grid opacity-35" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-glow blur-3xl" />
      </div>
      <FloatingDecor />
      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl items-center gap-10 px-4 pb-28 pt-28 sm:px-6 lg:grid-cols-[1.04fr_.96fr] lg:px-8">
        <div className="max-w-4xl">
          <motion.div key={`trust-${current.id}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-hero-border bg-hero-glass px-4 py-2 text-sm font-bold text-hero-foreground shadow-glow backdrop-blur-md">
            <CheckCircle2 className="size-4 text-accent" /> Trusted by 500+ businesses
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div key={current.id} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.55 }}>
              <h1 className="font-display text-5xl font-black leading-[1.02] tracking-normal text-hero-foreground sm:text-7xl lg:text-8xl">
                {current.headline.split(" ").map((word, index) => (
                  <motion.span key={`${word}-${index}`} className={word.toLowerCase().includes(current.keyword.toLowerCase()) ? "gradient-text inline-block" : "inline-block"} initial={reduce ? false : { opacity: 0, y: 24 }} animate={reduce ? undefined : { opacity: 1, y: 0 }} transition={{ delay: index * 0.045 }}>
                    {word}{" "}
                  </motion.span>
                ))}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-hero-muted sm:text-xl">{current.subheading}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="orange" size="xl"><Link to={current.primaryLink}>{current.primaryCta}<ArrowUpRight /></Link></Button>
                <Button asChild variant="glassHero" size="xl"><Link to={current.secondaryLink}>{current.secondaryCta}<ArrowUpRight /></Link></Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-hero-muted">
                {["Backup", "Recovery", "Protection"].map((word) => <span key={word} className={word === current.keyword ? "text-accent" : ""}>{word}</span>)}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="pointer-events-none relative hidden min-h-[520px] lg:block">
          <div className="absolute inset-0 flex items-center justify-center">
            <Suspense fallback={<StaticShield />}><ShieldScene /></Suspense>
          </div>
          <GlassCard className="left-4 top-20" title="Backup successful" text="2,418 jobs verified" />
          <GlassCard className="right-2 top-56" title="99.99% uptime" text="Protected vault status" />
          <GlassCard className="bottom-20 left-20" title="AES-256 encrypted" text="Policy locked" />
        </div>
      </div>
      <div className="absolute bottom-20 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-3 lg:flex">
        <Button variant="glassHero" size="icon" onClick={prev} aria-label="Previous slide"><ArrowLeft /></Button>
        {slides.map((slide, index) => (
          <button key={slide.id} aria-label={`Show ${slide.title}`} onClick={() => setActive(index)} className={`h-2 rounded-full transition-all ${index === active ? "w-16 bg-accent" : "w-8 bg-hero-foreground/35 hover:bg-hero-foreground/60"}`} />
        ))}
        <Button variant="glassHero" size="icon" onClick={next} aria-label="Next slide"><ArrowRight /></Button>
        <Button variant="glassHero" size="icon" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play slider" : "Pause slider"}>{paused ? <Play /> : <Pause />}</Button>
      </div>
      <StatsBar />
      <div className="absolute bottom-0 left-0 right-0 z-10 h-16 bg-wave" />
    </section>
  );
}

function StaticShield() {
  return <div className="flex size-80 items-center justify-center rounded-full border border-hero-border bg-hero-glass shadow-glow"><BrandMark className="size-36" /></div>;
}

function FloatingDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      <div className="orbit-ring left-[62%] top-[18%]" />
      <div className="orbit-ring slow left-[70%] top-[22%]" />
      <div className="glow-orb left-[8%] top-[28%] bg-primary-glow" />
      <div className="glow-orb right-[12%] bottom-[16%] bg-accent-glow" />
      {Array.from({ length: 24 }).map((_, index) => <span key={index} className="particle" style={{ left: `${(index * 37) % 100}%`, top: `${(index * 53) % 100}%`, animationDelay: `${index * 0.23}s` }} />)}
    </div>
  );
}

function GlassCard({ title, text, className }: { title: string; text: string; className: string }) {
  return <motion.div className={`absolute rounded-2xl border border-hero-border bg-hero-glass p-4 text-hero-foreground shadow-glow backdrop-blur-xl ${className}`} animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}><p className="font-display text-lg font-extrabold">{title}</p><p className="mt-1 text-sm text-hero-muted">{text}</p></motion.div>;
}

function StatsBar() {
  const stats = ["99.99% uptime", "4.8M backups/day", "20 platforms", "24/7 support"];
  return <div className="absolute inset-x-4 bottom-4 z-20 mx-auto max-w-5xl rounded-2xl border border-hero-border bg-hero-glass p-4 shadow-glow backdrop-blur-xl sm:bottom-8"><div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">{stats.map((stat) => <div key={stat}><p className="font-display text-2xl font-black text-hero-foreground">{stat.split(" ")[0]}</p><p className="text-xs font-bold uppercase tracking-wider text-hero-muted">{stat.split(" ").slice(1).join(" ")}</p></div>)}</div></div>;
}
