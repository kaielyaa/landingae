"use client";

import { useSearchParams } from "next/navigation";
import { startTransition, useState, ViewTransition } from "react";
import { releaseTracks, TrackRow } from "@/components/tracklist";
import { Button } from "@/components/ui/button";
import { stickerTones } from "@/components/ui/sticker";
import {
  CATEGORIES,
  CATEGORY_LABEL,
  isReleaseCategory,
  releases,
  type ReleaseCategory,
} from "@/lib/releases";
import { cn } from "@/lib/utils";

type Filter = ReleaseCategory | "all";

const PARAM = "kategori";

/** Katalog + filter kategori kepemilikan master. Filter disimpan di URL
 * (`/catalog?kategori=production`) supaya bisa dibagikan dan ditautkan dari
 * footer. Ganti filter = transisi (arah.md: Gerak #5): baris yang tersisa
 * bergeser, yang keluar/masuk memudar.
 *
 * Dipakai di dalam <Suspense> (useSearchParams); fallback-nya
 * `CatalogListView` dengan filter "all" supaya HTML statis tetap berisi
 * seluruh katalog. */
export function CatalogList() {
  const raw = useSearchParams().get(PARAM);
  const fromUrl: Filter = isReleaseCategory(raw) ? raw : "all";

  // Pilihan tombol disimpan bersama nilai URL saat memilih. Kalau URL
  // berubah dari luar (mis. tautan footer "Karya Produksi" saat sudah di
  // /catalog), pilihan lama kedaluwarsa dan filter kembali mengikuti URL.
  const [picked, setPicked] = useState<{ at: string | null; value: Filter }>({
    at: raw,
    value: fromUrl,
  });
  const active = picked.at === raw ? picked.value : fromUrl;

  function select(next: Filter) {
    const at = next === "all" ? null : next;
    startTransition(() => setPicked({ at, value: next }));
    const url = new URL(window.location.href);
    if (at) url.searchParams.set(PARAM, at);
    else url.searchParams.delete(PARAM);
    window.history.replaceState(null, "", url);
  }

  return <CatalogListView active={active} onSelect={select} />;
}

export function CatalogListView({
  active,
  onSelect,
}: {
  active: Filter;
  onSelect?: (f: Filter) => void;
}) {
  const filtered =
    active === "all" ? releases : releases.filter((r) => r.category === active);
  const tracks = releaseTracks(filtered);

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "Semua", count: releases.length },
    ...CATEGORIES.map((c) => ({
      key: c,
      label: CATEGORY_LABEL[c],
      count: releases.filter((r) => r.category === c).length,
    })),
  ];

  return (
    <div>
      <div role="group" aria-label="Filter kategori" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const on = active === f.key;
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={on}
              onClick={() => onSelect?.(f.key)}
              className={cn(
                "inline-flex h-9 items-center gap-2 rounded-md border px-3.5 text-[14px] font-medium transition-colors duration-fast ease-out",
                on
                  ? cn(stickerTones("invert"), "-rotate-1 border-transparent")
                  : "border-border text-muted hover:bg-hover hover:text-foreground",
              )}
            >
              {f.label}
              <span className={cn("text-[12px] tabular-nums", on ? "opacity-70" : "")}>
                {f.count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-8 text-[13px] text-muted tabular-nums" aria-live="polite">
        {filtered.length} rilisan
        {active !== "all" ? ` · ${CATEGORY_LABEL[active]}` : ""}
      </p>

      {/* <ol> selalu ada; tiap baris punya VT sendiri — baris yang masuk
          dan bergeser dianimasikan saat ganti kategori. */}
      <ol
        className={cn(
          "mt-4 divide-y divide-border",
          tracks.length > 0 && "border-y border-border",
        )}
      >
        {tracks.map((t, i) => (
          <ViewTransition key={t.href}>
            <li>
              <TrackRow track={t} n={i + 1} />
            </li>
          </ViewTransition>
        ))}
      </ol>

      {/* Keadaan kosong masuk lewat animasi CSS saat dipasang, bukan
          ViewTransition: React tidak memulai view transition kalau
          perubahannya cuma menghapus baris (dicek 2026-09-27, tanpa
          error — startViewTransition tidak dipanggil sama sekali). */}
      {tracks.length === 0 && active !== "all" ? (
        <div className="rise-on-load mt-4 border-y border-border py-12">
          <p className="text-[17px] font-bold">
            Belum ada rilisan {CATEGORY_LABEL[active]}.
          </p>
          <p className="mt-2 max-w-[52ch] text-[15px] leading-[1.7] text-muted">
            Rilisan di kategori ini akan muncul di sini begitu dirilis.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-6"
            onClick={() => onSelect?.("all")}
          >
            Lihat semua rilisan
          </Button>
        </div>
      ) : null}
    </div>
  );
}
