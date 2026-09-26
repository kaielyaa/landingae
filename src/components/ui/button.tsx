import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "invert" | "outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  // Aksi utama. Satu per layar kalau bisa.
  primary: "bg-primary text-primary-foreground",
  // Aksi kedua yang tetap tegas — hitam di light, putih di dark.
  invert: "bg-foreground text-background",
  // Aksi pelengkap.
  outline: "border border-border text-foreground hover:bg-hover",
};

// Tinggi tetap per ukuran (bukan dari padding) supaya tombol sejajar
// dengan elemen lain setinggi sama. Radius md (12px) = 27–33% tinggi.
const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-[14px]",
  lg: "h-12 px-6 text-[15px]",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-bold whitespace-nowrap",
    "transition-[translate,background-color] duration-fast ease-out",
    "hover:-translate-y-0.5 active:translate-y-0",
    "aria-disabled:pointer-events-none aria-disabled:opacity-60 disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
}

type StyleProps = { variant?: Variant; size?: Size };

/** Tombol untuk aksi di halaman yang sama. Pindah halaman → `ButtonLink`. */
export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & StyleProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
}

/** Tautan yang tampil sebagai tombol. */
export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & StyleProps) {
  return <Link className={buttonStyles({ variant, size, className })} {...props} />;
}
