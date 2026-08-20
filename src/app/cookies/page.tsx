import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal-page-layout";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Kebijakan Cookie — Anka Entertainment",
  description:
    "Apa itu cookie, jenis cookie yang kami gunakan, dan cara mengelola preferensinya.",
};

const TOC = [
  { id: "intro", label: "Pengantar" },
  { id: "what-are-cookies", label: "Apa itu Cookie" },
  { id: "types", label: "Jenis Cookie yang Kami Gunakan" },
  { id: "third-party", label: "Cookie Pihak Ketiga" },
  { id: "manage", label: "Mengelola Preferensi Cookie" },
  { id: "browser", label: "Pengaturan di Browser" },
  { id: "consent", label: "Persetujuan Kamu" },
  { id: "changes", label: "Perubahan Kebijakan" },
  { id: "contact", label: "Hubungi Kami" },
];

export default function CookiesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <LegalPageLayout
          title="Kebijakan Cookie"
          lastUpdated="Agustus 2026"
          description="Halaman ini menjelaskan apa itu cookie, cookie apa saja yang kami gunakan, dan bagaimana kamu bisa mengontrol preferensinya. Kami percaya transparansi soal teknologi yang kami pakai."
          toc={TOC}
        >
          <section id="intro">
            <h2>1. Pengantar</h2>
            <p>
              Anka Entertainment menggunakan cookie dan teknologi serupa
              untuk membuat website berfungsi dengan baik dan memahami
              bagaimana pengunjung berinteraksi dengan konten kami.
            </p>
            <p>
              Halaman ini melengkapi <a href="/privacy">Kebijakan Privasi</a>{" "}
              kami. Untuk gambaran lengkap tentang bagaimana kami menangani
              data kamu, baca kebijakan privasi terlebih dahulu.
            </p>
          </section>

          <section id="what-are-cookies">
            <h2>2. Apa itu Cookie</h2>
            <p>
              Cookie adalah file teks kecil yang disimpan di perangkat kamu
              (komputer, tablet, atau handphone) saat kamu mengunjungi
              sebuah website. Cookie membantu website mengingat preferensi
              kamu dan informasi lain untuk pengalaman yang lebih baik.
            </p>
            <p>Cookie umumnya dibagi berdasarkan:</p>
            <ul>
              <li>
                <strong>Durasi</strong> — cookie sesi (terhapus saat kamu
                tutup browser) atau cookie persisten (tetap ada untuk
                periode tertentu)
              </li>
              <li>
                <strong>Asal</strong> — cookie pihak pertama (dipasang oleh
                kami) atau cookie pihak ketiga (dipasang oleh layanan
                eksternal)
              </li>
              <li>
                <strong>Tujuan</strong> — fungsional, analitik, atau
                marketing
              </li>
            </ul>
          </section>

          <section id="types">
            <h2>3. Jenis Cookie yang Kami Gunakan</h2>
            <p>
              Website kami menggunakan cookie minimal, hanya yang
              benar-benar dibutuhkan untuk fungsi website dan analitik
              dasar. Tidak ada cookie marketing, tracking lintas situs, atau
              profiling iklan.
            </p>

            <h3>3.1 Cookie Esensial</h3>
            <p>
              Diperlukan agar website berfungsi dengan baik. Cookie ini
              tidak bisa dimatikan tanpa mengganggu fungsi dasar website.
            </p>
            <ul>
              <li>
                <strong>Session cookie</strong> — menjaga state form
                submission kamu saat mengisi data di halaman{" "}
                <a href="/submit">/submit</a>
              </li>
              <li>
                <strong>Cookie consent</strong> — menyimpan preferensi
                cookie kamu supaya banner tidak muncul terus
              </li>
            </ul>

            <h3>3.2 Cookie Analitik</h3>
            <p>
              Membantu kami memahami bagaimana pengunjung menggunakan
              website secara <em>agregat</em>, bukan individual. Data yang
              dikumpulkan dianonimkan.
            </p>
            <ul>
              <li><strong>Halaman yang dikunjungi</strong> — page view dan navigasi</li>
              <li>
                <strong>Sumber rujukan</strong> — dari mana kamu datang
                (Google, sosial media, link langsung, dll)
              </li>
              <li>
                <strong>Perangkat dan browser</strong> — biar kami tahu
                konten kami tampil baik di device kamu
              </li>
              <li>
                <strong>Durasi kunjungan</strong> — untuk memahami bagian
                website yang menarik perhatian
              </li>
            </ul>
            <p>
              Cookie analitik bersifat opsional. Kamu bisa menonaktifkannya
              lewat banner cookie atau pengaturan browser tanpa mempengaruhi
              fungsi dasar website.
            </p>
          </section>

          <section id="third-party">
            <h2>4. Cookie Pihak Ketiga</h2>
            <p>
              Beberapa layanan yang kami gunakan untuk operasional website
              mungkin memasang cookie mereka sendiri. Kami sengaja memilih
              partner yang punya komitmen privasi yang sejalan.
            </p>

            <h3>4.1 Penyedia Analitik</h3>
            <p>
              Untuk analitik, kami menggunakan atau berencana menggunakan
              layanan yang <em>privacy-friendly</em>, tidak menggunakan
              tracking lintas situs atau fingerprinting. Data yang
              dikumpulkan bersifat agregat dan tidak dapat dikaitkan dengan
              identitas personal kamu.
            </p>

            <h3>4.2 Konten Tertanam</h3>
            <p>
              Kadang kami menyematkan konten dari layanan pihak ketiga
              seperti Spotify, YouTube, atau platform sosial media. Saat
              kamu berinteraksi dengan konten ini, layanan tersebut mungkin
              memasang cookie mereka sendiri sesuai kebijakan privasi
              masing-masing.
            </p>
            <p>
              Kami tidak mengontrol cookie pihak ketiga ini. Kalau kamu
              concern, gunakan ekstensi browser yang memblokir konten
              tertanam atau atur preferensi lewat browser.
            </p>
          </section>

          <section id="manage">
            <h2>5. Mengelola Preferensi Cookie</h2>
            <p>
              Saat pertama kali mengunjungi website, kamu akan melihat
              banner cookie di bagian bawah layar. Lewat banner ini, kamu
              bisa:
            </p>
            <ul>
              <li>
                <strong>Terima semua</strong> — mengizinkan cookie esensial
                dan analitik
              </li>
              <li>
                <strong>Tolak opsional</strong> — hanya mengizinkan cookie
                esensial yang dibutuhkan untuk fungsi website
              </li>
            </ul>
            <p>
              Pilihan kamu akan kami ingat lewat cookie consent. Kamu bisa
              mengubah preferensi kapan saja dengan menghapus cookie kami
              dari browser, lalu banner akan muncul kembali pada kunjungan
              berikutnya.
            </p>
          </section>

          <section id="browser">
            <h2>6. Pengaturan di Browser</h2>
            <p>Mayoritas browser modern memberikan kontrol langsung atas cookie. Kamu bisa:</p>
            <ul>
              <li>Memblokir semua cookie</li>
              <li>Memblokir hanya cookie pihak ketiga</li>
              <li>Menghapus cookie yang sudah tersimpan</li>
              <li>Mengaktifkan mode privat/incognito untuk sesi tanpa cookie persisten</li>
            </ul>
            <p>Panduan untuk browser populer:</p>
            <ul>
              <li>
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
                  Google Chrome
                </a>
              </li>
              <li>
                <a href="https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer">
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer">
                  Safari
                </a>
              </li>
              <li>
                <a href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">
                  Microsoft Edge
                </a>
              </li>
            </ul>
            <p>
              Perlu diingat: memblokir semua cookie dapat memengaruhi
              pengalaman di banyak website, termasuk website kami.
            </p>
          </section>

          <section id="consent">
            <h2>7. Persetujuan Kamu</h2>
            <p>
              Saat pertama kali mengunjungi website, kami meminta
              persetujuan untuk memasang cookie analitik. Cookie esensial
              dipasang secara default karena dibutuhkan untuk fungsi dasar
              website.
            </p>
            <p>
              Dengan melanjutkan menggunakan website setelah memberikan
              persetujuan, kamu dianggap setuju dengan kebijakan cookie ini.
            </p>
          </section>

          <section id="changes">
            <h2>8. Perubahan Kebijakan</h2>
            <p>
              Kebijakan cookie ini dapat diperbarui dari waktu ke waktu
              seiring perubahan teknologi atau layanan yang kami gunakan.
              Tanggal &ldquo;Terakhir diperbarui&rdquo; di atas akan kami
              refresh setiap ada perubahan.
            </p>
            <p>
              Untuk perubahan signifikan, kami akan menampilkan banner
              cookie kembali supaya kamu bisa review dan memberikan
              persetujuan ulang.
            </p>
          </section>

          <section id="contact">
            <h2>9. Hubungi Kami</h2>
            <p>Pertanyaan terkait kebijakan cookie ini bisa diarahkan ke:</p>
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
            <p className="closing">Sedikit cookie. Hanya yang dibutuhkan.</p>
          </section>
        </LegalPageLayout>
      </main>
      <SiteFooter />
    </>
  );
}
