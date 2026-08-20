import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReleaseCoverPlaceholder, ReleaseCoverThumb } from "@/components/release-cover";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getReleaseBySlug, releases, type ReleaseCategory } from "@/lib/releases";
import { PlatformLinks, type Platform } from "@/components/platform-links";
import {
  AppleMusicIcon,
  SpotifyIcon,
  YoutubeIcon,
} from "@/components/social-icons";

const CATEGORY_LABEL: Record<ReleaseCategory, string> = {
  catalog: "Catalog",
  production: "Production Works",
  cover: "Cover & Reinterpretasi",
};

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
    title: `${release.title} — Anka Entertainment`,
    description: `${release.title} oleh ${release.artist}. ${CATEGORY_LABEL[release.category]}, ${release.year}.`,
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

  const relatedReleases = releases.filter(
    (r) => r.artist === release.artist && r.slug !== release.slug,
  );

  const platforms: Platform[] = [];
  if (release.spotify) {
    platforms.push({ label: "Spotify", href: release.spotify, Icon: SpotifyIcon });
  }
  if (release.appleMusic) {
    platforms.push({
      label: "Apple Music",
      href: release.appleMusic,
      Icon: AppleMusicIcon,
    });
  }
  if (release.youtube) {
    platforms.push({ label: "YouTube", href: release.youtube, Icon: YoutubeIcon });
  }

  return (
    <>
      <SiteHeader />

      <main>
        {/* pt-32/md:pt-40 wajib — header fixed gak makan ruang layout,
            sama kayak pola PageHero di halaman standalone lain. */}
        <section className="border-b border-border bg-surface-2 pb-16 pt-32 md:pt-40">
          <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
            <Link
              href="/catalog"
              className="text-[13px] font-bold text-muted underline decoration-border underline-offset-4 transition-colors duration-fast ease-keluar hover:text-foreground hover:decoration-foreground"
            >
              ← Kembali ke Katalog
            </Link>

            <div className="mt-8 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
              <div className="max-w-[62ch]">
                <span className="chip rounded-sm px-2 py-1 text-[12px]">
                  {CATEGORY_LABEL[release.category]}
                </span>

                <h1 className="mt-5 text-[clamp(28px,4.5vw,56px)] font-bold leading-[1.05] tracking-tight">
                  {release.title}
                </h1>
                <p className="mt-2 text-[14px] font-semibold text-muted">
                  {release.artist} · {release.releaseType} · {release.year}
                </p>

                <p className="mt-6 text-[16px] leading-[1.8] text-muted">
                  {release.description ?? (
                    <span className="italic">
                      Belum ada deskripsi buat rilisan ini.
                    </span>
                  )}
                </p>

                <div className="mt-8">
                  {platforms.length > 0 ? (
                    <PlatformLinks platforms={platforms} />
                  ) : (
                    <div className="inline-block rounded-md border border-dashed border-border px-4 py-3 text-[13px] text-muted">
                      Link streaming buat rilisan ini belum dipasang.
                    </div>
                  )}
                </div>
              </div>

              <ReleaseCoverPlaceholder title={release.title} className="md:ml-auto" />
            </div>
          </div>
        </section>

        {/* Credits — kosong sekarang (belum ada data), tapi slotnya
            disiapin biar begitu Sanity connect tinggal isi array-nya. */}
        <section className="border-b border-border bg-background py-16">
          <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
            <h2 className="text-[13px] font-bold uppercase tracking-wide text-muted">
              Credits
            </h2>
            {release.credits && release.credits.length > 0 ? (
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {release.credits.map((c) => (
                  <li
                    key={`${c.role}-${c.name}`}
                    className="rounded-md border border-border bg-surface px-4 py-3"
                  >
                    <p className="text-[14px] font-bold">{c.name}</p>
                    <p className="text-[13px] text-muted">{c.role}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-[14px] text-muted">
                Belum ada data credit buat rilisan ini.
              </p>
            )}
          </div>
        </section>

        {/* Rilisan lain dari artist yang sama — DISEMBUNYIIN kalau kosong
            (bukan "belum ada data" kayak Credits, tapi "emang gak
            applicable" kalau artist-nya cuma punya 1 rilisan). Reuse
            pola list yang sama kayak Home/Katalog (thumbnail + nomor +
            tag), BUKAN card grid — satu bahasa list di seluruh katalog. */}
        {relatedReleases.length > 0 ? (
          <section className="bg-surface-2 py-16">
            <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
              <h2 className="text-[13px] font-bold uppercase tracking-wide text-muted">
                Rilisan lain dari {release.artist}
              </h2>

              <ul className="mt-5 divide-y divide-border border-t border-border">
                {relatedReleases.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/catalog/${r.slug}`}
                      className="group flex items-center justify-between gap-6 py-5 transition-colors duration-fast ease-keluar hover:bg-hover"
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
