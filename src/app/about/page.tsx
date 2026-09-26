import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Tentang — Anka Entertainment",
  description:
    "Kami percaya musik yang baik butuh waktu. Cerita di balik Anka Entertainment, label musik independen Indonesia sejak 2021.",
};

const principles = [
  {
    num: "01",
    title: "Kecil itu pilihan",
    body: "Kami memilih bekerja dengan sedikit artist daripada banyak. Lebih sedikit nama berarti lebih banyak waktu, fokus, dan komitmen untuk setiap orang yang kami bawa.",
  },
  {
    num: "02",
    title: "Master itu penting",
    body: "Kami transparan soal kepemilikan master. Catalog, Production, Cover — tiga kategori yang dipisahkan justru untuk menjaga kejelasan: siapa pemilik apa, sejak kapan, untuk berapa lama.",
  },
  {
    num: "03",
    title: "Proses lebih panjang dari rilis",
    body: "Lagu yang dirilis bukan akhir dari pekerjaan. Develop, record, release itu bukan tahap yang selesai satu kali, tapi siklus yang terus berputar selama artist masih bersama kami.",
  },
  {
    num: "04",
    title: "Lokal dulu, global menyusul",
    body: "Distribusi global penting, tapi koneksi regional yang membentuk fanbase yang sustainable. Distribusi Musik seluruhnya lewat sister company kami, Lantuns.",
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
              <span className="inline-block -rotate-1 rounded-md bg-primary px-3 py-0.5 leading-[1.05] text-primary-foreground">
                baik
              </span>{" "}
              butuh waktu.
            </>
          }
          description="Anka Entertainment adalah label musik independen Indonesia. Kami tidak ingin jadi yang terbesar — kami ingin jadi yang paling hadir untuk artist yang kami percaya."
        />

        {/* ---------- CERITA ---------- */}
        <section className="border-b border-border bg-background py-20">
          <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
            <div className="max-w-[62ch]">
              <h2 className="text-[clamp(24px,3vw,34px)] font-bold leading-[1.15]">
                Behind the label.
              </h2>
              <div className="mt-6 space-y-5 text-[17px] leading-[1.8] text-muted">
                <p>
                  Anka Entertainment lahir dari pengalaman pribadi, bukan
                  dari ruang rapat. Kami pernah ada di posisi yang sama
                  dengan banyak artist independen di Indonesia: punya
                  karya, tapi nggak tahu cara merilisnya dengan benar.
                  Nggak punya akses ke distribusi yang proper. Bingung soal
                  master ownership, royalti, splits.
                </p>
                <p>
                  Sekarang, kami ingin jadi support system itu. Bukan
                  label yang nempelin nama dan nunggu artist menghasilkan.
                  Kami bekerja dari hulu — bantu artist nemuin sound,
                  identitas, dan arah karir — sampai ke hilir, ke proses
                  rekaman dan rilis.
                </p>
                <p>
                  Roster kami kecil. Itu pilihan, bukan keterbatasan. Kami
                  percaya pengembangan artist yang serius butuh perhatian
                  penuh — nggak bisa dilakukan setengah-setengah, apalagi
                  ke banyak orang sekaligus.
                </p>
                <p className="text-[18px] font-bold text-foreground">
                  Anka Entertainment nggak dibangun di ruang rapat. Anka
                  Entertainment dibangun di studio, di live session, di
                  obrolan setelah jam dua pagi.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- YANG KAMI PERCAYA ---------- */}
        <section className="border-b border-border bg-surface-2 py-20">
          <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
            <div className="max-w-[62ch]">
              <h2 className="text-[clamp(24px,3vw,34px)] font-bold leading-[1.15]">
                Empat hal yang tidak kami kompromi.
              </h2>
              <p className="mt-3 text-[15px] leading-[1.7] text-muted">
                Lebih dari sekadar tagline. Ini cara kami bekerja, tiap
                hari, tiap rilisan.
              </p>
            </div>

            <div className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-2">
              {principles.map((p) => (
                <div key={p.num} className="max-w-[42ch]">
                  <span className="tabular text-[13px] font-bold text-muted">
                    {p.num}
                  </span>
                  <h3 className="mt-2 text-[18px] font-bold">{p.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.7] text-muted">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="bg-background py-20">
          <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)] text-center">
            <h2 className="text-[clamp(26px,3.6vw,42px)] font-bold leading-[1.15]">
              Kalau cara kami terdengar masuk akal buat kamu,
            </h2>
            <p className="mx-auto mt-3 max-w-[46ch] text-[15px] leading-[1.7] text-muted">
              Kami selalu terbuka untuk ngobrol — soal musik, soal rilis,
              soal kerja sama jangka panjang. Tidak buru-buru. Kami juga.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/submit"
                className="rounded-md bg-primary px-6 py-3 text-[14px] font-bold text-primary-foreground transition-transform duration-fast ease-out hover:-translate-y-0.5"
              >
                Kirim Demo
              </Link>
              <a
                href="mailto:hello@ankaentertainment.com"
                className="rounded-md bg-foreground px-6 py-3 text-[14px] font-bold text-background transition-transform duration-fast ease-out hover:-translate-y-0.5"
              >
                Email Kami
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
