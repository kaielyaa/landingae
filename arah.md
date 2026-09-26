# Arah Visual — Anka Entertainment (landingae)

Keputusan visual yang **masih berlaku**. Mengikat. Riwayat dan alasan keputusan
lama ada di `arah-riwayat.md` (tidak mengikat). Rencana kerja & fase di
`rencana.md`.

Tanda **[Fase N]** = sudah diputuskan, kodenya belum disesuaikan. Sampai
fase itu jalan, kode lama masih berbeda — yang benar yang tertulis di sini.

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

Token mengikuti kontrak standar (dirapikan 2026-09-27): `--surface` light =
`--background` (`n-0`, bukan putih murni) — kartu dibedakan border, section
dibedakan `--surface-2`. Gerak: `--duration-fast/base/slow`, `--ease-out`.
Status lengkap termasuk `--info` (hue 265).

## Tipografi

Keluarga    : **Cabinet Grotesk** saja, untuk judul maupun isi — grotesk tegas
              yang tetap ramah; satu keluarga dengan permainan ketebalan
              lebih rapi daripada dua. Fontshare, lisensi web gratis
Ketebalan   : 400 isi · 500 label · 700 judul & display (total 3). 800
              dicopot karena tidak dipakai; boleh ditambah lagi kalau perlu.
              `font-semibold` (600) masih ada di kode tapi tidak dimuat —
              browser menampilkan 700. Saat halaman dibangun ulang, ganti ke
              `font-medium` atau `font-bold` sesuai maksudnya
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
| 3 | **Stiker judul section ditempel** — hanya sapuan warna + miring; teks sudah terbaca sejak awal, tidak ada konten yang disembunyikan | Judul section yang punya stiker | Sekali, saat pertama masuk layar |
| 4 | **Tracklist hover**: nomor → ikon ▶, cover kecil miring 2°, baris menyala `bg-hover`. Di layar sentuh cukup umpan balik tekan | Semua daftar rilisan/artist | Hover/fokus, 120ms |
| 5 | **Filter katalog**: baris yang tersisa bergeser mulus, yang keluar memudar | `/catalog` | Saat ganti filter |
| 6 | **Transisi halaman**: judul/cover di daftar "melayang" jadi judul/cover besar di halaman detail; halaman lain crossfade singkat | Daftar → detail rilisan & artist | Saat navigasi |
| 7 | Chip latar hero bereaksi ke kursor | Hero Home, perangkat mouse | Kursor mendekat |
| 8 | Menu mobile masuk berjenjang | Header | Saat dibuka |

Teknis: CSS + satu komponen kecil pendeteksi masuk layar (IntersectionObserver)
untuk #3; #5 dan #6 lewat `<ViewTransition>` bawaan React di Next 16 (tanpa
konfigurasi, tanpa dependency; browser yang belum dukung tetap jalan tanpa
animasi). Semua tunduk pada `prefers-reduced-motion`.

**Sudah dibuang (2026-09-27):** Lenis smooth scroll (dependency dicopot,
scroll native) · goyang terus-menerus di chip latar · chip melayang di
manifesto · foto berayun · tombol scroll yang melompat (sekarang diam, bereaksi
saat hover). **Jangan dikembalikan.** Animasi scroll di tiap elemen tetap haram.

## Header — `src/components/site-header.tsx`

- Logo + wordmark = tautan ke Home. Tidak ada item "Beranda"
- Nav: Roster · Katalog · Layanan · Tentang · Anka Group. Aktif juga untuk
  sub-halaman (`/roster/db-project` → Roster)
- Halaman aktif = stiker invert (`stickerTones("invert")` + `-rotate-1`),
  tinggi 32px `rounded-sm`. Hover: teks menguat + garis bawah
- Kirim Demo = `ButtonLink size="sm"`, **tampil di semua ukuran layar**
- Tinggi `h-16`. Transparan di atas; setelah scroll >8px latar solid
  `bg-background` + border (tanpa blur kaca). Turun lewat 120px → menyingkir,
  naik → muncul. Fokus keyboard di dalam header selalu memunculkannya
- `<1024px`: `[logo + nama] [Kirim Demo] [Menu]` — di 768px lima item nav
  tidak muat satu baris. Di bawah 360px nama brand disembunyikan visual
  (tetap terbaca pembaca layar)
- Menu mobile/tablet = `<dialog>` modal layar penuh, **tanpa radius** (menutup
  seluruh layar). Baris atas sama dengan header (tombol Menu jadi Tutup di
  posisi yang sama). Nav 34px bold bernomor 01–05 ala tracklist, masuk
  berjenjang 40ms. Bawah: tombol tema berlabel + email. Esc menutup, fokus
  terkunci, halaman belakang tidak ikut scroll. Saat dibuka, fokus ditaruh
  di `<dialog>`-nya (bukan logo — di HP itu tampil sebagai highlight)
- Header `fixed` — halaman yang hero-nya bukan `min-h-dvh` wajib punya
  `pt-32 md:pt-40` di section pertama (sudah di `PageHero`)

## Komponen dasar

Pakai ini dulu sebelum menulis class manual. Beda kecil = varian, bukan
komponen baru. Primitif di `src/components/ui/`, pola tanda tangan di
`src/components/`.

| Komponen | Varian | Catatan |
|---|---|---|
| `Button` / `ButtonLink` / `buttonStyles()` | `primary` · `invert` · `outline`; `sm` h-9 · `md` h-11 · `lg` h-12 | Radius md. Hover naik 2px. `<button>` untuk aksi, `ButtonLink` untuk pindah halaman |
| `Sticker` / `stickerTones()` | `primary` · `accent` · `invert`; `display` · `inline`; tilt `left` · `right` · `none` | Tanda tangan 1. Satu-satunya elemen yang boleh miring |
| `StampSticker` | seperti `Sticker` | Stiker judul section, ditempel saat masuk layar (Gerak #3) |
| `Chip` | `neutral` · `primary` · `accent` · `warning`; `sm` · `md` · `lg` | Label data (genre, status, kategori). Status selalu dengan teks |
| `Card` | — | Hanya untuk membandingkan hal sejajar. `rounded-lg`, border |
| `Section` / `SectionHeading` / `TextLink` | tone `base` · `sunken`; space `tight` · `normal` · `loose` | Lihat Layout & ritme |
| `Tracklist` | — | Tanda tangan 2. Daftar bernomor + hover ▶ (Gerak #4) |
| `CreditList` | `people` · `facts` | Tanda tangan 2. Kiri ··· kanan (garis titik), baris ber-`href` bisa diklik |

`Field` (label + input + error) dibuat saat form Submit dikerjakan — belum
ada pemakainya.

## Home — susunan (Fase 2, 2026-09-27)

| Section | Latar · jarak | Isi |
|---|---|---|
| Hero | — | Dikunci, lihat di atas |
| Manifesto `#manifesto` | sunken · tight | Judul kiri, paragraf kanan (≥1024px). Develop/Record/Release/Lantuns = stiker inline |
| Artist utama | base · loose | Chip status, **nama `clamp(56px,10vw,144px)` = elemen terbesar section**, kutipan + bio kiri, fakta `CreditList facts` + tombol platform kanan. Foto hanya kalau `artist.photo` ada |
| Katalog | sunken · normal | `Tracklist` bernomor, stiker "katalog" |
| Roster lain | base · tight | Dua `CreditList`: alumni (bisa diklik) + kolaborasi (tidak) |
| Ekosistem | sunken · normal | Dua `Card` brand (satu-satunya kartu di Home) |
| Dua jalur | base · loose | Stiker "didengar", dua baris bernomor, tombol di kanan — bukan kartu rata tengah |

## Gambar & aset

- **Foto hanya tampil kalau ada.** Belum ada foto = layout tipografi penuh,
  bukan kotak "foto belum diupload" di production. Home sudah begini.
  **[Fase 3]** placeholder washi tape (`ArtistPhotoPlaceholder`,
  `ReleaseCoverPlaceholder`, `PinnedPlaceholder`) di Roster & Katalog
  diganti dengan pola yang sama, lalu komponennya dihapus
- Foto artist kalau ada: `max-w-[420px]` di kolom samping supaya rasio 4:5
  tidak meledak di layar lebar
- Cover rilisan: kotak 48px (`rounded-md`) di daftar, besar di detail
- Logo AE = `/apple-touch-icon.png` di mana pun. Logo Lantuns =
  `/lantunsicon.png`. Keduanya PNG berlatar putih; di wadah `h-14 w-14
  rounded-md border p-2.5 bg-foreground/[0.03]`
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

- **Situs lama** (`../aelama`, ankaentertainment.com) — diambil: copy, skema
  data, struktur halaman, mekanik (TOC legal, cookie banner, form submit,
  gabungan kolaborasi+alumni). Dibuang: glass, glow orb, gradient text,
  serif italic, gradient placeholder ungu-biru
- **`landinglantuns`** — diambil: lebar konten & gutter

## Aset sementara

- Foto artist & cover rilisan belum ada di project; cover 3 single ada di
  situs lama, belum diimport
- Link Spotify/Apple Music artist & rilisan masih placeholder
- `favicon.ico` kemungkinan masih bawaan Next.js
