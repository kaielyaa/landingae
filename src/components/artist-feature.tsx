import Image from "next/image";
import { ViewTransition, type ReactNode } from "react";
import { CreditList, type Credit } from "@/components/credit-list";
import { buildPlatformLinks, PlatformLinks } from "@/components/platform-links";
import { buildSocialLinks, SocialIconLinks } from "@/components/social-links";
import { Chip } from "@/components/ui/chip";
import type { Artist } from "@/lib/artists";

/** Nama view transition nama artist — pasangan daftar (Home, Roster,
 * kredit alumni) dengan h1 detail (arah.md: Gerak #6). */
export function artistNameVT(slug: string) {
  return `artist-name-${slug}`;
}

/** Fakta liner notes per tier — hanya yang datanya ada. */
export function artistFacts(artist: Artist): Credit[] {
  const facts: Credit[] =
    artist.tier === "alumni"
      ? [
          { name: "Genre", value: artist.genre?.join(", ") },
          {
            name: "Bersama Anka",
            value:
              artist.yearStart && artist.yearEnd
                ? `${artist.yearStart} — ${artist.yearEnd}`
                : undefined,
          },
          { name: "Status", value: "Alumni" },
        ]
      : [
          { name: "Genre", value: artist.genre?.join(", ") },
          { name: "Aktif sejak", value: artist.yearStart?.toString() },
          { name: "Status", value: "Roster eksklusif" },
        ];
  return facts.filter((f) => f.value);
}

export function ArtistTierChips({ artist }: { artist: Artist }) {
  return artist.tier === "exclusive" ? (
    <>
      <Chip tone="accent">Live</Chip>
      <Chip>Eksklusif</Chip>
    </>
  ) : (
    <Chip>Alumni</Chip>
  );
}

/** Blok profil artist: chip status, nama sebagai elemen terbesar, kutipan +
 * bio di kiri, fakta + tautan di kanan. Foto hanya kalau ada — kalau
 * belum, layout tipografi penuh (arah.md: Gambar & aset). Dipakai di Home,
 * Roster, dan halaman detail artist.
 *
 * `nameAs`: h1 di halaman detail, h2 di tempat lain. `nameClassName`:
 * untuk animasi masuk di halaman detail. `footer`: tautan tambahan. */
export function ArtistFeature({
  artist,
  nameAs: Name = "h2",
  nameClassName,
  label,
  footer,
  showSocials = false,
}: {
  artist: Artist;
  nameAs?: "h1" | "h2";
  nameClassName?: string;
  label?: string;
  footer?: ReactNode;
  showSocials?: boolean;
}) {
  const platforms = buildPlatformLinks(artist);
  const socials = buildSocialLinks(artist);

  const story = (
    <>
      {artist.bioAccent ? (
        <p className="mb-6 max-w-[24ch] text-[clamp(22px,2.4vw,30px)] font-bold leading-[1.3]">
          &ldquo;{artist.bioAccent}&rdquo;
        </p>
      ) : null}
      <p className="max-w-[56ch] text-[17px] leading-[1.8] text-muted">
        {artist.shortBio ?? "Belum ada bio untuk artist ini."}
      </p>
    </>
  );

  const details = (
    <>
      <CreditList variant="facts" credits={artistFacts(artist)} />
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
        {platforms.length > 0 ? (
          <PlatformLinks platforms={platforms} />
        ) : (
          <p className="text-[14px] text-muted">
            Link streaming untuk {artist.name} belum dipasang.
          </p>
        )}
        {footer}
      </div>
      {showSocials && socials.length > 0 ? (
        <SocialIconLinks links={socials} className="mt-6" />
      ) : null}
    </>
  );

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <ArtistTierChips artist={artist} />
        {label ? (
          <span className="ml-1 text-[13px] font-medium text-muted">{label}</span>
        ) : null}
      </div>

      {/* w-fit: kotak mengikuti teks, supaya morph dari daftar berskala
          sebanding dengan ukuran hurufnya. */}
      <ViewTransition name={artistNameVT(artist.slug)} share="morph" default="none">
        <Name
          className={`mt-6 w-fit max-w-full text-[clamp(56px,10vw,144px)] font-bold leading-[0.95] tracking-[-0.04em] ${nameClassName ?? ""}`}
        >
          {artist.name}
        </Name>
      </ViewTransition>

      {/* Dua susunan (dicek dengan foto dummy 2026-09-27):
          - ada foto: foto besar di kiri, semua teks bertumpuk di kanan —
            kalau foto ditaruh di atas fakta, kolom kanan jauh lebih tinggi
            dan kolom kiri menyisakan ruang kosong besar
          - tanpa foto: kutipan + bio kiri, fakta + tautan kanan */}
      {artist.photo ? (
        <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,420px)_1fr] md:gap-14 lg:gap-20">
          <Image
            src={artist.photo}
            alt={`Foto ${artist.name}`}
            width={480}
            height={600}
            className="aspect-[4/5] w-full max-w-[420px] rounded-xl object-cover"
          />
          <div className="flex flex-col">
            {story}
            <div className="mt-10">{details}</div>
          </div>
        </div>
      ) : (
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>{story}</div>
          <div>{details}</div>
        </div>
      )}
    </>
  );
}
