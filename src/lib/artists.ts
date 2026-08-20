export type ArtistTier = "exclusive" | "collaboration" | "alumni";

export type Artist = {
  slug: string;
  name: string;
  tier: ArtistTier;
  /** Cuma 1 artist exclusive yang boleh `featured: true` — dipakai buat
   * spotlight di Home & Roster. Sesuai skema `artist.featured` di Sanity
   * situs lama. */
  featured?: boolean;
  genre?: string[];
  yearStart?: number;
  /** Cuma diisi kalau tier "alumni". */
  yearEnd?: number;
  /** Field di bawah ini SENGAJA kosong (`undefined`) kalau belum ada
   * datanya — halaman detail nunjukkin state kosong yang jujur, bukan
   * ngarang bio/link yang gak ada. Sama prinsipnya kayak `releases.ts`. */
  shortBio?: string;
  bioAccent?: string;
  spotify?: string;
  appleMusic?: string;
  youtube?: string;
  instagram?: string;
  tiktok?: string;
};

/** Satu sumber data artist — dipakai Home (spotlight + "Yang pernah jadi
 * bagian"), halaman Roster (Active + Past Roster), dan detail
 * (`/roster/[slug]`). Field-nya dicocokin sama nama field skema
 * `artist` di Sanity situs lama (`aelama/src/sanity/schemaTypes/artist.ts`)
 * — biar gampang disambungin nanti, bentuk data & UI-nya gak perlu
 * dirombak ulang.
 *
 * Tier "collaboration" (project-based, bukan roster eksklusif/alumni)
 * SEKARANG disiapin di type-nya, tapi datanya di bawah masih DUMMY —
 * nama karangan buat preview visual doang (izin eksplisit Kaiel
 * 2026-08-20: "nama lo buat bebas dulu aja biar visualnya keliatan"),
 * BUKAN nama artist asli. WAJIB diganti/dihapus sebelum serah terima —
 * lihat catatan.md. */
export const artists: Artist[] = [
  {
    slug: "db-project",
    name: "DB Project",
    tier: "exclusive",
    featured: true,
    genre: ["Electronic"],
    yearStart: 2021,
    shortBio:
      "Project remix elektronik yang ngolah ulang lagu jadi versi baru. Tiap track di-rebuild dari instinct — gak ada formula, cuma vibe dan eksperimen.",
    bioAccent: "Setiap lagu punya sisi yang belum dibunyikan.",
    spotify: "https://open.spotify.com",
    appleMusic: "https://music.apple.com",
  },
  // --- DUMMY, lihat komentar di atas array ini — ganti/hapus sebelum
  // serah terima, ini bukan nama artist beneran.
  {
    slug: "kaia-ramadhan",
    name: "Kaia Ramadhan",
    tier: "collaboration",
  },
  {
    slug: "suci-arshinta",
    name: "Suci Arshinta",
    tier: "alumni",
    yearStart: 2022,
    yearEnd: 2024,
  },
  {
    slug: "putri-clarantika",
    name: "Putri Clarantika",
    tier: "alumni",
    yearStart: 2022,
    yearEnd: 2024,
  },
];

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}

export const activeRoster = artists.filter((a) => a.tier === "exclusive");
export const collabRoster = artists.filter((a) => a.tier === "collaboration");
export const pastRoster = artists.filter((a) => a.tier === "alumni");
export const featuredArtist = artists.find((a) => a.featured);
