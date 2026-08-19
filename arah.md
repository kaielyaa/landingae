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
Section ketiga di Home. Belum ada foto artist asli, jadi tetap jalur
"tanpa gambar" (prioritas #1 AGENTS.md) — headline nama artist gede jadi
elemen dominan, chip status (Live/Exclusive) di atas, satu baris quote
di-bold sebagai statement, bukan italic-serif (itu di daftar haram).
Sengaja TIDAK pakai gradient-card placeholder kayak draft hero pertama —
biar gak jadi pola berulang cuma karena belum ada aset. Kalau nanti ada
foto asli, itu yang jadi visual utama section ini, bukan tipografi lagi.
Background gantian ke `bg-background` (section sebelumnya `bg-surface-2`)
buat kasih ritme antar-section.

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

Ikon sosmed (Instagram/TikTok/YouTube/LinkedIn) ditulis sendiri sebagai
SVG minimal di `src/components/social-icons.tsx` — **Lucide versi
terbaru (1.32) udah gak nyertain ikon brand lagi**, jadi bukan pilihan,
itu keterbatasan library. Gaya stroke-nya disamain manual (24x24,
stroke-width 2) biar konsisten visual sama ikon Lucide yang lain,
bukan nambah dependency icon-library baru buat 4 ikon doang.

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

## Aset sementara
- Font masih via CDN Fontshare, belum self-hosted (`next/font/local`)
- Cover artist DB Project masih placeholder gradient, belum foto asli
- Baru halaman Home yang dibangun ulang dengan arah ini
