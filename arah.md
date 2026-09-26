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
| panel besar | lembar menu mobile, foto besar | `rounded-xl` 20px |

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
Ritme       : section berganti latar `bg-background` / `bg-surface-2`, tanpa
              border tebal atau bayangan. **[Fase 1]** pola jarak antar-section
              (lega–rapat) ditetapkan dan ditulis di sini
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
tidak.

## Gerak

Durasi      : 120ms hover/fokus · 200ms dropdown/tab · 320ms menu/modal
Easing      : `cubic-bezier(0.16, 1, 0.3, 1)`
Prinsip     : satu momen sambutan di hero, sisanya tenang. CSS saja, tanpa
              library animasi. `prefers-reduced-motion` = langsung keadaan akhir

**[Fase 2] Animasi masuk hero** (±1,2 dtk, sekali per buka Home, tidak
menghalangi klik, teks sudah ada di HTML sejak awal):
1. 0–500ms — baris headline naik dari balik garis, per kata, jeda ±50ms
2. 350–900ms — tiga stiker "ditempel": warna menyapu kiri→kanan, lalu miring
   ke rotasinya
3. 800–1100ms — paragraf + tombol muncul (fade + naik 8px)
4. 900–1200ms — chip genre latar menyebar ke posisinya

**Dipertahankan:** chip latar hero bereaksi ke kursor (desktop saja) · stiker
judul section boleh "menempel" sekali saat pertama terlihat, maksimal satu
per halaman.

**Sudah dibuang (2026-09-27):** Lenis smooth scroll (dependency dicopot,
scroll native) · goyang terus-menerus di chip latar · chip melayang di
manifesto · foto berayun · tombol scroll yang melompat (sekarang diam, bereaksi
saat hover). **Jangan dikembalikan.** Animasi scroll di tiap elemen tetap haram.

## Header — [Fase 1] didesain ulang

- Logo + wordmark = tautan ke Home. Tidak ada item "Beranda"
- Nav: Roster · Katalog · Layanan · Tentang · Anka Group
- Halaman aktif ditandai stiker invert kecil; hover garis bawah tipis
- Kirim Demo tombol primary di kanan, **tampil di semua ukuran layar**
- Transparan di atas hero; setelah scroll jadi latar solid + border tipis
  (tanpa blur kaca). Scroll turun → menyingkir, naik → muncul
- `<768px`: `[logo + nama] [Kirim Demo] [Menu]`. Menu = lembar layar penuh,
  nav besar bernomor ala tracklist, tombol tema di dalamnya, Esc menutup,
  fokus terkunci
- Header `fixed` — halaman yang hero-nya bukan `min-h-dvh` wajib punya
  `pt-32 md:pt-40` di section pertama (sudah di `PageHero`)

## Komponen dasar — `src/components/ui/`

Pakai ini dulu sebelum menulis class manual. Beda kecil = varian, bukan
komponen baru.

| Komponen | Varian | Catatan |
|---|---|---|
| `Button` / `ButtonLink` / `buttonStyles()` | `primary` · `invert` · `outline`; `sm` h-9 · `md` h-11 · `lg` h-12 | Radius md. Hover naik 2px. `<button>` untuk aksi, `ButtonLink` untuk pindah halaman |
| `Sticker` | `primary` · `accent` · `invert`; `display` · `inline`; tilt `left` · `right` · `none` | Tanda tangan 1. Satu-satunya elemen yang boleh miring |
| `Chip` | `neutral` · `primary` · `accent` · `warning`; `sm` · `md` · `lg` | Label data (genre, status, kategori). Status selalu dengan teks |
| `Card` | — | Hanya untuk membandingkan hal sejajar |

`Field` (label + input + error) dibuat saat form Submit dikerjakan — belum
ada pemakainya.

## Gambar & aset

- **Foto hanya tampil kalau ada.** Belum ada foto = layout tipografi penuh,
  bukan kotak "foto belum diupload" di production. **[Fase 2]** placeholder
  washi tape (`ArtistPhotoPlaceholder`, `PinnedPlaceholder`) diganti
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
