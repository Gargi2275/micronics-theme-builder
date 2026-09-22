import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Lock,
  Boxes,
  Sparkles,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UniversalSearch } from "@/components/site/UniversalSearch";
import { DemoVideoModal } from "@/components/site/DemoVideoModal";
import { HeroCyberBackground } from "@/components/site/HeroCyberBackground";
import { HeroVisualShowcase } from "@/components/site/HeroVisualShowcase";

export function HeroSlider() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const valuePillars = [
    {
      icon: Zap,
      title: "< 1.4s Instant RTO",
      desc: "Instant sandbox mount & automated restore verification.",
      badge: "Sub-Second",
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      icon: Lock,
      title: "Immutable WORM Vaults",
      desc: "Cryptographically locked snapshots immune to ransomware.",
      badge: "Zero-Trust",
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    {
      icon: Boxes,
      title: "30+ Unified Workloads",
      desc: "Microsoft 365, VMware, Proxmox, SQL, Oracle & NAS.",
      badge: "Unified Mesh",
      color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      icon: ShieldCheck,
      title: "99.999% Verified SLA",
      desc: "Automated checksum audits & executive certificates.",
      badge: "Audit-Ready",
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-hero text-hero-foreground pt-32 pb-20 sm:pt-36 sm:pb-28 transition-colors duration-300">
      {/* 🌟 Dynamic Cyber Video / Canvas Mesh Background */}
      <HeroCyberBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Trust Pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-card/85 px-4 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-md dark:border-white/15 dark:bg-white/[0.07] dark:text-white/90"
        >
          <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
          <span>Next-Gen Enterprise Cyber Recovery & Backup</span>
          <span className="text-muted-foreground/50">•</span>
          <span className="text-amber-600 dark:text-amber-300 font-bold flex items-center gap-1">
            <Sparkles className="size-3" /> 2026 Edition
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto max-w-5xl font-display text-4xl sm:text-6xl lg:text-[4.5rem] font-black leading-[1.08] tracking-tight text-foreground dark:text-white"
        >
          Enterprise Data Protection &{" "}
          <span className="gradient-text">Instant Sub-Second Recovery</span>.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-3xl text-base sm:text-xl leading-relaxed text-muted-foreground dark:text-slate-300 font-normal"
        >
          Secure your Microsoft 365, VMware clusters, databases, and NAS repositories with immutable air-gapped vaults and verified sub-second restore paths.
        </motion.p>

        {/* Universal Search & Discovery Bar */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-9"
        >
          <UniversalSearch />
        </motion.div>

        {/* Dual CTA Buttons with Video Play Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          <Button asChild variant="orange" size="xl" className="shadow-amber-glow text-sm font-bold">
            <Link to="/free-trial">
              <span>Start 14-Day Free Trial</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>

          <Button
            variant="glass"
            size="xl"
            onClick={() => setIsVideoOpen(true)}
            className="group text-sm font-bold border-border/80 bg-card/70 hover:bg-card/95 text-foreground dark:text-white"
          >
            <div className="flex size-6 items-center justify-center rounded-full bg-primary/20 text-primary mr-1 transition-transform group-hover:scale-110">
              <Play className="size-3 fill-primary text-primary ml-0.5" />
            </div>
            <span>Watch 2-Min Product Tour</span>
          </Button>
        </motion.div>

        {/* Trust Guarantees */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs font-medium text-muted-foreground dark:text-slate-400"
        >
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-emerald-500" />
            No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-blue-500" />
            Instant 5-minute deployment
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-amber-500" />
            SOC-2 & AES-256 compliant
          </span>
        </motion.div>

        {/* 🌟 Masterpiece High-Definition Visual Image & Video Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14"
        >
          <HeroVisualShowcase onWatchVideo={() => setIsVideoOpen(true)} />
        </motion.div>

        {/* 4 Feature Value Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left"
        >
          {valuePillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card/85 p-5 shadow-card backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-blue-400/40 dark:hover:bg-slate-900/80"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                    <Icon className="size-5" />
                  </div>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border ${item.color}`}
                  >
                    {item.badge}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-base font-bold text-card-foreground group-hover:text-primary transition-colors dark:text-white dark:group-hover:text-blue-400">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-muted-foreground dark:text-slate-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Interactive Video Tour Modal */}
      <DemoVideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </section>
  );
}
