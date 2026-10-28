"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { playSaberIgnition } from "@/lib/saber-audio";
import { applyTheme, readTheme, type ThemeName } from "@/lib/theme";

export type BladeTransition = {
  id: number;
  from: ThemeName;
  to: ThemeName;
};

type ThemeContextValue = {
  theme: ThemeName;
  transition: BladeTransition | null;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const themeEvent = "itstar-theme";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(themeEvent, onStoreChange);
  return () => window.removeEventListener(themeEvent, onStoreChange);
}

function snapshot(): ThemeName {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function publishTheme() {
  window.dispatchEvent(new Event(themeEvent));
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, snapshot, () => "light" as const);
  const [transition, setTransition] = useState<BladeTransition | null>(null);
  const lock = useRef(false);

  useLayoutEffect(() => {
    applyTheme(readTheme(), false);
    publishTheme();
  }, []);

  const toggleTheme = useCallback(() => {
    if (lock.current) return;
    const current = snapshot();
    const to: ThemeName = current === "dark" ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      playSaberIgnition(to, reduce);
    } catch {
      /* Theme still changes if audio is unavailable. */
    }
    if (reduce) {
      applyTheme(to, true);
      publishTheme();
      window.dispatchEvent(new CustomEvent("itstar-warp"));
      return;
    }
    lock.current = true;
    const id = Date.now();
    setTransition({ id, from: current, to });
    window.setTimeout(() => {
      applyTheme(to, true);
      publishTheme();
      window.dispatchEvent(new CustomEvent("itstar-warp"));
    }, 400);
    window.setTimeout(() => {
      setTransition((currentTransition) => (currentTransition?.id === id ? null : currentTransition));
      lock.current = false;
    }, 1200);
  }, []);

  const value = useMemo(
    () => ({ theme, transition, toggleTheme }),
    [theme, transition, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return value;
}
