import type { Metadata } from "next";
import Link from "next/link";
import { ArtistPhotoPlaceholder } from "@/components/artist-photo-placeholder";
import { PageHero } from "@/components/page-hero";
import { buildPlatformLinks, PlatformLinks } from "@/components/platform-links";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { activeRoster, collabRoster, pastRoster } from "@/lib/artists";

export const metadata: Metadata = {
  title: "Roster — Anka Entertainment",
  description:
    "Roster kecil, dijaga sengaja. Yang sedang aktif dan yang pernah jadi bagian dari perjalanan Anka Entertainment.",
};

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
        {activeRoster.map((artist) => (
          <section
            key={artist.slug}
            className="border-b border-border bg-background py-20"
          >
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
                    {artist.name}
                  </h2>
                  <p className="mt-2 text-[14px] font-semibold text-muted">
                    {artist.genre?.join(", ")}
                    {artist.yearStart ? ` · Sejak ${artist.yearStart}` : ""}
                  </p>

                  <p className="mt-6 text-[17px] leading-[1.8] text-muted">
                    {artist.shortBio ?? (
                      <span className="italic">Belum ada bio buat artist ini.</span>
                    )}
                  </p>

                  <div className="mt-8">
                    <PlatformLinks platforms={buildPlatformLinks(artist)} />
                    <Link
                      href={`/roster/${artist.slug}`}
                      className="mt-4 inline-block text-[14px] font-bold text-foreground underline decoration-border underline-offset-4 transition-colors duration-fast ease-out hover:decoration-foreground"
                    >
                      Lihat profil lengkap →
                    </Link>
                  </div>
                </div>

                <ArtistPhotoPlaceholder name={artist.name} />
              </div>
            </div>
          </section>
        ))}

        {/* ---------- COLLABORATION — project-based, bukan tenure, dan
             BUKAN bagian dari roster (Kaiel: "kalau artis kolaborasi mah
             bukan bagian gua"). Pill SENGAJA non-clickable — gak ada
             halaman profil buat tier ini (lihat /roster/[slug]), beda
             dari Active/Past Roster yang emang dilink. Cuma nama sebagai
             penanda, gak ada tanggal (gak relevan buat project-based).
             Mekanik pill diambil dari situs lama (`CollaborationsAlumniClient`),
             radius-nya tetap ikut sistem kita (chip rounded-sm), bukan
             rounded-full kayak situs lama. Rilisan yang melibatkan
             kolaborator TETAP bisa diakses normal lewat Katalog — cuma
             profil artist-nya yang gak ada.
             DUMMY, lihat komentar di src/lib/artists.ts. ---------- */}
        {collabRoster.length > 0 ? (
          <section className="border-b border-border bg-background py-20">
            <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
              <div className="max-w-[62ch]">
                <h2 className="text-[clamp(24px,3vw,34px)] font-bold leading-[1.15]">
                  Kolaborasi.
                </h2>
                <p className="mt-3 text-[15px] leading-[1.7] text-muted">
                  Project-based, bukan bagian dari roster eksklusif.
                </p>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {collabRoster.map((c) => (
                  <span
                    key={c.slug}
                    className="chip rounded-sm px-3 py-1.5 text-[13px]"
                  >
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          </section>
        ) : null}

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
                <li key={p.slug}>
                  <Link
                    href={`/roster/${p.slug}`}
                    className="flex items-center justify-between gap-4 py-5 transition-colors duration-fast ease-out hover:bg-hover"
                  >
                    <p className="text-[18px] font-bold">{p.name}</p>
                    <p className="tabular text-[13px] text-muted">
                      {p.yearStart} — {p.yearEnd}
                    </p>
                  </Link>
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
