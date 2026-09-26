import type { CSSProperties, ReactNode } from "react";
import { TextLink } from "@/components/ui/section";
import { site } from "@/lib/site";

type TocItem = { id: string; label: string };

/** Tiga halaman legal (Privasi, Ketentuan, Cookie). Judul memakai pola
 * `PageHero` (naik saat dibuka, `pt-32 md:pt-40` karena header fixed);
 * daftar isi sticky di desktop, bertumpuk di mobile.
 *
 * Daftar isi = tautan anchor biasa (`#id`), bukan tombol JS — bisa dibuka
 * di tab baru, dibagikan, dan jalan tanpa JavaScript. Jarak dari header
 * lewat `scroll-margin` di `.legal-content section` (globals.css). Isi
 * ditulis HTML semantik polos, digayakan `.legal-content`. */
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
  return (
    <>
      <section className="border-b border-border bg-surface-2 pb-16 pt-32 md:pt-40">
        <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
          <div className="max-w-[62ch]">
            <p className="rise-on-load text-[13px] font-medium text-muted tabular-nums">
              Terakhir diperbarui · {lastUpdated}
            </p>
            <h1
              className="rise-on-load mt-3 text-[clamp(32px,5vw,64px)] font-bold leading-[1.1] tracking-tight"
              style={{ "--rise-delay": "80ms" } as CSSProperties}
            >
              {title}
            </h1>
            <p
              className="rise-on-load mt-5 text-[17px] leading-[1.8] text-muted"
              style={{ "--rise-delay": "160ms" } as CSSProperties}
            >
              {description}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.6fr] lg:gap-20">
            <aside>
              <div className="lg:sticky lg:top-24">
                <h2 className="text-[13px] font-bold uppercase tracking-[0.05em] text-muted">
                  Daftar isi
                </h2>
                <nav aria-label="Daftar isi" className="mt-4">
                  <ol className="border-y border-border">
                    {toc.map((item, i) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="-mx-3 flex items-baseline gap-3 rounded-sm px-3 py-2 transition-colors duration-fast ease-out hover:bg-hover"
                        >
                          <span className="w-6 flex-none text-[12px] text-muted tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[14px]">{item.label}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <p className="mt-6 text-[14px] leading-[1.7] text-muted">
                  Ada pertanyaan?{" "}
                  <TextLink href={`mailto:${site.contactEmail}`}>
                    {site.contactEmail}
                  </TextLink>
                </p>
              </div>
            </aside>

            <article className="legal-content max-w-[70ch]">{children}</article>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
            <TextLink href="/" className="text-[13px] text-muted hover:text-foreground">
              ← Kembali ke beranda
            </TextLink>
            <span className="text-[12px] text-muted tabular-nums">
              Versi · {lastUpdated}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
