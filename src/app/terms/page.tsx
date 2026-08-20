import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal-page-layout";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan — Anka Entertainment",
  description:
    "Aturan main penggunaan website Anka Entertainment — hak dan kewajiban pengguna serta pemilik website.",
};

const TOC = [
  { id: "intro", label: "Pengantar" },
  { id: "acceptance", label: "Penerimaan Ketentuan" },
  { id: "use-of-site", label: "Penggunaan Website" },
  { id: "submissions", label: "Submission Demo" },
  { id: "intellectual-property", label: "Hak Kekayaan Intelektual" },
  { id: "user-content", label: "Konten yang Kamu Berikan" },
  { id: "third-party", label: "Tautan & Layanan Pihak Ketiga" },
  { id: "disclaimers", label: "Disclaimer" },
  { id: "limitation", label: "Pembatasan Tanggung Jawab" },
  { id: "indemnification", label: "Ganti Rugi" },
  { id: "termination", label: "Penghentian" },
  { id: "governing-law", label: "Hukum yang Berlaku" },
  { id: "changes", label: "Perubahan Ketentuan" },
  { id: "contact", label: "Hubungi Kami" },
];

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <LegalPageLayout
          title="Syarat & Ketentuan"
          lastUpdated="Agustus 2026"
          description="Halaman ini menjelaskan aturan main saat kamu menggunakan website Anka Entertainment. Bahasanya kami buat sederhana, tapi tetap mengikat secara hukum."
          toc={TOC}
        >
          <section id="intro">
            <h2>1. Pengantar</h2>
            <p>
              Selamat datang di Anka Entertainment. Website ini (selanjutnya
              disebut <strong>&ldquo;Website&rdquo;</strong>) dimiliki dan
              dioperasikan oleh PT Anka Sembilan Delapan (selanjutnya disebut{" "}
              <strong>&ldquo;kami&rdquo;</strong>), berbadan hukum Republik
              Indonesia.
            </p>
            <p>
              Syarat dan ketentuan ini mengatur akses dan penggunaan Website
              oleh kamu. Mohon dibaca dengan teliti sebelum menggunakan
              layanan kami.
            </p>
          </section>

          <section id="acceptance">
            <h2>2. Penerimaan Ketentuan</h2>
            <p>
              Dengan mengakses, browsing, atau menggunakan fitur apa pun di
              Website (termasuk mengirim submission), kamu dianggap telah
              membaca, memahami, dan menyetujui untuk terikat pada syarat dan
              ketentuan ini, beserta{" "}
              <a href="/privacy">Kebijakan Privasi</a> dan{" "}
              <a href="/cookies">Kebijakan Cookie</a> kami.
            </p>
            <p>
              Kalau kamu tidak setuju dengan ketentuan ini, mohon untuk tidak
              menggunakan Website.
            </p>
          </section>

          <section id="use-of-site">
            <h2>3. Penggunaan Website</h2>
            <p>
              Kamu berhak mengakses dan menggunakan Website untuk tujuan
              pribadi dan non-komersial yang sah. Saat menggunakan Website,
              kamu setuju untuk tidak:
            </p>
            <ul>
              <li>
                Menggunakan Website untuk aktivitas yang melanggar hukum
                Indonesia atau hukum yurisdiksi kamu
              </li>
              <li>
                Mencoba mengakses bagian Website yang tidak diperuntukkan
                untuk publik (misalnya area admin, database, atau API
                internal)
              </li>
              <li>
                Mengirim virus, malware, atau kode berbahaya lain melalui form
                atau channel komunikasi
              </li>
              <li>
                Melakukan scraping otomatis, harvesting, atau pengumpulan data
                massal tanpa izin tertulis dari kami
              </li>
              <li>
                Mengganggu atau membebani server, jaringan, atau infrastruktur
                Website
              </li>
              <li>
                Menyamar sebagai pihak lain atau memberikan informasi palsu
                saat mengirim submission
              </li>
            </ul>
          </section>

          <section id="submissions">
            <h2>4. Submission Demo</h2>
            <p>
              Form submission di halaman <a href="/submit">/submit</a>{" "}
              tersedia untuk artist yang ingin mengirim demo musik atau
              request kerja sama. Saat mengirim submission, kamu menyatakan
              dan menjamin bahwa:
            </p>
            <ul>
              <li>
                <strong>Kamu adalah pemilik sah</strong> atau memiliki izin
                penuh untuk membagikan karya musik yang kamu kirim
              </li>
              <li>
                <strong>Tidak ada kontrak eksklusif</strong> dengan label atau
                penerbit lain yang melarang kamu membagikan karya tersebut ke
                kami
              </li>
              <li>
                Karya yang kamu kirim <strong>tidak melanggar hak cipta</strong>,
                merek dagang, atau hak intelektual pihak lain
              </li>
              <li>
                Informasi yang kamu berikan dalam form{" "}
                <strong>akurat dan tidak menyesatkan</strong>
              </li>
            </ul>

            <h3>4.1 Tidak Ada Jaminan Penerimaan</h3>
            <p>
              Mengirim submission <em>tidak otomatis</em> berarti kamu akan
              diterima sebagai bagian dari roster kami. Kami berhak menolak
              submission tanpa memberi alasan spesifik. Volume submission yang
              masuk juga memungkinkan kami tidak bisa membalas setiap
              pengirim secara individual.
            </p>

            <h3>4.2 Kerahasiaan</h3>
            <p>
              Kami memperlakukan submission kamu sebagai informasi rahasia
              dalam batas wajar — kami tidak akan membagikan demo kamu ke
              pihak ketiga tanpa izin. Namun, kami tidak menandatangani NDA
              terpisah untuk submission masuk; ketentuan ini sudah merupakan
              komitmen kami secara umum.
            </p>
          </section>

          <section id="intellectual-property">
            <h2>5. Hak Kekayaan Intelektual</h2>
            <p>
              Seluruh konten yang ada di Website — termasuk tapi tidak
              terbatas pada teks, grafik, logo, ikon, gambar, audio, video,
              layout, source code, dan desain — adalah milik PT Anka Sembilan
              Delapan atau pemberi lisensinya, dan dilindungi undang-undang
              hak cipta dan hak kekayaan intelektual yang berlaku di Indonesia
              dan internasional.
            </p>
            <p>
              Kamu dilarang menyalin, memodifikasi, mendistribusikan,
              menjual, atau melakukan reverse-engineering terhadap bagian
              apa pun dari Website tanpa izin tertulis sebelumnya dari kami.
            </p>
            <p>
              Penggunaan logo, nama brand &ldquo;Anka&rdquo;, &ldquo;Anka
              Entertainment&rdquo;, &ldquo;Anka Group&rdquo;, atau turunannya
              untuk tujuan komersial atau yang dapat menimbulkan kebingungan
              terhadap afiliasi tidak diperbolehkan tanpa izin tertulis kami.
            </p>
          </section>

          <section id="user-content">
            <h2>6. Konten yang Kamu Berikan</h2>
            <p>
              Saat kamu mengirim demo, file, atau informasi lain melalui form
              di Website, kamu memberikan kami lisensi terbatas untuk:
            </p>
            <ul>
              <li>
                <strong>Menyimpan dan mereview</strong> konten kamu untuk
                keperluan evaluasi submission
              </li>
              <li>
                <strong>Membagikan secara internal</strong> kepada tim Anka
                untuk proses keputusan
              </li>
              <li>
                <strong>Mengarsipkan</strong> sesuai periode retensi yang
                dijelaskan di Kebijakan Privasi
              </li>
            </ul>
            <p>
              Lisensi ini bersifat <strong>non-eksklusif</strong>, terbatas
              pada tujuan di atas, dan otomatis berakhir saat data kamu
              dihapus dari sistem kami. Kamu <em>tetap memegang penuh hak
              cipta</em> atas karya yang kamu kirim — kami tidak mengklaim
              kepemilikan apa pun atas demo submission.
            </p>
          </section>

          <section id="third-party">
            <h2>7. Tautan & Layanan Pihak Ketiga</h2>
            <p>
              Website mungkin berisi tautan ke website pihak ketiga (seperti
              Spotify, Apple Music, Instagram, YouTube, sister company kami
              Lantuns, dan lainnya). Tautan ini disediakan untuk kenyamanan
              kamu, dan kami tidak bertanggung jawab atas konten, kebijakan
              privasi, atau praktik website pihak ketiga tersebut.
            </p>
            <p>
              Akses kamu ke website pihak ketiga sepenuhnya merupakan
              tanggung jawab kamu sendiri.
            </p>
          </section>

          <section id="disclaimers">
            <h2>8. Disclaimer</h2>
            <p>
              Website disediakan secara <em>&ldquo;apa adanya&rdquo;</em> dan{" "}
              <em>&ldquo;sebagaimana tersedia&rdquo;</em>. Kami tidak
              memberikan jaminan, eksplisit maupun implisit, tentang:
            </p>
            <ul>
              <li>
                Akurasi, kelengkapan, atau ketepatan waktu informasi yang
                disampaikan di Website
              </li>
              <li>
                Bahwa Website akan berjalan tanpa gangguan, bebas dari error,
                atau bebas dari komponen berbahaya
              </li>
              <li>
                Hasil yang akan didapatkan dari penggunaan Website atau
                layanan kami
              </li>
            </ul>
            <p>
              Kami berusaha menjaga Website tetap up-to-date dan akurat,
              tapi informasi dapat berubah tanpa pemberitahuan sebelumnya.
            </p>
          </section>

          <section id="limitation">
            <h2>9. Pembatasan Tanggung Jawab</h2>
            <p>
              Sejauh diizinkan oleh hukum yang berlaku, PT Anka Sembilan
              Delapan beserta direksi, karyawan, dan afiliasinya{" "}
              <strong>tidak bertanggung jawab</strong> atas kerugian
              langsung, tidak langsung, insidental, konsekuensial, atau
              khusus yang timbul dari:
            </p>
            <ul>
              <li>Penggunaan atau ketidakmampuan menggunakan Website</li>
              <li>Akses tidak sah pada data atau transmisi kamu</li>
              <li>
                Pernyataan atau perilaku pihak ketiga di Website atau melalui
                tautan eksternal
              </li>
              <li>Hal lain terkait Website atau layanan kami</li>
            </ul>
            <p>
              Pembatasan ini berlaku terlepas dari dasar hukum klaim
              (kontrak, kelalaian, tort, atau lainnya) dan bahkan kalau kami
              sudah diberi tahu tentang kemungkinan kerugian tersebut.
            </p>
          </section>

          <section id="indemnification">
            <h2>10. Ganti Rugi</h2>
            <p>
              Kamu setuju untuk membela, mengganti rugi, dan membebaskan kami
              dari segala klaim, kerugian, kewajiban, biaya, dan pengeluaran
              (termasuk biaya hukum yang wajar) yang timbul dari:
            </p>
            <ul>
              <li>Pelanggaran kamu terhadap syarat dan ketentuan ini</li>
              <li>
                Pelanggaran kamu terhadap hak kekayaan intelektual atau hak
                lain dari pihak ketiga
              </li>
              <li>Konten yang kamu kirim ke Website yang melanggar hukum</li>
              <li>Penggunaan Website oleh kamu dengan cara yang melanggar hukum</li>
            </ul>
          </section>

          <section id="termination">
            <h2>11. Penghentian</h2>
            <p>
              Kami berhak, atas kebijakan kami sendiri, menghentikan atau
              membatasi akses kamu ke Website kapan saja, dengan atau tanpa
              pemberitahuan, untuk alasan apa pun, termasuk pelanggaran
              terhadap syarat dan ketentuan ini.
            </p>
            <p>
              Bagian dari syarat dan ketentuan ini yang berdasarkan sifatnya
              tetap berlaku setelah penghentian (seperti hak kekayaan
              intelektual, pembatasan tanggung jawab, dan ganti rugi) akan
              tetap berlaku.
            </p>
          </section>

          <section id="governing-law">
            <h2>12. Hukum yang Berlaku</h2>
            <p>
              Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai
              dengan <strong>hukum Republik Indonesia</strong>. Setiap
              perselisihan yang timbul terkait penggunaan Website akan
              diselesaikan terlebih dahulu melalui musyawarah. Kalau tidak
              tercapai kesepakatan, perselisihan akan diselesaikan di
              pengadilan yang berwenang di wilayah hukum Indonesia.
            </p>
          </section>

          <section id="changes">
            <h2>13. Perubahan Ketentuan</h2>
            <p>
              Kami dapat memperbarui syarat dan ketentuan ini dari waktu ke
              waktu. Tanggal &ldquo;Terakhir diperbarui&rdquo; di atas akan
              kami refresh setiap ada perubahan. Untuk perubahan signifikan,
              kami akan beri tahu lewat banner di Website.
            </p>
            <p>
              Penggunaan Website setelah perubahan dipublikasikan dianggap
              sebagai persetujuan terhadap ketentuan baru.
            </p>
          </section>

          <section id="contact">
            <h2>14. Hubungi Kami</h2>
            <p>Pertanyaan terkait syarat dan ketentuan ini bisa diarahkan ke:</p>
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
              Kami berusaha bermain dengan adil. Kalau ada yang kurang jelas,
              kabari kami.
            </p>
          </section>
        </LegalPageLayout>
      </main>
      <SiteFooter />
    </>
  );
}
