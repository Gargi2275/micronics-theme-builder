import {
  ArchiveRestore,
  BadgeCheck,
  Boxes,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Cloud,
  Database,
  FileLock2,
  Globe2,
  HardDrive,
  Headphones,
  KeyRound,
  Laptop,
  LifeBuoy,
  LockKeyhole,
  Mail,
  Network,
  RefreshCcw,
  Server,
  ShieldCheck,
  Smartphone,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type Status = "draft" | "published";
export type LeadStatus = "new" | "contacted" | "qualified" | "closed";
export type ContentType = "products" | "services" | "solutions" | "features" | "platforms" | "pricingPlans" | "faqs" | "testimonials" | "posts" | "heroSlides";

export interface HeroSlide {
  id: string;
  title: string;
  slug: string;
  headline: string;
  keyword: string;
  subheading: string;
  primaryCta: string;
  primaryLink: string;
  secondaryCta: string;
  secondaryLink: string;
  image: string;
  alt: string;
  order: number;
  active: boolean;
  status: Status;
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
}

export interface BaseItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  body: string;
  icon: string;
  image: string;
  status: Status;
  order: number;
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product extends BaseItem {
  features: string[];
  platforms: string[];
  requirements: { label: string; value: string }[];
  faqs: { question: string; answer: string }[];
  price: string;
  related: string[];
}

export interface Service extends BaseItem {
  included: string[];
  process: string[];
  audience: string[];
  faqs: { question: string; answer: string }[];
}

export interface Solution extends BaseItem {
  benefits: string[];
}

export interface Platform extends BaseItem {
  category: string;
  benefits: string[];
}

export interface PricingPlan extends BaseItem {
  price: string;
  cadence: string;
  popular?: boolean;
  features: string[];
}

export interface FAQItem extends BaseItem {
  question: string;
  answer: string;
  category: string;
}

export interface Testimonial extends BaseItem {
  quote: string;
  person: string;
  company: string;
}

export interface ResourcePost extends BaseItem {
  category: string;
  readTime: string;
}

export interface Lead {
  id: string;
  type: "contact" | "demo" | "trial" | "quote";
  name: string;
  email: string;
  company: string;
  message: string;
  status: LeadStatus;
  notes: string;
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  createdAt: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: string;
  createdAt: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  contactEmail: string;
  phone: string;
  address: string;
  footerText: string;
  defaultTheme: "light" | "dark" | "system";
  maintenanceMode: boolean;
  socials: { label: string; url: string }[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Editor" | "Viewer";
  active: boolean;
  createdAt: string;
}

export interface ActivityLogItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  createdAt: string;
}

export interface AppData {
  heroSlides: HeroSlide[];
  products: Product[];
  services: Service[];
  solutions: Solution[];
  features: BaseItem[];
  platforms: Platform[];
  pricingPlans: PricingPlan[];
  faqs: FAQItem[];
  testimonials: Testimonial[];
  posts: ResourcePost[];
  leads: Lead[];
  newsletter: NewsletterSubscriber[];
  media: MediaItem[];
  settings: SiteSettings;
  users: AdminUser[];
  activity: ActivityLogItem[];
}

export const iconMap: Record<string, LucideIcon> = {
  ArchiveRestore,
  BadgeCheck,
  Boxes,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Cloud,
  Database,
  FileLock2,
  Globe2,
  HardDrive,
  Headphones,
  KeyRound,
  Laptop,
  LifeBuoy,
  LockKeyhole,
  Mail,
  Network,
  RefreshCcw,
  Server,
  ShieldCheck,
  Smartphone,
  Users,
  Workflow,
};

export const imageBank = {
  dataCenter: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2200&q=85",
  network: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2200&q=85",
  cyber: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=2200&q=85",
  team: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2200&q=85",
  servers: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=85",
  ops: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=85",
  dashboard: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=85",
  cloud: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=85",
};

const now = "2026-09-21T12:00:00.000Z";

const productData: Product[] = [
  ["central-backup-server", "Central Backup Server", "Server", "A unified web console for administrators and MSPs to orchestrate every protected workload.", "Command every backup job, retention policy, restore point and customer tenant from one clean control plane.", "From $399/mo"],
  ["backup-client", "Backup Client for Servers & Workstations", "Laptop", "Lightweight endpoint protection for Windows, Linux and macOS devices.", "Quiet, policy-driven agents keep laptops, workstations and branch servers restorable without slowing teams down.", "From $12/device"],
  ["microsoft-365-google-workspace-backup", "Microsoft 365 & Google Workspace Backup", "Cloud", "Granular cloud app backup for mailboxes, drives, chats and shared workspaces.", "Protect SaaS collaboration data from deletion, ransomware and retention gaps with fast item-level restore.", "From $5/user"],
  ["virtual-machine-backup", "Virtual Machine Backup", "Boxes", "Image-level backup for VMware, Hyper-V and Proxmox environments.", "Recover full VMs, disks or files quickly with deduplicated storage and verified restore points.", "Custom quote"],
  ["database-backup", "Database Backup", "Database", "Application-aware database backup for critical transactional systems.", "Protect MySQL, MariaDB, Oracle, SQL Server and PostgreSQL with encrypted, schedule-aware policies.", "Custom quote"],
  ["nas-backup-agent", "NAS Backup Agent", "HardDrive", "Direct protection for Synology and QNAP network storage.", "Back up shared folders, snapshots and NAS workloads to cloud, object storage or your own repository.", "From $49/site"],
  ["mobile-backup-app", "Mobile Backup App", "Smartphone", "Simple mobile backup for Android and iOS field teams.", "Secure contacts, media and business documents from phones and tablets with centralized controls.", "From $6/user"],
].map((item, index) => ({
  id: `product-${index + 1}`,
  slug: item[0],
  title: item[1],
  icon: item[2],
  shortDescription: item[3],
  body: item[4],
  image: [imageBank.servers, imageBank.dashboard, imageBank.cloud, imageBank.dataCenter][index % 4] ?? imageBank.servers,
  status: "published" as const,
  order: index + 1,
  seoTitle: `${item[1]} | Micronics Devlon`,
  seoDescription: item[3],
  createdAt: now,
  updatedAt: now,
  price: item[5],
  platforms: ["Windows", "Linux", "Cloud", "Object Storage"],
  features: ["Policy automation", "AES-256 encryption", "Immutable retention", "Granular restore", "Deduplicated storage", "Automatic restore tests"],
  requirements: [
    { label: "Management", value: "Browser-based console with secure administrator access" },
    { label: "Storage", value: "Local disk, NAS, private cloud or S3-compatible object storage" },
    { label: "Network", value: "Outbound HTTPS connectivity for agents and reports" },
  ],
  faqs: [
    { question: "Can we test restores before buying?", answer: "Yes. Trial workspaces include guided restore validation and sample policies." },
    { question: "Is data encrypted before transfer?", answer: "Yes. Backup data is encrypted in transit and at rest with policy-level key controls." },
  ],
  related: ["managed-backup-as-a-service", "ransomware-protection"],
}));

const services: Service[] = [
  ["managed-backup-as-a-service", "Managed Backup-as-a-Service", "ShieldCheck", "A fully managed backup program operated by recovery specialists."],
  ["backup-infrastructure-as-a-service", "Backup Infrastructure as a Service", "Server", "Dedicated backup infrastructure without building and maintaining it yourself."],
  ["installation-configuration", "Installation & Configuration", "Workflow", "Expert rollout for policies, agents, repositories and administrator training."],
  ["encryption-key-recovery", "Encryption Key Recovery", "KeyRound", "Structured recovery assistance for protected vault and encryption key workflows."],
  ["server-upgrade-service", "Server Upgrade Service", "RefreshCcw", "Planned upgrades that keep protection online while environments modernize."],
  ["backup-app-branding", "Backup App Branding", "BadgeCheck", "White-label backup experiences for MSPs and technology providers."],
  ["custom-branded-installer", "Custom Branded Installer", "Boxes", "Packaged installers tuned to your customer onboarding model."],
  ["product-comparison", "Product Comparison", "ChartNoAxesCombined", "Compare protection options, operational effort and restore coverage."],
].map((item, index) => ({
  id: `service-${index + 1}`,
  slug: item[0],
  title: item[1],
  icon: item[2],
  shortDescription: item[3],
  body: "Micronics Devlon combines practical implementation, monitoring discipline and recovery-first planning to keep operations resilient.",
  image: [imageBank.team, imageBank.dataCenter, imageBank.ops][index % 3] ?? imageBank.team,
  status: "published" as const,
  order: index + 1,
  seoTitle: `${item[1]} | Micronics Devlon Services`,
  seoDescription: item[3],
  createdAt: now,
  updatedAt: now,
  included: ["Discovery workshop", "Protection design", "Implementation", "Restore validation", "Operational handoff"],
  process: ["Assess", "Design", "Deploy", "Validate"],
  audience: ["IT teams", "MSPs", "Compliance-led organizations"],
  faqs: [{ question: "How fast can we start?", answer: "Most engagements start with an assessment and pilot protection plan within days." }],
}));

const solutionTitles = [
  ["small-business-backup", "Small Business Backup", "BriefcaseBusiness", "Simple protection for lean teams without backup specialists."],
  ["msp-backup", "MSP Backup", "Users", "Multi-tenant backup operations built for service providers."],
  ["enterprise-backup", "Enterprise Backup", "Network", "Governed backup programs for distributed, compliance-sensitive estates."],
  ["cloud-application-backup", "Cloud Application Backup", "Cloud", "Protection for SaaS collaboration and cloud-hosted data."],
  ["ransomware-protection", "Ransomware Protection", "FileLock2", "Immutable restore points and rapid clean recovery after attack."],
  ["disaster-recovery", "Disaster Recovery", "LifeBuoy", "Practical recovery runbooks for outages and regional disruptions."],
];

const platformTitles = [
  "Microsoft 365", "Exchange", "SharePoint", "OneDrive", "Teams", "Google Workspace", "VMware", "Hyper-V", "Proxmox", "MySQL", "MariaDB", "Oracle", "SQL Server", "PostgreSQL", "Windows", "Linux", "Synology NAS", "QNAP NAS", "Amazon S3", "Mobile",
];

export const initialData: AppData = {
  heroSlides: [
    { id: "hero-1", title: "Data Center Resilience", slug: "data-center-resilience", headline: "Enterprise Backup That Recovers When It Matters", keyword: "Backup", subheading: "Protect servers, SaaS apps, databases and endpoints with one recovery-first platform.", primaryCta: "Start Free Trial", primaryLink: "/free-trial", secondaryCta: "Explore Products", secondaryLink: "/products", image: imageBank.dataCenter, alt: "Modern data center with glowing server racks", order: 1, active: true, status: "published", seoTitle: "Enterprise Backup Software", seoDescription: "Backup software for business resilience.", createdAt: now, updatedAt: now },
    { id: "hero-2", title: "Cloud Continuity", slug: "cloud-continuity", headline: "Cloud Workloads Protected Across Every Team", keyword: "Protection", subheading: "Secure Microsoft 365, Google Workspace and cloud repositories from accidental loss and attack.", primaryCta: "Request a Demo", primaryLink: "/contact", secondaryCta: "Cloud Solutions", secondaryLink: "/solutions/cloud-application-backup", image: imageBank.network, alt: "Abstract blue cloud and network connections", order: 2, active: true, status: "published", seoTitle: "Cloud Backup", seoDescription: "Cloud backup and recovery.", createdAt: now, updatedAt: now },
    { id: "hero-3", title: "Ransomware Recovery", slug: "ransomware-recovery", headline: "Immutable Recovery Points Against Ransomware", keyword: "Recovery", subheading: "Layer encryption, retention locks and tested restores into every protection policy.", primaryCta: "See Protection", primaryLink: "/solutions/ransomware-protection", secondaryCta: "Talk to an Expert", secondaryLink: "/contact", image: imageBank.cyber, alt: "Cybersecurity padlock with digital glow", order: 3, active: true, status: "published", seoTitle: "Ransomware Recovery", seoDescription: "Immutable ransomware recovery.", createdAt: now, updatedAt: now },
    { id: "hero-4", title: "Managed Operations", slug: "managed-operations", headline: "Backup Operations Your Team Can Trust", keyword: "Backup", subheading: "Give administrators and MSPs a clean command center for monitoring, reporting and restore readiness.", primaryCta: "View Services", primaryLink: "/services", secondaryCta: "Compare Plans", secondaryLink: "/pricing", image: imageBank.team, alt: "IT team working with dashboards", order: 4, active: true, status: "published", seoTitle: "Managed Backup", seoDescription: "Managed backup operations.", createdAt: now, updatedAt: now },
  ],
  products: productData,
  services,
  solutions: solutionTitles.map((item, index) => ({ id: `solution-${index + 1}`, slug: item[0], title: item[1], icon: item[2], shortDescription: item[3], body: "A practical protection blueprint with policies, restore workflows and reporting built around your operating model.", image: [imageBank.cyber, imageBank.dashboard, imageBank.cloud][index % 3] ?? imageBank.cyber, status: "published", order: index + 1, seoTitle: `${item[1]} | Micronics Devlon`, seoDescription: item[3], createdAt: now, updatedAt: now, benefits: ["Faster restores", "Lower operational risk", "Clear compliance evidence", "Predictable growth"] })),
  features: [
    ["immutable-backup", "Immutable backup", "FileLock2", "Lock restore points from tampering and ransomware impact."],
    ["aes-256-encryption", "AES-256 encryption", "LockKeyhole", "Encrypt data before it moves and keep keys under control."],
    ["two-factor-access", "Two-factor access", "ShieldCheck", "Protect console access with strong administrative controls."],
    ["deduplication", "Deduplication", "ArchiveRestore", "Reduce storage growth with efficient block-level dedupe."],
    ["granular-restore", "Fast granular restore", "RefreshCcw", "Recover files, mailboxes, records and machines quickly."],
    ["restore-testing", "Automatic restore testing", "BadgeCheck", "Prove backups are usable before an incident happens."],
  ].map((item, index) => ({ id: `feature-${index + 1}`, slug: item[0], title: item[1], icon: item[2], shortDescription: item[3], body: item[3], image: imageBank.dashboard, status: "published" as const, order: index + 1, seoTitle: `${item[1]} | Micronics Devlon`, seoDescription: item[3], createdAt: now, updatedAt: now })),
  platforms: platformTitles.map((title, index) => ({ id: `platform-${index + 1}`, title, slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), icon: index < 6 ? "Cloud" : index < 14 ? "Database" : index < 18 ? "HardDrive" : index === 18 ? "Globe2" : "Smartphone", category: index < 6 ? "SaaS" : index < 9 ? "Virtualization" : index < 14 ? "Databases" : index < 18 ? "Systems & NAS" : "Cloud & Mobile", shortDescription: `Reliable backup and recovery for ${title} environments.`, body: `Micronics Devlon protects ${title} with encrypted backups, flexible schedules, restore verification and clear reporting.`, image: [imageBank.cloud, imageBank.servers, imageBank.dashboard][index % 3] ?? imageBank.cloud, status: "published", order: index + 1, seoTitle: `Backup for ${title} | Micronics Devlon`, seoDescription: `Backup and recovery for ${title}.`, createdAt: now, updatedAt: now, benefits: ["Policy-based protection", "Fast restore", "Encrypted storage", "Clear reporting"] })),
  pricingPlans: [
    { id: "plan-1", title: "Essentials", slug: "essentials", shortDescription: "Core protection for growing teams.", body: "Simple, reliable backup coverage.", icon: "ShieldCheck", image: imageBank.dashboard, status: "published", order: 1, seoTitle: "Essentials Plan", seoDescription: "Core backup plan.", createdAt: now, updatedAt: now, price: "$199", cadence: "/mo", features: ["25 protected devices", "Daily backup reports", "Email support"] },
    { id: "plan-2", title: "Professional", slug: "professional", shortDescription: "The most complete protection package.", body: "Best for operational teams.", icon: "BadgeCheck", image: imageBank.dataCenter, status: "published", order: 2, seoTitle: "Professional Plan", seoDescription: "Popular backup plan.", createdAt: now, updatedAt: now, price: "$499", cadence: "/mo", popular: true, features: ["100 protected devices", "SaaS and VM backup", "Restore testing", "Priority support"] },
    { id: "plan-3", title: "Enterprise", slug: "enterprise", shortDescription: "Custom controls for complex estates.", body: "Tailored resilience for large organizations.", icon: "Network", image: imageBank.ops, status: "published", order: 3, seoTitle: "Enterprise Plan", seoDescription: "Enterprise backup plan.", createdAt: now, updatedAt: now, price: "Custom", cadence: "", features: ["Unlimited policies", "Dedicated onboarding", "Custom retention", "Executive reporting"] },
  ],
  faqs: ["How quickly can we restore data?", "Can we keep copies in our own storage?", "Do you support MSP tenants?", "Can administrators test recovery automatically?"].map((question, index) => ({ id: `faq-${index + 1}`, title: question, slug: `faq-${index + 1}`, question, answer: "Yes. Micronics Devlon is designed around clear restore workflows, encrypted storage and operational proof that backups can be recovered.", category: "General", icon: "LifeBuoy", image: imageBank.dashboard, shortDescription: question, body: question, status: "published", order: index + 1, seoTitle: question, seoDescription: question, createdAt: now, updatedAt: now })),
  testimonials: [
    { id: "test-1", title: "Northstar Logistics", slug: "northstar-logistics", quote: "Micronics Devlon turned backup from a weekly worry into a daily confidence signal.", person: "Avery Morgan", company: "Northstar Logistics", icon: "Users", image: imageBank.team, shortDescription: "Operations testimonial", body: "Reliable recovery operations.", status: "published", order: 1, seoTitle: "Northstar Logistics", seoDescription: "Customer story.", createdAt: now, updatedAt: now },
    { id: "test-2", title: "BluePeak MSP", slug: "bluepeak-msp", quote: "The console gives our engineers fast visibility across client environments.", person: "Maya Chen", company: "BluePeak MSP", icon: "BriefcaseBusiness", image: imageBank.dashboard, shortDescription: "MSP testimonial", body: "Multi-tenant confidence.", status: "published", order: 2, seoTitle: "BluePeak MSP", seoDescription: "Customer story.", createdAt: now, updatedAt: now },
  ],
  posts: ["Recovery Readiness Checklist", "SaaS Backup Buyer Guide", "Immutable Backup Planning"].map((title, index) => ({ id: `post-${index + 1}`, title, slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), category: index === 0 ? "Guide" : "Insight", readTime: `${5 + index} min read`, icon: "FileLock2", image: [imageBank.dashboard, imageBank.cloud, imageBank.cyber][index] ?? imageBank.dashboard, shortDescription: "A practical guide for resilient backup programs.", body: "Build a recovery program around business impact, tested restore paths, secure storage and plain-language reporting.", status: "published", order: index + 1, seoTitle: `${title} | Micronics Devlon`, seoDescription: "Backup and data protection guidance.", createdAt: now, updatedAt: now })),
  leads: [
    { id: "lead-1", type: "demo", name: "Jordan Lee", email: "jordan@example.com", company: "Atlas Group", message: "Interested in Microsoft 365 backup.", status: "new", notes: "Requested pricing call.", createdAt: "2026-09-18T10:00:00.000Z" },
    { id: "lead-2", type: "quote", name: "Priya Raman", email: "priya@example.com", company: "North Clinic", message: "Need database and VM backup quote.", status: "qualified", notes: "Healthcare requirements.", createdAt: "2026-09-20T09:30:00.000Z" },
  ],
  newsletter: [{ id: "news-1", email: "ops@example.com", createdAt: now }],
  media: [],
  settings: { companyName: "Micronics Devlon", tagline: "Backup, recovery and data protection with operational proof.", contactEmail: "hello@micronicsdevlon.com", phone: "+1 (555) 014-2026", address: "Los Angeles, CA", footerText: "Resilient backup operations for modern infrastructure.", defaultTheme: "system", maintenanceMode: false, socials: [{ label: "LinkedIn", url: "#" }, { label: "X", url: "#" }] },
  users: [
    { id: "user-1", name: "Vishwa Admin", email: "admin@micronicsdevlon.com", role: "Owner", active: true, createdAt: now },
    { id: "user-2", name: "Demo Editor", email: "editor@micronicsdevlon.com", role: "Editor", active: true, createdAt: now },
  ],
  activity: [{ id: "activity-1", actor: "System", action: "Initialized", target: "Demo content", createdAt: now }],
};
