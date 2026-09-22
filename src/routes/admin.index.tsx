import { createFileRoute } from "@tanstack/react-router";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { DashboardView } from "@/components/admin/AdminTables";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/")({
  head: () =>
    seo({
      title: "Admin Dashboard | Micronics Devlon",
      description: "Local demo dashboard for Micronics Devlon site content, leads and settings.",
    }),
  component: () => (
    <AdminGuard>
      <AdminShell title="Dashboard" description="Local analytics, leads and quick actions for the demo site.">
        <DashboardView />
      </AdminShell>
    </AdminGuard>
  ),
});
