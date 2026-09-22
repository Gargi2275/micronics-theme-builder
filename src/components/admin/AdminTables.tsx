import { useMemo, useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Download,
  Edit3,
  Plus,
  Trash2,
  Upload,
  Star,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Layers,
  Zap,
  ShieldCheck,
  Boxes,
  X,
  Sparkles,
  ArrowRight,
  Eye,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppData } from "@/lib/useAppData";
import {
  addMedia,
  deleteContent,
  deleteLead,
  deleteMedia,
  exportCsv,
  updateLead,
  updateSettings,
  updateUsers,
  upsertContent,
  type EditableItem,
} from "@/services/content";
import {
  iconMap,
  type AppData,
  type BaseItem,
  type ContentType,
  type Status,
  type Lead,
} from "@/data/mock";
import { cn } from "@/lib/utils";

const contentTypeTabs: { type: ContentType; label: string; countKey: keyof AppData; icon: any }[] = [
  { type: "solutions", label: "Solutions", countKey: "solutions", icon: Layers },
  { type: "features", label: "Features", countKey: "features", icon: Zap },
  { type: "services", label: "Services", countKey: "services", icon: ShieldCheck },
  { type: "products", label: "Products", countKey: "products", icon: Boxes },
  { type: "platforms", label: "Workloads / Directory", countKey: "platforms", icon: Layers },
  { type: "pricingPlans", label: "Pricing Plans", countKey: "pricingPlans", icon: Sparkles },
  { type: "faqs", label: "FAQs", countKey: "faqs", icon: CheckCircle2 },
  { type: "posts", label: "Resources & Articles", countKey: "posts", icon: Edit3 },
  { type: "testimonials", label: "Testimonials", countKey: "testimonials", icon: Star },
];

export function DashboardView() {
  const data = useAppData();
  const [activeTab, setActiveTab] = useState<ContentType>("solutions");
  const [editingItem, setEditingItem] = useState<EditableItem | null>(null);

  const stats = [
    { label: "Solutions", value: data.solutions.length, icon: Layers, color: "text-blue-500 bg-blue-500/10" },
    { label: "Features", value: data.features.length, icon: Zap, color: "text-amber-500 bg-amber-500/10" },
    { label: "Services", value: data.services.length, icon: ShieldCheck, color: "text-emerald-500 bg-emerald-500/10" },
    { label: "Products", value: data.products.length, icon: Boxes, color: "text-indigo-500 bg-indigo-500/10" },
    { label: "Active Leads", value: data.leads.length, icon: CheckCircle2, color: "text-orange-500 bg-orange-500/10" },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-border/80 bg-card p-5 shadow-card transition-all hover:shadow-elevated"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </span>
                <div className={cn("flex size-8 items-center justify-center rounded-xl", stat.color)}>
                  <Icon className="size-4" />
                </div>
              </div>
              <p className="mt-3 font-display text-3xl font-black text-foreground">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* 2. Quick Action Create Buttons */}
      <div className="rounded-2xl border border-border/80 bg-gradient-to-r from-primary/5 via-card to-accent/5 p-5 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-display text-base font-bold text-foreground">
              Quick Content Creator
            </h3>
            <p className="text-xs text-muted-foreground">
              Directly add a new Solution, Feature, Service, or Product into the local catalog.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="orange"
              size="sm"
              onClick={() => {
                setActiveTab("solutions");
                setEditingItem({
                  title: "New Solution",
                  slug: "new-solution",
                  category: "Cloud Applications Backup",
                  starred: true,
                  shortDescription: "Short solution overview",
                  body: "Detailed technical architecture and restore blueprint.",
                  icon: "Cloud",
                  status: "published",
                  order: data.solutions.length + 1,
                  id: "",
                } as EditableItem);
              }}
            >
              <Plus className="size-4 mr-1" /> Add Solution
            </Button>
            <Button
              variant="blue"
              size="sm"
              onClick={() => {
                setActiveTab("features");
                setEditingItem({
                  title: "New Feature",
                  slug: "new-feature",
                  category: "New",
                  starred: true,
                  shortDescription: "Short feature capability overview",
                  body: "Detailed feature specs and compliance details.",
                  icon: "Zap",
                  status: "published",
                  order: data.features.length + 1,
                  id: "",
                } as EditableItem);
              }}
            >
              <Plus className="size-4 mr-1" /> Add Feature
            </Button>
            <Button
              variant="glass"
              size="sm"
              onClick={() => {
                setActiveTab("services");
                setEditingItem({
                  title: "New Service",
                  slug: "new-service",
                  starred: true,
                  shortDescription: "Service description",
                  body: "Service scope and delivery methodology.",
                  icon: "ShieldCheck",
                  status: "published",
                  order: data.services.length + 1,
                  id: "",
                } as EditableItem);
              }}
            >
              <Plus className="size-4 mr-1" /> Add Service
            </Button>
          </div>
        </div>
      </div>

      {/* 3. Main Live Content Manager Section */}
      <ContentManager defaultType={activeTab} />

      {/* 4. Leads & Activity Split Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Leads */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-card">
          <div className="mb-4 flex items-center justify-between border-b border-border/60 pb-3">
            <h3 className="font-display text-base font-bold text-foreground">Recent Inquiries & Trials</h3>
            <Button asChild variant="ghost" size="sm" className="text-xs text-primary">
              <Link to="/admin/leads">View all leads →</Link>
            </Button>
          </div>
          <div className="space-y-3">
            {data.leads.slice(0, 4).map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between rounded-xl bg-secondary/50 p-3 text-xs"
              >
                <div>
                  <span className="font-bold text-foreground block">{lead.name}</span>
                  <span className="text-muted-foreground">{lead.email} • {lead.company}</span>
                </div>
                <span className="rounded-md bg-primary/10 px-2 py-0.5 font-bold uppercase text-[10px] text-primary">
                  {lead.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Log Stream */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-card">
          <div className="mb-4 flex items-center justify-between border-b border-border/60 pb-3">
            <h3 className="font-display text-base font-bold text-foreground">Admin Activity Trail</h3>
            <Button asChild variant="ghost" size="sm" className="text-xs text-primary">
              <Link to="/admin/activity">View full log →</Link>
            </Button>
          </div>
          <div className="space-y-2.5">
            {data.activity.slice(0, 4).map((act) => (
              <div key={act.id} className="flex items-center justify-between text-xs py-1.5 border-b border-border/40 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-primary" />
                  <span className="font-semibold text-foreground">{act.action}</span>
                  <span className="text-muted-foreground truncate max-w-[200px]">{act.target}</span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {new Date(act.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {editingItem && (
        <ContentEditor
          type={activeTab}
          item={editingItem}
          onClose={() => setEditingItem(null)}
        />
      )}
    </div>
  );
}

export function ContentManager({ defaultType = "solutions" as ContentType }: { defaultType?: ContentType }) {
  const data = useAppData();
  const [activeType, setActiveType] = useState<ContentType>(defaultType);
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingItem, setEditingItem] = useState<EditableItem | null>(null);

  // Get raw items from store
  const collection = (data[activeType] as EditableItem[]) ?? [];

  // Extract distinct subcategories for filtering
  const distinctCategories = useMemo(() => {
    const cats = new Set<string>();
    collection.forEach((item) => {
      if ("category" in item && item.category) cats.add(item.category as string);
    });
    return ["All", ...Array.from(cats)];
  }, [collection]);

  // Filtered rows
  const filteredRows = useMemo(() => {
    return collection.filter((item) => {
      const matchesCat =
        selectedSubCategory === "All" ||
        ("category" in item && item.category === selectedSubCategory);

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.slug && item.slug.toLowerCase().includes(q)) ||
        ((item as any).shortDescription && (item as any).shortDescription.toLowerCase().includes(q));

      return matchesCat && matchesQuery;
    });
  }, [collection, selectedSubCategory, searchQuery]);

  const handleToggleStar = (item: EditableItem) => {
    const updated = { ...item, starred: !item.starred };
    upsertContent(activeType, updated as any);
    toast.success(
      updated.starred
        ? `★ Added "${item.title}" to header featured highlights!`
        : `Removed "${item.title}" from highlights`
    );
  };

  const handleDelete = (item: EditableItem) => {
    if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
      deleteContent(activeType, item.id);
      toast.success(`Deleted "${item.title}" from catalog.`);
    }
  };

  const handleAddNew = () => {
    const newTemplate: Partial<EditableItem> = {
      title: `New ${activeType.slice(0, -1)}`,
      slug: `new-${activeType.slice(0, -1)}-${Date.now().toString().slice(-4)}`,
      category: activeType === "solutions" ? "Cloud Applications Backup" : activeType === "features" ? "New" : "General",
      starred: true,
      shortDescription: "Enter concise summary here.",
      body: "Detailed technical specifications, benefits, and operational blueprint.",
      icon: "ShieldCheck",
      image: "",
      status: "published",
      order: collection.length + 1,
      seoTitle: "",
      seoDescription: "",
      id: "",
    };
    setEditingItem(newTemplate as EditableItem);
  };

  return (
    <div className="space-y-6">
      {/* 1. Main Content Type Selector Pills */}
      <div className="flex flex-wrap gap-2 border-b border-border/60 pb-4">
        {contentTypeTabs.map((tab) => {
          const Icon = tab.icon;
          const count = (data[tab.countKey] as any[])?.length ?? 0;
          const isActive = activeType === tab.type;
          return (
            <button
              key={tab.type}
              type="button"
              onClick={() => {
                setActiveType(tab.type);
                setSelectedSubCategory("All");
                setSearchQuery("");
                setEditingItem(null);
              }}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "border border-border/80 bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className="size-3.5" />
              <span>{tab.label}</span>
              <span
                className={cn(
                  "rounded-md px-1.5 py-0.5 text-[10px] font-mono",
                  isActive ? "bg-white/20 text-white" : "bg-secondary text-muted-foreground"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Control Bar: Subcategories, Search, & Add Button */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Subcategory Pills */}
          {distinctCategories.length > 1 && (
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-muted-foreground font-semibold mr-1 flex items-center gap-1">
                <Filter className="size-3" /> Category:
              </span>
              {distinctCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedSubCategory(cat)}
                  className={cn(
                    "rounded-lg px-2.5 py-1 text-xs font-semibold transition-all",
                    selectedSubCategory === cat
                      ? "bg-foreground text-background font-bold"
                      : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Search & Add Button */}
          <div className="flex items-center gap-3 sm:ml-auto">
            <div className="relative min-w-[200px] sm:min-w-[240px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeType}...`}
                className="h-9 pl-8 text-xs rounded-xl bg-background"
              />
            </div>
            <Button variant="orange" size="sm" onClick={handleAddNew} className="whitespace-nowrap">
              <Plus className="size-4 mr-1" />
              Add {activeType.slice(0, -1)}
            </Button>
          </div>
        </div>

        {/* 3. Rich Data Table */}
        <div className="overflow-x-auto rounded-xl border border-border/80">
          <Table>
            <TableHeader className="bg-secondary/40">
              <TableRow>
                <TableHead className="w-10">★</TableHead>
                <TableHead className="w-12">Icon</TableHead>
                <TableHead>Title & Slug</TableHead>
                <TableHead>Category / Group</TableHead>
                <TableHead className="max-w-md">Description</TableHead>
                <TableHead className="w-24">Status</TableHead>
                <TableHead className="w-32 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-12 text-center text-muted-foreground text-sm">
                    No items found matching your filter or query. Click &quot;Add {activeType.slice(0, -1)}&quot; to create one.
                  </TableCell>
                </TableRow>
              ) : (
                filteredRows.map((row) => {
                  const iconName = ((row as any).icon as string) ?? "ShieldCheck";
                  const Icon = iconMap[iconName] ?? CheckCircle2;
                  const isStarred = Boolean((row as any).starred);
                  return (
                    <TableRow key={row.id} className="hover:bg-secondary/30 transition-colors">
                      {/* Starred Button */}
                      <TableCell>
                        <button
                          type="button"
                          onClick={() => handleToggleStar(row)}
                          title={isStarred ? "Remove star highlight" : "Star as featured highlight"}
                          className="text-muted-foreground hover:text-amber-500 transition-colors p-1"
                        >
                          <Star
                            className={cn(
                              "size-4",
                              isStarred
                                ? "fill-amber-500 text-amber-500"
                                : "opacity-40 hover:opacity-100"
                            )}
                          />
                        </button>
                      </TableCell>

                      {/* Icon */}
                      <TableCell>
                        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="size-4" />
                        </div>
                      </TableCell>

                      {/* Title & Slug */}
                      <TableCell>
                        <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                          <span>{row.title}</span>
                          {isStarred && (
                            <span className="rounded bg-amber-500/15 px-1.5 py-0.2 text-[9px] font-bold text-amber-600 dark:text-amber-400">
                              Featured
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-muted-foreground">/{row.slug}</span>
                      </TableCell>

                      {/* Category */}
                      <TableCell>
                        <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                          {(row as any).category ?? activeType}
                        </span>
                      </TableCell>

                      {/* Description */}
                      <TableCell className="max-w-xs truncate text-xs text-muted-foreground">
                        {(row as any).shortDescription ?? (row as any).body ?? "—"}
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold",
                            row.status === "published"
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                              : "bg-amber-500/15 text-amber-600"
                          )}
                        >
                          <span
                            className={cn(
                              "size-1.5 rounded-full",
                              row.status === "published" ? "bg-emerald-500" : "bg-amber-500"
                            )}
                          />
                          {row.status}
                        </span>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingItem(row)}
                            title="Edit Item"
                            className="size-8 text-foreground hover:bg-primary/15 hover:text-primary"
                          >
                            <Edit3 className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(row)}
                            title="Delete Item"
                            className="size-8 text-destructive hover:bg-destructive/15"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Slide-over Content Editor Drawer */}
      {editingItem && (
        <ContentEditor
          type={activeType}
          item={editingItem}
          onClose={() => setEditingItem(null)}
        />
      )}
    </div>
  );
}

interface ContentFormData {
  title: string;
  slug: string;
  category: string;
  starred: boolean;
  shortDescription: string;
  body: string;
  icon: string;
  image: string;
  status: Status;
  order: number;
  seoTitle: string;
  seoDescription: string;
  price: string;
}

function ContentEditor({
  type,
  item,
  onClose,
}: {
  type: ContentType;
  item: EditableItem;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ContentFormData>({
    title: item.title ?? "",
    slug: item.slug ?? "",
    category: ((item as any).category as string) ?? (type === "solutions" ? "Cloud Applications Backup" : "General"),
    starred: Boolean((item as any).starred),
    shortDescription: ((item as any).shortDescription as string) ?? "",
    body: ((item as any).body as string) ?? "",
    icon: ((item as any).icon as string) ?? "ShieldCheck",
    image: ((item as any).image as string) ?? "",
    status: (item.status as Status) ?? "published",
    order: item.order ?? 1,
    seoTitle: ((item as any).seoTitle as string) ?? "",
    seoDescription: ((item as any).seoDescription as string) ?? "",
    price: ((item as any).price as string) ?? "",
  });

  const availableIcons = [
    "Cloud",
    "Database",
    "Server",
    "HardDrive",
    "Lock",
    "ShieldCheck",
    "Zap",
    "Laptop",
    "Smartphone",
    "Boxes",
    "FileCheck",
    "Activity",
    "Mail",
    "KeyRound",
    "RefreshCw",
    "Star",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }

    const payload: Record<string, any> = {
      ...item,
      ...form,
      status: (form.status ?? "published") as Status,
      title: form.title.trim(),
    };
    if (form.slug.trim()) {
      payload["slug"] = form.slug.trim();
    }

    upsertContent(type, payload as any);

    toast.success(`Successfully saved "${form.title}"!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex h-full w-full max-w-xl flex-col border-l border-border bg-card p-6 shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-4 mb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Content Editor • {type}
            </span>
            <h2 className="font-display text-xl font-black text-foreground">
              {item.id ? `Edit ${form.title}` : `Create New ${type.slice(0, -1)}`}
            </h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="size-8">
            <X className="size-4" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 flex-1">
          <Field label="Item Title">
            <Input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Proxmox VE Backup"
              className="bg-background text-sm font-medium"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="URL Slug">
              <Input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="auto-generated-if-empty"
                className="bg-background font-mono text-xs"
              />
            </Field>

            <Field label="Category / Group">
              <Input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="e.g. Cloud Applications"
                className="bg-background text-xs"
              />
            </Field>
          </div>

          {/* Star Highlight Switch */}
          <div className="flex items-center justify-between rounded-xl border border-amber-500/30 bg-amber-500/5 p-3">
            <div>
              <span className="font-bold text-xs text-foreground flex items-center gap-1.5">
                <Star className="size-3.5 fill-amber-500 text-amber-500" />
                Featured Highlight (★)
              </span>
              <p className="text-[11px] text-muted-foreground">
                Highlight this item with a star badge in header mega-menus.
              </p>
            </div>
            <input
              type="checkbox"
              checked={form.starred}
              onChange={(e) => setForm({ ...form, starred: e.target.checked })}
              className="size-4 rounded border-border text-primary cursor-pointer"
            />
          </div>

          {/* Icon Selector */}
          <Field label="Icon Picker">
            <div className="grid grid-cols-8 gap-2 bg-background/60 p-2.5 rounded-xl border border-border/80">
              {availableIcons.map((ic) => {
                const IconComponent = iconMap[ic] ?? CheckCircle2;
                const isSelected = form.icon === ic;
                return (
                  <button
                    key={ic}
                    type="button"
                    onClick={() => setForm({ ...form, icon: ic })}
                    className={cn(
                      "flex size-9 items-center justify-center rounded-lg transition-all",
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    )}
                    title={ic}
                  >
                    <IconComponent className="size-4" />
                  </button>
                );
              })}
            </div>
          </Field>

          <Field label="Short Summary / Description">
            <Textarea
              rows={2}
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              placeholder="1-2 sentences for card previews and search."
              className="bg-background text-xs"
            />
          </Field>

          <Field label="Full Detailed Body / Specs">
            <Textarea
              rows={5}
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              placeholder="Full architectural specs, requirements, and restore blueprints."
              className="bg-background text-xs"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Publish Status">
              <select
                className="h-9 w-full rounded-xl border border-input bg-background px-3 text-xs font-semibold"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as Status })}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </Field>

            <Field label="Display Order">
              <Input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                className="bg-background text-xs"
              />
            </Field>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-border mt-6">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="orange" size="lg">
              Save & Apply Live
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function LeadsManager() {
  const data = useAppData();
  const [query, setQuery] = useState("");
  const rows = data.leads.filter((lead) =>
    JSON.stringify(lead).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-card space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-4">
        <div>
          <h2 className="font-display text-lg font-bold text-foreground">Inbound Leads & Trial Requests</h2>
          <p className="text-xs text-muted-foreground">Manage prospect submissions, quotes, and demo requests.</p>
        </div>
        <div className="flex items-center gap-3">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search leads..."
            className="sm:max-w-xs text-xs h-9 bg-background"
          />
          <Button
            variant="blue"
            size="sm"
            onClick={() => exportCsv(rows as unknown as Record<string, unknown>[], "micronics_leads.csv")}
          >
            <Download className="size-3.5 mr-1" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border/80">
        <Table>
          <TableHeader className="bg-secondary/40">
            <TableRow>
              <TableHead>Contact</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Request Type</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-muted-foreground text-xs">
                  No inquiries recorded yet.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <span className="font-bold text-foreground block text-sm">{row.name}</span>
                    <span className="text-xs text-muted-foreground">{row.email}</span>
                  </TableCell>
                  <TableCell className="text-xs font-medium">{row.company}</TableCell>
                  <TableCell>
                    <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase text-primary">
                      {row.type}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-xs text-muted-foreground">
                    {row.message}
                  </TableCell>
                  <TableCell>
                    <select
                      className="rounded-lg border border-input bg-background px-2 py-1 text-xs font-semibold"
                      value={row.status}
                      onChange={(e) => updateLead(row.id, { status: e.target.value as any })}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="closed">Closed</option>
                    </select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        deleteLead(row.id);
                        toast.success("Lead removed");
                      }}
                      className="size-8 text-destructive hover:bg-destructive/15"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function NewsletterManager() {
  const data = useAppData();
  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-card space-y-4">
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div>
          <h2 className="font-display text-lg font-bold text-foreground">Newsletter Subscribers</h2>
          <p className="text-xs text-muted-foreground">Subscribed audience for recovery bulletins.</p>
        </div>
        <Button
          variant="blue"
          size="sm"
          onClick={() => exportCsv(data.newsletter as unknown as Record<string, unknown>[], "subscribers.csv")}
        >
          <Download className="size-3.5 mr-1" /> Export CSV
        </Button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border/80">
        <Table>
          <TableHeader className="bg-secondary/40">
            <TableRow>
              <TableHead>Email Address</TableHead>
              <TableHead>Subscribed Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.newsletter.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell className="font-semibold text-xs text-foreground">{sub.email}</TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {new Date(sub.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function MediaManager() {
  const data = useAppData();
  return (
    <div className="space-y-6">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card p-8 text-center shadow-card hover:border-primary transition-all">
        <Upload className="mb-2 size-8 text-primary" />
        <span className="font-bold text-sm text-foreground">Upload Media Assets</span>
        <span className="text-xs text-muted-foreground">Local image preview saved in browser memory.</span>
        <input
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(e) =>
            Array.from(e.target.files ?? []).forEach((file) =>
              addMedia({ name: file.name, type: file.type, url: URL.createObjectURL(file) })
            )
          }
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.media.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-card group">
            <img src={item.url} alt={item.name} className="h-40 w-full object-cover group-hover:scale-105 transition-transform" />
            <div className="p-4">
              <p className="truncate font-bold text-xs text-foreground">{item.name}</p>
              <div className="mt-3 flex gap-2">
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(item.url);
                    toast.success("URL copied to clipboard");
                  }}
                  className="text-xs flex-1"
                >
                  Copy URL
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteMedia(item.id)}
                  className="text-xs text-destructive hover:bg-destructive/15"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SettingsManager() {
  const data = useAppData();
  const [settings, setSettings] = useState(data.settings);

  return (
    <form
      className="grid max-w-3xl gap-5 rounded-2xl border border-border/80 bg-card p-7 shadow-card"
      onSubmit={(e) => {
        e.preventDefault();
        updateSettings(settings);
        toast.success("Site settings saved successfully!");
      }}
    >
      <Field label="Company Name">
        <Input
          value={settings.companyName}
          onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
          className="bg-background"
        />
      </Field>
      <Field label="Tagline / Mission">
        <Textarea
          value={settings.tagline}
          onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
          className="bg-background"
        />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Support Email">
          <Input
            value={settings.contactEmail}
            onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
            className="bg-background"
          />
        </Field>
        <Field label="Contact Phone">
          <Input
            value={settings.phone}
            onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
            className="bg-background"
          />
        </Field>
      </div>
      <Field label="Footer Description">
        <Textarea
          rows={3}
          value={settings.footerText}
          onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
          className="bg-background text-xs"
        />
      </Field>
      <Button variant="orange" className="w-fit mt-2">
        Save Settings
      </Button>
    </form>
  );
}

export function UsersManager() {
  const data = useAppData();
  const [users, setUsers] = useState(data.users);

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-card space-y-4">
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div>
          <h2 className="font-display text-lg font-bold text-foreground">Administrators & Roles</h2>
          <p className="text-xs text-muted-foreground">Manage demo administrator accounts and permissions.</p>
        </div>
        <Button
          variant="orange"
          size="sm"
          onClick={() => {
            const next = [
              {
                id: `user-${crypto.randomUUID()}`,
                name: "New Admin",
                email: "new.admin@micronicsdevlon.com",
                role: "Admin" as const,
                active: true,
                createdAt: new Date().toISOString(),
              },
              ...users,
            ];
            setUsers(next);
            updateUsers(next);
            toast.success("Created new administrator demo account.");
          }}
        >
          <Plus className="size-4 mr-1" /> Invite Administrator
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border/80">
        <Table>
          <TableHeader className="bg-secondary/40">
            <TableRow>
              <TableHead>User Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-bold text-xs text-foreground">{user.name}</TableCell>
                <TableCell className="text-xs font-mono text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={user.active ? "text-emerald-500 font-bold text-xs" : "text-muted-foreground text-xs"}>
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const next = users.map((u) => (u.id === user.id ? { ...u, active: !u.active } : u));
                      setUsers(next);
                      updateUsers(next);
                    }}
                    className="text-xs"
                  >
                    {user.active ? "Deactivate" : "Activate"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function ActivityManager() {
  const data = useAppData();
  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-card space-y-4">
      <div className="border-b border-border/60 pb-4">
        <h2 className="font-display text-lg font-bold text-foreground">System & Content Audit Log</h2>
        <p className="text-xs text-muted-foreground">Historical records of all content modifications and administrator logins.</p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border/80">
        <Table>
          <TableHeader className="bg-secondary/40">
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target Resource</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.activity.map((act) => (
              <TableRow key={act.id}>
                <TableCell className="text-xs font-mono text-muted-foreground">
                  {new Date(act.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="text-xs font-bold text-foreground">{act.actor}</TableCell>
                <TableCell>
                  <span className="rounded bg-secondary px-2 py-0.5 text-xs font-semibold text-foreground">
                    {act.action}
                  </span>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{act.target}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
      {label}
      {children}
    </label>
  );
}
