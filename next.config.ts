import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Khusus dev: izinkan buka dev server dari HP lewat Wi-Fi rumah (LAN)
  // dan Tailscale. Tidak berpengaruh ke build produksi.
  allowedDevOrigins: ["192.168.0.101", "100.123.250.65"],
};

export default nextConfig;
