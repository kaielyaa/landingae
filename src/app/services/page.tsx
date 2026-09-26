import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { StampSticker } from "@/components/stamp-sticker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Layanan — Anka Entertainment",
  description:
    "Tiga tahap, dari ide ke pendengar. Develop, record, release — cara kami kerja sama dengan setiap artist di roster.",
};

const stages = [
  {
    num: "01",
    tag: "Develop",
    tone: "primary" as const,
    title: "Pengembangan Artist",
    lede: "Sebelum rekaman, ada perjalanan.",
    body: "Pengembangan artist bukan tentang ngubah kamu jadi orang lain. Ini tentang bantu nemuin versi terbaik dari diri kamu sebagai musisi — sound, identitas, posisi di scene. Kami nggak punya formula; tiap artist datang dari titik yang beda.",
    items: [
      {
        label: "Sound",
        desc: "Sesi diskusi rutin tentang arah musik, referensi, dan eksperimen yang layak dicoba.",
      },
      {
        label: "Identitas",
        desc: "Bantuan membangun persona artistik yang konsisten di musik, visual, dan komunikasi.",
      },
      {
        label: "Strategi",
        desc: "Perencanaan karier jangka panjang — bukan cuma single berikutnya, tapi 3-5 tahun ke depan.",
      },
    ],
  },
  {
    num: "02",
    tag: "Record",
    tone: "neutral" as const,
    title: "Rekaman & Produksi",
    lede: "Studio bukan ruangan, tapi pikiran.",
    body: "Tahap rekaman adalah di mana ide diterjemahkan jadi suara. Kami punya akses ke studio dan tim produksi yang ngerti visi musik kamu — dari recording engineer, mixing, sampai mastering. Kualitas suara itu tidak bisa ditawar.",
    items: [
      {
        label: "Akses Studio",
        desc: "Akses studio recording dengan engineer berpengalaman, di kota kamu maupun luar kota.",
      },
      {
        label: "Produksi",
        desc: "Tim produser yang bisa disesuaikan per project — beda artist, beda kecocokan.",
      },
      {
        label: "Mix & Master",
        desc: "Sesuai standar streaming platform dan rilisan fisik.",
      },
      {
        label: "Sesi",
        desc: "Sesi live, rekaman B-side, atau versi alternatif, semua bisa dieksplorasi.",
      },
    ],
  },
  {
    num: "03",
    tag: "Release",
    tone: "accent" as const,
    title: "Release & Distribution",
    lede: "Rilis bukan akhir. Itu permulaan.",
    body: "Buat kami, rilis adalah momen kulminasi yang dipikirin matang — strategi timing, channel, audience, dan post-release activation. Distribusi Musik ditangani sister company kami, Lantuns, ke 150+ platform streaming di seluruh dunia.",
    items: [
      { label: "Distribusi", desc: "Global via Lantuns (150+ platform)." },
      {
        label: "Pra-Rilis",
        desc: "Strategi teaser, pitching playlist, jangkauan editorial, perencanaan timeline.",
      },
      {
        label: "Pemasaran",
        desc: "Aset visual dan kampanye sosmed yang selaras sama vibe rilisan.",
      },
      {
        label: "Pasca-Rilis",
        desc: "Pelacakan performa, kampanye lanjutan, evaluasi untuk era berikutnya.",
      },
    ],
  },
];

const toneChip = {
  primary: "chip-primary",
  accent: "chip-accent",
  neutral: "",
};

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
          description="Apa yang kami sebut layanan sebenarnya bukan paket — ini cara kami kerja sama dengan setiap artist yang masuk ke roster. Dari pengembangan suara, ke proses rekaman, sampai musik sampai ke telinga pendengar."
        />

        {stages.map((s, i) => (
          <section
            key={s.num}
            className={`border-b border-border py-16 ${i % 2 === 0 ? "bg-background" : "bg-surface-2"}`}
          >
            <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
              <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="tabular text-[13px] font-bold text-muted">
                      {s.num}
                    </span>
                    <span
                      className={`chip ${toneChip[s.tone]} rounded-sm px-2 py-1 text-[11px]`}
                    >
                      {s.tag}
                    </span>
                  </div>
                  <h2 className="mt-4 text-[clamp(24px,3vw,34px)] font-bold leading-[1.15]">
                    {s.title}
                  </h2>
                  <p className="mt-3 text-[16px] font-semibold text-muted">
                    {s.lede}
                  </p>
                  <p className="mt-4 text-[15px] leading-[1.75] text-muted">
                    {s.body}
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {s.items.map((it) => (
                    <div key={it.label}>
                      <p className="text-[13px] font-bold uppercase tracking-wide">
                        {it.label}
                      </p>
                      <p className="mt-1.5 text-[14px] leading-[1.65] text-muted">
                        {it.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* ---------- MULAI DARI MANA ---------- */}
        <section className="bg-background py-20">
          <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
            <h2 className="text-[clamp(24px,3vw,34px)] font-bold leading-[1.15]">
              Mulai dari mana?
            </h2>
            <p className="mt-3 max-w-[50ch] text-[15px] leading-[1.7] text-muted">
              Setiap perjalanan start dari titik yang beda.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface p-7">
                <span className="chip chip-primary rounded-sm px-2 py-1 text-[11px]">
                  Baru mulai
                </span>
                <h3 className="mt-4 text-[18px] font-bold">
                  Belum punya rilisan
                </h3>
                <p className="mt-2 text-[14px] leading-[1.7] text-muted">
                  Kamu punya lagu, tapi belum tau gimana ngerilisnya. Mulai
                  dari sini, kami support dari nol.
                </p>
                <Link
                  href="/submit"
                  className="mt-5 inline-block rounded-md bg-primary px-5 py-2.5 text-[13px] font-bold text-primary-foreground transition-transform duration-fast ease-out hover:-translate-y-0.5"
                >
                  Kirim Demo
                </Link>
              </div>

              <div className="rounded-xl border border-border bg-surface p-7">
                <span className="chip chip-accent rounded-sm px-2 py-1 text-[11px]">
                  Udah jalan
                </span>
                <h3 className="mt-4 text-[18px] font-bold">
                  Punya katalog atau fanbase
                </h3>
                <p className="mt-2 text-[14px] leading-[1.7] text-muted">
                  Kamu udah pernah rilis, sekarang cari rumah atau partner
                  yang lebih serius. Mari ngobrol.
                </p>
                <Link
                  href="/submit"
                  className="mt-5 inline-block rounded-md bg-foreground px-5 py-2.5 text-[13px] font-bold text-background transition-transform duration-fast ease-out hover:-translate-y-0.5"
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- FAQ — cuma 1 pertanyaan yang emang ada jawabannya
             dari copy situs lama. Sisanya sengaja gak diisi ngarang,
             karena nyangkut fakta bisnis (royalti, kepemilikan master,
             timeline) — lihat catatan.md. ---------- */}
        <section className="border-t border-border bg-surface-2 py-20">
          <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
            <div className="max-w-[62ch]">
              <h2 className="text-[clamp(24px,3vw,34px)] font-bold leading-[1.15]">
                Pertanyaan yang sering muncul.
              </h2>
              <p className="mt-3 text-[15px] leading-[1.7] text-muted">
                Belum kejawab di sini?{" "}
                <a
                  href="mailto:hello@ankaentertainment.com"
                  className="font-bold text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                >
                  Email kami.
                </a>
              </p>

              <details className="group mt-8 border-t border-border py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-bold">
                  Apa beda Anka Entertainment dengan distribusi musik
                  biasa?
                  <span
                    aria-hidden
                    className="flex-none text-muted transition-transform duration-fast ease-out group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[15px] leading-[1.75] text-muted">
                  Distribusi musik (kayak DistroKid, TuneCore) cuma upload
                  lagu kamu ke platform streaming. Kami label — kami
                  terlibat di proses kreatif, produksi, strategi rilis,
                  sampai post-release support. Distribusi cuma salah satu
                  bagian dari yang kami lakukan.
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
