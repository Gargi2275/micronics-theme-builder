import { createFileRoute } from "@tanstack/react-router";
import { FeaturesPage } from "@/components/site/ListPages";
import { seo } from "@/lib/seo";
import { imageBank } from "@/data/mock";

export const Route = createFileRoute("/features")({
  head: () => seo({ title: "Backup Features | Micronics Devlon", description: "Explore immutable backup, AES-256 encryption, two-factor access, deduplication, granular restore and restore testing.", image: imageBank.dashboard }),
  component: FeaturesPage,
});
