import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg className={cn("h-10 w-10 shrink-0", className)} viewBox="0 0 64 64" role="img" aria-label="Micronics Devlon logo">
      <defs>
        <linearGradient id="md-blue" x1="10" x2="54" y1="52" y2="12">
          <stop stopColor="var(--brand-blue)" />
          <stop offset="1" stopColor="var(--brand-cyan)" />
        </linearGradient>
        <linearGradient id="md-orange" x1="7" x2="58" y1="52" y2="8">
          <stop stopColor="var(--brand-orange)" />
          <stop offset="1" stopColor="var(--brand-orange-hot)" />
        </linearGradient>
      </defs>
      <path fill="none" stroke="url(#md-orange)" strokeWidth="5.5" strokeLinecap="round" d="M14 44a24 24 0 1 1 35 1" />
      <path fill="url(#md-orange)" d="M48 18.5 58 16l-2.3 10.1Z" />
      <path fill="var(--brand-navy)" d="M15 47V19h9.1l7.9 13 7.9-13H49v28h-8V31.4L34.3 42h-4.6L23 31.4V47Z" />
      <path fill="url(#md-blue)" d="M23.5 19h5.2l3.3 6.1 3.3-6.1h5.2L32 34Z" />
    </svg>
  );
}

export function Logo({ compact = false, to = "/", className }: { compact?: boolean; to?: string; className?: string }) {
  return (
    <Link to={to} className={cn("group inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className)}>
      <BrandMark />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-extrabold tracking-normal text-foreground">Micronics Devlon</span>
          <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Data protection</span>
        </span>
      )}
    </Link>
  );
}
