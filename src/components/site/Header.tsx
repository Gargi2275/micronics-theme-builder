import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/site/Logo";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { useAppData } from "@/lib/useAppData";
import { iconMap } from "@/data/mock";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Solutions", to: "/solutions", menu: "solutions" },
  { label: "Features", to: "/features", menu: "features" },
  { label: "Services", to: "/services", menu: "services" },
  { label: "Pricing", to: "/pricing", menu: undefined },
  { label: "Support", to: "/support", menu: undefined },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const data = useAppData();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const menus = {
    solutions: data.solutions.slice(0, 6),
    features: data.features.slice(0, 6),
    services: data.services.slice(0, 6),
  };
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "border-b border-border bg-background/86 shadow-soft backdrop-blur-xl" : "bg-transparent")}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {nav.map((item) => (
            <div key={item.label} className="group relative">
              <Link to={item.to} className="nav-link inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-bold text-foreground/88 transition-colors hover:text-primary">
                {item.label}{item.menu && <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />}
              </Link>
              {item.menu && (
                <div className="invisible absolute left-1/2 top-full w-[620px] -translate-x-1/2 translate-y-4 rounded-2xl border border-border bg-popover/96 p-5 opacity-0 shadow-elevated backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:translate-y-2 group-hover:opacity-100">
                  <div className="grid grid-cols-2 gap-3">
                    {menus[item.menu].map((entry) => {
                      const Icon = iconMap[entry.icon] ?? ArrowUpRight;
                      return item.menu === "features" ? (
                        <Link key={entry.id} to="/features" className="rounded-xl p-3 transition-colors hover:bg-accent">
                          <MenuItem icon={Icon} title={entry.title} text={entry.shortDescription} />
                        </Link>
                      ) : item.menu === "services" ? (
                        <Link key={entry.id} to="/services/$slug" params={{ slug: entry.slug }} className="rounded-xl p-3 transition-colors hover:bg-accent">
                          <MenuItem icon={Icon} title={entry.title} text={entry.shortDescription} />
                        </Link>
                      ) : (
                        <Link key={entry.id} to="/solutions/$slug" params={{ slug: entry.slug }} className="rounded-xl p-3 transition-colors hover:bg-accent">
                          <MenuItem icon={Icon} title={entry.title} text={entry.shortDescription} />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button asChild variant="orange" size="lg"><Link to="/free-trial">Free Trial<ArrowUpRight /></Link></Button>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild><Button variant="glass" size="icon" aria-label="Open menu"><Menu /></Button></SheetTrigger>
            <SheetContent side="right" className="w-[88vw] border-border bg-background p-0">
              <div className="flex items-center justify-between border-b border-border p-5"><Logo /><Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close menu"><X /></Button></div>
              <nav className="grid gap-1 p-5">
                {[...nav, { label: "Products", to: "/products" as const }, { label: "Resources", to: "/resources" as const }].map((item) => (
                  <Link key={item.label} to={item.to} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-base font-bold text-foreground hover:bg-accent">{item.label}</Link>
                ))}
                <Button asChild variant="orange" size="lg" className="mt-4"><Link to="/free-trial" onClick={() => setOpen(false)}>Free Trial<ArrowUpRight /></Link></Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function MenuItem({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="flex gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary"><Icon className="size-5" /></span>
      <span><span className="block font-display text-sm font-extrabold text-popover-foreground">{title}</span><span className="mt-1 block text-xs leading-5 text-muted-foreground">{text}</span></span>
    </div>
  );
}
