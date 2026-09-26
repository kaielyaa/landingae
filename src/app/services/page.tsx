import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PathList } from "@/components/path-list";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StampSticker } from "@/components/stamp-sticker";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading, TextLink } from "@/components/ui/section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Layanan — Anka Entertainment",
  description:
    "Tiga tahap, dari ide ke pendengar. Develop, record, release — cara kami kerja sama dengan setiap artist di roster.",
};

const stages = [
  {
    tag: "Develop",
    tone: "primary" as const,
    title: "Pengembangan artist",
    lede: "Sebelum rekaman, ada perjalanan.",
    body: "Pengembangan artist bukan tentang mengubah kamu jadi orang lain. Ini tentang membantu menemukan versi terbaik dirimu sebagai musisi — sound, identitas, posisi di scene. Kami tidak punya formula; tiap artist datang dari titik yang berbeda.",
    items: [
      { label: "Sound", desc: "Sesi diskusi rutin tentang arah musik, referensi, dan eksperimen yang layak dicoba." },
      { label: "Identitas", desc: "Membangun persona artistik yang konsisten di musik, visual, dan komunikasi." },
      { label: "Strategi", desc: "Perencanaan karier jangka panjang — bukan cuma single berikutnya, tapi 3–5 tahun ke depan." },
    ],
  },
  {
    tag: "Record",
    tone: "invert" as const,
    title: "Rekaman & produksi",
    lede: "Studio bukan ruangan, tapi pikiran.",
    body: "Tahap rekaman adalah tempat ide diterjemahkan jadi suara. Kami punya akses ke studio dan tim produksi yang mengerti visi musikmu — dari recording engineer, mixing, sampai mastering. Kualitas suara tidak bisa ditawar.",
    items: [
      { label: "Akses studio", desc: "Studio rekaman dengan engineer berpengalaman, di kotamu maupun luar kota." },
      { label: "Produksi", desc: "Tim produser yang disesuaikan per project — beda artist, beda kecocokan." },
      { label: "Mix & master", desc: "Sesuai standar platform streaming dan rilisan fisik." },
      { label: "Sesi", desc: "Sesi live, rekaman B-side, atau versi alternatif — semua bisa dieksplorasi." },
    ],
  },
  {
    tag: "Release",
    tone: "accent" as const,
    title: "Rilis & distribusi",
    lede: "Rilis bukan akhir. Itu permulaan.",
    body: "Buat kami, rilis adalah momen yang dipikirkan matang — strategi waktu, kanal, audiens, dan aktivasi setelah rilis. Distribusi musik ditangani sister company kami, Lantuns, ke 150+ platform streaming di seluruh dunia.",
    items: [
      { label: "Distribusi", desc: "Global lewat Lantuns, 150+ platform." },
      { label: "Pra-rilis", desc: "Strategi teaser, pitching playlist, jangkauan editorial, perencanaan timeline." },
      { label: "Pemasaran", desc: "Aset visual dan kampanye media sosial yang selaras dengan rilisannya." },
      { label: "Pasca-rilis", desc: "Pelacakan performa, kampanye lanjutan, evaluasi untuk era berikutnya." },
    ],
  },
];

/** FAQ: hanya pertanyaan yang punya jawaban asli dari situs lama. Pertanyaan
 * soal royalti, kepemilikan master, dan timeline sengaja TIDAK ditampilkan
 * sampai ada jawaban resmi — fakta bisnis, tidak boleh dikarang
 * (catatan.md). */
const faqs = [
  {
    q: "Apa beda Anka Entertainment dengan layanan distribusi musik biasa?",
    a: "Layanan distribusi (seperti DistroKid atau TuneCore) cuma mengunggah lagumu ke platform streaming. Kami label — kami terlibat di proses kreatif, produksi, strategi rilis, sampai dukungan setelah rilis. Distribusi hanya salah satu bagian dari yang kami kerjakan.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <PageHero
          title={
            <>
              Tiga tahap. Dari{" "}
              <StampSticker trigger="load" tone="primary" delay={320}>
                ide
              </StampSticker>{" "}
              ke pendengar.
            </>
          }
          description="Yang kami sebut layanan sebenarnya bukan paket — ini cara kami kerja sama dengan setiap artist yang masuk ke roster. Dari pengembangan suara, proses rekaman, sampai musik sampai ke telinga pendengar."
        />

        {/* TIGA TAHAP — satu section per tahap, stiker tahap ditempel saat
            masuk layar. */}
        {stages.map((s, i) => (
          <Section
            key={s.tag}
            tone={i % 2 === 0 ? "base" : "sunken"}
            space="normal"
          >
            <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
              <div>
                <div className="flex items-center gap-4">
                  <span className="text-[13px] font-medium text-muted tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <StampSticker tone={s.tone} size="inline">
                    {s.tag}
                  </StampSticker>
                </div>
                <h2 className="mt-6 text-[clamp(32px,4.6vw,60px)] font-bold leading-[1.05] tracking-tight">
                  {s.title}
                </h2>
                <p className="mt-5 max-w-[26ch] text-[clamp(20px,2vw,24px)] font-bold leading-[1.35]">
                  {s.lede}
                </p>
                <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.8] text-muted">
                  {s.body}
                </p>
              </div>

              <div>
                <h3 className="text-[13px] font-bold uppercase tracking-[0.05em] text-muted">
                  Yang dikerjakan
                </h3>
                <ol className="mt-4 divide-y divide-border border-y border-border">
                  {s.items.map((it, j) => (
                    <li key={it.label} className="flex gap-4 py-5">
                      <span className="w-6 flex-none pt-1 text-[13px] font-medium text-muted tabular-nums">
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-[17px] font-bold">{it.label}</p>
                        <p className="mt-1 max-w-[52ch] text-[15px] leading-[1.7] text-muted">
                          {it.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Section>
        ))}

        {/* MULAI DARI MANA — pola jalur bernomor yang sama dengan Home. */}
        <Section tone="sunken" space="loose">
          <SectionHeading
            title={
              <>
                Mulai dari{" "}
                <StampSticker tone="accent" tilt="right">
                  mana
                </StampSticker>
                ?
              </>
            }
            lead="Setiap perjalanan mulai dari titik yang berbeda."
          />
          <PathList
            className="mt-12"
            paths={[
              {
                title: "Belum punya rilisan",
                description:
                  "Kamu punya lagu, tapi belum tahu cara merilisnya. Mulai dari sini — kami dampingi dari nol.",
                action: (
                  <ButtonLink href="/submit" size="lg">
                    Kirim Demo
                  </ButtonLink>
                ),
              },
              {
                title: "Punya katalog atau fanbase",
                description:
                  "Kamu sudah pernah rilis, sekarang mencari rumah atau partner yang lebih serius. Mari ngobrol.",
                action: (
                  <ButtonLink href="/submit" variant="invert" size="lg">
                    Hubungi Kami
                  </ButtonLink>
                ),
              },
            ]}
          />
        </Section>

        {/* FAQ — <details> bawaan: keyboard & pembaca layar gratis. */}
        <Section tone="base" space="normal">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <SectionHeading
              title="Pertanyaan yang sering muncul."
              lead={
                <>
                  Belum terjawab di sini?{" "}
                  <TextLink href={`mailto:${site.contactEmail}`}>Email kami.</TextLink>
                </>
              }
            />
            <div className="border-y border-border">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-border py-5 last:border-b-0">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[17px] font-bold">
                    {f.q}
                    <span
                      aria-hidden
                      className="flex-none text-[20px] leading-none text-muted transition-transform duration-base ease-out group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[60ch] text-[15px] leading-[1.75] text-muted">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
