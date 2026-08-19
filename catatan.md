# Catatan

## Belum dikerjakan
- [ ] Foto/cover asli artist (DB Project, Suci Arshinta, Putri Clarantika)
      — belum diupload ke project ini. **Update:** cover 3 single katalog
      (Sedang Berjuang/Bilang/Terlambat Kau Kembali) TERNYATA udah ada
      fotonya di situs lama (ankaentertainment.com) — bukan placeholder,
      real `<img>` (portrait tiap artist + judul lagu di-overlay). Belum
      diambil/diimport ke project ini, tapi asetnya udah ada, tinggal
      disalin/re-source. Foto DB Project sendiri di situs lama masih
      gradient placeholder ungu-biru (bukan foto asli) — jadi itu emang
      belum ada dan nunggu diisi asli (Kaiel konfirmasi 2026-08-20),
      rencananya lewat Sanity CMS pas redesign. Section Featured
      Artist/Active Roster sekarang udah dikasih slot
      `ArtistPhotoPlaceholder` buat DB Project, ganti ke `<Image>` beneran
      begitu asetnya ada — lihat arah.md
- [ ] Konfirmasi kategori kepemilikan master rilisan (Catalog/Production/
      Cover) — sekarang ketiganya di-assign "Catalog" semua sebagai
      ASUMSI di `CatalogList`, bukan data bisnis yang udah dikonfirmasi
- [ ] Jawaban FAQ di halaman Layanan (5 pertanyaan) — cuma 1 yang ada
      jawaban asli dari copy situs lama, sisanya sengaja gak diisi (soal
      royalti/kepemilikan master, bukan hal yang boleh dikarang)
- [ ] Halaman detail per-artist (`/roster/db-project`) dan sub-route lain
      yang dilink dari halaman-halaman ini belum dibangun (masih 404)
- [ ] Link tiap rilisan di section Katalog Home ("Yang lagi didengerin",
      `src/app/page.tsx`) masih `href="#"` — **dikonfirmasi Kaiel 2026-08-20:
      ini memang belum final, bukan bug.** Rencananya tiap rilisan bakal
      punya halaman detail sendiri, dan di situ baru dipasang URL streaming
      asli (Spotify/Apple Music dst). Jangan diisi `href="#"` -> URL platform
      langsung tanpa halaman detail, itu bukan arahnya.

## Debug log — chip Record/Lantuns sempat kelihatan salah render
Kaiel laporin chip "Record"/"Lantuns" di section manifesto keliatan solid
putih (light) / hitam (dark), padahal kodenya udah di-set transparan.
Dicek langsung lewat `getComputedStyle` dua kali (sebelum & sesudah
restart dev server + hapus `.next`): hasilnya konsisten transparan
(`rgba(0,0,0,0)`), radius 12px, tinggi ngepas teks — sesuai yang
diinginkan. Sempat curiga ada cascade-order bug antara class `chip`
(custom `@utility`) vs class Tailwind native (`bg-transparent`), tapi itu
terbukti SALAH — chip tone `primary`/`accent` di `HeroChipField` yang
pola override-nya mirip (`chip` + Tailwind class kayak `bg-primary-subtle`)
ternyata jalan normal pas dicek. Kesimpulan paling mungkin: screenshot
yang dilihat Kaiel adalah state lama (browser belum ke-refresh dari cache
Turbopack HMR yang emang udah beberapa kali basi sesi ini), bukan bug di
kode saat ini.

Yang tetap diubah permanen: Record/Lantuns sekarang gak pakai class
`chip` sama sekali, ditulis lengkap sendiri (`inline-flex ... border
border-border ...`) — bukan karena kebutuhan teknis, tapi biar gak ada
dua sumber `background-color` yang berpotensi ambigu di elemen yang sama,
lebih gampang dibaca juga.

## Utang teknis
- `public/favicon.ico` kemungkinan masih file default Next.js (belum sempat
  diverifikasi isinya karena format biner, ukurannya sama persis kayak
  sebelum ada perubahan). Udah ditutup dengan declare eksplisit
  `metadata.icons` di `layout.tsx` yang ngarah ke `favicon.svg`/PNG yang
  sudah logo AE — browser modern bakal pakai itu duluan. Tapi `.ico`
  mentahnya sendiri idealnya tetap diganti kalau nanti ada tool convert
  gambar yang kepasang
- Font (Cabinet Grotesk) di-load lewat `<link>` CDN Fontshare di
  `src/app/layout.tsx` — bukan `next/font/local`. Perlu download woff2 dan
  self-host sebelum production (perf + gak gantung uptime Fontshare)
- Brand name "Anka Entertainment" di navbar mobile (375px) wrap ke 2 baris
  dan agak mepet sama tombol tema/Submit Demo — belum dirapiin, kelihatan
  pas dites di viewport mobile tapi belum masuk prioritas karena masih fase
  hero/homepage
- `next build` belum pernah dijalankan buat verifikasi SSG beneran jalan
  (sesuai aturan: build cuma pas mau deploy). Perlu dicek nanti sebelum
  serah terima — pastiin gak ada halaman yang somehow keturn dynamic

## Ide dari Kaiel, belum digarap
- [ ] Animasi tambahan buat hero (di luar sway/parallax/scroll-cue yang
      udah ada) — Kaiel mau nambahin tapi ditunda dulu, balik lagi nanti
      setelah section-section lain kelar

## Keputusan yang ditunda
- Apakah katalog/roster akan embed player (Spotify/Apple Music) langsung
  di card, atau tetap link keluar seperti sekarang
- SEO lengkap (openGraph, favicon set, sitemap.ts, robots.ts, JSON-LD) —
  ditunda sampai semua halaman fix strukturnya, biar gak bolak-balik

## Klarifikasi Kaiel (2026-08-20)
- Section "Past Roster" di halaman Roster (`Putri Clarantika`, `Suci
  Arshinta`, keduanya `"2022 — 2024"`) — **data asli, bukan asumsi/tebakan.**
  Dikonfirmasi Kaiel: mereka beneran udah nggak lagi di bawah Anka
  Entertainment. Beda kasus sama kategori kepemilikan master di Katalog
  yang masih asumsi (lihat di atas) — ini udah fix, jangan ditandai belum
  dikonfirmasi lagi di sesi berikutnya.

## Sudah diselesaikan (dulu ditunda)
- Treatment state "Submission CLOSED" — sekarang halaman `/submit` kasih
  badge "Closed" (token `--warning`) + penjelasan + jalan keluar
  (Instagram/lihat roster/email), bukan cuma nyembunyiin tombol
