import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { AnkaGroupContent } from "@/components/anka-group/anka-group-content";

export const metadata: Metadata = {
  title: "Anka Group — Rumah Seni dan Komunitas | Anka",
  description:
    "Anka Group adalah kolaborasi seniman, kurator, dan komunitas yang merakit acara, rilis, dan ruang untuk musik dan seni visual. Lihat jadwal, rilis, dan cara ikut.",
  openGraph: {
    title: "Anka Group — Rumah Seni dan Komunitas",
    description:
      "Kolaborasi seniman, kurator, dan komunitas yang merakit acara, rilis, dan ruang untuk musik dan seni visual.",
    type: "website",
  },
};

export default function AnkaGroupPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <PageHero
        title="Anka Group"
        subtitle="Rumah seni dan komunitas di balik acara, rilis, dan ruang yang kita rakit bersama."
        chips={["Seni visual", "Musik", "Komunitas"]}
        align="left"
      />
      <main className="flex-1">
        <AnkaGroupContent />
      </main>
      <SiteFooter />
    </div>
  );
}