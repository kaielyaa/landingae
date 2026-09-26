import type { Metadata } from "next";
import { Clock } from "lucide-react";
import { CreditList } from "@/components/credit-list";
import { InlineTag } from "@/components/inline-tag";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StampSticker } from "@/components/stamp-sticker";
import { ButtonLink } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Section, SectionHeading, TextLink } from "@/components/ui/section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kirim Demo — Anka Entertainment",
  description:
    "Dua cara masuk ke ekosistem Anka: gabung sebagai artist, atau distribusi musik lewat Lantuns.",
};

export default function SubmitPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <PageHero
          title={
            <>
              Mari{" "}
              <StampSticker trigger="load" tone="accent" tilt="right" delay={320}>
                ngobrol
              </StampSticker>
              .
            </>
          }
          description="Dua cara untuk masuk ke ekosistem Anka. Pilih yang sesuai posisimu sekarang — setiap submission kami baca dan balas, meski kadang butuh waktu."
        />

        {/* JALUR 01 — gabung roster. Status dari satu saklar
            (site.openCall). Tutup = teks + ikon, bukan cuma warna; selalu
            ada jalan keluar. Form untuk keadaan buka dibangun di Fase 7. */}
        <Section tone="base" space="normal">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[13px] font-medium text-muted tabular-nums">01</span>
                {site.openCall.active ? (
                  <Chip tone="primary">Buka</Chip>
                ) : (
                  <Chip tone="warning" className="gap-1.5">
                    <Clock aria-hidden className="h-3.5 w-3.5" />
                    Tutup sementara
                  </Chip>
                )}
              </div>
              <SectionHeading className="mt-6" title="Gabung dengan Anka Entertainment." />
            </div>

            <div className="max-w-[60ch]">
              <p className="text-[17px] leading-[1.8]">{site.openCall.closedMessage}</p>
              <p className="mt-5 text-[17px] leading-[1.8] text-muted">
                Sambil menunggu, kamu bisa mengikuti kabar terbaru kami, atau
                kenalan dulu dengan roster yang sedang aktif.
              </p>
              <CreditList
                className="mt-10"
                title="Sambil menunggu"
                credits={[
                  { name: "Kabar open call", value: "Instagram", href: site.social.instagram },
                  { name: "Roster aktif", value: "Lihat roster", href: "/roster" },
                  { name: "Pertanyaan", value: site.contactEmail, href: `mailto:${site.contactEmail}` },
                ]}
              />
            </div>
          </div>
        </Section>

        {/* JALUR 02 — distribusi, selalu terbuka, lewat Lantuns. */}
        <Section tone="sunken" space="normal">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[13px] font-medium text-muted tabular-nums">02</span>
                <Chip tone="accent">Selalu buka</Chip>
              </div>
              <SectionHeading
                className="mt-6"
                title={
                  <>
                    Distribusi lewat{" "}
                    <StampSticker tone="accent" tilt="right">
                      Lantuns
                    </StampSticker>
                    .
                  </>
                }
              />
            </div>

            <div className="max-w-[60ch]">
              <p className="text-[17px] leading-[1.8]">
                Untuk siapa pun yang butuh distribusi musik ke 150+ platform
                global. Mandiri, dan master tetap milikmu.
              </p>
              <ol className="mt-8 divide-y divide-border border-y border-border">
                {[
                  "150+ platform streaming di seluruh dunia",
                  "Manajemen royalti & analitik",
                  "Terbuka untuk artist & label di luar Anka",
                ].map((item, i) => (
                  <li key={item} className="flex items-baseline gap-4 py-3.5">
                    <span className="w-6 flex-none text-[13px] font-medium text-muted tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[17px] font-bold">{item}</span>
                  </li>
                ))}
              </ol>
              <ButtonLink
                href="https://lantuns.com"
                target="_blank"
                rel="noreferrer"
                variant="invert"
                size="lg"
                className="mt-8"
              >
                Kunjungi Lantuns
              </ButtonLink>
            </div>
          </div>
        </Section>

        <Section tone="base" space="tight">
          <p className="max-w-[56ch] text-[15px] leading-[1.7] text-muted">
            Anka Entertainment fokus penuh sebagai label. Distribusi musik
            ditangani sister company kami, <InlineTag>Lantuns</InlineTag>.{" "}
            <TextLink href="/anka-group">Tentang Anka Group</TextLink>
          </p>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
