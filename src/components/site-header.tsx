"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { stickerTones } from "@/components/ui/sticker";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

// Logo sudah jadi tautan ke Home, jadi tidak ada item "Beranda".
const navLinks = [
  { href: "/roster", label: "Roster" },
  { href: "/catalog", label: "Katalog" },
  { href: "/services", label: "Layanan" },
  { href: "/about", label: "Tentang" },
  { href: "/anka-group", label: "Anka Group" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Wordmark({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className="flex min-w-0 items-center gap-2.5 rounded-sm text-[15px] font-bold tracking-tight"
    >
      <Image
        src="/apple-touch-icon.png"
        alt=""
        width={24}
        height={24}
        className="flex-none"
        priority
      />
      {/* Di layar <360px nama tidak muat berdampingan dengan dua tombol —
          disembunyikan secara visual, tetap terbaca pembaca layar. */}
      <span className="whitespace-nowrap max-[359px]:sr-only">{site.name}</span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Header selalu tampil (Kaiel 2026-09-27: "sticky"); yang berubah cuma
  // latarnya — transparan di atas hero, agak transparan + blur setelah scroll.
  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      setScrolled(window.scrollY > 8);
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  function openMenu() {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    // Bawaan showModal() memfokuskan tautan pertama (logo), dan di HP itu
    // tampil sebagai logo yang ter-highlight. Fokus ditaruh di dialog-nya;
    // Tab berikutnya tetap masuk ke tautan pertama.
    dialog.focus();
    setMenuOpen(true);
  }

  function closeMenu() {
    dialogRef.current?.close();
  }

  return (
    <>
      <header
        // Jangkar transisi halaman — lihat ::view-transition-*(site-header).
        style={{ viewTransitionName: "site-header" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-base ease-out",
          // Blur = pengecualian sadar dari daftar haram "glass" — diminta
          // Kaiel; tanpa blur, teks di belakang latar transparan mengganggu
          // keterbacaan nav.
          scrolled
            ? "border-border bg-background/80 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[var(--content-max)] items-center gap-6 px-[var(--page-gutter)]">
          <Wordmark />

          <nav aria-label="Utama" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((l) => {
                const active = isActive(pathname, l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "inline-flex h-8 items-center rounded-sm px-2.5 text-[14px] font-medium transition-colors duration-fast ease-out",
                        active
                          ? cn(stickerTones("invert"), "-rotate-1")
                          : "text-muted underline-offset-[6px] hover:text-foreground hover:underline",
                      )}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            <ButtonLink href="/submit" size="sm">
              Kirim Demo
            </ButtonLink>
            <button
              type="button"
              onClick={openMenu}
              aria-label="Buka menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              className="flex h-9 w-9 flex-none items-center justify-center rounded-md border border-border text-foreground transition-colors duration-fast ease-out hover:bg-hover lg:hidden"
            >
              <Menu size={18} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile & tablet (<1024px — di 768px lima item nav + tombol
          tidak muat satu baris): <dialog> modal — fokus terkunci di dalam, Esc
          menutup, halaman belakang inert. Isinya ditulis besar bernomor
          seperti tracklist (tanda tangan 2). */}
      <dialog
        ref={dialogRef}
        id="menu-mobile"
        aria-label="Menu"
        tabIndex={-1}
        onClose={() => setMenuOpen(false)}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-background p-0 text-foreground outline-none open:flex open:animate-menu-in open:flex-col backdrop:bg-transparent lg:hidden"
      >
        <div className="flex h-16 flex-none items-center gap-6 border-b border-border px-[var(--page-gutter)]">
          <Wordmark onNavigate={closeMenu} />
          <div className="ml-auto flex items-center gap-2">
            <ButtonLink href="/submit" size="sm" onClick={closeMenu}>
              Kirim Demo
            </ButtonLink>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Tutup menu"
              className="flex h-9 w-9 flex-none items-center justify-center rounded-md border border-border text-foreground transition-colors duration-fast ease-out hover:bg-hover"
            >
              <X size={18} aria-hidden />
            </button>
          </div>
        </div>

        <nav
          aria-label="Utama"
          className="flex-1 overflow-y-auto px-[var(--page-gutter)] pt-8 pb-6"
        >
          <ol>
            {navLinks.map((l, i) => {
              const active = isActive(pathname, l.href);
              return (
                <li
                  key={l.href}
                  className="border-b border-border animate-menu-item-in"
                  style={{ animationDelay: `${60 + i * 40}ms` }}
                >
                  <Link
                    href={l.href}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className="flex items-baseline gap-4 py-4"
                  >
                    <span className="w-6 flex-none text-[13px] font-medium text-muted tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "rounded-md px-2 -mx-2 text-[34px] font-bold leading-[1.1] tracking-tight",
                        active && cn(stickerTones("invert"), "-rotate-1"),
                      )}
                    >
                      {l.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="flex flex-none flex-wrap items-center justify-between gap-4 border-t border-border px-[var(--page-gutter)] py-5">
          <ThemeToggle withLabel />
          <a
            href={`mailto:${site.contactEmail}`}
            className="text-[14px] font-medium text-muted underline-offset-4 hover:text-foreground hover:underline"
          >
            {site.contactEmail}
          </a>
        </div>
      </dialog>
    </>
  );
}
