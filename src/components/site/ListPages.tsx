import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ShieldCheck, Headphones, BookOpen, Activity, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { ItemGrid, PlatformGrid, PricingCards, QuotePanel, FinalCta } from "@/components/site/ContentBlocks";
import { InteractiveCard } from "@/components/site/InteractiveCard";
import { Section } from "@/components/site/Section";
import { LeadForm, NewsletterForm } from "@/components/site/forms";
import { useAppData } from "@/lib/useAppData";
import { listPublished } from "@/services/content";
import { iconMap, imageBank, type BaseItem, type Product, type Service, type Solution, type Platform, type ResourcePost } from "@/data/mock";
import { cn } from "@/lib/utils";


export function ProductsPage() {
  const data = useAppData();
  return (
    <>
      <PageHero
        title="Backup products for every critical workload"
        eyebrow="Products"
        description="Modular backup software for administrators, MSPs and distributed teams."
        image={imageBank.servers}
        crumbs={[{ label: "Products" }]}
      />
      <Section>
        <ItemGrid items={listPublished(data.products)} basePath="/products" />
      </Section>
      <FinalCta />
    </>
  );
}

export function ServicesPage() {
  const data = useAppData();
  return (
    <>
      <PageHero
        title="Services that make recovery operational"
        eyebrow="Services"
        description="Implementation, managed backup and white-label support for teams that need dependable outcomes."
        image={imageBank.team}
        crumbs={[{ label: "Services" }]}
      />
      <Section>
        <ItemGrid items={listPublished(data.services)} basePath="/services" />
      </Section>
      <FinalCta />
    </>
  );
}

export function SolutionsPage() {
  const data = useAppData();
  const [category, setCategory] = useState("All");
  const publishedSolutions = listPublished(data.solutions);
  const categories = ["All", "Cloud Applications Backup", "Onsite Systems Backup", "Personal Backup (FREE)"];

  const filtered =
    category === "All"
      ? publishedSolutions
      : publishedSolutions.filter((item) => item.category === category);

  return (
    <>
      <PageHero
        title="Protection strategies for real operating models"
        eyebrow="Solutions"
        description="Comprehensive backup blueprints for Cloud SaaS, Onsite Hypervisors, Enterprise Databases, and Endpoints."
        image={imageBank.cyber}
        crumbs={[{ label: "Solutions" }]}
      />
      <Section>
        {/* Category Pills */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all",
                category === cat
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "border border-border/80 bg-card/80 text-muted-foreground hover:bg-card hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <ItemGrid items={filtered} basePath="/solutions" />
      </Section>
      <FinalCta />
    </>
  );
}

export function FeaturesPage() {
  const data = useAppData();
  const [category, setCategory] = useState("All");
  const publishedFeatures = listPublished(data.features);
  const categories = ["All", "New", "Highlights", "General", "System Management"];

  const filtered =
    category === "All"
      ? publishedFeatures
      : publishedFeatures.filter((item) => item.category === category);

  return (
    <>
      <PageHero
        title="Security, automation and restore confidence"
        eyebrow="Features"
        description="Over 35+ enterprise controls, cryptographic immutability, sub-second restore mounting, and multi-tenant management."
        image={imageBank.dashboard}
        crumbs={[{ label: "Features" }]}
      />
      <Section>
        {/* Category Filter Pills */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all",
                category === cat
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "border border-border/80 bg-card/80 text-muted-foreground hover:bg-card hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((feature) => {
            const Icon = iconMap[feature.icon] ?? CheckCircle2;
            return (
              <InteractiveCard key={feature.id} className="flex h-full flex-col justify-between p-7">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-indigo-500/10 text-primary border border-primary/20 shadow-sm">
                      <Icon className="size-6" />
                    </div>
                    {feature.starred && (
                      <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1">
                        <Star className="size-3 fill-amber-500" /> Featured
                      </span>
                    )}
                  </div>
                  <h2 className="font-display text-xl font-black tracking-tight text-card-foreground">
                    {feature.title}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground font-normal line-clamp-3">
                    {feature.body}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-semibold">
                  <Button asChild variant="link" className="p-0 h-auto font-bold text-primary">
                    <Link to="/features/$slug" params={{ slug: feature.slug }} className="inline-flex items-center gap-1">
                      <span>Explore feature</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </Button>
                  <span className="text-muted-foreground font-mono text-[11px]">{feature.category ?? "Enterprise"}</span>
                </div>
              </InteractiveCard>
            );
          })}
        </div>
      </Section>
      <FinalCta />
    </>
  );
}


export function PricingPage() {
  const data = useAppData();
  return (
    <>
      <PageHero
        title="Simple plans with room to tailor"
        eyebrow="Pricing"
        description="Start quickly, then shape retention, storage, tenants and service levels around your environment."
        image={imageBank.ops}
        crumbs={[{ label: "Pricing" }]}
      />
      <Section>
        <PricingCards plans={listPublished(data.pricingPlans)} />
      </Section>
      <Section className="bg-secondary/50" eyebrow="Request a quote" title="Need workload-specific pricing?">
        <QuotePanel />
      </Section>
    </>
  );
}

export function ResourcesPage() {
  const data = useAppData();
  return (
    <>
      <PageHero
        title="Backup and recovery resources"
        eyebrow="Resources"
        description="Guides and practical notes for building a more resilient protection program."
        image={imageBank.dashboard}
        crumbs={[{ label: "Resources" }]}
      />
      <Section>
        <ItemGrid items={listPublished(data.posts)} basePath="/resources" />
      </Section>
      <FinalCta />
    </>
  );
}

export function SupportPage() {
  return (
    <>
      <PageHero
        title="Support for urgent restore moments"
        eyebrow="Support"
        description="Reach specialists, browse readiness topics or request help with protected environments."
        image={imageBank.team}
        crumbs={[{ label: "Support" }]}
      />
      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          <InteractiveCard className="p-7">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 mb-5">
              <Headphones className="size-6" />
            </div>
            <h2 className="font-display text-2xl font-black text-card-foreground">24/7 Rapid Response</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Priority emergency assistance for active recovery incidents, ransomware triage, and restore validation.
            </p>
          </InteractiveCard>
          <InteractiveCard className="p-7">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 mb-5">
              <BookOpen className="size-6" />
            </div>
            <h2 className="font-display text-2xl font-black text-card-foreground">Knowledge Center</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Technical runbooks for software agents, retention policies, air-gapped repositories, and automated compliance reports.
            </p>
          </InteractiveCard>
          <InteractiveCard className="p-7">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 mb-5">
              <Activity className="size-6" />
            </div>
            <h2 className="font-display text-2xl font-black text-card-foreground">Health Reviews</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Scheduled architecture reviews and simulated disaster recovery exercises to guarantee restore readiness.
            </p>
          </InteractiveCard>
        </div>
      </Section>
      <FinalCta />
    </>
  );
}

export function FreeTrialPage() {
  return (
    <>
      <PageHero
        title="Start a guided backup trial"
        eyebrow="Free trial"
        description="Tell us what you want to protect and this demo will store your trial request locally."
        image={imageBank.dataCenter}
        crumbs={[{ label: "Free trial" }]}
      />
      <Section>
        <QuotePanel type="trial" />
      </Section>
    </>
  );
}

export function AboutPage() {
  return (
    <>
      <PageHero
        title="A recovery-first company for business data"
        eyebrow="About"
        description="Micronics Devlon helps teams turn backup into a measurable operating discipline."
        image={imageBank.team}
        crumbs={[{ label: "About" }]}
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              Built for the pressure of real incidents.
            </h2>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
              Our software and services are shaped around the moment teams need data back: clear policies, clean reporting, secure storage, and restore paths that have already been battle-tested.
            </p>
          </div>
          <InteractiveCard className="p-7">
            <ul className="grid gap-4">
              {[
                "Recovery planning with verified RTO/RPO targets",
                "Security-minded backup operations with air-gapped immutability",
                "Multi-tenant MSP workflows and custom branding",
                "Straightforward service support from real storage engineers",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-medium text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </InteractiveCard>
        </div>
      </Section>
      <FinalCta />
    </>
  );
}

export function ContactPage() {
  return (
    <>
      <PageHero
        title="Talk to a backup specialist"
        eyebrow="Contact"
        description="Send a request for a demo, quote or recovery planning conversation."
        image={imageBank.ops}
        crumbs={[{ label: "Contact" }]}
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <h2 className="font-display text-3xl font-black tracking-tight text-foreground">
              Micronics Devlon
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              hello@micronicsdevlon.com<br />
              +1 (555) 014-2026<br />
              Los Angeles, CA
            </p>
            <div className="mt-8 rounded-3xl border border-border/80 bg-card p-6 shadow-card">
              <h3 className="font-display text-xl font-black text-foreground">Recovery Advisory</h3>
              <p className="my-3 text-sm text-muted-foreground">
                Get weekly recovery readiness ideas and data protection bulletins in your inbox.
              </p>
              <NewsletterForm />
            </div>
          </div>
          <QuotePanel type="contact" />
        </div>
      </Section>
    </>
  );
}

export function PolicyPage({ type }: { type: "privacy" | "terms" }) {
  const title = type === "privacy" ? "Privacy Policy" : "Terms of Service";
  return (
    <>
      <PageHero
        title={title}
        eyebrow="Company"
        description="Clear demo website terms for Micronics Devlon visitors."
        image={imageBank.network}
        crumbs={[{ label: title }]}
      />
      <Section>
        <article className="prose prose-slate max-w-none dark:prose-invert">
          <h2 className="text-foreground font-display font-black text-2xl">Demo website notice</h2>
          <p className="text-muted-foreground">
            This frontend demo stores form submissions, settings and admin edits in your browser only. It does not send data to a real server.
          </p>
          <h2 className="text-foreground font-display font-black text-2xl mt-6">Information</h2>
          <p className="text-muted-foreground">
            Contact and newsletter forms validate entries and save them locally so the admin panel can demonstrate workflows.
          </p>
          <h2 className="text-foreground font-display font-black text-2xl mt-6">Use</h2>
          <p className="text-muted-foreground">
            Public copy, visuals and interactions are original for this Micronics Devlon concept.
          </p>
        </article>
      </Section>
    </>
  );
}

export function DetailPage({
  item,
  section,
  parentPath,
}: {
  item: Product | Service | Solution | Platform | ResourcePost | BaseItem;
  section: string;
  parentPath: string;
}) {
  const Icon = iconMap[item.icon] ?? CheckCircle2;
  const maybeProduct = item as Product;
  const maybeService = item as Service;

  return (
    <>
      <PageHero
        title={section === "backup" ? `Backup for ${item.title}` : item.title}
        eyebrow={section}
        description={item.shortDescription}
        image={item.image}
        crumbs={[{ label: section, to: parentPath }, { label: item.title }]}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <article className="min-w-0">
            {/* Sticky Section Nav */}
            <div className="sticky top-24 z-20 mb-8 flex gap-2 overflow-x-auto rounded-2xl border border-border/80 bg-card/95 p-2 shadow-card backdrop-blur-md">
              <a
                href="#overview"
                className="rounded-xl px-4 py-2 text-sm font-bold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                Overview
              </a>
              <a
                href="#features"
                className="rounded-xl px-4 py-2 text-sm font-bold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="rounded-xl px-4 py-2 text-sm font-bold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="rounded-xl px-4 py-2 text-sm font-bold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                FAQ
              </a>
            </div>

            <section id="overview">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 mb-6">
                <Icon className="size-8" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-foreground">
                {item.title}
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </section>

            <section id="features" className="mt-14">
              <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                Key capabilities & Specifications
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {(
                  maybeProduct.features ??
                  maybeService.included ??
                  (item as Solution).benefits ??
                  (item as Platform).benefits ?? [
                    "Cryptographic immutability & WORM storage locking",
                    "Sub-second RTO with instant mount and live verification",
                    "Automated daily restore drills with SLA audit certificates",
                    "Multi-tenant management console with granular role-based access",
                    "End-to-end AES-256 GCM encryption in transit & at rest",
                    "Zero-impact synthetic full backups and global deduplication",
                  ]
                ).map((feature) => (
                  <InteractiveCard key={feature} className="p-5">
                    <CheckCircle2 className="size-5 text-primary" />
                    <p className="mt-3 font-semibold text-card-foreground">{feature}</p>
                  </InteractiveCard>
                ))}
              </div>
            </section>

            {maybeProduct.requirements && (
              <section className="mt-14">
                <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                  Requirements
                </h2>
                <div className="mt-6 overflow-hidden rounded-2xl border border-border/80 bg-card shadow-card">
                  {maybeProduct.requirements.map((row) => (
                    <div
                      key={row.label}
                      className="grid gap-2 border-b border-border/60 p-4 last:border-0 sm:grid-cols-[180px_1fr]"
                    >
                      <strong className="text-foreground text-sm font-bold">{row.label}</strong>
                      <span className="text-muted-foreground text-sm">{row.value}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section id="pricing" className="mt-14">
              <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                Pricing & Deployment
              </h2>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                {maybeProduct.price ?? "Custom enterprise deployment"} with 24/7 dedicated engineering support, SLA guarantees, and instant provisioning.
              </p>
            </section>

            <section id="faq" className="mt-14">
              <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                Frequently Asked Questions
              </h2>
              <div className="mt-6 grid gap-4">
                {(
                  maybeProduct.faqs ??
                  maybeService.faqs ?? [
                    {
                      question: `How does ${item.title} integrate into existing environments?`,
                      answer: `${item.title} deploys seamlessly with agentless connectors and lightweight agents, connecting to your storage repositories and virtualization hypervisors within 5 minutes without requiring system restarts.`,
                    },
                    {
                      question: `What RTO/RPO targets does ${item.title} support?`,
                      answer: `Micronics Devlon provides sub-second RTO through instant VM and granular file mounting, and customizable RPO schedules down to continuous 1-minute transaction log snapshots.`,
                    },
                    {
                      question: `Is ${item.title} compliant with industry data protection standards?`,
                      answer: `Yes, all snapshots and backup repositories are cryptographically sealed with WORM immutability, meeting strict SOC-2 Type II, ISO 27001, HIPAA, and GDPR compliance mandates.`,
                    },
                  ]
                ).map((faq) => (
                  <InteractiveCard key={faq.question} className="p-5">
                    <h3 className="font-bold text-card-foreground text-base">{faq.question}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </InteractiveCard>
                ))}
              </div>
            </section>
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <QuotePanel type={section === "services" ? "quote" : "demo"} />
          </aside>
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
