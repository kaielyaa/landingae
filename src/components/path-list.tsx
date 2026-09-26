import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Path = {
  title: string;
  description: string;
  action: ReactNode;
};

/** Pilihan jalur bernomor, rata kiri — pengganti "dua kartu rata tengah".
 * Nomor sejajar baris pertama judul, tombol di kanan (turun ke bawah di
 * layar sempit). Dipakai di Home (Dua jalur) dan Layanan (Mulai dari mana). */
export function PathList({
  paths,
  className,
}: {
  paths: Path[];
  className?: string;
}) {
  return (
    <ol className={cn("divide-y divide-border border-y border-border", className)}>
      {paths.map((p, i) => (
        <li
          key={p.title}
          className="grid gap-4 py-8 md:grid-cols-[3rem_1fr_auto] md:items-start md:gap-8"
        >
          {/* pt-2: sejajarkan nomor dengan baris pertama judul. */}
          <span className="text-[13px] font-medium text-muted tabular-nums md:pt-2">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="max-w-[56ch]">
            <h3 className="text-[clamp(22px,2.4vw,28px)] font-bold leading-tight">
              {p.title}
            </h3>
            <p className="mt-2 text-[15px] leading-[1.7] text-muted">
              {p.description}
            </p>
          </div>
          <div className="md:self-center">{p.action}</div>
        </li>
      ))}
    </ol>
  );
}
