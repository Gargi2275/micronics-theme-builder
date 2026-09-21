import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/site/Logo";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { login } from "@/services/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/login")({
  head: () => seo({ title: "Admin Login | Micronics Devlon", description: "Demo admin login for Micronics Devlon content management." }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@micronicsdevlon.com");
  const [password, setPassword] = useState("Admin123!");
  return <div className="relative grid min-h-screen place-items-center overflow-hidden bg-hero p-6 text-hero-foreground"><div className="absolute inset-0 bg-[image:var(--gradient-primary)] opacity-50" /><div className="orbit-ring left-10 top-10 opacity-40" /><div className="orbit-ring slow bottom-10 right-10 opacity-40" /><div className="relative z-10 w-full max-w-md rounded-3xl border border-hero-border bg-hero-glass p-8 shadow-glow backdrop-blur-xl"><div className="mb-8 flex items-center justify-between"><Logo to="/" /><ThemeToggle /></div><div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground"><LockKeyhole /></div><h1 className="font-display text-3xl font-black tracking-normal">Admin login</h1><p className="mt-2 text-hero-muted">Demo credentials are prefilled for local-only access.</p><form className="mt-8 grid gap-4" onSubmit={(e) => { e.preventDefault(); if (login(email, password)) { toast.success("Signed in locally"); navigate({ to: "/admin", replace: true }); } else toast.error("Invalid demo credentials"); }}><label className="grid gap-2 text-sm font-bold">Email<Input value={email} onChange={(e) => setEmail(e.target.value)} /></label><label className="grid gap-2 text-sm font-bold">Password<Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label><button type="button" className="w-fit text-sm font-bold text-accent hover:underline">Forgot password</button><Button variant="orange" size="lg">Sign in</Button></form></div></div>;
}
