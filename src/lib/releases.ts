export type ReleaseCategory = "catalog" | "production" | "cover";

/** Label kategori kepemilikan master — satu sumber untuk filter Katalog,
 * detail rilisan, dan footer. Kunci = nilai skema Sanity; label = bahasa
 * situs. */
export const CATEGORY_LABEL: Record<ReleaseCategory, string> = {
  catalog: "Katalog",
  production: "Karya Produksi",
  cover: "Cover & Reinterpretasi",
};

export const CATEGORIES = Object.keys(CATEGORY_LABEL) as ReleaseCategory[];

export function isReleaseCategory(v: unknown): v is ReleaseCategory {
  return typeof v === "string" && v in CATEGORY_LABEL;
}

export type Release = {
  slug: string;
  title: string;
  artist: string;
  year: string;
  category: ReleaseCategory;
  releaseType: "Single" | "EP" | "Album";
  /** Label kecil di baris list — status rilis ("tersedia buat distream"),
   * BUKAN klaim real-time listener count. Boleh beda per rilisan
   * (nanti dari field `tag` Sanity: "Streaming", "Baru Rilis", dst). */
  tag: string;
  /** Field di bawah ini SENGAJA kosong (`undefined`) sampai Sanity
   * connect — placeholder page nunjukkin state kosong yang jujur (lihat
   * `/catalog/[slug]`), bukan ngarang deskripsi/link/credit yang gak
   * ada datanya. Isi beneran begitu Sanity terhubung, jangan ngarang di
   * sini duluan. */
  description?: string;
  /** Artwork (nanti dari Sanity `coverImage`). Kosong = tidak ditampilkan
   * besar, dan kotak netral kecil di daftar. */
  cover?: string;
  spotify?: string;
  appleMusic?: string;
  youtube?: string;
  credits?: { role: string; name: string }[];
};

/** Satu sumber data buat Home ("Dari katalog kami"), halaman Katalog
 * (`CatalogList`), dan detail rilisan (`/catalog/[slug]`) — sebelumnya
 * ke-copy-paste jadi 2 array terpisah (page.tsx & catalog-list.tsx), itu
 * sumber drift yang sama kayak kasus `InlineTag`. Satu tempat aja
 * sekarang, gampang disambungin ke Sanity nanti (tinggal ganti isi fungsi
 * di bawah jadi `client.fetch(...)`, bentuk datanya udah cocok).
 *
 * Kategori kepemilikan master (catalog/production/cover) masih ASUMSI
 * (semua ditandain "catalog") — belum konfirmasi data asli dari Kaiel.
 * Lihat catatan.md, jangan dianggap final. */
export const releases: Release[] = [
  {
    slug: "sedang-berjuang",
    title: "Sedang Berjuang",
    artist: "Suci Arshinta",
    year: "2023",
    category: "catalog",
    releaseType: "Single",
    tag: "Streaming",
  },
  {
    slug: "bilang",
    title: "Bilang",
    artist: "Putri Clarantika",
    year: "2023",
    category: "catalog",
    releaseType: "Single",
    tag: "Streaming",
  },
  {
    slug: "terlambat-kau-kembali",
    title: "Terlambat Kau Kembali",
    artist: "Suci Arshinta",
    year: "2023",
    category: "catalog",
    releaseType: "Single",
    tag: "Streaming",
  },
];

export function getReleaseBySlug(slug: string): Release | undefined {
  return releases.find((r) => r.slug === slug);
}
