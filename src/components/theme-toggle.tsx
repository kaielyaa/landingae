"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/** True only after hydration — avoids a server/client mismatch on the
 * icon, since resolvedTheme is unknown until next-themes reads localStorage. */
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/** `withLabel` = versi baris berteks untuk menu mobile; bawaan ikon saja. */
export function ThemeToggle({ withLabel = false }: { withLabel?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return <span className={withLabel ? "h-11" : "h-9 w-9 flex-none"} aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  if (withLabel) {
    return (
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="inline-flex h-11 items-center gap-2.5 rounded-md border border-border px-4 text-[14px] font-medium text-foreground transition-colors duration-fast ease-out hover:bg-hover"
      >
        {isDark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
        {isDark ? "Mode terang" : "Mode gelap"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Pakai mode terang" : "Pakai mode gelap"}
      className="flex h-9 w-9 flex-none items-center justify-center rounded-md border border-border text-foreground transition-colors duration-fast ease-out hover:bg-hover"
    >
      {isDark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
    </button>
  );
}
