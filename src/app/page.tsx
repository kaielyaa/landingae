import Link from "next/link";
import { HeroChipField } from "@/components/hero-chip-field";
import { ScrollCue } from "@/components/scroll-cue";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const releases = [
  { title: "Sedang Berjuang", artist: "Suci Arshinta", year: "2023" },
  { title: "Bilang", artist: "Putri Clarantika", year: "2023" },
  { title: "Terlambat Kau Kembali", artist: "Suci Arshinta", year: "2023" },
];

const pastRoster = [
  { name: "Putri Clarantika", years: "2022 — 2024" },
  { name: "Suci Arshinta", years: "2022 — 2024" },
];

export default function Home() {
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
              Label musik{" "}
              <span className="inline-block -rotate-1 rounded-md bg-primary px-3 py-0.5 leading-[1.05] text-primary-foreground">
                independen
              </span>
              , <br className="hidden sm:block" />
              dari{" "}
              <span className="inline-block rotate-1 rounded-md bg-accent px-3 py-0.5 leading-[1.05] text-accent-foreground">
                pop
              </span>{" "}
              sampai{" "}
              <span className="inline-block -rotate-1 rounded-md bg-foreground px-3 py-0.5 leading-[1.05] text-background">
                electronic
              </span>
              .
            </h1>
            <p className="mx-auto mt-7 max-w-[46ch] text-[16px] leading-[1.65] text-muted">
              Roster kecil, kontrak panjang. Sejak 2021, kami develop,
              record, dan release lintas genre — bukan sekadar upload.
              Distribusi Musik ditangani sister company kami, Lantuns.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/submit"
                className="rounded-md bg-primary px-6 py-3 text-[14px] font-bold text-primary-foreground transition-transform duration-fast ease-keluar hover:-translate-y-0.5"
              >
                Kirim Demo
              </Link>
              <Link
                href="/roster"
                className="rounded-md bg-foreground px-6 py-3 text-[14px] font-bold text-background transition-transform duration-fast ease-keluar hover:-translate-y-0.5"
              >
                Lihat Roster
              </Link>
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
          {/* Residu dari energi hero — 2 chip aja, bukan full field. Biar
              section ini nyambung, bukan tiba-tiba mati abis hero yang
              padat. Idle sway doang, gak ada proximity-cursor (itu
              signature khusus hero). */}
          <span
            className="chip absolute right-[12%] top-[10%] hidden text-sm opacity-70 animate-sway shadow-sm md:inline-flex"
            style={{ "--base-rotate": "-4deg" } as React.CSSProperties}
          >
            Sejak 2021
          </span>
          <span
            className="chip chip-accent absolute bottom-[12%] right-[22%] hidden text-sm opacity-70 animate-sway shadow-sm md:inline-flex"
            style={{ "--base-rotate": "5deg", animationDelay: "-2s" } as React.CSSProperties}
          >
            Roster kecil
          </span>

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
                <span className="mx-0.5 inline-flex items-center gap-1.5 rounded-sm bg-foreground px-2 py-1 text-[13px] font-semibold leading-[1.05] text-background">
                  Record
                </span>{" "}
                yang kualitasnya dijaga ketat, ditutup dengan{" "}
                <span className="chip chip-accent mx-0.5 rounded-sm px-2 py-1 leading-[1.05] text-[13px]">
                  Release
                </span>{" "}
                yang dipikirin matang — bukan sekadar upload. Distribusi
                Musik ditangani sister company kami,{" "}
                <span className="mx-0.5 inline-flex items-center gap-1.5 rounded-sm bg-foreground px-2 py-1 text-[13px] font-semibold leading-[1.05] text-background">
                  Lantuns
                </span>
                .
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

              <p className="mt-6 text-[22px] font-bold leading-[1.35]">
                &ldquo;Setiap lagu punya sisi yang belum dibunyikan.&rdquo;
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/roster/db-project"
                  className="rounded-md bg-primary px-6 py-3 text-[14px] font-bold text-primary-foreground transition-transform duration-fast ease-keluar hover:-translate-y-0.5"
                >
                  Lihat profil lengkap
                </Link>
                <a
                  href="https://open.spotify.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[14px] font-semibold text-muted underline decoration-border underline-offset-4 transition-colors duration-fast ease-keluar hover:text-foreground"
                >
                  Spotify
                </a>
                <a
                  href="https://music.apple.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[14px] font-semibold text-muted underline decoration-border underline-offset-4 transition-colors duration-fast ease-keluar hover:text-foreground"
                >
                  Apple Music
                </a>
              </div>
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
                  Yang lagi didengerin.
                </h2>
                <p className="mt-3 text-[15px] leading-[1.7] text-muted">
                  Distribusi Musik via{" "}
                  <span className="mx-0.5 inline-flex items-center gap-1.5 rounded-sm bg-foreground px-2 py-0.5 text-[13px] font-semibold leading-[1.05] text-background">
                    Lantuns
                  </span>
                  .
                </p>
              </div>
              <Link
                href="/catalog"
                className="text-[14px] font-bold text-foreground underline decoration-border underline-offset-4 transition-colors duration-fast ease-keluar hover:decoration-foreground"
              >
                Lihat semua katalog
              </Link>
            </div>

            <ul className="mt-10 divide-y divide-border border-t border-border">
              {releases.map((r, i) => (
                <li key={r.title}>
                  <a
                    href="#"
                    className="group flex items-center justify-between gap-6 py-5 transition-colors duration-fast ease-keluar hover:bg-hover"
                  >
                    <div className="flex min-w-0 items-center gap-5">
                      <span className="tabular w-6 flex-none text-[13px] font-bold text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[16px] font-bold">
                          {r.title}
                        </p>
                        <p className="truncate text-[13px] text-muted">
                          {r.artist} · Single · {r.year}
                        </p>
                      </div>
                    </div>
                    <span className="chip chip-accent hidden flex-none rounded-sm px-2 py-1 text-[11px] sm:inline-flex">
                      Sedang Streaming
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- ROSTER LAIN — past roster, list singkat aja. ---------- */}
        <section className="border-t border-border bg-background py-20">
          <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.15]">
                Yang pernah jadi bagian.
              </h2>
              <Link
                href="/roster"
                className="text-[14px] font-bold text-foreground underline decoration-border underline-offset-4 transition-colors duration-fast ease-keluar hover:decoration-foreground"
              >
                Lihat semua roster
              </Link>
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

        {/* ---------- ANKA GROUP — dua brand, satu ekosistem. ---------- */}
        <section className="border-t border-border bg-surface-2 py-20">
          <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
            <h2 className="max-w-[50ch] text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.15]">
              Dua brand, satu ekosistem.
            </h2>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface p-7">
                <span className="chip chip-primary rounded-sm px-2 py-1 text-[11px]">
                  Label · Indonesia
                </span>
                <h3 className="mt-4 text-[22px] font-bold">
                  Anka Entertainment
                </h3>
                <p className="mt-2 text-[14px] leading-[1.7] text-muted">
                  Label musik independen. Develop, record, release. Saat
                  ini kamu ada di sini.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-7">
                <span className="chip chip-accent rounded-sm px-2 py-1 text-[11px]">
                  Distribusi · Global
                </span>
                <h3 className="mt-4 text-[22px] font-bold">Lantuns</h3>
                <p className="mt-2 text-[14px] leading-[1.7] text-muted">
                  Distribusi musik ke 150+ platform streaming. Katalog
                  tetap milikmu.
                </p>
                <a
                  href="https://lantuns.com"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-[14px] font-bold text-foreground underline decoration-border underline-offset-4 transition-colors duration-fast ease-keluar hover:decoration-foreground"
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
                  className="mt-5 inline-block rounded-md bg-primary px-5 py-2.5 text-[13px] font-bold text-primary-foreground transition-transform duration-fast ease-keluar hover:-translate-y-0.5"
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
                  className="mt-5 inline-block rounded-md bg-foreground px-5 py-2.5 text-[13px] font-bold text-background transition-transform duration-fast ease-keluar hover:-translate-y-0.5"
                >
                  Hubungi Kami
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
