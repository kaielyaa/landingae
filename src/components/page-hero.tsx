import type { CSSProperties, ReactNode } from "react";

/** Judul halaman standalone (Roster, Katalog, Layanan, Tentang, Submit).
 * Header `fixed` tidak makan ruang layout, jadi section ini yang memberi
 * `pt-32 md:pt-40`.
 *
 * Sambutan mini saat dibuka (arah.md: Gerak #2): judul naik, deskripsi
 * menyusul. Stiker di judul ditulis pemakai sebagai
 * `<StampSticker trigger="load" delay={…}>` — mulai ±300ms supaya ditempel
 * setelah judulnya naik. */
export function PageHero({
  title,
  description,
}: {
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-surface-2 pb-16 pt-32 md:pt-40">
      <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
        <div className="max-w-[62ch]">
          <h1 className="rise-on-load text-[clamp(32px,5vw,64px)] font-bold leading-[1.1] tracking-tight">
            {title}
          </h1>
          {description ? (
            <p
              className="rise-on-load mt-5 text-[17px] leading-[1.8] text-muted"
              style={{ "--rise-delay": "160ms" } as CSSProperties}
            >
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
