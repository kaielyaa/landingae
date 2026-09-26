# Catatan

Yang **masih terbuka** saja. Butir selesai dipindah ke `catatan-arsip.md`.
Pekerjaan terencana (fase 1–8) ada di `rencana.md`, tidak diulang di sini.

## Blokir deploy — wajib beres sebelum serah terima
- [ ] **Data dummy:** entri kolaborasi "Kaia Ramadhan" di `src/lib/artists.ts`
      itu nama KARANGAN buat preview (izin Kaiel 2026-08-20). Ganti ke
      kolaborator asli atau hapus
- [ ] **Link streaming** Spotify/Apple Music DB Project & tiap rilisan masih
      generik (`open.spotify.com`). Tidak ada di source situs lama — dulu di
      data Sanity lama
- [ ] **Instagram AE:** situs lama punya dua versi (`anka_entertainment` di
      footer, `ankaentertainment` di halaman Submit). Pastikan yang benar
- [ ] **Isi halaman legal** (`/privacy`, `/terms`, `/cookies`) hasil porting
      situs lama, belum direview untuk versi baru
- [ ] **Kategori master rilisan:** ketiga rilisan di `src/lib/releases.ts`
      di-set "Catalog" sebagai ASUMSI. Taksonominya (catalog / production /
      cover) sudah pasti dari skema Sanity lama, tapi isi per rilisan belum
      dikonfirmasi
- [ ] **FAQ Layanan:** baru 1 dari 5 pertanyaan yang punya jawaban asli.
      Sisanya soal royalti/master — tidak boleh dikarang

## Utang teknis
- `public/favicon.ico` kemungkinan masih bawaan Next.js (biner, belum
  diverifikasi). Tertutup sementara oleh `metadata.icons` di `layout.tsx`
  yang menunjuk ke SVG/PNG logo AE
- `npm run build` belum pernah dijalankan — SSG semua halaman belum
  terverifikasi. Dijalankan di Fase 8 saja
- Konsol dev: "Encountered a script tag while rendering React component" —
  dari `next-themes` 0.4.6 (menyuntik `<script>` anti-kedip tema) dengan
  React 19. Peringatan dev saja, tema tetap jalan. Sudah ada sebelum
  2026-09-27. Beres kalau `next-themes` rilis perbaikan — menaikkan versi
  perlu izin

- Tautan "Anka Group" di header & footer masih 404 sampai halamannya
  dibangun di Fase 4
- Hero di 375px: chip genre latar terpotong tepi layar & menimpa judul —
  dibereskan bersama animasi masuk hero (Fase 2)

## Keputusan yang ditunda
- Embed pemutar Spotify/Apple Music di halaman detail, atau tetap link
  keluar — butuh keputusan Kaiel, bawaan: link keluar

## Fakta yang sudah dikonfirmasi — jangan ditandai ragu lagi
- Past Roster (Putri Clarantika, Suci Arshinta, 2022–2024) = **data asli**
  (Kaiel 2026-08-20)
- Kolaborator **tidak punya halaman profil** — "artis kolaborasi mah bukan
  bagian gua" (Kaiel 2026-08-20). Karyanya tetap tampil di katalog
- Anka Group = **dua brand**: Anka Entertainment dan Lantuns (Kaiel 2026-09-27)
- Tidak ada nomor katalog resmi (Kaiel 2026-09-27)

## Sumber — situs lama (`../aelama/src`)
Source Next.js + Sanity + SMTP dari ankaentertainment.com (domain expired).
Sumber kebenaran untuk copy dan skema data, **bukan** untuk visual.
- Skema: `sanity/schemaTypes/` (`artist`, `release`, `siteSettings`)
- Query GROQ: `lib/queries.ts`
- Form submit + validasi upload: `app/(site)/api/submit/sign-artist/route.ts`,
  `lib/smtp.ts`
- Copy per halaman: `components/sections/<halaman>/`
