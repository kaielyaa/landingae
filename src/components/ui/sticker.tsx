import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "primary" | "accent" | "invert";
type Size = "display" | "inline";

const tones: Record<Tone, string> = {
  primary: "bg-primary text-primary-foreground",
  accent: "bg-accent text-accent-foreground",
  // Solid dan berbalik antar tema — bukan abu, bukan outline (arah.md).
  invert: "bg-foreground text-background",
};

const sizes: Record<Size, string> = {
  // Di judul besar: ikut ukuran huruf judulnya. Radius md.
  display: "inline-block rounded-md px-3 py-0.5 leading-[1.05]",
  // Di tengah paragraf: tinggi ±22px, radius sm (8px ≈ 36%).
  inline:
    "mx-0.5 inline-flex items-center gap-1.5 rounded-sm px-2 py-1 text-[13px] font-semibold leading-[1.05]",
};

const tilts = { left: "-rotate-1", right: "rotate-1", none: "" };

/** Kelas stiker tanpa elemennya — untuk elemen lain yang perlu tampil
 * sebagai stiker (mis. item nav yang sedang aktif). */
export function stickerTones(tone: Tone) {
  return tones[tone];
}

/** Tanda tangan 1: stiker kata — blok warna solid di belakang kata kunci,
 * seolah ditempel tangan. Maksimal satu per judul (kecuali hero Home).
 * Rotasi hanya boleh di sini, tidak di elemen lain. */
export function Sticker({
  tone = "primary",
  size = "display",
  tilt = size === "display" ? "left" : "none",
  className,
  ...props
}: Omit<ComponentProps<"span">, "children"> & {
  tone?: Tone;
  size?: Size;
  tilt?: keyof typeof tilts;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(sizes[size], tones[tone], tilts[tilt], className)}
      {...props}
    />
  );
}
