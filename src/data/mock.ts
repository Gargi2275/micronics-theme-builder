import {
  Activity,
  ArchiveRestore,
  BadgeCheck,
  Boxes,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  CheckCircle2,
  Cloud,
  Database,
  FileCheck,
  FileLock2,
  Globe2,
  HardDrive,
  Headphones,
  KeyRound,
  Laptop,
  Layers,
  LifeBuoy,
  Lock,
  LockKeyhole,
  Mail,
  Network,
  Radio,
  RefreshCcw,
  RefreshCw,
  Server,
  ShieldCheck,
  Sliders,
  Smartphone,
  Sparkles,
  Star,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type Status = "draft" | "published";
export type LeadStatus = "new" | "contacted" | "qualified" | "closed";
export type ContentType =
  | "products"
  | "services"
  | "solutions"
  | "features"
  | "platforms"
  | "pricingPlans"
  | "faqs"
  | "testimonials"
  | "posts"
  | "heroSlides";

export interface HeroSlide {
  id: string;
  title: string;
  slug: string;
  category?: string | undefined;
  starred?: boolean | undefined;
  badge?: string | undefined;
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
  category?: string | undefined;
  starred?: boolean | undefined;
  badge?: string | undefined;
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
  Activity,
  ArchiveRestore,
  BadgeCheck,
  Boxes,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  CheckCircle2,
  Cloud,
  Database,
  FileCheck,
  FileLock2,
  Globe2,
  HardDrive,
  Headphones,
  KeyRound,
  Laptop,
  Layers,
  LifeBuoy,
  Lock,
  LockKeyhole,
  Mail,
  Network,
  Radio,
  RefreshCcw,
  RefreshCw,
  Server,
  ShieldCheck,
  Sliders,
  Smartphone,
  Sparkles,
  Star,
  Users,
  Workflow,
  Zap,
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

function makeSlug(name: string) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// 1. PRODUCTS
const rawProducts: [string, string, string, string, string, string][] = [
  ["central-backup-server", "Central Backup Server", "Server", "A unified web console for administrators and MSPs to orchestrate every protected workload.", "Command every backup job, retention policy, restore point and customer tenant from one clean control plane.", "From $399/mo"],
  ["backup-client", "Backup Client for Servers & Workstations", "Laptop", "Lightweight endpoint protection for Windows, Linux and macOS devices.", "Quiet, policy-driven agents keep laptops, workstations and branch servers restorable without slowing teams down.", "From $12/device"],
  ["microsoft-365-google-workspace-backup", "Microsoft 365 & Google Workspace Backup", "Cloud", "Granular cloud app backup for mailboxes, drives, chats and shared workspaces.", "Protect SaaS collaboration data from deletion, ransomware and retention gaps with fast item-level restore.", "From $5/user"],
  ["virtual-machine-backup", "Virtual Machine Backup", "Boxes", "Image-level backup for VMware, Hyper-V and Proxmox environments.", "Recover full VMs, disks or files quickly with deduplicated storage and verified restore points.", "Custom quote"],
  ["database-backup", "Database Backup", "Database", "Application-aware database backup for critical transactional systems.", "Protect MySQL, MariaDB, Oracle, SQL Server and PostgreSQL with encrypted, schedule-aware policies.", "Custom quote"],
  ["nas-backup-agent", "NAS Backup Agent", "HardDrive", "Direct protection for Synology and QNAP network storage.", "Back up shared folders, snapshots and NAS workloads to cloud, object storage or your own repository.", "From $49/site"],
  ["mobile-backup-app", "Mobile Backup App", "Smartphone", "Simple mobile backup for Android and iOS field teams.", "Secure contacts, media and business documents from phones and tablets with centralized controls.", "From $6/user"],
];


const products: Product[] = rawProducts.map((item, index) => ({
  id: `product-${index + 1}`,
  slug: item[0],
  title: item[1],
  icon: item[2],
  shortDescription: item[3],
  body: item[4],
  image: [imageBank.servers, imageBank.dashboard, imageBank.cloud, imageBank.dataCenter][index % 4] ?? imageBank.servers,
  status: "published",
  order: index + 1,
  seoTitle: `${item[1]} | Micronics Devlon`,
  seoDescription: item[3],
  createdAt: now,
  updatedAt: now,
  price: item[5],
  platforms: ["Windows", "Linux", "Cloud", "Object Storage"],
  features: [
    "Policy automation",
    "AES-256 encryption",
    "Immutable retention",
    "Granular restore",
    "Deduplicated storage",
    "Automatic restore tests",
  ],
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

// 2. SOLUTIONS (Matching Image 1 Reference)
const rawSolutions = [
  // Cloud Applications Backup
  { title: "Google Workspace", category: "Cloud Applications Backup", starred: true, icon: "Cloud", desc: "Complete backup for Gmail, Google Drive, Shared Drives, Contacts, and Calendar." },
  { title: "Microsoft 365 & Teams", category: "Cloud Applications Backup", starred: true, icon: "Cloud", desc: "Granular protection for Exchange Online, SharePoint, OneDrive for Business, and Microsoft Teams." },
  { title: "Google Cloud Storage", category: "Cloud Applications Backup", starred: false, icon: "Cloud", desc: "Automated bucket-to-bucket backup and cross-region replication for Google Cloud data." },
  { title: "Google Drive", category: "Cloud Applications Backup", starred: false, icon: "Cloud", desc: "Continuous file versioning and accidental deletion recovery for enterprise Google Drive users." },
  { title: "Microsoft Azure", category: "Cloud Applications Backup", starred: false, icon: "Cloud", desc: "Cloud backup for Azure VMs, blob containers, Azure Files, and enterprise databases." },
  { title: "OneDrive", category: "Cloud Applications Backup", starred: false, icon: "Cloud", desc: "Direct endpoint and cloud sync backup for user OneDrive folders with point-in-time rollback." },
  { title: "Amazon S3", category: "Cloud Applications Backup", starred: false, icon: "Cloud", desc: "Immutable replication and versioning for S3 buckets with cross-account air-gapping." },
  { title: "AWS S3 compatible storage", category: "Cloud Applications Backup", starred: false, icon: "Cloud", desc: "Connect any S3-compatible object storage (Wasabi, MinIO, Backblaze) for low-cost vaulting." },
  { title: "Dropbox", category: "Cloud Applications Backup", starred: false, icon: "Cloud", desc: "Automated retention and ransomware rollback for Dropbox Business accounts and team folders." },
  { title: "Wasabi", category: "Cloud Applications Backup", starred: false, icon: "Cloud", desc: "Hot cloud storage destination with zero egress fees and automated immutable locking." },
  { title: "OpenStack", category: "Cloud Applications Backup", starred: false, icon: "Cloud", desc: "Private cloud snapshotting and block storage volume backup for OpenStack environments." },
  { title: "Rackspace", category: "Cloud Applications Backup", starred: false, icon: "Cloud", desc: "Protected hybrid storage and dedicated server backups hosted on Rackspace." },
  { title: "Backblaze B2", category: "Cloud Applications Backup", starred: false, icon: "Cloud", desc: "Cost-effective offsite cloud storage with strict WORM compliance guarantees." },
  { title: "FTP Server", category: "Cloud Applications Backup", starred: false, icon: "Server", desc: "Scheduled legacy FTP data backups with automated compression and remote copy." },
  { title: "SFTP Server", category: "Cloud Applications Backup", starred: false, icon: "Server", desc: "Secure shell encrypted transfers for Linux hosts and remote automated repository backups." },

  // Onsite Systems Backup
  { title: "Proxmox VE", category: "Onsite Systems Backup", starred: true, icon: "Server", desc: "Host-level agentless backup for Proxmox virtual machines and LXC containers." },
  { title: "Hyper-V", category: "Onsite Systems Backup", starred: false, icon: "Boxes", desc: "Cluster-aware VSS image backups for Microsoft Hyper-V hosts with instant VM Run Direct." },
  { title: "VMware", category: "Onsite Systems Backup", starred: false, icon: "Boxes", desc: "vSphere & ESXi CBT-enabled image protection with granular file and full VM instant restore." },
  { title: "Synology & QNAP NAS", category: "Onsite Systems Backup", starred: false, icon: "HardDrive", desc: "Native embedded package protection for Synology DSM and QNAP QTS network appliances." },
  { title: "Linux Bare Metal Backup", category: "Onsite Systems Backup", starred: false, icon: "Server", desc: "Complete system state image capture for Ubuntu, RHEL, CentOS, Debian and Rocky Linux." },
  { title: "Microsoft Exchange Database", category: "Onsite Systems Backup", starred: false, icon: "Database", desc: "Hot VSS transaction log truncation and database recovery for Exchange 2016, 2019 & Hybrid." },
  { title: "Microsoft Exchange Mailbox", category: "Onsite Systems Backup", starred: false, icon: "Mail", desc: "Item-level message, folder, and calendar recovery without restoring the entire database." },
  { title: "Microsoft SQL Server", category: "Onsite Systems Backup", starred: false, icon: "Database", desc: "Full, differential, and transaction log backup for SQL Server 2014-2022 with point-in-time restore." },
  { title: "Oracle", category: "Onsite Systems Backup", starred: false, icon: "Database", desc: "Oracle RMAN integrated online backup with archive log management and tablespace restore." },
  { title: "MySQL", category: "Onsite Systems Backup", starred: false, icon: "Database", desc: "Hot logical and physical binary backup for MySQL instances with zero service disruption." },
  { title: "MariaDB", category: "Onsite Systems Backup", starred: false, icon: "Database", desc: "Non-blocking snapshot backups for MariaDB database clusters and Galera nodes." },
  { title: "PostgreSQL", category: "Onsite Systems Backup", starred: false, icon: "Database", desc: "Continuous archiving and Point-in-Time Recovery (PITR) for PostgreSQL 12-17." },
  { title: "Tibero", category: "Onsite Systems Backup", starred: false, icon: "Database", desc: "Enterprise RDBMS protection for TmaxSoft Tibero transactional architectures." },
  { title: "Windows System Backup", category: "Onsite Systems Backup", starred: false, icon: "Laptop", desc: "Complete image backup for Windows 10/11 and Windows Server 2016-2025." },
  { title: "Windows System State", category: "Onsite Systems Backup", starred: false, icon: "Laptop", desc: "Active Directory, registry, boot files and certificate services system state capture." },
  { title: "Servers / Desktops / Notebooks", category: "Onsite Systems Backup", starred: false, icon: "Laptop", desc: "Centralized policy management for physical workstations, laptops and remote workforce endpoints." },
  { title: "File", category: "Onsite Systems Backup", starred: false, icon: "FileCheck", desc: "High-speed multi-threaded file and folder backup with delta deduplication." },

  // Personal Backup (FREE)
  { title: "Mobile Phones / Tablets", category: "Personal Backup (FREE)", starred: false, icon: "Smartphone", desc: "Automatic photo, video, contact and document backup for iOS and Android devices." },
  { title: "Home Computers", category: "Personal Backup (FREE)", starred: false, icon: "Laptop", desc: "Simple scheduled protection for home laptops, personal documents and family archives." },
];

const solutions: Solution[] = rawSolutions.map((item, index) => ({
  id: `solution-${index + 1}`,
  slug: makeSlug(item.title),
  title: item.title,
  category: item.category,
  starred: item.starred,
  badge: item.starred ? "Featured" : undefined,
  icon: item.icon,
  shortDescription: item.desc,
  body: `Comprehensive, enterprise-grade protection for ${item.title}. Engineered with automated scheduling, end-to-end encryption, deduplicated storage, and instant recovery readiness.`,
  image: [imageBank.cyber, imageBank.dataCenter, imageBank.cloud, imageBank.network][index % 4] ?? imageBank.cyber,
  status: "published",
  order: index + 1,
  seoTitle: `${item.title} Backup Solution | Micronics Devlon`,
  seoDescription: item.desc,
  createdAt: now,
  updatedAt: now,
  benefits: ["Sub-second restore readiness", "AES-256 encryption at rest and in flight", "WORM immutable retention policy", "Centralized policy management"],
}));

// 3. FEATURES (Matching Image 2 Reference)
const rawFeatures = [
  // New
  { title: "Auto-renewal of SSL Certificates", category: "New", starred: true, icon: "ShieldCheck", desc: "Automated Let's Encrypt SSL certificate provisioning and renewal for backup servers." },
  { title: "Immutable Backup", category: "New", starred: true, icon: "Lock", desc: "Cryptographic retention locks on local disk and cloud vaults to defeat ransomware attacks." },
  { title: "Restore Drill", category: "New", starred: false, icon: "Zap", desc: "Automated background restore validation and virtual machine boot verification." },
  { title: "Data Deduplication", category: "New", starred: false, icon: "Database", desc: "Global source and target deduplication saving up to 90% of repository storage space." },
  { title: "Microsoft Teams", category: "New", starred: false, icon: "Cloud", desc: "Full backup and granular restore for Teams channels, chats, attachments, and files." },
  { title: "Application aware VM backup", category: "New", starred: false, icon: "Boxes", desc: "Consistent VSS application snapshots for database servers running inside VMs." },
  { title: "Online File Restorer", category: "New", starred: false, icon: "Globe2", desc: "Browser-based self-service file portal allowing end-users to search and restore files." },
  { title: "Real Time Network Monitor", category: "New", starred: false, icon: "Activity", desc: "Live bandwidth throughput graphs, storage utilization, and agent health telemetry." },

  // Highlights
  { title: "Anywhere-to-anywhere backup", category: "Highlights", starred: false, icon: "Globe2", desc: "Transfer data seamlessly between on-premise, cloud, and hybrid multi-destination targets." },
  { title: "Live VM Migration", category: "Highlights", starred: false, icon: "Boxes", desc: "Migrate running VMs between disparate hypervisors without service downtime." },
  { title: "VM Run Direct", category: "Highlights", starred: false, icon: "Zap", desc: "Instantly power on protected VMs directly from backup storage in under 2 minutes." },
  { title: "Granular Restore", category: "Highlights", starred: false, icon: "FileCheck", desc: "Restore single emails, database tables, or individual files without full image recovery." },
  { title: "Continuous Data Protection (CDP)", category: "Highlights", starred: false, icon: "RefreshCw", desc: "Near-zero RPO continuous tracking capturing file modifications the moment they happen." },
  { title: "Two-Factor Authentication (2FA)", category: "Highlights", starred: false, icon: "KeyRound", desc: "Enforce TOTP and security key multi-factor authentication across all admin consoles." },
  { title: "OpenDirect", category: "Highlights", starred: false, icon: "Radio", desc: "Direct file stream access allowing instant extraction of uncompressed disk images." },
  { title: "Bandwidth Control", category: "Highlights", starred: false, icon: "Sliders", desc: "Configurable throttle schedules preventing backup traffic from saturating business internet." },
  { title: "Data Integrity Check", category: "Highlights", starred: false, icon: "ShieldCheck", desc: "Automated cyclic checksum checks identifying and repairing bit rot on cold storage." },
  { title: "Multi-destinations backup", category: "Highlights", starred: false, icon: "Layers", desc: "Simultaneously write backup copies to local disk, offsite datacenter, and public cloud." },
  { title: "Backup Android / iOS devices", category: "Highlights", starred: false, icon: "Smartphone", desc: "Centralized policy-driven mobile device backup for field personnel and executives." },

  // General
  { title: "Backup Filter", category: "General", starred: false, icon: "Sliders", desc: "Wildcard, regex, and file attribute inclusion/exclusion filters for tight job control." },
  { title: "Backup Notifications", category: "General", starred: false, icon: "Mail", desc: "Real-time email and webhook alerts for job completions, warnings, and missed schedules." },
  { title: "Backup Scheduling", category: "General", starred: false, icon: "RefreshCcw", desc: "Flexible cron, periodic, and trigger-based schedules for non-intrusive operations." },
  { title: "Cross Platform Support", category: "General", starred: false, icon: "Laptop", desc: "Universal clients for Windows, Linux, macOS, FreeBSD, Synology, and QNAP." },
  { title: "Data Compression", category: "General", starred: false, icon: "Database", desc: "Fast multi-core Zstandard and LZ4 compression algorithms reducing transfer volume." },
  { title: "Data Encryption", category: "General", starred: false, icon: "LockKeyhole", desc: "Military-grade AES-256 encryption with client-side zero-knowledge key isolation." },
  { title: "Data Retention Policy", category: "General", starred: false, icon: "ArchiveRestore", desc: "Grandfather-Father-Son (GFS) and custom retention rules for compliance archives." },
  { title: "Open File Backup", category: "General", starred: false, icon: "FileLock2", desc: "Volume Shadow Copy (VSS) and snapshot drivers for locked and in-use files." },
  { title: "Pre/Post backup command", category: "General", starred: false, icon: "Workflow", desc: "Execute custom PowerShell, bash, or script hooks before and after backup execution." },

  // System Management
  { title: "Branding and Customization", category: "System Management", starred: false, icon: "BadgeCheck", desc: "White-label client installers, custom domains, logo replacement, and custom color themes for MSPs." },
  { title: "Provisioning", category: "System Management", starred: false, icon: "Users", desc: "Automated tenant and user onboarding with preset storage quotas and policy templates." },
  { title: "Group Policy", category: "System Management", starred: false, icon: "Sliders", desc: "Hierarchical policy inheritance enforcing backup standards across thousands of machines." },
  { title: "Auto Update", category: "System Management", starred: false, icon: "RefreshCw", desc: "Silent centralized software update push across all distributed client agents." },
  { title: "Monitoring", category: "System Management", starred: false, icon: "Activity", desc: "Comprehensive dashboard tracking active backup jobs, storage trends, and agent status." },
  { title: "Reporting", category: "System Management", starred: false, icon: "ChartNoAxesCombined", desc: "Executive compliance reports, billing summaries, and audit trail exports." },
  { title: "Load Balancing", category: "System Management", starred: false, icon: "Network", desc: "Cluster multi-node backup servers to distribute concurrent client load evenly." },
  { title: "Data Replication", category: "System Management", starred: false, icon: "RefreshCcw", desc: "Asynchronous replication between primary backup vaults and secondary disaster recovery sites." },
  { title: "RESTful APIs", category: "System Management", starred: false, icon: "Workflow", desc: "Comprehensive API endpoints for automation, billing integration, and custom portal development." },
  { title: "Windows Active Directory Integration", category: "System Management", starred: false, icon: "Users", desc: "Single sign-on (SSO) and automatic user synchronization with Active Directory and LDAP." },
];

const features: BaseItem[] = rawFeatures.map((item, index) => ({
  id: `feature-${index + 1}`,
  slug: makeSlug(item.title),
  title: item.title,
  category: item.category,
  starred: item.starred,
  badge: item.starred ? "New" : undefined,
  icon: item.icon,
  shortDescription: item.desc,
  body: `Feature capabilities for ${item.title}. Engineered for enterprise resilience, simplified administration, and high-performance throughput.`,
  image: imageBank.dashboard,
  status: "published",
  order: index + 1,
  seoTitle: `${item.title} | Micronics Devlon Features`,
  seoDescription: item.desc,
  createdAt: now,
  updatedAt: now,
}));

// 4. SERVICES (Matching Image 3 Reference)
const rawServices = [
  { title: "Micronics DIY Setup", starred: true, icon: "Workflow", desc: "Step-by-step guided self-hosted implementation with policy templates and architecture validation." },
  { title: "Managed Backup-as-a-Service (MBaaS)", starred: true, icon: "ShieldCheck", desc: "A fully managed 24/7 backup program operated by certified recovery specialists." },
  { title: "Micronics Go Backup Service", starred: true, icon: "Zap", desc: "Turnkey cloud backup service with zero server management and automated provisioning." },
  { title: "Product & Architecture Comparison", starred: true, icon: "ChartNoAxesCombined", desc: "Comprehensive technical review comparing protection options, operational effort, and recovery speed." },
  { title: "Backup Infrastructure as a Service (BaaS)", starred: false, icon: "Server", desc: "Dedicated high-performance backup infrastructure without building and maintaining physical hardware." },
  { title: "Installation & Configuration", starred: false, icon: "Workflow", desc: "Expert on-site or remote rollout for policies, agents, repositories, and administrator training." },
  { title: "Encryption Key Recovery", starred: false, icon: "KeyRound", desc: "Structured recovery assistance for protected vault and encryption key disaster scenarios." },
  { title: "Central Server Upgrade Service", starred: false, icon: "RefreshCcw", desc: "Planned zero-downtime upgrades keeping protection online while environments modernize." },
  { title: "Backup App Branding Service", starred: false, icon: "BadgeCheck", desc: "White-label client applications with your company logo, icons, brand colors, and portal URLs." },
  { title: "Build My Branded Installer Service", starred: false, icon: "Boxes", desc: "Custom packaged installers tuned to your customer onboarding and MSP distribution model." },
];

const services: Service[] = rawServices.map((item, index) => ({
  id: `service-${index + 1}`,
  slug: makeSlug(item.title),
  title: item.title,
  starred: item.starred,
  badge: item.starred ? "Popular" : undefined,
  icon: item.icon,
  shortDescription: item.desc,
  body: `Professional service engagement for ${item.title}. Micronics Devlon combines practical implementation, monitoring discipline, and recovery-first planning to keep operations resilient.`,
  image: [imageBank.team, imageBank.dataCenter, imageBank.ops][index % 3] ?? imageBank.team,
  status: "published",
  order: index + 1,
  seoTitle: `${item.title} | Micronics Devlon Services`,
  seoDescription: item.desc,
  createdAt: now,
  updatedAt: now,
  included: ["Technical consultation", "Architecture blueprint", "Implementation & rollout", "Restore validation drills", "Operational handoff & docs"],
  process: ["Discovery & Assessment", "Design Architecture", "Deploy & Configure", "Validate & Drill", "24/7 Handover"],
  audience: ["IT Directors", "MSPs & Hosting Providers", "Compliance Officers", "Enterprise Infrastructure Teams"],
  faqs: [
    { question: "How fast can we start this service?", answer: "Most service engagements begin with an assessment and pilot protection plan within 1-3 business days." },
    { question: "Do you offer SLA guarantees?", answer: "Yes. All managed service plans include formal recovery time (RTO) and recovery point (RPO) SLAs." },
  ],
}));

// 5. PLATFORMS & WORKLOADS (Matching Image 4 "bottom linl")
const rawPlatforms = [
  { title: "Microsoft 365", category: "SaaS & Cloud", icon: "Cloud", desc: "Exchange, SharePoint, OneDrive and Teams cloud backup." },
  { title: "Microsoft Teams", category: "SaaS & Cloud", icon: "Cloud", desc: "Channel chats, files, tabs and team settings protection." },
  { title: "OneDrive", category: "SaaS & Cloud", icon: "Cloud", desc: "Point-in-time file recovery for cloud business drives." },
  { title: "Outlook", category: "SaaS & Cloud", icon: "Mail", desc: "Mailbox, contacts, calendar and archive retention." },
  { title: "Microsoft Exchange Mail-Level", category: "SaaS & Cloud", icon: "Mail", desc: "Granular mailbox and individual email item restoration." },
  { title: "SharePoint", category: "SaaS & Cloud", icon: "Cloud", desc: "Document libraries, lists and permissions backup." },
  { title: "Microsoft Exchange", category: "Databases & Servers", icon: "Database", desc: "Exchange Server database and VSS transaction log capture." },
  { title: "Microsoft SQL", category: "Databases & Servers", icon: "Database", desc: "Full, diff and log backup for MS SQL Server instances." },
  { title: "Hyper-V", category: "Virtualization", icon: "Boxes", desc: "Agentless VM cluster and snapshot image protection." },
  { title: "VMware", category: "Virtualization", icon: "Boxes", desc: "vSphere ESXi CBT backups with instant VM direct mount." },
  { title: "MySQL", category: "Databases & Servers", icon: "Database", desc: "Consistent binary and logical dumps for MySQL." },
  { title: "MariaDB", category: "Databases & Servers", icon: "Database", desc: "Hot database backup for MariaDB and Galera clusters." },
  { title: "Oracle", category: "Databases & Servers", icon: "Database", desc: "RMAN integrated tablespace and archive log backup." },
  { title: "Synology", category: "NAS & Systems", icon: "HardDrive", desc: "Native DSM package backup for Synology NAS arrays." },
  { title: "QNAP", category: "NAS & Systems", icon: "HardDrive", desc: "QTS appliance protection for QNAP network storage." },
  { title: "Backup cloud data", category: "SaaS & Cloud", icon: "Cloud", desc: "Cross-cloud multi-region repository replication." },
  { title: "Google Drive", category: "SaaS & Cloud", icon: "Cloud", desc: "Continuous versioning for Google Workspace files." },
  { title: "Amazon S3", category: "SaaS & Cloud", icon: "Cloud", desc: "Immutable bucket replication and object lock storage." },
  { title: "Mobile", category: "Endpoints", icon: "Smartphone", desc: "Android and iOS mobile contact, photo and file backup." },
  { title: "NAS / SAN", category: "NAS & Systems", icon: "HardDrive", desc: "Block and file storage snapshots for enterprise storage." },
  { title: "File", category: "Endpoints", icon: "FileCheck", desc: "Fast multi-threaded file and folder backup." },
  { title: "PC, Mac, Linux", category: "Endpoints", icon: "Laptop", desc: "Cross-platform endpoint protection for user computers." },
  { title: "Windows System State", category: "Databases & Servers", icon: "Server", desc: "Active Directory and system state bare metal recovery." },
  { title: "Windows System", category: "Databases & Servers", icon: "Laptop", desc: "Full disk image capture for Windows Server and client." },
  { title: "MSP Backup", category: "Managed Services", icon: "Users", desc: "Multi-tenant console for managed service providers." },
  { title: "Remote Backup", category: "Managed Services", icon: "Globe2", desc: "Secure encrypted transfers for remote branch offices." },
  { title: "Online Backup", category: "Managed Services", icon: "Cloud", desc: "Automatic background protection to cloud repositories." },
  { title: "Offsite Backup", category: "Managed Services", icon: "ArchiveRestore", desc: "Air-gapped secondary offsite vault protection." },
  { title: "Dropbox", category: "SaaS & Cloud", icon: "Cloud", desc: "Team folder retention and rollback for Dropbox." },
  { title: "Google Workspace", category: "SaaS & Cloud", icon: "Cloud", desc: "Complete Gmail, Drive, Calendar and Contacts backup." },
  { title: "Linux Bare Metal", category: "Databases & Servers", icon: "Server", desc: "Full bare metal image restore for enterprise Linux." },
  { title: "PostgreSQL", category: "Databases & Servers", icon: "Database", desc: "WAL archiving and PITR for PostgreSQL databases." },
  { title: "Proxmox VE", category: "Virtualization", icon: "Server", desc: "VM and LXC container protection for Proxmox clusters." },
  { title: "Data center not exposed", category: "Security", icon: "ShieldCheck", desc: "Zero outbound port requirements for isolated data centers." },
  { title: "Immutable Backup", category: "Security", icon: "Lock", desc: "WORM compliant retention locks defeating ransomware." },
];

const platforms: Platform[] = rawPlatforms.map((item, index) => ({
  id: `platform-${index + 1}`,
  slug: makeSlug(item.title),
  title: item.title,
  category: item.category,
  icon: item.icon,
  shortDescription: item.desc,
  body: `Dedicated protection blueprint for ${item.title}. Engineered with automated scheduling, end-to-end encryption, deduplicated storage, and instant recovery readiness.`,
  image: [imageBank.servers, imageBank.dashboard, imageBank.cloud, imageBank.dataCenter][index % 4] ?? imageBank.servers,
  status: "published",
  order: index + 1,
  seoTitle: `${item.title} Backup | Micronics Devlon`,
  seoDescription: item.desc,
  createdAt: now,
  updatedAt: now,
  benefits: ["Instant recovery time", "Zero-trust encrypted vaults", "Policy-driven automation", "Compliance audit trail"],
}));

// 6. PRICING PLANS
const pricingPlans: PricingPlan[] = [
  {
    id: "plan-starter",
    slug: "starter",
    title: "Essential Protection",
    shortDescription: "Ideal for growing teams needing automated backup for endpoints, SaaS apps, and local servers.",
    body: "Comprehensive starter package with policy automation, AES-256 encryption, and instant cloud repository sync.",
    icon: "ShieldCheck",
    image: imageBank.servers,
    status: "published",
    order: 1,
    seoTitle: "Starter Backup Plan",
    seoDescription: "Affordable data protection for small teams.",
    createdAt: now,
    updatedAt: now,
    price: "$49",
    cadence: "/ month",
    popular: false,
    features: [
      "Up to 10 Workstations & Servers",
      "Microsoft 365 & Google Workspace",
      "AES-256 Zero-Knowledge Encryption",
      "Daily Automated Restore Drills",
      "Local & S3 Object Cloud Storage",
      "Standard Email & Chat Support",
    ],
  },
  {
    id: "plan-pro",
    slug: "professional",
    title: "Enterprise Resilience",
    shortDescription: "High-performance backup with immutable ransomware vaults, sub-second RTO, and VM live mount.",
    body: "Designed for mid-market and enterprise organizations running hybrid cloud, VMware, Hyper-V, databases, and NAS arrays.",
    icon: "Zap",
    image: imageBank.dataCenter,
    status: "published",
    order: 2,
    seoTitle: "Professional Backup Plan",
    seoDescription: "Complete enterprise backup and recovery.",
    createdAt: now,
    updatedAt: now,
    price: "$149",
    cadence: "/ month",
    popular: true,
    features: [
      "Unlimited Workloads & Endpoints",
      "VMware, Hyper-V & Proxmox Support",
      "SQL, Oracle & PostgreSQL Hot Backup",
      "WORM Immutable Ransomware Lock",
      "Sub-2s Instant VM Run Direct",
      "Continuous Data Protection (CDP)",
      "24/7 Emergency Incident Support",
    ],
  },
  {
    id: "plan-msp",
    slug: "msp-provider",
    title: "MSP Multi-Tenant",
    shortDescription: "Complete white-label platform for MSPs, hosting providers, and multi-tenant IT service operations.",
    body: "Full white-label capability, custom branded installers, client billing integration, and multi-tenant administration.",
    icon: "Boxes",
    image: imageBank.team,
    status: "published",
    order: 3,
    seoTitle: "MSP Multi-Tenant Backup Plan",
    seoDescription: "Multi-tenant backup platform for MSPs.",
    createdAt: now,
    updatedAt: now,
    price: "$299",
    cadence: "/ month",
    popular: false,
    features: [
      "Multi-Tenant Centralized Console",
      "100% White-Label & Custom Branding",
      "Custom Branded Client Installers",
      "RESTful API & PSA/RMM Integration",
      "Granular Tenant Quota Controls",
      "Automated Monthly Billing Reports",
      "Dedicated Technical Account Manager",
    ],
  },
];

// 7. TESTIMONIALS
const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    slug: "sarah-jenkins-fintech",
    title: "FinTech Enterprise Review",
    shortDescription: "Review from VP of IT Infrastructure",
    body: "Review content",
    icon: "Star",
    image: imageBank.team,
    status: "published",
    order: 1,
    seoTitle: "Customer Testimonial",
    seoDescription: "Customer review",
    createdAt: now,
    updatedAt: now,
    quote: "Micronics Devlon replaced three disparate legacy backup tools with one ultra-fast, unified platform. When a ransomware test was conducted, our immutable vaults restored our entire PostgreSQL cluster in under 90 seconds.",
    person: "Sarah Jenkins",
    company: "VP of Infrastructure, Apex Global Fintech",
  },
  {
    id: "testimonial-2",
    slug: "marcus-vance-msp",
    title: "MSP Provider Review",
    shortDescription: "Review from MSP Operations Director",
    body: "Review content",
    icon: "Star",
    image: imageBank.team,
    status: "published",
    order: 2,
    seoTitle: "Customer Testimonial",
    seoDescription: "Customer review",
    createdAt: now,
    updatedAt: now,
    quote: "The multi-tenant management and white-label installers allowed us to onboard 60+ business clients in our first quarter. The automated restore verification gives our clients verifiable proof of their recovery readiness.",
    person: "Marcus Vance",
    company: "Director of Managed Services, BlueCloud MSP",
  },
];

// 8. FAQS
const faqs: FAQItem[] = [
  {
    id: "faq-1",
    slug: "ransomware-immunity",
    title: "How does immutable backup stop ransomware?",
    shortDescription: "Explanation of WORM cryptographic locks",
    body: "Immutable backups use strict WORM (Write-Once-Read-Many) policies. Once a restore point is written, no user, script, or ransomware process can modify, delete, or overwrite the data until the designated retention period expires.",
    icon: "Lock",
    image: imageBank.cyber,
    status: "published",
    order: 1,
    seoTitle: "Immutable Backup FAQ",
    seoDescription: "How immutable backups protect against ransomware.",
    createdAt: now,
    updatedAt: now,
    question: "How does immutable backup protect against ransomware?",
    answer: "Immutable backups use strict WORM (Write-Once-Read-Many) policies. Once a restore point is written, no user, script, or ransomware process can modify, delete, or overwrite the data until the designated retention period expires.",
    category: "Security",
  },
  {
    id: "faq-2",
    slug: "instant-restore-speed",
    title: "What is sub-second recovery (RTO)?",
    shortDescription: "Details on VM Run Direct and instant mounting",
    body: "Instead of copying hundreds of gigabytes over the network before booting, our instant recovery mounts the backup repository directly to your hypervisor as an active datastore, booting your virtual machine in seconds.",
    icon: "Zap",
    image: imageBank.dataCenter,
    status: "published",
    order: 2,
    seoTitle: "Instant Recovery FAQ",
    seoDescription: "How instant VM Run Direct works.",
    createdAt: now,
    updatedAt: now,
    question: "How does instant sub-second recovery (RTO) work?",
    answer: "Instead of copying hundreds of gigabytes over the network before booting, our instant recovery mounts the backup repository directly to your hypervisor as an active datastore, booting your virtual machine in seconds.",
    category: "Performance",
  },
];

// 9. BLOG / POSTS
const posts: ResourcePost[] = [
  {
    id: "post-1",
    slug: "ransomware-recovery-playbook-2026",
    title: "The 2026 Ransomware Recovery Playbook for IT Administrators",
    shortDescription: "A step-by-step technical guide to structuring air-gapped repositories and automated restore verification drills.",
    body: "In today's threat landscape, traditional backups are target number one for sophisticated ransomware strains. Learn how to architect true immutability, isolate administrative privileges, and ensure your team can recover clean databases in minutes.",
    icon: "FileCheck",
    image: imageBank.cyber,
    status: "published",
    order: 1,
    seoTitle: "Ransomware Recovery Playbook",
    seoDescription: "Technical guide to ransomware data recovery.",
    createdAt: now,
    updatedAt: now,
    category: "Security Guide",
    readTime: "6 min read",
  },
  {
    id: "post-2",
    slug: "microsoft-365-retention-myths",
    title: "5 Critical Misconceptions About Microsoft 365 Native Retention",
    shortDescription: "Why built-in recycle bins and retention policies are not a substitute for an independent backup program.",
    body: "Microsoft operates under a shared responsibility model. While Microsoft ensures service availability and infrastructure uptime, customer data protection, accidental deletion recovery, and ransomware remediation remain entirely your responsibility.",
    icon: "Cloud",
    image: imageBank.cloud,
    status: "published",
    order: 2,
    seoTitle: "Microsoft 365 Backup Guide",
    seoDescription: "Understanding Microsoft 365 data protection.",
    createdAt: now,
    updatedAt: now,
    category: "Cloud Architecture",
    readTime: "5 min read",
  },
  {
    id: "post-3",
    slug: "optimizing-vm-backup-deduplication",
    title: "Maximizing VM Backup Speed with Variable-Block Deduplication",
    shortDescription: "How global deduplication algorithms reduce storage footprint and WAN network bandwidth by up to 90%.",
    body: "Virtual machine environments share massive amounts of identical OS blocks and application binaries. Learn how variable block-level deduplication accelerates daily incremental runs and keeps storage costs predictable.",
    icon: "Database",
    image: imageBank.servers,
    status: "published",
    order: 3,
    seoTitle: "VM Backup Deduplication",
    seoDescription: "Guide to variable-block backup deduplication.",
    createdAt: now,
    updatedAt: now,
    category: "Engineering",
    readTime: "8 min read",
  },
];

// INITIAL DATA STORE
export const initialData: AppData = {
  heroSlides: [
    {
      id: "hero-1",
      title: "Data Center Resilience",
      slug: "data-center-resilience",
      headline: "Enterprise Backup That Recovers When It Matters",
      keyword: "Backup",
      subheading: "Protect servers, SaaS apps, databases, and endpoints with one recovery-first platform.",
      primaryCta: "Start Free Trial",
      primaryLink: "/free-trial",
      secondaryCta: "Explore Products",
      secondaryLink: "/products",
      image: imageBank.dataCenter,
      alt: "Modern data center with glowing server racks",
      order: 1,
      active: true,
      status: "published",
      seoTitle: "Enterprise Backup Software",
      seoDescription: "Backup software for business resilience.",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "hero-2",
      title: "Cloud Continuity",
      slug: "cloud-continuity",
      headline: "Cloud Workloads Protected Across Every Team",
      keyword: "Protection",
      subheading: "Secure Microsoft 365, Google Workspace, and cloud repositories from accidental loss and attack.",
      primaryCta: "Request a Demo",
      primaryLink: "/contact",
      secondaryCta: "Cloud Solutions",
      secondaryLink: "/solutions/cloud-application-backup",
      image: imageBank.network,
      alt: "Abstract blue cloud and network connections",
      order: 2,
      active: true,
      status: "published",
      seoTitle: "Cloud Backup",
      seoDescription: "Cloud backup and recovery.",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "hero-3",
      title: "Ransomware Recovery",
      slug: "ransomware-recovery",
      headline: "Immutable Recovery Points Against Ransomware",
      keyword: "Recovery",
      subheading: "Layer encryption, retention locks, and tested restores into every protection policy.",
      primaryCta: "See Protection",
      primaryLink: "/solutions/ransomware-protection",
      secondaryCta: "Talk to an Expert",
      secondaryLink: "/contact",
      image: imageBank.cyber,
      alt: "Cybersecurity padlock with digital glow",
      order: 3,
      active: true,
      status: "published",
      seoTitle: "Ransomware Recovery",
      seoDescription: "Immutable ransomware recovery.",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "hero-4",
      title: "Managed Operations",
      slug: "managed-operations",
      headline: "Backup Operations Your Team Can Trust",
      keyword: "Backup",
      subheading: "Give administrators and MSPs a clean command center for monitoring, reporting, and restore readiness.",
      primaryCta: "View Services",
      primaryLink: "/services",
      secondaryCta: "Compare Plans",
      secondaryLink: "/pricing",
      image: imageBank.team,
      alt: "IT team working with dashboards",
      order: 4,
      active: true,
      status: "published",
      seoTitle: "Managed Backup",
      seoDescription: "Managed backup operations.",
      createdAt: now,
      updatedAt: now,
    },
  ],
  products,
  services,
  solutions,
  features,
  platforms,
  pricingPlans,
  faqs,
  testimonials,
  posts,
  leads: [
    {
      id: "lead-1",
      type: "trial",
      name: "David Sterling",
      email: "david.sterling@sterlingtech.io",
      company: "Sterling Financial Tech",
      message: "Looking to deploy immutable backup for 120 VMs and 450 Microsoft 365 mailboxes.",
      status: "new",
      notes: "Follow up regarding VMware vSphere and S3 Object Lock.",
      createdAt: now,
    },
    {
      id: "lead-2",
      type: "demo",
      name: "Elena Rostova",
      email: "elena@vertexmsp.com",
      company: "Vertex Managed Cloud",
      message: "Interested in white-label MSP branding and custom CBS installers.",
      status: "qualified",
      notes: "Demo scheduled for Wednesday 2 PM EST.",
      createdAt: now,
    },
  ],
  newsletter: [
    { id: "sub-1", email: "admin@globaltech.net", createdAt: now },
    { id: "sub-2", email: "secops@cybervault.io", createdAt: now },
  ],
  media: [
    { id: "media-1", name: "Data Center Infrastructure", url: imageBank.dataCenter, type: "image/jpeg", createdAt: now },
    { id: "media-2", name: "Cybersecurity Vault", url: imageBank.cyber, type: "image/jpeg", createdAt: now },
    { id: "media-3", name: "Operations Command Center", url: imageBank.ops, type: "image/jpeg", createdAt: now },
    { id: "media-4", name: "Engineering Team", url: imageBank.team, type: "image/jpeg", createdAt: now },
  ],
  settings: {
    companyName: "Micronics Devlon",
    tagline: "Enterprise Backup, Disaster Recovery & Data Protection",
    contactEmail: "hello@micronicsdevlon.com",
    phone: "+1 (555) 014-2026",
    address: "Los Angeles, CA",
    footerText: "Resilient backup operations for modern infrastructure. Protect cloud applications, virtual machines, databases, NAS storage, and endpoints with sub-second restore confidence.",
    defaultTheme: "light",
    maintenanceMode: false,
    socials: [
      { label: "LinkedIn", url: "https://linkedin.com" },
      { label: "Twitter / X", url: "https://x.com" },
      { label: "GitHub", url: "https://github.com" },
      { label: "YouTube", url: "https://youtube.com" },
    ],
  },
  users: [
    { id: "user-1", name: "Admin Lead", email: "admin@micronicsdevlon.com", role: "Owner", active: true, createdAt: now },
    { id: "user-2", name: "Demo Specialist", email: "demo@micronicsdevlon.com", role: "Admin", active: true, createdAt: now },
  ],
  activity: [
    { id: "act-1", actor: "System", action: "Initialized Catalog", target: "All 35+ Workloads, Solutions, Features, Services", createdAt: now },
  ],
};
