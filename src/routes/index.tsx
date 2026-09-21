import { useMemo } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSlider } from "@/components/site/HeroSlider";
import { ItemGrid, PlatformGrid, PricingCards, FinalCta } from "@/components/site/ContentBlocks";
import { InteractiveCard } from "@/components/site/InteractiveCard";
import { Reveal, Section } from "@/components/site/Section";
import { useAppData } from "@/lib/useAppData";
import { listPublished } from "@/services/content";
import { iconMap } from "@/data/mock";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo({ title: "Micronics Devlon | Backup, Recovery & Data Protection", description: "Premium backup, recovery and data-protection software and services for servers, SaaS, databases, VMs, NAS and mobile teams." }),
  component: HomePage,
});

function HomePage() {
  const data = useAppData();
  const platforms = listPublished(data.platforms);
  const products = listPublished(data.products);
  const services = listPublished(data.services);
  const features = listPublished(data.features);
  const marquee = [...platforms.map((item) => item.title), ...platforms.map((item) => item.title)];
  const testimonials = useMemo(() => listPublished(data.testimonials), [data.testimonials]);
  return (
    <>
      <HeroSlider />
      <section className="overflow-hidden border-y border-border bg-card py-5">
        <div className="marquee flex whitespace-nowrap"><div className="marquee-track flex gap-10 pr-10 text-sm font-black uppercase tracking-widest text-muted-foreground">{marquee.map((name, index) => <span key={`${name}-${index}`}>{name}</span>)}</div></div>
      </section>
      <Section eyebrow="Platform coverage" title="Everything you run, protected" intro="From productivity suites to virtual machines, databases, servers, NAS and mobile devices, Micronics Devlon keeps recovery paths ready.">
        <PlatformGrid platforms={platforms} />
      </Section>
      <Section dark eyebrow="Software and services" title="Built for administrators, MSPs and resilient teams" intro="Choose product modules for your workloads, then add services when you want experts beside your team.">
        <div className="mb-10 flex items-center justify-between gap-4"><h3 className="font-display text-2xl font-black tracking-normal">Products</h3><Button asChild variant="glassHero"><Link to="/products">All products<ArrowRight /></Link></Button></div>
        <ItemGrid items={products.slice(0, 6)} basePath="/products" />
        <div className="mb-10 mt-16 flex items-center justify-between gap-4"><h3 className="font-display text-2xl font-black tracking-normal">Services</h3><Button asChild variant="glassHero"><Link to="/services">All services<ArrowRight /></Link></Button></div>
        <ItemGrid items={services.slice(0, 6)} basePath="/services" />
      </Section>
      <Section eyebrow="Core features" title="Recovery-first protection, not checkbox backup" intro="Every feature is designed to make successful recovery visible before an incident happens.">
        <div className="grid gap-5 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] ?? CheckCircle2;
            return <Reveal key={feature.id} delay={index * 0.04}><InteractiveCard className={index === 0 ? "lg:col-span-2" : ""}><Icon className="size-9 text-primary" /><h3 className="mt-5 font-display text-2xl font-black tracking-normal text-card-foreground">{feature.title}</h3><p className="mt-3 text-muted-foreground">{feature.shortDescription}</p></InteractiveCard></Reveal>;
          })}
        </div>
      </Section>
      <Section className="bg-secondary" eyebrow="Why Micronics Devlon" title="Clear visibility, verified restores and support that understands pressure">
        <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <InteractiveCard><h3 className="font-display text-3xl font-black tracking-normal">Designed around the day you need the restore.</h3><ul className="mt-6 grid gap-4">{["Policy-based automation", "Immutable recovery points", "Plain-language reporting", "Service options for hands-on help"].map((item) => <li key={item} className="flex gap-3 text-muted-foreground"><CheckCircle2 className="mt-1 size-5 shrink-0 text-primary" />{item}</li>)}</ul></InteractiveCard>
          <div className="grid gap-5 sm:grid-cols-2">{testimonials.map((item) => <InteractiveCard key={item.id}><p className="text-lg leading-8 text-card-foreground">“{item.quote}”</p><p className="mt-5 font-bold text-foreground">{item.person}</p><p className="text-sm text-muted-foreground">{item.company}</p></InteractiveCard>)}</div>
        </div>
      </Section>
      <Section eyebrow="Pricing" title="Start with a plan, tailor when needed" intro="Choose a path for your team size, protected workloads and recovery goals.">
        <PricingCards plans={listPublished(data.pricingPlans)} />
      </Section>
      <FinalCta />
    </>
  );
}
