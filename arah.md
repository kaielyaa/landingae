# Arah Visual — Anka Entertainment (landingae)

Keputusan visual yang **masih berlaku**. Mengikat. Riwayat dan alasan keputusan
lama ada di `arah-riwayat.md` (tidak mengikat). Rencana kerja & fase di
`rencana.md`.

Dipadatkan 2026-09-27.

---

## Dasar

Jangkar     : **Sampul rilisan dan liner notes** — stiker label di sampul,
              daftar lagu bernomor, kredit "siapa mengerjakan apa". Dunia
              nyata label; nyambung ke nilai Anka sendiri: transparan soal
              kepemilikan master (= kredit jelas), proses panjang (= kerja
              yang tercatat). Menggantikan jangkar "nge-tag lagu di catatan
              pribadi" yang terlalu abstrak buat nurunin halaman selain hero
Kesan       : "b aja kalau belum kenal, asik kalau udah kenal" — permukaan
              tenang (tipografi, ruang, netral), warna cuma muncul di titik
              yang sengaja dipilih, tidak disebar sebagai atmosfer

Tidak ada nomor katalog resmi (Kaiel, 2026-09-27). Penomoran hanya nomor
urut daftar (01, 02, 03) sesuai urutan rilis. **Jangan mengarang kode
katalog** seperti AE-001.

## Warna

Primary     : Anka Blue `#38B6FF` → hue 239, Cmax 0.150 — warna resmi brand.
              Light pakai step 600, dark step 400
Aksen       : Anka Pink `#CB6CE6` → hue 318, Cmax 0.194 — warna resmi brand
              kedua. Dipakai lebih jarang dari primary
Netral      : hue 239, chroma 0.003–0.014 — sehue primary, bukan abu murni
Status      : success 150 · warning 80 · destructive 25. Selalu ditemani teks
Mode        : light + dark. Default ikut sistem, toggle manual (`next-themes`)
              tersimpan di localStorage. Latar dasar nyaris hitam / nyaris
              putih, bukan navy dan bukan gradient

Tangga lengkap di `globals.css`. Primitif (`--brand-*`, `--pink-*`, `--n-*`)
tidak pernah dipakai langsung di komponen.

`--surface` light = `--background` (`n-0`) — kartu dibedakan border, section
dibedakan `--surface-2`. `--info` hue 265. Gambar OG (`opengraph-image.tsx`)
memakai hex hasil konversi token mode gelap — ubah bersama kalau token berubah.

## Tipografi

Keluarga    : **Cabinet Grotesk** saja, untuk judul maupun isi — grotesk tegas
              yang tetap ramah; satu keluarga dengan permainan ketebalan
              lebih rapi daripada dua. Fontshare, lisensi web gratis
Ketebalan   : 400 isi · 500 label · 700 judul, display, chip (total 3). 600
              tidak dimuat — jangan pakai `font-semibold`
Sumber      : self-host `next/font/local`, berkas di `src/app/fonts/`.
              Lisensi ITF Free Font License (Fontshare), boleh komersial
Display     : hero `clamp(34px, 7vw, 96px)`, bold, tracking rapat
Isi         : 16–17px, line-height 1.65–1.8, maks ±62ch
Label kecil : 13px bold uppercase tracking-wide `text-muted` (sub-heading
              kolom, footer)
Angka       : `tabular-nums` di daftar bernomor dan tahun

## Radius — ATURAN KERAS

Radius mengikuti **tinggi elemen**, bukan jenisnya. Patokan: radius ±20–35%
dari tinggi. Di atas itu terbaca pill, di bawah itu kaku.

| Tinggi elemen | Contoh | Radius |
|---|---|---|
| ±20–30px | stiker inline di paragraf, badge, strip kecil | `rounded-sm` 8px |
| ±32–56px | tombol, chip mandiri, stiker di judul hero, thumbnail 48px, wadah logo | `rounded-md` 12px |
| kartu | kartu pembanding (`Card`) | `rounded-lg` 16px |
| panel besar | foto besar, panel lepas | `rounded-xl` 20px |

- `rounded-full` **haram** kecuali Kaiel minta eksplisit
- Elemen setinggi sama wajib radius sama, apa pun fungsinya
- Kode lama masih memakai `rounded-xl` untuk kartu — diganti ke `Card` /
  `rounded-lg` saat halamannya dibangun ulang

## Tanda tangan

1. **Stiker kata** — blok warna solid di belakang kata kunci, sedikit miring
   (`±1deg`), seolah ditempel tangan. Lahir di hero, dipakai ulang di judul
   section dan kalimat penting. **Maksimal satu stiker per judul.** Tiga
   varian, dipakai persis begini di mana pun:
   - Primary — `bg-primary text-primary-foreground`
   - Aksen — `bg-accent text-accent-foreground`
   - Invert — `bg-foreground text-background`. **Solid dan berbalik antar
     tema** (light: hitam, dark: putih) — bukan abu, bukan outline
   Pakai komponen `Sticker` (`src/components/ui/sticker.tsx`):
   `size="display"` di judul, `size="inline"` di paragraf. `InlineTag` =
   pintasan stiker invert inline. Jangan tulis span manual.
2. **Tata liner notes** — daftar bernomor, metadata rapat kecil
   (`Single · 2023 · Catalog`), kredit berkolom. Dipakai di katalog, roster,
   detail rilisan/artist, footer. Katalog & roster = **daftar**, bukan grid
   kartu.

Rotasi **hanya** untuk stiker. Elemen lain lurus.

**Beda sistem, jangan dicampur:** chip genre di latar hero pakai tone
`*-subtle` (lembut, dekoratif). Stiker pakai warna solid (tegas, bermakna).
Chip latar yang dibuat solid jadi berisik; stiker yang dibuat lembut gagal
terbaca sebagai sorotan.

## Layout & ritme

Lebar       : `--content-max` 90rem (108rem ≥1920px, 132rem ≥2560px) +
              `--page-gutter` clamp(1.25rem, 3vw, 3rem). Sama persis dengan
              `landinglantuns` supaya satu ekosistem Anka Group
Ritme       : komponen `Section` — latar `base` (`bg-background`) / `sunken`
              (`bg-surface-2`) bergantian, border atas tipis, tanpa bayangan.
              Jarak: `tight` py-14/20 · `normal` py-20/28 · `loose` py-24/36
              (mobile/desktop). Rapat dan lega bergantian, bukan seragam
Judul       : `SectionHeading` — h2 `clamp(30px, 4.2vw, 56px)` maks 20ch,
              rata kiri, pengantar maks 56ch, tautan teks di kanan. Stiker di
              judul pakai `StampSticker` (ditempel saat masuk layar); tidak
              semua judul perlu stiker — Home cuma dua (katalog, didengar)
Dominan     : Home = headline hero. Halaman lain = judul halaman (`PageHero`);
              detail artist = nama artist; detail rilisan = cover/judul
Rata        : rata kiri sebagai bawaan. Rata tengah hanya di hero Home
Kartu       : hanya untuk membandingkan hal sejajar. Bukan wadah bawaan
Bayangan    : kartu diam pakai border. Bayangan untuk yang melayang saja
              (menu, banner cookie)

## Hero Home — DIKUNCI (permintaan Kaiel)

Headline "Label musik **independen**, dari **pop** sampai **electronic**." —
tiga stiker (primary / aksen / invert), rata tengah, `min-h-dvh`. Genre itu
contoh, bukan klaim genre eksklusif. Paragraf + dua tombol (Kirim Demo =
primary, Lihat Roster = invert). Chip genre di latar bereaksi ke kursor.
Tidak ada foto di hero.

Yang boleh diubah: komponen penyusunnya dan animasi masuknya. Isi dan susunan
tidak. Kode: `src/components/home/hero.tsx` + `hero.module.css`.

**Chip genre latar per ukuran layar** (`hero-chip-field.tsx`):
- `<768px`: 4 chip saja (Pop, Live di atas judul; Jazz, Hip-Hop di bawah
  tombol), posisi khusus mobile. Indie, R&B, Folk disembunyikan — di layar
  sempit judul memenuhi lebar, tidak ada ruang tanpa menimpa teks
- 768–1023px: posisi desktop, Folk disembunyikan (menimpa titik judul)
- `≥1024px`: ketujuh chip

## Gerak

Durasi      : 120ms hover/fokus · 200ms dropdown/tab · 320ms menu/modal
Easing      : `cubic-bezier(0.16, 1, 0.3, 1)`
Prinsip     : satu momen sambutan di hero, sisanya tenang. CSS saja, tanpa
              library animasi. `prefers-reduced-motion` = langsung keadaan akhir

**Animasi masuk hero** (±1,3 dtk, tiap Home dibuka, tidak menghalangi klik,
teks sudah ada di HTML sejak awal, CSS murni):
1. 0–860ms — tiap kata naik dari balik garis (topeng per kata), jeda 50ms
2. 380 / 540 / 700ms — tiga stiker "ditempel" (760ms): warna menyapu
   kiri→kanan sebagai gambar latar yang tumbuh, teks berganti ke warna
   stiker, lalu miring 2,5× rotasi akhirnya dan kembali
3. 820ms paragraf, 900ms tombol, 1150ms panah — fade + naik 8px
4. 920ms + 45ms per chip — chip genre menyebar dari arah tengah
Semua di dalam `prefers-reduced-motion: no-preference`: kalau gerak dikurangi,
tidak ada animasi **dan tidak ada jeda** — teks langsung tampil.

**Prinsip jumlah (Kaiel 2026-09-27): "jangan too much, tapi bukan berarti
tidak ada animasi sama sekali."** Gerak dipakai kalau menjelaskan perubahan
atau meneruskan tanda tangan stiker. Daftar di bawah ini **lengkap** — gerak
di luar daftar ini tidak ditambahkan tanpa izin Kaiel.

| # | Gerak | Di mana | Kapan |
|---|---|---|---|
| 1 | Sambutan hero penuh (di atas) | Home | Saat dibuka |
| 2 | **Sambutan mini**: kata judul naik + stiker ditempel, ±0,6 dtk | `PageHero` semua halaman lain | Saat dibuka |
| 3a | **Stiker ditempel** — sapuan warna + miring; teks terbaca sejak awal | Judul section yang punya stiker; stiker inline dalam satu paragraf/grup ditempel berurutan (jeda 180ms) | Sekali, saat pertama masuk layar |
| 3b | **Kredit ditulis** — garis titik `CreditList` tergambar dari kiri baris demi baris (110ms), nilai muncul di ujung. Nama tidak pernah disembunyikan | Semua `CreditList` | Sekali, saat pertama masuk layar |
| 4 | **Tracklist hover**: nomor → ikon ▶, cover kecil miring 2°, baris menyala `bg-hover`. Di layar sentuh cukup umpan balik tekan | Semua daftar rilisan/artist | Hover/fokus, 120ms |
| 5 | **Filter katalog**: baris masuk/bergeser (VT per baris). Ke kategori kosong: pesan kosong naik (`rise-on-load`) — React tidak memulai VT kalau perubahannya cuma menghapus | `/catalog` | Saat ganti filter |
| 6 | **Transisi halaman**: judul rilisan & nama artist di daftar melayang jadi h1 detail (`share="morph"`, 420ms, `releaseTitleVT` / `artistNameVT`); sisanya crossfade 200ms; header diam (`site-header`). h1 detail **tanpa** `rise-on-load` — dua animasi di satu elemen bertabrakan | Daftar → detail | Saat navigasi |
| 7 | Chip latar hero bereaksi ke kursor | Hero Home, perangkat mouse | Kursor mendekat |
| 8 | Menu mobile masuk berjenjang | Header | Saat dibuka |

**Tidak ada section Home yang diam total** (Kaiel 2026-09-27: "biar tidak ada
bagian yang terlalu diam atau tenggelam") — tiap section punya satu momen:
hero sambutan · manifesto stiker berurutan · artist kredit ditulis · katalog
stiker judul + tracklist hover · roster kredit ditulis · ekosistem stiker
peran brand · dua jalur stiker judul. Pola ini dipakai juga di halaman lain.

Teknis: #3 lewat `<Reveal>` (IntersectionObserver) + atribut `data-stamp` /
`data-leader` / `data-value`, gaya di globals.css. #5–#6 lewat `<ViewTransition>`
React bawaan Next 16 (tanpa dependency; browser tanpa dukungan tetap jalan).
Nama VT harus unik per halaman. Semua tunduk pada `prefers-reduced-motion`.

**Sudah dibuang, jangan dikembalikan:** Lenis · goyang terus-menerus · chip
melayang di manifesto · foto berayun · panah melompat · animasi scroll di tiap
elemen.

## Header — `src/components/site-header.tsx`

- Logo + nama = tautan Home (tanpa item "Beranda"). Nav: Roster · Katalog ·
  Layanan · Tentang · Anka Group; aktif juga di sub-halaman. Aktif = stiker
  invert miring (h-8 `rounded-sm`); hover = teks menguat + garis bawah
- Kirim Demo (`ButtonLink sm`) **tampil di semua ukuran layar**
- `h-16`. Transparan di atas; >8px latar solid + border (tanpa blur). Turun
  lewat 120px menyingkir, naik muncul; fokus keyboard memunculkannya. Jangkar
  transisi halaman (`viewTransitionName: site-header`)
- `<1024px`: `[logo+nama] [Kirim Demo] [Menu]`; <360px nama disembunyikan
  visual. Menu = `<dialog>` layar penuh tanpa radius, nav 34px bernomor 01–05,
  masuk berjenjang, tombol tema + email di bawah. Saat dibuka fokus di
  `<dialog>`-nya (bukan logo — di HP tampil sebagai highlight)
- Header `fixed`: section pertama tiap halaman wajib `pt-32 md:pt-40`

## Komponen dasar

Pakai ini dulu sebelum menulis class manual. Beda kecil = varian, bukan
komponen baru. Primitif di `src/components/ui/`, pola tanda tangan di
`src/components/`.

| Komponen | Varian | Catatan |
|---|---|---|
| `Button` / `ButtonLink` / `buttonStyles()` | `primary` · `invert` · `outline`; `sm` h-9 · `md` h-11 · `lg` h-12 | Radius md. Hover naik 2px. `<button>` untuk aksi, `ButtonLink` untuk pindah halaman |
| `Sticker` / `stickerTones()` | `primary` · `accent` · `invert`; `display` · `inline`; tilt `left` · `right` · `none` | Tanda tangan 1. Satu-satunya elemen yang boleh miring |
| `StampSticker` | seperti `Sticker` + `trigger` `view` · `group` · `load`, `delay` | `view` judul section (masuk layar), `group` ikut `<Reveal>` (berurutan), `load` judul halaman (saat dibuka, mulai ±320ms) |
| `Reveal` | — | Pemicu masuk layar untuk grup stiker & `CreditList` |
| `PageHero` | — | Judul halaman: `rise-on-load` (naik saat dibuka), deskripsi menyusul 160ms |
| `ArtistFeature` | `nameAs` h1/h2 | Blok profil artist — satu komponen di Home, Roster, detail. Nama `clamp(56px,10vw,144px)`, fakta per tier (`artistFacts`), foto hanya kalau ada |
| `Chip` | `neutral` · `primary` · `accent` · `warning`; `sm` · `md` · `lg` | Label data (genre, status, kategori). Status selalu dengan teks |
| `Card` | — | Hanya untuk membandingkan hal sejajar. `rounded-lg`, border |
| `Section` / `SectionHeading` / `TextLink` | tone `base` · `sunken`; space `tight` · `normal` · `loose` | Lihat Layout & ritme |
| `Tracklist` | — | Tanda tangan 2. Daftar bernomor + hover ▶ (Gerak #4) |
| `PathList` | — | Pilihan jalur bernomor rata kiri + tombol (Home, Layanan) |
| `CreditList` | `people` · `facts` | Tanda tangan 2. Kiri ··· kanan (garis titik), baris ber-`href` bisa diklik |

`Field` (label + input + error) dibuat saat form Submit dikerjakan — belum
ada pemakainya.

## Susunan halaman

**Home** — Hero (dikunci) → Manifesto `#manifesto` (sunken·tight, judul kiri,
paragraf kanan, 4 stiker inline berurutan) → Artist utama (`ArtistFeature`,
base·loose) → Katalog (`Tracklist`, sunken·normal, stiker "katalog") → Roster
lain (dua `CreditList`, base·tight) → Ekosistem (dua `Card`, satu-satunya kartu
di Home, sunken·normal) → Dua jalur (baris bernomor, base·loose, stiker
"didengar").

**Roster** — `PageHero` → tiap artist aktif = `ArtistFeature` (base·loose) →
Kolaborasi (judul kiri + `CreditList` kanan, tak bisa diklik) → Pernah jadi
bagian (sama, bisa diklik). Kosong: kolaborasi/alumni disembunyikan, aktif
kosong = kalimat penjelas.

**Katalog** — `PageHero` → filter (tombol `aria-pressed`, aktif = stiker
invert miring, jumlah per kategori; label dari `CATEGORY_LABEL`) → hitungan
(`aria-live`) → `Tracklist`. Filter disimpan di `?kategori=` dan tetap
mengikuti URL kalau berubah dari luar (tautan footer). Dibungkus `<Suspense>`
dengan fallback seluruh katalog supaya HTML statis lengkap.

**Anka Group** — `PageHero` → struktur (pohon kredit: induk → dua cabang,
garis cabang tergambar saat masuk layar) → satu blok per brand bernomor
(nama besar, peran = stiker, tagline, isi, daftar "Yang dikerjakan") → visi +
fakta. Dua brand saja; tidak ada angka hiasan.

**Layanan** — `PageHero` → satu section per tahap (nomor + stiker tahap
ditempel, judul besar, lede tebal, isi; kanan: daftar bernomor "Yang
dikerjakan") → Mulai dari mana (`PathList`) → FAQ (`<details>`, hanya
pertanyaan yang punya jawaban asli).

**Tentang** — `PageHero` → cerita (judul kiri, prosa kanan dengan 2 stiker
inline berurutan, ditutup kutipan besar ber-garis kiri) → empat prinsip
bernomor dua kolom → penutup rata kiri (stiker "ngobrol", Kirim Demo + Email).

**Submit** — dua jalur bernomor (judul kiri, isi kanan). Status open call
dari `site.openCall` (tutup = chip warning + ikon + pesan + `CreditList`
jalan keluar). **Legal** — judul `rise-on-load`, daftar isi = anchor `#id`
(bukan tombol JS). **404** — "Track 404", stiker "daftar", `Tracklist
covers={false}` ke tujuan utama.

**Detail artist / rilisan** — tautan kembali → chip → **h1 = elemen terbesar**
(`clamp(48–56px … 120–144px)`, `w-fit` untuk morph) → kiri: kutipan/bio atau
deskripsi + tombol platform; kanan: foto/cover kalau ada + `CreditList facts`
(artist di detail rilisan bisa diklik ke profil). Lalu Kredit (field milik
rilisan: tampil walau kosong, dengan penjelasan) dan daftar rilisan terkait
(disembunyikan kalau kosong).

## Gambar & aset

- **Foto hanya tampil kalau ada.** Belum ada foto = layout tipografi penuh,
  bukan kotak "foto belum diupload" di production. Semua placeholder washi
  tape sudah dihapus (2026-09-27)
- Foto artist kalau ada: `max-w-[420px]` di kolom samping supaya rasio 4:5
  tidak meledak di layar lebar
- Cover rilisan: kotak 48px (`rounded-md`) di daftar, besar di detail
- Logo AE `/apple-touch-icon.png`, Lantuns `/lantunsicon.png` (PNG latar
  putih) — di wadah `h-14 w-14 rounded-md border p-2.5 bg-foreground/[0.03]`
- Ikon UI: Lucide. Logo brand (sosmed, Spotify, Apple Music): `react-icons`,
  **monokrom** `currentColor`, bukan warna brand aslinya

## Copy

- Bahasa Indonesia, sapaan "kamu", Anka menyebut diri "kami"
- Kapital di awal kalimat saja, termasuk tombol
- Tidak ada klaim data real-time ("lagi didengerin") — list statis bukan data
  live. Chip "Streaming" = status rilis, boleh
- Data yang belum ada: **ditampilkan kosong dengan jujur** kalau field itu
  memang milik entitasnya ("Belum ada credit"); **disembunyikan** kalau memang
  tidak berlaku (tidak ada rilisan lain, tidak ada kolaborator)
- Jawaban FAQ soal royalti/master tidak pernah dikarang

## Referensi luar

- **Situs lama** (`../aelama`) — diambil: copy, skema, struktur, mekanik.
  Dibuang: glass, glow orb, gradient text, serif italic, placeholder gradient
- **`landinglantuns`** — diambil: lebar konten & gutter

## Aset sementara

- Foto artist & cover rilisan belum ada di project; cover 3 single ada di
  situs lama, belum diimport
- Link Spotify/Apple Music artist & rilisan masih placeholder
- `favicon.ico` kemungkinan masih bawaan Next.js
