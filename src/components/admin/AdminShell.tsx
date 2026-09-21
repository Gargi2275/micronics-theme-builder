import { useMemo, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Bell, ChevronLeft, Database, FileText, GalleryHorizontalEnd, LayoutDashboard, LogOut, Menu, Search, Settings, ShieldCheck, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/site/Logo";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { logout } from "@/services/content";
import { cn } from "@/lib/utils";

const links = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "Hero slides", to: "/admin/hero-slides", icon: GalleryHorizontalEnd },
  { label: "Content", to: "/admin/content", icon: FileText },
  { label: "Leads", to: "/admin/leads", icon: Database },
  { label: "Media", to: "/admin/media", icon: GalleryHorizontalEnd },
  { label: "Settings", to: "/admin/settings", icon: Settings },
  { label: "Users & roles", to: "/admin/users", icon: Users },
  { label: "Activity", to: "/admin/activity", icon: ShieldCheck },
] as const;

export function AdminShell({ children, title, description }: { children: React.ReactNode; title: string; description: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const navigate = useNavigate();
  const crumbs = useMemo(() => pathname.split("/").filter(Boolean).map((part) => part.replace(/-/g, " ")), [pathname]);
  const nav = <nav className="grid gap-1 p-3">{links.map(({ label, to, icon: Icon }) => <Link key={to} to={to} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-admin-sidebar-foreground/72 transition-colors hover:bg-primary/25 hover:text-admin-sidebar-foreground", pathname === to && "bg-primary text-admin-sidebar-foreground")}><Icon className="size-5 shrink-0" />{!collapsed && <span>{label}</span>}</Link>)}</nav>;
  return (
    <div className="min-h-screen bg-secondary text-foreground lg:grid lg:grid-cols-[auto_1fr]">
      <aside className={cn("fixed inset-y-0 left-0 z-50 hidden bg-admin-sidebar text-admin-sidebar-foreground shadow-elevated transition-all lg:block", collapsed ? "w-20" : "w-72")}> 
        <div className="flex h-20 items-center justify-between border-b border-primary-foreground/10 px-4"><Logo compact={collapsed} to="/admin" /><Button variant="ghost" size="icon" onClick={() => setCollapsed((v) => !v)} className="text-admin-sidebar-foreground hover:bg-primary/20"><ChevronLeft className={cn("transition-transform", collapsed && "rotate-180")} /></Button></div>
        {nav}
      </aside>
      {mobileOpen && <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur lg:hidden"><div className="h-full w-80 bg-admin-sidebar text-admin-sidebar-foreground"><div className="flex h-20 items-center justify-between border-b border-primary-foreground/10 px-4"><Logo to="/admin" /><Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} className="text-admin-sidebar-foreground"><X /></Button></div>{nav}</div></div>}
      <div className={cn("min-w-0 transition-all", collapsed ? "lg:ml-20" : "lg:ml-72")}> 
        <header className="sticky top-0 z-40 border-b border-border bg-background/88 backdrop-blur-xl">
          <div className="flex h-20 items-center gap-4 px-4 sm:px-6 lg:px-8">
            <Button variant="glass" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)}><Menu /></Button>
            <div className="hidden min-w-0 flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 sm:flex"><Search className="size-4 text-muted-foreground" /><Input placeholder="Search demo content" className="h-8 border-0 p-0 shadow-none focus-visible:ring-0" /></div>
            <ThemeToggle />
            <Button variant="glass" size="icon" aria-label="Notifications"><Bell /></Button>
            <Button variant="ghost" onClick={() => { logout(); navigate({ to: "/admin/login", replace: true }); }}><LogOut />Logout</Button>
          </div>
        </header>
        <main className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="mb-2 text-sm font-bold capitalize text-muted-foreground">{crumbs.join(" / ") || "admin"}</p>
            <h1 className="font-display text-4xl font-black tracking-normal text-foreground">{title}</h1>
            <p className="mt-2 text-muted-foreground">{description}</p>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
