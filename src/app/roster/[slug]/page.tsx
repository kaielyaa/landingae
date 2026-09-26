import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtistFeature } from "@/components/artist-feature";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Tracklist } from "@/components/tracklist";
import { Section, SectionHeading, TextLink } from "@/components/ui/section";
import { artists, getArtistBySlug } from "@/lib/artists";
import { releases } from "@/lib/releases";

/** Cuma exclusive & alumni yang punya halaman profil — tier "collaboration"
 * SENGAJA tidak (project-based, bukan bagian roster; keputusan Kaiel
 * 2026-08-20). Tidak di-generate, dan `notFound()` kalau diakses lewat URL. */
export function generateStaticParams() {
  return artists
    .filter((a) => a.tier !== "collaboration")
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) return {};
  return {
    title: `${artist.name} — Anka Entertainment`,
    description:
      artist.shortBio ?? `Profil ${artist.name} di Anka Entertainment.`,
  };
}

export default async function ArtistDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist || artist.tier === "collaboration") notFound();

  const artistReleases = releases.filter((r) => r.artist === artist.name);

  return (
    <>
      <SiteHeader />

      <main>
        {/* pt-32/md:pt-40: header fixed tidak makan ruang layout. Nama
            artist = h1 = elemen terbesar halaman, naik saat dibuka. */}
        <section className="bg-background pb-20 pt-32 md:pb-28 md:pt-40">
          <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
            <TextLink href="/roster" className="text-[13px] text-muted hover:text-foreground">
              ← Kembali ke Roster
            </TextLink>
            <div className="mt-10">
              <ArtistFeature
                artist={artist}
                nameAs="h1"
                nameClassName="rise-on-load"
                showSocials
              />
            </div>
          </div>
        </section>

        {/* Rilisan dari artist ini — disembunyikan kalau kosong: bukan
            "belum ada data", tapi memang tidak berlaku. */}
        {artistReleases.length > 0 ? (
          <Section tone="sunken" space="normal">
            <SectionHeading title={`Rilisan dari ${artist.name}.`} />
            <Tracklist
              className="mt-10"
              tracks={artistReleases.map((r) => ({
                href: `/catalog/${r.slug}`,
                title: r.title,
                meta: `${r.releaseType} · ${r.year}`,
                tag: r.tag,
              }))}
            />
          </Section>
        ) : null}
      </main>

      <SiteFooter />
    </>
  );
}
