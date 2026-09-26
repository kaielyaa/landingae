/** Aset DUMMY untuk mengecek tampilan saat foto/cover asli belum ada
 * (Kaiel 2026-09-27). Hanya aktif di `next dev` — di build produksi
 * mengembalikan `undefined`, jadi tidak mungkin ikut tayang walau lupa
 * dicopot. Tetap WAJIB dihapus sebelum serah terima (catatan.md), beserta
 * berkasnya di `public/dummy/`. */
export function devDummy(path: string): string | undefined {
  return process.env.NODE_ENV === "development" ? path : undefined;
}
