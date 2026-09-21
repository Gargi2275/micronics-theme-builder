import { initialData, type AppData, type ContentType, type Lead, type NewsletterSubscriber, type Status } from "@/data/mock";

const STORAGE_KEY = "micronics-devlon-data-v1";
const AUTH_KEY = "micronics-devlon-admin-auth";
const CHANGE_EVENT = "micronics-data-change";

export type EditableCollection = AppData[ContentType];
export type EditableItem = EditableCollection[number];

export function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "item";
}

function cloneInitial(): AppData {
  return JSON.parse(JSON.stringify(initialData)) as AppData;
}

function canStore() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

const serverSnapshot: AppData = cloneInitial();
let clientSnapshot: AppData | null = null;

export function getServerAppData(): AppData {
  return serverSnapshot;
}

export function getAppData(): AppData {
  if (!canStore()) return serverSnapshot;
  if (clientSnapshot !== null) return clientSnapshot;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    clientSnapshot = cloneInitial();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(clientSnapshot));
    return clientSnapshot;
  }
  try {
    const parsed = JSON.parse(raw) as Partial<AppData>;
    clientSnapshot = { ...cloneInitial(), ...parsed } as AppData;
    return clientSnapshot;
  } catch {
    clientSnapshot = cloneInitial();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(clientSnapshot));
    return clientSnapshot;
  }
}

export function saveAppData(data: AppData) {
  clientSnapshot = data;
  if (!canStore()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

export function subscribeToData(callback: () => void) {
  if (!canStore()) return () => undefined;
  const storageHandler = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          clientSnapshot = { ...cloneInitial(), ...JSON.parse(raw) };
        } catch {
          clientSnapshot = cloneInitial();
        }
      } else {
        clientSnapshot = cloneInitial();
      }
      callback();
    }
  };
  const changeHandler = () => {
    callback();
  };
  window.addEventListener(CHANGE_EVENT, changeHandler);
  window.addEventListener("storage", storageHandler);
  return () => {
    window.removeEventListener(CHANGE_EVENT, changeHandler);
    window.removeEventListener("storage", storageHandler);
  };
}

export function listPublished<T extends { status?: Status; order?: number }>(items: T[]) {
  return [...items].filter((item) => item.status !== "draft").sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function upsertContent(type: ContentType, input: Partial<EditableItem> & { title: string }) {
  const data = getAppData();
  const collection = [...(data[type] as EditableItem[])];
  const now = new Date().toISOString();
  const id = input.id ?? `${type}-${crypto.randomUUID()}`;
  const existingIndex = collection.findIndex((item) => item.id === id);
  const base = existingIndex >= 0 ? collection[existingIndex] : undefined;
  const next = {
    ...base,
    ...input,
    id,
    slug: input.slug ? slugify(input.slug) : slugify(input.title),
    status: input.status ?? base?.status ?? "published",
    order: input.order ?? base?.order ?? collection.length + 1,
    seoTitle: input.seoTitle ?? base?.seoTitle ?? `${input.title} | Micronics Devlon`,
    seoDescription: input.seoDescription ?? base?.seoDescription ?? input.shortDescription ?? "Micronics Devlon content.",
    createdAt: base?.createdAt ?? now,
    updatedAt: now,
  } as EditableItem;
  if (existingIndex >= 0) collection[existingIndex] = next;
  else collection.push(next);
  (data[type] as EditableItem[]) = collection;
  addActivity(data, existingIndex >= 0 ? "Edited" : "Created", input.title);
  saveAppData(data);
  return next;
}

export function deleteContent(type: ContentType, id: string) {
  const data = getAppData();
  const collection = data[type] as EditableItem[];
  const found = collection.find((item) => item.id === id);
  (data[type] as EditableItem[]) = collection.filter((item) => item.id !== id);
  addActivity(data, "Deleted", found?.title ?? id);
  saveAppData(data);
}

export function addLead(input: Omit<Lead, "id" | "status" | "notes" | "createdAt">) {
  const data = getAppData();
  const lead: Lead = { ...input, id: `lead-${crypto.randomUUID()}`, status: "new", notes: "", createdAt: new Date().toISOString() };
  data.leads = [lead, ...data.leads];
  addActivity(data, "Captured lead", `${input.type}: ${input.email}`);
  saveAppData(data);
  return lead;
}

export function updateLead(id: string, patch: Partial<Lead>) {
  const data = getAppData();
  data.leads = data.leads.map((lead) => (lead.id === id ? { ...lead, ...patch } : lead));
  addActivity(data, "Updated lead", id);
  saveAppData(data);
}

export function deleteLead(id: string) {
  const data = getAppData();
  data.leads = data.leads.filter((lead) => lead.id !== id);
  addActivity(data, "Deleted lead", id);
  saveAppData(data);
}

export function addSubscriber(email: string) {
  const data = getAppData();
  const exists = data.newsletter.some((item) => item.email.toLowerCase() === email.toLowerCase());
  if (!exists) {
    const subscriber: NewsletterSubscriber = { id: `sub-${crypto.randomUUID()}`, email, createdAt: new Date().toISOString() };
    data.newsletter = [subscriber, ...data.newsletter];
    addActivity(data, "Added newsletter subscriber", email);
    saveAppData(data);
  }
}

export function updateSettings(settings: AppData["settings"]) {
  const data = getAppData();
  data.settings = settings;
  addActivity(data, "Updated", "Site settings");
  saveAppData(data);
}

export function updateUsers(users: AppData["users"]) {
  const data = getAppData();
  data.users = users;
  addActivity(data, "Updated", "Users and roles");
  saveAppData(data);
}

export function addMedia(file: { name: string; url: string; type: string }) {
  const data = getAppData();
  data.media = [{ id: `media-${crypto.randomUUID()}`, createdAt: new Date().toISOString(), ...file }, ...data.media];
  addActivity(data, "Uploaded", file.name);
  saveAppData(data);
}

export function deleteMedia(id: string) {
  const data = getAppData();
  data.media = data.media.filter((item) => item.id !== id);
  addActivity(data, "Deleted media", id);
  saveAppData(data);
}

export function exportCsv(rows: Record<string, unknown>[], filename: string) {
  if (!canStore()) return;
  const keys = Object.keys(rows[0] ?? { empty: "" });
  const body = [keys.join(","), ...rows.map((row) => keys.map((key) => JSON.stringify(row[key] ?? "")).join(","))].join("\n");
  const blob = new Blob([body], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function login(email: string, password: string) {
  const ok = email === "admin@micronicsdevlon.com" && password === "Admin123!";
  if (ok && canStore()) window.localStorage.setItem(AUTH_KEY, "true");
  return ok;
}

export function logout() {
  if (canStore()) window.localStorage.removeItem(AUTH_KEY);
}

export function isLoggedIn() {
  return canStore() && window.localStorage.getItem(AUTH_KEY) === "true";
}

function addActivity(data: AppData, action: string, target: string) {
  data.activity = [{ id: `activity-${crypto.randomUUID()}`, actor: "Demo Admin", action, target, createdAt: new Date().toISOString() }, ...data.activity].slice(0, 150);
}
