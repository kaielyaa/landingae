import type { ReactNode } from "react";
import { Sticker } from "@/components/ui/sticker";

/** Stiker invert di tengah paragraf (mis. setiap menyebut "Lantuns").
 * Pintasan untuk `<Sticker tone="invert" size="inline">`. */
export function InlineTag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Sticker tone="invert" size="inline" className={className}>
      {children}
    </Sticker>
  );
}
