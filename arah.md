# Arah Visual — Anka Entertainment (landingae)

> Riwayat: jangkar pertama ("rig panggung electronic/live") dibuang karena
> kesannya *produced/big-show*, kontra sama arahan Kaiel yang mau personal,
> santai, kalem. Dokumen ini sudah versi kedua.

## ATURAN KERAS — radius (dicek tiap nambah elemen baru)

Kaiel udah beberapa kali negur ini di sesi yang sama. Bukan preferensi,
ini kontrak. **Radius bertingkat menurut TINGGI elemen, bukan satu angka
buta buat semua** (diralat dari draft pertama aturan ini yang bilang
"cuma 2 nilai" — itu kurang tepat, terbukti pas dipasang ke badge inline
setinggi ~24px, 12px kelihatan kayak full-pill karena radiusnya lebih
dari sepertiga tingginya):

- **Badge/chip inline kecil** (tinggi ~20–26px — badge di dalam paragraf,
  kayak Develop/Record/Release di section manifesto): `rounded-sm`
  (`--radius-sm`, 8px)
- **Tombol, chip mandiri, blok highlight teks, scroll button** (tinggi
  ~32–48px): `rounded-md` (`--radius-md` / `--radius-chip`, 12px)
- **Card/panel besar** (kalau/pas ada): `rounded-xl` (16px)

**Cara mutusin radius elemen baru: ukur dulu tinggi kira-kiranya, baru
pilih tingkatnya.** Patokan kasar: radius idealnya sekitar 20–35% dari
tinggi elemen — di bawah itu kelihatan kaku/kotak, di atas itu mulai
kebaca sebagai pill/full-round walau angkanya bukan 999px. Radius full
(`rounded-full`) tetap HARAM kecuali diminta eksplisit oleh Kaiel.

**Yang TETEP gak berubah:** elemen dengan tinggi SAMA gak boleh punya
radius beda cuma karena "kayaknya beda fungsi wajar beda gaya" — itu yang
bikin halaman kelihatan kayak tiga sistem desain nabrak. Beda radius
cuma sah kalau bedanya emang di TINGKAT UKURAN, bukan di jenis elemen.

Jangkar     : cara orang nge-tag lagu/artist di catatan pribadinya sendiri
              (playlist, notes app) — bukan sistem kategori korporat.
Kesan       : "b aja kalau belum kenal, asik kalau udah kenal" — permukaan
              tenang/netral (tipografi, layout), warna cuma nongol di titik
              yang sengaja dipilih, bukan disebar sebagai atmosfer/wash.

## Warna
Primary     : Anka Blue #38B6FF -> Cmax 0.150, hue 239 (brand resmi klien,
              prioritas warna tertinggi per AGENTS.md)
Accent      : Anka Pink #CB6CE6 -> Cmax 0.194, hue 318 — secondary,
              dipakai lebih jarang dari primary
Netral      : hue 239, chroma 0.003–0.014 — sehue primary, bukan abu murni
Mode        : LIGHT dan DARK dua-duanya, default ngikut `prefers-color-scheme`
              sistem user. Toggle manual tersedia di navbar (kanan atas,
              icon Sun/Moon) via `next-themes`, tersimpan di localStorage.
              Base-nya hitam-putih polos (bukan navy-gradient) di kedua mode.

## Font
Satu keluarga : **Cabinet Grotesk** (Fontshare, gratis, lisensi web ada) —
                dipakai untuk headline maupun body lewat variasi ketebalan
                (700/800 untuk judul, 400/500 untuk isi). Alasan pakai satu
                keluarga bukan dua: energi bold-grotesk-konsisten di semua
                referensi yang dikasih Kaiel, dan sesuai AGENTS.md "satu
                keluarga dengan permainan ketebalan itu sah, sering lebih
                rapi".
Sumber      : Fontshare CDN (`<link>` di layout.tsx) — belum next/font/local,
              lihat catatan.md.

## Bentuk & radius
Satu bahasa radius di semua elemen interaktif: `--radius-md` (12px) —
tombol, chip/tag, blok highlight warna di teks hero, scroll button, semua
sama. `--radius-chip` sempat 999px (full-round) beda sendiri dari tombol;
dikoreksi Kaiel karena dua bahasa radius di satu halaman itu inkonsisten
— sekarang `--r-chip` = `--r-md` = 12px.
- Card: `rounded-xl` (16px) — satu-satunya elemen yang beda, karena
  cakupannya lebih besar dari elemen interaktif kecil
Ini pergeseran dari draft pertama yang radiusnya 2–6px ("tegas/institusi") —
sekarang ke arah "ramah/konsumer" sesuai kesan personal-casual yang dipilih.

## Signature
1. **Chip system** — default kalem (border outline, teks muted), nyala
   Blue/Pink pas jadi status penting (LIVE, kategori) atau di-hover. Dipakai
   di Roster/Katalog/Layanan untuk genre & status — BUKAN cuma dekorasi hero.
2. **Rotasi kecil di elemen tertentu** (chip, card) — kesan "disusun tangan",
   bukan grid mesin. Dipakai sedikit, jangan di semua elemen.

## Hero (Home) — Varian "warna nempel di kata"
Tiga varian hero sempat dibikin buat dipilih Kaiel (tag-cloud / warna-di-kata
/ sticker-collage-di-headline). **Yang dipilih: warna-di-kata.** Headline
netral, kata kunci tertentu (genre/status) dikasih blok warna inline
(`bg-primary`/`bg-accent`/`bg-foreground` + `rounded-md` + rotasi kecil).
Gak ada foto/card terpisah di hero — sesuai prioritas AGENTS.md "kalau
belum ada foto: pakai tipografi, bentuk, warna sebagai visual utama", dan
sekalian nutup masalah "roster kecil" (hero gak bergantung ke foto artist).

Genre yang ditampilkan di headline (pop, electronic) itu CONTOH, bukan
klaim genre eksklusif — Anka mau kesan lintas-genre/universal, bukan
electronic-only (DB Project cuma satu dari sekian genre yang mereka rilis).

## Dependency yang ditambah (izin eksplisit dari Kaiel)
- `clsx` + `tailwind-merge` -> helper `cn()` di `src/lib/utils.ts`
- `lucide-react` -> ikon, sesuai default AGENTS.md
- `next-themes` -> toggle light/dark, sinkron localStorage + system,
  hindari flash-of-wrong-theme
- `lenis` -> smooth scroll (dipakai `SmoothScroll` client component,
  di-skip otomatis kalau `prefers-reduced-motion: reduce`)

## Rendering
Semua halaman React Server Component, tanpa `fetch`/`cookies()`/dynamic API
— tetap statically generated (SSG) secara default oleh Next.js App Router.
Belum diverifikasi lewat `next build` (aturan keras: jangan build waktu
dev) — verifikasi output statis dilakukan pas mau deploy.

## Lebar konten & viewport
- `--content-max` (90rem, naik ke 108rem @1920px dan 132rem @2560px) +
  `--page-gutter` (clamp 1.25rem–3rem) — **disamakan persis** dengan
  `landinglantuns` (sister project) biar satu ekosistem Anka Group gak
  kerasa beda lebar. Dipakai lewat `max-w-[var(--content-max)]
  px-[var(--page-gutter)]`, bukan `max-w-6xl px-8` Tailwind default lagi.
- Hero: `min-h-dvh` (bukan `min-h-screen`) — full viewport, ngikut aturan
  keras AGENTS.md soal `dvh` vs `screen` di mobile.

## Tombol "Lihat Roster" — filled, invert tema
Diganti dari outline ke filled: `bg-foreground text-background`. Di light
mode jadi hitam/putih, di dark mode otomatis kebalik putih/hitam — gak
perlu `dark:` di komponen karena `--foreground`/`--background` sudah
token yang berbalik sendiri per tema.

## Header & Footer — sekarang komponen bersama
`SiteHeader` (`src/components/site-header.tsx`) dan `SiteFooter`
(`src/components/site-footer.tsx`) dipisah dari `page.tsx`, dipakai di
semua halaman ke depan — bukan disalin ulang per halaman.

`SiteHeader` sengaja `fixed` (bukan `sticky`), **keluar dari document flow**:
- Transparan tanpa border saat scroll masih di atas (`scrollY <= 8`) —
  biar nyatu visual sama hero, bukan kelihatan sebagai bar terpisah
- Begitu discroll, border + `bg-background/85 backdrop-blur-md` muncul
  (state `scrolled`, dilacak lewat scroll listener client-side)

**Konsekuensi penting buat halaman lain:** karena header gak makan tempat
di layout, halaman yang HERO-nya bukan `min-h-dvh flex items-center` (kayak
Home) **wajib kasih padding-top sendiri** di section pertama biar kontennya
gak ketiban header pas di scroll paling atas — Home aman karena hero-nya
udah full-viewport-center duluan.

## Hero — ngisi kekosongan
- **Background chip parallax** (`HeroChipField`) — genre chip nyebar di
  belakang headline, gerak halus ngikutin kursor. Sengaja BUKAN
  partikel/titik generik (itu haram default di AGENTS.md, penanda AI-slop
  paling gampang ketebak) — dipilih chip karena reuse elemen yang udah jadi
  signature kita. Tiap chip dikasih tint warna (primary-subtle/accent-subtle
  bergantian) biar kerasa kayak "catatan tempel" — nyambung ke jangkar
  (nge-tag lagu di catatan pribadi). Mati otomatis kalau
  `prefers-reduced-motion`.
- **Scroll indicator** (`ScrollCue`) — icon-only, 2× `ChevronDown` ditumpuk
  (bukan 1 atau 3 — dites langsung sama Kaiel), bentuknya persegi panjang
  berdiri (28×48px, `h-12 w-7`) BUKAN kotak/lingkaran — karena nunjuk ke
  bawah, tinggi > lebar itu logis. Radius disamain ke `--radius-chip`
  (12px), sempat kepasang `rounded-xl` tapi kelihatan kayak full-round lagi
  di ukuran sekecil ini. Animasi digabung dua layer: tombolnya sendiri
  `animate-float` (bob halus), icon di dalamnya `animate-pulse-down`
  (opacity turun-naik, kesan "menunjuk"). Klik-nya manggil
  `lenis.scrollTo()` — BUKAN native anchor jump. Instance Lenis di-share
  lewat context (`SmoothScroll` provider di `layout.tsx`, hook
  `useLenisRef()`) biar komponen lain juga bisa trigger smooth-scroll
  terprogram, bukan cuma scroll fisik dari wheel/touch.
- **Idle sway di HeroChipField** — chip background tetap goyang pelan
  (CSS `animate-sway`, translateY+rotate, durasi/delay acak per-chip biar
  gak seragam) walau kursor jauh. Dorongan proximity (JS, ngikutin kursor)
  dipisah ke wrapper `<div>` terpisah dari `<span class="chip">` biar dua
  animasi (CSS sway + JS transform) gak rebutan properti `transform` yang
  sama di elemen yang sama.

## Tiga warna highlight, dipakai konsisten di mana pun ada teks di-highlight
Pattern-nya lahir dari hero (`independen`/`pop`/`electronic`) dan HARUS
diulang persis di tempat lain yang nge-highlight kata dalam teks (bukan
dibikin sistem baru):
- **Primary** — `bg-primary text-primary-foreground`
- **Accent** — `bg-accent text-accent-foreground`
- **Netral** — `bg-foreground text-background` — INI YANG SERING KELIRU:
  dia bukan "abu-abu muted" atau "outline transparan", dia SOLID dan
  SENGAJA KEBALIK antar tema (light: kotak hitam teks putih; dark: kotak
  putih teks hitam) — sama kayak kata "electronic" di hero. Kalau bikin
  highlight netral di section lain (misal Record/Lantuns di manifesto),
  pakai kombinasi ini, BUKAN border+transparent (itu sempat salah pasang,
  hasilnya nyaris gak kelihatan bedanya — padahal maksudnya harus sama
  kontrasnya kayak Primary/Accent, cuma beda warna doang)

**Ini SISTEM TERPISAH dari tone chip di `HeroChipField`** (background
hero — Pop/Indie/R&B/dst), sengaja beda, bukan inkonsistensi:

| | Fungsi | Tone | Kontras |
|---|---|---|---|
| Chip background (`HeroChipField`) | dekoratif, ambient, "b aja" | `*-subtle` (tint pastel) / `bg-surface` netral | lembut, gak minta perhatian |
| Highlight inline di teks | nandain kata penting DALAM kalimat | `bg-primary`/`bg-accent` solid / `bg-foreground+text-background` invert | tegas, sengaja nonjol |

Jangan pernah pinjam tone yang satu buat yang lain — chip background yang
dibikin solid-tegas bakal kerasa berisik/gak "b aja" lagi, highlight teks
yang dibikin lembut bakal gagal kebaca sebagai highlight.

## "Behind the Label" — sempat kerasa kosong, dibenerin
Section ini sempat kerasa flat/kosong abis hero yang padat — bukan
karena kontennya kurang, tapi drop energi yang tiba-tiba dan rasio
konten:padding yang kepanjangan. Dibenerin dengan 2 hal (BUKAN nambah
balik jadi card grid):
- `py-24` → `py-16` — konten pendek gak perlu diregangin sepanjang hero
- 2 chip residual ("Sejak 2021", "Roster kecil") ditaruh di ruang kosong
  kanan, `animate-sway` doang (idle, gak ada proximity-cursor — itu
  signature khusus `HeroChipField`, jangan diulang di sini biar hero
  tetep paling "hidup"). Disembunyikan di mobile (`hidden md:inline-flex`)
  karena di layar sempit gak ada ruang kosong buat diisi

## "Behind the Label" — storytelling, bukan card-grid
Section kedua (`#manifesto`) awalnya 3 card fitur (Develop/Record/Release
masing-masing kotak sendiri) — dikoreksi Kaiel: ini konten "Behind the
Label" dari situs lama, harusnya storytelling singkat, bukan grid
layanan. Sekarang jadi satu paragraf naratif ("Bukan content factory...")
dengan Develop/Record/Release/Lantuns muncul sebagai **chip inline di
dalam kalimat**, pakai komponen `.chip` yang sama kayak `HeroChipField` —
biar bahasa visualnya nyambung ke hero, bukan pola baru. Ini juga jadi
prinsip buat section-section berikutnya: kalau kontennya cerita, bentuknya
paragraf + chip aksen, bukan otomatis jadi card grid.

## Featured Artist (DB Project)
Section ketiga di Home, dan section "Active Roster" di halaman Roster
(pola/konten sama, reused). Headline nama artist gede + chip status
(Live/Eksklusif), satu baris quote di-bold sebagai statement, bukan
italic-serif (itu di daftar haram). Background gantian ke `bg-background`
(section sebelumnya `bg-surface-2`) buat kasih ritme antar-section.

**Revisi (setelah cek situs lama):** awalnya section ini "tanpa gambar"
sepenuhnya (headline+chip doang, gak ada slot foto). Ternyata rencananya
section ini BAKAL punya foto artist asli lewat Sanity CMS pas redesign
jalan — cuma belum diisi sekarang. Jadi sekarang dua kolom: teks kiri,
`ArtistPhotoPlaceholder` (`src/components/artist-photo-placeholder.tsx`)
di kanan — rasio `aspect-[4/5]`, `rounded-xl`, border dashed + ikon
`Image` (lucide) + teks "Foto X belum diupload". INI BEDA dari gradient
placeholder yang dipakai situs lama (ungu-biru, ikut daftar haram
"Gradient indigo → ungu") — kita jujur nunjukkin ini kosong pakai token
netral, bukan nyamar jadi foto. **Kalau nanti foto asli masuk (dari
Sanity), ganti `ArtistPhotoPlaceholder` jadi `<Image>` beneran di slot
yang sama — jangan dibiarin nempel.**

## Tombol platform streaming (Spotify/Apple Music dst.) — prioritas di atas link internal
Di section Featured Artist/Active Roster, tombol platform streaming
(Spotify, Apple Music) SEKARANG jadi CTA utama — dibikin chip/tombol
(`PlatformLinks`, `src/components/platform-links.tsx`) dengan ikon custom
(`SpotifyIcon`/`AppleMusicIcon` di `social-icons.tsx`, karena Lucide gak
nyertain ikon brand). "Lihat profil lengkap" turun jadi link teks
sekunder di bawahnya, BUKAN tombol filled-primary lagi — karena dengerin
lagu itu aksi paling langsung buat visitor dari section ini, sementara
`/roster/db-project` sendiri masih 404 (belum dibangun, lihat catatan.md).

**Kenapa `PlatformLinks` nerima array, bukan 2 tombol hardcoded:** tiap
artist bisa punya kombinasi platform yang beda (belum tentu semua ada di
semua platform) — `flex-wrap` di komponennya harus tetap rapi baik cuma
1 platform doang maupun lebih dari itu. Kalau nambah artist baru dengan
platform berbeda, bikin array `Platform[]` baru, jangan modif
`dbProjectPlatforms` yang sudah ada.

## Halaman Home — selesai (versi pertama)
Urutan section final: Hero → Behind the Label → Featured Artist (DB
Project) → Katalog (list) → Roster Lain (list) → Anka Group (2 card) →
CTA penutup (2 jalur) → Footer.

- **Katalog & Roster Lain**: list/tracklist, BUKAN card grid dengan cover
  placeholder — belum ada artwork asli, dan nomor urut di katalog dipakai
  karena memang urutan beneran (bukan dekorasi kayak "01/02/03" generik).
  Konten (judul lagu, nama artist) diambil dari crawl situs lama:
  Sedang Berjuang/Bilang/Terlambat Kau Kembali
- **Layanan sebagai section terpisah SENGAJA DI-SKIP** — Develop/Record/
  Release udah kecover natural di paragraf "Behind the Label", ngulang
  jadi grid fitur lagi cuma bakal jadi redundan
- **Anka Group & CTA penutup**: di sini card (`rounded-xl`) baru masuk
  akal dipakai — bandingin 2 hal yang sejajar (2 brand, 2 jalur), bukan
  container generik. Konsisten sama radius-tier di aturan keras atas
- Ritme background gantian tiap section: `bg-background` /
  `bg-surface-2` berselang-seling, biar section-section keliatan
  terpisah tanpa perlu border tebal atau shadow gede

## Footer — disamakan sama menu di ankaentertainment.com
`SiteFooter` dirombak dari 1 baris jadi 4 kolom + bottom bar, ngikutin
struktur menu situs lama persis: Brand (logo+tagline+sosmed) / Tentang
(Tentang, Layanan, Anka Group) / Karya (Roster, Katalog, Production
Works, Cover & Reimagined) / Kontak (email, lokasi, Submit Demo) +
copyright bar (Privacy/Terms/Cookies).

Ikon sosmed (Instagram/TikTok/YouTube/LinkedIn) dan ikon platform
streaming (Spotify/Apple Music) sekarang pakai **`react-icons`**
(`react-icons/si` buat kebanyakan, `react-icons/fa6` khusus LinkedIn
karena Simple Icons udah gak nyertain LinkedIn) — diganti dari SVG
custom manual sebelumnya (**Lucide versi terbaru 1.32 udah gak nyertain
ikon brand lagi**, jadi bukan pilihan, itu keterbatasan library; SVG
custom sempat dipakai sebelum `react-icons` masuk). Diputuskan Kaiel
2026-08-20.

Semua ikon dari `react-icons` (Simple Icons & Font Awesome) render
`fill="currentColor"` — **monokrom, ikut token warna teks**, sama kayak
SVG custom sebelumnya. Bukan warna brand asli (hijau Spotify dkk), biar
konsisten sama prinsip satu bahasa visual ikon. (Sempat salah dicatat di
sini sebagai "sengaja dibiarin berwarna" — itu keliru, sudah diralat.)

## Semua halaman — selesai (versi pertama)
Roster, Katalog, Layanan, Tentang, Submit udah dibangun, reuse token &
pola yang sama kayak Home. Hal baru yang muncul di sini:

- **`PageHero`** (`src/components/page-hero.tsx`) — pola headline+intro
  yang dipakai di kelima halaman standalone. `pt-32 md:pt-40` di section
  pertama itu WAJIB karena header `fixed` gak makan ruang layout
- **`CatalogList`** (client component) — filter kategori (Semua/Catalog/
  Production/Cover) beneran interaktif, termasuk empty state ("Belum ada
  rilisan di sini") pas filter nggak match apa pun — bukan dummy visual
- **FAQ pakai `<details>/<summary>` native**, bukan client-state accordion
  — gratis dapet keyboard nav & screen reader support, gak perlu JS
- **Status "Closed" di Submit** pakai token `--warning`/`--warning-subtle`
  (baru kepake pertama kali) — dipasangkan sama TEKS "Closed", bukan cuma
  warna (AGENTS.md: warna doang gak cukup buat status)
- Kategori kepemilikan master di Katalog (Catalog/Production/Cover) masih
  ASUMSI (ketiga rilisan ditandain "Catalog" semua) — belum ada konfirmasi
  data asli. Jangan dianggap final, lihat catatan.md
- FAQ di Layanan cuma 1 pertanyaan yang beneran ada jawabannya dari copy
  situs lama — sisanya SENGAJA gak diisi ngarang (nyangkut royalti/
  kepemilikan master, itu fakta bisnis bukan copy dekoratif)

## `ArtistPhotoPlaceholder` — "foto ditempel washi tape"
Diminta Kaiel 2026-08-20: placeholder foto artist (state kosong, dipakai
di Home & Roster) terlalu polos (cuma ikon+teks dashed-border) dan kena
masalah ukuran terpisah (lihat di bawah). Didesain ulang jadi kayak foto
ditempel di papan — **langsung dari jangkar project** ("cara orang
nge-tag lagu di catatan pribadi/papan tempel"), bukan motif baru:

- Strip washi tape (`bg-primary` SOLID, `rounded-sm`, tinggi 30px) nempel
  di tepi atas, rotasi `rotate-2` — beda arah dari foto-nya sendiri
  (`-rotate-1`) biar kerasa ditempel manual, bukan disejajarin presisi.
  Ini reuse signature "rotasi kecil" yang udah ada di chip/`HeroChipField`.
  Sempat dicoba `bg-primary-subtle/90` (pudar + transparan) — dikoreksi
  Kaiel 2026-08-20: warnanya harus biru utama Anka yang jelas, bukan
  pudar, dan tape itu benda fisik nempel jadi opacity-nya solid.
  Radius juga sempat `rounded-md` (12px) — dikoreksi ke `rounded-sm`
  (8px) karena di tinggi 30px, 12px itu ~40% (kebaca kayak pill),
  melanggar ATURAN KERAS radius di atas (idealnya 20-35%)
- Monogram besar-pudar (`text-foreground/[0.05]`, ~128px) dari kata
  pertama nama artist, ditaruh pojok kanan-bawah sebagai flourish
  background — bukan konten utama, kalah kontras jauh dari label
- `shadow-md` DIPAKAI di sini sengaja — biasanya bayangan cuma buat
  elemen yang beneran melayang (dropdown/modal), tapi di sini bayangan
  representasiin "foto yang diangkat dikit dari permukaan tembok",
  bukan dekorasi kosong
- Tetap JUJUR nunjukkin foto belum ada (ikon + teks "Foto X belum
  diupload") — treatment-nya lebih hidup, tapi bukan nyamar jadi foto
  asli kayak gradient placeholder situs lama

**Gerak: AYUNAN dari titik tumpu atas (interactive), BUKAN translate rata
dan BUKAN loop CSS infinite.** Riwayat 3 iterasi di sesi yang sama
(2026-08-20):
1. `animate-card-sway` (keyframe CSS, translateX ±4px + rotate -1deg, 7s
   ease-in-out infinite) — dibuang: amplitudonya kelewat halus buat
   kerasa "idup" secara sadar, begitu diperbesar malah ganggu karena
   gerak terus-menerus tanpa henti
2. Proximity `translateX` (reuse mekanik `HeroChipField`, tape+kartu
   digeser bareng rata sebagai satu wrapper) — dikoreksi: Kaiel mau efek
   "foto nempel di tape, cuma bagian bawah yang ngayun, atasnya
   (deket tape) nyaris diem" — translate rata gerakin semua bagian sama
   jauh, gak ngasih kesan "dipin di satu titik"
3. **Final — rotasi dari pivot atas** (`origin-top` + `rotate()`, BUKAN
   `translateX`). Tape TETAP DIEM (elemen terpisah, gak ikut ref yang
   digerakin) karena dia titik tumpunya. Kartu foto yang punya
   `transform-origin: top center` persis di titik tape, lalu diputer
   sedikit (`rotate()`) berdasar proximity kursor. Efek "atas nyaris
   diem, bawah ngayun lebih jauh" + "pas ngayun ke samping otomatis naik
   dikit" itu KONSEKUENSI FISIK dari rotasi sekitar pivot (busur
   lingkaran), bukan di-hack manual dengan translateY terpisah

**Bug yang sempat kejadian pas iterasi #3, dicek & dibenerin sebelum
final:** rotasi di sekitar pivot ATAS itu kebalik arahnya dari translate
biasa — `angle` yang makin BESAR (searah jarum jam) justru narik ujung
BAWAH ke arah KIRI (`x_bawah = -tinggi * sin(angle)`), bukan kanan.
Formula awal (`angle = tilt + nx*strength*max`, nx sama kayak versi
translateX) jadinya kepasang TERBALIK — kursor di kiri malah bikin
bawah ngayun MENDEKAT ke kursor (attract), bukan menjauh (repel) kayak
yang diminta. Ketauan lewat simulasi `mousemove` + decompose matrix
rotasi CSS langsung di browser (bukan asumsi visual doang), dibenerin
jadi `angle = tilt - nx*strength*max` (tanda dibalik), diverifikasi
ulang sampai arahnya bener: kursor kiri -> bawah kartu ngayun kanan
(menjauh), sebaliknya juga.

Mekanik proximity-nya (radius 340px, distance-based decay, diem kalau
kursor jauh atau `prefers-reduced-motion: reduce`) tetap reuse filosofi
yang sama kayak `HeroChipField` — cuma output-nya `rotate()` di sekitar
pivot, bukan `translate()` rata.

**Begitu foto asli masuk** (rencana lewat Sanity): copot tape & monogram,
ganti isi jadi `<Image object-cover>`, TAPI pertahankan `origin-top
shadow-md` di kartu + listener proximity-nya — itu bagian dari treatment
"foto ditempel", bukan cuma dekorasi state kosong doang.

## Ukuran `ArtistPhotoPlaceholder` — dikunci `max-w-[420px]`
Sebelumnya `w-full` ngikutin kolom grid `0.9fr` di section Featured
Artist/Active Roster (`md:grid-cols-[1.1fr_0.9fr]`) — di layar ultra-wide
kolom ini ikut melebar seiring `--content-max` naik (108rem @1920px,
132rem @2560px), dan karena boxnya `aspect-[4/5]`, tingginya ikut meledak
sampai jauh ngelewatin viewport di FHD ke atas (dicek langsung, box-nya
lebih tinggi dari 1080px). Dikasih `max-w-[420px]` biar rasio 4:5 tetap
kejaga tanpa batas atas yang liar, `md:ml-auto` dorong ke tepi kanan
kolom biar ruang sisa jatuh di sisi kiri (dekat teks), bukan gap kosong
random di kanan.

## `InlineTag` — highlight netral inline, diekstrak jadi komponen
Span "Lantuns"/"Record" (highlight netral `bg-foreground text-background`
di tengah teks body) ke-copy-paste manual di 4 tempat (Home x3, Submit
x1) — 2 di antaranya kepasang `py-0.5` bukan `py-1`. Di teks 13px, `py-1`
= tinggi ~21-22px (radius-sm 8px ~37%, pas), sementara `py-0.5` = tinggi
~17-18px (radius-sm di situ ~45%, kebaca pill — dicek Kaiel 2026-08-20).
Diekstrak ke `src/components/inline-tag.tsx` (`<InlineTag>`), semua
instance distandarin ke `py-1`. **Pakai `InlineTag` buat setiap highlight
netral baru di teks body** — jangan tulis ulang span manual, itu yang
bikin drift kejadian pertama kali.

## Section "Katalog" Home — copy diubah, bukan lagi klaim real-time
Headline section sempat "Yang lagi didengerin." — dikoreksi Kaiel
2026-08-20: itu klaim ada data streaming real-time (trending/lagi
didengerin SEKARANG), padahal isinya cuma list statis 3 rilisan yang
di-hardcode di kode. Situs lama gak pernah klaim ini — section-nya cuma
dilabeli "Katalog"/"Rilisan dari katalog". Diganti jadi "Dari katalog
kami." — netral, gak ngaku data live. Chip "Sedang Streaming" per item
TETAP dipertahankan (beda kasus): itu status rilis ("tersedia buat
distream"), bukan klaim real-time listener count, sama kayak tag "Now
Streaming" di situs lama.

## Katalog Home — belum ada cover art & link masih `href="#"`
Dicek ke `aelama` (source situs lama): pola aslinya klik cover → halaman
detail rilisan (`/catalog/[slug]`), BARU di situ ada link Spotify/Apple
Music asli — bukan langsung ke platform dari list. Jadi `href="#"`
sekarang di list ini emang konsisten sama pola situs lama (nunggu
halaman detail dibikin, lihat catatan.md), bukan penyimpangan. Yang
beda: situs lama nampilin cover art asli per rilisan (`aspect-square`),
landingae sekarang list teks doang tanpa gambar sama sekali — cover
asetnya udah ada di situs lama tapi belum di-import (lihat catatan.md).

## Katalog — detail page + cover thumbnail (2026-08-20)
Selesai dikerjakan, bukan lagi placeholder murni:

- **`/catalog/[slug]`** — halaman detail rilisan sekarang ADA (sebelumnya
  cuma 404). Cover besar (`ReleaseCoverPlaceholder`, reuse washi-tape
  system dari `PinnedPlaceholder`, aspect square), kategori, judul,
  artist/tipe/tahun, deskripsi, link platform, credits — **semua field
  yang belum ada datanya nampilin state kosong yang jujur** ("Belum ada
  deskripsi...", "Link streaming... belum dipasang", "Belum ada data
  credit..."), BUKAN dikosongin diam-diam atau diisi placeholder ngarang.
  Data-nya dari satu sumber `src/lib/releases.ts` (`Release` type, field-nya
  udah dicocokin sama nama field skema Sanity di `aelama` — tinggal ganti
  isi `releases`/`getReleaseBySlug` jadi `client.fetch()` pas Sanity connect,
  bentuk data & UI-nya gak perlu dirombak ulang)
- **`href="#"` di list Home & Katalog diganti jadi `/catalog/${slug}`** —
  ini nutup TODO yang udah lama dicatat di catatan.md ("nunggu halaman
  detail dibikin")
- **Thumbnail cover ditambahin di tiap baris list** (`ReleaseCoverThumb`,
  `src/components/release-cover.tsx`) — kotak 48px, radius-md (~25% dari
  tinggi), TANPA treatment tape/monogram (kebesaran signature-nya buat
  ukuran sekecil itu, bakal jadi noise bukan penjelas)
- **Data rilisan yang tadinya ke-copy-paste di 2 tempat** (`page.tsx` &
  `catalog-list.tsx`, drift sama kayak kasus `InlineTag`) sekarang satu
  sumber: `src/lib/releases.ts`
- **"Rilisan lain dari [artist]"** — section tambahan di bawah Credits,
  filter `releases` by artist yang sama minus rilisan yang lagi dibuka.
  Beda perlakuan dari Credits/link platform (yang state-nya "belum ada
  data, TAPI tetap ditampilin kosong-jujur"): section ini DISEMBUNYIIN
  total kalau kosong, karena "gak ada rilisan lain" itu bukan data yang
  belum diisi — itu emang gak applicable buat artist yang cuma punya 1
  rilisan. Reuse pola list yang sama kayak Home/Katalog (`ReleaseCoverThumb`
  + judul + tag), BUKAN card grid — satu bahasa list konsisten di
  seluruh alur katalog.

## Roster — detail page + konsolidasi data artist (2026-08-20)
Sama pola kayak Katalog di atas, diminta Kaiel eksplisit "pola sama kayak
katalog":

- **`/roster/[slug]`** — halaman detail artist sekarang ADA (sebelumnya
  cuma 404, padahal tombol "Lihat profil lengkap" di Home & Roster udah
  ngarah ke situ dari awal). Foto besar (`ArtistPhotoPlaceholder`), chip
  tier (Live+Eksklusif buat exclusive, "Alumni" buat alumni), genre/tahun
  atau rentang tahun aktif, bio, quote (`bioAccent`), link platform
  streaming (`PlatformLinks`) + link sosmed (`SocialIconLinks`, ikon
  doang), dan "Rilisan dari [nama]" (filter `releases` by nama artist,
  DISEMBUNYIIN kalau kosong — bukan "belum ada data", tapi "emang gak
  applicable"). Semua field yang belum ada datanya nampilin state kosong
  yang jujur, sama prinsipnya kayak katalog
- **Data artist dikonsolidasi** ke `src/lib/artists.ts` (`Artist` type,
  field-nya dicocokin sama skema `artist` Sanity di `aelama`) —
  sebelumnya DB Project ke-copy-paste manual di 3 tempat (Home, Roster
  Active section, `dbProjectPlatforms` di platform-links.tsx), dan
  `pastRoster` (nama+tahun) duplikat di Home & Roster. Semua sekarang
  satu sumber: `artists`, `activeRoster`, `pastRoster`, `featuredArtist`,
  `getArtistBySlug()`
- **`buildPlatformLinks()`** diekstrak dari `platform-links.tsx` (dulu
  cuma nge-export array hardcoded `dbProjectPlatforms`) — sekarang jadi
  fungsi yang nerima entity apa pun ber-field
  `spotify`/`appleMusic`/`youtube` (artist ATAU release), reuse di
  `/roster/[slug]` DAN dipakai ulang buat rapihin `/catalog/[slug]` yang
  sebelumnya nulis if/push manual 3x
- **`buildSocialLinks()` + `SocialIconLinks`** (baru, `social-links.tsx`)
  — pola ikon bulat-kotak yang SEBELUMNYA ditulis manual cuma di
  `SiteFooter`, sekarang diekstrak biar `/roster/[slug]` bisa pakai
  treatment yang sama buat Instagram/TikTok artist, `SiteFooter` di-reuse
  makai komponen ini juga (bukan lagi 2 implementasi terpisah)
- **List "Yang pernah jadi bagian"/"Pernah jadi bagian" (Home & Roster)
  sekarang clickable** ke `/roster/[slug]` — sebelumnya sengaja
  dibiarin plain text (gak ada tujuan link yang valid). Sekarang
  destination-nya ada, jadi linked, dengan `hover:bg-hover` sama kayak
  pola list Katalog

## Tier "Collaboration" disiapin (2026-08-20)
`ArtistTier` sekarang `"exclusive" | "collaboration" | "alumni"` (dulu
cuma 2). Data-nya 1 entri DUMMY ("Kaia Ramadhan") — nama karangan buat
preview visual, izin eksplisit Kaiel, **wajib diganti/dihapus sebelum
serah terima** (lihat catatan.md, jangan sampai kelewat).

Treatment-nya SENGAJA paling ringan dari 3 tier (mekanik diambil dari
`CollaborationsAlumniClient` situs lama, radius-nya tetap sistem kita):
cuma pill nama (`chip rounded-sm`), gak ada tanggal (gak relevan —
project-based, bukan tenure), section baru "Kolaborasi." di halaman
Roster (di antara Active & Past Roster), DISEMBUNYIIN kalau
`collabRoster` kosong (sama logikanya kayak "Rilisan lain"/"Rilisan
dari" — bukan "belum ada data", tapi "emang gak applicable" kalau belum
ada kolaborator).

**Revisi (sama sesi) — pill DIBALIKIN jadi non-clickable, gak ada
halaman profil sama sekali.** Awalnya pill-nya `<Link>` ke
`/roster/[slug]` kayak Active/Past Roster. Kaiel koreksi: "artis
kolaborasi mah bukan bagian gua" — beda konsep dari Active/Past Roster
(yang emang bagian dari label). Klik ke halaman yang isinya nyaris
kosong (nama + "Project-based" + bio/link kosong) juga jadi false
affordance — kelihatan interaktif tapi tujuannya gak sepadan. Sekarang:
- Pill di Home & Roster = `<span>` biasa, visual `chip` tetap sama, cuma
  hilang hover state & gak bisa diklik
- `generateStaticParams` di `/roster/[slug]/page.tsx` nge-skip tier
  "collaboration" — gak di-build sama sekali, dan halamannya sendiri
  `notFound()` eksplisit kalau ada yang akses slug kolaborasi langsung
  lewat URL (bukan cuma "gak dilink", beneran gak ada)
- **Rilisan yang melibatkan kolaborator TETAP normal** — link katalog
  (`/catalog/[slug]`) gak kena dampak, karena `release.artist` cuma teks
  nama, gak nunjuk ke profil artist manapun. Cuma profil ARTIST-nya yang
  gak ada, bukan karyanya

**Update — udah ditambahin ke Home juga** (diminta Kaiel langsung setelah
ini). Section "Yang pernah jadi bagian." di Home DIROMBAK jadi "Roster
lain." — sekarang gabungan 2 kolom adaptif: Kolaborasi (pill) kiri, Past
Roster (list) kanan, `lg:grid-cols-2` kalau dua-duanya ada isinya, balik
ke 1 kolom kalau salah satu kosong. Mekanik gabungan-adaptif ini diambil
dari situs lama (section yang sama, `CollaborationsAlumniClient`), radius
& styling tetap sistem kita. Sub-heading tiap kolom pakai pola yang sama
kayak footer (`text-[13px] font-bold uppercase tracking-wide text-muted`).

## Logo di "Dua brand, satu ekosistem" (Home)
Sebelumnya cuma chip+teks, gak ada logo. Ditambahin (2026-08-20):
- Anka Entertainment: `/apple-touch-icon.png` — file yang SAMA persis
  kayak yang udah dipakai di `SiteHeader`/`SiteFooter`, bukan pilih file
  baru, biar logo AE konsisten satu file di seluruh situs
- Lantuns: `/lantunsicon.png` — diupload Kaiel langsung ke `public/`
- Ukuran 40×40, `rounded-md` (12px, ~30% dari tinggi — pas di rentang
  aturan keras radius), ditaruh sejajar sama chip label pakai
  `flex items-center gap-3`
- **Revisi** (Kaiel: "kasih bg juga transparan aja tipis, itu rapet
  banget") — percobaan pertama cuma nempelin `border` langsung di
  elemen `<Image>` 40×40, hasilnya logo mepet pas ke tepi border, gak
  ada napas. Diganti jadi: `<Image>` 36×36 dibungkus container
  `h-14 w-14` (56px) `rounded-lg border border-border bg-foreground/[0.03]
  p-2.5` — padding 2.5 (10px) di semua sisi ngasih jarak antara tepi
  logo dan border, `bg-foreground/[0.03]` itu tint transparan tipis
  (bukan warna solid baru) biar kerasa ada "wadah" tanpa nambah token
  warna. Radius container 12/56 = ~21%, radius gambar di dalamnya
  `rounded-sm` (8px) di 36px = ~22% — dua-duanya di rentang aturan keras.
  Kedua PNG punya background putih solid sendiri (bukan transparan,
  kelihatan pas dicek render dark mode) — makanya tetap ada "kotak
  putih" di dalam container, itu dari file asetnya sendiri, bukan
  ditambahin lagi di CSS

## Aset sementara
- Font masih via CDN Fontshare, belum self-hosted (`next/font/local`)
- Cover artist DB Project masih placeholder gradient, belum foto asli
- Baru halaman Home yang dibangun ulang dengan arah ini
