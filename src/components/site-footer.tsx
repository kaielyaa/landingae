import Image from "next/image";
import Link from "next/link";
import {
  InstagramIcon,
  LinkedinIcon,
  TikTokIcon,
  YoutubeIcon,
} from "@/components/social-icons";

const socials = [
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
  { label: "TikTok", href: "https://tiktok.com", Icon: TikTokIcon },
  { label: "YouTube", href: "https://youtube.com", Icon: YoutubeIcon },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedinIcon },
];

const tentangLinks = [
  { label: "Tentang", href: "/about" },
  { label: "Layanan", href: "/services" },
  { label: "Anka Group", href: "/anka-group" },
];

const karyaLinks = [
  { label: "Roster", href: "/roster" },
  { label: "Katalog", href: "/catalog" },
  { label: "Karya Produksi", href: "/catalog" },
  { label: "Cover & Reinterpretasi", href: "/catalog" },
];

const legalLinks = [
  { label: "Privasi", href: "/privacy" },
  { label: "Ketentuan", href: "/terms" },
  { label: "Kebijakan Cookie", href: "/cookies" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-[12px] font-bold uppercase tracking-wide text-muted">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-[14px] text-foreground/90 transition-colors duration-fast ease-keluar hover:text-foreground"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-2">
      <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)] py-16">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2.5 text-[15px] font-bold tracking-tight"
            >
              <Image
                src="/apple-touch-icon.png"
                alt="Anka Entertainment"
                width={24}
                height={24}
                className="flex-none"
              />
              Anka Entertainment
            </Link>
            <p className="mt-4 max-w-[26ch] text-[14px] leading-[1.6] text-muted">
              Label musik independen Indonesia.
              <br />
              Sejak 2021.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              {socials.map(({ label, href, Icon }) => (
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
          </div>

          <FooterColumn title="Tentang" links={tentangLinks} />
          <FooterColumn title="Karya" links={karyaLinks} />

          <div>
            <h3 className="text-[12px] font-bold uppercase tracking-wide text-muted">
              Kontak
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:hello@ankaentertainment.com"
                  className="text-[14px] text-foreground/90 transition-colors duration-fast ease-keluar hover:text-foreground"
                >
                  hello@ankaentertainment.com
                </a>
              </li>
              <li className="text-[14px] text-muted">Indonesia</li>
              <li>
                <Link
                  href="/submit"
                  className="text-[14px] font-bold text-foreground underline decoration-border underline-offset-4 transition-colors duration-fast ease-keluar hover:decoration-foreground"
                >
                  Kirim Demo
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-[var(--content-max)] flex-wrap items-center justify-between gap-3 px-[var(--page-gutter)] py-6 text-[12px] text-muted">
          <span>
            © 2026 Anka Entertainment · Part of Anka Group · PT Anka
            Sembilan Delapan
          </span>
          <div className="flex flex-wrap items-center gap-4">
            {legalLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="transition-colors duration-fast ease-keluar hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <span className="chip py-1 text-[11px]">Roster: 1 aktif</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
