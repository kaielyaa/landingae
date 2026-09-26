import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CookieBanner } from "@/components/cookie-banner";
import { ScrollTopOnReload } from "@/components/scroll-top-on-reload";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/lib/site";

// Cabinet Grotesk (Fontshare, ITF Free Font License) — di-host sendiri,
// bukan CDN, biar gak gantung uptime Fontshare. Tiga ketebalan (batas
// standar empat): 400 isi · 500 label · 700 judul & display.
const cabinet = localFont({
  src: [
    { path: "./fonts/CabinetGrotesk-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/CabinetGrotesk-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/CabinetGrotesk-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-cabinet",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Anka Entertainment — Label Musik Independen Indonesia",
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "id_ID",
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${cabinet.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <ScrollTopOnReload />
          {children}
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
