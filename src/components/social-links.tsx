import type { ComponentType } from "react";
import { InstagramIcon, TikTokIcon } from "@/components/social-icons";
import { cn } from "@/lib/utils";

type IconProps = { className?: string };

export type SocialLink = {
  label: string;
  href: string;
  Icon: ComponentType<IconProps>;
};

/** Bangun daftar link sosmed dari field opsional (`instagram`/`tiktok`) —
 * pasangan `buildPlatformLinks` di platform-links.tsx, cuma buat sosmed
 * (bukan platform streaming). Dua ini SENGAJA dipisah, bukan digabung
 * satu daftar — beda konteks (dengerin musik vs follow akun). */
export function buildSocialLinks(entity: {
  instagram?: string;
  tiktok?: string;
}): SocialLink[] {
  const links: SocialLink[] = [];
  if (entity.instagram) {
    links.push({ label: "Instagram", href: entity.instagram, Icon: InstagramIcon });
  }
  if (entity.tiktok) {
    links.push({ label: "TikTok", href: entity.tiktok, Icon: TikTokIcon });
  }
  return links;
}

/** Baris ikon sosmed bulat-kotak kecil — SEBELUMNYA ditulis manual di
 * `SiteFooter`, sekarang diekstrak biar bisa dipakai ulang di halaman
 * detail artist (`/roster/[slug]`) tanpa duplikasi. */
export function SocialIconLinks({
  links,
  className,
}: {
  links: SocialLink[];
  className?: string;
}) {
  if (links.length === 0) return null;

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors duration-fast ease-keluar hover:bg-hover hover:text-foreground"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
