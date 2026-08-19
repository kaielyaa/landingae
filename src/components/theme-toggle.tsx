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

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return <span className="h-9 w-9 flex-none" aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Pakai mode terang" : "Pakai mode gelap"}
      className="flex h-9 w-9 flex-none items-center justify-center rounded-md border border-border text-foreground transition-colors duration-fast ease-keluar hover:bg-hover"
    >
      {isDark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
    </button>
  );
}
