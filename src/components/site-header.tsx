"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/roster", label: "Roster" },
  { href: "/catalog", label: "Katalog" },
  { href: "/services", label: "Layanan" },
  { href: "/about", label: "Tentang" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-base ease-keluar",
        scrolled
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex w-full max-w-[var(--content-max)] items-center justify-between px-[var(--page-gutter)] py-4">
        <div className="flex items-center gap-2.5 text-[15px] font-bold tracking-tight">
          <Image
            src="/apple-touch-icon.png"
            alt="Anka Entertainment"
            width={24}
            height={24}
            className="flex-none"
            priority
          />
          Anka Entertainment
        </div>
        <nav className="hidden gap-7 text-[13px] font-medium text-muted md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors duration-fast ease-keluar hover:text-foreground aria-[current=page]:text-foreground"
              aria-current={pathname === l.href ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/submit"
            className="rounded-md bg-primary px-5 py-2.5 text-[13px] font-bold text-primary-foreground transition-transform duration-fast ease-keluar hover:-translate-y-0.5"
          >
            Kirim Demo
          </Link>
        </div>
      </div>
    </header>
  );
}
