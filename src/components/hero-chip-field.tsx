"use client";

import { useEffect, useRef } from "react";

const chips = [
  { label: "Pop", top: "14%", left: "8%", rotate: -8, size: "text-sm", tone: "primary" as const },
  { label: "Indie", top: "22%", left: "84%", rotate: 6, size: "text-base", tone: "neutral" as const },
  { label: "R&B", top: "70%", left: "6%", rotate: 4, size: "text-sm", tone: "accent" as const },
  { label: "Hip-Hop", top: "76%", left: "82%", rotate: -5, size: "text-sm", tone: "neutral" as const },
  { label: "Folk", top: "42%", left: "93%", rotate: -3, size: "text-xs", tone: "accent" as const },
  { label: "Jazz", top: "88%", left: "40%", rotate: 3, size: "text-sm", tone: "primary" as const },
  { label: "Live", top: "8%", left: "46%", rotate: -4, size: "text-xs", tone: "neutral" as const },
];

const toneClass = {
  primary: "border-primary/40 bg-primary-subtle text-primary",
  accent: "border-accent/40 bg-accent-subtle text-accent",
  neutral: "border-border bg-surface text-muted",
};

/** Radius di luar ini chip diem total — cuma yang beneran deket kursor
 * yang kepengaruh, bukan semua chip serentak. */
const PROXIMITY_RADIUS = 220;
const MAX_PUSH = 22;

/** Chip genre di latar hero. Diam, kecuali kursor mendekat (perangkat
 * dengan mouse saja) — chip terdorong menjaui kursor. Goyang terus-menerus
 * sengaja dibuang (arah.md: gerak). Hitungan cuma jalan saat kursor gerak,
 * bukan loop tiap frame. */
export function HeroChipField() {
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    ).matches;
    if (!canHover) return;

    let frame = 0;
    let pointer = { x: 0, y: 0 };

    function update() {
      frame = 0;
      wrapRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = rect.left + rect.width / 2 - pointer.x;
        const dy = rect.top + rect.height / 2 - pointer.y;
        const dist = Math.hypot(dx, dy);
        const push = Math.max(0, 1 - dist / PROXIMITY_RADIUS) * MAX_PUSH;
        const nx = dist === 0 ? 0 : dx / dist;
        const ny = dist === 0 ? 0 : dy / dist;
        el.style.transform = `translate(${nx * push}px, ${ny * push}px)`;
      });
    }

    function onMove(e: MouseEvent) {
      pointer = { x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(update);
    }
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {chips.map((c, i) => (
        // Wrapper: posisi + dorongan kursor. Rotasi di chip-nya, jadi dua
        // transform gak rebutan satu elemen.
        <div
          key={c.label}
          ref={(el) => {
            wrapRefs.current[i] = el;
          }}
          className="absolute transition-transform duration-slow ease-out"
          style={{ top: c.top, left: c.left }}
        >
          <span
            className={`chip select-none shadow-sm ${c.size} ${toneClass[c.tone]}`}
            style={{ rotate: `${c.rotate}deg` }}
          >
            {c.label}
          </span>
        </div>
      ))}
    </div>
  );
}
