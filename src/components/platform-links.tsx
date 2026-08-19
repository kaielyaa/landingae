import type { ComponentType } from "react";
import { AppleMusicIcon, SpotifyIcon } from "@/components/social-icons";

type IconProps = { className?: string };

export type Platform = {
  label: string;
  href: string;
  Icon: ComponentType<IconProps>;
};

/** Daftar per-artist, bukan satu daftar global — tiap artist bisa punya
 * kombinasi platform beda (belum tentu semua ada di semua platform).
 * `PlatformLinks` sengaja dibikin `flex-wrap` biar tetap rapi baik cuma
 * 1 platform maupun lebih dari itu, gak ada layout yang di-hardcode buat
 * 2 tombol doang. */
export const dbProjectPlatforms: Platform[] = [
  { label: "Spotify", href: "https://open.spotify.com", Icon: SpotifyIcon },
  {
    label: "Apple Music",
    href: "https://music.apple.com",
    Icon: AppleMusicIcon,
  },
];

export function PlatformLinks({ platforms }: { platforms: Platform[] }) {
  if (platforms.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {platforms.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-[14px] font-semibold text-foreground transition-colors duration-fast ease-keluar hover:bg-hover"
        >
          <Icon className="h-4 w-4" />
          {label}
        </a>
      ))}
    </div>
  );
}
