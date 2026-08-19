import type { Metadata } from "next";
import Link from "next/link";
import { ArtistPhotoPlaceholder } from "@/components/artist-photo-placeholder";
import { PageHero } from "@/components/page-hero";
import { dbProjectPlatforms, PlatformLinks } from "@/components/platform-links";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Roster — Anka Entertainment",
  description:
    "Roster kecil, dijaga sengaja. Yang sedang aktif dan yang pernah jadi bagian dari perjalanan Anka Entertainment.",
};

const pastRoster = [
  { name: "Putri Clarantika", years: "2022 — 2024" },
  { name: "Suci Arshinta", years: "2022 — 2024" },
];

export default function RosterPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <PageHero
          title={
            <>
              Bukan tentang{" "}
              <span className="inline-block -rotate-1 rounded-md bg-primary px-3 py-0.5 leading-[1.05] text-primary-foreground">
                banyak
              </span>
              . Tentang yang{" "}
              <span className="inline-block rotate-1 rounded-md bg-accent px-3 py-0.5 leading-[1.05] text-accent-foreground">
                tepat
              </span>
              .
            </>
          }
          description="Anka Entertainment menjaga roster tetap kecil. Setiap artist yang masuk lewat seleksi yang teliti — bukan soal popularitas, tapi soal kesiapan tumbuh bareng."
        />

        {/* ---------- ACTIVE ROSTER ---------- */}
        <section className="border-b border-border bg-background py-20">
          <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
            <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
              <div className="max-w-[62ch]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip chip-accent rounded-sm px-2 py-1 text-[12px]">
                    Live
                  </span>
                  <span className="chip rounded-sm px-2 py-1 text-[12px]">
                    Eksklusif
                  </span>
                </div>

                <h2 className="mt-5 text-[clamp(32px,5vw,64px)] font-bold leading-[1.05] tracking-tight">
                  DB Project
                </h2>
                <p className="mt-2 text-[14px] font-semibold text-muted">
                  Electronic · Sejak 2021
                </p>

                <p className="mt-6 text-[17px] leading-[1.8] text-muted">
                  Project remix elektronik yang ngolah ulang lagu jadi versi
                  baru. Tiap track di-rebuild dari instinct — gak ada
                  formula, cuma vibe dan eksperimen.
                </p>

                <div className="mt-8">
                  <PlatformLinks platforms={dbProjectPlatforms} />
                  <Link
                    href="/roster/db-project"
                    className="mt-4 inline-block text-[14px] font-bold text-foreground underline decoration-border underline-offset-4 transition-colors duration-fast ease-keluar hover:decoration-foreground"
                  >
                    Lihat profil lengkap →
                  </Link>
                </div>
              </div>

              <ArtistPhotoPlaceholder name="DB Project" />
            </div>
          </div>
        </section>

        {/* ---------- PAST ROSTER ---------- */}
        <section className="bg-surface-2 py-20">
          <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
            <div className="max-w-[62ch]">
              <h2 className="text-[clamp(24px,3vw,34px)] font-bold leading-[1.15]">
                Pernah jadi bagian.
              </h2>
              <p className="mt-3 text-[15px] leading-[1.7] text-muted">
                Tidak setiap perjalanan harus berakhir di tempat yang sama.
                Mereka membentuk apa yang Anka Entertainment jadi hari ini.
              </p>
            </div>

            <ul className="mt-10 divide-y divide-border border-t border-border">
              {pastRoster.map((p) => (
                <li
                  key={p.name}
                  className="flex items-center justify-between gap-4 py-5"
                >
                  <p className="text-[18px] font-bold">{p.name}</p>
                  <p className="tabular text-[13px] text-muted">{p.years}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
