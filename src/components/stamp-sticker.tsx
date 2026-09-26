"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { Sticker } from "@/components/ui/sticker";

type Tone = "primary" | "accent" | "invert";

const sweep: Record<Tone, string> = {
  primary: "var(--primary)",
  accent: "var(--accent)",
  invert: "var(--foreground)",
};

/** Stiker judul section yang "ditempel" sekali saat pertama masuk layar
 * (arah.md: Gerak #3). Teksnya terbaca sejak awal — cuma warna yang menyapu
 * dan stikernya miring lalu kembali.
 *
 * HTML dari server sudah berupa stiker jadi. Baru di browser, kalau
 * stikernya masih di bawah layar, ia dikosongkan dulu (`data-stamp="wait"`)
 * lalu diputar saat terlihat. Yang sudah terlihat saat halaman dimuat
 * dibiarkan — tidak ada kedip, dan tanpa JS tetap tampil normal. */
export function StampSticker({
  tone = "primary",
  tilt = "left",
  children,
}: {
  tone?: Tone;
  tilt?: "left" | "right";
  children: ReactNode;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.stamp = "wait";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.stamp = "go";
        io.disconnect();
      },
      { threshold: 1, rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Sticker
      ref={ref}
      tone={tone}
      tilt={tilt}
      style={
        {
          "--sweep": sweep[tone],
          "--tilt": tilt === "left" ? "-1deg" : "1deg",
        } as CSSProperties
      }
    >
      {children}
    </Sticker>
  );
}
