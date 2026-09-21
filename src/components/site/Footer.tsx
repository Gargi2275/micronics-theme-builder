import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { NewsletterForm } from "@/components/site/forms";
import { useAppData } from "@/lib/useAppData";

export function Footer() {
  const data = useAppData();
  const columns = [
    { title: "Products", items: data.products.slice(0, 6).map((item) => ({ label: item.title, to: "/products/$slug" as const, slug: item.slug })) },
    { title: "Services", items: data.services.slice(0, 6).map((item) => ({ label: item.title, to: "/services/$slug" as const, slug: item.slug })) },
    { title: "Solutions", items: data.solutions.slice(0, 6).map((item) => ({ label: item.title, to: "/solutions/$slug" as const, slug: item.slug })) },
    { title: "Backup for", items: data.platforms.slice(0, 8).map((item) => ({ label: item.title, to: "/backup/$slug" as const, slug: item.slug })) },
  ];
  return (
    <footer className="relative overflow-hidden bg-footer text-primary-foreground">
      <div className="absolute -top-20 left-0 h-28 w-full rounded-[50%] bg-background" />
      <div className="absolute right-10 top-20 size-72 rounded-full border border-accent/25 opacity-40" />
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-24 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-md">
            <Logo className="text-primary-foreground" />
            <p className="mt-5 text-sm leading-7 text-primary-foreground/78">{data.settings.footerText}</p>
            <div className="mt-6"><NewsletterForm /></div>
            <div className="mt-6 flex gap-3">
              {data.settings.socials.map((social) => <a key={social.label} href={social.url} className="inline-flex items-center gap-1 text-sm font-bold text-primary-foreground/80 hover:text-accent">{social.label}<ArrowUpRight className="size-3" /></a>)}
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-primary-foreground">{column.title}</h3>
                <ul className="mt-4 grid gap-3">
                  {column.items.map((item) => <li key={item.label}><Link to={item.to} params={{ slug: item.slug }} className="text-sm text-primary-foreground/70 hover:text-accent">{item.label}</Link></li>)}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-primary-foreground">Company</h3>
              <ul className="mt-4 grid gap-3 text-sm text-primary-foreground/70">
                <li><Link to="/about" className="hover:text-accent">About</Link></li>
                <li><Link to="/resources" className="hover:text-accent">Resources</Link></li>
                <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-accent">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-accent">Terms</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-primary-foreground/12 pt-6 text-sm text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Micronics Devlon. All rights reserved.</p>
          <Link to="/admin" className="hover:text-accent">Admin panel</Link>
        </div>
      </div>
    </footer>
  );
}
