import type { Metadata } from "next";
import { ArtistFeature } from "@/components/artist-feature";
import { CreditList } from "@/components/credit-list";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StampSticker } from "@/components/stamp-sticker";
import { Section, SectionHeading, TextLink } from "@/components/ui/section";
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
              <StampSticker trigger="load" tone="primary" delay={320}>
                banyak
              </StampSticker>
              . Tentang yang{" "}
              <StampSticker trigger="load" tone="accent" tilt="right" delay={480}>
                tepat
              </StampSticker>
              .
            </>
          }
          description="Anka Entertainment menjaga roster tetap kecil. Setiap artist yang masuk lewat seleksi yang teliti — bukan soal popularitas, tapi soal kesiapan tumbuh bareng."
        />

        {/* AKTIF — blok profil yang sama dengan Home, nama jadi elemen
            terbesar tiap blok. */}
        {activeRoster.length > 0 ? (
          activeRoster.map((artist) => (
            <Section key={artist.slug} tone="base" space="loose">
              <ArtistFeature
                artist={artist}
                label="Roster aktif"
                footer={
                  <TextLink href={`/roster/${artist.slug}`}>
                    Lihat profil lengkap
                  </TextLink>
                }
              />
            </Section>
          ))
        ) : (
          <Section tone="base" space="normal">
            <p className="max-w-[56ch] text-[17px] leading-[1.8] text-muted">
              Belum ada artist aktif yang bisa ditampilkan. Kabar roster baru
              diumumkan lewat Instagram kami.
            </p>
          </Section>
        )}

        {/* KOLABORASI — project-based, bukan bagian roster (Kaiel
            2026-08-20). Nama saja, tidak bisa diklik, tidak ada profil.
            Disembunyikan kalau kosong. DUMMY — lihat src/lib/artists.ts. */}
        {collabRoster.length > 0 ? (
          <Section tone="sunken" space="tight">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
              <SectionHeading
                title="Kolaborasi."
                lead="Project-based, bukan bagian dari roster eksklusif."
              />
              <CreditList
                credits={collabRoster.map((a) => ({
                  name: a.name,
                  value: "Project-based",
                }))}
              />
            </div>
          </Section>
        ) : null}

        {/* ALUMNI — bisa diklik ke profil. */}
        {pastRoster.length > 0 ? (
          <Section tone={collabRoster.length > 0 ? "base" : "sunken"} space="normal">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
              <SectionHeading
                title="Pernah jadi bagian."
                lead="Tidak setiap perjalanan harus berakhir di tempat yang sama. Mereka membentuk apa yang Anka Entertainment jadi hari ini."
              />
              <CreditList
                credits={pastRoster.map((a) => ({
                  name: a.name,
                  value: `${a.yearStart} — ${a.yearEnd}`,
                  href: `/roster/${a.slug}`,
                }))}
              />
            </div>
          </Section>
        ) : null}
      </main>

      <SiteFooter />
    </>
  );
}
