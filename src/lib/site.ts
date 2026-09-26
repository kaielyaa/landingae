/** Data tingkat situs — satu sumber. Bentuknya mengikuti `siteSettings`
 * di skema Sanity lama, supaya nanti tinggal diganti `client.fetch()`.
 *
 * Link diambil dari footer situs lama (aelama/.../FooterClient.tsx).
 * Instagram: situs lama punya dua versi (lihat catatan.md) — ini versi
 * footer, belum dipastikan. */
export const site = {
  name: "Anka Entertainment",
  contactEmail: "hello@ankaentertainment.com",
  social: {
    instagram: "https://www.instagram.com/anka_entertainment/",
    tiktok: "https://tiktok.com/@ankaentertainment",
    youtube: "https://www.youtube.com/@ankaentertainment7166",
    linkedin: "https://linkedin.com/company/ankaentertainment",
  },
  /** Open call demo (skema lama: `openCallActive` + pesan tutup). Saat ini
   * TUTUP — keputusan Kaiel 2026-09-27: form & kirim email dikerjakan
   * belakangan (rencana.md Fase 7). Jangan diubah ke `true` sebelum form
   * di /submit dibangun. */
  openCall: {
    active: false,
    closedMessage:
      "Submission sedang tutup sementara. Kami akan membukanya lagi setelah review batch sebelumnya selesai — terima kasih atas pengertiannya.",
  },
} as const;
