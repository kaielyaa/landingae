import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "primary" | "accent" | "warning";
type Size = "sm" | "md" | "lg";

// Beda dari Sticker: chip = label data (genre, status, kategori).
// Netral secara bawaan, berwarna hanya kalau statusnya penting.
const tones: Record<Tone, string> = {
  neutral: "",
  primary: "chip-primary",
  accent: "chip-accent",
  warning: "border-transparent bg-warning-subtle text-foreground",
};

// Radius ikut tinggi (arah.md): sm ±22px & md ±28px → 8px, lg ±34px → 12px.
const sizes: Record<Size, string> = {
  sm: "rounded-sm px-2 py-1 text-[12px]",
  md: "rounded-sm px-3 py-1.5 text-[13px]",
  lg: "",
};

export function Chip({
  tone = "neutral",
  size = "sm",
  className,
  children,
}: {
  tone?: Tone;
  size?: Size;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={cn("chip", tones[tone], sizes[size], className)}>
      {children}
    </span>
  );
}
