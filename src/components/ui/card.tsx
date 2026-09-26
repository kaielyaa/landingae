import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Kartu hanya untuk membandingkan hal yang sejajar (dua brand, dua jalur),
 * bukan wadah bawaan. Kartu diam pakai border, bukan bayangan. Radius lg
 * (16px). */
export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-lg border border-border bg-surface p-6 md:p-8", className)}
      {...props}
    />
  );
}
