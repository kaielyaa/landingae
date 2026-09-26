import type { ComponentType } from "react";
import { AppleMusicIcon, SpotifyIcon, YoutubeIcon } from "@/components/social-icons";

type IconProps = { className?: string };

export type Platform = {
  label: string;
  href: string;
  Icon: ComponentType<IconProps>;
};

/** Bangun daftar link platform streaming dari field opsional di data
 * artist/rilisan (`spotify`/`appleMusic`/`youtube`) — dipakai di mana pun
 * ada entity yang punya field-field ini (artist, release), biar gak ada
 * lagi if/push manual yang ke-copy-paste per halaman. */
export function buildPlatformLinks(entity: {
  spotify?: string;
  appleMusic?: string;
  youtube?: string;
}): Platform[] {
  const platforms: Platform[] = [];
  if (entity.spotify) {
    platforms.push({ label: "Spotify", href: entity.spotify, Icon: SpotifyIcon });
  }
  if (entity.appleMusic) {
    platforms.push({
      label: "Apple Music",
      href: entity.appleMusic,
      Icon: AppleMusicIcon,
    });
  }
  if (entity.youtube) {
    platforms.push({ label: "YouTube", href: entity.youtube, Icon: YoutubeIcon });
  }
  return platforms;
}

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
          className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-[14px] font-semibold text-foreground transition-colors duration-fast ease-out hover:bg-hover"
        >
          <Icon className="h-4 w-4" />
          {label}
        </a>
      ))}
    </div>
  );
}
