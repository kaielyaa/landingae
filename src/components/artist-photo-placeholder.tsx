import { PinnedPlaceholder } from "@/components/pinned-placeholder";
import { cn } from "@/lib/utils";

/** State "kosong" buat foto artist yang belum diupload — bukan gradient
 * palsu yang nyamar jadi foto (itu haram di AGENTS.md, dan itu yang dipakai
 * situs lama). Ditreatment kayak foto ditempel washi tape di papan —
 * langsung dari jangkar project ("cara orang nge-tag lagu di catatan
 * pribadi/papan tempel"). Mekanik tape + monogram + gerak proximity-nya
 * di `PinnedPlaceholder` (shared sama `ReleaseCoverPlaceholder`).
 *
 * Riwayat lengkap gerakannya (loop CSS -> translateX proximity -> rotasi
 * dari pivot atas, termasuk bug arah yang sempat kejadian & dibenerin)
 * ada di komentar `PinnedPlaceholder` dan `arah.md` — gak diulang di sini
 * biar gak dobel, baca di situ kalau butuh konteks lengkap.
 *
 * Ganti jadi <Image object-cover> beneran begitu asetnya ada (rencana
 * lewat Sanity) — copot `PinnedPlaceholder`, TAPI pertahankan
 * `max-w-[420px] md:ml-auto` + `origin-top shadow-md` di elemen
 * pengganti, itu bagian dari treatment "foto ditempel", bukan cuma
 * dekorasi state kosong.
 *
 * `max-w` dikunci di sini (bukan cuma `w-full` ngikut kolom grid) karena
 * kolom `0.9fr`-nya ikut melebar seiring `--content-max` naik di layar
 * ultra-wide (108rem @1920px, 132rem @2560px) — tanpa cap, tinggi box ikut
 * meledak lewat aspect-[4/5] sampai jauh ngelewatin viewport di FHD ke atas.
 * `md:ml-auto` dorong box ke tepi kanan kolom, biar ruang sisa dari cap ini
 * jatuh di sisi kiri (dekat teks), bukan gap kosong random di kanan. */
export function ArtistPhotoPlaceholder({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  // Monogram kasar dari kata pertama nama — "DB Project" -> "DB".
  const mark = name.split(" ")[0].slice(0, 3).toUpperCase();

  return (
    <PinnedPlaceholder
      label={`Foto ${name} belum diupload`}
      mark={mark}
      aspectClassName="aspect-[4/5]"
      className={cn("max-w-[420px] md:ml-auto", className)}
    />
  );
}
