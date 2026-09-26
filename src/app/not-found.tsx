import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StampSticker } from "@/components/stamp-sticker";
import { Tracklist } from "@/components/tracklist";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan — Anka Entertainment",
};

/** 404 — gaya liner notes: "track" yang dicari tidak ada di daftar.
 * Jalan keluar = daftar tujuan utama dalam bentuk Tracklist, plus tombol
 * ke beranda. */
export default function NotFound() {
  return (
    <>
      <SiteHeader />

      <main className="bg-background pb-24 pt-32 md:pb-32 md:pt-40">
        <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
          <p className="rise-on-load text-[13px] font-medium text-muted tabular-nums">
            Track 404 · tidak ditemukan
          </p>
          <h1
            className="rise-on-load mt-4 max-w-[18ch] text-[clamp(40px,7vw,96px)] font-bold leading-[1.02] tracking-[-0.03em]"
            style={{ "--rise-delay": "80ms" } as CSSProperties}
          >
            Halaman ini tidak ada di{" "}
            <StampSticker trigger="load" tone="primary" delay={380}>
              daftar
            </StampSticker>
            .
          </h1>
          <p
            className="rise-on-load mt-6 max-w-[52ch] text-[17px] leading-[1.8] text-muted"
            style={{ "--rise-delay": "160ms" } as CSSProperties}
          >
            Mungkin alamatnya salah ketik, atau halamannya sudah dipindah.
            Coba mulai dari salah satu ini:
          </p>

          <Tracklist
            className="mt-12 max-w-[48rem]"
            covers={false}
            tracks={[
              { href: "/roster", title: "Roster", meta: "Artist yang sedang aktif dan yang pernah jadi bagian" },
              { href: "/catalog", title: "Katalog", meta: "Semua rilisan, dibagi berdasarkan kepemilikan master" },
              { href: "/submit", title: "Kirim Demo", meta: "Gabung roster atau distribusi lewat Lantuns" },
            ]}
          />

          <ButtonLink href="/" size="lg" className="mt-10">
            Kembali ke beranda
          </ButtonLink>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
