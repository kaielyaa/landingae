import type { Metadata } from "next";
import "./globals.css";
import { CookieBanner } from "@/components/cookie-banner";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Anka Entertainment — Label Musik Independen Indonesia",
  description:
    "Label musik independen Indonesia sejak 2021. Develop, record, release.",
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
    <html lang="id" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
