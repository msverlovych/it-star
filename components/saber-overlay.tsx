"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme, type BladeTransition } from "@/components/theme-provider";
import type { ThemeName } from "@/lib/theme";

const palette: Record<ThemeName, { core: string; mid: string; edge: string; wash: string }> = {
  light: {
    core: "#f4fbff",
    mid: "#2f7bff",
    edge: "#14c48b",
    wash: "rgba(47, 123, 255, 0.42)",
  },
  dark: {
    core: "#fff5f3",
    mid: "#ff2a3c",
    edge: "#ff7a32",
    wash: "rgba(255, 42, 60, 0.48)",
  },
};

function bladeBackground(theme: ThemeName) {
  const color = palette[theme];
  return `linear-gradient(to top, transparent 0%, ${color.edge} 8%, ${color.mid} 28%, ${color.core} 50%, ${color.mid} 72%, ${color.edge} 94%, transparent 100%)`;
}

function Blade({ theme, mode }: { theme: ThemeName; mode: "retract" | "ignite" }) {
  const color = palette[theme];
  return (
    <motion.div
      aria-hidden="true"
      className="absolute bottom-[8vh] left-1/2 w-3 -translate-x-1/2 rounded-full sm:w-3.5"
      style={{
        height: "74vh",
        originY: 1,
        background: bladeBackground(theme),
        boxShadow: `0 0 12px 2px ${color.core}, 0 0 28px 6px ${color.mid}, 0 0 80px 16px ${color.wash}`,
      }}
      initial={mode === "retract" ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 1 }}
      animate={mode === "retract" ? { scaleY: 0, opacity: 0.2 } : { scaleY: 1, opacity: 1 }}
      transition={
        mode === "retract"
          ? { duration: 0.38, ease: [0.4, 0, 1, 1] }
          : { duration: 0.52, delay: 0.36, ease: [0.16, 1, 0.3, 1] }
      }
    />
  );
}

function OverlayScene({ transition }: { transition: BladeTransition }) {
  const from = palette[transition.from];
  const to = palette[transition.to];
  return (
    <div className="pointer-events-none fixed inset-0 z-[70]" aria-hidden="true">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.72, 0.35, 0] }}
        transition={{ duration: 1.05, times: [0, 0.22, 0.55, 1] }}
        style={{
          background: `radial-gradient(circle at 50% 88%, ${to.wash}, transparent 42%), linear-gradient(to top, ${from.wash}, transparent 70%)`,
        }}
      />
      <motion.div
        className="saber-slash absolute right-0 left-0 h-[3px]"
        initial={{ top: "92%" }}
        animate={{ top: ["92%", "8%"] }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      />
      <Blade theme={transition.from} mode="retract" />
      <Blade theme={transition.to} mode="ignite" />
    </div>
  );
}

export function SaberOverlay() {
  const { transition } = useTheme();
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <AnimatePresence>
      {transition ? <OverlayScene key={transition.id} transition={transition} /> : null}
    </AnimatePresence>
  );
}
