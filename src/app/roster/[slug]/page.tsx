import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtistPhotoPlaceholder } from "@/components/artist-photo-placeholder";
import { buildPlatformLinks, PlatformLinks } from "@/components/platform-links";
import { ReleaseCoverThumb } from "@/components/release-cover";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildSocialLinks, SocialIconLinks } from "@/components/social-links";
import { artists, getArtistBySlug } from "@/lib/artists";
import { releases } from "@/lib/releases";

/** Cuma exclusive & alumni yang punya halaman profil — tier "collaboration"
 * itu SENGAJA gak dapet halaman (project-based, bukan bagian dari roster,
 * cuma disebut namanya doang di pill). Kalau di-generate & di-link, jadi
 * halaman "yatim" yang ekspektasinya salah (isinya nyaris kosong). Lihat
 * arah.md. */
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
  const platforms = buildPlatformLinks(artist);
  const socials = buildSocialLinks(artist);

  return (
    <>
      <SiteHeader />

      <main>
        {/* pt-32/md:pt-40 wajib — header fixed gak makan ruang layout,
            sama kayak pola PageHero di halaman standalone lain. */}
        <section className="border-b border-border bg-surface-2 pb-16 pt-32 md:pt-40">
          <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
            <Link
              href="/roster"
              className="text-[13px] font-bold text-muted underline decoration-border underline-offset-4 transition-colors duration-fast ease-out hover:text-foreground hover:decoration-foreground"
            >
              ← Kembali ke Roster
            </Link>

            <div className="mt-8 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
              <div className="max-w-[62ch]">
                <div className="flex flex-wrap items-center gap-2">
                  {artist.tier === "exclusive" ? (
                    <>
                      <span className="chip chip-accent rounded-sm px-2 py-1 text-[12px]">
                        Live
                      </span>
                      <span className="chip rounded-sm px-2 py-1 text-[12px]">
                        Eksklusif
                      </span>
                    </>
                  ) : (
                    <span className="chip rounded-sm px-2 py-1 text-[12px]">
                      Alumni
                    </span>
                  )}
                </div>

                <h1 className="mt-5 text-[clamp(32px,5vw,64px)] font-bold leading-[1.05] tracking-tight">
                  {artist.name}
                </h1>
                <p className="mt-2 text-[14px] font-semibold text-muted">
                  {artist.tier === "exclusive"
                    ? `${artist.genre?.join(", ") ?? ""}${
                        artist.yearStart ? ` · Sejak ${artist.yearStart}` : ""
                      }`
                    : `${artist.yearStart ?? "—"} — ${artist.yearEnd ?? "—"}`}
                </p>

                <p className="mt-6 text-[16px] leading-[1.8] text-muted">
                  {artist.shortBio ?? (
                    <span className="italic">Belum ada bio buat artist ini.</span>
                  )}
                </p>

                {artist.bioAccent ? (
                  <p className="mt-6 text-[20px] font-bold leading-[1.35]">
                    &ldquo;{artist.bioAccent}&rdquo;
                  </p>
                ) : null}

                <div className="mt-8 space-y-4">
                  {platforms.length > 0 ? (
                    <PlatformLinks platforms={platforms} />
                  ) : (
                    <div className="inline-block rounded-md border border-dashed border-border px-4 py-3 text-[13px] text-muted">
                      Link streaming buat artist ini belum dipasang.
                    </div>
                  )}
                  <SocialIconLinks links={socials} />
                </div>
              </div>

              <ArtistPhotoPlaceholder name={artist.name} />
            </div>
          </div>
        </section>

        {/* Rilisan dari artist ini — DISEMBUNYIIN kalau kosong (sama
            logikanya kayak "Rilisan lain" di /catalog/[slug]: bukan
            "belum ada data", tapi "emang gak applicable" kalau artist-nya
            belum punya rilisan di katalog). */}
        {artistReleases.length > 0 ? (
          <section className="bg-background py-16">
            <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
              <h2 className="text-[13px] font-bold uppercase tracking-wide text-muted">
                Rilisan dari {artist.name}
              </h2>

              <ul className="mt-5 divide-y divide-border border-t border-border">
                {artistReleases.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/catalog/${r.slug}`}
                      className="group flex items-center justify-between gap-6 py-5 transition-colors duration-fast ease-out hover:bg-hover"
                    >
                      <div className="flex min-w-0 items-center gap-5">
                        <ReleaseCoverThumb />
                        <div className="min-w-0">
                          <p className="truncate text-[16px] font-bold">
                            {r.title}
                          </p>
                          <p className="truncate text-[13px] text-muted">
                            {r.releaseType} · {r.year}
                          </p>
                        </div>
                      </div>
                      <span className="chip chip-accent hidden flex-none rounded-sm px-2 py-1 text-[11px] sm:inline-flex">
                        {r.tag}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}
      </main>

      <SiteFooter />
    </>
  );
}
