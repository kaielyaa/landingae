import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { Sticker } from "@/components/ui/sticker";

type Tone = "primary" | "accent" | "invert";

const sweep: Record<Tone, string> = {
  primary: "var(--primary)",
  accent: "var(--accent)",
  invert: "var(--foreground)",
};

/** Stiker yang "ditempel" saat masuk layar (arah.md: Gerak #3) — teks
 * terbaca sejak awal, cuma warna yang menyapu lalu stiker miring dan
 * kembali.
 *
 * - Sendirian (bawaan): punya pemicu sendiri — dipakai di judul section
 * - `grouped`: ikut pemicu `<Reveal>` terdekat di atasnya, dengan `delay`
 *   supaya beberapa stiker ditempel berurutan (mis. di satu paragraf) */
export function StampSticker({
  tone = "primary",
  size = "display",
  tilt = size === "display" ? "left" : "none",
  delay = 0,
  grouped = false,
  children,
}: {
  tone?: Tone;
  size?: "display" | "inline";
  tilt?: "left" | "right" | "none";
  delay?: number;
  grouped?: boolean;
  children: ReactNode;
}) {
  const sticker = (
    <Sticker
      tone={tone}
      size={size}
      tilt={tilt}
      data-stamp=""
      style={
        {
          "--sweep": sweep[tone],
          "--tilt": tilt === "right" ? "1deg" : tilt === "left" ? "-1deg" : "0deg",
          "--stamp-delay": `${delay}ms`,
        } as CSSProperties
      }
    >
      {children}
    </Sticker>
  );

  if (grouped) return sticker;
  return <Reveal as="span">{sticker}</Reveal>;
}
