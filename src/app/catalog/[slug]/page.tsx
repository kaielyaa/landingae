import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { CreditList, type Credit } from "@/components/credit-list";
import { buildPlatformLinks, PlatformLinks } from "@/components/platform-links";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { releaseTitleVT, releaseTracks, Tracklist } from "@/components/tracklist";
import { Chip } from "@/components/ui/chip";
import { Section, SectionHeading, TextLink } from "@/components/ui/section";
import { artists } from "@/lib/artists";
import { CATEGORY_LABEL, getReleaseBySlug, releases } from "@/lib/releases";

export function generateStaticParams() {
  return releases.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const release = getReleaseBySlug(slug);
  if (!release) return {};
  return {
    title: `${release.title} — ${release.artist} | Anka Entertainment`,
    description:
      release.description ??
      `${release.title} oleh ${release.artist}. ${release.releaseType}, ${release.year}.`,
  };
}

export default async function ReleaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const release = getReleaseBySlug(slug);
  if (!release) notFound();

  const related = releases.filter(
    (r) => r.artist === release.artist && r.slug !== release.slug,
  );
  // Artist punya profil hanya kalau ada di roster (bukan kolaborasi).
  const artist = artists.find(
    (a) => a.name === release.artist && a.tier !== "collaboration",
  );
  const platforms = buildPlatformLinks(release);

  const facts: Credit[] = [
    {
      name: "Artist",
      value: release.artist,
      href: artist ? `/roster/${artist.slug}` : undefined,
    },
    { name: "Format", value: release.releaseType },
    { name: "Tahun", value: release.year },
    { name: "Kategori", value: CATEGORY_LABEL[release.category] },
  ];

  const story = (
    <>
      <p className="max-w-[56ch] text-[17px] leading-[1.8] text-muted">
        {release.description ?? "Belum ada deskripsi untuk rilisan ini."}
      </p>
      <div className="mt-8">
        {platforms.length > 0 ? (
          <PlatformLinks platforms={platforms} />
        ) : (
          <p className="text-[14px] text-muted">
            Link streaming untuk rilisan ini belum dipasang.
          </p>
        )}
      </div>
    </>
  );

  return (
    <>
      <SiteHeader />

      <main>
        {/* Judul rilisan = h1 = elemen terbesar. Masuknya lewat morph dari
            daftar (view transition), jadi tanpa animasi naik sendiri. */}
        <section className="bg-background pb-20 pt-32 md:pb-28 md:pt-40">
          <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
            <TextLink href="/catalog" className="text-[13px] text-muted hover:text-foreground">
              ← Kembali ke Katalog
            </TextLink>

            <div className="mt-10 flex flex-wrap items-center gap-2">
              <Chip>{CATEGORY_LABEL[release.category]}</Chip>
            </div>

            <ViewTransition name={releaseTitleVT(release.slug)} share="morph" default="none">
              <h1 className="mt-6 w-fit max-w-full text-[clamp(48px,8.5vw,120px)] font-bold leading-[0.95] tracking-[-0.04em]">
                {release.title}
              </h1>
            </ViewTransition>

            {/* Pola sama dengan ArtistFeature: ada cover = cover besar kiri,
                teks bertumpuk kanan; tanpa cover = deskripsi kiri, fakta
                kanan. */}
            {release.cover ? (
              <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,420px)_1fr] md:gap-14 lg:gap-20">
                <Image
                  src={release.cover}
                  alt={`Cover ${release.title} — ${release.artist}`}
                  width={480}
                  height={480}
                  className="aspect-square w-full max-w-[420px] rounded-xl object-cover"
                />
                <div>
                  {story}
                  <CreditList className="mt-10" variant="facts" credits={facts} />
                </div>
              </div>
            ) : (
              <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
                <div>{story}</div>
                <CreditList variant="facts" credits={facts} />
              </div>
            )}
          </div>
        </section>

        {/* Kredit — field milik rilisan, jadi ditampilkan walau kosong
            (dengan penjelasan jujur), bukan disembunyikan. */}
        <Section tone="sunken" space="tight">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <SectionHeading title="Kredit." />
            {release.credits && release.credits.length > 0 ? (
              <CreditList
                variant="facts"
                credits={release.credits.map((c) => ({
                  name: c.role,
                  value: c.name,
                }))}
              />
            ) : (
              <p className="max-w-[52ch] text-[15px] leading-[1.7] text-muted">
                Belum ada data kredit untuk rilisan ini.
              </p>
            )}
          </div>
        </Section>

        {/* Rilisan lain dari artist yang sama — disembunyikan kalau kosong:
            bukan data yang belum diisi, tapi memang tidak berlaku. */}
        {related.length > 0 ? (
          <Section tone="base" space="normal">
            <SectionHeading title={`Rilisan lain dari ${release.artist}.`} />
            <Tracklist
              className="mt-10"
              tracks={releaseTracks(related, { withArtist: false })}
            />
          </Section>
        ) : null}
      </main>

      <SiteFooter />
    </>
  );
}
