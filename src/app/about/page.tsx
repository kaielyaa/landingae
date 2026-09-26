import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StampSticker } from "@/components/stamp-sticker";
import { buttonStyles, ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tentang — Anka Entertainment",
  description:
    "Kami percaya musik yang baik butuh waktu. Cerita di balik Anka Entertainment, label musik independen Indonesia sejak 2021.",
};

const principles = [
  {
    title: "Kecil itu pilihan",
    body: "Kami memilih bekerja dengan sedikit artist daripada banyak. Lebih sedikit nama berarti lebih banyak waktu, fokus, dan komitmen untuk setiap orang yang kami bawa.",
  },
  {
    title: "Master itu penting",
    body: "Kami transparan soal kepemilikan master. Katalog, Karya Produksi, Cover — tiga kategori yang dipisahkan justru untuk menjaga kejelasan: siapa pemilik apa, sejak kapan, untuk berapa lama.",
  },
  {
    title: "Proses lebih panjang dari rilis",
    body: "Lagu yang dirilis bukan akhir pekerjaan. Develop, record, release bukan tahap yang selesai sekali, tapi siklus yang terus berputar selama artist masih bersama kami.",
  },
  {
    title: "Lokal dulu, global menyusul",
    body: "Distribusi global penting, tapi koneksi regional yang membentuk fanbase yang bertahan. Distribusi musik seluruhnya lewat sister company kami, Lantuns.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <PageHero
          title={
            <>
              Kami percaya musik yang{" "}
              <StampSticker trigger="load" tone="primary" delay={320}>
                baik
              </StampSticker>{" "}
              butuh waktu.
            </>
          }
          description="Anka Entertainment adalah label musik independen Indonesia. Kami tidak ingin jadi yang terbesar — kami ingin jadi yang paling hadir untuk artist yang kami percaya."
        />

        {/* CERITA — prosa, ditutup kutipan besar. */}
        <Section tone="base" space="loose">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <SectionHeading title="Behind the label." />
            {/* Dua stiker inline ditempel berurutan saat cerita terlihat. */}
            <Reveal className="max-w-[60ch]">
              <div className="space-y-5 text-[17px] leading-[1.8] text-muted">
                <p>
                  Anka Entertainment lahir dari pengalaman pribadi, bukan dari
                  ruang rapat. Kami pernah ada di posisi yang sama dengan banyak
                  artist independen di Indonesia: punya karya, tapi tidak tahu
                  cara merilisnya dengan benar. Tidak punya akses ke distribusi
                  yang layak. Bingung soal kepemilikan master, royalti, dan
                  pembagian hasil.
                </p>
                <p>
                  Sekarang, kami ingin jadi{" "}
                  <StampSticker trigger="group" tone="primary" size="inline">
                    support system
                  </StampSticker>{" "}
                  itu. Bukan label yang
                  menempelkan nama lalu menunggu artist menghasilkan. Kami
                  bekerja dari hulu — membantu artist menemukan sound,
                  identitas, dan arah karier — sampai ke hilir, ke proses
                  rekaman dan rilis.
                </p>
                <p>
                  Roster kami{" "}
                  <StampSticker trigger="group" tone="accent" size="inline" delay={220}>
                    kecil
                  </StampSticker>
                  . Itu pilihan, bukan keterbatasan.
                  Pengembangan artist yang serius butuh perhatian penuh — tidak
                  bisa setengah-setengah, apalagi ke banyak orang sekaligus.
                </p>
              </div>
              <figure className="mt-12 border-l-2 border-foreground pl-6">
                <blockquote className="text-[clamp(22px,2.4vw,30px)] font-bold leading-[1.35]">
                  &ldquo;Anka Entertainment tidak dibangun di ruang rapat. Anka
                  Entertainment dibangun di studio, di live session, di obrolan
                  setelah jam dua pagi.&rdquo;
                </blockquote>
              </figure>
            </Reveal>
          </div>
        </Section>

        {/* PRINSIP — empat butir bernomor, dua kolom. */}
        <Section tone="sunken" space="normal">
          <SectionHeading
            title={
              <>
                Empat hal yang tidak kami{" "}
                <StampSticker tone="accent" tilt="right">
                  kompromikan
                </StampSticker>
                .
              </>
            }
            lead="Lebih dari sekadar tagline. Ini cara kami bekerja, tiap hari, tiap rilisan."
          />
          <ol className="mt-12 grid gap-x-16 md:grid-cols-2">
            {principles.map((p, i) => (
              <li key={p.title} className="flex gap-4 border-t border-border py-7">
                <span className="w-6 flex-none pt-1.5 text-[13px] font-medium text-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[clamp(20px,2vw,24px)] font-bold leading-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 max-w-[48ch] text-[15px] leading-[1.75] text-muted">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* PENUTUP — rata kiri, bukan blok tengah. */}
        <Section tone="base" space="loose">
          <h2 className="max-w-[22ch] text-[clamp(30px,4.2vw,56px)] font-bold leading-[1.1] tracking-tight">
            Kalau cara kami terdengar masuk akal buat kamu, mari{" "}
            <StampSticker tone="primary">ngobrol</StampSticker>.
          </h2>
          <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.8] text-muted">
            Kami selalu terbuka untuk ngobrol — soal musik, soal rilis, soal
            kerja sama jangka panjang. Tidak buru-buru. Kami juga.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href="/submit" size="lg">
              Kirim Demo
            </ButtonLink>
            <a
              href={`mailto:${site.contactEmail}`}
              className={buttonStyles({ variant: "invert", size: "lg" })}
            >
              Email kami
            </a>
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
