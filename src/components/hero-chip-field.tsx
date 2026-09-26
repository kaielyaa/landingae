"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import styles from "@/components/home/hero.module.css";
import { cn } from "@/lib/utils";

type Spot = { top: number; left: number };

/** `mobile`: posisi di <768px, atau `null` = disembunyikan. Di HP judul
 * memenuhi lebar layar, jadi chip cuma aman di zona kosong di atas judul
 * dan di bawah tombol — sisanya disembunyikan, bukan dijejalkan. */
const chips: {
  label: string;
  desktop: Spot;
  mobile: Spot | null;
  /** Hanya tampil mulai 1024px — di tablet posisinya menimpa judul. */
  lgOnly?: boolean;
  rotate: number;
  size: string;
  tone: "primary" | "accent" | "neutral";
}[] = [
  { label: "Pop", desktop: { top: 14, left: 8 }, mobile: { top: 14, left: 6 }, rotate: -8, size: "text-sm", tone: "primary" },
  { label: "Indie", desktop: { top: 22, left: 84 }, mobile: null, rotate: 6, size: "text-base", tone: "neutral" },
  { label: "R&B", desktop: { top: 70, left: 6 }, mobile: null, rotate: 4, size: "text-sm", tone: "accent" },
  { label: "Hip-Hop", desktop: { top: 76, left: 82 }, mobile: { top: 86, left: 66 }, rotate: -5, size: "text-sm", tone: "neutral" },
  { label: "Folk", desktop: { top: 42, left: 93 }, mobile: null, lgOnly: true, rotate: -3, size: "text-xs", tone: "accent" },
  { label: "Jazz", desktop: { top: 88, left: 40 }, mobile: { top: 83, left: 10 }, rotate: 3, size: "text-sm", tone: "primary" },
  { label: "Live", desktop: { top: 8, left: 46 }, mobile: { top: 12, left: 62 }, rotate: -4, size: "text-xs", tone: "neutral" },
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

/** Animasi masuk: chip menyebar dari arah tengah, setelah judul & tombol. */
const INTRO_START = 920;
const INTRO_STEP = 45;
const INTRO_PULL = 0.35;

/** Chip genre di latar hero. Diam, kecuali kursor mendekat (perangkat
 * dengan mouse saja) — chip terdorong menjauhi kursor. Goyang terus-menerus
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
      {chips.map((c, i) => {
        const m = c.mobile ?? c.desktop;
        return (
          // Wrapper: posisi + dorongan kursor. Rotasi & animasi masuk di
          // chip-nya, jadi transform tidak rebutan satu elemen.
          <div
            key={c.label}
            ref={(el) => {
              wrapRefs.current[i] = el;
            }}
            className={cn(
              "absolute top-[var(--tm)] left-[var(--lm)] transition-transform duration-slow ease-out md:top-[var(--t)] md:left-[var(--l)]",
              !c.mobile && "max-md:hidden",
              c.lgOnly && "max-lg:hidden",
            )}
            style={
              {
                "--t": `${c.desktop.top}%`,
                "--l": `${c.desktop.left}%`,
                "--tm": `${m.top}%`,
                "--lm": `${m.left}%`,
              } as CSSProperties
            }
          >
            <span
              className={cn(
                "chip select-none shadow-sm",
                styles.chip,
                c.size,
                toneClass[c.tone],
              )}
              style={
                {
                  rotate: `${c.rotate}deg`,
                  "--d": `${INTRO_START + i * INTRO_STEP}ms`,
                  "--fx": `${(50 - c.desktop.left) * INTRO_PULL}vw`,
                  "--fy": `${(50 - c.desktop.top) * INTRO_PULL}vh`,
                } as CSSProperties
              }
            >
              {c.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
