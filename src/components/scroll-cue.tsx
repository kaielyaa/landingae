"use client";

import { ChevronDown } from "lucide-react";

/** Panah ke section berikutnya. Diam — cuma bereaksi saat hover/fokus
 * (arah.md: gerak terus-menerus dibuang). Scroll-nya native, halus kecuali
 * user minta gerak dikurangi. */
export function ScrollCue({ target }: { target: string }) {
  return (
    <button
      type="button"
      aria-label="Scroll ke bawah"
      onClick={() => {
        const el = document.querySelector(target);
        if (!el) return;
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      }}
      className="group chip absolute inset-x-0 bottom-8 z-10 mx-auto flex h-12 w-7 cursor-pointer flex-col items-center justify-center gap-0 px-0 py-2 hover:border-foreground/30 hover:text-foreground"
    >
      {[0, 1].map((i) => (
        <ChevronDown
          key={i}
          size={14}
          aria-hidden
          className="-my-0.5 transition-transform duration-fast ease-out group-hover:translate-y-0.5"
        />
      ))}
    </button>
  );
}
