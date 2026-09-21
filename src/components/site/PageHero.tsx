import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { imageBank } from "@/data/mock";

export function PageHero({ title, eyebrow, description, image = imageBank.servers, crumbs = [] }: { title: string; eyebrow?: string; description: string; image?: string; crumbs?: { label: string; to?: string }[] }) {
  return (
    <section className="relative min-h-[420px] overflow-hidden bg-hero pb-20 pt-32 text-hero-foreground">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" loading="lazy" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 bg-perspective-grid opacity-20" />
      <div className="orbit-ring right-14 top-20 opacity-45" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm font-semibold text-hero-muted" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-accent">Home</Link>
          {crumbs.map((crumb) => <span key={crumb.label} className="inline-flex items-center gap-2"><ChevronRight className="size-4" />{crumb.to ? <a href={crumb.to} className="hover:text-accent">{crumb.label}</a> : <span>{crumb.label}</span>}</span>)}
        </nav>
        {eyebrow && <p className="mb-4 text-sm font-black uppercase tracking-widest text-accent">{eyebrow}</p>}
        <h1 className="max-w-4xl font-display text-5xl font-black leading-tight tracking-normal sm:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-hero-muted">{description}</p>
      </div>
    </section>
  );
}
