import { Play } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/utils";

export type Track = {
  href: string;
  title: string;
  /** Baris kecil di bawah judul, gaya liner notes: "Artist · Single · 2023". */
  meta: string;
  /** Status rilis di kanan (disembunyikan <640px). */
  tag?: string;
  /** Cover kecil 48px. Kosong = kotak netral. */
  cover?: ReactNode;
};

/** Tanda tangan 2: daftar bernomor ala tracklist. Nomor = urutan asli,
 * bukan dekorasi. Hover/fokus (arah.md: Gerak #4): nomor berganti ikon ▶,
 * cover miring 2°, baris menyala. */
export function Tracklist({
  tracks,
  className,
}: {
  tracks: Track[];
  className?: string;
}) {
  return (
    <ol className={cn("divide-y divide-border border-y border-border", className)}>
      {tracks.map((t, i) => (
        <li key={t.href}>
          <Link
            href={t.href}
            className="group -mx-3 flex items-center gap-4 rounded-sm px-3 py-4 transition-colors duration-fast ease-out hover:bg-hover focus-visible:bg-hover active:bg-hover sm:gap-5"
          >
            <span className="relative flex w-6 flex-none justify-center">
              <span className="text-[13px] font-medium text-muted tabular-nums transition-opacity duration-fast ease-out group-hover:opacity-0 group-focus-visible:opacity-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Play
                aria-hidden
                className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 fill-current text-foreground opacity-0 transition-opacity duration-fast ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
              />
            </span>

            <span className="flex-none transition-[rotate] duration-fast ease-out group-hover:rotate-2 group-focus-visible:rotate-2">
              {t.cover ?? <CoverBlank />}
            </span>

            <span className="min-w-0 flex-1">
              <span className="block truncate text-[17px] font-bold">
                {t.title}
              </span>
              <span className="block truncate text-[13px] text-muted">
                {t.meta}
              </span>
            </span>

            {t.tag ? (
              <Chip tone="accent" className="hidden flex-none sm:inline-flex">
                {t.tag}
              </Chip>
            ) : null}
          </Link>
        </li>
      ))}
    </ol>
  );
}

/** Kotak cover kosong 48px — belum ada artwork. Radius md (25%). Tint
 * transparan (bukan token latar) supaya terlihat di section base maupun
 * sunken. */
function CoverBlank() {
  return (
    <span
      aria-hidden
      className="block h-12 w-12 rounded-md border border-border bg-foreground/[0.04]"
    />
  );
}
