import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { ItemGrid, PlatformGrid, PricingCards, QuotePanel, FinalCta } from "@/components/site/ContentBlocks";
import { InteractiveCard } from "@/components/site/InteractiveCard";
import { Section } from "@/components/site/Section";
import { LeadForm, NewsletterForm } from "@/components/site/forms";
import { useAppData } from "@/lib/useAppData";
import { listPublished } from "@/services/content";
import { iconMap, imageBank, type BaseItem, type Product, type Service, type Solution, type Platform, type ResourcePost } from "@/data/mock";

export function ProductsPage() {
  const data = useAppData();
  return <><PageHero title="Backup products for every critical workload" eyebrow="Products" description="Modular backup software for administrators, MSPs and distributed teams." image={imageBank.servers} crumbs={[{ label: "Products" }]} /><Section><ItemGrid items={listPublished(data.products)} basePath="/products" /></Section><FinalCta /></>;
}

export function ServicesPage() {
  const data = useAppData();
  return <><PageHero title="Services that make recovery operational" eyebrow="Services" description="Implementation, managed backup and white-label support for teams that need dependable outcomes." image={imageBank.team} crumbs={[{ label: "Services" }]} /><Section><ItemGrid items={listPublished(data.services)} basePath="/services" /></Section><FinalCta /></>;
}

export function SolutionsPage() {
  const data = useAppData();
  return <><PageHero title="Protection strategies for real operating models" eyebrow="Solutions" description="Practical backup and recovery blueprints for small businesses, MSPs and enterprises." image={imageBank.cyber} crumbs={[{ label: "Solutions" }]} /><Section><ItemGrid items={listPublished(data.solutions)} basePath="/solutions" /></Section><FinalCta /></>;
}

export function FeaturesPage() {
  const data = useAppData();
  return <><PageHero title="Security, automation and restore confidence" eyebrow="Features" description="The controls teams need to know backup data is secure, current and recoverable." image={imageBank.dashboard} crumbs={[{ label: "Features" }]} /><Section><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{listPublished(data.features).map((feature) => { const Icon = iconMap[feature.icon] ?? CheckCircle2; return <InteractiveCard key={feature.id}><Icon className="size-9 text-primary" /><h2 className="mt-5 font-display text-2xl font-black tracking-normal">{feature.title}</h2><p className="mt-3 text-muted-foreground">{feature.body}</p></InteractiveCard>; })}</div></Section><FinalCta /></>;
}

export function PricingPage() {
  const data = useAppData();
  return <><PageHero title="Simple plans with room to tailor" eyebrow="Pricing" description="Start quickly, then shape retention, storage, tenants and service levels around your environment." image={imageBank.ops} crumbs={[{ label: "Pricing" }]} /><Section><PricingCards plans={listPublished(data.pricingPlans)} /></Section><Section className="bg-secondary" eyebrow="Request a quote" title="Need workload-specific pricing?"><QuotePanel /></Section></>;
}

export function ResourcesPage() {
  const data = useAppData();
  return <><PageHero title="Backup and recovery resources" eyebrow="Resources" description="Guides and practical notes for building a more resilient protection program." image={imageBank.dashboard} crumbs={[{ label: "Resources" }]} /><Section><ItemGrid items={listPublished(data.posts)} basePath="/resources" /></Section></>;
}

export function SupportPage() {
  return <><PageHero title="Support for urgent restore moments" eyebrow="Support" description="Reach specialists, browse readiness topics or request help with protected environments." image={imageBank.team} crumbs={[{ label: "Support" }]} /><Section><div className="grid gap-6 lg:grid-cols-3"><InteractiveCard><h2 className="font-display text-2xl font-black">24/7 response</h2><p className="mt-3 text-muted-foreground">Priority assistance for active incidents and restore validation.</p></InteractiveCard><InteractiveCard><h2 className="font-display text-2xl font-black">Knowledge center</h2><p className="mt-3 text-muted-foreground">Runbooks for agents, policies, repositories and reports.</p></InteractiveCard><InteractiveCard><h2 className="font-display text-2xl font-black">Health reviews</h2><p className="mt-3 text-muted-foreground">Scheduled reviews that make recovery readiness visible.</p></InteractiveCard></div></Section><FinalCta /></>;
}

export function FreeTrialPage() {
  return <><PageHero title="Start a guided backup trial" eyebrow="Free trial" description="Tell us what you want to protect and this demo will store your trial request locally." image={imageBank.dataCenter} crumbs={[{ label: "Free trial" }]} /><Section><QuotePanel type="trial" /></Section></>;
}

export function AboutPage() {
  return <><PageHero title="A recovery-first company for business data" eyebrow="About" description="Micronics Devlon helps teams turn backup into a measurable operating discipline." image={imageBank.team} crumbs={[{ label: "About" }]} /><Section><div className="grid gap-8 lg:grid-cols-2"><div><h2 className="font-display text-4xl font-black tracking-normal">Built for the pressure of real incidents.</h2><p className="mt-5 leading-8 text-muted-foreground">Our software and services are shaped around the moment teams need data back: clear policies, clean reporting, secure storage and restore paths that have already been tested.</p></div><InteractiveCard><ul className="grid gap-4">{["Recovery planning", "Security-minded backup operations", "MSP-ready workflows", "Straightforward service support"].map((item) => <li key={item} className="flex gap-3 text-muted-foreground"><CheckCircle2 className="mt-1 size-5 text-primary" />{item}</li>)}</ul></InteractiveCard></div></Section></>;
}

export function ContactPage() {
  return <><PageHero title="Talk to a backup specialist" eyebrow="Contact" description="Send a request for a demo, quote or recovery planning conversation." image={imageBank.ops} crumbs={[{ label: "Contact" }]} /><Section><div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]"><div><h2 className="font-display text-3xl font-black tracking-normal">Micronics Devlon</h2><p className="mt-4 text-muted-foreground">hello@micronicsdevlon.com<br />+1 (555) 014-2026<br />Los Angeles, CA</p><div className="mt-8 rounded-2xl border border-border bg-card p-5"><h3 className="font-display font-black">Newsletter</h3><p className="my-3 text-sm text-muted-foreground">Get recovery readiness ideas in your inbox.</p><NewsletterForm /></div></div><QuotePanel type="contact" /></div></Section></>;
}

export function PolicyPage({ type }: { type: "privacy" | "terms" }) {
  const title = type === "privacy" ? "Privacy Policy" : "Terms of Service";
  return <><PageHero title={title} eyebrow="Company" description="Clear demo website terms for Micronics Devlon visitors." image={imageBank.network} crumbs={[{ label: title }]} /><Section><article className="prose prose-slate max-w-none dark:prose-invert"><h2>Demo website notice</h2><p>This frontend demo stores form submissions, settings and admin edits in your browser only. It does not send data to a real server.</p><h2>Information</h2><p>Contact and newsletter forms validate entries and save them locally so the admin panel can demonstrate workflows.</p><h2>Use</h2><p>Public copy, visuals and interactions are original for this Micronics Devlon concept.</p></article></Section></>;
}

export function DetailPage({ item, section, parentPath }: { item: Product | Service | Solution | Platform | ResourcePost; section: string; parentPath: string }) {
  const Icon = iconMap[item.icon] ?? CheckCircle2;
  const maybeProduct = item as Product;
  const maybeService = item as Service;
  return (
    <>
      <PageHero title={section === "backup" ? `Backup for ${item.title}` : item.title} eyebrow={section} description={item.shortDescription} image={item.image} crumbs={[{ label: section, to: parentPath }, { label: item.title }]} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <article className="min-w-0">
            <div className="sticky top-24 z-20 mb-8 flex gap-2 overflow-x-auto rounded-2xl border border-border bg-card p-2 shadow-card"><a href="#overview" className="rounded-xl px-4 py-2 text-sm font-bold text-muted-foreground hover:bg-accent hover:text-accent-foreground">Overview</a><a href="#features" className="rounded-xl px-4 py-2 text-sm font-bold text-muted-foreground hover:bg-accent hover:text-accent-foreground">Features</a><a href="#pricing" className="rounded-xl px-4 py-2 text-sm font-bold text-muted-foreground hover:bg-accent hover:text-accent-foreground">Pricing</a><a href="#faq" className="rounded-xl px-4 py-2 text-sm font-bold text-muted-foreground hover:bg-accent hover:text-accent-foreground">FAQ</a></div>
            <section id="overview"><Icon className="size-12 text-primary" /><h2 className="mt-5 font-display text-4xl font-black tracking-normal">{item.title}</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">{item.body}</p></section>
            <section id="features" className="mt-14"><h2 className="font-display text-3xl font-black tracking-normal">Key capabilities</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">{(maybeProduct.features ?? maybeService.included ?? (item as Solution).benefits ?? (item as Platform).benefits ?? ["Secure protection", "Fast recovery", "Clear reporting", "Flexible policies"]).map((feature) => <InteractiveCard key={feature} className="p-5"><CheckCircle2 className="size-5 text-primary" /><p className="mt-3 font-semibold text-card-foreground">{feature}</p></InteractiveCard>)}</div></section>
            {maybeProduct.requirements && <section className="mt-14"><h2 className="font-display text-3xl font-black tracking-normal">Requirements</h2><div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">{maybeProduct.requirements.map((row) => <div key={row.label} className="grid gap-2 border-b border-border p-4 last:border-0 sm:grid-cols-[180px_1fr]"><strong>{row.label}</strong><span className="text-muted-foreground">{row.value}</span></div>)}</div></section>}
            <section id="pricing" className="mt-14"><h2 className="font-display text-3xl font-black tracking-normal">Pricing</h2><p className="mt-3 text-muted-foreground">{maybeProduct.price ?? "Tailored quote"} with onboarding options available.</p></section>
            <section id="faq" className="mt-14"><h2 className="font-display text-3xl font-black tracking-normal">FAQ</h2><div className="mt-6 grid gap-4">{(maybeProduct.faqs ?? maybeService.faqs ?? []).map((faq) => <InteractiveCard key={faq.question} className="p-5"><h3 className="font-bold">{faq.question}</h3><p className="mt-2 text-muted-foreground">{faq.answer}</p></InteractiveCard>)}</div></section>
          </article>
          <aside className="lg:sticky lg:top-28 lg:self-start"><QuotePanel type={section === "services" ? "quote" : "demo"} /></aside>
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
