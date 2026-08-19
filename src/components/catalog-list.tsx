"use client";

import { useState } from "react";

type Category = "catalog" | "production" | "cover";

type Release = {
  title: string;
  artist: string;
  year: string;
  category: Category;
};

/** Kategori kepemilikan master (Catalog/Production/Cover) untuk 3 rilisan
 * ini masih ASUMSI (semua di-tandain "catalog") — belum ada konfirmasi
 * data asli dari Kaiel soal siapa pemilik master tiap lagu. Lihat
 * catatan.md. Jangan dianggap fakta bisnis final. */
const releases: Release[] = [
  {
    title: "Sedang Berjuang",
    artist: "Suci Arshinta",
    year: "2023",
    category: "catalog",
  },
  {
    title: "Bilang",
    artist: "Putri Clarantika",
    year: "2023",
    category: "catalog",
  },
  {
    title: "Terlambat Kau Kembali",
    artist: "Suci Arshinta",
    year: "2023",
    category: "catalog",
  },
];

const filters: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "Semua Rilisan" },
  { key: "catalog", label: "Katalog" },
  { key: "production", label: "Produksi" },
  { key: "cover", label: "Cover" },
];

export function CatalogList() {
  const [active, setActive] = useState<Category | "all">("all");

  const filtered =
    active === "all" ? releases : releases.filter((r) => r.category === active);

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter katalog"
      >
        {filters.map((f) => {
          const isActive = active === f.key;
          return (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(f.key)}
              className={
                isActive
                  ? "chip chip-primary rounded-sm px-3 py-1.5 text-[13px]"
                  : "chip rounded-sm px-3 py-1.5 text-[13px] transition-colors duration-fast ease-keluar hover:bg-hover"
              }
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <p className="tabular mt-6 text-[13px] text-muted">
        {filtered.length} rilisan
      </p>

      {filtered.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-border py-14 text-center">
          <p className="text-[15px] font-semibold">Belum ada rilisan di sini</p>
          <p className="mt-1 text-[14px] text-muted">
            Coba filter kategori lain.
          </p>
        </div>
      ) : (
        <ul className="mt-4 divide-y divide-border border-t border-border">
          {filtered.map((r, i) => (
            <li key={r.title}>
              <a
                href="#"
                className="group flex items-center justify-between gap-6 py-5 transition-colors duration-fast ease-keluar hover:bg-hover"
              >
                <div className="flex min-w-0 items-center gap-5">
                  <span className="tabular w-6 flex-none text-[13px] font-bold text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[16px] font-bold">
                      {r.title}
                    </p>
                    <p className="truncate text-[13px] text-muted">
                      {r.artist} · Single · {r.year}
                    </p>
                  </div>
                </div>
                <span className="chip chip-accent hidden flex-none rounded-sm px-2 py-1 text-[11px] sm:inline-flex">
                  Sedang Streaming
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
