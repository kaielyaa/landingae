"use client";

import { useEffect } from "react";

/** Refresh = mulai dari atas (Kaiel 2026-09-27) — sambutan hero juga main
 * lagi dari awal. Hanya untuk muat ulang: tombol Back/Forward tetap kembali
 * ke posisi terakhir, dan alamat ber-#bagian tetap melompat ke bagiannya. */
export function ScrollTopOnReload() {
  useEffect(() => {
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (nav?.type !== "reload" || window.location.hash) return;

    // Cegah browser memulihkan posisi lama setelah efek ini, lalu kembalikan
    // ke perilaku bawaan untuk navigasi berikutnya.
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const restore = () => {
      history.scrollRestoration = "auto";
    };
    window.addEventListener("pagehide", restore, { once: true });
    return () => window.removeEventListener("pagehide", restore);
  }, []);

  return null;
}
