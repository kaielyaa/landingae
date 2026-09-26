"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const CONSENT_KEY = "anka-cookie-consent";
/** Naikin ini kalau kebijakan cookie berubah signifikan — banner bakal
 * muncul lagi buat consent yang udah ke-save versi lama. */
const CONSENT_VERSION = "v1";

type ConsentValue = "accepted" | "declined";

/** Banner consent cookie — muncul sekali di kunjungan pertama (delay
 * 800ms biar gak jarring pas halaman baru kebuka), tersimpan di
 * localStorage. Mekanik & timing-nya diambil dari situs lama
 * (`CookieBanner`), tapi animasinya CSS transition polos (bukan
 * `motion/react` — dependency itu gak ada di project ini) dan visualnya
 * ikut token/sistem kita, bukan glass/glow situs lama.
 *
 * Cuma 2 pilihan (Terima Semua / Tolak Opsional) — versi lama juga
 * punya opsi "Atur preferensi" granular, tapi situs ini belum punya
 * cookie non-esensial yang cukup banyak buat butuh itu (analitik
 * belum kepasang, lihat catatan.md). Tambah kalau nanti kebutuhannya
 * beneran ada. */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Selama banner tampil, halaman diberi ruang di bawah setinggi banner
  // (--cookie-banner-space, dipakai body di globals.css) — supaya konten
  // paling bawah (tautan legal footer) bisa discroll ke atas banner dan
  // tetap bisa diklik walau pengunjung belum memilih (Kaiel 2026-09-27).
  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current;
    if (!visible || !el) {
      root.style.removeProperty("--cookie-banner-space");
      return;
    }
    const measure = () => {
      // Tinggi + jarak bawah (bukan posisi layar) — tidak terpengaruh
      // animasi geser saat banner muncul.
      const space = el.offsetHeight + parseFloat(getComputedStyle(el).bottom);
      root.style.setProperty("--cookie-banner-space", `${Math.ceil(space)}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      root.style.removeProperty("--cookie-banner-space");
    };
  }, [visible]);

  useEffect(() => {
    function scheduleShow() {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }

    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) return scheduleShow();

      const parsed = JSON.parse(stored);
      if (parsed.version !== CONSENT_VERSION) return scheduleShow();
    } catch {
      // localStorage error — bisa karena diblokir browser, bisa karena
      // data corrupt. Probe dulu buat mastiin yang mana.
      try {
        const probeKey = "__anka_probe__";
        localStorage.setItem(probeKey, "1");
        localStorage.removeItem(probeKey);
        // Probe sukses -> localStorage available, berarti data corrupt.
        // Tampilin banner lagi biar user bisa overwrite consent.
        return scheduleShow();
      } catch {
        // Probe gagal -> localStorage diblokir. Diem aja — nampilin
        // banner gak ada gunanya kalau consent gak bisa disimpan,
        // bakal muncul lagi tiap reload.
      }
    }
  }, []);

  function setConsent(value: ConsentValue) {
    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({
          version: CONSENT_VERSION,
          value,
          timestamp: new Date().toISOString(),
        }),
      );
    } catch {
      // localStorage diblokir — gagal senyap, banner tetap ditutup
      // dari sisi tampilan meski preferensinya gak ke-save.
    }
    setVisible(false);
    window.dispatchEvent(new CustomEvent("cookie-consent", { detail: value }));
  }

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label="Preferensi cookie"
      aria-hidden={!visible}
      className={`fixed inset-x-3 bottom-3 z-40 transition-all duration-slow ease-out md:inset-x-6 md:bottom-6 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-8 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-2xl rounded-xl border border-border bg-surface p-5 shadow-lg md:p-6">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center md:gap-6">
          <p className="text-[14px] leading-[1.7] text-muted">
            Kami pakai cookie minimal untuk fungsi dasar dan analitik
            agregat. Tidak ada tracking iklan.{" "}
            <Link
              href="/cookies"
              className="font-bold text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              Pelajari lebih lanjut.
            </Link>
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setConsent("declined")}
              className="rounded-md border border-border px-4 py-2.5 text-[13px] font-bold text-foreground transition-colors duration-fast ease-out hover:bg-hover"
            >
              Tolak Opsional
            </button>
            <button
              type="button"
              onClick={() => setConsent("accepted")}
              className="rounded-md bg-primary px-4 py-2.5 text-[13px] font-bold text-primary-foreground transition-transform duration-fast ease-out hover:-translate-y-0.5"
            >
              Terima Semua
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Baca consent yang tersimpan — dipakai script analitik nanti buat
 * cek boleh load atau enggak sebelum consent "accepted" ke-set. */
export function getCookieConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed.value as ConsentValue;
  } catch {
    return null;
  }
}
