import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** State kosong "gambar belum diupload", ditreatment kayak ditempel washi
 * tape — dipakai `ArtistPhotoPlaceholder` (4:5) dan
 * `ReleaseCoverPlaceholder` (1:1).
 *
 * SEMENTARA. Gerak ayunnya sudah dibuang (arah.md: gerak), dan di Fase 2
 * komponen ini diganti total: foto tampil kalau ada, kalau belum ada
 * layout tipografi — bukan kotak kosong di production. */
export function PinnedPlaceholder({
  label,
  mark,
  aspectClassName,
  className,
}: {
  label: string;
  mark: string;
  aspectClassName: string;
  className?: string;
}) {
  return (
    <div className={cn("relative w-full", className)}>
      <div
        aria-hidden
        className="absolute left-1/2 top-0 z-10 h-[30px] w-24 -translate-x-1/2 -translate-y-1/2 rotate-2 rounded-sm bg-primary"
      />

      <div
        className={cn(
          "relative flex w-full -rotate-1 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface p-6 shadow-md",
          aspectClassName,
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-6 -right-2 text-[128px] font-bold leading-none tracking-tighter text-foreground/[0.05] select-none"
        >
          {mark}
        </span>

        <div className="relative flex max-w-[20ch] flex-col items-center gap-2 text-center text-muted">
          <ImageIcon className="h-6 w-6" aria-hidden />
          <span className="text-[13px] font-semibold leading-[1.5]">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
