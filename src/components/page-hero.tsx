import type { ReactNode } from "react";

/** Pola headline+intro yang dipakai di tiap halaman standalone (Roster,
 * Katalog, Layanan, Tentang, Submit). Header-nya `fixed` dan gak makan
 * ruang layout, jadi tiap section pertama wajib kasih padding-top sendiri
 * — itu yang di-handle `pt-32 md:pt-40` di sini. */
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
          <h1 className="text-[clamp(32px,5vw,64px)] font-bold leading-[1.05] tracking-tight">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 text-[17px] leading-[1.8] text-muted">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
