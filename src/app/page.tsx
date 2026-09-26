import Image from "next/image";
import Link from "next/link";
import { ArtistPhotoPlaceholder } from "@/components/artist-photo-placeholder";
import { HeroChipField } from "@/components/hero-chip-field";
import { InlineTag } from "@/components/inline-tag";
import { buildPlatformLinks, PlatformLinks } from "@/components/platform-links";
import { ReleaseCoverThumb } from "@/components/release-cover";
import { ScrollCue } from "@/components/scroll-cue";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ButtonLink } from "@/components/ui/button";
import { Sticker } from "@/components/ui/sticker";
import { collabRoster, featuredArtist, pastRoster } from "@/lib/artists";
import { releases } from "@/lib/releases";

export default function Home() {
  // Invariant: harus selalu ada 1 artist exclusive dengan featured:true di
  // src/lib/artists.ts. Kalau ini throw, itu bug data, bukan kasus yang
  // wajar ditangani UI (bukan "belum ada data dari user").
  if (!featuredArtist) {
    throw new Error("Home: tidak ada artist dengan featured:true di src/lib/artists.ts");
  }

  return (
    <>
      <SiteHeader />

      <main>
        {/* ---------- HERO — warna nempel di kata kunci, headline jadi
             satu-satunya visual utama. Gak ada foto/card terpisah;
             sesuai brief: kalem/b-aja di permukaan (tipografi netral),
             "asik"-nya muncul di kata yang sengaja di-highlight. ---------- */}
        <section className="relative flex min-h-dvh items-center py-24">
          <HeroChipField />

          <div className="relative z-10 mx-auto max-w-[80rem] px-[var(--page-gutter)] text-center">
            <h1 className="text-[clamp(34px,7vw,96px)] font-bold leading-[1.3] tracking-tight">
              Label musik <Sticker tone="primary">independen</Sticker>
              , <br className="hidden sm:block" />
              dari{" "}
              <Sticker tone="accent" tilt="right">
                pop
              </Sticker>{" "}
              sampai <Sticker tone="invert">electronic</Sticker>.
            </h1>
            <p className="mx-auto mt-7 max-w-[46ch] text-[16px] leading-[1.65] text-muted">
              Roster kecil, kontrak panjang. Sejak 2021, kami develop,
              record, dan release lintas genre — bukan sekadar upload.
              Distribusi Musik ditangani sister company kami, Lantuns.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/submit" size="lg">
                Kirim Demo
              </ButtonLink>
              <ButtonLink href="/roster" variant="invert" size="lg">
                Lihat Roster
              </ButtonLink>
            </div>
          </div>

          <ScrollCue target="#manifesto" />
        </section>

        {/* ---------- BEHIND THE LABEL — storytelling singkat, bukan
             card-grid fitur. Develop/Record/Release muncul sebagai chip
             inline di dalam paragraf, bukan dipisah ke 3 kotak — biar
             kebaca sebagai satu narasi, bukan daftar layanan. Chip yang
             sama dipakai di HeroChipField, jadi bahasa visualnya nyambung
             ke hero. ---------- */}
        <section
          id="manifesto"
          className="relative overflow-hidden border-t border-border bg-surface-2 py-16"
        >
          <div className="relative z-10 mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
            <div className="max-w-[62ch]">
              <h2 className="text-[clamp(28px,3.8vw,46px)] font-bold leading-[1.15]">
                Bukan content factory.
              </h2>
              <p className="mt-6 text-[17px] leading-[1.8] text-muted">
                Kami label yang serius — roster kecil, kontrak panjang,
                fokus ke artist yang siap tumbuh bareng. Tiap rilisan mulai
                dari{" "}
                <span className="chip chip-primary mx-0.5 rounded-sm px-2 py-1 leading-[1.05] text-[13px]">
                  Develop
                </span>
                , lanjut ke{" "}
                <InlineTag>Record</InlineTag>{" "}
                yang kualitasnya dijaga ketat, ditutup dengan{" "}
                <span className="chip chip-accent mx-0.5 rounded-sm px-2 py-1 leading-[1.05] text-[13px]">
                  Release
                </span>{" "}
                yang dipikirin matang — bukan sekadar upload. Distribusi
                Musik ditangani sister company kami, <InlineTag>Lantuns</InlineTag>.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- FEATURED ARTIST — DB Project. Belum ada foto asli,
             jadi tetap jalur "tanpa gambar" (AGENTS.md): tipografi besar +
             chip sebagai visual utama, BUKAN gradient-card placeholder —
             biar gak jadi pola yang diulang-ulang tiap section cuma
             karena belum ada aset. ---------- */}
        <section className="border-t border-border bg-background py-20">
          <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
            <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
              <div className="max-w-[62ch]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip chip-accent rounded-sm px-2 py-1 text-[12px]">
                    Live
                  </span>
                  <span className="chip rounded-sm border-border px-2 py-1 text-[12px]">
                    Eksklusif
                  </span>
                </div>

                <h2 className="mt-5 text-[clamp(32px,5vw,64px)] font-bold leading-[1.05] tracking-tight">
                  {featuredArtist.name}
                </h2>
                <p className="mt-2 text-[14px] font-semibold text-muted">
                  {featuredArtist.genre?.join(", ")}
                  {featuredArtist.yearStart
                    ? ` · Sejak ${featuredArtist.yearStart}`
                    : ""}
                </p>

                <p className="mt-6 text-[17px] leading-[1.8] text-muted">
                  {featuredArtist.shortBio ?? (
                    <span className="italic">Belum ada bio buat artist ini.</span>
                  )}
                </p>

                {featuredArtist.bioAccent ? (
                  <p className="mt-6 text-[22px] font-bold leading-[1.35]">
                    &ldquo;{featuredArtist.bioAccent}&rdquo;
                  </p>
                ) : null}

                <div className="mt-8">
                  <PlatformLinks platforms={buildPlatformLinks(featuredArtist)} />
                  <Link
                    href={`/roster/${featuredArtist.slug}`}
                    className="mt-4 inline-block text-[14px] font-bold text-foreground underline decoration-border underline-offset-4 transition-colors duration-fast ease-out hover:decoration-foreground"
                  >
                    Lihat profil lengkap →
                  </Link>
                </div>
              </div>

              <ArtistPhotoPlaceholder name={featuredArtist.name} />
            </div>
          </div>
        </section>

        {/* ---------- KATALOG — list ala tracklist/catatan, bukan card
             grid dengan cover placeholder (belum ada artwork asli). Nomor
             urut dipakai karena ini beneran daftar terurut (bukan
             dekorasi), sesuai catatan frontend-design soal numbering. ---------- */}
        <section className="border-t border-border bg-surface-2 py-20">
          <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-[50ch]">
                <h2 className="text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.15]">
                  Dari katalog kami.
                </h2>
                <p className="mt-3 text-[15px] leading-[1.7] text-muted">
                  Distribusi Musik via <InlineTag>Lantuns</InlineTag>.
                </p>
              </div>
              <Link
                href="/catalog"
                className="text-[14px] font-bold text-foreground underline decoration-border underline-offset-4 transition-colors duration-fast ease-out hover:decoration-foreground"
              >
                Lihat semua katalog
              </Link>
            </div>

            <ul className="mt-10 divide-y divide-border border-t border-border">
              {releases.map((r, i) => (
                <li key={r.slug}>
                  <Link
                    href={`/catalog/${r.slug}`}
                    className="group flex items-center justify-between gap-6 py-5 transition-colors duration-fast ease-out hover:bg-hover"
                  >
                    <div className="flex min-w-0 items-center gap-5">
                      <span className="tabular w-6 flex-none text-[13px] font-bold text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <ReleaseCoverThumb />
                      <div className="min-w-0">
                        <p className="truncate text-[16px] font-bold">
                          {r.title}
                        </p>
                        <p className="truncate text-[13px] text-muted">
                          {r.artist} · {r.releaseType} · {r.year}
                        </p>
                      </div>
                    </div>
                    <span className="chip chip-accent hidden flex-none rounded-sm px-2 py-1 text-[11px] sm:inline-flex">
                      {r.tag}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- ROSTER LAIN — Collaboration (pill) + Past Roster
             (list), adaptive: 2 kolom kalau dua-duanya ada isinya, full
             width kalau salah satu kosong. Mekanik diambil dari situs
             lama (section gabungan yang sama), radius pill tetap ikut
             sistem kita (chip rounded-sm). ---------- */}
        <section className="border-t border-border bg-background py-20">
          <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.15]">
                Roster lain.
              </h2>
              <Link
                href="/roster"
                className="text-[14px] font-bold text-foreground underline decoration-border underline-offset-4 transition-colors duration-fast ease-out hover:decoration-foreground"
              >
                Lihat semua roster
              </Link>
            </div>

            <div
              className={`mt-10 grid gap-10 ${
                collabRoster.length > 0 && pastRoster.length > 0
                  ? "lg:grid-cols-2"
                  : "grid-cols-1"
              }`}
            >
              {collabRoster.length > 0 ? (
                <div>
                  <h3 className="text-[13px] font-bold uppercase tracking-wide text-muted">
                    Kolaborasi
                  </h3>
                  <p className="mt-1 text-[13px] text-muted">
                    Project-based, bukan roster eksklusif.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
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
              ) : null}

              {pastRoster.length > 0 ? (
                <div>
                  <h3 className="text-[13px] font-bold uppercase tracking-wide text-muted">
                    Pernah jadi bagian
                  </h3>
                  <ul className="mt-5 divide-y divide-border border-t border-border">
                    {pastRoster.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/roster/${p.slug}`}
                          className="flex items-center justify-between gap-4 py-4 transition-colors duration-fast ease-out hover:bg-hover"
                        >
                          <p className="text-[16px] font-bold">{p.name}</p>
                          <p className="tabular text-[13px] text-muted">
                            {p.yearStart} — {p.yearEnd}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* ---------- ANKA GROUP — dua brand, satu ekosistem. ---------- */}
        <section className="border-t border-border bg-surface-2 py-20">
          <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
            <h2 className="max-w-[50ch] text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.15]">
              Dua brand, satu ekosistem.
            </h2>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface p-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 flex-none items-center justify-center rounded-lg border border-border bg-foreground/[0.03] p-2.5">
                    <Image
                      src="/apple-touch-icon.png"
                      alt="Anka Entertainment"
                      width={36}
                      height={36}
                      className="rounded-sm"
                    />
                  </div>
                  <span className="chip chip-primary rounded-sm px-2 py-1 text-[11px]">
                    Label · Indonesia
                  </span>
                </div>
                <h3 className="mt-4 text-[22px] font-bold">
                  Anka Entertainment
                </h3>
                <p className="mt-2 text-[14px] leading-[1.7] text-muted">
                  Label musik independen. Develop, record, release. Saat
                  ini kamu ada di sini.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 flex-none items-center justify-center rounded-lg border border-border bg-foreground/[0.03] p-2.5">
                    <Image
                      src="/lantunsicon.png"
                      alt="Lantuns"
                      width={36}
                      height={36}
                      className="rounded-sm"
                    />
                  </div>
                  <span className="chip chip-accent rounded-sm px-2 py-1 text-[11px]">
                    Distribusi · Global
                  </span>
                </div>
                <h3 className="mt-4 text-[22px] font-bold">Lantuns</h3>
                <p className="mt-2 text-[14px] leading-[1.7] text-muted">
                  Distribusi musik ke 150+ platform streaming. Katalog
                  tetap milikmu.
                </p>
                <a
                  href="https://lantuns.com"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-[14px] font-bold text-foreground underline decoration-border underline-offset-4 transition-colors duration-fast ease-out hover:decoration-foreground"
                >
                  Kunjungi Lantuns
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- CTA PENUTUP — dua jalur. ---------- */}
        <section className="border-t border-border bg-background py-20">
          <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)] text-center">
            <h2 className="text-[clamp(28px,4vw,48px)] font-bold leading-[1.1]">
              Siap didengar?
            </h2>
            <p className="mx-auto mt-3 max-w-[46ch] text-[15px] leading-[1.7] text-muted">
              Dua jalur. Pilih yang sesuai posisi kamu sekarang.
            </p>

            <div className="mx-auto mt-10 grid max-w-[52rem] gap-5 text-left md:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface p-7">
                <span className="chip chip-primary rounded-sm px-2 py-1 text-[11px]">
                  Jalur 01
                </span>
                <h3 className="mt-4 text-[18px] font-bold">
                  Gabung sebagai Artist
                </h3>
                <p className="mt-2 text-[14px] leading-[1.7] text-muted">
                  Mau jadi bagian dari roster Anka Entertainment? Kirim
                  demo, kita ngobrol soal arah dan kerja sama jangka
                  panjang.
                </p>
                <Link
                  href="/submit"
                  className="mt-5 inline-block rounded-md bg-primary px-5 py-2.5 text-[13px] font-bold text-primary-foreground transition-transform duration-fast ease-out hover:-translate-y-0.5"
                >
                  Kirim Demo
                </Link>
              </div>

              <div className="rounded-xl border border-border bg-surface p-7">
                <span className="chip chip-accent rounded-sm px-2 py-1 text-[11px]">
                  Jalur 02
                </span>
                <h3 className="mt-4 text-[18px] font-bold">
                  Distribusi Regional
                </h3>
                <p className="mt-2 text-[14px] leading-[1.7] text-muted">
                  Mau rilis musik ke 150+ platform streaming global? Kami
                  handle Distribusi Musik via Lantuns.
                </p>
                <a
                  href="https://lantuns.com"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block rounded-md bg-foreground px-5 py-2.5 text-[13px] font-bold text-background transition-transform duration-fast ease-out hover:-translate-y-0.5"
                >
                  Kunjungi Lantuns
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
