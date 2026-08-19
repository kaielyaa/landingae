"use client";

import { ChevronDown } from "lucide-react";
import { useLenisRef } from "@/components/smooth-scroll";

export function ScrollCue({ target }: { target: string }) {
  const lenisRef = useLenisRef();

  return (
    <button
      type="button"
      aria-label="Scroll ke bawah"
      onClick={() => {
        const el = document.querySelector(target);
        if (!el) return;
        if (lenisRef?.current) {
          lenisRef.current.scrollTo(el as HTMLElement);
        } else {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }}
      className="chip absolute inset-x-0 bottom-8 z-10 mx-auto flex h-12 w-7 cursor-pointer animate-float flex-col items-center justify-center gap-0 px-0 py-2"
    >
      {[0, 1].map((i) => (
        <ChevronDown
          key={i}
          size={14}
          aria-hidden
          className="-my-0.5 animate-pulse-down"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </button>
  );
}
