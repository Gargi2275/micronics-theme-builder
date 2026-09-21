import { createFileRoute } from "@tanstack/react-router";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { ContentManager } from "@/components/admin/AdminTables";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/content")({
  head: () => seo({ title: "Content Admin | Micronics Devlon", description: "Manage products, services, solutions, features, platforms, pricing, FAQs, testimonials and posts locally." }),
  component: () => <AdminGuard><AdminShell title="Content" description="Search, sort, add, edit and delete all public site content in local storage."><ContentManager /></AdminShell></AdminGuard>,
});
