# Catatan

## PENTING — data DUMMY, wajib diganti sebelum serah terima
- [ ] `src/lib/artists.ts` — 1 entri tier "collaboration" ("Kaia Ramadhan")
      itu nama KARANGAN buat preview visual doang, izin eksplisit Kaiel
      2026-08-20 ("nama lo buat bebas dulu aja biar visualnya keliatan").
      BUKAN nama artist asli. Ganti ke data beneran atau hapus kalau
      belum ada kolaborator asli pas mau deploy — jangan sampai kebawa
      ke production

## Semua URL sosmed masih placeholder generik
`https://instagram.com` / `tiktok.com` / `youtube.com` / `linkedin.com`
(di `SiteFooter` dan sekarang juga di `/submit` "Follow Instagram") itu
domain generik, BUKAN handle asli Anka Entertainment. Perlu diganti ke
URL profil beneran sebelum deploy — belum ada satu pun tempat nyimpen
handle asli, semua masih hardcode placeholder di kode.

## Selesai 2026-08-20 — Halaman legal + cookie banner + .env.example
- `/privacy`, `/terms`, `/cookies` dibangun (dulu 404 dari footer).
  Kontennya porting dari situs lama, disesuaikan nada ("kamu"). **Perlu
  direview ulang isinya** sebelum deploy — ini konten hasil porting,
  bukan yang udah direview pengacara buat versi baru ini
- Cookie consent banner terpasang di semua halaman (`src/components/cookie-banner.tsx`)
- `.env.example` dibuat di root project — isinya SMTP (buat form Submit
  nanti) + Sanity (buat migrasi CMS nanti). Isi `.env.local` sendiri
  (gitignored) pas ada credential asli, jangan taruh di `.env.example`

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
      begitu asetnya ada — lihat arah.md. **Update 2026-08-20:** cover
      rilisan sekarang juga punya placeholder-nya sendiri
      (`ReleaseCoverThumb` di list, `ReleaseCoverPlaceholder` di halaman
      detail `/catalog/[slug]`) — sama-sama nunggu aset asli yang udah
      ada di situs lama itu diimport
- [ ] Konfirmasi kategori kepemilikan master rilisan (Catalog/Production/
      Cover) — sekarang ketiganya di-assign "Catalog" semua sebagai
      ASUMSI di `src/lib/releases.ts` (dulu di `CatalogList`, sekarang
      satu sumber data dipakai bareng Home + Katalog + detail), bukan
      data bisnis yang udah dikonfirmasi
- [ ] Jawaban FAQ di halaman Layanan (5 pertanyaan) — cuma 1 yang ada
      jawaban asli dari copy situs lama, sisanya sengaja gak diisi (soal
      royalti/kepemilikan master, bukan hal yang boleh dikarang)
## Selesai 2026-08-20 — Roster: detail page + konsolidasi data
Halaman detail per-artist (`/roster/[slug]`) dulu dicatat di sini sebagai
"belum dibangun, masih 404" — **sekarang udah dibangun**, pola sama
kayak `/catalog/[slug]`. Data artist yang tadinya ke-copy-paste di 3
tempat (Home, Roster page, `dbProjectPlatforms`) sekarang satu sumber
`src/lib/artists.ts`. Detail implementasi di arah.md.

## Selesai 2026-08-20 — Copy CTA "Jalur 02" Home disamain
Tombol Jalur 02 (Distribusi Regional) di CTA penutup Home sempat bilang
"Hubungi Kami" buat href yang sama persis (`lantuns.com`) kayak tombol
"Kunjungi Lantuns" di halaman Submit — inkonsisten label buat aksi yang
identik, dan "Hubungi Kami" nyasar (janji kontak, padahal cuma buka
homepage brand lain). Disamain jadi "Kunjungi Lantuns" di kedua tempat.
Instance lain "Hubungi Kami" di `services/page.tsx` TETAP dibiarkan —
itu link-nya ke `/submit` (internal), beda konteks, copy-nya udah akurat.

## Selesai 2026-08-20 — Katalog: detail page + link
Link tiap rilisan di list Home & Katalog dulu `href="#"` (dicatat sebagai
"belum final, nunggu halaman detail dibikin"). **Sekarang halaman detail
`/catalog/[slug]` udah dibangun** (cover placeholder, deskripsi/link
platform/credits dengan state kosong jujur — bukan data ngarang), dan
semua link list udah diarahin ke situ. TODO ini selesai, lihat arah.md
buat detail implementasi.

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

## Referensi — source situs lama (folder `aelama/` di root workspace)
Kaiel download src dari VPS situs lama (ankaentertainment.com, domain
sekarang expired, belum di-buy-back/pindah provider) ke
`../aelama/src` (di luar folder `landingae`, sejajar). Ini source Next.js
+ **Sanity CMS** (studio embedded di `/studio`) + SMTP (nodemailer) buat
form submit — bukan cuma referensi visual, tapi sumber kebenaran buat
schema data & konten asli. Estetikanya (glass, glow-orb, gradient-text,
dark) SENGAJA ditinggalkan di redesign — lihat riwayat di atas arah.md,
jadi jangan diambil visualnya, tapi datanya berharga:

- **Schema Sanity ketemu lengkap** di `aelama/src/sanity/schemaTypes/`:
  `artist` (field `tier`: **exclusive / collaboration / alumni**, genre[],
  photo, bio, spotify/appleMusic/youtube/instagram/tiktok, `order`),
  `release` (field `category`: **catalog / production / cover** — ini
  KONFIRMASI taksonomi kepemilikan master yang sebelumnya cuma diasumsikan
  di `CatalogList` landingae, ternyata emang schema asli, bukan istilah
  karangan), `siteSettings` singleton (social links, contactEmail,
  `homeHeroSubtitle`, `openCallActive` toggle + closed message custom —
  pola yang sama persis udah ditiru manual di `/submit` landingae).
  Query GROQ siap pakai di `aelama/src/lib/queries.ts`.
- **GAP — tier "Collaboration" belum ada di landingae**: situs lama punya
  3 tier roster (exclusive/collaboration/alumni) + section "Collaborations
  & Alumni" terpisah di home. Landingae sekarang cuma Active (exclusive)
  + Past (alumni) Roster, collaboration tier belum diakomodasi sama
  sekali — perlu diputusin Kaiel apa mau ditambah pas migrasi Sanity
- **Form `/submit` lama jauh lebih lengkap** dari versi landingae sekarang
  (yang masih static "Closed"): `aelama/src/app/(site)/api/submit/sign-artist/route.ts`
  — terima upload file (max 4MB, mp3/wav/m4a/mp4, validasi MIME+extension)
  atau link demo, honeypot anti-bot, validasi Zod, kirim notifikasi email
  lewat SMTP (`aelama/src/lib/smtp.ts`). Referensi bagus pas bikin form
  beneran di landingae, bukan cuma placeholder Closed

## Rencana CMS — Sanity
Semua data konten (bukan cuma foto artist) rencananya bakal dipindah ke
Sanity CMS pas redesign, gak dihardcode di kode lagi. Termasuk:
- Link platform streaming per-artist (`PlatformLinks` /
  `dbProjectPlatforms` di `src/components/platform-links.tsx`) — sekarang
  href-nya masih placeholder generic (`open.spotify.com`,
  `music.apple.com`), bukan URL profil asli
- Foto/cover artist (`ArtistPhotoPlaceholder`) — sudah dicatat di atas
- Data roster (Active/Past), katalog/rilisan, kategori kepemilikan master
- Kemungkinan juga copy FAQ Layanan yang masih kosong

Icon platform sendiri (Spotify/Apple Music di `social-icons.tsx`) TETAP
di kode (sekarang dari `react-icons`, lihat entri di bawah), bukan
bagian dari CMS — cuma URL & daftar platform per artist yang jadi data
dinamis dari Sanity.

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

## Dependency ditambah (2026-08-20)
- `react-icons` — ikon logo brand (sosmed footer + platform streaming di
  section Featured Artist/Active Roster). Ganti dari SVG custom manual
  di `src/components/social-icons.tsx` (yang sekarang cuma re-export
  dari `react-icons/si` dan `react-icons/fa6`). Izin eksplisit Kaiel.
  Semua ikonnya `fill="currentColor"` — tetap monokrom ikut token warna,
  BUKAN warna brand asli. (Sempat salah diklaim "berwarna" di laporan
  awal — sudah dicek ulang lewat render SVG langsung dan diralat.)

## Sudah diselesaikan (dulu ditunda)
- Treatment state "Submission CLOSED" — sekarang halaman `/submit` kasih
  badge "Closed" (token `--warning`) + penjelasan + jalan keluar
  (Instagram/lihat roster/email), bukan cuma nyembunyiin tombol
