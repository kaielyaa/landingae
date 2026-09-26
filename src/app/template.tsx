import { ViewTransition, type ReactNode } from "react";

/** Transisi pindah halaman (arah.md: Gerak #6) — diminta Kaiel 2026-09-27
 * supaya pindah dari bawah Home ke halaman lain tidak "jegleg". Template
 * dipasang ulang tiap pindah bagian situs (kuncinya segmen pertama), jadi
 * halaman lama memudar cepat dan halaman baru naik halus; lompatan scroll
 * ke atas tertutup oleh transisinya.
 *
 * Judul/nama yang punya pasangan (share="morph") tetap melayang ke h1 detail;
 * header tetap diam (site-header). Gaya: .page-in / .page-out di globals.css. */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
