import type { CSSProperties, ReactNode } from "react";
import { HeroChipField } from "@/components/hero-chip-field";
import { ScrollCue } from "@/components/scroll-cue";
import { ButtonLink } from "@/components/ui/button";
import { Sticker } from "@/components/ui/sticker";
import styles from "./hero.module.css";

/** Jeda antar-kata saat judul naik. */
const WORD_STEP = 50;

function delay(ms: number) {
  return { "--d": `${ms}ms` } as CSSProperties;
}

/** Satu kata judul yang naik dari balik garis. `i` = urutan kata. */
function Word({ i, children }: { i: number; children: ReactNode }) {
  return (
    <span className={styles.mask}>
      <span className={styles.word} style={delay(i * WORD_STEP)}>
        {children}
      </span>
    </span>
  );
}

/** Stiker yang "ditempel" setelah katanya naik. */
function IntroSticker({
  tone,
  tilt = "left",
  at,
  children,
}: {
  tone: "primary" | "accent" | "invert";
  tilt?: "left" | "right";
  at: number;
  children: ReactNode;
}) {
  const sweep = {
    primary: "var(--primary)",
    accent: "var(--accent)",
    invert: "var(--foreground)",
  }[tone];

  return (
    <Sticker
      tone={tone}
      tilt={tilt}
      className={styles.sticker}
      style={
        {
          "--d": `${at}ms`,
          "--sweep": sweep,
          "--tilt": tilt === "left" ? "-1deg" : "1deg",
        } as CSSProperties
      }
    >
      {children}
    </Sticker>
  );
}

/** Hero Home — DIKUNCI (arah.md). Isi dan susunan tidak diubah; yang
 * ditambahkan hanya animasi masuk. Headline = elemen paling besar. */
export function Hero() {
  return (
    <section className="relative flex min-h-dvh items-center py-24">
      <HeroChipField />

      <div className="relative z-10 mx-auto max-w-[80rem] px-[var(--page-gutter)] text-center">
        <h1 className="text-[clamp(34px,7vw,96px)] font-bold leading-[1.3] tracking-tight">
          <Word i={0}>Label</Word> <Word i={1}>musik</Word>{" "}
          <Word i={2}>
            <IntroSticker tone="primary" at={380}>
              independen
            </IntroSticker>
            ,
          </Word>{" "}
          <br className="hidden sm:block" />
          <Word i={3}>dari</Word>{" "}
          <Word i={4}>
            <IntroSticker tone="accent" tilt="right" at={540}>
              pop
            </IntroSticker>
          </Word>{" "}
          <Word i={5}>sampai</Word>{" "}
          <Word i={6}>
            <IntroSticker tone="invert" at={700}>
              electronic
            </IntroSticker>
            .
          </Word>
        </h1>
        <p
          className={`${styles.fadeUp} mx-auto mt-7 max-w-[46ch] text-[16px] leading-[1.65] text-muted`}
          style={delay(820)}
        >
          Roster kecil, kontrak panjang. Sejak 2021, kami develop, record, dan
          release lintas genre — bukan sekadar upload. Distribusi Musik
          ditangani sister company kami, Lantuns.
        </p>
        <div
          className={`${styles.fadeUp} mt-9 flex flex-wrap items-center justify-center gap-3`}
          style={delay(900)}
        >
          <ButtonLink href="/submit" size="lg">
            Kirim Demo
          </ButtonLink>
          <ButtonLink href="/roster" variant="invert" size="lg">
            Lihat Roster
          </ButtonLink>
        </div>
      </div>

      <ScrollCue
        target="#manifesto"
        className={styles.fadeUp}
        style={delay(1150)}
      />
    </section>
  );
}
