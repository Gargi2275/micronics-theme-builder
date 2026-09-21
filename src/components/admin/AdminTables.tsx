import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Download, Edit, Plus, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAppData } from "@/lib/useAppData";
import { addMedia, deleteContent, deleteLead, deleteMedia, exportCsv, updateLead, updateSettings, updateUsers, upsertContent } from "@/services/content";
import { type AppData, type BaseItem, type ContentType, type EditableItem, type Status } from "@/data/mock";
import { cn } from "@/lib/utils";

const groups: { type: ContentType; label: string }[] = [
  { type: "products", label: "Products" }, { type: "services", label: "Services" }, { type: "solutions", label: "Solutions" }, { type: "features", label: "Features" }, { type: "platforms", label: "Platforms" }, { type: "pricingPlans", label: "Pricing plans" }, { type: "faqs", label: "FAQs" }, { type: "testimonials", label: "Testimonials" }, { type: "posts", label: "Resources/blog posts" },
];

export function DashboardView() {
  const data = useAppData();
  const stats = [
    ["Total leads", data.leads.length], ["New this week", data.leads.filter((lead) => lead.status === "new").length], ["Products", data.products.length], ["Services", data.services.length], ["Subscribers", data.newsletter.length],
  ];
  return <div className="grid gap-6"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">{stats.map(([label, value]) => <div key={label} className="rounded-2xl border border-border bg-card p-5 shadow-card"><p className="text-sm font-bold text-muted-foreground">{label}</p><p className="mt-3 font-display text-4xl font-black text-foreground">{value}</p></div>)}</div><ChartMock /><div className="grid gap-6 lg:grid-cols-[1fr_360px]"><AdminTable rows={data.leads.slice(0, 6)} columns={["name", "type", "status", "createdAt"]} title="Latest leads" /><div className="rounded-2xl border border-border bg-card p-5 shadow-card"><h2 className="font-display text-xl font-black">Quick actions</h2><div className="mt-5 grid gap-3"><Button variant="orange">Add product</Button><Button variant="blue">Add service</Button><Button variant="glass">Add post</Button></div></div></div></div>;
}

function ChartMock() {
  return <div className="grid gap-6 lg:grid-cols-[1.4fr_.8fr]"><div className="rounded-2xl border border-border bg-card p-5 shadow-card"><h2 className="font-display text-xl font-black">Leads over time</h2><svg viewBox="0 0 640 220" className="mt-5 h-64 w-full"><path d="M20 180 C120 120 160 160 240 92 S390 110 460 56 S565 82 620 34" fill="none" stroke="var(--brand-blue)" strokeWidth="8" strokeLinecap="round"/><path d="M20 180 C120 120 160 160 240 92 S390 110 460 56 S565 82 620 34 L620 210 L20 210Z" fill="var(--primary-soft)" opacity=".75"/></svg></div><div className="rounded-2xl border border-border bg-card p-5 shadow-card"><h2 className="font-display text-xl font-black">Leads by type</h2><div className="mt-8 aspect-square rounded-full" style={{ background: "conic-gradient(var(--brand-blue) 0 42%, var(--brand-orange) 42% 70%, var(--chart-3) 70% 86%, var(--chart-4) 86% 100%)" }}><div className="grid h-full place-items-center rounded-full border-[34px] border-card"><span className="font-display text-3xl font-black">100%</span></div></div></div></div>;
}

export function ContentManager({ type = "products" as ContentType }: { type?: ContentType }) {
  const data = useAppData();
  const [activeType, setActiveType] = useState<ContentType>(type);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<EditableItem | null>(null);
  const rows = ((data[activeType] as EditableItem[]) ?? []).filter((item) => JSON.stringify(item).toLowerCase().includes(query.toLowerCase()));
  return <div className="grid gap-6"><div className="flex flex-wrap gap-2">{groups.map((group) => <Button key={group.type} variant={activeType === group.type ? "blue" : "glass"} onClick={() => { setActiveType(group.type); setEditing(null); }}>{group.label}</Button>)}</div><div className="rounded-2xl border border-border bg-card p-5 shadow-card"><div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search and filter" className="sm:max-w-xs" /><Button variant="orange" onClick={() => setEditing({ title: "New item", slug: "new-item", shortDescription: "Short description", body: "Detailed content", icon: "ShieldCheck", image: "", status: "draft", order: rows.length + 1, seoTitle: "", seoDescription: "", createdAt: "", updatedAt: "", id: "" } as EditableItem)}><Plus />Add</Button></div><AdminTable rows={rows} columns={["title", "slug", "status", "order"]} actions={(row) => <><Button variant="ghost" size="icon" onClick={() => setEditing(row)} aria-label="Edit"><Edit /></Button><Button variant="ghost" size="icon" onClick={() => { if (confirm("Delete this item?")) { deleteContent(activeType, row.id); toast.success("Deleted locally"); } }} aria-label="Delete"><Trash2 /></Button></>} /></div>{editing && <ContentEditor type={activeType} item={editing} onClose={() => setEditing(null)} />}</div>;
}

function ContentEditor({ type, item, onClose }: { type: ContentType; item: EditableItem; onClose: () => void }) {
  const [form, setForm] = useState<Record<string, string>>({ title: item.title ?? "", slug: item.slug ?? "", shortDescription: (item as BaseItem).shortDescription ?? "", body: (item as BaseItem).body ?? "", icon: (item as BaseItem).icon ?? "ShieldCheck", image: (item as BaseItem).image ?? "", status: (item as BaseItem).status ?? "published", seoTitle: (item as BaseItem).seoTitle ?? "", seoDescription: (item as BaseItem).seoDescription ?? "", headline: (item as any).headline ?? "", subheading: (item as any).subheading ?? "", primaryCta: (item as any).primaryCta ?? "", primaryLink: (item as any).primaryLink ?? "", secondaryCta: (item as any).secondaryCta ?? "", secondaryLink: (item as any).secondaryLink ?? "" });
  return <div className="fixed inset-0 z-[80] bg-background/75 backdrop-blur"><div className="ml-auto h-full w-full max-w-2xl overflow-auto border-l border-border bg-background p-6 shadow-elevated"><div className="mb-6 flex items-center justify-between"><h2 className="font-display text-2xl font-black">Edit {type}</h2><Button variant="ghost" onClick={onClose}>Close</Button></div><form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); upsertContent(type, { ...item, ...form, status: form.status as Status, title: form.title }); toast.success("Saved locally"); onClose(); }}><Field label="Title"><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field><Field label="Slug"><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></Field>{type === "heroSlides" && <><Field label="Headline"><Input value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} /></Field><Field label="Subheading"><Textarea value={form.subheading} onChange={(e) => setForm({ ...form, subheading: e.target.value })} /></Field></>}<Field label="Short description"><Textarea value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} /></Field><Field label="Body"><Textarea rows={7} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} /></Field><Field label="Image URL"><Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} /></Field><Field label="Status"><select className="h-10 rounded-md border border-input bg-background px-3 text-sm" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option value="published">Published</option><option value="draft">Draft</option></select></Field><Field label="SEO title"><Input value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} /></Field><Field label="SEO description"><Textarea value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} /></Field><div className="flex justify-end gap-3"><Button type="button" variant="glass" onClick={onClose}>Cancel</Button><Button type="submit" variant="orange">Save changes</Button></div></form></div></div>;
}

export function LeadsManager() {
  const data = useAppData();
  const [query, setQuery] = useState("");
  const rows = data.leads.filter((lead) => JSON.stringify(lead).toLowerCase().includes(query.toLowerCase()));
  return <div className="rounded-2xl border border-border bg-card p-5 shadow-card"><div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search leads" className="sm:max-w-xs" /><Button variant="blue" onClick={() => exportCsv(rows as unknown as Record<string, unknown>[], "leads.csv")}><Download />Export CSV</Button></div><AdminTable rows={rows} columns={["name", "email", "type", "status", "createdAt"]} actions={(row) => <><select className="rounded-md border border-input bg-background px-2 py-1 text-sm" value={row.status} onChange={(e) => updateLead(row.id, { status: e.target.value as any })}><option>new</option><option>contacted</option><option>qualified</option><option>closed</option></select><Button variant="ghost" size="icon" onClick={() => { deleteLead(row.id); toast.success("Deleted locally"); }}><Trash2 /></Button></>} /></div>;
}

export function NewsletterManager() {
  const data = useAppData();
  return <div className="rounded-2xl border border-border bg-card p-5 shadow-card"><div className="mb-5 flex justify-end"><Button variant="blue" onClick={() => exportCsv(data.newsletter as unknown as Record<string, unknown>[], "newsletter.csv")}><Download />Export CSV</Button></div><AdminTable rows={data.newsletter} columns={["email", "createdAt"]} /></div>;
}

export function MediaManager() {
  const data = useAppData();
  return <div className="grid gap-6"><label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-10 text-center shadow-card"><Upload className="mb-3 size-8 text-primary" /><span className="font-bold">Pick local images</span><span className="text-sm text-muted-foreground">Preview-only object URLs are saved in this browser.</span><input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => Array.from(e.target.files ?? []).forEach((file) => addMedia({ name: file.name, type: file.type, url: URL.createObjectURL(file) }))} /></label><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{data.media.map((item) => <div key={item.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-card"><img src={item.url} alt={item.name} className="h-40 w-full object-cover" /><div className="p-4"><p className="truncate font-bold">{item.name}</p><div className="mt-3 flex gap-2"><Button variant="glass" size="sm" onClick={() => navigator.clipboard.writeText(item.url)}>Copy URL</Button><Button variant="ghost" size="sm" onClick={() => deleteMedia(item.id)}>Delete</Button></div></div></div>)}</div></div>;
}

export function SettingsManager() {
  const data = useAppData();
  const [settings, setSettings] = useState(data.settings);
  return <form className="grid max-w-3xl gap-4 rounded-2xl border border-border bg-card p-6 shadow-card" onSubmit={(e) => { e.preventDefault(); updateSettings(settings); toast.success("Settings saved locally"); }}><Field label="Company name"><Input value={settings.companyName} onChange={(e) => setSettings({ ...settings, companyName: e.target.value })} /></Field><Field label="Tagline"><Textarea value={settings.tagline} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} /></Field><Field label="Contact email"><Input value={settings.contactEmail} onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })} /></Field><Field label="Phone"><Input value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} /></Field><Field label="Address"><Input value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} /></Field><label className="flex items-center gap-3 text-sm font-bold"><input type="checkbox" checked={settings.maintenanceMode} onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })} />Maintenance mode</label><Button variant="orange" className="w-fit">Save settings</Button></form>;
}

export function UsersManager() {
  const data = useAppData();
  const [users, setUsers] = useState(data.users);
  return <div className="rounded-2xl border border-border bg-card p-5 shadow-card"><div className="mb-5 flex justify-end"><Button variant="orange" onClick={() => { const next = [{ id: `user-${crypto.randomUUID()}`, name: "Invited User", email: "invite@example.com", role: "Viewer" as const, active: true, createdAt: new Date().toISOString() }, ...users]; setUsers(next); updateUsers(next); }}>Invite user</Button></div><AdminTable rows={users} columns={["name", "email", "role", "active"]} actions={(row) => <Button variant="ghost" size="sm" onClick={() => { const next = users.map((user) => user.id === row.id ? { ...user, active: !user.active } : user); setUsers(next); updateUsers(next); }}>{row.active ? "Deactivate" : "Activate"}</Button>} /></div>;
}

export function ActivityManager() {
  const data = useAppData();
  return <AdminTable rows={data.activity} columns={["actor", "action", "target", "createdAt"]} title="Activity log" />;
}

function AdminTable<T extends { id: string } & Record<string, unknown>>({ rows, columns, title, actions }: { rows: T[]; columns: string[]; title?: string; actions?: (row: T) => React.ReactNode }) {
  const [sort, setSort] = useState(columns[0] ?? "id");
  const sorted = [...rows].sort((a, b) => String(a[sort] ?? "").localeCompare(String(b[sort] ?? ""))).slice(0, 12);
  return <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">{title && <h2 className="border-b border-border p-5 font-display text-xl font-black">{title}</h2>}<Table><TableHeader><TableRow>{columns.map((column) => <TableHead key={column}><button className="font-bold capitalize" onClick={() => setSort(column)}>{column.replace(/([A-Z])/g, " $1")}</button></TableHead>)}{actions && <TableHead>Actions</TableHead>}</TableRow></TableHeader><TableBody>{sorted.length === 0 ? <TableRow><TableCell colSpan={columns.length + 1} className="py-10 text-center text-muted-foreground">No records yet.</TableCell></TableRow> : sorted.map((row) => <TableRow key={row.id}>{columns.map((column) => <TableCell key={column} className="max-w-[240px] truncate">{String(row[column] ?? "")}</TableCell>)}{actions && <TableCell><div className="flex items-center gap-2">{actions(row)}</div></TableCell>}</TableRow>)}</TableBody></Table></div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="grid gap-2 text-sm font-bold text-foreground">{label}{children}</label>;
}
