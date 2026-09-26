import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "base" | "sunken";
type Space = "tight" | "normal" | "loose";

const tones: Record<Tone, string> = {
  base: "bg-background",
  sunken: "bg-surface-2",
};

// Ritme antar-section (arah.md: Layout & ritme). Rapat dan lega
// bergantian — bukan py seragam di semua section.
const spaces: Record<Space, string> = {
  tight: "py-14 md:py-20",
  normal: "py-20 md:py-28",
  loose: "py-24 md:py-36",
};

/** Wadah section: latar berganti, border atas tipis, lebar konten standar. */
export function Section({
  tone = "base",
  space = "normal",
  className,
  innerClassName,
  children,
  ...props
}: Omit<ComponentProps<"section">, "children"> & {
  tone?: Tone;
  space?: Space;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn("border-t border-border", tones[tone], spaces[space], className)}
      {...props}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]",
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}

/** Judul section: h2 besar rata kiri, pengantar opsional, tautan opsional
 * di kanan (turun ke bawah judul di layar sempit). */
export function SectionHeading({
  title,
  lead,
  action,
  className,
}: {
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        // content-start: di dalam grid, baris flex tidak ikut melar setinggi
        // kolom sebelah (kalau melar, items-end menjatuhkan judul ke dasar).
        "flex flex-wrap content-start items-end justify-between gap-x-10 gap-y-5",
        className,
      )}
    >
      <div>
        <h2 className="max-w-[20ch] text-[clamp(30px,4.2vw,56px)] font-bold leading-[1.1] tracking-tight">
          {title}
        </h2>
        {lead ? (
          <p className="mt-4 max-w-[56ch] text-[16px] leading-[1.7] text-muted">
            {lead}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

/** Tautan teks sekunder bergaris bawah ("Lihat semua katalog"). Tujuan
 * luar: tambahkan `target="_blank" rel="noreferrer"`. */
export function TextLink({ className, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "text-[14px] font-bold text-foreground underline decoration-border underline-offset-4 transition-colors duration-fast ease-out hover:decoration-foreground",
        className,
      )}
      {...props}
    />
  );
}
