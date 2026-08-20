import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal-page-layout";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — Anka Entertainment",
  description:
    "Informasi yang kami kumpulkan, cara kami gunakan, dan hak kamu atas data pribadi.",
};

const TOC = [
  { id: "intro", label: "Pengantar" },
  { id: "data-collected", label: "Informasi yang Kami Kumpulkan" },
  { id: "data-use", label: "Cara Kami Menggunakan Informasi" },
  { id: "data-sharing", label: "Pembagian Data ke Pihak Ketiga" },
  { id: "cookies", label: "Cookies & Analitik" },
  { id: "data-retention", label: "Penyimpanan Data" },
  { id: "data-rights", label: "Hak Kamu atas Data" },
  { id: "data-security", label: "Keamanan Data" },
  { id: "children", label: "Privasi Anak-anak" },
  { id: "changes", label: "Perubahan Kebijakan" },
  { id: "contact", label: "Hubungi Kami" },
];

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <LegalPageLayout
          title="Kebijakan Privasi"
          lastUpdated="Agustus 2026"
          description="Kami percaya privasi adalah hak. Halaman ini menjelaskan informasi apa yang kami kumpulkan, kenapa, dan apa yang bisa kamu lakukan terhadap data kamu."
          toc={TOC}
        >
          <section id="intro">
            <h2>1. Pengantar</h2>
            <p>
              Anka Entertainment (selanjutnya disebut <strong>&ldquo;kami&rdquo;</strong>)
              adalah label musik independen yang dimiliki oleh PT Anka Sembilan
              Delapan, berbasis di Indonesia. Kebijakan privasi ini berlaku
              untuk seluruh interaksi kamu dengan website ankaentertainment.com.
            </p>
            <p>
              Dengan menggunakan website ini atau mengirim submission, kamu
              dianggap telah membaca dan menyetujui ketentuan dalam kebijakan
              ini.
            </p>
          </section>

          <section id="data-collected">
            <h2>2. Informasi yang Kami Kumpulkan</h2>
            <p>
              Kami hanya mengumpulkan informasi yang kamu berikan secara
              aktif, ditambah data teknis minimal untuk kebutuhan analitik
              website.
            </p>

            <h3>2.1 Informasi yang Kamu Berikan</h3>
            <p>Saat kamu mengirim submission lewat form di website, kami menerima:</p>
            <ul>
              <li>Nama dan alamat email</li>
              <li>Artist name, lokasi, genre, dan informasi karir musik</li>
              <li>Bio singkat dan handle sosial media (kalau kamu cantumkan)</li>
              <li>
                Demo musik — baik berupa link ke platform streaming, ataupun
                file audio/video yang kamu upload
              </li>
            </ul>

            <h3>2.2 Informasi Teknis Otomatis</h3>
            <p>
              Saat kamu mengakses website, server dan layanan analitik secara
              otomatis mencatat:
            </p>
            <ul>
              <li>Alamat IP (dianonimkan untuk analitik)</li>
              <li>Jenis browser dan perangkat</li>
              <li>Halaman yang kamu kunjungi dan durasi kunjungan</li>
              <li>Sumber rujukan (kalau kamu datang dari link eksternal)</li>
            </ul>
            <p>
              Kami <em>tidak</em> menggunakan tracking cross-site atau
              profiling iklan.
            </p>
          </section>

          <section id="data-use">
            <h2>3. Cara Kami Menggunakan Informasi</h2>
            <p>Informasi yang kamu berikan kami gunakan untuk:</p>
            <ul>
              <li>
                <strong>Memproses submission</strong> — review demo, evaluasi
                kemungkinan kerja sama, dan komunikasi balasan
              </li>
              <li>
                <strong>Menjawab pertanyaan</strong> — kalau kamu email kami
                atau mengirim pesan
              </li>
              <li>
                <strong>Memahami performa website</strong> — lewat data
                analitik agregat
              </li>
              <li>
                <strong>Memenuhi kewajiban hukum</strong> — kalau diminta
                otoritas yang berwenang
              </li>
            </ul>
            <p>
              Kami <em>tidak</em> menjual data kamu, <em>tidak</em> mengirim
              email marketing tanpa izin, dan <em>tidak</em> menggunakan data
              submission kamu untuk training AI atau model machine learning
              apa pun.
            </p>
          </section>

          <section id="data-sharing">
            <h2>4. Pembagian Data ke Pihak Ketiga</h2>
            <p>
              Sebagai bagian dari Anka Group, kami terkadang berkoordinasi
              dengan sister company kami (Lantuns) untuk hal-hal internal
              grup. Data submission kamu tidak dibagikan ke entitas eksternal
              kecuali:
            </p>
            <ul>
              <li>
                Kamu memberikan persetujuan eksplisit (misalnya, kami
                merekomendasikan kamu ke partner)
              </li>
              <li>Diwajibkan oleh hukum atau perintah pengadilan yang sah</li>
              <li>
                Dibutuhkan untuk melindungi hak, properti, atau keselamatan
                kami atau orang lain
              </li>
            </ul>

            <h3>4.1 Penyedia Layanan Pihak Ketiga</h3>
            <p>
              Untuk operasional website, kami menggunakan atau berencana
              menggunakan beberapa layanan pihak ketiga:
            </p>
            <ul>
              <li>
                <strong>Penyedia hosting</strong> — untuk menjalankan website
                dan menerima form submission
              </li>
              <li>
                <strong>Penyedia email</strong> — untuk mengirim notifikasi
                submission ke kami
              </li>
              <li>
                <strong>Layanan analitik</strong> — untuk memahami trafik
                website secara agregat
              </li>
              <li>
                <strong>Sanity CMS</strong> — untuk mengelola konten website
                (rencana, belum aktif)
              </li>
            </ul>
            <p>
              Penyedia ini punya kebijakan privasi sendiri dan kami memilih
              partner yang punya komitmen privasi yang sejalan dengan kami.
            </p>
          </section>

          <section id="cookies">
            <h2>5. Cookies &amp; Analitik</h2>
            <p>
              Website kami menggunakan cookie minimal untuk fungsi dasar dan
              analitik. Tidak ada cookie iklan atau tracking lintas situs.
            </p>
            <p>
              Detail lengkap tentang cookie yang kami gunakan ada di{" "}
              <a href="/cookies">Kebijakan Cookie</a>.
            </p>
          </section>

          <section id="data-retention">
            <h2>6. Penyimpanan Data</h2>
            <p>Kami menyimpan data submission selama:</p>
            <ul>
              <li>
                <strong>Submission yang ditolak</strong> — disimpan maksimal
                12 bulan setelah keputusan, kemudian dihapus
              </li>
              <li>
                <strong>Submission yang diterima</strong> — disimpan selama
                hubungan kerja sama berlangsung dan 24 bulan setelahnya
              </li>
              <li>
                <strong>Data analitik</strong> — disimpan dalam bentuk agregat
                tanpa identifikasi personal
              </li>
            </ul>
            <p>
              Kamu bisa minta data kamu dihapus kapan saja sebelum periode
              retensi berakhir (lihat bagian &ldquo;Hak Kamu atas Data&rdquo;).
            </p>
          </section>

          <section id="data-rights">
            <h2>7. Hak Kamu atas Data</h2>
            <p>Kamu berhak untuk:</p>
            <ul>
              <li><strong>Mengakses</strong> data pribadi yang kami simpan tentang kamu</li>
              <li><strong>Memperbaiki</strong> informasi yang tidak akurat atau tidak lengkap</li>
              <li>
                <strong>Menghapus</strong> data kamu dari sistem kami (selama
                tidak bertentangan dengan kewajiban hukum)
              </li>
              <li><strong>Membatasi</strong> bagaimana kami menggunakan data kamu</li>
              <li><strong>Meminta salinan</strong> data kamu dalam format yang dapat dibaca mesin</li>
            </ul>
            <p>
              Untuk menggunakan hak ini, kirim email ke{" "}
              <a href="mailto:hello@ankaentertainment.com">
                hello@ankaentertainment.com
              </a>{" "}
              dengan subjek <em>&ldquo;Permintaan Data Pribadi&rdquo;</em>.
              Kami akan respon dalam waktu 14 hari kerja.
            </p>
          </section>

          <section id="data-security">
            <h2>8. Keamanan Data</h2>
            <p>
              Kami menerapkan langkah keamanan teknis dan organisasional yang
              wajar untuk melindungi data kamu dari akses tidak sah,
              modifikasi, kebocoran, atau penghancuran. Tidak ada metode
              transmisi internet atau penyimpanan elektronik yang 100% aman,
              dan kami tidak bisa menjamin keamanan absolut.
            </p>
            <p>
              Kalau terjadi insiden keamanan yang berdampak pada data kamu,
              kami akan memberi tahu lewat email dalam waktu yang wajar
              setelah kami menyadari insiden tersebut.
            </p>
          </section>

          <section id="children">
            <h2>9. Privasi Anak-anak</h2>
            <p>
              Website ini tidak ditujukan untuk anak-anak di bawah usia 13
              tahun. Kami tidak secara sengaja mengumpulkan data dari
              anak-anak. Kalau kamu orang tua atau wali dan tahu anak kamu
              telah memberikan data kepada kami, hubungi kami untuk
              penghapusan.
            </p>
          </section>

          <section id="changes">
            <h2>10. Perubahan Kebijakan</h2>
            <p>
              Kebijakan ini bisa diperbarui dari waktu ke waktu. Tanggal
              &ldquo;Terakhir diperbarui&rdquo; di atas akan kami refresh
              setiap ada perubahan. Untuk perubahan signifikan, kami akan
              beri tahu lewat banner di website atau email.
            </p>
            <p>
              Penggunaan website setelah perubahan dipublikasikan dianggap
              sebagai persetujuan terhadap kebijakan baru.
            </p>
          </section>

          <section id="contact">
            <h2>11. Hubungi Kami</h2>
            <p>
              Pertanyaan atau permintaan terkait kebijakan privasi ini bisa
              diarahkan ke:
            </p>
            <p>
              <strong>Anka Entertainment</strong>
              <br />
              PT Anka Sembilan Delapan
              <br />
              Email:{" "}
              <a href="mailto:hello@ankaentertainment.com">
                hello@ankaentertainment.com
              </a>
            </p>
            <p className="closing">
              Kami mendengarkan. Setiap email kami baca, meski balasan kadang
              butuh waktu.
            </p>
          </section>
        </LegalPageLayout>
      </main>
      <SiteFooter />
    </>
  );
}
