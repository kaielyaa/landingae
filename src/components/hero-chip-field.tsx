"use client";

import { useEffect, useRef } from "react";

const chips = [
  { label: "Pop", top: "14%", left: "8%", rotate: -8, size: "text-sm", tone: "primary" as const, dur: "4.6s", delay: "-1.1s" },
  { label: "Indie", top: "22%", left: "84%", rotate: 6, size: "text-base", tone: "neutral" as const, dur: "5.4s", delay: "-2.4s" },
  { label: "R&B", top: "70%", left: "6%", rotate: 4, size: "text-sm", tone: "accent" as const, dur: "5s", delay: "-0.6s" },
  { label: "Hip-Hop", top: "76%", left: "82%", rotate: -5, size: "text-sm", tone: "neutral" as const, dur: "4.8s", delay: "-3.2s" },
  { label: "Folk", top: "42%", left: "93%", rotate: -3, size: "text-xs", tone: "accent" as const, dur: "6s", delay: "-1.8s" },
  { label: "Jazz", top: "88%", left: "40%", rotate: 3, size: "text-sm", tone: "primary" as const, dur: "5.2s", delay: "-2.9s" },
  { label: "Live", top: "8%", left: "46%", rotate: -4, size: "text-xs", tone: "neutral" as const, dur: "4.4s", delay: "-0.3s" },
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

export function HeroChipField() {
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRef = useRef(0);
  const pointer = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    function onMove(e: MouseEvent) {
      pointer.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener("mousemove", onMove, { passive: true });

    function tick() {
      wrapRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = cx - pointer.current.x;
        const dy = cy - pointer.current.y;
        const dist = Math.hypot(dx, dy);
        const strength = Math.max(0, 1 - dist / PROXIMITY_RADIUS);
        const push = strength * MAX_PUSH;
        const nx = dist === 0 ? 0 : dx / dist;
        const ny = dist === 0 ? 0 : dy / dist;
        el.style.transform = `translate(${nx * push}px, ${ny * push}px)`;
      });
      frameRef.current = requestAnimationFrame(tick);
    }
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {chips.map((c, i) => (
        // Wrapper: posisi + dorongan proximity (JS, translate saja).
        <div
          key={c.label}
          ref={(el) => {
            wrapRefs.current[i] = el;
          }}
          className="absolute transition-transform duration-slow ease-keluar"
          style={{ top: c.top, left: c.left }}
        >
          {/* Chip: idle sway lewat CSS animation (translateY + rotate),
              gak nabrak transform si wrapper karena beda elemen. */}
          <span
            className={`chip select-none animate-sway shadow-sm ${c.size} ${toneClass[c.tone]}`}
            style={
              {
                "--base-rotate": `${c.rotate}deg`,
                animationDuration: c.dur,
                animationDelay: c.delay,
              } as React.CSSProperties
            }
          >
            {c.label}
          </span>
        </div>
      ))}
    </div>
  );
}
