import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ViewTransition, type CSSProperties } from "react";
import { Reveal } from "@/components/reveal";

export type Credit = {
  name: string;
  value?: string;
  href?: string;
  /** Nama view transition kiri (mis. nama artist → h1 profilnya). */
  vtName?: string;
};

/** Tanda tangan 2: kredit ala liner notes — kiri, garis titik, kanan.
 *
 * - `people` (bawaan): nama tebal di kiri, keterangan redup di kanan
 *   ("Suci Arshinta ····· 2022 — 2024")
 * - `facts`: label redup di kiri, nilai tebal di kanan
 *   ("Genre ····· Electronic")
 *
 * Baris ber-`href` bisa diklik; yang tidak, teks biasa (mis. kolaborator
 * yang memang tidak punya halaman).
 *
 * Gerak (arah.md #3): saat masuk layar, garis titik tergambar baris demi
 * baris dan nilainya muncul di ujung — "kredit yang ditulis". Nama tidak
 * pernah disembunyikan. */
export function CreditList({
  title,
  credits,
  variant = "people",
  className,
}: {
  title?: string;
  credits: Credit[];
  variant?: "people" | "facts";
  className?: string;
}) {
  if (credits.length === 0) return null;

  const strong = "text-[17px] font-bold";
  const soft = "text-[14px] text-muted tabular-nums";
  const [left, right] = variant === "people" ? [strong, soft] : [soft, strong];

  return (
    <Reveal className={className}>
      {title ? (
        <h3 className="mb-4 text-[13px] font-bold uppercase tracking-[0.05em] text-muted">
          {title}
        </h3>
      ) : null}
      <ul>
        {credits.map((c, i) => {
          const external = c.href ? /^(https?:|mailto:)/.test(c.href) : false;
          const Arrow = external ? ArrowUpRight : ArrowRight;
          const row = (
            <>
              {c.vtName ? (
                <ViewTransition name={c.vtName} share="morph" default="none">
                  <span className={left}>{c.name}</span>
                </ViewTransition>
              ) : (
                <span className={left}>{c.name}</span>
              )}
              <span
                aria-hidden
                data-leader=""
                className="mx-3 h-px min-w-6 flex-1 origin-left -translate-y-1 border-b border-dotted border-muted/50"
              />
              {c.value ? (
                <span data-value="" className={right}>
                  {c.value}
                </span>
              ) : null}
              {/* Baris yang bisa dibuka diberi panah: → halaman di situs ini,
                  ↗ tautan keluar. */}
              {c.href ? (
                <Arrow
                  aria-hidden
                  className="ml-3 h-4 w-4 flex-none self-center text-muted transition-[translate,color] duration-fast ease-out group-hover:translate-x-0.5 group-hover:text-foreground"
                />
              ) : null}
            </>
          );
          return (
            <li key={c.name} style={{ "--i": i } as CSSProperties}>
              {c.href ? (
                <Link
                  href={c.href}
                  target={external && !c.href.startsWith("mailto:") ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="group -mx-3 flex items-baseline rounded-sm px-3 py-3 transition-colors duration-fast ease-out hover:bg-hover [&>span:first-child]:underline-offset-4 hover:[&>span:first-child]:underline"
                >
                  {row}
                </Link>
              ) : (
                <div className="flex items-baseline py-3">{row}</div>
              )}
            </li>
          );
        })}
      </ul>
    </Reveal>
  );
}
