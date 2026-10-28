"use client";

import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, transition, toggleTheme } = useTheme();
  const dark = theme === "dark";
  const label = dark
    ? "Switch to dawn theme. Plays a short sound."
    : "Switch to ember theme. Plays a short sound.";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={dark}
      aria-label={label}
      data-busy={transition ? "true" : "false"}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card/80 px-3 text-sm font-medium shadow-sm backdrop-blur transition hover:border-primary/50 focus-visible:outline-none"
    >
      <span
        aria-hidden="true"
        className="relative h-5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--saber)]"
      >
        <span className="absolute inset-x-[2px] top-0.5 bottom-0.5 rounded-full bg-white/90" />
      </span>
      <span className="theme-dawn">Dawn</span>
      <span className="theme-ember">Ember</span>
    </button>
  );
}
