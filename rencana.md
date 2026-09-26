# Rencana — Anka Entertainment (landingae)

Dokumen ini PRD project: **apa** yang dibangun, **kenapa**, dan **urutannya**.
Nilai visual (warna, font, radius) tetap di `arah.md`. Temuan kecil tetap di
`catatan.md`. Kalau rencana ini bertentangan dengan `arah.md`, yang dipakai
yang lebih baru, lalu salah satunya diperbarui.

Ditulis 2026-09-27. Status: **Fase 0 selesai (2026-09-27). Berikutnya Fase 1.** Jawaban Kaiel sudah masuk
(bagian 9).

---

## 1. Ringkasan

Situs resmi Anka Entertainment, label musik independen Indonesia (sejak 2021,
di bawah PT Anka Sembilan Delapan / Anka Group). Situs lama
(ankaentertainment.com, source di `../aelama`) sudah mati domainnya dan
gayanya ditinggalkan (glass, glow, gradient-text).

`landingae` sudah jalan ±70%: semua halaman utama ada, data rapi, token
OKLCH benar. Yang kurang: halaman-halaman di luar hero masih terasa
template (kartu berpasangan, blok rata tengah, placeholder besar kosong),
geraknya banyak tapi tersebar, dan belum siap deploy.

**Keputusan: bangun ulang terkendali, bukan dari nol.**

| Dipertahankan | Dibangun ulang |
|---|---|
| Hero Home (headline + blok warna di kata) — **permintaan Kaiel** | Layout semua section di luar hero |
| Token warna OKLCH, Cabinet Grotesk, aturan radius bertingkat | Komponen: pindah ke `components/ui/` yang seragam |
| Data layer `src/lib/artists.ts` + `releases.ts` (sudah sebentuk skema Sanity) | Gerak: dirampingkan, lihat bagian 5 |
| Konten legal hasil porting, cookie banner | Halaman Anka Group (yang sekarang rusak) |
| Prinsip "kosong itu jujur, bukan dikarang" | Header + menu mobile (sekarang di HP tidak ada nav) |
| | Halaman Submit (form beneran, ditunda sampai open call dibuka) |

---

## 2. Tujuan & ukuran berhasil

Situs ini punya dua pembaca, urut kepentingan:

1. **Artist yang mempertimbangkan gabung** — mau tahu: label ini serius
   atau nggak, siapa aja roster-nya, gimana cara kirim demo.
   → Aksi utama: **Kirim Demo**
2. **Pendengar / industri** (media, promotor, calon kolaborator) — mau
   dengerin rilisan dan kenal artist-nya.
   → Aksi utama: **dengerin di Spotify/Apple Music**

Berhasil kalau:
- Dari Home, jalur ke Kirim Demo maksimal 1 klik, ke lagu maksimal 2 klik
- Tiap halaman lolos Definisi Kelar di standar (lint, typecheck, 375/768/1280,
  light/dark, keyboard, empat tampilan)
- LCP < 2.5 dtk, CLS < 0.1, JS awal < 150KB — animasi hero nggak boleh
  merusak angka ini
- Nggak ada satu pun data karangan yang ikut ke production

---

## 3. Arah visual — yang dikunci

Jangkar dipertajam, bukan diganti:

> **Sampul rilisan dan liner notes** — stiker label yang ditempel di sampul,
> daftar lagu bernomor, kredit "siapa mengerjakan apa".

Anka tidak punya nomor katalog resmi (dikonfirmasi Kaiel 2026-09-27), jadi
**tidak ada kode katalog karangan** seperti AE-001. Penomoran cuma nomor urut
daftar (01, 02, 03) yang memang urutan rilis.

Kenapa: jangkar lama ("nge-tag lagu di catatan pribadi") melahirkan hero yang
bagus, tapi terlalu abstrak buat nurunin halaman lain — makanya section lain
jatuh ke kartu generik. Liner notes itu benda nyata dari dunia label, dan
**nyambung ke nilai yang mereka jual sendiri**: transparan soal kepemilikan
master (= kredit yang jelas), proses panjang (= daftar kerja yang tercatat).
Blok warna di hero tetap masuk akal: itu stikernya.

Kesan tetap: *"b aja kalau belum kenal, asik kalau udah kenal."*

**Tanda tangan (dua, dipakai konsisten, bukan cuma di hero):**
1. **Stiker kata** — blok warna solid di kata kunci (primary / accent /
   invert). Lahir di hero, diulang di judul section dan kalimat penting.
   Maksimal satu stiker per judul.
2. **Tata liner notes** — daftar bernomor, metadata rapat kecil
   (`Single · 2023 · Catalog`), kredit berkolom. Dipakai di katalog, roster,
   detail rilisan, detail artist, bahkan footer.

**Yang dibuang:** washi tape bergoyang, chip bergoyang di section manifesto,
rotasi kecil di banyak elemen (rotasi cuma boleh di stiker), placeholder foto
raksasa, pasangan kartu rata tengah ("Dua brand", "Siap didengar?").

Ritme section: lega–rapat bergantian, bukan `py` seragam. Nilai pastinya
ditulis di `arah.md` saat Fase 1.

---

## 4. Halaman & isi

Sumber isi: situs lama (`../aelama`) untuk copy dan skema, `src/lib/*` untuk data.

### Header (semua halaman) — didesain ulang
Masalah sekarang: logo tidak bisa diklik, **di HP tidak ada menu sama sekali**
(nav disembunyikan di bawah 768px tanpa pengganti), Anka Group tidak ada di
nav, dan nama brand turun dua baris di 375px.

- **Logo + wordmark = tautan ke Home.** Item "Beranda" dihapus dari nav
- **Nav:** Roster · Katalog · Layanan · Tentang · Anka Group
- **Halaman aktif ditandai stiker** — blok invert kecil di belakang label
  (tanda tangan 1), bukan cuma ganti warna teks. Hover: garis bawah tipis
- **Kirim Demo** tetap tombol primary di kanan, di semua ukuran layar
  (aksi utama haram disembunyikan di mobile)
- **Scroll:** transparan di atas hero; setelah discroll jadi latar solid +
  border tipis (tanpa blur kaca). Turun → header menyingkir, naik → muncul
  lagi, biar tidak menutupi bacaan
- **Mobile (<768px):** `[logo + nama] [Kirim Demo] [Menu]`. Menu membuka
  lembar layar penuh: nav ditulis besar bernomor ala tracklist, tombol tema
  di bawahnya. Tutup dengan Esc / tombol, fokus terkunci di dalam, 320ms
- Tombol tema pindah ke dalam menu di mobile; di desktop tetap ikon di kanan

### Home — `/`
Urutan (bukan urutan default hero→fitur→testimoni→CTA):

1. **Hero** — dipertahankan persis, plus animasi masuk (bagian 5). Dua tombol
   tetap: Kirim Demo, Lihat Roster
2. **Manifesto** — "Bukan content factory." paragraf naratif dengan stiker
   Develop/Record/Release. Tanpa chip dekoratif melayang
3. **Artist utama (DB Project)** — nama artist sebagai elemen paling besar
   section ini, metadata gaya liner notes, tombol Spotify/Apple Music.
   Foto **hanya tampil kalau ada**; kalau belum ada, layout tipografi penuh —
   bukan kotak "foto belum diupload" di production
4. **Katalog** — daftar lagu bernomor (tracklist), cover kecil kalau ada
5. **Roster lain** — kolaborasi + alumni sebagai blok kredit
6. **Dua jalur** — Gabung sebagai artist / Distribusi via Lantuns. Split
   rata kiri, bukan dua kartu rata tengah
7. Footer

### Roster — `/roster` · `/roster/[slug]`
Aktif → Kolaborasi (nama saja, tidak bisa diklik) → Alumni. Detail artist:
nama dominan, bio, kutipan, link platform & sosmed, rilisan miliknya.
Kolaborator tetap **tidak punya halaman** (keputusan Kaiel 2026-08-20).

### Katalog — `/catalog` · `/catalog/[slug]`
Filter kategori Catalog / Production / Cover (skema asli situs lama). Tautan
footer "Karya Produksi" & "Cover" diarahkan ke filter-nya
(`/catalog?kategori=production`), bukan ke halaman yang sama tanpa beda.
Detail: cover, kredit, link streaming, rilisan lain dari artist yang sama.

### Layanan — `/services`
Develop / Record / Release + jalur distribusi (Lantuns) + FAQ. Jawaban FAQ
soal royalti & master **tidak dikarang** — pertanyaan tanpa jawaban asli
disembunyikan, bukan ditampilkan kosong.

### Tentang — `/about`
Cerita (dibangun di studio, bukan ruang rapat), empat keyakinan dari situs
lama, penutup "Tidak buru-buru. Kami juga."

### Anka Group — `/anka-group`
Yang sekarang (`src/app/ankagroup`) **dihapus**: rusak (typecheck gagal),
URL-nya beda dengan footer, dan copy-nya karangan. Dibangun ulang dari situs
lama: induk PT Anka Sembilan Delapan → **dua brand** di bawahnya (AE: label,
Lantuns: distribusi) → visi multi-venture. Judul situs lama "Tiga brand"
salah — yang benar dua (Kaiel 2026-09-27), dan angka "3 brand aktif" di
situs lama tidak ikut dibawa. Bagan ekosistem digambar sebagai struktur
kredit, bukan diagram bercahaya.

### Submit — `/submit`
Pilih jalur dulu: **Gabung roster** (form) atau **Distribusi** (ke Lantuns).
Form mengikuti situs lama: nama, email, link demo *atau* file (mp3/wav/m4a,
maks 4MB), honeypot anti-bot, validasi server. Status buka/tutup open call
diatur satu saklar; saat tutup, tampil penjelasan + jalan keluar (sudah ada).
**Ditunda (Kaiel 2026-09-27):** saat launch saklar di posisi tutup. Form dan
kirim email (SMTP) dikerjakan belakangan.

### Legal — `/privacy` · `/terms` · `/cookies`
Tetap. Isi perlu direview sebelum deploy (hasil porting, bukan versi final).

### Tambahan wajib
Halaman 404 sendiri · `sitemap.ts` · `robots.ts` · gambar OpenGraph
1200×630 · JSON-LD `MusicGroup`/`Organization` · metadata unik tiap halaman.

---

## 5. Gerak

Prinsip: **satu momen sambutan yang berkesan, sisanya tenang.** Semua pakai
CSS (tanpa library animasi baru). `prefers-reduced-motion` = langsung ke
keadaan akhir tanpa gerak.

### Animasi masuk hero (sambutan)
Diputar sekali saat Home dibuka. Total ±1,2 detik, tidak menghalangi klik.

| Waktu | Yang terjadi |
|---|---|
| 0–500ms | Baris headline naik dari balik garis (masked reveal), per kata, jeda ±50ms |
| 350–900ms | Tiga stiker "ditempel" satu per satu: latar warnanya menyapu dari kiri ke kanan, lalu miring sedikit ke rotasinya sekarang — seperti stiker yang ditempel tangan lalu ditekan |
| 800–1100ms | Paragraf dan dua tombol muncul (fade + naik 8px) |
| 900–1200ms | Chip genre di latar menyebar masuk dari tengah ke posisinya |

Syarat teknis: teks sudah ada di HTML sejak awal (bukan disuntik JS), jadi
situs tetap terbaca kalau JS mati dan LCP tidak tertunda lama.

### Gerak yang dipertahankan
- Chip latar hero bereaksi ke kursor (desktop saja). **Goyang terus-menerus
  dimatikan** — geraknya cukup saat kursor dekat
- Hover/fokus 120ms, dropdown/tab 200ms, easing `cubic-bezier(0.16,1,0.3,1)`
- Stiker judul section boleh "menempel" sekali saat pertama terlihat — satu
  tempat saja per halaman, bukan animasi scroll di tiap elemen

### Gerak yang dibuang
- **Lenis (smooth scroll)** — membajak scroll native, menambah JS di semua
  halaman, dan sering bikin ngelag di HP. Diganti scroll bawaan browser.
  Dependency `lenis` dicopot
- Washi tape & foto berayun, chip goyang di manifesto, tombol scroll
  melompat-lompat (diganti panah diam yang cuma bereaksi saat hover)

---

## 6. Teknis

Stack tetap: Next.js 16.3 App Router, TypeScript, Tailwind v4, Lucide,
`react-icons` (logo brand saja), `next-themes`, `clsx` + `tailwind-merge`.

**Komponen dasar (`src/components/ui/`) dibangun duluan**, baru halaman:
`Button` (primary / invert / ghost; sm/md/lg) · `Sticker` (stiker kata:
primary / accent / invert) · `Chip` (tag genre/status) · `Tracklist` +
`TrackRow` · `Credits` (blok metadata berkolom) · `Field` (label + input +
error) · `Section` (wadah lebar + ritme).

**Pembersihan token** (dicocokkan ke kontrak standar):
- `--surface` light masih putih murni `oklch(1 0 0)` → `L 0.995 C 0.003`
- `--ease-keluar` → nama kontrak `--ease-out`; tambah `--duration-*` yang belum
  lengkap, `--info` + `--info-subtle`
- Radius satu sumber: `--radius-sm/md/lg/xl`, hapus alias `--radius-chip`

**Lain-lain:**
- Font Cabinet Grotesk di-host sendiri lewat `next/font/local` (sekarang CDN
  Fontshare); maksimal 4 ketebalan
- Tambah skrip `"typecheck": "tsc --noEmit"`
- **Sanity: jadi, project Sanity baru** (bukan menyambung ke project situs
  lama). Skema `artist` / `release` / `siteSettings` dari `aelama` dipakai
  sebagai titik awal. Sampai Fase 7, data tetap di `src/lib/*` yang bentuknya
  sudah siap diganti `client.fetch()` tanpa ubah UI. Paket Sanity yang
  dipasang disebutkan satu per satu ke Kaiel sebelum dipasang
- Header mobile: nama brand yang turun dua baris di 375px dirapikan

---

## 7. Fase kerja

Tiap fase ditutup dengan lint + typecheck + cek browser + commit.

| Fase | Isi | Jenis |
|---|---|---|
| **0. Beres-beres** | Commit titik simpan · hapus `src/app/ankagroup` · skrip typecheck · `arah.md` dipadatkan (<300 baris, riwayat pindah ke `arah-riwayat.md`) · `catatan.md` yang selesai pindah ke arsip | Mengikuti |
| **1. Pondasi** | Token dirapikan · font self-host · komponen `ui/` · header baru + menu mobile · copot Lenis & gerak yang dibuang · ritme section dicatat di `arah.md` | **Mengunci** |
| **2. Home** | Hero + animasi masuk · section 2–7 dibangun ulang | **Mengunci** (halaman pertama) |
| 3. Roster & Katalog | Daftar + detail, pakai komponen fase 1 | Mengikuti |
| 4. Layanan, Tentang, Anka Group | Isi dari situs lama | Mengikuti |
| 5. SEO & 404 | Metadata, OG image, sitemap, robots, JSON-LD | Mengikuti |
| 6. Aset & CMS | Import cover dari situs lama · foto artist · project Sanity baru + studio | Butuh izin paket |
| 7. Submit | Form + validasi + kirim email — **ditunda**, dikerjakan saat open call mau dibuka | Butuh akun SMTP |
| 8. Pra-deploy | Hapus data dummy · link sosmed & streaming asli · review legal · `npm run build` · deploy (setelah izin) | Butuh izin |

Fase 0–2 bisa langsung jalan. Hasil Fase 2 direview Kaiel di browser sebelum
Fase 3, karena semua halaman berikutnya mewarisi bahasanya.

---

## 8. Di luar lingkup

- Pemutar musik tertanam (embed Spotify) — link keluar dulu, diputuskan nanti
- Bahasa Inggris / dwibahasa
- Analitik & pelacak (butuh izin terpisah, cookie banner menyesuaikan)
- Blog / berita rilis

---

## 9. Keputusan Kaiel (2026-09-27)

| # | Soal | Jawaban |
|---|---|---|
| 1 | Jumlah brand di Anka Group | **Dua:** Anka Entertainment dan Lantuns |
| 2 | Nomor katalog resmi | **Tidak ada** → nomor urut daftar saja |
| 3 | Sanity CMS | **Jadi, project Sanity baru** |
| 4 | Open call saat launch | **Nanti** → form ditunda, saklar tutup |
| 5 | Link sosmed & streaming | Ambil dari situs lama; yang belum ketemu diperiksa ulang di Fase 8 |
| — | Header | Nav boleh disesuaikan, logo jadi tautan ke Home, desain header bebas dieksplorasi |

**Link sosmed dari situs lama** (`aelama/.../FooterClient.tsx`), dipakai di
Fase 1 menggantikan placeholder:
- Instagram `https://www.instagram.com/anka_entertainment/`
- TikTok `https://tiktok.com/@ankaentertainment`
- YouTube `https://www.youtube.com/@ankaentertainment7166`
- LinkedIn `https://linkedin.com/company/ankaentertainment`
- Email `hello@ankaentertainment.com`

**Perlu dicek ulang di Fase 8:**
- Situs lama punya dua versi Instagram: footer `anka_entertainment` (pakai
  garis bawah), halaman Submit `ankaentertainment` (tanpa). Yang dipakai
  versi footer, tapi perlu dipastikan
- Link Spotify/Apple Music DB Project dan tiap rilisan **tidak ada di source**
  situs lama — dulu tersimpan di data Sanity lama, bukan di kode. Masih
  placeholder
