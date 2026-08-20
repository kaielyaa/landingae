"use client";

import { Image as ImageIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Radius di luar ini kartu diem total — proximity kursor, "atas nyaris
 * diem (deket tape), bawah ngayun lebih jauh". Detail penuh & riwayat
 * iterasinya ada di komentar `ArtistPhotoPlaceholder` (pemakai pertama). */
const PROXIMITY_RADIUS = 340;
const MAX_SWING_DEG = 3;
const BASE_TILT_DEG = -1;

/** Basis bersama buat semua state kosong "gambar belum diupload" yang
 * ditreatment kayak ditempel washi tape di papan — dipakai
 * `ArtistPhotoPlaceholder` (foto artist, aspect 4:5) dan
 * `ReleaseCoverPlaceholder` (cover rilisan, aspect square). Satu mekanik
 * proximity-swing di sini biar dua tempat itu gak drift kayak
 * `InlineTag` yang sempat kejadian sebelum diekstrak.
 *
 * `aspectClassName` beda-beda per pemakai (4:5 potret vs 1:1 cover),
 * tapi tape, monogram, dan gerak-nya harus SAMA — itu yang bikin dua
 * elemen ini kebaca sebagai satu sistem, bukan dua kebetulan mirip. */
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
  const cardRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef(0);
  const pointer = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    function onMove(e: MouseEvent) {
      pointer.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener("mousemove", onMove, { passive: true });

    function tick() {
      const el = cardRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const px = rect.left + rect.width / 2;
        const py = rect.top;
        const dx = px - pointer.current.x;
        const dy = py - pointer.current.y;
        const dist = Math.hypot(dx, dy);
        const strength = Math.max(0, 1 - dist / PROXIMITY_RADIUS);
        const nx = dx === 0 ? 0 : Math.sign(dx);
        const angle = BASE_TILT_DEG - nx * strength * MAX_SWING_DEG;
        el.style.transform = `rotate(${angle}deg)`;
      }
      frameRef.current = requestAnimationFrame(tick);
    }
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className={cn("relative w-full", className)}>
      {/* Washi tape — titik tumpu-nya, SENGAJA gak ikut ngayun. `--primary`
          solid, radius-sm (8px, ~27% dari tinggi 30px) — detail alasannya
          di `ArtistPhotoPlaceholder`. */}
      <div
        aria-hidden
        className="absolute left-1/2 top-0 z-10 h-[30px] w-24 -translate-x-1/2 -translate-y-1/2 rotate-2 rounded-sm bg-primary"
      />

      <div
        ref={cardRef}
        className={cn(
          "relative flex w-full origin-top items-center justify-center overflow-hidden rounded-xl border border-border bg-surface p-6 shadow-md transition-transform duration-slow ease-keluar",
          aspectClassName,
        )}
        style={{ transform: `rotate(${BASE_TILT_DEG}deg)` }}
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
