import type { MetadataRoute } from "next";
import { artists } from "@/lib/artists";
import { releases } from "@/lib/releases";
import { site } from "@/lib/site";

/** Semua halaman publik. Kolaborator tidak punya halaman, jadi tidak ikut
 * (sama dengan generateStaticParams di /roster/[slug]). */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;

  const pages: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    { url: url("/roster"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/catalog"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/services"), changeFrequency: "yearly", priority: 0.6 },
    { url: url("/about"), changeFrequency: "yearly", priority: 0.6 },
    { url: url("/anka-group"), changeFrequency: "yearly", priority: 0.5 },
    { url: url("/submit"), changeFrequency: "monthly", priority: 0.7 },
    { url: url("/privacy"), changeFrequency: "yearly", priority: 0.2 },
    { url: url("/terms"), changeFrequency: "yearly", priority: 0.2 },
    { url: url("/cookies"), changeFrequency: "yearly", priority: 0.2 },
  ];

  const artistPages = artists
    .filter((a) => a.tier !== "collaboration")
    .map((a) => ({
      url: url(`/roster/${a.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  const releasePages = releases.map((r) => ({
    url: url(`/catalog/${r.slug}`),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...artistPages, ...releasePages];
}
