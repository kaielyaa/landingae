import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Khusus dev: izinkan buka dev server dari HP lewat Wi-Fi rumah (LAN)
  // dan Tailscale. Tidak berpengaruh ke build produksi.
  allowedDevOrigins: ["192.168.0.101", "100.123.250.65"],
  // Indikator "N" di pojok bawah menutupi tautan footer saat dicek di HP.
  // Error kompilasi/runtime tetap ditampilkan Next.
  devIndicators: false,
};

export default nextConfig;
