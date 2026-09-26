import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { CreditList } from "@/components/credit-list";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StampSticker } from "@/components/stamp-sticker";
import { ButtonLink } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Section, SectionHeading } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Anka Group — Anka Entertainment",
  description:
    "Anka Group (PT Anka Sembilan Delapan) adalah grup independen di musik dan teknologi. Dua brand: Anka Entertainment dan Lantuns.",
};

/** Isi dari situs lama (aelama/.../anka-group). Yang sengaja TIDAK dibawa:
 * "Tiga brand" / "3 brand aktif" (salah — dua brand, Kaiel 2026-09-27),
 * angka "∞" (hiasan), dan kalimat internal soal "visual DNA" Lantuns. */
const brands = [
  {
    logo: "/apple-touch-icon.png",
    name: "Anka Entertainment",
    role: "Label musik",
    tone: "primary" as const,
    tagline: "Label musik independen.",
    intro:
      "Brand awal dari Anka Group. Label yang fokus mengembangkan artist dengan komitmen jangka panjang. Bukan content factory — kami memilih roster kecil dan kerja serius.",
    body: "Anka Entertainment menangani siklus penuh dari pengembangan artist sampai rilis. Distribusi musik diserahkan ke Lantuns sebagai sister company.",
    highlights: [
      "Develop · Record · Release",
      "Roster eksklusif dan kolaborasi project-based",
      "Distribusi global lewat Lantuns",
    ],
    current: true,
  },
  {
    logo: "/lantunsicon.png",
    name: "Lantuns",
    role: "Distribusi musik",
    tone: "accent" as const,
    tagline: "Infrastruktur untuk musik independen.",
    intro:
      "Brand distribusi yang dipisahkan dari Anka Entertainment setelah restrukturisasi. Distribusi global dan layanan label untuk artist, label, dan kolektif yang ingin bekerja lebih rapi tanpa menyerahkan kendali atas katalog mereka.",
    body: "Pelanggannya bukan pendengar, tapi artist dan label yang butuh distribusi yang benar. Lantuns melayani lebih dari sekadar artist Anka.",
    highlights: ["Distribusi global", "Layanan label", "Katalog tetap milikmu"],
    href: "https://lantuns.com",
  },
];

export default function AnkaGroupPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <PageHero
          title={
            <>
              Dua brand, satu{" "}
              <StampSticker trigger="load" tone="primary" delay={320}>
                ekosistem
              </StampSticker>
              .
            </>
          }
          description="Anka Group adalah grup independen yang membangun bisnis di musik dan teknologi. Setiap brand di bawahnya berdiri sendiri, punya identitas dan tim sendiri, tapi tetap dalam satu ekosistem yang saling mendukung."
        />

        {/* STRUKTUR — pohon kredit, bukan diagram bercahaya. Garis cabang
            tergambar saat masuk layar (mekanik data-leader yang sama
            dengan CreditList). */}
        <Section tone="base" space="normal">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <SectionHeading
              title="Bagaimana semuanya tersusun."
              lead="Independen, tapi tidak sendirian."
            />
            <Reveal>
              <p className="text-[13px] font-bold uppercase tracking-[0.05em] text-muted">
                Induk
              </p>
              <p className="mt-2 text-[clamp(24px,2.6vw,32px)] font-bold leading-tight">
                Anka Group
              </p>
              <p className="text-[14px] text-muted">PT Anka Sembilan Delapan</p>

              {/* Batang vertikal + cabang horizontal per brand. */}
              <ul className="ml-3 mt-6 border-l border-dotted border-muted/50">
                {brands.map((b, i) => (
                  <li
                    key={b.name}
                    className="flex items-center py-4"
                    style={{ "--i": i } as CSSProperties}
                  >
                    <span
                      aria-hidden
                      data-leader=""
                      className="h-px w-8 flex-none origin-left border-b border-dotted border-muted/50"
                    />
                    <span className="ml-4 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
                      <span className="text-[19px] font-bold">{b.name}</span>
                      <span data-value="" className="text-[14px] text-muted">
                        {b.role}
                      </span>
                      {b.current ? <Chip>Kamu di sini</Chip> : null}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>

        {/* BRAND — satu blok per brand, bernomor. */}
        {brands.map((b, i) => (
          <Section
            key={b.name}
            tone={i % 2 === 0 ? "sunken" : "base"}
            space="loose"
          >
            <BrandBlock n={i + 1} brand={b} />
          </Section>
        ))}

        {/* VISI */}
        <Section tone="sunken" space="normal">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <SectionHeading
              title={
                <>
                  Yang sedang kami{" "}
                  <StampSticker tone="accent" tilt="right">
                    bangun
                  </StampSticker>
                  .
                </>
              }
            />
            <div className="max-w-[60ch]">
              <p className="text-[clamp(20px,2vw,24px)] font-bold leading-[1.4]">
                Anka Group bukan akhir. Setiap brand baru di masa depan akan
                masuk di bawah payung yang sama.
              </p>
              <div className="mt-6 space-y-5 text-[17px] leading-[1.8] text-muted">
                <p>
                  Kami terinspirasi oleh model perusahaan multi-venture — tiap
                  unit bisnis punya identitas, tim, dan pasar sendiri, tapi
                  tetap dalam ekosistem yang saling mendukung.
                </p>
                <p>
                  Ini bukan diversifikasi demi diversifikasi. Tiap brand baru
                  muncul karena ada kebutuhan nyata yang kami yakin bisa kami
                  jawab dengan baik — bukan dipaksa ada demi angka.
                </p>
                <p>
                  Kalau nanti ada brand baru, entah di musik, teknologi, kreatif,
                  atau bidang lain, ia masuk di bawah Anka Group. Filosofinya
                  tetap sama: independen, serius, panjang umur.
                </p>
              </div>
              <CreditList
                className="mt-10"
                variant="facts"
                credits={[
                  { name: "Brand aktif", value: "2" },
                  { name: "Sejak", value: "2021" },
                  { name: "Badan usaha", value: "PT Anka Sembilan Delapan" },
                ]}
              />
            </div>
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}

function BrandBlock({
  n,
  brand: b,
}: {
  n: number;
  brand: (typeof brands)[number];
}) {
  let action: ReactNode = null;
  if (b.current) {
    action = <Chip>Kamu sedang di sini</Chip>;
  } else if (b.href) {
    action = (
      <ButtonLink href={b.href} target="_blank" rel="noreferrer" variant="invert">
        Kunjungi {b.name}
      </ButtonLink>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
      <div>
        <div className="flex items-center gap-4">
          <span className="text-[13px] font-medium text-muted tabular-nums">
            {String(n).padStart(2, "0")}
          </span>
          <span className="flex h-14 w-14 flex-none items-center justify-center rounded-md border border-border bg-foreground/[0.03] p-2.5">
            <Image src={b.logo} alt="" width={36} height={36} className="rounded-sm" />
          </span>
        </div>
        <h2 className="mt-6 text-[clamp(40px,6vw,80px)] font-bold leading-[1] tracking-[-0.03em]">
          {b.name}
        </h2>
        <Reveal className="mt-4">
          <StampSticker trigger="group" tone={b.tone} size="inline">
            {b.role}
          </StampSticker>
        </Reveal>
        <p className="mt-8 max-w-[22ch] text-[clamp(22px,2.4vw,30px)] font-bold leading-[1.3]">
          {b.tagline}
        </p>
      </div>

      <div className="max-w-[60ch]">
        <p className="text-[17px] leading-[1.8]">{b.intro}</p>
        <p className="mt-5 text-[17px] leading-[1.8] text-muted">{b.body}</p>
        <h3 className="mt-10 text-[13px] font-bold uppercase tracking-[0.05em] text-muted">
          Yang dikerjakan
        </h3>
        <ol className="mt-4 divide-y divide-border border-y border-border">
          {b.highlights.map((h, i) => (
            <li key={h} className="flex items-baseline gap-4 py-3.5">
              <span className="w-6 flex-none text-[13px] font-medium text-muted tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[17px] font-bold">{h}</span>
            </li>
          ))}
        </ol>
        {action ? <div className="mt-8">{action}</div> : null}
      </div>
    </div>
  );
}
