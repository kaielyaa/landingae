import type { Metadata } from "next";
import Link from "next/link";
import { InlineTag } from "@/components/inline-tag";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kirim Demo — Anka Entertainment",
  description:
    "Dua cara masuk ke ekosistem Anka. Gabung sebagai artist, atau distribusi musik lewat Lantuns.",
};

export default function SubmitPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <PageHero
          title={
            <>
              Mari{" "}
              <span className="inline-block rotate-1 rounded-md bg-accent px-3 py-0.5 leading-[1.05] text-accent-foreground">
                ngobrol
              </span>
              .
            </>
          }
          description="Dua cara untuk masuk ke ekosistem Anka. Pilih yang sesuai posisi kamu sekarang — setiap submission kami baca dan respond, meski kadang butuh waktu."
        />

        <section className="border-b border-border bg-background py-20">
          <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
            <div className="grid gap-5 md:grid-cols-2">
              {/* Jalur 01 — CLOSED. Statusnya jelas tertulis, bukan cuma
                  opacity-50 (AGENTS.md: nonaktif harus jelas tapi tetap
                  terbaca). */}
              <div className="rounded-xl border border-border bg-surface p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="chip chip-primary rounded-sm px-2 py-1 text-[11px]">
                    Jalur 01
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-sm border border-warning/40 bg-warning-subtle px-2 py-1 text-[11px] font-bold text-warning">
                    Tutup
                  </span>
                </div>
                <h2 className="mt-4 text-[20px] font-bold">
                  Gabung dengan Anka Entertainment
                </h2>
                <p className="mt-2 text-[14px] leading-[1.7] text-muted">
                  Submission lagi tutup sementara. Kami akan membuka
                  kembali setelah review batch sebelumnya selesai —
                  terima kasih atas pengertiannya.
                </p>
                <div className="mt-5 rounded-md border border-dashed border-border px-4 py-3 text-[13px] text-muted">
                  Sambil nunggu, kamu bisa follow Instagram kami buat
                  update, atau lihat roster yang sedang aktif.
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[14px] font-bold text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                  >
                    Follow Instagram
                  </a>
                  <Link
                    href="/roster"
                    className="text-[14px] font-bold text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                  >
                    Lihat roster
                  </Link>
                  <a
                    href="mailto:hello@ankaentertainment.com"
                    className="text-[14px] font-bold text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                  >
                    Ada pertanyaan?
                  </a>
                </div>
              </div>

              {/* Jalur 02 — terbuka, ke Lantuns. */}
              <div className="rounded-xl border border-border bg-surface p-7">
                <span className="chip chip-accent rounded-sm px-2 py-1 text-[11px]">
                  Jalur 02
                </span>
                <h2 className="mt-4 text-[20px] font-bold">
                  Distribusi via Lantuns
                </h2>
                <p className="mt-2 text-[14px] leading-[1.7] text-muted">
                  Buat siapa pun yang cuma butuh distribusi musik ke 150+
                  platform global. Mandiri, master tetap di kamu.
                </p>
                <ul className="mt-5 space-y-2 text-[14px] text-muted">
                  <li>150+ platform streaming di seluruh dunia</li>
                  <li>Manajemen royalti & analitik</li>
                  <li>Terbuka untuk artist & label eksternal</li>
                </ul>
                <a
                  href="https://lantuns.com"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block rounded-md bg-foreground px-6 py-3 text-[14px] font-bold text-background transition-transform duration-fast ease-out hover:-translate-y-0.5"
                >
                  Kunjungi Lantuns
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-2 py-16">
          <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
            <p className="max-w-[52ch] text-[15px] leading-[1.7] text-muted">
              Anka Entertainment fokus penuh sebagai label. Distribusi
              musik ditangani sister company kami, <InlineTag>Lantuns</InlineTag>.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
