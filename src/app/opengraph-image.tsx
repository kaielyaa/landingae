import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/** Gambar bagikan (OpenGraph/Twitter) 1200×630 untuk semua halaman — hero
 * Home dalam bentuk gambar: tiga stiker di judul.
 *
 * Warna di sini hex, bukan token: ImageResponse tidak membaca variabel CSS.
 * Nilainya konversi langsung dari token mode gelap di globals.css — kalau
 * token berubah, ubah juga di sini. Font: Cabinet Grotesk Bold TTF
 * (Satori tidak membaca woff2), khusus untuk gambar ini. */
export const alt = `${site.name} — label musik independen Indonesia`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const c = {
  background: "#020406", // --n-950
  foreground: "#f0f4f6", // --foreground (dark)
  muted: "#868d93", // --muted (dark)
  border: "#20282d", // --n-800
  primary: "#48aae5", // --brand-400
  primaryFg: "#050d14",
  accent: "#c97ce1", // --pink-400
  accentFg: "#100912",
};

/** `tail`: jarak kanan kecil kalau langsung diikuti tanda baca. */
function Sticker({
  bg,
  fg,
  tilt,
  tail = false,
  children,
}: {
  bg: string;
  fg: string;
  tilt: number;
  tail?: boolean;
  children: string;
}) {
  return (
    <span
      style={{
        display: "flex",
        background: bg,
        color: fg,
        padding: "2px 20px 10px",
        lineHeight: 1,
        letterSpacing: 0,
        borderRadius: 14,
        transform: `rotate(${tilt}deg)`,
        margin: tail ? "0 4px 0 16px" : "0 16px",
      }}
    >
      {children}
    </span>
  );
}

export default async function OpengraphImage() {
  const bold = await readFile(
    join(process.cwd(), "src/app/fonts/og/CabinetGrotesk-Bold.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: c.background,
          color: c.foreground,
          padding: "64px 72px",
          fontFamily: "Cabinet Grotesk",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: -0.5 }}>
          {site.name}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 84,
            lineHeight: 1.45,
            letterSpacing: -2,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            Label musik
            <Sticker bg={c.primary} fg={c.primaryFg} tilt={-1} tail>
              independen
            </Sticker>
            ,
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            dari
            <Sticker bg={c.accent} fg={c.accentFg} tilt={1}>
              pop
            </Sticker>
            sampai
            <Sticker bg={c.foreground} fg={c.background} tilt={-1} tail>
              electronic
            </Sticker>
            .
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `1px solid ${c.border}`,
            paddingTop: 28,
            fontSize: 26,
            color: c.muted,
          }}
        >
          <span>Roster kecil, kontrak panjang.</span>
          <span>Sejak 2021 · Indonesia</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Cabinet Grotesk", data: bold, style: "normal", weight: 700 }],
    },
  );
}
