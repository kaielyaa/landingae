import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Highlight netral inline di teks body — dipakai berulang tiap nyebut
 * "Lantuns" (sister company) di berbagai halaman. Bagian dari sistem "3
 * warna highlight" arah.md (primary/accent/netral); ini varian netral,
 * `bg-foreground text-background` SOLID & kebalik antar tema, BUKAN
 * border+transparent (itu udah pernah salah pasang, lihat arah.md).
 *
 * Diekstrak jadi komponen setelah kepergok drift: 4 tempat (page.tsx x3,
 * submit/page.tsx x1) copy-paste manual, 2 di antaranya kepasang `py-0.5`
 * bukan `py-1` — di teks 13px, itu bikin tinggi ~17-18px, dan radius-sm
 * (8px) di situ ~45% dari tinggi, kebaca kayak pill. Distandarin ke
 * `py-1` (~37%, sesuai instance yang bener). Satu komponen, gak ada lagi
 * yang bisa drift diam-diam. */
export function InlineTag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "mx-0.5 inline-flex items-center gap-1.5 rounded-sm bg-foreground px-2 py-1 text-[13px] font-semibold leading-[1.05] text-background",
        className,
      )}
    >
      {children}
    </span>
  );
}
