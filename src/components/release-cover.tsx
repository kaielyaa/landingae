import { Image as ImageIcon } from "lucide-react";
import { PinnedPlaceholder } from "@/components/pinned-placeholder";
import { cn } from "@/lib/utils";

/** Cover besar buat halaman detail rilisan (`/catalog/[slug]`) — belum
 * ada artwork asli (rencana lewat Sanity), pakai treatment "ditempel
 * washi tape" yang sama kayak `ArtistPhotoPlaceholder`, cuma aspect
 * square (cover album/single, bukan potret orang). Reuse `PinnedPlaceholder`
 * biar dua tempat ini tetap satu sistem, gak drift. */
export function ReleaseCoverPlaceholder({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  const mark = title.slice(0, 2).toUpperCase();

  return (
    <PinnedPlaceholder
      label={`Cover ${title} belum diupload`}
      mark={mark}
      aspectClassName="aspect-square"
      className={cn("max-w-[420px]", className)}
    />
  );
}

/** Thumbnail kecil buat baris list (Home "Dari katalog kami" & halaman
 * Katalog) — SENGAJA gak pakai treatment tape/monogram kayak versi besar
 * di atas. Di ukuran ~48px, tape+monogram bakal gak kebaca sama sekali,
 * cuma jadi noise. Ini state kosong yang jujur tapi minimal: kotak
 * netral + ikon, ngikut aturan radius (tinggi 48px -> radius-md 12px,
 * ~25% dari tinggi, pas di rentang 20-35%). */
export function ReleaseCoverThumb({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex aspect-square w-12 flex-none items-center justify-center rounded-md border border-border bg-surface-2 text-muted",
        className,
      )}
    >
      <ImageIcon className="h-4 w-4" aria-hidden />
    </div>
  );
}
