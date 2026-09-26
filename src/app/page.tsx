import Image from "next/image";
import type { ReactNode } from "react";
import { ArtistFeature, artistNameVT } from "@/components/artist-feature";
import { CreditList } from "@/components/credit-list";
import { Hero } from "@/components/home/hero";
import { InlineTag } from "@/components/inline-tag";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StampSticker } from "@/components/stamp-sticker";
import { releaseTracks, Tracklist } from "@/components/tracklist";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Section, SectionHeading, TextLink } from "@/components/ui/section";
import { collabRoster, featuredArtist, pastRoster } from "@/lib/artists";
import { releases } from "@/lib/releases";

export default function Home() {
  // Invariant: harus selalu ada 1 artist exclusive dengan featured:true di
  // src/lib/artists.ts. Kalau ini throw, itu bug data, bukan kasus yang
  // wajar ditangani UI (bukan "belum ada data dari user").
  if (!featuredArtist) {
    throw new Error("Home: tidak ada artist dengan featured:true di src/lib/artists.ts");
  }

  // Ritme section (arah.md): rapat–lega bergantian, latar base/sunken
  // bergantian. Urutan sengaja bukan hero→fitur→testimoni→CTA.
  return (
    <>
      <SiteHeader />

      <main>
        <Hero />

        {/* MANIFESTO — cerita, bukan grid layanan. Develop/Record/Release
            jadi stiker di dalam kalimat. */}
        <Section id="manifesto" tone="sunken" space="tight">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <h2 className="text-[clamp(30px,4.2vw,56px)] font-bold leading-[1.1] tracking-tight">
              Bukan content factory.
            </h2>
            {/* Empat stiker ditempel berurutan saat paragraf terlihat. */}
            <Reveal className="max-w-[60ch]">
              <p className="text-[17px] leading-[1.8] text-muted">
                Kami label yang serius — roster kecil, kontrak panjang, fokus
                ke artist yang siap tumbuh bareng. Tiap rilisan mulai dari{" "}
                <StampSticker trigger="group" tone="primary" size="inline">
                  Develop
                </StampSticker>
                , lanjut ke{" "}
                <StampSticker trigger="group" tone="invert" size="inline" delay={180}>
                  Record
                </StampSticker>{" "}
                yang kualitasnya dijaga ketat, ditutup dengan{" "}
                <StampSticker trigger="group" tone="accent" size="inline" delay={360}>
                  Release
                </StampSticker>{" "}
                yang dipikirin matang — bukan sekadar upload. Distribusi Musik
                ditangani sister company kami,{" "}
                <StampSticker trigger="group" tone="invert" size="inline" delay={540}>
                  Lantuns
                </StampSticker>
                .
              </p>
              <p className="mt-6 text-[13px] font-medium text-muted">
                Sejak 2021 · Indonesia
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ARTIST UTAMA — nama artist jadi elemen terbesar section ini.
            Foto hanya kalau ada; kalau belum, layout tipografi penuh. */}
        <Section tone="base" space="loose">
          <ArtistFeature
            artist={featuredArtist}
            label="Artist utama"
            footer={
              <TextLink href={`/roster/${featuredArtist.slug}`}>
                Lihat profil lengkap
              </TextLink>
            }
          />
        </Section>

        {/* KATALOG — tracklist bernomor. */}
        <Section tone="sunken" space="normal">
          <SectionHeading
            title={
              <>
                Dari <StampSticker tone="primary">katalog</StampSticker> kami.
              </>
            }
            lead={
              <>
                Distribusi Musik via <InlineTag>Lantuns</InlineTag>.
              </>
            }
            action={<TextLink href="/catalog">Lihat semua katalog</TextLink>}
          />
          <Tracklist className="mt-10" tracks={releaseTracks(releases)} />
        </Section>

        {/* ROSTER LAIN — blok kredit: alumni (bisa diklik) + kolaborasi
            (tidak punya halaman, keputusan Kaiel 2026-08-20). */}
        {collabRoster.length > 0 || pastRoster.length > 0 ? (
          <Section tone="base" space="tight">
            <SectionHeading
              title="Roster lain."
              action={<TextLink href="/roster">Lihat semua roster</TextLink>}
            />
            <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-20">
              <CreditList
                title="Pernah jadi bagian"
                credits={pastRoster.map((a) => ({
                  name: a.name,
                  value: `${a.yearStart} — ${a.yearEnd}`,
                  href: `/roster/${a.slug}`,
                  vtName: artistNameVT(a.slug),
                }))}
              />
              <CreditList
                title="Kolaborasi"
                credits={collabRoster.map((a) => ({
                  name: a.name,
                  value: "Project-based",
                }))}
              />
            </div>
          </Section>
        ) : null}

        {/* EKOSISTEM — dua brand sejajar, satu-satunya tempat kartu masuk
            akal di Home (membandingkan dua hal setara). */}
        <Section tone="sunken" space="normal">
          <SectionHeading
            title="Dua brand, satu ekosistem."
            lead="Anka Group — PT Anka Sembilan Delapan. Tiap brand berdiri sendiri dengan timnya, tapi saling mendukung."
            action={<TextLink href="/anka-group">Tentang Anka Group</TextLink>}
          />
          {/* Label peran tiap brand ditempel sebagai stiker saat terlihat. */}
          <Reveal className="mt-10 grid gap-5 md:grid-cols-2">
            <BrandCard
              logo="/apple-touch-icon.png"
              name="Anka Entertainment"
              role="Label · Indonesia"
              tone="primary"
              description="Label musik independen. Develop, record, release."
              footer={<Chip>Kamu sedang di sini</Chip>}
            />
            <BrandCard
              logo="/lantunsicon.png"
              name="Lantuns"
              role="Distribusi · Global"
              tone="accent"
              description="Distribusi musik ke 150+ platform streaming. Katalog tetap milikmu."
              footer={
                <TextLink href="https://lantuns.com" target="_blank" rel="noreferrer">
                  Kunjungi Lantuns
                </TextLink>
              }
              delay={180}
            />
          </Reveal>
        </Section>

        {/* DUA JALUR — rata kiri, dua baris bernomor, bukan kartu tengah. */}
        <Section tone="base" space="loose">
          <SectionHeading
            title={
              <>
                Siap{" "}
                <StampSticker tone="accent" tilt="right">
                  didengar
                </StampSticker>
                ?
              </>
            }
            lead="Dua jalur. Pilih yang sesuai posisi kamu sekarang."
          />
          <ol className="mt-12 divide-y divide-border border-y border-border">
            <PathRow
              n={1}
              title="Gabung sebagai artist"
              description="Mau jadi bagian dari roster Anka Entertainment? Kirim demo, kita ngobrol soal arah dan kerja sama jangka panjang."
              action={
                <ButtonLink href="/submit" size="lg">
                  Kirim Demo
                </ButtonLink>
              }
            />
            <PathRow
              n={2}
              title="Distribusi musik"
              description="Mau rilis ke 150+ platform streaming? Distribusi ditangani sister company kami, Lantuns."
              action={
                <ButtonLink
                  href="https://lantuns.com"
                  target="_blank"
                  rel="noreferrer"
                  variant="invert"
                  size="lg"
                >
                  Kunjungi Lantuns
                </ButtonLink>
              }
            />
          </ol>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}

function BrandCard({
  logo,
  name,
  role,
  tone,
  description,
  footer,
  delay = 0,
}: {
  logo: string;
  name: string;
  role: string;
  tone: "primary" | "accent";
  description: string;
  footer: ReactNode;
  delay?: number;
}) {
  return (
    <Card className="flex flex-col">
      <div className="flex items-center gap-4">
        {/* Logo PNG berlatar putih — wadah bertint tipis supaya tidak
            menempel ke border (arah.md: Gambar & aset). */}
        <span className="flex h-14 w-14 flex-none items-center justify-center rounded-md border border-border bg-foreground/[0.03] p-2.5">
          <Image src={logo} alt="" width={36} height={36} className="rounded-sm" />
        </span>
        <div>
          <h3 className="text-[22px] font-bold leading-tight">{name}</h3>
          <span className="mt-1.5 block">
            <StampSticker trigger="group" tone={tone} size="inline" delay={delay}>
              {role}
            </StampSticker>
          </span>
        </div>
      </div>
      <p className="mt-5 flex-1 text-[15px] leading-[1.7] text-muted">
        {description}
      </p>
      <div className="mt-6">{footer}</div>
    </Card>
  );
}

function PathRow({
  n,
  title,
  description,
  action,
}: {
  n: number;
  title: string;
  description: string;
  action: ReactNode;
}) {
  return (
    <li className="grid gap-4 py-8 md:grid-cols-[3rem_1fr_auto] md:items-start md:gap-8">
      {/* pt-2: sejajarkan nomor dengan baris pertama judul, bukan tengah blok. */}
      <span className="text-[13px] font-medium text-muted tabular-nums md:pt-2">
        {String(n).padStart(2, "0")}
      </span>
      <div className="max-w-[56ch]">
        <h3 className="text-[clamp(22px,2.4vw,28px)] font-bold leading-tight">
          {title}
        </h3>
        <p className="mt-2 text-[15px] leading-[1.7] text-muted">{description}</p>
      </div>
      <div className="md:self-center">{action}</div>
    </li>
  );
}
