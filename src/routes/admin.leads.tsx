import { createFileRoute } from "@tanstack/react-router";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { LeadsManager } from "@/components/admin/AdminTables";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/leads")({
  head: () => seo({ title: "Leads Admin | Micronics Devlon", description: "Manage local demo contact, trial, demo and quote inquiries." }),
  component: () => <AdminGuard><AdminShell title="Leads and inquiries" description="Filter, update status, export and delete locally stored requests."><LeadsManager /></AdminShell></AdminGuard>,
});
