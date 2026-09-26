"use client";

import { useEffect, useRef, type ComponentProps } from "react";

/** Pemicu gerak saat masuk layar (arah.md: Gerak #3). Satu mekanisme untuk
 * semua yang "ditempel" atau "ditulis" saat terlihat — elemen di dalamnya
 * menandai diri dengan `data-stamp` (stiker) atau `data-leader` /
 * `data-value` (baris kredit); gayanya di globals.css.
 *
 * HTML dari server sudah dalam keadaan jadi. Baru di browser, kalau
 * grupnya masih di bawah layar, ia dikosongkan dulu (`data-reveal="wait"`)
 * lalu diputar saat terlihat (`"go"`). Yang sudah terlihat saat dimuat
 * dibiarkan — tidak ada kedip, tanpa JS tetap tampil normal, dan
 * `prefers-reduced-motion` tidak pernah dikosongkan. */
export function Reveal({
  as: Tag = "div",
  ...props
}: ComponentProps<"div"> & { as?: "div" | "span" }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.reveal = "wait";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "go";
        io.disconnect();
      },
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <Tag ref={ref as never} {...props} />;
}
