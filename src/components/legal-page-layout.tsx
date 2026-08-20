"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type TocItem = { id: string; label: string };

/** Reusable buat 3 halaman legal (Privasi/Ketentuan/Cookie) — sama
 * pola kayak PageHero (header fixed, gak makan ruang layout, jadi
 * section pertama wajib pt-32/md:pt-40), plus TOC yang sticky di
 * desktop, stack biasa di mobile.
 *
 * Mekanik TOC-sticky + scroll-to-section ini diambil dari situs lama
 * (`LegalPageLayout`), gaya visualnya (glow-orb, gradient, font-serif-
 * italic) SENGAJA dibuang — diganti token & tipografi sistem kita.
 * Isi tiap section ditulis HTML semantik polos (`.legal-content` di
 * globals.css yang nanganin styling-nya), bukan className berulang —
 * teksnya panjang, class Tailwind di tiap tag bakal jadi noise. */
export function LegalPageLayout({
  title,
  lastUpdated,
  description,
  toc,
  children,
}: {
  title: string;
  lastUpdated: string;
  description: string;
  toc: TocItem[];
  children: ReactNode;
}) {
  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <section className="border-b border-border bg-surface-2 pb-16 pt-32 md:pt-40">
        <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
          <div className="max-w-[62ch]">
            <p className="tabular text-[13px] font-bold text-muted">
              Terakhir diperbarui · {lastUpdated}
            </p>
            <h1 className="mt-3 text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-tight">
              {title}
            </h1>
            <p className="mt-5 text-[16px] leading-[1.8] text-muted">
              {description}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.6fr]">
            <aside>
              <div className="lg:sticky lg:top-28">
                <p className="text-[13px] font-bold uppercase tracking-wide text-muted">
                  Daftar isi
                </p>
                <nav className="mt-4">
                  <ul className="space-y-1">
                    {toc.map((item, i) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => scrollToSection(item.id)}
                          className="flex w-full items-baseline gap-3 rounded-md px-3 py-2 text-left transition-colors duration-fast ease-keluar hover:bg-hover"
                        >
                          <span className="tabular flex-none text-[11px] text-muted">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[14px] text-foreground">
                            {item.label}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="mt-6 border-t border-border pt-5">
                  <p className="text-[13px] leading-[1.7] text-muted">
                    Ada pertanyaan?{" "}
                    <a
                      href="mailto:hello@ankaentertainment.com"
                      className="font-bold text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                    >
                      hello@ankaentertainment.com
                    </a>
                  </p>
                </div>
              </div>
            </aside>

            <article className="legal-content max-w-[70ch]">
              {children}
            </article>
          </div>

          <div className="mt-16 flex items-center justify-between border-t border-border pt-8">
            <Link
              href="/"
              className="text-[13px] font-bold text-muted underline decoration-border underline-offset-4 transition-colors duration-fast ease-keluar hover:text-foreground hover:decoration-foreground"
            >
              ← Kembali ke beranda
            </Link>
            <span className="tabular text-[12px] text-muted">
              v · {lastUpdated}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
