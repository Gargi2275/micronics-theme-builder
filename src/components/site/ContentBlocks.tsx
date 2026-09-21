import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InteractiveCard } from "@/components/site/InteractiveCard";
import { Reveal, Section } from "@/components/site/Section";
import { iconMap, type BaseItem, type Platform, type PricingPlan } from "@/data/mock";
import { LeadForm } from "@/components/site/forms";

export function ItemGrid({ items, basePath }: { items: BaseItem[]; basePath: "/products" | "/services" | "/solutions" | "/resources" }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => {
        const Icon = iconMap[item.icon] ?? CheckCircle2;
        const to = `${basePath}/$slug` as "/products/$slug" | "/services/$slug" | "/solutions/$slug" | "/resources/$slug";
        return (
          <Reveal key={item.id} delay={index * 0.04}>
            <InteractiveCard className="h-full">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary"><Icon className="size-6" /></div>
              <h3 className="font-display text-xl font-extrabold tracking-normal text-card-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.shortDescription}</p>
              <Button asChild variant="link" className="mt-4 px-0"><Link to={to} params={{ slug: item.slug }}>Learn more<ArrowRight /></Link></Button>
            </InteractiveCard>
          </Reveal>
        );
      })}
    </div>
  );
}

export function PlatformGrid({ platforms }: { platforms: Platform[] }) {
  const categories = ["All", ...Array.from(new Set(platforms.map((item) => item.category)))];
  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => <span key={cat} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-bold text-muted-foreground">{cat}</span>)}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {platforms.map((platform) => {
          const Icon = iconMap[platform.icon] ?? CheckCircle2;
          return (
            <Link key={platform.id} to="/backup/$slug" params={{ slug: platform.slug }} className="group rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
              <Icon className="size-8 text-primary transition-transform group-hover:rotate-6 group-hover:scale-110" />
              <h3 className="mt-4 font-display text-lg font-extrabold tracking-normal text-card-foreground">{platform.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{platform.category}</p>
              <span className="mt-4 inline-flex translate-x-0 items-center gap-1 text-sm font-bold text-accent opacity-80 transition-all group-hover:translate-x-1 group-hover:opacity-100">Learn more<ArrowRight className="size-4" /></span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function PricingCards({ plans }: { plans: PricingPlan[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {plans.map((plan) => (
        <InteractiveCard key={plan.id} className={plan.popular ? "border-accent bg-accent-soft" : ""}>
          {plan.popular && <span className="mb-4 inline-flex rounded-full bg-accent px-3 py-1 text-xs font-black uppercase tracking-wider text-accent-foreground">Most Popular</span>}
          <h3 className="font-display text-2xl font-black tracking-normal text-card-foreground">{plan.title}</h3>
          <p className="mt-3 text-muted-foreground">{plan.shortDescription}</p>
          <div className="mt-6 flex items-end gap-1"><span className="font-display text-5xl font-black text-foreground">{plan.price}</span><span className="pb-2 text-muted-foreground">{plan.cadence}</span></div>
          <ul className="mt-6 grid gap-3">
            {plan.features.map((feature) => <li key={feature} className="flex gap-2 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />{feature}</li>)}
          </ul>
          <Button asChild variant={plan.popular ? "orange" : "blue"} className="mt-7 w-full"><Link to="/contact">Request quote<ArrowRight /></Link></Button>
        </InteractiveCard>
      ))}
    </div>
  );
}

export function FinalCta() {
  return (
    <Section className="bg-background py-16">
      <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-primary)] p-8 text-primary-foreground shadow-elevated sm:p-12 lg:p-16">
        <div className="orbit-ring -right-20 -top-16 opacity-45" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-accent">Recovery readiness starts here</p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl font-black tracking-normal sm:text-5xl">Protect every workload with one confident backup plan.</h2>
            <p className="mt-4 max-w-2xl text-primary-foreground/80">Start with a trial, a demo, or a tailored quote for your environment.</p>
          </div>
          <Button asChild variant="orange" size="xl"><Link to="/free-trial">Start Free Trial<ArrowRight /></Link></Button>
        </div>
      </div>
    </Section>
  );
}

export function QuotePanel({ type = "quote" }: { type?: "contact" | "demo" | "trial" | "quote" }) {
  return <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"><h2 className="font-display text-2xl font-black tracking-normal text-card-foreground">Tell us what needs protection</h2><p className="mb-6 mt-2 text-sm leading-6 text-muted-foreground">This demo saves your request locally and shows it in the admin panel.</p><LeadForm type={type} /></div>;
}
